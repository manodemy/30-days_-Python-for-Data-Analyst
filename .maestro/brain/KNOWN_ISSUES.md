# Known Issues

Snapshot: 2026-10-05. These are observations, not authorization to repair unrelated areas.

| ID | Evidence / status | Impact and next action |
|---|---|---|
| K-001 | SOURCE-INSPECTED: root/public Python engines and content differed in the preceding Sentry report | Development and deployed trees can behave differently; compare both before changes |
| K-002 | SOURCE-INSPECTED: preceding Sentry found Day01 Audio06-20 unreferenced by script/engine | 15 orphan MP3s; review references and obtain deletion approval before cleanup |
| K-003 | SOURCE-INSPECTED: preceding Sync report and current engine search | Python Day04 content has no track registration; Days02/03 lack generated measured durations; browser impact UNVERIFIED |
| K-004 | SOURCE-INSPECTED: preceding Sync report | SQL Day18 content exists without timeline registration; certification UNVERIFIED |
| K-005 | SOURCE-INSPECTED: scripts/maintenance/scout_delta_tester.py | Fixed Days03-05 checks, substring contracts, missing-file skips, ignored return Boolean can create false greens |
| K-006 | SOURCE-INSPECTED: package.json and scripts/sync-assets.js | Build copies only selected root assets, not Python mirrors; backup/reconcile relevant dirty inputs before running |
| K-007 | SOURCE-INSPECTED: .agents/skills/skills-registry.json versus disk | Registry omits existing SQL orchestration skill; discover actual SKILL.md files as needed |
| K-008 | SOURCE-INSPECTED: .github/workflows/vercel-deploy.yml | PR and push triggers lead to production deployment steps; remote behavior/access UNVERIFIED; inspect before pushing/opening PR |
| K-009 | SOURCE-INSPECTED: .github/workflows/deploy.yml | Pages uploads repository root; public exposure of committed artifacts is UNVERIFIED; memory must never contain secrets/personal records |
| K-010 | SOURCE-INSPECTED: sql_migrations/ and supabase/migrations/ | Parallel migration trees and repeated numeric prefixes; applied order/canonical history UNVERIFIED |
| K-011 | VERIFIED: initial git status | 172 pre-existing changed/untracked paths; user intent for them UNVERIFIED; preserve them |
| K-012 | SOURCE-INSPECTED: .vercelignore versus .gitignore | Python MP3 exception exists in Git ignores but was not found in Vercel ignore rules; actual upload behavior UNVERIFIED |
| K-013 / P1 | SOURCE-INSPECTED: app/api/admin-intelligence/route.ts:7,17; Security review2026-10-05 | Hardcoded credential has service_role claim and is used by privileged client. Validity/live privileges UNVERIFIED. Seek authorized rotation/revocation and server-side secret configuration; never copy value into memory |
| K-014 / P1 | SOURCE-INSPECTED: app/api/admin-intelligence/route.ts:9,458; middleware.ts:343 | No caller/admin check before privileged data queries; API excluded from middleware. Live reachability/disclosure UNVERIFIED. Add authenticated admin authorization and tests in a separately scoped repair |
| K-015 | VERIFIED: git diff --check exit1 during bootstrap | Pre-existing Python content/narration/style whitespace errors; unrelated to new system files; not repaired |
| K-016 / 2026-10-06 | VERIFIED: .maestro/tools/validate.cjs reports 36 missing-heading failures in older task/session files | Current Day03 brief/handoff and changed roles have no reported defect; repair older docs only in a scoped follow-up |
| K-017 / 2026-10-06 | SOURCE-INSPECTED: skills-registry.json references absent reddit-growth-copilot and day-curriculum-builder skill files | Existing registry debt preserved; new course-design target exists and skill validator passes |
| K-018 / 2026-10-06 | VERIFIED syntax failure in pre-existing public/python/content/py-narrations.js near line91 | Day03 study shell no longer loads unused broken bundle; other consumers are not repaired or certified. Do not run old Day03 narration/register generators without review |
| K-019 / 2026-10-06 | VERIFIED Day03 study mode; SOURCE-INSPECTED no matching narrated assets for final content | Refines K-003 for Day03: study is delivered, Watch is unavailable. Future audio needs new recordings, measured durations, captions and sync QA; old narration drafts do not prove coverage |

Earlier role reports were read-only inspections in this same conversation on 2026-10-05.
Recheck their source before using them to justify edits; runtime timing was not remeasured.
K-013/014 were independently reviewed during bootstrap; the route matches HEAD after line-ending normalization.
They block product security certification, not delivery of this documentation system.

## Protected areas
- public/, narrations/, sql_migrations/, supabase/migrations/, root config, and environment files.
- Never dump .env contents into logs, chat, tasks, or memory.
- Existing hardlinks and generated blocks need owner-aware editing.
- Do not run organize_workspace.py as part of initialization; its cleanup scope needs explicit review.

## Outstanding verification
- Fresh install, full Next build/start, deployed routes, auth/RLS, payment integrations.
- Real browser timeline/audio/grading behavior across all days.
- Claude native agent discovery and other tools' automatic instruction loading.
- Remote branch freshness, deployment protections, product roadmap priorities.
