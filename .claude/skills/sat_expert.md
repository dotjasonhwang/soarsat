# SAT Expert — Hint Handbook

Heuristics for identifying question type from question text and answer choices.
Use alongside `taxonomy.md` (schema) when classifying questions from extracted Markdown.

Each skill has two sections:

- **Common stems** — question phrasings that reliably identify the skill
- **Otherwise** — signals to use when the stem doesn't match a common pattern

---

## Math Heuristics

### circles

**Common stems**

- "What is the area/circumference of the circle?"
- "What is the length of arc XY?"
- "Line l is tangent to the circle at point P…"
- "The equation of a circle in the xy-plane is…"

**Otherwise**
Look for: radius, diameter, chord, central angle, inscribed angle, sector. Any equation of the form $(x-h)^2 + (y-k)^2 = r^2$ or $x^2 + y^2 = r^2$ signals circles even without an explicit stem. Questions about angles inscribed in semicircles also belong here.

---

### lines_angles_and_triangles

**Common stems**

- "In the figure, lines l and m are parallel…"
- "What is the measure of angle X?"
- "Triangle ABC is similar to triangle DEF…"
- "What is the value of x in the figure?"

**Otherwise**
Look for: parallel lines, transversals, supplementary/complementary angles, triangle congruence or similarity, exterior angle theorem. No trig ratios (sin/cos/tan) and no circles. If a right-angle symbol appears but no trig is needed, it's still here. If trig ratios are used, reclassify as `right_triangles_and_trigonometry`.

---

### right_triangles_and_trigonometry

**Common stems**

- "In right triangle ABC, sin(A) = …"
- "What is the value of cos(θ)?"
- "What is the length of the hypotenuse?"

**Otherwise**
Look for: sin, cos, tan, hypotenuse, opposite/adjacent legs, special triangle ratios (30-60-90, 45-45-90). Pythagorean theorem questions belong here when the triangle is explicitly right. If the problem uses trig identities or the unit circle, it's still this skill.

---

### area_and_volume

**Common stems**

- "What is the volume of the cone/cylinder/sphere?"
- "What is the surface area of the prism?"
- "A solid is formed by…"

**Otherwise**
Any 3D shape calculation defaults here. Also includes 2D area problems when the shape is composite or non-standard (e.g., a region bounded by two curves). Cross-section problems belong here. If the figure is a simple triangle or rectangle with an angle question, prefer `lines_angles_and_triangles`.

---

### linear_equations_one_variable

**Common stems**

- "What is the value of x?"
- "If 3x + 7 = 22, what is x?"
- "Solve for x."

**Otherwise**
Single equation, one unknown, answer is a number or simple expression. No function notation, no graph. If the question has two unknowns but only one equation and asks you to express one in terms of the other, it may be `linear_equations_two_variables`. If the answer is a range, it's `linear_inequalities`.

---

### linear_equations_two_variables

**Common stems**

- "The equation y = 3x − 5 represents… what is the value of y when x = 4?"
- "Line l passes through (2, 1) and (4, 7). What is the slope?"
- "If 2x + y = 10, what is the value of y when x = 3?"

**Otherwise**
Two variables, one equation (or implicitly one relationship). Question asks for one variable's value, a slope, or a point on the line. Distinguish from `systems_of_two_linear_equations` (which has two explicit equations) and `linear_functions` (which uses f(x) notation or describes behavior across a domain).

---

### systems_of_two_linear_equations

**Common stems**

- "How many solutions does the system have?"
- "What is the value of x + y if…?" (given two equations)
- "At what point do the two lines intersect?"
- "The system has no solution. What is the value of k?"

**Otherwise**
Two equations presented together, two unknowns. Key signal: the question cannot be answered without both equations simultaneously. Questions about number of solutions (0, 1, infinite) based on a parameter are a strong marker for this skill.

---

### linear_functions

**Common stems**

- "The function f is defined by f(x) = …"
- "The graph of f is a line with slope…"
- "A table of values for a linear function is shown…"

**Otherwise**
Function notation f(x) with a linear rule, or a context described as a linear relationship (e.g., "a taxi charges a flat fee plus a per-mile rate"). If the function is quadratic or exponential, reclassify as `nonlinear_functions`. If a graph or table is given but the question is about fitting a model, consider `two_variable_data`.

---

### linear_inequalities

**Common stems**

- "Which inequality represents the situation?"
- "What is the solution set of 2x − 3 ≤ 7?"
- "The shaded region satisfies which inequality?"

**Otherwise**
Inequality symbols (≤, ≥, <, >) appear in the problem or answer choices. May involve a number line or coordinate plane graph. Systems of inequalities (two or more) still belong here unless one is nonlinear.

---

### nonlinear_functions

**Common stems**

- "The function f(x) = x² − 4x + 3 has a minimum value of…"
- "Which of the following is the graph of f(x) = 2^x?"
- "For what values of x is f(x) > 0?"
- "Which equation could represent the function shown in the graph?"

**Otherwise**
Any f(x) that is quadratic, exponential, polynomial, or radical. Questions about vertex, axis of symmetry, end behavior, or transformations (shifts, reflections). If the question asks to _solve_ f(x) = 0 (find roots), it may be `nonlinear_equations_and_systems`. If it asks about the _behavior or form_ of the function, keep it here.

**Common confusion with `nonlinear_equations_and_systems`:** If the question asks "which function represents…" or "which equation models…" (choosing a function form from answer choices), it's `nonlinear_functions` — you're identifying/characterizing the function, not solving for a value. Reserve `nonlinear_equations_and_systems` for when you must find a specific numeric solution.

**Common confusion with `ratios_rates_proportional_relationships`:** Exponential growth/decay word problems (bacteria doubling, radioactive decay, population growth) belong here when the question asks about the _rate parameter_ or _form_ of the function — not when it asks to compute a ratio or proportion directly.

---

### nonlinear_equations_and_systems

**Common stems**

- "What are the solutions to x² − 5x + 6 = 0?"
- "How many real solutions does the equation have?"
- "The graphs of y = x² and y = 2x + 3 intersect at… "

**Otherwise**
The goal is to find a specific value (root, intersection point) rather than describe a function. Quadratic formula, factoring, or completing the square are the expected tools. A system of one linear + one nonlinear equation also belongs here. Distinguish from `equivalent_expressions` (no solving, just rewriting).

---

### equivalent_expressions

**Common stems**

- "Which expression is equivalent to…?"
- "Which of the following is equal to (x² − 9) / (x − 3)?"
- "The expression 4x² + 12x + 9 can be written as…"

**Otherwise**
Pure algebraic manipulation — factoring, expanding, simplifying, completing the square as a rewrite (not to find roots). No numeric answer expected. If the answer choices are all expressions (not numbers), this is likely the skill. Distinguish from `nonlinear_equations_and_systems` (which finds a value) and `linear_equations_one_variable` (which solves for x).

---

### ratios_rates_proportional_relationships

**Common stems**

- "If a car travels at 60 miles per hour, how far does it travel in 2.5 hours?"
- "Convert 5 kilometers to meters."
- "The ratio of cats to dogs is 3:5. If there are 24 cats, how many dogs are there?"

**Otherwise**
Look for unit labels, conversion factors, or explicit ratios. Problems involving density, speed, cost per unit, or scale maps belong here. If the problem mentions percent, use `percentages`. If it's about a sample representing a population, consider `inference_from_sample_statistics`.

**Common confusion with `percentages`:** If the problem says "X% of [quantity]" and the core operation is finding that percentage, use `percentages`. If the problem gives a rate or ratio and asks you to scale it (e.g., "at this rate, how many…"), use `ratios_rates_proportional_relationships`.

**Common confusion with `nonlinear_functions`:** Exponential growth/decay contexts (e.g., bacteria doubling every N minutes) belong to `nonlinear_functions` when the question is about the function form or rate parameter — not to this skill.

---

### percentages

**Common stems**

- "What percent of 80 is 20?"
- "A jacket is discounted by 30%. What is the sale price?"
- "The population increased by 15% from 2010 to 2020."

**Otherwise**
Any calculation involving % directly. Percent change (increase/decrease), percent of a total, or tax/tip/discount word problems. If the question involves compound growth over time with a multiplier like 1.05^t, it may be `nonlinear_functions` (exponential). If it uses percent in a data context, check `one_variable_data` or `two_variable_data` first.

---

### one_variable_data

**Common stems**

- "What is the median of the data set?"
- "What is the mean of the values shown in the table?"
- "Which measure of center best represents the data?"

**Otherwise**
Questions about a single list, frequency table, histogram, or dot plot. Measures of center (mean, median, mode) and spread (range, IQR, standard deviation) both belong here. If there are two variables and a relationship between them, use `two_variable_data`.

---

### two_variable_data

**Common stems**

- "Based on the scatterplot, which equation best models the data?"
- "What does the slope of the line of best fit represent?"
- "Which of the following best describes the association between X and Y?"

**Otherwise**
A graph or table showing two variables. Look for scatterplots, correlation language, or lines/curves of best fit. If the question asks about prediction from a model (e.g., "predict the value of y when x = 10"), it's still here. If the question asks about probability of an outcome, use `probability_and_conditional_probability`.

**Common confusion with `nonlinear_functions`:** If a graph is shown and the question asks about y-intercept or initial value _in context_ (e.g., "what does the y-intercept represent?"), it's `two_variable_data` even if the curve is nonlinear. The question is about interpreting data, not analyzing the function itself.

---

### probability_and_conditional_probability

**Common stems**

- "What is the probability that a randomly selected person…?"
- "Given that event A occurred, what is the probability of event B?"
- "A bag contains 4 red and 6 blue marbles. What is the probability of drawing…?"

**Otherwise**
Two-way tables (rows and columns representing categories) are a strong marker for conditional probability. Expected value questions also belong here. If the question is asking you to draw a conclusion about a population from a sample, use `inference_from_sample_statistics` instead.

---

### inference_from_sample_statistics

**Common stems**

- "Based on the survey of 500 people, which conclusion is best supported?"
- "A 95% confidence interval for the mean is (42, 58). What does this mean?"
- "The margin of error is ±3%. Which of the following is consistent with the results?"

**Otherwise**
The key signal is a sample being used to make a claim about a broader population. Confidence intervals and margin of error are near-certain markers. Distinguish from `evaluating_statistical_claims` by scope: inference is about _what the data says_, evaluation is about _whether the study design is valid_.

---

### evaluating_statistical_claims

**Common stems**

- "The researcher concluded that X causes Y. Is this conclusion supported?"
- "Which of the following, if true, would most weaken the claim?"
- "The study used a random sample. What can be concluded?"

**Otherwise**
Questions about study design: observational study vs. controlled experiment, random assignment vs. random sampling, causation vs. correlation. If a question asks whether a conclusion is _valid_ given how the data was collected, it belongs here. If it asks what the data _shows numerically_, it's likely `inference_from_sample_statistics`.

---

## Reading/Writing Heuristics

### transitions

**Common stems**

- "Which choice completes the text with the most logical transition?"
- (Blank appears between two sentences or clauses; answer choices are all transition words/phrases)

**Otherwise**
Answer choices are exclusively transition words or phrases: _however, therefore, for example, furthermore, in contrast, similarly, consequently_. The blank is always at a sentence boundary or clause junction. If the choices include full sentences or content words (not just transitions), it may be `rhetorical_synthesis` or `central_ideas_and_details` instead.

---

### rhetorical_synthesis

**Common stems**

- "The student wants to [accomplish X]. Which choice most effectively uses the notes to accomplish this goal?"
- (Notes are presented as a bulleted list before the question)

**Otherwise**
Always preceded by a "notes" block (bullet points or numbered items from a student's research). The question asks which answer best uses those notes for a specific rhetorical purpose (emphasize a contrast, provide an example, introduce the topic, etc.). This skill has no ambiguous cases — the notes block is the definitive identifier.

---

### words_in_context

**Common stems**

- "As used in the text, what does the word X most nearly mean?"
- "Which choice best maintains the meaning of the underlined word as it is used in the text?"

**Otherwise**
Answer choices are synonyms or near-synonyms of the target word. Even if the answer choices look similar, the correct answer depends on the specific meaning in context, not the most common meaning of the word. Occasionally the stem uses "phrase" instead of "word."

---

### text_structure_and_purpose

**Common stems**

- "Which choice best describes the overall structure of the text?"
- "The main purpose of the underlined sentence is to…"
- "The author mentions X primarily to…"

**Otherwise**
Questions about _why_ a specific part of the text exists, or _how_ the text as a whole is organized. Common structure types: problem/solution, claim/counter-claim, chronological, compare/contrast. Distinguish from `central_ideas_and_details` (which asks _what_ the text says, not _how_ it's organized).

---

### cross_text_connections

**Common stems**

- "Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?"
- "Which statement best describes a difference between the two texts?"
- (Two labeled passages: "Text 1" and "Text 2")

**Otherwise**
Two passages are always present, always labeled. The question asks about the _relationship_ between them — agreement, disagreement, complementarity, or different emphasis. This skill is unambiguous: if there are two labeled texts, it's `cross_text_connections`.

---

### central_ideas_and_details

**Common stems**

- "Which choice best states the main idea of the text?"
- "According to the text, which of the following is true about X?"
- "The text primarily discusses…"

**Otherwise**
Broad comprehension questions. Either asks for the main idea (big picture) or a specific factual detail stated in the text. Distinguish from `inferences` (which asks what can be concluded _beyond_ what is stated) and `text_structure_and_purpose` (which asks about organization or author intent).

**Common confusion with `inferences`:** If the stem says "which finding, if true, would support/undermine the claim" or asks which statement the text "most directly supports," check carefully — if the answer is lifted almost verbatim from the text, it's `central_ideas_and_details`. If the stem says "most strongly suggest" but the correct answer is a straightforward factual detail, still classify as `central_ideas_and_details`.

---

### command_of_evidence

**Common stems**

- Textual: "Which quotation from the passage most effectively illustrates the claim that…?"
- Quantitative: "Which choice most accurately uses data from the graph/table to complete the statement?"

**Otherwise**
Two sub-types: (1) Textual evidence — always asks for a quotation that supports a specific claim; the claim is given and you find the supporting quote. (2) Quantitative evidence — a graph or table accompanies the passage; the question asks which answer correctly interprets the data. The presence of a chart/table with a "complete the statement" task is a strong marker for the quantitative sub-type.

---

### inferences

**Common stems**

- "Based on the text, what can be inferred about X?"
- "The text implies that…"
- "What conclusion is most strongly supported by the text?"
- "What does the text most strongly suggest?"

**Otherwise**
The answer is not stated directly in the text — it must be reasoned from what is stated. Distinguish from `central_ideas_and_details` (which asks for something explicitly stated) by checking whether the answer requires a logical step beyond the text. If the stem says "according to" or "the text states," it's likely `central_ideas_and_details`.

**Common confusion with `central_ideas_and_details`:** The stem "most strongly suggest" can appear in both skills — use the answer choices to decide. If the choices require connecting unstated implications or drawing a conclusion not in the text, it's `inferences`. If they reflect directly stated facts, it's `central_ideas_and_details`.

---

### boundaries

**Common stems**

- "Which choice effectively sets off the [phrase/clause] from the rest of the sentence?"
- (Answer choices differ only in punctuation: comma, semicolon, colon, em dash, or no punctuation)

**Otherwise**
Answer choices that vary _only_ in punctuation marks — not in words — signal this skill. The task is identifying where a grammatical boundary (independent clause, introductory phrase, parenthetical, list) should be marked. If the choices also differ in words or word order, it's likely `form_structure_and_sense`.

**Common confusion with `form_structure_and_sense`:** Check the answer choices carefully. If every choice uses the exact same words but differs only in punctuation (e.g., "vapor. With" vs. "vapor, with" vs. "vapor with"), it's `boundaries`. If the choices change verb form, number, tense, or any actual word, it's `form_structure_and_sense`.

---

### form_structure_and_sense

**Common stems**

- "Which choice completes the text so that it conforms to the conventions of Standard English?"
- (Answer choices differ in verb form, pronoun, or word choice — not just punctuation)

**Otherwise**
The broadest grammar skill. Covers subject-verb agreement, pronoun case and reference, verb tense consistency, modifier placement, parallel structure, and word choice (affect/effect, who/whom). If the answer choices differ in _words_ (not just punctuation), default to this skill. Distinguish from `boundaries` by checking whether any punctuation-only choices exist — if yes, it may be `boundaries`.
