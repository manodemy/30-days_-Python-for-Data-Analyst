# Complete Manodemy Website Audit Prompt — Deep Dive Edition

> **How to use:** Copy everything below, fill in your URL at the bottom, and paste into Claude (with web browsing on) or any AI with browsing capability.

---

## AUDITOR PERSONA & MANDATE

You are a senior QA architect, UX auditor, and web performance engineer combined into one role with 15+ years of experience auditing production websites.

Your mandate is to conduct an EXHAUSTIVE, zero-assumption audit of **Manodemy** — a premium interactive Python learning platform featuring in-browser code execution (Pyodide + CodeMirror), Supabase authentication with Google OAuth, geo-aware payment checkout (Razorpay/Stripe/PayPal), real-time telemetry tracking, and a full admin Intelligence Suite dashboard.

Treat this like a pre-launch audit for a Fortune 500 client.

**Audit philosophy:**
- Never skip a section because it "probably works." Verify everything.
- Be surgically specific: always name the exact page, URL path, component, element ID, or CSS selector where an issue occurs.
- Distinguish between **confirmed issues** (you observed it) and **suspected issues** (you infer from code/structure). Label each clearly.
- Do not group multiple distinct issues into one finding. **One issue = one row.**
- If you cannot test something (e.g. requires admin login), say so explicitly and provide a manual test script.

---

## MANODEMY PLATFORM ARCHITECTURE

### Tech Stack
- **Frontend:** Static HTML/CSS/JS hosted on GitHub Pages
- **Fonts:** Outfit (headings), Inter (body), JetBrains Mono (code) on learning pages; Fraunces, DM Sans, DM Mono on admin panel
- **Auth:** Supabase (email/password + Google OAuth)
- **Code Execution:** Pyodide (browser-side Python) + CodeMirror editor
- **Payments:** Razorpay (India), Stripe/PayPal (International), geo-detected via GeoJS
- **Telemetry:** Custom `manodemy-telemetry.js` tracking page views, focus time, question progress
- **Admin:** Single-page `admin.html` Intelligence Suite with Chart.js, Supabase RPCs

### Complete Page Inventory (audit ALL of these)

| Page | File | Auth Required | Purpose |
|------|------|---------------|---------|
| Landing/Home | `index.html` | No | Hero, login card, curriculum grid (30 day cards), pricing, checkout modal |
| Day 01 Notebook | `day01.html` | No | Free interactive Python notebook with Pyodide |
| Day 02 Notebook | `day02.html` | No | Free interactive Python notebook |
| Days 03–30 | `day03.html` – `day30.html` | Yes (Paid) | Premium notebooks behind PaywallGuard |
| Payment Success | `payment-success.html` | No | Post-purchase confirmation with enrollment verification |
| Payment Failed | `payment-failed.html` | No | Failed payment with retry CTA |
| Reset Password | `reset-password.html` | Via magic link | Password update form |
| Terms & Conditions | `terms.html` | No | Legal page |
| Privacy Policy | `privacy.html` | No | Legal page |
| Refund Policy | `refund-policy.html` | No | Legal page |
| Admin Dashboard | `admin.html` | Yes (Admin) | Intelligence Suite: Revenue, Growth, Retention, Funnel, Engagement, Coupons, Settings |

### Key Interactive Systems to Test

1. **PaywallGuard** — Client-side JS in `<head>` of each notebook that checks Supabase session + enrollment RPC before rendering. Days 3–30 are protected.
2. **Login Card** (`#landingLoginForm`) — Email/password login, Google OAuth (`#google-signin-btn`), signup toggle, forgot password flow
3. **Pyodide Engine** (`#pyStatus`) — Browser-side Python compiler loading indicator, `runCell()` and `clearOutput()` functions
4. **Code Cells** (`.code-cell`) — CodeMirror textareas (`.cm-source`), Run buttons (`.run-btn`), Clear buttons (`.clear-btn`), output panels (`.cell-output`)
5. **Active Focus Timer** (`#pageTimerDisplay`) — Tracks time only when tab is visible
6. **Score Tracker** (`#scoreSolved` / `#scoreTotal` / `#scoreProgress`) — Concept check completion progress
7. **Profile Card** (`#profileCard`) — Avatar dropdown showing name, email, plan badge, sign-out
8. **Day Dropdown** (`#dayDropdownBtn` / `#dayDropdownMenu`) — Jump-to-day navigation with 30 items
9. **Checkout Modal** (`#checkoutOverlay`) — Coupon input, geo-aware gateway buttons, spinner, no-refund disclaimer
10. **Admin Tabs** — Revenue overview, Growth charts, Retention heatmap, Conversion funnel, Engagement pivot table, Coupons manager, Pricing settings

---

## PHASE 1 — BROKEN FEATURES & BUGS

For every interactive element on every page, test and report: ✅ Pass | ⚠️ Partial | ❌ Fail | 🔍 Needs manual test

### 1.1 Navigation & Routing
- Every nav link, footer link (`terms.html`, `privacy.html`), and CTA leads to the correct destination
- Direct URL access to all 30+ pages works (no blank screen on hard refresh)
- Back/forward browser buttons restore the correct page and scroll position
- Anchor links (`#pricing`, `#features`, `#stats`) scroll to exact correct element, not offset behind sticky navbar (`#topBar`)
- Day dropdown menu (`#dayDropdownMenu`): opens, all 30 items are clickable, navigates correctly, closes after selection
- Prev/Next navigation buttons on notebooks link to correct adjacent days
- Home button on notebooks links back to `index.html`
- "← Back to Home" links on legal pages and `reset-password.html` work correctly
- Active nav state in day dropdown highlights the current day correctly

### 1.2 Authentication & Session Flows
- **Login:** correct credentials succeed, wrong credentials show a clear error in `#authMessage`
- **Signup:** toggle via `#linkLandingSignup` shows name + confirm password fields; duplicate email is caught
- **Google OAuth:** `#google-signin-btn` triggers Supabase OAuth flow, callback redirects correctly, no infinite loops
- **Forgot Password:** `#linkLandingForgot` triggers password reset email; `reset-password.html` magic link works
- **Reset Password Form:** password mismatch caught, min-length enforced, success redirects to `index.html`
- **Logout:** `#logoutBtn` (landing) and `#signOutBtn` (notebooks) fully clear session, back button cannot return to protected content
- **Session persistence:** refreshing a notebook keeps user logged in
- **Session expiry:** when session expires mid-use, telemetry doesn't crash; user is prompted to re-login
- **Profile rendering:** `#profileName`, `#profileEmail`, `#profileBadge` (Free/Pro) populate correctly after login
- **Protected routes:** accessing `day03.html`–`day30.html` without auth redirects to `index.html`

### 1.3 PaywallGuard Security
- **JS-disabled bypass:** With JavaScript disabled, does protected notebook content render? (Content is in the HTML source)
- **localStorage tampering:** Setting `manodemy_enrolled=true` without valid session — does PaywallGuard detect forgery via `check_enrollment` RPC?
- **Invalid routes:** `day31.html`, `day00.html`, `day-1.html` — do they 404 gracefully?
- **Deep linking:** Direct URL to `day03.html?redirect=true` — does paywall run before any content shows?
- **Preload screen:** Does `#paywall-preload-screen` show spinner during auth check and get removed correctly?

### 1.4 Pyodide Interactive Code Engine
- **Runtime init:** `#pyStatus` transitions from "⏳ Loading Python Engine..." to success state
- **Cell execution:** Type `print(2 + 2)` in any `.cm-source`, click ▶ Run — output "4" appears in `.cell-output`
- **Error handling:** Execute `print(2 + ` — readable traceback in red, UI doesn't freeze
- **Infinite loop:** Execute `while True: pass` — does UI freeze entirely or is there timeout/interrupt?
- **Console clearing:** ✕ Clear button wipes all output and collapses container
- **Double-click run:** Rapidly double-click ▶ Run — does it spawn concurrent executions?
- **XSS test:** Input `<script>alert(1)</script>` and run — output renders as text, not executed HTML
- **Code persistence:** Navigate away and back — is typed code retained or lost?
- **Hint system:** `.question[data-hint-1]` through `data-hint-5` — do hints reveal progressively?

### 1.5 Telemetry & Progress Tracking
- **Focus timer:** `#pageTimerDisplay` increments only when tab is visible, pauses when backgrounded/minimized
- **Score tracking:** Completing a concept check increments `#scoreSolved` and fills `#scoreProgress` bar
- **Idempotent scoring:** Submitting same concept check multiple times doesn't inflate score
- **Network telemetry:** Check Network tab — telemetry pings are sent to Supabase periodically
- **Offline resilience:** If internet drops during a lesson, does telemetry crash the page or queue silently?

### 1.6 Checkout & Payment
- **Modal trigger:** `#buyBtn` opens `#checkoutOverlay`
- **Modal close:** Close via `#checkoutClose` button, Escape key, and backdrop click
- **Coupon field:** `#couponInput` + `#couponApply` — test valid coupon, invalid coupon, empty submission
- **Double-click buy:** Rapidly double-click buy CTA — does it trigger duplicate payment?
- **Geo-aware pricing:** `#priceNow`, `#priceOld`, `#discountBadge`, `#buyPrice` show correct currency (₹ for India, $ for international)
- **Gateway buttons:** `#gatewayButtons` populated dynamically based on geo
- **Spinner:** `#checkoutSpinner` appears during async operations
- **No-refund warning:** Checkout features section displays "🔒 No Refunds Policy"
- **Payment success:** `payment-success.html` shows order ID from URL params, verifies enrollment via RPC, sets localStorage flags
- **Payment failed:** `payment-failed.html` shows retry button linking to `index.html#pricing`

### 1.7 Admin Intelligence Suite (`admin.html`)
- **Auth gate:** Unauthenticated access is blocked (admin-only Supabase check)
- **Sidebar navigation:** All nav items (Revenue, Growth, Retention, Funnel, Engagement, Coupons, Settings) switch tabs correctly via `data-tab`
- **Filter bar:** Date presets (Today, Last 7, Last 30, This Month, etc.) update `#filterFrom`/`#filterTo` and re-render
- **Compare toggle:** `#compareToggle` enables previous-period comparison with delta badges (`.delta-up`, `.delta-down`)
- **KPI cards:** `.kpi-value` elements populate with real data, hover effects work
- **Charts:** Chart.js canvases render revenue trend, growth bars, retention doughnut
- **Transaction table:** `#transactionsTable` paginated, refund button opens `#refundModal`, CSV export works
- **User roster:** `#userRosterTable` with search (`#rosterSearch`), status filter, pagination, CSV export
- **Engagement pivot:** Dynamic headers (Day 01–30 with Visits/Time/Q.Solved sub-columns), horizontal scroll, search + plan filter
- **Coupon management:** `#couponsTable` with active/inactive toggles, create coupon form (`#couponForm`)
- **Pricing settings:** `#pricingForm` with INR/USD fields, auto-calculated discount labels, "Sync to Cloud" saves to Supabase settings table
- **Conversion funnel:** Funnel KPIs, benchmark indicators, gateway health diagnostics
- **Retention heatmap:** `#retentionHeatmap` with color-coded cohort percentages
- **Mobile hamburger:** `#hamburgerBtn` toggles sidebar on mobile
- **Toast notifications:** `showToast()` for success/error/info feedback

### 1.8 Legal & Static Pages
- `terms.html`, `privacy.html`, `refund-policy.html` — all render correctly with `.legal-page` styling
- **CRITICAL CONFLICT:** `terms.html` says "all sales are final, no refunds" but `refund-policy.html` offers "30-Day Money-Back Guarantee" — flag this legal contradiction

---

## PHASE 2 — VISUAL INCONSISTENCY

Cross-reference every page against every other page. Flag deviations at the component level.

### 2.1 Typography System
- Landing pages use Outfit/Inter; admin uses Fraunces/DM Sans — is this intentional brand separation or inconsistency?
- H1–H6 hierarchy: same size scale, weight, line-height across all 30 notebooks
- JetBrains Mono: consistent for all code blocks, CodeMirror editors, and output panels
- Legal pages: do they inherit `landing.css` variables correctly (`.legal-page` styles)?
- Flag any orphaned font sizes not part of the design system

### 2.2 Color System
- Landing brand colors: Cyan (`#00E6F6`), Emerald (`#10B981`), Gold accents, deep slate background (`#0B0F19`)
- Admin brand colors: Gold (`#C9A84C`), Emerald (`#2DD4BF`), Rose (`#F87171`), Sapphire (`#60A5FA`)
- Notebook syntax highlighting: are keyword, comment, string, and number token colors consistent across all 30 notebooks?
- Hover/focus/active states use consistent color tokens everywhere
- Day card grid: free days (01–02) vs locked days (03–30) — visual distinction clear and uniform?
- Lock icons on days 03–30: identical SVG stroke weight and glow styling?

### 2.3 Spacing & Layout
- Section padding consistent between Hero, Stats, Features, CTA, Pricing sections on landing
- Card internal padding consistent across stat-cards, feature-cards, skill-cards
- Notebook: theory sections (`.nb-section`), code cells (`.code-cell`), question blocks (`.question`) — consistent spacing
- Admin: KPI grid (`.kpi-grid` 5-column), chart panels, table panels — consistent internal padding

### 2.4 Component Consistency
- All buttons of same type: identical height, padding, border-radius, font
- All code cells: same `.cell-bar` layout, button styling, output panel behavior
- All concept check question blocks: same border, padding, hint integration
- All callout boxes (`.callout`): same icon alignment, background, border style
- All tables (landing + notebooks + admin): consistent header styling, row striping, cell padding
- Modals: checkout modal vs admin refund modal — same backdrop, close button position, animation

### 2.5 Motion & Transitions
- Hover transitions: same duration across landing buttons, day cards, admin nav items, notebook controls
- Admin uses `--transition: 200ms cubic-bezier(0.4, 0, 0.2, 1)` — do landing/notebook pages match?
- Loading animations: Pyodide spinner, checkout spinner, admin data loading — consistent design?
- Focus ring style: same color and offset on all focusable elements across all pages

### 2.6 Header & Footer
- Landing: `#topBar` with brand logo, course tag, Buy Now CTA, logout button
- Notebooks: `#topBar` with avatar, timer, score, day dropdown, prev/next/home controls
- Admin: sidebar with brand name, nav menu, logout — completely different layout (intentional?)
- Landing footer: copyright + Terms/Privacy links — present on `index.html` only?
- Legal pages: no header or footer at all — is this intentional?
- Payment success/failed: no header or footer — is this intentional?

---

## PHASE 3 — PERFORMANCE & SPEED

Run Lighthouse or equivalent on key pages. Report exact metric values.

### 3.1 Core Web Vitals (measure and report exact numbers)

| Metric | Target | Test Pages |
|--------|--------|------------|
| **LCP** | < 2.5s | `index.html`, `day01.html`, `admin.html` |
| **INP** | < 200ms | All interactive pages |
| **CLS** | < 0.1 | All pages |
| **FCP** | < 1.8s | All pages |
| **TTFB** | < 800ms | All pages |

- What element IS the LCP on each page? Is it preloaded?
- Which elements cause layout shift? (Images without dimensions? Late-loading fonts?)

### 3.2 Asset Optimization
- `supabase.js` (197KB) — render-blocking in `<head>` without defer/async?
- `chart.js` (208KB) — loaded on admin; is it deferred?
- `voice.js` (93KB) — what is this? Is it loaded on all pages?
- `notebook.js` (33KB), `landing.js` (44KB) — deferred correctly?
- Pyodide WASM payload — how large? Does it block TTI?
- Google Fonts loaded via stylesheet link — is `font-display: swap` used?
- Images: Python logo loaded from CDN (`cdn.jsdelivr.net`), Google logo from `developers.google.com` — are these optimized?
- Are CSS files (`landing.css` 33KB, `notebook.css` 38KB) minified?
- Cache-busting: `landing.css?v=7.0`, `landing.js?v=7.1` — are versions current on all pages?

### 3.3 Network Requests
- How many total requests on first load per key page?
- Total page weight per page?
- Any failed network requests (4xx, 5xx)?
- `manodemy-telemetry.js` — does it block rendering or run async?
- Supabase RPC calls — any that fail silently?

### 3.4 Mobile Performance
- Run all metrics on simulated mobile (4G, mid-tier CPU)
- Pyodide loading time on mobile — is it prohibitively slow?
- Admin dashboard with large engagement table — performance on mobile?

---

## PHASE 4 — ACCESSIBILITY (WCAG 2.1 AA)

### 4.1 Perceivable
- Every image has alt text. Python logo inline (`python-logo-inline`) has `alt="Python"`
- Google sign-in logo has `alt="Google"`
- Color contrast: JetBrains Mono syntax colors against `#0B0F19` background — test every token color
- Admin: gold text (`#C9A84C`) on dark void (`#080810`) — meets 4.5:1?
- Muted text (`#A8A090` admin, `#94A3B8` landing) against dark backgrounds — contrast ratio?
- Page readable at 200% zoom without horizontal scroll
- Code cells readable at 400% zoom on mobile

### 4.2 Operable
- Full keyboard navigation: Tab through entire notebook (code cells, run buttons, clear buttons, nav)
- Tab order follows visual reading order on all pages
- Focus indicator visible on all interactive elements — never hidden with `outline: none`
- No keyboard traps in CodeMirror editors (can Tab out)
- Modals: checkout overlay traps focus, closeable via Escape, returns focus to trigger
- Profile card: focus trapped when open, closeable via Escape
- Day dropdown: keyboard navigable, closeable via Escape
- Skip navigation link present as first focusable element?
- Admin sidebar navigation: keyboard accessible

### 4.3 Understandable
- `<html lang="en">` set on all pages ✓ (confirmed in code)
- Each page has unique `<title>` (confirmed: "Day 01: Data Types and Memory — Manodemy" etc.)
- Form labels: login inputs (`#landingEmail`, `#landingPassword`) — do they have associated labels or aria-labels?
- Reset password inputs (`#newPassword`, `#confirmNewPassword`) — labels?
- Admin form inputs — all associated with labels?
- Error messages are specific and appear near the field
- Required fields marked accessibly (not just visually)

### 4.4 Robust
- Run axe/WAVE/Lighthouse accessibility audit and report all violations
- Semantic HTML: headings nest logically across notebooks (H1 title → H2 sections → H3 subsections)
- Buttons are `<button>` not `<div onclick>` — verify across all pages
- ARIA: `#profileAvatar` has `role="button"`, `aria-expanded`, `aria-haspopup` ✓
- `#profileCard` has `role="dialog"` ✓
- Dynamic content updates: does `#pyStatus` use `aria-live`? Does `#authMessage`?
- Paywall preload screen has `aria-hidden="true"` ✓

---

## PHASE 5 — SEO

### 5.1 Technical SEO
- Unique `<title>` on every page (check all 30 notebooks + landing + legal + admin)
- Unique `<meta name="description">` on every page — report missing ones
- `robots.txt` exists? `sitemap.xml` exists with all pages?
- HTTPS enforced, no mixed content
- No redirect chains in PaywallGuard redirects
- Soft 404 check: non-existent pages return proper 404 status

### 5.2 Structured Data
- Schema.org markup: `EducationalOccupationalProgram`, `Course`, `Organization` present?
- Validate with Google Rich Results Test

### 5.3 Open Graph & Social
- `index.html` has `og:title`, `og:description`, `og:type` ✓ — but missing `og:image` and `og:url`?
- Notebook pages: do they have OG tags?
- Twitter card meta tags present?
- Test preview in Facebook Sharing Debugger

### 5.4 On-Page SEO
- Each page has exactly one H1
- Heading hierarchy logical (no H1 → H4 skips)
- Internal linking: are all 30 notebook pages linked from the landing page? ✓ (via day card grid)
- URLs clean and descriptive (`day01.html`, `terms.html`) ✓
- Canonical tags present?

---

## REQUIRED OUTPUT FORMAT

### Executive Summary
5–8 sentences covering: most critical bug, biggest visual inconsistency, worst performance bottleneck, most impactful accessibility violation, top SEO risk, and the legal policy contradiction. End with overall health score (0–100).

### Per-Phase Report Tables

| # | Severity | Page / Location | Issue | Detail | Recommendation |
|---|----------|-----------------|-------|--------|----------------|

**Severity levels:**
- 🔴 CRITICAL — broken functionality or major UX/security failure
- 🟠 HIGH — significant quality issue
- 🟡 MEDIUM — noticeable defect
- 🔵 LOW — polish item
- ✅ PASS — tested and working

### Prioritised Fix List

Flat numbered list sorted by severity:
```
1. [CRITICAL] [Legal] terms.html says "no refunds" but refund-policy.html offers "30-day money-back" — resolve contradiction
2. [CRITICAL] [Security] PaywallGuard is client-side only — premium content visible in HTML source with JS disabled
3. [HIGH] [Perf] supabase.js (197KB) loaded synchronously in <head> — add defer
...
```

### Scores Dashboard

| Dimension | Score | Justification |
|-----------|-------|---------------|
| Functional quality | /100 | |
| Visual consistency | /100 | |
| Performance | /100 | |
| Accessibility | /100 | |
| SEO | /100 | |
| **OVERALL** | **/100** | |

### Manual Test Scripts

For any 🔍 item, provide step-by-step scripts:

**Test: PaywallGuard bypass with JS disabled**
1. Open browser DevTools → Settings → Disable JavaScript
2. Navigate directly to `day05.html`
3. Expected: No content visible (server-side protection or content not in HTML)
4. Actual: [record what happens]

**Test: Session expiry during notebook use**
1. Log in and open `day01.html`
2. Open DevTools → Application → Clear session storage/cookies
3. Try to run a code cell
4. Expected: Graceful re-login prompt
5. Actual: [record what happens]

**Test: Offline telemetry resilience**
1. Open `day01.html`, start focus timer
2. Open DevTools → Network → set Offline
3. Wait 30 seconds, check console for errors
4. Go back online, check if telemetry syncs
5. Expected: No crashes, queued data syncs

**Test: Admin dashboard data accuracy**
1. Log in as admin, open `admin.html`
2. Set filter to "Last 30 Days", click Apply
3. Verify KPI cards match transaction table totals
4. Switch to Engagement tab, verify user count matches roster
5. Export CSV and verify data integrity

---

## HOW TO BEGIN

1. Start by visiting every page in the inventory table above and confirming it loads.
2. Conduct each phase in order — do not skip ahead.
3. Do not skip any check. If a section doesn't apply, state it explicitly.
4. Report both passing AND failing items — a complete audit covers everything.
5. Pay special attention to the admin panel — test every tab, every filter, every export button.

---

## WEBSITE DETAILS

- **Website URL:** [INSERT YOUR GITHUB PAGES URL — e.g. https://yourusername.github.io/manodemy_web/]
- **Pages to prioritise:** `index.html`, `day01.html`, `day02.html`, `day03.html` (first locked day), `admin.html`, `payment-success.html`, `reset-password.html`
- **Admin credentials:** [INSERT ADMIN EMAIL / PASSWORD]
- **Known issues to investigate:**
  - Google OAuth callback reliability on GitHub Pages
  - Active focus timer accuracy when switching between notebook tabs
  - Checkout modal horizontal scroll on narrow mobile devices (320px)
  - Legal contradiction between terms.html and refund-policy.html
  - PaywallGuard is client-side only — premium HTML content is in the source
- **Tech stack:** Static HTML/CSS/JS, Supabase (auth + DB + RPCs), Pyodide (WASM Python), CodeMirror, Chart.js, Razorpay/Stripe/PayPal, GitHub Pages hosting
