# Conventions

Snapshot: 2026-10-05. Sources: existing source, tsconfig.json, recent Git history, user-approved protocol.

## Editing and organization
- Match the touched module's existing style. TS/TSX and plain JS/HTML/CSS coexist.
- Read UTF-8 explicitly; avoid PowerShell decode/re-encode round trips for existing Unicode assets.
- Use focused patches; keep unrelated dirty work intact.
- New generators belong in scripts/generators/, migration tooling in scripts/migrations/,
  maintenance tools in scripts/maintenance/, and project docs in docs/.
- Maestro-specific docs and validator live in .maestro/; role adapters live in .claude/agents/.
- Existing loose scripts are not automatically safe to move: inspect callers first.
- Inspect root/public relationships and hardlinks before edits; do not infer canonical source from location alone.
- Do not hand-edit SYNC-GENERATED blocks; inspect the owning generator and relevant skill.
- TypeScript currently has strict:false and noEmit:true; do not silently change compiler policy.
- No repository-wide formatter/linter script was found in package.json; uniform formatting is UNVERIFIED.

## Tests and evidence
- Select tests by changed behavior; shared engines need cross-day regression coverage.
- A passing stub harness is not proof of browser playback, access controls, or deployed behavior.
- Record command, working directory, date, relevant revision/dirty scope, exit code, and limitations.
- Mark commands only found in source as SOURCE-INSPECTED, not executed.
- Do not run an installer, generator, deployment, or migration just to document its command.
- Inspect npm lifecycle scripts: build runs prebuild and copies selected root assets to public/.

## Git and review
- Existing history commonly uses feat(...), fix(...), docs(...), and chore(...).
- Keep changes small; do not commit, push, or stage unrelated files without the user's request.
- When creating a branch, use codex/<topic> unless the user names another branch.
- Current branch policy, remote freshness, and required PR checks are UNVERIFIED.
- PRs explain the problem, resulting behavior, verification, and material remaining limits.
- Approval for local source editing does not authorize deployment, deletion, or migration execution.

## Memory and coordination
- Scribe alone writes brain/, memory/, and shared STATE indexes; specialists propose entries.
- This is logical role ownership: the current agent can execute Scribe sequentially.
- Task briefs name the coordinator/session and writable scope; no overlapping parallel writers.
- Date entries, attach source paths, and label evidence. Never save secrets or personal records.
- Supersede stale facts explicitly. Keep agent memories below 200 lines, with an Archive section.
- The original user asked to build this system directly and prefers progress without repeated approvals.
