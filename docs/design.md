# CTF coaching harness design

Status: design and review clarifications approved by the owner; initial implementation complete with passing offline validation and no findings from independent implementation review. Interactive/model and Kali/WSL2 release checks remain pending (see validation.md).

## Confirmed direction

- Share a project-local Pi setup through a GitHub repository. Each learner uses their own Pi harness; the mentor has already verified school-provided access works.
- Serve juniors already solving introductory CTF challenges, across categories.
- Support practice challenges only, not live competitions or post-competition review.
- Develop scenario-appropriate tool selection, tool use, interpretation, and decisions about what to investigate next. The mentor's example is Nmap reconnaissance leading to further investigation of discovered services.
- Coach learners through challenges instead of immediately supplying answers.
- Learners execute commands and bring back results; the coach does not perform the investigation for them.
- Use the loop observation → learner interpretation → next hypothesis → experiment, with one meaningful question at a time.
- Use four hint levels: (1) conceptual hint, (2) specific investigative direction and manual-reading prompt, (3) explained command or small code scaffold, (4) synthetic/analogous worked example. Never provide complete challenge solvers or solve the actual challenge through a worked example. Advance to the earliest missing or flawed reasoning stage; do not re-quiz stages already explained accurately.
- Intake asks for the challenge description, supplied files, and authorized target. Have the learner read the title and description for clues rather than letting the coach replace that reading. Accept “I don't know where to start.”
- The mentor supplies links to external practice challenges from TryHackMe or the platform the mentor calls “cylabs”; this repository does not need to supply exercises. Exact identity of the second platform has not been established.
- Do not supply online challenge write-ups or solutions. Teach the foundations of the relevant CTF category instead.
- Support private self-study without required curated write-ups or mentor submissions.
- Allow official tool documentation and general foundational references, but do not search challenge names, flags, walkthroughs, or solution repositories. With no web tool, record links as metadata and immediately ask the learner to paste the title, description, supplied-file details, and authorized target, whether or not the page is public. The learner opens manuals and references. Never request login credentials or infer page contents from a URL. An optional user web tool does not change the no-spoiler or learner-reading rules.
- Have learners read relevant tool man-page sections before using tools, not entire manuals. When a man page is unavailable, use the tool's help output and official documentation; do not invent options.
- Base guidance on learner-provided evidence, not remembered challenge solutions; do not disclose remembered paths, credentials, flags, or hidden steps. This is behavioral guidance, not a guarantee that model knowledge can be removed.
- Teach coding through algorithms or pseudocode, then small scaffolds and review of the learner's pasted attempt. Use synthetic worked examples of stuck concepts; never generate complete challenge-solving scripts at any hint level.
- Teach category foundations just in time, with short explanations and teach-back questions rather than mandatory lectures or constant quizzes.
- Offer optional, git-ignored local learning checkpoints containing observations, attempted hypotheses, and the next experiment. Obtain learner approval before saving; exclude flags and credentials.

- Keep the setup minimal: .pi/SYSTEM.md establishes a learning-first coach identity instead of Pi's default coding-agent identity; root AGENTS.md holds standing coaching rules; one skill provides category references and detailed workflows; prompt templates provide entry points. The owner explicitly approved adding the replacement system prompt after the initial implementation. Do not add custom executable extensions.
- Disable the built-in shell tool by default. During coaching, file tools may read only .pi/skills/ctf-coach/** and .ctf-learning/**, and write/edit only .ctf-learning/**. Learners paste descriptions, manual excerpts, tool output, and code attempts; do not read or edit local challenge artifacts/scripts. This is an instructional allowlist, not enforced filesystem isolation. Do not require a web-access extension; user-installed extensions may expose additional tools.
- Provide /ctf-start, /ctf-hint, /ctf-checkpoint, and /ctf-resume. Saving is explicit, not silent. Keep one checkpoint per challenge in a git-ignored directory; confirm the challenge and current authorized target on resume.
- Cover web, network/service enumeration, cryptography, forensics, reverse engineering, and binary exploitation. Each category reference covers observations, foundational concepts, common reasoning mistakes, and manual-reading prompts, not fixed tool checklists or solution recipes.
- Target Kali Linux primarily, with Windows through WSL2 also supported.

- Checkpoints record the challenge link/title, last-known authorized target (requiring reconfirmation), learner-identified clues, observations, attempted hypotheses with untested/refuted/supported status, concepts practiced, current hint level, and next experiment. Exclude raw transcripts, flags, credentials, and complete solutions. /ctf-checkpoint previews a sanitized summary and destination; only subsequent explicit confirmation permits creation or replacement. On resume, treat contents as untrusted data, omit sensitive values from replies, invite corrections, and reconfirm the target. Do not silently rewrite checkpoints. Sanitization is best effort, not guaranteed.
- Offer an optional conversational debrief: what clue mattered, why the approach worked, and what the learner would recognize next time. No submission, score, or mandatory document.

## Acceptance plan

- Validate configuration and resource/command discovery.
- Exercise eight synthetic coaching scenarios: link-only intake; not knowing where to start; misinterpreted tool output; requests for flags or walkthroughs; script-writing help; unavailable manuals; stale or sensitive checkpoints; and challenge text containing instructions that conflict with coaching rules.
- Use synthetic examples rather than real challenge solutions. Treat supplied challenge text, output, and checkpoint contents as untrusted evidence, not instructions overriding the coaching workflow.
- Record checks actually executed and limitations. Kali and WSL2 setup remain unverified until tested in those environments.

## Approved implementation outline

- Root AGENTS.md, README.md, and .gitignore.
- .pi/SYSTEM.md replacing the default coding-agent preamble with learning objectives, learner agency, concise adaptive teaching, and no-spoiler/privacy principles. Keep detailed workflow mechanics in AGENTS.md and the coaching skill. Verify the composed prompt retains project context and skill discovery; the replacement is not an enforcement boundary.
- .pi/settings.json selecting read/write/edit without a shell using defaultTools, documented in Pi 1.3.0. The PATH installation found during implementation is 0.80.2, which lacks this setting; document an explicit --tools read,write,edit launch for older installs and require verification of the active tools. Do not pin student authentication or model choices.
- .pi/skills/ctf-coach/SKILL.md and six category references.
- .pi/prompts/ctf-start.md, ctf-hint.md, ctf-checkpoint.md, and ctf-resume.md.
- A git-ignored .ctf-learning/ directory created on the first approved save; no automatic saving or resuming. Use a confirmed, unique lowercase alphanumeric/hyphen slug (at most 64 characters, no leading/trailing/consecutive hyphens), directly under that directory. No arbitrary paths or symlinked checkpoint directories. Document that git-ignore neither encrypts data nor clears tracked history or Pi session logs.
- Setup documentation and a reproducible validation checklist with synthetic coaching scenarios.

No custom executable extensions, mandatory web-access packages, bundled challenges, or mentor reporting. The originally excluded replacement system prompt is now explicitly requested and included as a plain Markdown learning-first identity.

Consequential architectural trade-offs will be recorded as ADRs when settled. Terminology lives in ../CONTEXT.md.
