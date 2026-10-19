# CTF Learning

## A Pi practice coach—not an automatic solver

Use AI to become a better CTF player, not to skip the learning. This repository gives you a small, project-local [Pi](https://pi.dev) setup that coaches you through **authorized practice challenges** while you do the investigation.

You read the challenge, choose and run tools, interpret the output, and write your own code. The coach helps you understand concepts, question assumptions, and choose a useful next experiment. It does not give you flags, challenge walkthroughs, or complete solver scripts.

**Audience:** juniors already solving introductory CTF challenges, including learners using mentor-assigned TryHackMe or other practice labs. This is not a live-competition assistant or a post-competition review workflow.

> **Validation status:** offline resource/configuration checks pass, and an independent implementation review found no issues. Live-model coaching, fresh installation, Kali Linux, and Windows WSL2 checks remain pending. Treat this as an initial learning setup, not a proven enforcement system. See [validation details](docs/validation.md).

## Contents

- [What you will learn](#what-you-will-learn)
- [Before you start](#before-you-start)
- [Install and launch](#install-and-launch)
- [Your first challenge](#your-first-challenge)
- [How to work with the coach](#how-to-work-with-the-coach)
- [Commands](#commands)
- [Save and resume your learning](#save-and-resume-your-learning)
- [Privacy and responsible practice](#privacy-and-responsible-practice)
- [Troubleshooting](#troubleshooting)
- [Update your setup](#update-your-setup)
- [Frequently asked questions](#frequently-asked-questions)
- [Repository map and maintainer notes](#repository-map-and-maintainer-notes)

## What you will learn

The goal is to recognize **what information you need, which tool can obtain it, and what the result actually establishes**.

For example, discovering a port is not the same as proving which application is listening, whether it is vulnerable, or how it relates to a flag. The coach helps you connect observations to testable hypotheses instead of memorizing a “port number → exploit” table.

| Category | Foundations emphasized |
| --- | --- |
| Network/service enumeration | Reachability, port states, service identification, confidence, and choosing the next information gap |
| Web | Requests/responses, sessions, trust boundaries, and controlled comparisons |
| Cryptography | Encoding versus encryption versus hashing, representations, assumptions, and small test cases |
| Forensics | File types, metadata, provenance, evidence limits, and preserving originals |
| Reverse engineering | Architecture, control/data flow, and testing interpretations of program behavior |
| Binary exploitation | Memory, crash interpretation, mitigations, and distinguishing a crash from a demonstrated primitive |

Coding is part of the learning. Expect help with algorithms, pseudocode, debugging your pasted attempts, and small synthetic examples—not a complete script that finishes the challenge.

## Before you start

You need:

- **Kali Linux**, preferably in an appropriate practice environment, or Kali running inside **WSL2 on Windows**.
- Basic terminal familiarity and permission to install software on your machine.
- **Git**, **Node.js 22.19 or newer**, and **npm**.
- An individual account that can authenticate to Pi. The mentor has already verified school-provided ChatGPT access works; this repository contains no shared account, API key, or credentials.
- A practice challenge assigned or approved for you, plus its allowed target/scope. Some platforms require their own VPN or browser-based lab.

You do **not** need a web extension, a collection of Pi plugins, a mentor dashboard, or a local copy of every security tool to begin. Install tools when your investigation actually needs them. No challenges or vulnerable machines are bundled here.

### Windows: prepare Kali in WSL2 first

If you already have Kali in WSL2, continue to the Linux setup below.

On a supported Windows installation, open **PowerShell as Administrator**:

```powershell
wsl --list --online
wsl --install --distribution kali-linux
```

Restart if prompted, launch Kali, and create its Linux user account. From PowerShell, check the distribution version:

```powershell
wsl --list --verbose
```

The Kali entry should show version **2**. If it shows version 1, follow the official conversion guidance before continuing. Do not unregister/delete an existing distribution to troubleshoot; that can delete its data.

Use the [Microsoft WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install) and [Kali WSL guide](https://www.kali.org/docs/wsl/wsl-preparations/) for prerequisites, older Windows builds, and virtualization issues.

**All remaining shell commands belong in the Kali terminal**, not PowerShell. Keep the repository in your Linux home directory, not under `/mnt/c`. Use Linux Node/npm/Pi rather than mixing in Windows installations. Native Windows Pi setup is outside this repository's initial scope.

WSL2 networking and privileges may differ from a Kali VM. Follow the challenge platform's VPN guidance; do not assume a scan mode or lab connection behaves identically in both environments.

## Install and launch

### 1. Check the prerequisites

In your Kali terminal:

```bash
git --version
node --version
npm --version
```

Node must be **22.19.0 or newer**. If absent or too old, use the [official Node.js download guidance](https://nodejs.org/en/download) or a trusted user-managed Node installation method suitable for Kali. Reopen the terminal afterward and check again. Do not assume an arbitrary distribution's default Node package meets this requirement.

If you need Git or manual-page support on Kali:

```bash
sudo apt update
sudo apt install git man-db
```

Installing `man-db` provides the manual reader; individual tools supply their own manual pages and may need to be installed separately.

### 2. Clone this repository

Copy the clone URL from this repository's GitHub **Code** menu. Replace `<repository-clone-url>` below with that URL; do not type the angle brackets literally.

```bash
mkdir -p ~/ctf-training
cd ~/ctf-training
git clone <repository-clone-url> CTF-Learning
cd CTF-Learning
```

You should now be in the directory containing `README.md`, `AGENTS.md`, and `.pi/`. Review those files before trusting the setup. Do not paste a GitHub token into the clone command; if the repository is private, use GitHub's normal authentication flow.

Keep challenge downloads and working scripts in a separate lab directory. The coach works from what you paste into the conversation, not by opening your challenge files.

### 3. Install the documented Pi version

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent@1.3.0
pi --version
```

This setup targets **Pi 1.3.0**. Its published package requires Node.js 22.19 or newer. `--ignore-scripts` disables dependency installation lifecycle scripts; it is not a runtime sandbox.

If you already use Pi, check its version and executable path before replacing anything:

```bash
command -v pi
pi --version
```

Different terminals or Node installations can resolve different Pi versions. Do not delete your existing authentication or global settings to use this repository.

### 4. Launch from the repository root

```bash
pi --tools read,write,edit
```

**Use this command from this repository root every time.** Do not launch from a challenge download folder or a nested directory and assume the project `.pi` setup will load.

Review and accept the project-trust prompt so Pi can load the project settings, skills, and commands. Keep context-file loading enabled so root `AGENTS.md` is included.

Why the explicit tool list? It gives the coach file tools for its references and approved checkpoints, without the built-in shell. Pi 1.3.0 also reads the same defaults from `.pi/settings.json`. Older versions, including Pi 0.80.2, do **not** support that `defaultTools` setting; do not assume plain `pi` disables their shell. The explicit launch command is the compatibility fallback, not a claim that every older version has been tested.

Your existing global instructions, skills, and extensions can still affect the session. This repository does not remove them or enforce an isolated profile. Check the startup diagnostics/resources and active tool information available in your Pi version. Do not rely solely on the model claiming the correct configuration is loaded.

### 5. Sign in and choose a model

Inside Pi:

```text
/login
/model
```

Select the OpenAI/ChatGPT subscription sign-in offered by your Pi version, authenticate with **your own school-provided account**, and choose an available model. Labels and model availability can vary. No model or account is pinned by this template, and this setup does not mean unlimited usage or free API credits.

Never put your password, OAuth token, API key, browser cookies, or `auth.json` in this repository. Authentication normally lives in Pi's user agent directory, separate from this project.

### 6. Check that the coach loaded

Look for:

- Root `AGENTS.md` in loaded project context.
- The `ctf-coach` skill.
- `/ctf-start`, `/ctf-hint`, `/ctf-checkpoint`, and `/ctf-resume` in command completion.
- The intended built-in file tools and no built-in shell; inspect extension-provided tools too.

Command completion proves discovery, not that the model has read every skill/reference. The commands explicitly direct it to load the coaching skill when used. If resources are missing, resolve setup first rather than starting a challenge with an unknown configuration.

## Your first challenge

Use **two terminals**:

| Terminal | Purpose |
| --- | --- |
| Coach terminal | Pi running from the repository root |
| Lab terminal | Your manual reading, challenge files, coding, and authorized tool commands |

### Start with the link

Inside Pi:

```text
/ctf-start <challenge-link>
```

The default coach cannot fetch that link. It records the URL as metadata and asks you to supply the details. Even if a page is public, do not expect the coach to have read it.

Read the challenge **title and description yourself**. They often contain clues. Then paste a short intake such as:

```text
Title: [challenge title]
Description: [challenge description]
Supplied files: [names and types, or none]
Authorized scope: [current platform-assigned lab target, or file-only]
Possible clue I noticed: [your interpretation, or "I don't know yet"]
What I tried: [brief attempts, or "nothing yet"]
```

Provide enough scope to distinguish the assigned lab from unrelated hosts. A room URL or a host appearing in output is not blanket authorization. Never supply your platform login or send the flag as proof of completion.

### Bring evidence and your interpretation

After you run an experiment in the lab terminal, a useful message is:

```text
Observation: [small, redacted excerpt of relevant output]
My interpretation: [what I think it establishes]
Hypothesis: [one explanation I want to test]
Proposed next experiment: [what I would try and what it should tell me]
```

You do not have to fill every field perfectly or invent an answer. “I don't know where to start” and “I don't understand this field” are welcome. If you have already explained a stage correctly, the coach should move forward instead of asking you to repeat it.

## How to work with the coach

### Read the relevant manual sections

Before using an unfamiliar tool or option, find out what it does. For example, in the **lab terminal**:

```bash
man nmap
```

In the usual manual pager, `/` searches and `q` exits. Read the sections relevant to your question, not the entire manual every session. Explain why an option fits your information gap and what its results would or would not prove.

If a manual is unavailable, use the tool's help or official documentation. Paste a short relevant excerpt if you need help understanding it. Do not copy a command blindly just because an AI suggested it; manuals and observed behavior are stronger evidence than a confident explanation.

### Ask for a focused hint

```text
/ctf-hint I can read the result, but I do not understand what the state field means.
```

The coach can provide:

1. A conceptual hint.
2. An investigative direction and relevant manual reading.
3. An explained command or small code scaffold.
4. A worked example using **synthetic or analogous data**.

These are support levels, not a progress score. Repeating `/ctf-hint` does not unlock a walkthrough, actual-data solution, or complete exploit/solver. If you remain stuck, ask for a simpler explanation or a different synthetic example.

### Develop your own code

Describe the input, intended transformation, and output before asking for implementation help. Paste your small attempt and a redacted error or test result. The coach will help you reason about the algorithm, review the attempt, or supply a limited scaffold. It will not read/edit `solve.py` on disk or finish the challenge through a sequence of generated snippets.

### Reflect without writing a report

On completion, the coach may ask what clue mattered, why the approach worked, and what you would recognize next time. This is an optional conversation—not a graded quiz, required write-up, flag submission, or mentor report.

## Commands

Use these **inside Pi**, not in your Linux shell. Replace angle-bracket placeholders with your own values.

| Command | Purpose |
| --- | --- |
| `/ctf-start <challenge-link>` | Begin intake and read the challenge for clues |
| `/ctf-hint <what-is-stuck>` | Request one useful increment of help |
| `/ctf-checkpoint <challenge-slug>` | Preview a private learning summary; does not save yet |
| `/ctf-resume <challenge-slug>` | Read a saved summary and reconfirm the current challenge/scope |

Ordinary conversation is supported too; the same standing coaching principles apply. These commands are Markdown prompt templates, not executable access controls. They are distinct from Pi's built-in `/resume`, which selects saved Pi conversations.

## Save and resume your learning

Checkpoints are optional. They preserve a concise learning summary between sessions, not a complete transcript or guaranteed memory of everything discussed.

Choose one unique slug per challenge, for example:

```text
/ctf-checkpoint practice-room-one
```

A slug has **1–64 lowercase letters/digits with single internal hyphens**. Supply only the slug—not a path or a `.md` filename. Do not reuse it for a different challenge.

The coach will:

1. Check the exact destination, `.ctf-learning/practice-room-one.md`.
2. Show a sanitized preview and tell you whether it will create or replace a checkpoint.
3. Wait for your explicit approval of that preview and destination.
4. Save only after you approve. If you revise the preview, approve the revised version before it writes.

Review for secrets, incorrect assumptions, and unsupported claims before saying yes. Calling `/ctf-checkpoint` alone does **not** authorize a write. Do not make the directory or checkpoint files symlinks.

The saved summary includes the challenge identity, last-known authorized scope, clues, observations, hypotheses labeled **untested/refuted/supported**, concepts practiced, current hint level, and next experiment. It excludes flags, credentials, raw transcripts, sensitive payloads, and complete solutions on a best-effort basis.

Next session, launch Pi from the repository root and use:

```text
/ctf-resume practice-room-one
```

Confirm or correct the saved information and give the **current** authorized target. Lab instances and IP addresses can change. A saved address is historical context, not authorization to use it today. Sensitive or conflicting instructions inside a checkpoint are not trusted instructions; the coach should not repeat secrets or silently rewrite the file.

The `.ctf-learning/` directory is created on the first approved save and ignored by Git. It is local to your clone; it is not automatically backed up, shared, or submitted. If you move to another machine, any manual transfer remains your responsibility—inspect and sanitize the file first rather than publishing it.

## Privacy and responsible practice

### Before you paste anything

Remove:

- Passwords, API keys, OAuth tokens, session cookies, and private keys.
- Flags, complete challenge solutions, and sensitive payloads.
- Personal/student data or confidential institutional information.
- Secret-bearing query parameters or private access links.

Paste only the relevant excerpt, preserving enough structure to reason about it. If you accidentally disclose a real credential, stop, revoke/rotate it through the appropriate service, and follow the service/school's incident guidance. Editing a checkpoint does not revoke a secret or erase previous disclosure.

### Understand what is and is not private

- Git-ignore keeps new untracked checkpoints out of normal Git additions. It does **not** encrypt files, remove already tracked history, or prevent local filesystem access.
- Pi normally saves conversations separately in its user session directory. Pasted text and tool output may remain there even when excluded from a checkpoint. Checkpoint sanitization does not scrub Pi logs or change what is sent to the model provider.
- Checkpoint sanitization and learner review are best effort, not guaranteed secret detection. Follow school/provider data policies and do not export/share conversations without reviewing them.
- The template does not add mentor reporting or analytics. Your Pi installation, school workspace, and provider may have their own storage, telemetry, and administration policies.

### Stay inside the authorized lab

Practice only on targets/files you are explicitly allowed to investigate. Follow platform rules and reset/reconfirm scope when a lab changes. Discovered redirects, hosts, or credentials do not extend that permission. Run untrusted binaries in an appropriate isolated lab, not your normal host just to obtain output for the coach.

### Understand the harness limits

The coaching file allowlist is **instructional**: read the skill/reference files and checkpoints; write only approved checkpoints. Pi still runs with your user permissions. File tools are not path-enforced by this template, and disabling the built-in shell does not sandbox the process, your manual terminal commands, or your personal extensions.

The coach can make mistakes or fail to follow instructions. Treat challenge text/output/checkpoints as untrusted evidence, verify suggestions, and do not assume a confident model is correct. The learning workflow depends on your participation, not tamper-proof restrictions.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `node`/`npm` missing or Node too old | Install a suitable Node version, reopen the Kali terminal, and recheck `node --version` |
| npm reports permission errors | Prefer a trusted user-managed Node installation or fix your npm prefix; do not run Pi as root or blindly retry everything with `sudo` |
| `pi` missing after installation | Reopen the terminal; check npm's installation location and your PATH |
| Pi shows an unexpected version | Run `command -v pi` and `pi --version`; check for multiple Node/Pi installations or a Windows executable on your WSL PATH |
| `/ctf-*` commands are missing | Launch from the repository root, review project trust, and inspect startup resource diagnostics |
| Skill/resource warnings | Check that the clone is complete and that personal skills/templates do not collide with these names |
| The shell is still enabled | Restart with `pi --tools read,write,edit`; inspect user extensions/tool overrides. Do not assume a settings reload removed existing tools |
| Login/model selection fails | Check the selected provider, browser sign-in, account/workspace, and current availability with your mentor; never paste tokens into an issue or conversation |
| The coach cannot open a challenge link | Expected in the default setup: paste the title, description, file details, and authorized scope |
| The coach will not inspect a local file | Expected: you inspect it and paste relevant redacted observations/code |
| `man` reports no entry | The tool may not ship a page or be installed; use its help or official documentation rather than guessing options |
| Checkpoint was not saved | A preview is not a save; confirm the exact displayed preview/path and check the tool's write result |
| Checkpoint cannot be found | Use the same clone and exact slug; it is not synced through Git. Do not pass a path or `.md` extension |
| Lab/VPN is unreachable under WSL2 | Follow platform and WSL networking guidance; connectivity is separate from Pi authentication and may differ from a VM |
| The coach gives an answer instead of coaching | Stop, avoid using the spoiler, check that the project resources loaded, and report a sanitized reproduction to the maintainer |

For help, share OS, `node --version`, `pi --version`, launch command, and a short redacted error. Do not upload your session exports, checkpoints, target credentials, or challenge solution.

## Update your setup

Save any learning checkpoint through the preview/approval flow, then exit Pi. In the repository root:

```bash
git status --short
git pull --ff-only
```

Review local changes before pulling; if Git reports a conflict/divergence, stop and ask rather than resetting away your work. The ignored checkpoint directory is not part of the update or a backup. Review incoming instruction/settings changes before trusting them, then restart Pi with the documented launch command.

Do not assume the newest Pi release is automatically compatible. This setup's recorded validation targets 1.3.0. Check the maintainer's compatibility/validation notes before changing versions or adding extensions.

## Frequently asked questions

**Do I need to submit write-ups or conversations?** No. This is private self-study. Reflection and checkpoints are optional; no reporting integration is included.

**Can I use this during a competition?** No. This setup is for practice challenges, not live competitions or post-competition review.

**Can the coach search for the room's solution?** No. Public availability does not make walkthroughs part of this learning workflow. General documentation and foundational references are appropriate; challenge-specific solution searches are not.

**Can I keep using my existing Pi configuration?** Yes, but personal context and extensions may change the experience. Start from the correct directory, verify loaded resources/tools, and keep the template minimal until it works as intended.

**Is school-provided access unlimited or equivalent to API credits?** Do not assume either. Use the approved account sign-in and follow the workspace's availability, usage limits, and policies.

**Does a checkpoint replace Pi's saved conversations?** No. It is a small, reviewed summary for continuing the investigation. Pi's own conversation storage is separate and may contain much more detail.

**What if I am still stuck after several hints?** Ask for a simpler explanation, identify the concept you cannot explain, or work through a separate synthetic example. A mentor can help diagnose the gap; the coach still does not provide the challenge solution.

## Repository map and maintainer notes

```text
AGENTS.md                         Standing coaching principles
CONTEXT.md                        Shared terminology
.pi/
  settings.json                   Built-in file-tool defaults
  prompts/                        Four learner commands
  skills/ctf-coach/
    SKILL.md                      Coaching and checkpoint workflows
    references/                   Six category foundation guides
.ctf-learning/                    Local ignored checkpoints; created on first save
scripts/validate-setup.mjs         Offline maintainer validator, not an extension
docs/                             Design, review task, validation scenarios/results
```

No custom executable extensions, replacement system prompt, mandatory web packages, bundled labs, or mentor dashboard. Ordinary learners do not need to run the maintainer validator to start.

- [Design and accepted constraints](docs/design.md)
- [Shared terminology](CONTEXT.md)
- [Implementation-readiness review task](docs/implementation-readiness-review.md)
- [Validation checklist and eight synthetic coaching scenarios](docs/validation.md)

Maintainers: validate resource discovery, actual coaching behavior, and Kali/WSL2 setup before recommending cohort-wide use. When reporting bugs or proposing changes, use synthetic examples and sanitized evidence—not copyrighted challenge assets, flags, credentials, or walkthroughs. Keep fixes focused on learning quality and ease of setup rather than growing an extension stack.
