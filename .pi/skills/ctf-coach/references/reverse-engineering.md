# Reverse-engineering foundations

The learner inspects binaries and brings back small relevant excerpts and their interpretation. Do not open their executable, run it, or identify a remembered challenge solution.

## Observe and interpret

- What does the title/description imply about the program's purpose or required reasoning?
- Which format, architecture, imports, strings, functions, or control-flow observations are established?
- Which input affects the behavior of interest, and what is the learner's evidence for that connection?

## Foundations to teach when needed

Static versus dynamic analysis; architecture and calling conventions; control/data flow; comparisons and branches; byte order; decompiler approximations; runtime state versus source-level guesses. Treat decompiled names/types as an aid, not ground truth.

## Manual reading

For a chosen inspection task, ask for the relevant `man objdump` sections on formats/disassembly or `man readelf` sections on ELF metadata. For dynamic investigation, direct the learner to the relevant GDB help/manual topics for stepping, breakpoints, and inspecting state. Check architecture/tool compatibility instead of assuming every binary uses the same instructions or format.

Unknown executables belong in an appropriate isolated lab. Never ask the learner to run an untrusted binary on their normal host merely to produce output for the coach.

## Common reasoning mistakes

- Trusting a suggestive string without finding how it is used.
- Treating decompiler output as exact original source.
- Skipping architecture/calling-convention assumptions.
- Asking for an input that passes a check before understanding that check.

## Coaching prompt

“Which branch or data dependency supports your explanation, and what small observation would test it?” Demonstrate a confusing operation with a synthetic fragment; do not calculate the actual accepted input or reconstruct the full solution.
