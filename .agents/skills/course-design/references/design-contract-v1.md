# Course Design Contract v1

Status: candidate baseline, 2026-10-06. Initial consumer: Python Day03.
Implementation source: `public/python/course-design.css`; local-server mirror: `python/course-design.css` (paths relative to repository root).
This contract specifies acceptance, not evidence that the implementation already passes.

## Continuity Brief

Record these fields in the existing task or handoff; do not create a second memory system:

| Field | Required decision |
|---|---|
| Scope | Day, learner outcome, writable files, baseline version, source revision or working-tree evidence |
| Incoming knowledge | What earlier days actually taught; prerequisite gaps to explain now |
| Recall bridge | One useful earlier idea and how the new idea extends or corrects it |
| Likely confusion | Specific misconception, chosen teaching pattern, observable learner check |
| Depth | Essential path versus named optional detail; no optional-only graded prerequisite |
| Modes | Read behavior, Watch behavior, available narration, honest fallback if unavailable |
| Continuity | Shared primitives retained, deliberate deviations, next-day handoff without premature prerequisites |
| Evidence | Screenshot matrix, interaction results, exceptions and unresolved checks |

For Day03, verify the bridge from values, types, and operators to strings against the current Days01/02 sources. An index strip or slice boundary diagram may clarify strings better than a generic card grid. This is a teaching choice, not a required layout for every topic.

## Stable Versus Flexible

| Stable within a baseline version | Flexible within the task |
|---|---|
| Shared typography, spacing scale, content widths, controls, focus states and responsive behavior | Examples, analogies, concept diagrams and worked-example order |
| Semantic color meanings with accessible light/dark tokens | Choice and combination of teaching patterns based on confusion |
| Heading hierarchy, code/output legibility, callout semantics, essential/optional distinction | Number of examples and depth appropriate to the lesson |
| Read/Watch state semantics and existing selector/audio/assessment contracts | Small scoped presentation extensions with documented reasons |
| Source/mirror ownership and baseline version provenance | Motion that explains a concept and respects reduced motion |

Extract reusable primitives into the shared stylesheet, scoped to its adopting lesson root. Inspect existing selectors and hardlinks before editing; preserve the engine's IDs, reveal hooks, question controls and theme mechanism. Day-specific CSS should express an actual exception, not duplicate shared rules. Do not import all of Day02's CSS or opt other days into a global selector change.

Use a visible version comment or equivalent maintained metadata in the shared source; record each consumer's version in its integration evidence. Keep source and mirror equivalent and verify parity. A change to stable meanings or shared behavior requires an explicit version decision and review of actual consumers; no automatic migration to old or future days. Useful new patterns can remain local until their reuse is established.

## Teaching Patterns

Select the smallest pattern that resolves the misconception; this table is a menu, not a per-section checklist.

| Learner confusion | Useful pattern | Evidence of understanding |
|---|---|---|
| Cannot picture a value, position, or relationship | Labeled concept diagram, index strip or boundary diagram | Predict a position or result and explain the boundary |
| Confuses two similar operations | Side-by-side contrast with one changed variable | Select the correct operation for a new case |
| Cannot follow an execution sequence | Short worked trace with code, state and output | Predict the next state before revealing it |
| Knows syntax but not when it applies | Concrete task followed by a transferable rule | Apply the rule to a different input |
| Repeats a known error | Counterexample, cause, correction and retry | Diagnose and repair a related failure |
| Forgets a previous concept | Brief recall hook connected to the current example | Retrieve the earlier rule without rereading the explanation |

Essential material includes the concept, an accurate example and the explanation needed to complete the day's assessments. Optional deeper detail is labeled by its subject and can be expanded without interrupting the main path. Include edge cases in the essential path when correctness depends on them; do not hide prerequisites behind optional disclosure. An explanation or visible diagram must earn its space by answering a learner question.

The latest Day02's intro showcase grid was removed. Keep that introduction's treatment as the reference for this adoption; retain concept diagrams and recall hooks where useful. Do not infer a ban on grids, diagrams, cards, or richer explanations in other contexts. Do not canonize every dense or decorative treatment in the reference lesson.

## Read, Watch, and Color

- Read mode presents the complete essential explanation in document order without requiring audio playback or waiting for a reveal. Optional detail remains learner-controlled.
- Watch mode uses real available narration and the domain skill's measured cues. Pause, seek forward/backward, topic changes and mode changes must restore the correct content state. Mode switches preserve the learner's topic and clear inappropriate hidden states; returning to Read reveals essential content.
- Missing narration is an explicit availability state with a complete study-mode reading path, text solutions and disabled unavailable media controls. Do not simulate playable tracks or invent timing to claim Watch completion. Day03 has no MP3 assets for this content/design request; audio synthesis is outside scope.
- Use semantic tokens for information/concepts, successful results, caution/pitfalls and errors. Preserve each meaning across light/dark themes; exact hues follow the existing accessible palette. Syntax highlighting is a separate role, not a correctness verdict.
- Labels, symbols, borders or text must carry meaning in addition to color. Keep focus visible, code readable, contrast sufficient, and diagrams understandable without motion. Avoid adding color or animation solely to make every section different.

## Verification and Baselines

QA captures and inspects actual rendered screenshots at desktop and mobile widths in **both light and dark themes**, recording exact viewport sizes, lesson section, mode/state, source revision or file hashes, and artifact paths. For this adoption, representative targets are 1440x900 and 390x844; use additional widths when content exposes a responsive defect. Cover the introduction, a concept diagram, worked code/output, optional detail and an assessment surface. Reuse a screenshot only when it visibly covers the asserted states.

Check text wrapping, page overflow, readable code, diagram labels, sticky controls, contrast, clipping and focus. Test Read/Watch switching where available, playback/pause and forward/back seek where real audio exists, topic navigation, optional-detail keyboard activation, theme switching, and question selection/submission/feedback. With unavailable media, verify its status, disabled controls, complete reading content and text solutions instead. Verify affected sync/picker regressions with the domain harnesses. Include a reduced-motion check for introduced animation. Report each unsupported or untested behavior explicitly.

Choose acceptance by delivery scope. A content/design task can complete in study mode without audio synthesis or regeneration. Mark narrated-release gates out of scope with the availability reason; do not claim full audio-sync parity. A narrated release additionally requires actual assets and the domain skill's measured-duration, caption and sync evidence; missing required media then remains unresolved. Regenerate audio for a future UI/content task only when its authorized scope requires a narrated release or a change invalidates narration that the task must deliver.

Source checks and registry counts establish structure only. A passing count, arbitrary quality percentage, or forced self-rating does not prove a visual, behavioral, pedagogical, or audio pass. Report criterion-specific evidence and limits; fix within scope, then recheck affected states.

| Baseline state | Meaning |
|---|---|
| v1 candidate | Implemented proposal and its dated QA artifacts; approval is not implied |
| User-approved gold | Specific screenshot/version/scope explicitly accepted by the user, with a traceable acceptance reference |

No user-approved gold is established by this contract. Gold promotion is optional and separate from completing an authorized implementation. A later candidate remains a candidate until explicitly accepted; comparisons to gold should explain intentional changes rather than silently overwrite the evidence.

## Feedback and Exceptions

Return feedback with: observation, source/screenshot, learner impact, affected day/component/mode/theme, proposed correction, and whether it is local or a proposed shared rule. A single complaint does not become a course-wide prohibition. Scribe records accepted durable decisions; specialists return proposals without editing memory.

Maestro resolves routine design choices and in-scope fixes using the brief and available evidence. Involve the user only for a material unresolved preference, a scope expansion, an irreversible action, or another explicit authorization boundary. Explain the concrete exception and its consequence. Do not add routine design sign-off gates, request blanket approval, or apply an approved local change to unrelated lessons.
