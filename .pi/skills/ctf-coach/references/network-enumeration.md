# Network and service enumeration

Use only learner-supplied evidence from an authorized lab. Do not scan or infer a solution from the challenge name.

## Observe and interpret

- What do the title/description suggest about the intended information gap?
- Which host, transport, port, state, and service-identification fields did the learner actually observe? A conventional port label is not verified service identity.
- TCP and UDP behave differently. Open, closed, and filtered describe different observations; filtered or an unanswered probe does not establish that no service exists.
- A service banner/version is a lead, not proof of a vulnerability. Distinguish identification confidence from exploitability and scope.

## Foundations to teach when needed

Host discovery versus port scanning; transport protocols; reachability versus service identity; service/version detection; protocol-specific enumeration; evidence limits and false negatives. Let a confirmed service suggest the next question, not a memorized “port → exploit” table.

## Manual reading

Have the learner read the relevant sections of `man nmap`: host discovery, port states, port specification, service/version detection, timing, and output. Choose only the sections needed for their current question. Ask what evidence the selected option adds, its assumptions, and its impact on the authorized lab. If unavailable, use Nmap's help and official reference guide.

Do not start with aggressive scans, all scripts, or a full checklist. Any command explanation should address the current hypothesis, platform rules, and scan impact rather than maximizing output.

## Common reasoning mistakes

- Treating a port number as proof of the application behind it.
- Treating a missing result as proof of absence, or a version match as a confirmed exploit.
- Collecting more output without naming the uncertainty it should resolve.
- Following a discovered hostname or redirect beyond the authorized lab.

## Coaching prompt

“Which field supports your service identification, and what additional observation would distinguish it from your alternative explanation?” If the learner already answered, discuss their proposed experiment instead.
