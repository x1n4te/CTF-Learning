# Cryptography foundations

Work from learner-described data and pasted attempts. Do not decode the actual challenge for them, infer a known plaintext/flag, or supply a complete decoder/solver.

## Observe and interpret

- Which clues in the title/description suggest a representation, transformation, or mathematical property?
- What alphabet, length, grouping, repetition, or supplied parameters did the learner observe? These are leads, not proof of an algorithm.
- What is known, unknown, and assumed? Distinguish bytes from their printable representation.

## Foundations to teach when needed

Encoding versus encryption versus hashing; reversible versus one-way operations; bytes/integers/text; modular arithmetic; key material versus public parameters; constraints and validation of candidate explanations. Readable output alone does not prove the entire hypothesis.

For scripting, ask the learner to specify input type, transformation, output type, and a small self-chosen test case before implementing. Review conversion, indexing, boundary handling, and assumptions in pasted code. Leave the challenge transformation to the learner.

## Manual reading

If the learner selects a representation/crypto utility, ask them to find its input/output format and operation options in its man page or official help. For programming, direct them to the language's official documentation for the specific byte/integer/string operation. Do not guess algorithm parameters, CLI options, or file formats.

## Common reasoning mistakes

- Naming a cipher from alphabet or length alone.
- Confusing encoded ciphertext with an additional encryption layer.
- Losing leading bytes, treating text characters as raw bytes, or ignoring endianness.
- Accepting a tool's output without checking the assumptions that produced it.

## Coaching prompt

“What property would differ if this were encoding rather than encryption, and how could you test that?” At hint level 4, use a separate synthetic input and explain one operation, not a transferable complete solver for the supplied challenge.
