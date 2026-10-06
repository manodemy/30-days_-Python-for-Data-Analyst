# Maestro

A repository-local operating system for AI-assisted work. Start with:
> Read AGENTS.md, initialize as Maestro, and brief me on the project's current state.

A request can follow that sentence in the same message. Maestro then continues immediately.
The system requires only readable text files. Its optional validator uses the project's Node.js.
The learning product itself still uses external services; this coordination layer adds none.

## Where things live

| Path | Purpose |
|---|---|
| [AGENTS.md](../AGENTS.md) | Canonical BOOT, WORK, SHUTDOWN, and boundaries |
| [brain/PROJECT.md](brain/PROJECT.md) | Purpose, users, scope, glossary |
| [brain/ARCHITECTURE.md](brain/ARCHITECTURE.md) | Components, flow, directory ownership |
| [brain/CONVENTIONS.md](brain/CONVENTIONS.md) | Editing, testing, Git, evidence conventions |
| [brain/COMMANDS.md](brain/COMMANDS.md) | Exact commands, side effects, execution evidence |
| [brain/DECISIONS.md](brain/DECISIONS.md) | Dated decisions and alternatives |
| [brain/STATE.md](brain/STATE.md) | Current snapshot and unfinished task index |
| [brain/KNOWN_ISSUES.md](brain/KNOWN_ISSUES.md) | Confirmed issues, unknowns, protected areas |
| agents/ | Maestro plus exactly nine canonical role definitions |
| memory/ | Ten role memories; Scribe is their sole writer |
| memory/sessions/ | Dated handoffs; no chat transcripts |
| [tasks/TEMPLATE.md](tasks/TEMPLATE.md) | Scope, ownership, acceptance, reports, checkpoints |
| [tools/validate.cjs](tools/validate.cjs) | Offline structure/link/contract validator |
| ../.claude/agents/ | Thin native adapters; no duplicated role instructions |

## Team and existing domain playbooks

| Specialist | Primary responsibility | Existing domain responsibilities |
|---|---|---|
| Explorer | Read-only discovery and architecture evidence | Sentry inventory; Compass discovery |
| Architect | Design, tradeoffs, ADR proposals | Compass curriculum/schema design |
| Frontend | UI, accessibility, browser state | Theorist; Sync visuals; Timekeeper browser wiring; Animator |
| Backend | APIs, grading logic, integrations | Coach logic and Quizzer grading execution |
| Data | Schema, queries, curriculum data integrity | Quizzer datasets/rubrics; Compass schema |
| QA | Tests, reproduction, acceptance evidence | Scout and domain quality gates |
| Security | Auth, data boundaries, secrets, dependency review | Access and permission review |
| DevOps | Build, tooling, environments, deployment preparation | Sentry packaging; Voice pipeline; Sync generation |
| Scribe | Durable memory and session handoff | Shared documentation recorder |

Maestro selects a lead and exact paths when a domain spans roles. Domain names are
responsibilities, not extra permanent agents. Load only the relevant playbooks:

- [Python orchestration](../.agents/skills/python-day-orchestration/SKILL.md)
- [Course design](../.agents/skills/course-design/SKILL.md) - lesson presentation, continuity and shared styling; Architect defines, Frontend implements, QA verifies
- [SQL orchestration](../.agents/skills/sql-day-orchestration/SKILL.md)
- [Practice audio sync](../.agents/skills/practice-question-audio-sync/SKILL.md)
- [SQL Coach](../.agents/skills/sql-coach-diagnostics/SKILL.md)
- [Scout](../.agents/skills/sql-user-qa-scout/SKILL.md)
- [RAG Animator](../.agents/skills/rag-theory-animator/SKILL.md)
- [File organization](../.agents/skills/project-file-organizer/SKILL.md)
- [Marketing reels](../.agents/skills/marketing-reel-engine/SKILL.md)

These preserve domain data contracts. Domain deployment/sign-off instructions never
grant permission to publish, push, delete, or run migrations automatically.

Course design uses the existing team, not another agent roster. Its
[v1 contract](../.agents/skills/course-design/references/design-contract-v1.md)
separates stable shared styling from flexible teaching choices and records scoped
feedback in the existing task/handoff. The implementation source is
`public/python/course-design.css`, mirrored to `python/course-design.css`;
initial adoption is Day03 only, with Days01/02 untouched references. v1 is a
candidate baseline, not user-approved gold. QA supplies rendered desktop/mobile
evidence in both themes and interaction results, not a score inferred from counts.
Maestro handles routine in-scope decisions and involves the user only for concrete
exceptions or existing authorization boundaries; adoption never triggers a broad migration.

## Execution modes

| Mode | Behavior |
|---|---|
| Native workers | Parent loads a role and brief, dispatches, collects actual results |
| No nested spawning | Main conversation dispatches peers and passes results to Maestro |
| Sequential | Announce [AGENT: name], load its role/memory, execute, then hand off |
| Concurrent chats | Separate task IDs and scopes; a single shared-memory Scribe owner |

Use the existing main conversation as Maestro. The optional Maestro Claude adapter
can perform bounded coordination; inability to spawn inside it must not block work.
Host tool permissions remain authoritative. These files do not enforce access control.
Claude wrapper metadata follows the [official subagent format](https://code.claude.com/docs/en/sub-agents).
Native registration and behavior on other platforms are UNVERIFIED until exercised.
On any file-reading platform, explicitly request AGENTS.md when auto-loading is absent.
CLAUDE.md and GEMINI.md are pointer-only adapters; other editors can use the same opening sentence.

## Keeping memory reliable

A fact needs a date, source, and verification status. Save concise outcomes, not raw logs.
Scribe receives proposed entries from specialists and reconciles them against the working tree.
Inspect the latest contents immediately before a shared write. File ownership is advisory:
two independent hosts cannot coordinate safely through stale checkouts alone.
Use separate worktrees for independent implementation and serialize Scribe integration.
Commit/sync the selected memory files when intentionally transferring work to another checkout.
Never automatically stage the repository; it may contain unrelated work.

No autonomous scheduling, external database, embeddings, or credentials are needed.
When adapting to another project, replace all project-specific brain facts after discovery.
When adding another system in this repo, explicitly design a root routing rule and a separate
memory namespace; do not silently replace this repository's Maestro.

## Validate

From the repository root: `node .maestro/tools/validate.cjs`.
The validator checks documentation integrity, not application correctness or agent obedience.
