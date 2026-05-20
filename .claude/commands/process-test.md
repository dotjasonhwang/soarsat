Run the full SAT classification pipeline for $ARGUMENTS (the test stem, e.g. `sat-practice-test-7-digital`).

Let TEST = $ARGUMENTS. The answers PDF is assumed to be named `data/raw/<TEST>-answers.pdf`.

---

## Step 1 — Extract PDFs to Markdown

Run both extractors via Bash. These can run sequentially or in parallel:

```
uv run src/extractor.py data/raw/<TEST>.pdf
uv run src/extractor.py data/raw/<TEST>-answers.pdf
```

Wait for both to complete before continuing.

---

## Step 2 — Classify and Extract Answers (parallel sub-agents)

Spawn two sub-agents **in the same tool call message** so they run in parallel. Each sub-agent writes its output to disk; you do not need to capture their return values.

**Sub-agent 1 prompt — Classify:**

```
Read `data/processed/<TEST>.md`.
Also read `.claude/skills/taxonomy.md` and `.claude/skills/sat_expert.md`.

Classify every SAT question in the file. Write the results to `data/processed/<TEST>_classified.csv`.

CSV header: test_id,section,module,question,domain,skill

Rules:
- test_id: exactly "<TEST>" (the test stem, not the filename)
- section: exactly "rw" (Reading and Writing) or "m" (Math)
- module: "1" or "2" — infer from document structure; if ambiguous use "1"
- question: the question number as an integer
- domain and skill: use only the keys defined in taxonomy.md; apply the heuristics in sat_expert.md to decide
- Do NOT include an answer column

Write the CSV (including header) to the file, then print one line: `Saved: data/processed/<TEST>_classified.csv`
Print any skipped questions below that.
```

**Sub-agent 2 prompt — Extract Answers:**

```
Read `data/processed/<TEST>-answers.md` (a Markdown file extracted from the SAT answer key PDF).

Extract the correct answer for every question. Write the results to `data/processed/<TEST>-answers_answers.csv`.

CSV header: test_id,section,module,question,answer

Rules:
- test_id: exactly "<TEST>" (the test stem, not the filename — must match the classify output)
- section: exactly "rw" (Reading and Writing) or "m" (Math)
- module: "1" or "2" — infer from document structure; if ambiguous use "1"
- question: the question number as an integer
- answer: the correct answer letter — exactly one of A, B, C, or D
- SPR (student-produced response) Math questions have numeric answers — skip them; they will not match any answer letter
- This pass does NOT classify by domain or skill — answers only

Write the CSV (including header) to the file, then print one line: `Saved: data/processed/<TEST>-answers_answers.csv`
Print any skipped questions below that.
```

---

## Step 3 — Join

After both sub-agents complete, run:

```
uv run src/join.py \
  data/processed/<TEST>_classified.csv \
  data/processed/<TEST>-answers_answers.csv \
  data/processed/<TEST>.csv
```

Print the join.py output verbatim. Warnings about unmatched SPR questions are expected.

---

## Done

Print a one-line summary: `Pipeline complete: data/processed/<TEST>.csv — <N> rows written.`
