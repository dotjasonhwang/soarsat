Read the file at $ARGUMENTS (a Markdown file extracted from a SAT answer key PDF).

Extract the correct answer for every question. For each question output one CSV row.

The CSV header is:
test_id,section,module,question,answer

Rules:

- test_id: the filename stem of the input file (e.g. "practice_test_1-answers")
- section: exactly "rw" (Reading and Writing) or "m" (Math)
- module: "1" or "2" — infer from the document structure; if ambiguous use "1"
- question: the question number as an integer
- answer: the correct answer letter — exactly one of A, B, C, or D
- This command does NOT classify by domain or skill — answers only
- If an answer cannot be determined for a question, skip it and print a note after the CSV block

Write the CSV rows (including header) directly to a file: replace the `.md` extension of the input path with `_answers.csv` (e.g. `data/processed/cb7-answers.md` → `data/processed/cb7-answers_answers.csv`). Then print one line: `Saved: <output path>`. Print any skipped questions below that.
