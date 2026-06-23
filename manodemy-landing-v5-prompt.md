# MANODEMY LANDING PAGE V5 — PREMIUM LIGHTWEIGHT 3D EXPERIENCE (PRODUCTION BUILD PROMPT)

You are a world-class UI/UX designer, motion designer, conversion optimization expert, and senior front-end engineer.

Your task is to design and build a production-ready landing page for Manodemy.

This is NOT a course-selling website. This is an interactive coding platform where learners master Data Analytics through hands-on practice inside real browser-based notebooks.

**Before writing any code, read Section 0 in full.** It is the single source of truth for every fact used elsewhere in this prompt. If anything in a later section appears to conflict with Section 0, Section 0 wins.

---
## SECTION 0 — SOURCE OF TRUTH (do not deviate, do not invent)

```
PRODUCT STRUCTURE
- Python for Data Analysts  → 30 days → 700+ challenges
- SQL for Data Analysts     → 18 days → 200+ challenges
- Excel for Data Analysts   → 12 days → 120+ challenges
- TOTAL: 60 guided days, 1,000+ challenges (30+18+12=60 — use this number everywhere,
  never "62" or any other total)

SCORING — TWO SEPARATE SYSTEMS, BOTH REAL, NEVER MERGE THEM
1. XP (instant, gamified, per-challenge)
   - Awarded the moment a challenge passes (e.g. "+10 XP")
   - Drives the leaderboard and daily streaks
   - Purely motivational — has no bearing on certification
2. Marks (cumulative, certification-only)
   - Each solved challenge = 0.649 marks
   - 700 / 1000 marks required to receive the certificate
   - Never shown as a "+0.649 marks" toast — it lives only on the
     progress/certificate dashboard, not in the moment-to-moment notebook UI
   Copy rule: anywhere the page explains scoring, name both systems explicitly
   and say what each one is FOR, in this order: XP first (engagement), Marks
   second (certification gate). Never let the model imply XP unlocks the
   certificate, or that Marks are visible per-challenge.

NAMED PRODUCT FEATURES (confirmed — include all of these, do not drop any)
- Mano AI Tutor — available across all three courses
- Lifetime Access — included in the bundle
- Certificates (gated by Marks, see above)
- XP system + leaderboard

PRICING
- $49 one-time (was $199) / ₹4,999 (was ₹19,999)
- 7-day money-back guarantee
- Payment rails: Stripe, PayPal, Razorpay

⚠ UNCONFIRMED — DO NOT BUILD UNTIL FOUNDER CONFIRMS (see Section 0.1)
- "Community Access" as a bundle line item — this was in V4 but has no
  confirmed source. Omit from the build until verified. Do not silently
  re-add it just because it sounds plausible.
- Live availability state of SQL and Excel modules at full-purchase time
  (see flag below — this is the most important open question in this doc).
```

### Section 0.1 — Open questions that must be resolved before this ships

**This is the highest-priority unresolved issue carried over from V4 and must not be silently designed around:**

> Today, only Python Day 1 is fully live for free preview, and SQL/Excel are positioned as "Coming Soon" for full purchase — but V4's curriculum and pricing sections present all 60 days as immediately purchasable and accessible right now. Built as written, a buyer who completes Python and clicks into the SQL tab will hit a wall the page never warned them about. That's a refund-request generator, not a conversion win.

You (the founder) need to pick ONE of these before a builder AI touches this page:

- **Option A — Sell the full bundle now, deliver SQL/Excel later.** Pricing copy becomes: *"Get instant access to Python today. SQL & Excel unlock automatically the moment each launches — at no extra cost."* Curriculum tabs for SQL/Excel show a "Coming Soon" state with an email-notify capture instead of locked-day previews.
- **Option B — Sell Python only today; SQL/Excel become a separate future bundle/upsell.** Pricing section drops to a single-course frame; "complete bundle" language is removed until all three are live.
- **Option C — Something else** (e.g. SQL/Excel are further along than this prompt assumes) — if so, replace the assumption above and proceed.

This prompt is written assuming **Option A**, because it preserves the "complete bundle" positioning V4 wanted without contradicting the live product. If the real answer is B or C, every instance of "SQL — Coming Soon" badges below should be deleted and the relevant copy adjusted accordingly before sending this to a build tool.

---
## SECTION 1 — POSITIONING

> "Stop watching videos. Start solving real challenges."

The experience should feel closer to Linear, Stripe, Vercel, Framer, and Notion than traditional EdTech. Visually stunning, conversion-focused, responsive, accessible, lightweight.

Key differentiators (use these, not invented ones):
- No video bloat — learn by doing
- Real notebook execution, instant feedback
- Mano AI Tutor available throughout
- Gamified progression (XP + leaderboard)
- Lifetime access
- Job-ready, certificate-gated skills

---
## SECTION 2 — CONVERSION STRATEGY (read before building any section)

Realistic target framing: a free, frictionless "Try Day 01" CTA from warm/organic traffic can reasonably land in the **15–30% visitor-to-signup** range if every lever below is pulled correctly. Treat "50%" as the ambition that justifies obsessing over the items below, not a number any single design choice guarantees.

Levers, in priority order:

1. **3-second clarity test.** A first-time visitor must be able to say "this is a place where I write code and get graded instantly, not a video course" within 3 seconds of the hero loading — before any animation finishes. If the hero copy needs the 3D cards to finish animating before it makes sense, it has failed this test.
2. **Lowest-friction first action.** "Try Day 01 Free" must require no signup form before the user sees a real challenge — ask for an email/account only after they've solved something (activation before commitment).
3. **Sticky mobile CTA.** A slim, persistent bottom bar with the primary CTA appears after the user scrolls past the hero on mobile, and disappears only while a modal/notebook is open. This single item recovers conversions lost to "I'll come back to it" mobile drop-off.
4. **Genuine urgency, not fake urgency.** No countdown timers tied to nothing real, no "3 people are viewing this" unless it's a real live count. Acceptable genuine urgency: the live learner count (already specified), a real cohort/launch-pricing window if one exists, or simply the 7-day refund window reframed as "try it risk-free" rather than a false scarcity device.
5. **Risk reversal stated twice.** Once near the hero ("7-day money-back guarantee" as a trust-row item) and once again right next to the buy button in pricing — proximity to the commitment moment matters more than placement elsewhere on the page.
6. **Social proof must be real or absent.** Carried over from V4 and non-negotiable: no invented reviews, ratings, or learner counts. A real "1,200+ learners" beats a fake "10,000+" — inflated numbers a returning visitor can mentally falsify destroy trust faster than a modest honest one builds it.

---
## SECTION 3 — DESIGN DIRECTION

Premium, futuristic, developer-product feel: Apple-level polish, Stripe-level clarity, Linear-level minimalism, Vercel-level performance.

Avoid: generic EdTech aesthetics, cartoon illustrations, stock photography, bright "educational" colors, course-marketplace layouts.

---
## SECTION 4 — DESIGN TOKENS

Use ONLY design tokens. Never hardcode colors.

```css
:root {
  /* Backgrounds */
  --void: #060913;
  --base: #0B0F19;
  --surface: #121826;
  --surface-2: #1A2230;

  /* Borders */
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.16);

  /* Accents — per-course mapping is intentional, keep it consistent everywhere */
  --cyan: #00E6F6;      /* Python */
  --emerald: #10B981;   /* SQL */
  --gold: #FFB020;      /* Excel */

  /* Typography */
  --text-primary: #F4F6FB;
  --text-secondary: #9AA5B8;
  --text-muted: #5B6478;

  /* Fonts */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-data: 'JetBrains Mono', monospace;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;

  /* Shadows */
  --shadow-glow-cyan: 0 0 40px rgba(0,230,246,0.25);
  --shadow-glow-emerald: 0 0 40px rgba(16,185,129,0.22);
  --shadow-glow-gold: 0 0 40px rgba(255,176,32,0.20);
  --shadow-card: 0 8px 30px rgba(0,0,0,0.40);
}
```

**Accessibility constraint (new in V5):** `--cyan` and `--gold` fail WCAG AA contrast against dark backgrounds when used for body text below ~18px. Restrict them to: large display text (≥24px / headings), glows, borders, icons, and badge backgrounds with dark text on top. All paragraph and label text uses `--text-primary` or `--text-secondary` only.

**Color-to-course mapping (new in V5, use everywhere — hero, courses section, curriculum tabs, pricing breakdown):**
- Python → cyan
- SQL → emerald
- Excel → gold

This turns "which course am I looking at" into a glance, not a read, and ties the whole page's color system back to something functional rather than decorative.

---
## SECTION 5 — 3D HERO (fully specified — this is the centerpiece)

DO NOT use laptop mockups, video backgrounds, particle systems, or imported 3D models.

Build: a floating 3D stack of three notebook cards (Python, SQL, Excel), each tinted with its mapped accent color per Section 4.

### Geometry & setup
```
.scene        { perspective: 1200px; }
.stack        { transform-style: preserve-3d; transform-origin: center center; }
card base transform: translateZ(0) rotateX(0) rotateY(0)
card offsets (resting state, before parallax):
  Python card (front):  translateZ(40px)  translateY(0px)
  SQL card (middle):    translateZ(0px)   translateY(24px)  rotateY(-4deg)
  Excel card (back):    translateZ(-40px) translateY(48px)  rotateY(5deg)
```

### Entrance choreography (on first paint, runs once)
1. All three cards start at `opacity: 0`, `translateY(40px)`, `scale(0.96)`.
2. Stagger in back-to-front (Excel → SQL → Python), 120ms apart, 600ms each, ease `cubic-bezier(0.16, 1, 0.3, 1)`.
3. Once settled, the idle float loop begins (see below).

### Idle motion (continuous, after entrance)
- Each card floats independently on a slow sine-wave `translateY`, amplitude 6–10px, period 6–9s, phase-offset per card so they never move in unison.
- Driven by `requestAnimationFrame`, paused via `IntersectionObserver` when the hero leaves the viewport, and skipped entirely if `prefers-reduced-motion: reduce` (show static resting positions instead).

### Mouse parallax (desktop)
- Track pointer position relative to `.scene` center, normalize to a `-1..1` range on both axes.
- Map to rotation: `rotateY = pointerX * 6deg`, `rotateX = pointerY * -6deg` (max ±6° as specified — do not exceed this, it's the difference between "premium subtlety" and "seasick").
- Apply with a spring/lerp (e.g. `currentValue += (target - currentValue) * 0.08` per frame) rather than directly, so it trails the cursor smoothly instead of snapping.

### Touch/mobile equivalent (new in V5 — V4 had no mobile parallax story)
- On devices that expose `DeviceOrientationEvent`, request permission on first scroll-into-view (iOS Safari requires a user gesture — trigger the permission prompt from a tap on the hero, not automatically on load) and map device tilt to the same ±6° rotation the mouse uses on desktop.
- If permission is denied or the API is unavailable, fall back to a **scroll-linked tilt**: as the hero scrolls through the viewport, rotate the stack a few degrees based on scroll position, so mobile still gets a sense of depth without requiring sensor access.

### Card content
Each card shows realistic code in `--font-data`, with a success state and an XP toast (per Section 0's scoring rules — XP only, never Marks, in this micro-UI):

**Python** (cyan glow, `--shadow-glow-cyan`)
```python
sales = df.groupby("month").sum()
sales.head()
```
✓ Test Passed · +10 XP

**SQL** (emerald glow, `--shadow-glow-emerald`)
```sql
SELECT region, SUM(revenue)
FROM sales
GROUP BY region;
```
✓ Correct Result · +10 XP

**Excel** (gold glow, `--shadow-glow-gold`)
```
=XLOOKUP(A2,Products!A:A,Products!D:D)
```
✓ Formula Valid · +10 XP

### Visual treatment
Glassmorphism (`background: rgba(surface, 0.6)` + `backdrop-filter: blur(20px)`), `--shadow-card` for depth, `--border` for edges, ambient ahead-of-card glow matching each card's accent.

The hero must communicate "learning happens by solving" within the 3-second clarity test from Section 2 — if the headline and one notebook card are legible before the entrance animation finishes, this section has succeeded.

---
## SECTION 6 — HERO CONTENT

Eyebrow: `COMPLETE DATA ANALYTICS PACKAGE`

Headline:
```
Stop watching videos.
Start coding actual data skills.
```

Subheadline: Master Python, SQL, and Excel through 1,000+ interactive coding challenges inside real browser-based notebooks.

Stats: 60 Guided Days · 1,000+ Challenges · No Video Bloat

Buttons: Primary — `Try Day 01 Free` · Secondary — `View Full Curriculum`

Trust row: `4.8/5 Rating` · Live Learner Count · `Certificate Included`

**Live learner count — mandatory dynamic data rule (unchanged from V4, this was correct):**
```
Display:  {liveSignupCount}+ Learners
Fallback: "Thousands of Learners"   ← only if API call fails or returns null
```
Never hardcode a number here under any circumstance, including placeholder/demo builds — ship the fallback string instead.

---
## SECTION 7 — NAVIGATION

Floating glass navigation, reusable across Landing / Dashboard / Notebook pages.

Logo: `Manodemy`

Links: Try Day 01 · Curriculum · Reviews · FAQ · Refer & Earn

Logged out: Sign In · `Buy Now — $19`
Logged in: Dashboard · My Courses (dropdown)

**Sticky mobile CTA bar (new in V5, see Section 2 item 3):** on mobile only, a slim fixed bottom bar with the primary CTA appears once the user scrolls past the hero, hides while any modal/notebook overlay is open, and reappears on close.

---
## SECTION 8 — TRY ALL 3 DAY 01s FREE

Three interactive preview cards (SQL, Excel, Python), each with: file name, code snippet, output, success state, `Start Day 01 Free` button. Color-mapped per Section 4. No signup required to view or interact with the preview — see Section 2 item 2.

---
## SECTION 9 — HOW MANODEMY WORKS

3-step animated timeline: Conceptual Breakdown → Inline Execution → Automated Verification. Elegant, restrained motion — fade/slide reveals only, no bounce.

---
## SECTION 10 — COURSES SECTION

Title: `One Bundle. Three Complete Courses.`

Cards (color-mapped, with corrected counts):
- **Python** — cyan — 30 Days, 700+ Challenges
- **SQL** — emerald — 18 Days, 200+ Challenges — *(if Option A from Section 0.1 applies, show a small "Coming Soon" badge, not a lock icon — locks imply "you could pay to unlock this now," which isn't true)*
- **Excel** — gold — 12 Days, 120+ Challenges — *(same Coming Soon treatment if applicable)*

Each card: curriculum highlights, XP progression preview, CTA. Include a Python-Only vs Full-Bundle comparison matrix that is honest about current vs upcoming access per the resolved Section 0.1 option.

---
## SECTION 11 — CURRICULUM SECTION

Interactive tabs (SQL / Excel / Python), color-mapped. Each lesson row: day number, emoji, title, and a status badge — `Free`, `Locked`, or (if applicable) `Coming Soon` — these are three distinct states and must look distinct, not just relabeled. Accordion on mobile.

---
## SECTION 12 — COMPARISON SECTION

Compare Manodemy vs Traditional Video Courses vs Subscription Platforms vs Bootcamps across: Learning Method, Practice, Setup, Daily Structure, Gamification, Completion Rate, Certificate, Refund Policy, Cost. Manodemy should visually stand out without resorting to invented superlatives for the competitors — accuracy here protects credibility everywhere else on the page.

---
## SECTION 13 — TESTIMONIALS SECTION

**CRITICAL — unchanged from V4, this rule was correct and must not be weakened:**
Do NOT generate fake reviews, names, job titles, companies, ratings, or testimonials. All review data comes from the production database, fetched dynamically.

Display: `★★★★☆ {averageRating}/5` — `Based on {reviewCount} Verified Reviews`. Star-rating distribution (5★–1★ percentages) is calculated from real data, never hardcoded.

### Data contract (new in V5 — V4 specified the rule but not the shape, so a builder AI had to improvise it)
```json
GET /api/reviews/summary
{
  "averageRating": 4.8,
  "reviewCount": 312,
  "distribution": { "5": 0.74, "4": 0.18, "3": 0.05, "2": 0.02, "1": 0.01 }
}

GET /api/reviews?limit=10&offset=0
{
  "reviews": [
    {
      "id": "rev_123",
      "name": "string",
      "avatarUrl": "string | null",
      "rating": 1-5,
      "text": "string",
      "createdAt": "ISO8601"
    }
  ],
  "hasMore": true
}
```

### Required UI states
- **Loading:** skeleton cards (shimmer on `--surface-2`, matching the real carousel's dimensions so there's no layout shift on data arrival).
- **Empty:** `"No reviews available yet"` — no stars, no fabricated distribution.
- **Error:** quiet inline message + retry; never collapse the whole section or show stale cached fake data as a "fix."

---
## SECTION 14 — PRICING SECTION

Pricing card: `$99 → $19` / `₹9,999 → ₹1,499`

Bundle includes (corrected list — matches Section 0, drops the unconfirmed line):
```
✓ Python Course
✓ SQL Course (Coming Soon — included free at launch, per Option A)
✓ Excel Course (Coming Soon — included free at launch, per Option A)
✓ 1,000+ Challenges
✓ Mano AI Tutor — all courses
✓ XP System & Leaderboard
✓ Lifetime Access
✓ Certificates
✓ Future Updates
```
*(Remove the two "Coming Soon" parentheticals entirely if Section 0.1 resolves to Option B or C — don't leave them in by default.)*

CTA: `Buy Full Masterclass`. Payment logos: Stripe, PayPal, Razorpay. Risk reversal restated here per Section 2 item 5: `7-Day Money-Back Guarantee`, directly adjacent to the CTA button, not just elsewhere on the page.

---
## SECTION 15 — FAQ SECTION

Accessible accordion. Questions:

1. How is this different from video courses?
2. Do I need prior experience?
3. **How does scoring work?** — Answer must explain both systems per Section 0, in order: XP (instant, per-challenge, gamification/leaderboard) first, then Marks (0.649 per solved challenge, 700/1000 required for the certificate) second. Never merge them into one number.
4. What's included with Mano AI Tutor?
5. Payment methods and regional pricing?
6. Is access instant? *(answer honestly per the resolved Section 0.1 option — if SQL/Excel are Coming Soon, say so here plainly rather than letting the buyer discover it after paying)*
7. How are certificates verified?
8. What is the refund policy?

---
## SECTION 16 — FINAL CTA

Headline: `Start Solving. Start Building Real Skills.`
Subheadline: Join thousands of learners mastering Python, SQL, and Excel through practice-first learning.
Buttons: `Try Day 01 Free` · `Buy Full Masterclass`

---
## SECTION 17 — FOOTER

Columns: Curriculum · Support & Legal · Connect. Email: support@manodemy.com. `Copyright © 2026 Manodemy`

---
## SECTION 18 — MOTION DESIGN RULES

Use CSS transforms, `requestAnimationFrame`, `IntersectionObserver`. Effects: hover tilt, parallax, fade-up reveals, glow transitions. Animate ONLY `transform` and `opacity` — never layout properties (`width`, `height`, `top`, `left`, etc.), which forces reflow and tanks performance scores.

---
## SECTION 19 — PERFORMANCE & ACCESSIBILITY RULES

Targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

Requirements: mobile-first, responsive, lazy loading, no heavy libraries (no GSAP, no Framer Motion), no large unoptimized images, no autoplay video.

If any WebGL is introduced beyond the CSS-transform hero: lazy-load only when the hero enters viewport, cap at 2,000 vertices, pause when off-screen, respect `prefers-reduced-motion`.

Contrast: per Section 4, neon accents are restricted to large text/glow/border use only — run an automated contrast check on every text/background pairing before shipping, don't eyeball it.

Final impression: *"The Apple of interactive data analytics education."* A visitor should know within 3 seconds that this is a place to solve, not watch.
