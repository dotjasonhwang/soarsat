Generate SAT Math questions based on the arguments: $ARGUMENTS
Format: <skill> <difficulty> <count> <output_filename> [optional: "free-form focus instruction"]

- skill: any Math skill key from taxonomy.md (e.g. circles, linear_functions, equivalent_expressions)
- output_filename: a short snake_case name with no extension. The JSON must be saved to data/generated/<output_filename>.json
- focus instruction: optional quoted string; if provided, apply it as a binding constraint on the questions generated

Examples:
circles easy 3 circles_easy
circles easy 3 circles_standard_eq "Focus on questions that use the standard circle equation"
linear_functions medium 5 lf_realworld "Use real-world context like taxi fares or temperature conversion"

If a focus instruction is provided, honor it faithfully — it overrides the default variety you would otherwise generate.

Read .claude/skills/taxonomy.md and .claude/skills/sat_expert.md for context.

Generate the requested number of original SAT-style multiple choice questions for the given skill and difficulty. Each question must:

- Match the tone, style, and complexity of real Digital SAT questions
- Have exactly 4 answer choices labeled A, B, C, D
- Have one and only one correct answer — no two choices may be mathematically equivalent or both correct under any interpretation
- Have three plausible distractors that reflect common student errors (not obviously wrong)
- Use Unicode math symbols instead of LaTeX (e.g. ², π, √, ≤, ≥, −)

Difficulty guide:

- easy: single-step, values given directly, tests one concept
- medium: two-step, may require setting up an equation first
- hard: multi-step, abstract setup, combines 2+ concepts or requires insight

After the JSON block, print one line: `Save to: data/generated/<output_filename>.json`

Output a single JSON code block and nothing else. Schema:

{
"skill": "<skill key from taxonomy>",
"difficulty": "<easy|medium|hard>",
"questions": [
{
"id": 1,
"question": "<full question text>",
"choices": {
"A": "<choice text>",
"B": "<choice text>",
"C": "<choice text>",
"D": "<choice text>"
},
"answer": "<A|B|C|D>",
"explanation": "<one sentence explaining why the answer is correct>"
}
]
}
