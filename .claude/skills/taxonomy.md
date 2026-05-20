# SAT Taxonomy — Authoritative Reference

## Output Schema

Every classified question must produce exactly one CSV row:

```
test_id,section,module,question,answer,domain,skill
```

| Column   | Values                                       |
| -------- | -------------------------------------------- |
| test_id  | Source PDF stem (e.g. `practice_test_1`)     |
| section  | `rw` (Reading and Writing) or `m` (Math)     |
| module   | `1` or `2`                                   |
| question | Question number within the module (integer)  |
| answer   | Correct answer letter: `A`, `B`, `C`, or `D` |
| domain   | One of the 8 domain keys below               |
| skill    | One of the 29 skill keys below               |

---

## Domain → Skill Mapping

### Reading and Writing

**rw_craft_structure**

- words_in_context
- text_structure_and_purpose
- cross_text_connections

**rw_information_ideas**

- central_ideas_and_details
- command_of_evidence
- inferences

**rw_standard_english**

- boundaries
- form_structure_and_sense

**rw_expression_ideas**

- rhetorical_synthesis
- transitions

### Math

**m_algebra**

- linear_equations_one_variable
- linear_equations_two_variables
- linear_functions
- systems_of_two_linear_equations
- linear_inequalities

**m_advanced_math**

- equivalent_expressions
- nonlinear_equations_and_systems
- nonlinear_functions

**m_problem_solving**

- ratios_rates_proportional_relationships
- percentages
- one_variable_data
- two_variable_data
- probability_and_conditional_probability
- inference_from_sample_statistics
- evaluating_statistical_claims

**m_geometry**

- area_and_volume
- lines_angles_and_triangles
- right_triangles_and_trigonometry
- circles

---

## Hard Constraints

- A skill must always pair with its mapped domain. `circles` → `m_geometry`, never anything else.
- If a question cannot be confidently classified, omit the row and note it separately.
- Do not invent domain or skill values. Use only the keys listed above verbatim.
