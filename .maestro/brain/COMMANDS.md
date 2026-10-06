# Commands

Run from the repository root. Snapshot: 2026-10-05; main at f72dedac with existing dirty work.
Local tools executed: Node v24.12.0, npm 11.6.2, Python 3.14.0.
CI declares Python 3.11; compatibility beyond the executed checks is UNVERIFIED.

## Executed baseline
| Exact command | Result | Scope |
|---|---|---|
| git status --short | Exit 0 | Initial 45 modified tracked paths + 127 untracked paths |
| git log -10 | Equivalent dated/abbreviated format executed, exit 0 | Local history only |
| git branch -avv | Exit 0 | main; v2; two existing auxiliary worktree branches; cached remote refs |
| node --version | Exit 0, v24.12.0 | Current machine |
| npm --version | Exit 0, 11.6.2 | Current machine |
| python --version | Exit 0, 3.14.0 | Current machine |
| node scripts/test_python_sync.js | Exit 0, 38/38 | Day01 DOM-stub sync harness |
| node scripts/test_python_topic_picker.js | Exit 0, 15/15 | Day01/02 topic-picker harness |
| node tests/test-grading-engine-v4.js | Exit 0, 24/24 | Local in-memory SQLite grading suite |

## Available commands: SOURCE-INSPECTED, runtime UNVERIFIED
| Command | Purpose / prerequisites / side effects |
|---|---|
| npm ci | Install lockfile dependencies; network/lifecycle/native build effects; replaces node_modules |
| npm run dev -- --port 3000 | Next development server; choose an unused port; writes .next |
| npm run build | Runs prebuild asset copying, then next build; writes public assets and .next |
| npm run start -- --port 3000 | Serve an already-built Next app |
| npm run sync | Copies selected root landing/home/admin/Supabase assets into public; no Python mirror sync |
| npm run build:audio | Runs scripts/build-audio.js; audio generation, review service/file effects first |
| python server.py | Root static/notebook development server; default port 8080; not Next middleware/API parity |
| python server.py build | Generates static day HTML; overwrites generated outputs |
| python server.py build 5 | Generates day05.html per server.py CLI documentation |
| node --check public/python/python-engine.js | Syntax-only check; does not prove runtime correctness |
| node --check public/Version-3/mano-engine.js | Syntax-only SQL engine check |
| python scripts/maintenance/scout_delta_tester.py day05 | Static inspection; known false-green limitations in KNOWN_ISSUES |
| python scripts/build_python_sync_data.py | ASR/alignment and generated output; inspect dependencies/side effects first |

No npm test or npm lint script is defined. Do not advertise either as runnable.
No deployment/migration command is an ordinary verification step. Inspect the workflow and get scoped authorization.

## Maestro validation
- Exact command: `node .maestro/tools/validate.cjs`
- Offline, read-only; checks role count, required sections, adapters, links, memory size, task/session shape.
- Execution result is recorded in the bootstrap task and session handoff.
- Final bootstrap run on 2026-10-05: exit 0, 298 checks passed. Three negative fixtures were rejected.
- New-file whitespace scan: all 45 files passed; validator syntax check also passed.
- Does not certify application behavior, detect all secrets, or enforce agent permissions.
