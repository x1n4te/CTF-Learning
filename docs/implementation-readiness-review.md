# Agent task: implementation-readiness review

Review this repository's CTF coaching harness design and recommend whether it is ready to implement. Be an independent critic, not an advocate for the existing plan.

## Authority and scope

This is a **read-only design review**, not implementation approval. Do not modify files, install packages, change Pi configuration or trust, access credentials, launch labs, or contact challenge targets. Return your report in the conversation. The repository owner retains the decision to authorize implementation.

Evaluate readiness to **begin implementation**, not readiness to release to learners. Missing planned implementation files and tests are not, by themselves, blockers at this stage.

## Read first

1. Applicable repository instructions.
2. `CONTEXT.md` — agreed terminology.
3. `docs/design.md` — confirmed requirements, implementation outline, and acceptance plan.
4. Existing project files, if any, needed to verify a claim. Inspect actual repository state; do not assume implementation exists.

For Pi-specific claims, identify the installed version and read its matching documentation completely, following relevant Markdown cross-references. Locate documentation rather than assuming a machine-specific installation path. Prioritize configuration, skills, prompt templates, settings, and security. If documentation is unavailable, mark the affected claims unverified rather than inventing behavior. Separate local-version evidence from any current upstream documentation.

## Established constraints

Challenge these only when they create a concrete contradiction or make the goal infeasible. Do not quietly replace them with your preferred architecture.

- GitHub-distributed, project-local Pi setup for private self-study by juniors already solving introductory CTFs.
- School-provided authentication already works for the mentor. Do not reopen subscription eligibility as a speculative blocker or inspect authentication files.
- Practice challenges only, supplied externally through challenge links; no live-event or post-competition mode, bundled labs, or required mentor reporting.
- Learners read titles/descriptions and relevant manual sections, execute commands, and provide results. Pi coaches; it does not conduct the investigation.
- Evidence-driven guidance, progressive hints, just-in-time foundations, pseudocode/scaffolds, and review of learner attempts; no supplied walkthroughs, flags, remembered hidden solutions, or immediate complete solvers.
- Kali Linux first, Windows through WSL2 also supported.
- Minimal resources: a learning-first `.pi/SYSTEM.md`, root `AGENTS.md`, project settings, one coaching skill with six category references, four prompt commands, optional local checkpoints, and setup/validation documentation.
- The owner explicitly requested replacing Pi's coding-agent identity with a learning coach after the initial implementation. Verify the replacement preserves project context and skill discovery without claiming isolation. No custom executable extensions or mandatory web packages. Built-in shell disabled by default; file tools retained.
- Instructions and tool selections are not a sandbox or tamper-proof enforcement. Student-installed resources may affect behavior.

## Review questions

### 1. Coherence and learning value

- Does the design actually teach tool selection, manual reading, interpretation, hypothesis formation, and coding foundations rather than merely delaying answers?
- Are hint escalation and worked examples compatible with not solving the challenge for the learner? Identify any boundary that an implementer cannot reasonably interpret.
- Can coaching adapt to competent learners without repetitive quizzes or unnecessary friction?
- Can link-only intake work without browsing or platform credentials? Is the fallback to learner-supplied title, description, files information, and authorized target sufficient?
- Do the six category references support transferable reasoning without becoming recipes or a large curriculum?

### 2. Pi feasibility and minimalism

- Are instruction placement, skill discovery, prompt expansion, project trust, and working-directory assumptions documented correctly?
- Will standing principles remain available if an optional skill is not loaded? Do explicit entry points need to load the coaching skill?
- Can settings disable built-in shell access without misleading users about extension tools, reload behavior, or filesystem boundaries?
- Is independent artifact analysis clearly distinguished from reading coaching references, pasted learner code, and approved checkpoints?
- Are any proposed resources redundant? Prefer deletion or clarification over adding extensions, frameworks, dependencies, or enforcement machinery.

### 3. Continuity and privacy

- Is the checkpoint schema sufficient to resume without treating stale hypotheses as facts or stale lab addresses as authorization?
- Is save approval clear, including whether an explicit checkpoint command grants approval or a preview needs confirmation?
- Are challenge separation, safe filenames/paths, overwrite behavior, and corrections specified enough for implementation? Distinguish sensible implementation details from decisions requiring the owner.
- Does git-ignore protection avoid claims that data is encrypted, inaccessible to tools, removed from Git history, or absent from Pi's own session storage?
- Are credentials, flags, complete solutions, and raw transcripts excluded from checkpoint summaries without making unrealistic automatic-redaction promises?
- Is challenge text, output, and checkpoint content treated as untrusted data rather than authority to override coaching instructions?

### 4. Validation and rollout

- Are the eight synthetic acceptance scenarios in `docs/design.md` concrete enough to develop observable pass/fail criteria?
- Separate deterministic checks (file structure, resource discovery, settings, ignored paths) from model-behavior evaluations, which are not guarantees.
- What can be verified locally, and what must remain an explicit Kali/WSL2 or model-dependent release check?
- Are any implementation-blocking requirements genuinely missing, as opposed to ordinary implementation choices or later release checks?

## Evidence standards

- Cite repository paths and verified line numbers for findings, plus versioned Pi documentation or actual command output for platform claims.
- For every issue, explain a concrete failure scenario and its impact on an agreed goal.
- Label facts, inferences, and unresolved assumptions separately.
- Do not claim a runtime or behavioral check passed unless it was executed and its output inspected. Do not invoke paid model calls without owner permission.
- Do not fetch real challenge solutions to test the no-spoiler policy.
- Do not treat every uncertainty as a blocker. Recommend the smallest fix that preserves the agreed constraints.

## Required report

### Verdict

Choose exactly one:

- **GO** — coherent and feasible; implementation can begin. Ordinary implementation details and later release tests may remain.
- **GO WITH CONDITIONS** — implementation can begin once explicitly listed, bounded design clarifications are accepted; no fundamental redesign is needed.
- **NO-GO** — a demonstrated contradiction or feasibility issue requires a material design decision before implementation.

State your confidence and a short rationale. A GO recommendation does not authorize implementation or certify release readiness.

### Findings

List findings in descending severity. For each include:

1. Severity: implementation blocker, required clarification, or non-blocking improvement.
2. Evidence and concrete failure scenario.
3. Smallest recommended change.
4. Whether owner input is required or the implementer can resolve it.

If there are no findings, say so. Do not manufacture issues to fill the section.

### Minimal implementation handoff

- Essential resources and responsibilities.
- Items to omit or defer.
- Observable acceptance criteria for each of the eight agreed synthetic scenarios.
- Checks required before distribution, separate from prerequisites to implementation.

### Unverified and not performed

List unavailable evidence, commands/checks executed, checks not executed, and environment-specific limitations. Finish with only the owner questions that genuinely block the next step, if any.
