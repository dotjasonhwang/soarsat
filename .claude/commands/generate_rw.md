Generate SAT Reading and Writing questions based on the arguments: $ARGUMENTS
Format: <skill> <difficulty> <count> <output_filename> [optional: "free-form focus instruction"]

- skill: any RW skill key from taxonomy.md (e.g. words_in_context, boundaries, rhetorical_synthesis)
- output_filename: a short snake_case name with no extension. The JSON must be saved to data/generated/<output_filename>.json
- focus instruction: optional quoted string; if provided, apply it as a binding constraint on the questions generated

Examples:
words_in_context medium 5 wic_medium
boundaries easy 4 boundaries_easy "Focus on introductory phrases"
rhetorical_synthesis medium 5 rhet_synth_med
inferences hard 3 inferences_hard

If a focus instruction is provided, honor it faithfully — it overrides the default variety you would otherwise generate.

Read .claude/skills/taxonomy.md and .claude/skills/sat_expert.md for context.

Generate the requested number of original SAT-style Reading and Writing questions for the given skill and difficulty. Each question must:

- Match the tone, style, and complexity of real Digital SAT Reading and Writing questions
- Have exactly 4 answer choices labeled A, B, C, D
- Have one and only one correct answer
- Have three plausible distractors that reflect common student errors (not obviously wrong)
- Include a `passage` field with the relevant text (or notes for rhetorical_synthesis, or two texts for cross_text_connections); only `null` if the skill genuinely requires no passage

Difficulty guide:

- easy: the correct answer is clear from a single sentence or obvious signal; distractors are weaker
- medium: requires reading the full passage carefully; one or two distractors are genuinely tempting
- hard: requires subtle reasoning; multiple choices are defensible on first read; the distinction requires close attention to what the text actually says vs. implies

After the JSON block, print one line: `Save to: data/generated/<output_filename>.json`

Output a single JSON code block and nothing else. Schema:

{
"skill": "<skill key from taxonomy>",
"difficulty": "<easy|medium|hard>",
"questions": [
{
"id": 1,
"passage": "<passage text, or null if not applicable>",
"question": "<the question stem>",
"choices": {
"A": "<choice text>",
"B": "<choice text>",
"C": "<choice text>",
"D": "<choice text>"
},
"answer": "<A|B|C|D>",
"explanation": "<one to two sentences explaining why the answer is correct and what makes each distractor wrong>"
}
]
}
