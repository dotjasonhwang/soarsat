Read the file at $ARGUMENTS.
Also read .claude/skills/taxonomy.md and .claude/skills/sat_expert.md.

Classify every SAT question in the file. For each question output one CSV row.

The CSV header is:
test_id,section,module,question,domain,skill

Rules:

- test_id: the filename stem of the input file (e.g. "practice_test_1")
- section: exactly "rw" (Reading and Writing) or "m" (Math)
- module: "1" or "2" — infer from the document structure; if ambiguous use "1"
- question: the question number as an integer
- domain and skill: use only the keys defined in taxonomy.md; apply the heuristics in sat_expert.md to decide
- Do NOT include an Answer column — answers come from a separate extract-answers pass
- If a question cannot be confidently classified, skip it and print a note after the CSV block

Write the CSV rows (including header) directly to a file: replace the `.md` extension of the input path with `_classified.csv` (e.g. `data/processed/cb7.md` → `data/processed/cb7_classified.csv`). Then print one line: `Saved: <output path>`. Print any skipped questions below that.
