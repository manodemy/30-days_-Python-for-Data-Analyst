---
name: course-design
description: Design or review Manodemy lesson presentation, reusable course styling, teaching patterns, and continuity between days. Use for lesson UI authoring or redesign and shared course design changes; pair with the domain orchestration skill for content, grading, and narration contracts.
---

# Course Design

Use the existing Maestro specialists: Architect owns the design contract, Frontend implements it, and QA verifies the rendered experience. This skill adds no permanent agent or approval stage.

Read [the v1 design contract](references/design-contract-v1.md) when planning, implementing, or reviewing lesson presentation. It defines the continuity brief, stable and flexible decisions, teaching patterns, and evidence requirements.

## Workflow

1. Inspect the requested day, its prerequisites, current reference lessons, and the task's writable paths. Record a short continuity brief in the existing task or handoff before implementation.
2. Choose a teaching pattern for each actual confusion. Keep the essential learning path complete; put optional deeper detail behind an explicit learner choice. Carry useful concept diagrams and recall hooks forward.
3. Reuse the versioned shared styling and existing engine contracts. Add small scoped extensions only when the teaching need cannot use an existing primitive. Do not copy an entire reference day's CSS.
4. Verify screenshots on desktop/mobile in both themes and test meaningful interactions. For content-only work, verify complete study-mode content and text solutions with honest media status and disabled unavailable controls. Apply narrated-release gates only when narration is in scope. Report observed outcomes, failures, and untested cases; element counts and self-rated scores cannot establish a visual or learning pass.
5. Return changed paths, baseline version, evidence, and scoped feedback to Maestro. Scribe owns memory; routine implementation within the brief proceeds without another user approval.

## Initial Adoption

Version 1 is a **candidate baseline**, implemented in `public/python/course-design.css` and mirrored to `python/course-design.css`. Initial adoption is **Day03 only**. Days01/02 are reference material and remain untouched by this adoption.

Day03 has no MP3 assets for this content/design request. Complete study-mode delivery is valid; audio synthesis and full audio-sync parity are outside this acceptance scope. Future content/UI tasks do not automatically require audio regeneration.

The latest Day02 removes its intro showcase grid. Preserve useful concept diagrams and recall hooks; neither that removal nor Day02's denser decorative treatments is a universal design rule.

Candidate screenshots are not user-approved gold screenshots. Record explicit user acceptance with its exact version, image, and scope before using the gold label. Local implementation approval does not authorize a broad migration or imply approval of all future designs.

## Related Contracts

Use [Python orchestration](../python-day-orchestration/SKILL.md) for Python content, measured audio, grading, and timeline behavior. Use [SQL orchestration](../sql-day-orchestration/SKILL.md) only for SQL work and [RAG Animator](../rag-theory-animator/SKILL.md) when narration-driven motion is requested. Design guidance does not replace those runtime contracts.
