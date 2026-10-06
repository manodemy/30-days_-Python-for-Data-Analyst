# Project

Snapshot: 2026-10-05. Evidence: package.json, server.py, course trees, app routes, existing skills.

| Item | Verified or source-inspected understanding |
|---|---|
| Name | Manodemy Web V2; package name manodemy-web-v2 |
| Purpose | Interactive learning platform with SQL, Python, Excel, and RAG-related content |
| Users | Learners using lessons/practice/tests; administrators managing the platform |
| Product surfaces | Static learning studios, narrated theory, browser code practice, grading, home/progress, payments |
| Stack | Next.js 14 / React 18 declared ranges, TypeScript, plain JS/HTML/CSS, Python tooling, SQL |
| Services referenced | Supabase authentication/data/functions, Razorpay payment flows; live configuration UNVERIFIED |
| Current system goal | One Maestro entry point and nine specialists with portable file-based memory |

## Goals
- Preserve working course behavior while improving curriculum, synchronization, grading, and access.
- Make changes traceable to evidence, scoped ownership, tests, and durable handoffs.
- Give each new tool enough current context for its task without loading the whole repository.

## Non-goals for this bootstrap
- Redesigning the product, moving existing course files, or fixing unrelated known issues.
- Replacing domain skills, adding a hosted agent service, or claiming automatic background execution.
- Certifying live payments, security posture, deployment state, or every curriculum day.

## Glossary
| Term | Meaning |
|---|---|
| Maestro | Repository coordinator, also the historical name used by domain playbooks |
| Brain | Shared project facts and decisions in this folder |
| Memory | Dated durable role learnings; Scribe writes them |
| Handoff | Recoverable session/task outcome with exact next steps |
| Domain playbook | Existing .agents/skills instructions for a subject area |
| Studio | Static browser lesson/practice engine |
| Narration | Script/audio/caption assets; inspect schema before assuming JSON contains timestamps |
| Root mirror | Root python/ and related development copies of public assets |
| VERIFIED | Command/check executed with recorded result |
| SOURCE-INSPECTED | Directly observed in source; runtime behavior not proven |
| UNVERIFIED | Not established by the available evidence |

Product roadmap priorities, exact target audience segments, pricing, and live rollout status are UNVERIFIED.
