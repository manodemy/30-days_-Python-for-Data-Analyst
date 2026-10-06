# Course Design and Python Day03

Date: 2026-10-06 10:14 Asia/Calcutta. Writer: Scribe.
Task: [M-20261006-03](../../tasks/2026-10-06-course-design-day03.md).

## Goal
Upgrade reusable agent design practices and deliver complete Day03 Python theory and all supported assessment types as a continuation of Days01/02.

## Work
- Architect delivered the course-design skill, candidate contract and discoverability/role routing. Existing nine specialists retained.
- Frontend/Data authored theory and questions. Native workers later hit usage limits and were closed; coordinator completed their remaining integration and QA sequentially.
- Rebuilt Day03 through its assembler without copying Day02 CSS. Added shared scoped styling/study interactions, conceptual diagrams, optional detail and text answers.
- Integrated exact/fresh grading, honest unavailable audio, chapter navigation and mobile practice/test fixes. No old lesson content migration, audio synthesis or production operation.
- Security source review found no scoped blocker: authored HTML trust boundary, learner input handling, limited generator writes, opt-in grading and localhost-only preview checked. Not a product-wide security audit.

## Files Changed
- `.agents/skills/course-design/SKILL.md` and `references/design-contract-v1.md`; skills index/registry; Python orchestration skill.
- `.maestro/README.md`, Architect/Frontend/QA role instructions; current brief; STATE, DECISIONS, KNOWN_ISSUES and applicable role memories.
- `scripts/day03_theory.js`, `day03_questions.js`, `day03_question_checks.js`, `day03_assemble.js`, `verify_day03.js`, `verify_day03_questions.js`, `qa_day03_browser.cjs`, `serve_course_preview.cjs`.
- Both `public/python/` and `python/`: `content/py-day-03.js`, `day03.html`, `course-design.css`, `course-study.js`, `python-engine.js`, `python-grading-engine.js`.
- Generated ignored evidence: `.cache/course-design-v1/day03/` screenshots and `report.json`. Existing unrelated dirty files were not reverted or staged.

## Decisions
- ADR-010: v1 is a candidate; Day03 only. Shared primitives stable, confusion-driven teaching diagrams flexible; no routine user sign-off gate or automatic global migration.
- ADR-011: complete study-mode release, narration pending. No fabricated durations or audio certification.
- ADR-012: exact values/types and required-output clearing opt in through rubric metadata, preserving older grading tolerance.
- Canonical authoring sources are scripts; rerun `node scripts/day03_assemble.js`, then verifiers. Preserve Day03 shell instead of recloning Day02.

## Evidence
- VERIFIED: `node scripts/verify_day03_questions.js` 833/833, including 33 theory examples, 20 practice, 25 coding tests, 25 core + 6 optional checks and 25 interviews.
- VERIFIED: `node scripts/verify_day03.js` 51/51, including six public/root mirror pairs.
- VERIFIED: browser harness 38/38, actual Edge/Pyodide, all 45 reference solutions accepted and 45 wrong/45 stale-result submissions rejected. Practice/test UI submission and navigation, optional/interview keyboard disclosure and feedback checked.
- VERIFIED: inspected light/dark 1440x900 and 390x844 lesson and assessment screenshots, code/output/diagram/optional states. Toolbar fit additionally checked at 320px. Exact source hashes and viewport evidence in `.cache/course-design-v1/day03/report.json`.
- VERIFIED: Python sync38/38, topic picker15/15; ten authored/integration JS sources parse. Four assembler output hashes unchanged after regeneration.
- VERIFIED: course-design quick_validate.py passed. Full Maestro validator has 36 PRE-EXISTING heading failures; registry two older missing targets recorded in K-016/017, not silently repaired.
- VERIFIED: localhost preview GET200, POST403, encoded traversal403, malformedURL400. Only task-owned temporary servers8081/8082 stopped; Node8083 remains. Existing8080/3000 left alone.
- Git: main/f72dedac, dirty before and after; no commit/push/deploy. Source-inspected hardlinks to .vercel local build output are not deployment evidence.

## Open Questions
- Narration and Watch are not delivered. Future narrated release needs recordings matching final text, measured timing/captions and full audio QA.
- v1 screenshots remain candidate evidence, not user-approved gold.
- Old py-narrations.js syntax defect and existing documentation/registry debt remain outside scope. No full Next build, production/access audit or all-day browser certification.

## Next Steps
1. Open http://127.0.0.1:8083/python/day03.html for the complete local lesson.
2. Future edits: update authored scripts or shared primitives, run assembler, native verifiers and `node scripts/qa_day03_browser.cjs --url http://127.0.0.1:8083 --playwright C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`.
3. For future lessons, read course-design plus the domain orchestration skill, record continuity and source provenance, then verify the same rendered/behavioral gates. Do not assume automatic migration or audio readiness.
