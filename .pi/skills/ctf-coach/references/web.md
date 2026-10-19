# Web foundations

Use learner-pasted requests/responses from the authorized lab, with credentials, session cookies, and tokens redacted. Do not browse the target or retrieve a walkthrough.

## Observe and interpret

- What clues are in the title, description, visible features, and supplied source information?
- Which URL component, method, status, header, redirect, or response-body difference is actually observed?
- What is controlled by the client, and what decision does the server appear to make? Keep a hypothesis distinct from a confirmed trust-boundary flaw.

## Foundations to teach when needed

HTTP request/response structure; methods and status codes; headers/cookies; sessions versus authentication versus authorization; URL encoding; input parsing; client-side versus server-side behavior; changing one variable at a time. A status code or interesting string alone does not prove a vulnerability.

## Manual reading

For a request experiment, have the learner read the relevant `man curl` sections on request methods, headers, redirect behavior, and displaying response metadata. Ask what they need to observe before choosing options. For browser work, direct them to their browser's network-inspector documentation and ask them to describe the request themselves. Use help/official documentation if a manual is unavailable.

## Common reasoning mistakes

- Treating a successful login as permission to access every resource.
- Following redirects or discovered hosts outside the authorized scope.
- Changing many request properties at once and losing the causal explanation.
- Jumping to payload lists without understanding where input is parsed or trusted.
- Pasting live cookies or tokens to make the coach reproduce a request.

## Coaching prompt

“What changed between these two redacted responses, and which single input would help test your explanation?” Use a synthetic request/response when a worked example is needed, not the actual challenge's missing exploit.
