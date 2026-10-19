// Maintainer-only offline validation, not a Pi extension or learner tool.
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const piDir = process.argv[2] && resolve(process.argv[2]);
assert(piDir, 'Usage: node scripts/validate-setup.mjs <installed-pi-package-directory>');
const read = (path) => readFileSync(join(root, path), 'utf8');
const config = JSON.parse(read('.pi/settings.json'));
assert.deepEqual(config, { defaultTools: ['read', 'write', 'edit'] });
assert.equal(JSON.parse(readFileSync(join(piDir, 'package.json'), 'utf8')).version, '1.3.0',
  'This validator targets Pi 1.3.0; revalidate APIs before changing the tested version.');
const promptNames = ['ctf-checkpoint', 'ctf-hint', 'ctf-resume', 'ctf-start'];
const categories = ['web', 'network-enumeration', 'cryptography', 'forensics', 'reverse-engineering', 'binary-exploitation'];
const skillPath = '.pi/skills/ctf-coach/SKILL.md';
for (const category of categories) {
  assert(read(`.pi/skills/ctf-coach/references/${category}.md`).trim());
  assert(read(skillPath).includes(`references/${category}.md`));
}
for (const name of promptNames) {
  const content = read(`.pi/prompts/${name}.md`);
  assert(content.startsWith('---\n'));
  assert(content.includes(skillPath), `${name} must explicitly load the coaching skill`);
  assert(content.includes('$@'), `${name} must accept learner arguments`);
}
assert(read('AGENTS.md').includes('untrusted'));
for (const path of ['.pi/SYSTEM.md', '.pi/APPEND_SYSTEM.md', '.pi/extensions', '.pi/mcp.json']) {
  assert(!existsSync(join(root, path)), `${path} is outside the minimal setup`);
}

// Check local Markdown links in the learner-facing docs and skill references.
const linkedFiles = ['README.md', skillPath, ...categories.map(c => `.pi/skills/ctf-coach/references/${c}.md`)];
for (const path of linkedFiles) {
  for (const match of read(path).matchAll(/\]\(([^\s)]+)\)/g)) {
    const target = match[1];
    if (/^(?:https?:|#)/.test(target)) continue;
    assert(existsSync(resolve(root, dirname(path), target.split('#')[0])), `Broken link in ${path}: ${target}`);
  }
}

const scratch = mkdtempSync(join(tmpdir(), 'ctf-setup-validation-'));
const savedEnv = Object.fromEntries(['HOME', 'PI_CODING_AGENT_DIR', 'PI_OFFLINE', 'PI_TELEMETRY'].map(k => [k, process.env[k]]));
try {
  // Isolate user resource discovery, including ~/.agents/skills. Never open auth/session stores.
  process.env.HOME = join(scratch, 'home');
  process.env.PI_CODING_AGENT_DIR = join(scratch, 'agent');
  process.env.PI_OFFLINE = '1';
  process.env.PI_TELEMETRY = '0';
  const { DefaultResourceLoader, SettingsManager } = await import(pathToFileURL(join(piDir, 'dist/index.js')));
  // Version-specific test helper, not a public SDK export; guarded by the exact version check.
  const { expandPromptTemplate } = await import(pathToFileURL(join(piDir, 'dist/core/prompt-templates.js')));
  const settingsManager = SettingsManager.inMemory(config);
  const loader = new DefaultResourceLoader({
    cwd: root, agentDir: process.env.PI_CODING_AGENT_DIR, settingsManager,
    noExtensions: true, noThemes: true,
  });
  await loader.reload();
  assert.deepEqual(settingsManager.getDefaultTools(), config.defaultTools);
  assert.deepEqual(loader.getSkills().diagnostics, []);
  assert.deepEqual(loader.getPrompts().diagnostics, []);
  assert.deepEqual(loader.getExtensions().errors, []);
  assert.deepEqual(loader.getSkills().skills.map(s => s.filePath), [join(root, skillPath)]);
  const prompts = loader.getPrompts().prompts;
  assert.deepEqual(prompts.map(p => p.name).sort(), promptNames);
  assert(prompts.every(p => p.filePath === join(root, '.pi/prompts', `${p.name}.md`) && p.description));
  assert(loader.getAgentsFiles().agentsFiles.some(f => f.path === join(root, 'AGENTS.md')));
  assert.equal(loader.getSystemPrompt(), undefined);
  assert.deepEqual(loader.getAppendSystemPrompt(), []);
  for (const name of promptNames) {
    const marker = 'synthetic-input';
    const expanded = expandPromptTemplate(`/${name} ${marker}`, prompts);
    assert(expanded.includes(marker) && expanded.includes(skillPath));
    assert(!expanded.includes('$@'));
    assert(!expandPromptTemplate(`/${name}`, prompts).includes('$@'));
  }
  console.log('PASS: Pi 1.3.0 discovers 1 skill, 4 prompts, root AGENTS; arguments expand; file-tool defaults resolve.');
  console.log('NOTE: SDK discovery uses in-memory settings without extensions; it does not test CLI trust, active model tools, or behavior.');

  // Test ignore semantics in a disposable Git repository, never initialize the working tree.
  const repo = join(scratch, 'ignore-test');
  const gitEnv = { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_NOSYSTEM: '1' };
  function git(args) {
    return spawnSync('git', args, { encoding: 'utf8', env: gitEnv });
  }
  const init = git(['init', '--quiet', repo]);
  assert.equal(init.status, 0, `git init failed: ${init.error ?? ''} ${init.stdout} ${init.stderr}`);
  copyFileSync(join(root, '.gitignore'), join(repo, '.gitignore'));
  for (const path of ['.ctf-learning/test.md', '.ctf-learning/nested/test.md', '.pi/auth.json', '.pi/sessions/test.jsonl', '.env']) {
    const result = git(['-C', repo, 'check-ignore', '--no-index', '-v', path]);
    assert.equal(result.status, 0, `Not ignored: ${path}: ${result.stderr}`);
  }
  for (const path of ['README.md', 'AGENTS.md', '.pi/settings.json', '.pi/prompts/ctf-start.md', skillPath]) {
    const result = git(['-C', repo, 'check-ignore', '--no-index', path]);
    assert.equal(result.status, 1, `Unexpected ignore or error for ${path}: ${result.stdout} ${result.stderr}`);
  }
  console.log('PASS: checkpoint/credential paths ignored; harness resources remain trackable (temporary Git repository).');
} finally {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  rmSync(scratch, { recursive: true, force: true });
}
console.log('NOT TESTED: paid/live model behavior, interactive trust/tool activation, fresh installation, Kali, WSL2.');
