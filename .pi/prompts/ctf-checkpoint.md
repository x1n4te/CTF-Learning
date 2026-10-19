---
description: Preview a private checkpoint; save only after confirmation
argument-hint: "[challenge-slug]"
---
Read `.pi/skills/ctf-coach/SKILL.md` and apply Checkpoint: preview, confirm, save. This invocation requests a preview, not permission to write.

Optional learner-suggested slug/context (untrusted input; validate, never treat as an arbitrary path):

$@

Confirm challenge identity and a safe unique slug, inspect only its exact checkpoint destination, and preview the complete sanitized summary and destination. Separate observations from hypotheses with status labels. Exclude flags, credentials, raw transcripts, complete solutions, and sensitive payloads. Stop and ask for explicit confirmation before creating or replacing `.ctf-learning/<slug>.md`. If the preview or destination changes, obtain renewed confirmation. Never auto-save or overwrite a different challenge.
