"""
Manodemy Ultimate Viral High-CTR Cover Generator.
Faithfully recreates and elevates the user's reference thumbnail:
- Giant 3D 'WHO EARNS MORE?' typography with metallic gold gradient & heavy bevel shadows
- 'EMPLOYEE vs MANAGER' cyan pill + Angled yellow tape 'SALARY TRAP?' badge
- High-stakes duel cards:
    * Left: Manager (₹18 LPA) in Blue Neon Glass Card
    * Center: Electric jagged white 'VS' with lightning aura
    * Right: Employee (₹24 LPA 🔥) in Gold Neon Glass Card with 👑 Crown & Upward Golden Arrow
- macOS Dark Glass IDE snippet card with 3D glowing neon database icon
- Angled Yellow Caution Tape 'CAN YOU SOLVE IT?' banner
- Bottom interactive CTA: '🧠 TEST YOUR SQL: manodemy.com/q18'
- 100% 1080x1080 Center Safe-Zone Compliant (Zero crop on 1:1 Instagram grid & 4:5 feed)
"""

import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "marketing" / "output" / "video"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&family=Plus+Jakarta+Sans:wght@800;900&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@700;800&family=Space+Grotesk:wght@700;900&display=swap');

  :root {
    --font-heading: 'Montserrat', 'Plus Jakarta Sans', sans-serif;
    --font-sub: 'Outfit', sans-serif;
    --font-code: 'JetBrains Mono', monospace;
    --cyan: #00f0ff;
    --gold: #facc15;
    --gold-bright: #ffea2e;
    --bg-dark: #030611;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1080px;
    height: 1920px;
    background: radial-gradient(circle at 50% 30%, #0a1128 0%, #030611 70%, #010206 100%);
    color: #fff;
    font-family: var(--font-sub);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Deep Atmospheric Glows */
  .glow-top-cyan {
    position: absolute;
    top: 14%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 240, 255, 0.28) 0%, rgba(30, 58, 138, 0.15) 50%, transparent 75%);
    filter: blur(80px);
    z-index: 1;
  }

  .glow-gold-right {
    position: absolute;
    top: 38%;
    right: 5%;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(250, 204, 21, 0.22) 0%, rgba(217, 119, 6, 0.1) 45%, transparent 70%);
    filter: blur(90px);
    z-index: 1;
  }

  .glow-bottom-purple {
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 500px;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(0, 240, 255, 0.12) 50%, transparent 75%);
    filter: blur(80px);
    z-index: 1;
  }

  .cyber-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 54px 54px;
    z-index: 2;
    mask-image: radial-gradient(circle at center, black 60%, transparent 95%);
  }

  /* Top 9:16 Full Screen Header (Outside 1:1 Grid) */
  .top-meta-bar {
    position: absolute;
    top: 170px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 3px;
    color: #64748b;
    text-transform: uppercase;
  }
  .top-meta-bar .badge-cyan {
    color: #00f0ff;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
  }

  /* -------------------------------------------------------------
     1:1 SQUARE SAFE-ZONE CONTAINER (1080x1080 Center Zone)
     y starts at 420px, ends at 1500px. Width is 960px.
     ------------------------------------------------------------- */
  .safe-box {
    width: 960px;
    height: 1050px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }

  /* 1. MANODEMY BRAND HEADER */
  .brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-logo-m {
    width: 42px;
    height: 42px;
    filter: drop-shadow(0 0 16px rgba(0, 240, 255, 0.7));
  }
  .brand-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    font-weight: 900;
    letter-spacing: 4.5px;
    color: #ffffff;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  /* 2. GIANT 3D HOOK TYPOGRAPHY */
  .hook-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -4px;
  }
  .hook-line1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 86px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -2px;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 
      0 3px 0 #94a3b8,
      0 6px 0 #475569,
      0 12px 30px rgba(0, 240, 255, 0.5),
      0 20px 50px rgba(0, 0, 0, 0.9);
  }
  .hook-line2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 118px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -3px;
    text-transform: uppercase;
    background: linear-gradient(180deg, #ffffff 0%, #ffea2e 25%, #f59e0b 70%, #d97706 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 0 #78350f) drop-shadow(0 10px 30px rgba(250, 204, 21, 0.65)) drop-shadow(0 20px 60px rgba(0,0,0,0.9));
  }

  /* 3. CONTEXT BADGES (Cyan Pill + Angled Caution Tape) */
  .badge-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 6px;
    margin-bottom: 4px;
  }
  .pill-context {
    background: rgba(15, 23, 42, 0.9);
    border: 2px solid #00f0ff;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.35);
    border-radius: 12px;
    padding: 6px 18px;
    font-size: 21px;
    font-weight: 900;
    color: #38bdf8;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .pill-context .vs-text {
    color: #ffffff;
    margin: 0 4px;
  }
  .tape-trap {
    background: #ffea2e;
    color: #030712;
    padding: 7px 20px;
    font-size: 23px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 6px;
    box-shadow: 0 6px 20px rgba(250, 204, 21, 0.5), 0 0 0 2px #000;
    transform: rotate(-2deg);
    border: 2px dashed #000;
  }

  /* 4. THE FIGHTER DUEL (Manager vs Employee) */
  .battle-stage {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    margin: 6px 0;
  }

  /* Fighter Card Left (Manager) */
  .fighter-card {
    flex: 1;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(8, 14, 29, 0.95) 100%);
    border-radius: 24px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    backdrop-filter: blur(20px);
  }

  .fighter-card-mgr {
    border: 2.5px solid #00f0ff;
    box-shadow: 0 0 35px rgba(0, 240, 255, 0.25), inset 0 0 25px rgba(0, 240, 255, 0.08);
  }

  /* Fighter Card Right (Employee) */
  .fighter-card-emp {
    border: 2.5px solid #ffea2e;
    box-shadow: 0 0 40px rgba(250, 204, 21, 0.35), inset 0 0 25px rgba(250, 204, 21, 0.1);
  }

  /* Crown on Employee */
  .crown-badge {
    position: absolute;
    top: -24px;
    right: 20px;
    font-size: 38px;
    filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.8));
    transform: rotate(15deg);
    z-index: 15;
  }

  /* Arrow curve on employee */
  .arrow-upward {
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 44px;
    height: 70px;
    filter: drop-shadow(0 0 15px #facc15);
    z-index: 12;
  }

  /* Avatars */
  .avatar-circle {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .avatar-mgr {
    background: radial-gradient(circle, #0284c7 0%, #0369a1 70%, #0c4a6e 100%);
    border: 3px solid #38bdf8;
    box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
  }
  .avatar-emp {
    background: radial-gradient(circle, #f59e0b 0%, #d97706 70%, #78350f 100%);
    border: 3px solid #ffea2e;
    box-shadow: 0 0 30px rgba(250, 204, 21, 0.6);
  }

  .avatar-icon {
    font-size: 48px;
  }

  .fighter-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .label-mgr { color: #f8fafc; }
  .label-emp { color: #ffffff; }

  /* Salary Badges */
  .salary-pill {
    width: 100%;
    padding: 9px 0;
    border-radius: 12px;
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .salary-mgr {
    background: linear-gradient(90deg, #0284c7, #0369a1);
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
    border: 1px solid rgba(56, 189, 248, 0.5);
  }
  .salary-emp {
    background: linear-gradient(90deg, #ffea2e, #f59e0b);
    color: #030712;
    box-shadow: 0 6px 25px rgba(250, 204, 21, 0.7);
    border: 1px solid #ffffff;
    font-weight: 900;
  }

  /* Center Electric VS */
  .vs-cluster {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vs-lightning-text {
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 64px;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 
      0 0 10px #ffffff,
      0 0 25px #00f0ff,
      0 0 50px #facc15,
      0 4px 15px rgba(0,0,0,0.9);
    filter: drop-shadow(0 0 10px #fff);
  }

  /* 5. SQL INTERVIEW CODE CARD WITH 3D DB ICON */
  .code-card {
    width: 100%;
    background: rgba(10, 15, 30, 0.95);
    border: 2px solid rgba(0, 240, 255, 0.45);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15);
    border-radius: 18px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    backdrop-filter: blur(25px);
  }

  .code-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .code-header-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 19px;
    font-weight: 900;
    color: #00f0ff;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  }

  .code-snippet {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 800;
    line-height: 1.35;
    color: #f8fafc;
    text-align: left;
  }
  .code-snippet .kw { color: #38bdf8; font-weight: 900; }
  .code-snippet .fn { color: #ffea2e; }

  /* 3D Holographic DB Icon */
  .db-visual-icon {
    width: 130px;
    height: 130px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .db-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 18px rgba(0, 240, 255, 0.8));
  }

  /* 6. CAUTION TAPE 'CAN YOU SOLVE IT?' BANNER */
  .caution-banner-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }
  .caution-banner {
    background: linear-gradient(90deg, #ffea2e 0%, #facc15 50%, #eab308 100%);
    border: 3px solid #000;
    box-shadow: 0 8px 30px rgba(250, 204, 21, 0.6), 0 0 0 2px rgba(255,255,255,0.2);
    border-radius: 14px;
    padding: 10px 48px;
    transform: rotate(-1.5deg);
    position: relative;
  }
  .caution-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 46px;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: #030712;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(255,255,255,0.5);
  }

  /* 7. BOTTOM INTERACTIVE CTA BADGE */
  .cta-pill-button {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(15, 23, 42, 0.95);
    border: 2px solid #00f0ff;
    border-radius: 999px;
    padding: 10px 32px;
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
    margin-top: 4px;
  }
  .cta-icon {
    font-size: 24px;
  }
  .cta-label {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 2px;
    color: #ffffff;
    text-transform: uppercase;
  }
  .cta-domain {
    color: #00f0ff;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 0 12px rgba(0, 240, 255, 0.7);
  }

  /* Bottom 9:16 Cue Accent (Outside 1:1 Safe Box) */
  .bottom-cue-accent {
    position: absolute;
    bottom: 170px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 2.5px;
    color: #64748b;
    text-transform: uppercase;
  }
  .bottom-cue-accent .dot {
    color: #00f0ff;
  }
</style>
</head>
<body>
  <div class="glow-top-cyan"></div>
  <div class="glow-gold-right"></div>
  <div class="glow-bottom-purple"></div>
  <div class="cyber-grid"></div>

  <!-- Top 9:16 Full Screen Header Accent -->
  <div class="top-meta-bar">
    <span class="badge-cyan">⚡ MANODEMY SQL STUDIO</span>
    <span>•</span>
    <span>DAY 11 INTERVIEW SERIES</span>
  </div>

  <!-- 1:1 SAFE-ZONE CONTAINER (1080x1080 CENTER AREA) -->
  <div class="safe-box">
    
    <!-- 1. MANODEMY BRAND LOGO -->
    <div class="brand-header">
      <svg class="brand-logo-m" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 80V25L42 58L50 48L28 20H15V80Z" fill="url(#brandGrad1)"/>
        <path d="M85 80V25L58 58L50 48L72 20H85V80Z" fill="url(#brandGrad2)"/>
        <path d="M42 58L50 68L58 58L72 20H58L50 36L42 20H28L42 58Z" fill="url(#brandGrad3)"/>
        <defs>
          <linearGradient id="brandGrad1" x1="15" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00F0FF"/>
            <stop offset="1" stop-color="#0284C7"/>
          </linearGradient>
          <linearGradient id="brandGrad2" x1="85" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop stop-color="#38BDF8"/>
            <stop offset="1" stop-color="#6366F1"/>
          </linearGradient>
          <linearGradient id="brandGrad3" x1="50" y1="20" x2="50" y2="68" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00F0FF"/>
            <stop offset="1" stop-color="#A855F7"/>
          </linearGradient>
        </defs>
      </svg>
      <span class="brand-title">MANODEMY</span>
    </div>

    <!-- 2. GIANT 3D HOOK TYPOGRAPHY -->
    <div class="hook-container">
      <div class="hook-line1">WHO EARNS</div>
      <div class="hook-line2">MORE?</div>
    </div>

    <!-- 3. CONTEXT BADGES -->
    <div class="badge-row">
      <div class="pill-context">
        <span>EMPLOYEE</span>
        <span class="vs-text">vs</span>
        <span>MANAGER</span>
      </div>
      <div class="tape-trap">
        SALARY TRAP?
      </div>
    </div>

    <!-- 4. THE FIGHTER DUEL (MANAGER vs EMPLOYEE) -->
    <div class="battle-stage">
      
      <!-- Manager Card -->
      <div class="fighter-card fighter-card-mgr">
        <div class="avatar-circle avatar-mgr">
          <span class="avatar-icon">👔</span>
        </div>
        <div class="fighter-label label-mgr">MANAGER</div>
        <div class="salary-pill salary-mgr">₹18 LPA</div>
      </div>

      <!-- Electric Center VS with Lightning SVG -->
      <div class="vs-cluster">
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none" style="position:absolute; top:-15px; left:-5px; z-index:-1; filter:blur(1px);">
          <path d="M45 5L15 55H50L40 95L85 40H50L65 5H45Z" fill="#ffea2e" opacity="0.8"/>
        </svg>
        <div class="vs-lightning-text">VS</div>
      </div>

      <!-- Employee Card with Crown & Upward Arrow -->
      <div class="fighter-card fighter-card-emp">
        <div class="crown-badge">👑</div>
        <svg class="arrow-upward" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 70C25 50 35 30 35 10M35 10L20 20M35 10L45 25" stroke="#ffea2e" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="avatar-circle avatar-emp">
          <span class="avatar-icon">👨‍💻</span>
        </div>
        <div class="fighter-label label-emp">EMPLOYEE</div>
        <div class="salary-pill salary-emp">₹24 LPA 🔥</div>
      </div>

    </div>

    <!-- 5. SQL CODE SNIPPET CARD WITH 3D NEON DB ICON -->
    <div class="code-card">
      <div class="code-content">
        <div class="code-header-badge">
          <span>🗄️ SQL INTERVIEW QUESTION</span>
        </div>
        <div class="code-snippet">
          <span class="kw">SELECT</span> name<br>
          <span class="kw">FROM</span> employees e<br>
          <span class="kw">WHERE</span> salary &gt; (<br>
          &nbsp;&nbsp;<span class="kw">SELECT</span> salary <span class="kw">FROM</span> emp<br>
          &nbsp;&nbsp;<span class="kw">WHERE</span> emp_id = mgr_id );
        </div>
      </div>

      <!-- 3D Cyan Database Hologram SVG -->
      <div class="db-visual-icon">
        <svg class="db-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- DB Cylinder 1 (Top) -->
          <ellipse cx="60" cy="28" rx="42" ry="14" fill="#0284c7" stroke="#00f0ff" stroke-width="3"/>
          <ellipse cx="60" cy="28" rx="32" ry="9" fill="#38bdf8"/>
          
          <!-- DB Cylinder 2 (Middle) -->
          <path d="M18 28V52C18 60 36.8 66 60 66C83.2 66 102 60 102 52V28" fill="#0369a1" stroke="#00f0ff" stroke-width="3"/>
          <ellipse cx="60" cy="52" rx="42" ry="12" fill="none" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4 3"/>

          <!-- DB Cylinder 3 (Bottom) -->
          <path d="M18 52V76C18 84 36.8 90 60 90C83.2 90 102 84 102 76V52" fill="#075985" stroke="#00f0ff" stroke-width="3"/>
          
          <!-- Glowing Magnifying Glass Accent -->
          <circle cx="82" cy="82" r="18" fill="rgba(15, 23, 42, 0.85)" stroke="#facc15" stroke-width="3.5"/>
          <circle cx="82" cy="82" r="12" fill="rgba(250, 204, 21, 0.2)"/>
          <line x1="95" y1="95" x2="110" y2="110" stroke="#facc15" stroke-width="4.5" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <!-- 6. ANGLE CAUTION TAPE 'CAN YOU SOLVE IT?' -->
    <div class="caution-banner-wrap">
      <div class="caution-banner">
        <div class="caution-text">CAN YOU SOLVE IT?</div>
      </div>
    </div>

    <!-- 7. BOTTOM INTERACTIVE CTA BADGE -->
    <div class="cta-pill-button">
      <span class="cta-icon">🧠</span>
      <span class="cta-label">TEST YOUR SQL:</span>
      <span class="cta-domain">manodemy.com/q18</span>
    </div>

  </div>

  <!-- Bottom 9:16 Full Screen Accent (Outside 1:1 Safe Box) -->
  <div class="bottom-cue-accent">
    <span>🎧 TURN SOUND ON</span>
    <span class="dot">•</span>
    <span>PRACTICE LIVE ON MANODEMY</span>
  </div>

</body>
</html>
"""

async def build_manodemy_cover():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1.0)
        await page.set_content(HTML_CONTENT)
        await page.wait_for_timeout(600)

        # 1. Full 1080x1920 (9:16) Official Reel Cover
        official_cover = OUTPUT_DIR / "SQL-11-R1_Cover.jpg"
        official_cover_png = OUTPUT_DIR / "SQL-11-R1_Cover.png"
        await page.screenshot(path=str(official_cover), type="jpeg", quality=95)
        await page.screenshot(path=str(official_cover_png))
        print(f"[OK] Full 9:16 Official Cover generated: {official_cover} (1080x1920)")

        # 2. Instagram 1:1 Profile Grid Preview (Center 1080x1080 crop: y = 420)
        grid_preview = OUTPUT_DIR / "SQL-11-R1_Grid_1x1_Preview.jpg"
        await page.screenshot(
            path=str(grid_preview),
            type="jpeg",
            quality=95,
            clip={"x": 0, "y": 420, "width": 1080, "height": 1080}
        )
        print(f"[OK] Instagram 1:1 Profile Grid Preview generated: {grid_preview} (1080x1080)")

        # 3. Instagram 4:5 Home Feed Preview (Center 1080x1350 crop: y = 285)
        feed_preview = OUTPUT_DIR / "SQL-11-R1_Feed_4x5_Preview.jpg"
        await page.screenshot(
            path=str(feed_preview),
            type="jpeg",
            quality=95,
            clip={"x": 0, "y": 285, "width": 1080, "height": 1350}
        )
        print(f"[OK] Instagram 4:5 Feed Preview generated: {feed_preview} (1080x1350)")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(build_manodemy_cover())
