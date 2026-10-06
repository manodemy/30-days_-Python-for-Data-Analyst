# Task: <ID> - <title>

## Brief
- Date/time and timezone:
- User goal:
- Status: planned
- Coordinator/session ID:
- Execution mode: native | parent-dispatched | sequential
- Selected roles and actual worker IDs (or sequential; never fabricated):
- Context files:
- Starting branch/HEAD and relevant dirty paths:
- Assumptions / UNVERIFIED claims:

## Ownership
- Implementation owner:
- Writable files/areas (exact paths or bounded patterns):
- Read-only/protected areas:
- Scribe owner/session:
- Dependencies and overlapping tasks:
- Last checkpoint:
- Ownership conflicts: stop overlapping writes; ask Maestro to serialize/reassign.
- Stale ownership: inspect task/Git/worker state; record transfer, never silently steal.

## Plan
1. Inspect the relevant source and side effects.
2. Implement within scope.
3. Verify against acceptance criteria.
4. Review and record the handoff.

## Acceptance
| Criterion | Verification command or review | Result/evidence |
|---|---|---|
| <observable outcome> | <method> | UNVERIFIED |

## Constraints and Approvals
- User constraints:
- Approved actions and their scope:
- Actions requiring additional approval:
- No deletion, force-push, migration execution, dependency upgrades, or production operations without authorization.

## Specialist Report
- Role / worker / execution mode:
- Outcome and paths changed:
- Evidence: command, date, relevant revision/dirty state, exit status, limitations:
- Risks / blockers / out-of-scope findings:
- Proposed durable memory entries (date + source + status):
- Required QA/Security follow-up:

## Checkpoints and Recovery
- YYYY-MM-DD HHMM timezone: completed work; files; pending action; any live process/worker.
- On resume: inspect Git/files before rerunning; do not assume a failed tool call made no changes.

## Closure
- QA result:
- Security result or justified not-applicable:
- Maestro review:
- Scribe handoff path:
- Remaining work:
- Final status: done | blocked | cancelled (never done with unmet required acceptance)
- Allowed lifecycle: planned -> in-progress -> review -> done; blocked can resume; cancelled records why.
