# Decisions

| ID / date | Decision | Reason | Alternatives / status |
|---|---|---|---|
| ADR-001 / 2026-10-05 | AGENTS.md is the canonical protocol; .maestro holds roles, brain, memory, tasks | Portable context across coding tools | Tool-specific duplicated instructions rejected; ACCEPTED |
| ADR-002 / 2026-10-05 | Exactly nine specialists plus Maestro | User's explicit roster | Domain roles remain responsibilities, not extra permanent agents; ACCEPTED |
| ADR-003 / 2026-10-05 | Scribe is the sole shared-memory writer | Prevent simultaneous contradictory updates | Every specialist writing directly rejected; ACCEPTED |
| ADR-004 / 2026-10-05 | Native workers when available, parent dispatch or sequential fallback otherwise | Nested spawning was unavailable in an earlier worker session | Do not claim dormant roles are running; ACCEPTED |
| ADR-005 / 2026-10-05 | Preserve existing .agents/skills and map their responsibilities | Existing SQL/Python contracts contain project-specific evidence | Replacing or duplicating playbooks rejected; ACCEPTED |
| ADR-006 / 2026-10-05 | Bootstrap organizes new coordination files only | Dirty workspace and intentional root/public deployment relationships | Bulk cleanup/moving existing scripts deferred to scoped tasks; ACCEPTED |
| ADR-007 / 2026-10-05 | Separate command discovery from execution evidence | npm build copies assets; generation can mutate files | Running every discovered command rejected; ACCEPTED |
| ADR-008 / 2026-10-05 | BOOT continues an already-supplied request | Avoid an unnecessary wait after initialization | Waiting only applies to a bare initialization request; ACCEPTED |
| ADR-009 / 2026-10-05 | Python and SQL playback architecture parity | Unified master timeline (`combinedTracks`) drives all inline buttons; isolated `new Audio()` instances forbidden | Isolated audio clips desyncing progress UI rejected; ACCEPTED |
| ADR-010 / 2026-10-06 | Reusable course-design v1 candidate, initially Day03 only | User requested uniformity with creative continuation; retain existing nine specialists and require continuity brief plus rendered evidence | Copying Day02 CSS or automatic global migration rejected; ACCEPTED for local implementation, not user-approved gold. Source: tasks/2026-10-06-course-design-day03.md; affected skill/role routing and scoped course-design.css |
| ADR-011 / 2026-10-06 | Day03 content/design delivered in complete study mode; narration availability explicit | No recorded assets for this content; text solutions and essential reading remain usable | Invented timings and playable missing audio rejected. Narrated release remains a separate gate. Source: Day03 media metadata and browser report; affected assembler/engine |
| ADR-012 / 2026-10-06 | Exact, fresh result grading is opt-in per rubric | Text lessons must distinguish case/spacing/types and reject stale globals | Global tolerance change rejected to preserve older lessons. Source: question schemas, grading engine and 45 browser positive/negative/stale tests |

Source: user request and subsequent audit approval in this session; repository evidence is indexed in the brain.
For each future ADR include date, status, decision, reason, alternatives, source/evidence, and affected paths.
Use SUPERSEDED plus the replacement ADR ID when a decision changes; preserve its historical reason.
