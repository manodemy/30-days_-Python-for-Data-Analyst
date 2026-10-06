# Architecture

Snapshot: 2026-10-05. SOURCE-INSPECTED unless an executed check is explicitly cited.
Sources: package.json, vercel.json, middleware.ts, app/, public/, server.py, scripts/sync-assets.js.

## Request and content flow
1. Vercel redirects / to /landing_v2/index.html; SQL aliases rewrite to /Version-3/index.html.
2. Static studios load ordered scripts, manifests, content, audio, editor, runtime, and grading.
3. SQL browser execution uses sql.js; Python uses Pyodide. API SQL is a separate server path.
4. Next middleware handles campaigns, legacy redirects, and notebook access; localhost bypasses it.
5. Next notebook pages can load Supabase content; app/api routes provide server features.
6. Supabase functions handle payment/business operations; deployed state is UNVERIFIED.
7. Authoring scripts generate content/audio/sync data. Selected root assets copy to public at prebuild.

## Directory map
| Area | Responsibility / entrypoints |
|---|---|
| public/Version-3/ | SQL studio: index.html, mano-engine.js, grading-engine.js, content/, db-seeds/, DayXX/ |
| public/python/ | Python studio: dayNN.html, python-engine.js, python-grading-engine.js, content/, DayXX/ |
| public/sql/, public/excel/ | Other static course surfaces; inspect actual route before choosing |
| public/sql-data/ | SQLite files consumed by app/api/sql/route.ts |
| app/notebook/[dayId]/page.tsx | Notebook routing, enrollment/content loading |
| app/api/ | SQL, tutor, reviews/summary, admin-intelligence, activity/recent handlers |
| app/auth/callback/route.ts | Auth callback |
| app/desk-hero/, components/DeskHero/ | React/Three.js scene |
| components/ | CodeMirrorEditor and NotebookInitializer plus scene components |
| lib/supabaseServer.ts | Cookie-backed SSR client and privileged server client |
| src/grading/ | TypeScript grading/parser/diagnostic modules; browser integration UNVERIFIED |
| middleware.ts, init.ts | Routing/access/tracking and initialization |
| home.html, landing_v2/, public equivalents | Navigation, landing, course links |
| python/, sql/, excel/ | Root development/course copies; some differ from public |
| server.py, notebooks/ | Static notebook server and generated HTML workflow |
| narrations/ | Narration JSON; schemas can hold authored scripts, not only timestamps |
| sql_migrations/, supabase/migrations/ | Two migration trees; applied order UNVERIFIED |
| supabase/functions/ | Payment and business edge functions |
| scripts/ | Audio/sync/authoring plus loose experiments; organized buckets also exist |
| tests/ | SQL grading harness; additional tests live in scripts/ |
| docs/ | Curriculum, specifications, business, branding, prompts |
| marketing/, reels_hub/, meta_ads_growth_hub/, Instagram Ads/ | Marketing/reel assets and tooling |
| jarvis/, tools/, vendor/ | Auxiliary tooling/vendor areas; detailed ownership UNVERIFIED |
| .agents/skills/ | Existing domain SOPs; registry is not a complete inventory |
| .maestro/, .claude/agents/ | Coordination/memory and native adapters |
| .next/, .cache/, node_modules/, .vercel/, .kilo/ | Local/generated/tool state; not cleanup targets by assumption |

## Data and trust boundaries
- SQL API allowlists four database names and opens local databases read-only.
- Middleware excludes /api/*: each sensitive route needs its own access checks.
- lib/supabaseServer.ts distinguishes SSR and privileged clients; never copy credential values into memory.
- Tutor route references Gemini; Supabase and payment services are external product dependencies.
- Exact intended free-day policy differs across sources; middleware currently marks Python01-03 and SQL01-17 free.
- Localhost success cannot establish production access behavior.

## Build and deployment
- npm run build executes scripts/sync-assets.js through prebuild, then Next build.
- Sync covers landing_v2, home.html, referral-earnings.html if present, admin.html, supabase.js.
- It does not synchronize Python engines/content. Root/public canonical ownership needs file-specific inspection.
- .github/workflows/deploy.yml uploads repository-root content to Pages.
- .github/workflows/vercel-deploy.yml contains production deployment steps on push and PR triggers.
- No production action was executed during bootstrap. See KNOWN_ISSUES before publishing.

## Source-of-truth limits
Files establish declared behavior, not live state. Recheck generated code, mirrors, and versioned script
URLs before editing. Existing root hardlinks mean two paths can sometimes refer to the same file.
