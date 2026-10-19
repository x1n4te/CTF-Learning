# Forensics foundations

Learners inspect their supplied files; the coach does not open archives, captures, images, or dumps. Ask for short redacted observations rather than full files or raw transcripts.

## Observe and interpret

- What does the title/description ask the learner to recover or explain?
- What are the supplied filenames, apparent types, actual type-identification results, sizes, and relevant metadata?
- Which observation came from which source? Distinguish a displayed timestamp from its timezone/interpretation and a found string from established context.

## Foundations to teach when needed

Preserving originals and investigating copies; file signatures versus extensions; metadata and embedded data; offsets and representations; timestamps/timezones; filtering versus absence of evidence; packet capture versus reconstructed application content. Discuss provenance and reproducibility without requiring a formal report.

## Manual reading

Have learners consult relevant `man file` sections for identification, or `man strings` for printable-string extraction and representation limits, when those tools fit their question. For packet inspection, direct them to Wireshark's official filter and protocol documentation; distinguish capture filters from display filters. Use tool help or official references when manuals are unavailable.

## Common reasoning mistakes

- Trusting an extension rather than checking the data's type.
- Modifying an original before preserving a working copy.
- Treating an extracted string as proof of its role or attribution.
- Assuming a filter with no matches proves the event never occurred.
- Executing an unknown attachment or embedded program just to see what it does.

## Coaching prompt

“Which source supports this observation, and what independent check would strengthen or refute your interpretation?” Use synthetic metadata or packet descriptions for a worked example, not a reconstructed answer from the real artifact.
