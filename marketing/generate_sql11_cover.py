"""
Problem-Statement Visual Cover Generator for SQL-11-R1 (Manager Salary Trap).
Safe Zone Standard: 1080x1920 canvas with all visual elements strictly inside 1080x1080 center box.
Visual: 2-Level Engineering Org Hierarchy Card with Sarah (Manager ₹18 LPA) vs Kavitha (₹24 LPA 🔥)
"""

import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "marketing" / "output" / "video"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@700;800;900&family=Space+Grotesk:wght@700;900&display=swap');

  :root {
    --font-heading: 'Plus Jakarta Sans', sans-serif;
    --font-sub: 'Outfit', sans-serif;
    --font-code: 'JetBrains Mono', monospace;
    --cyan: #00f0ff;
    --gold: #facc15;
    --bg-dark: #04060c;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1080px;
    height: 1920px;
    background: var(--bg-dark);
    color: #fff;
    font-family: var(--font-sub);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Ambient Glow Spheres */
  .ambient-top {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 650px;
    background: radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(250, 204, 21, 0.12) 40%, transparent 70%);
    filter: blur(80px);
    z-index: 1;
  }

  .ambient-bottom {
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 550px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(0, 240, 255, 0.1) 45%, transparent 70%);
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
  }

  /* Top & Bottom Accents for 9:16 Full Screen */
  .top-brand-bar {
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 3px;
    color: #64748b;
    text-transform: uppercase;
  }
  .top-brand-bar .brand-name {
    color: #00f0ff;
  }

  .bottom-cue-bar {
    position: absolute;
    bottom: 180px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #64748b;
    text-transform: uppercase;
  }

  /* 1:1 Instagram Profile Safe Container (Exactly 1080x1080 Center Zone) */
  .safe-container {
    width: 980px;
    height: 1040px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
  }

  /* Top Category Pill */
  .top-pill {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 24px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    border: 1.5px solid rgba(0, 240, 255, 0.4);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.25);
  }
  .top-pill .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #00f0ff;
    box-shadow: 0 0 10px #00f0ff;
  }
  .top-pill span {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 2px;
    color: #e2e8f0;
    text-transform: uppercase;
  }

  /* Attention Hook Title */
  .title-section {
    text-align: center;
    margin-top: 4px;
    margin-bottom: 6px;
  }
  .main-hook {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 52px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    text-shadow: 0 8px 30px rgba(0,0,0,0.8);
  }
  .highlight-gold {
    color: #facc15;
    text-shadow: 0 0 25px rgba(250, 204, 21, 0.4);
  }
  .highlight-cyan {
    color: #00f0ff;
    text-shadow: 0 0 25px rgba(0, 240, 255, 0.5);
  }
  .sub-question {
    font-size: 26px;
    font-weight: 700;
    color: #cbd5e1;
    margin-top: 6px;
    letter-spacing: 0.3px;
  }

  /* Center: Org Hierarchy Glassmorphism Widget */
  .org-chart-card {
    width: 100%;
    background: rgba(11, 19, 38, 0.85);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 18px 24px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .manager-node {
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(30, 41, 59, 0.9);
    border: 2px solid rgba(148, 163, 184, 0.4);
    padding: 10px 24px;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  }
  .node-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0284c7, #38bdf8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 900;
    color: #fff;
  }
  .node-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .node-title {
    font-size: 15px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .node-name {
    font-size: 22px;
    font-weight: 800;
    color: #f8fafc;
  }
  .node-salary {
    font-size: 20px;
    font-weight: 800;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.12);
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid rgba(56, 189, 248, 0.3);
  }

  .tree-branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: -4px 0;
  }
  .stem-vertical {
    width: 3px;
    height: 16px;
    background: rgba(148, 163, 184, 0.5);
  }
  .branch-split {
    width: 480px;
    height: 12px;
    border-top: 3px solid rgba(148, 163, 184, 0.5);
    border-left: 3px solid rgba(148, 163, 184, 0.5);
    border-right: 3px solid rgba(148, 163, 184, 0.5);
  }

  .reports-row {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  .report-node {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(15, 23, 42, 0.9);
    border: 2px solid rgba(100, 116, 139, 0.35);
    padding: 10px 18px;
    border-radius: 14px;
  }
  .report-clash {
    border: 2.5px solid #facc15 !important;
    background: rgba(30, 27, 75, 0.95) !important;
    box-shadow: 0 0 35px rgba(250, 204, 21, 0.35);
  }
  .avatar-clash {
    background: linear-gradient(135deg, #f59e0b, #eab308) !important;
  }
  .salary-clash {
    color: #facc15 !important;
    background: rgba(250, 204, 21, 0.18) !important;
    border: 1.5px solid #facc15 !important;
    font-size: 21px !important;
    font-weight: 900 !important;
  }
  .clash-badge {
    font-size: 13px;
    font-weight: 900;
    color: #facc15;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Below Widget: Dual Option Badges */
  .duel-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    margin-top: 4px;
  }

  .option-card {
    flex: 1;
    background: rgba(10, 15, 30, 0.95);
    border-radius: 18px;
    padding: 14px 16px;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    position: relative;
  }

  .opt-a {
    border: 2px solid rgba(0, 240, 255, 0.7);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
  }

  .opt-b {
    border: 2px solid rgba(250, 204, 21, 0.7);
    box-shadow: 0 0 30px rgba(250, 204, 21, 0.2);
  }

  .card-top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .opt-badge {
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-align: center;
  }
  .badge-a { color: #00f0ff; }
  .badge-b { color: #facc15; }

  .mac-dots {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 6px;
  }
  .mac-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .opt-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 17px;
    font-weight: 800;
    line-height: 1.35;
    color: #f8fafc;
    text-align: left;
    width: 100%;
    padding-left: 4px;
  }
  .opt-code .kw { color: #38bdf8; }
  .opt-code .fn { color: #facc15; }
  .opt-code .str { color: #34d399; }

  /* VS Circle */
  .vs-badge {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #0f172a, #1e1b4b);
    border: 2.5px solid #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    font-size: 18px;
    font-weight: 900;
    color: #facc15;
    letter-spacing: 1px;
  }

  /* Bottom Callout Banner: Text Unified Together */
  .bottom-banner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(90deg, rgba(0, 240, 255, 0.12), rgba(250, 204, 21, 0.12));
    border: 1.5px solid rgba(0, 240, 255, 0.45);
    border-radius: 14px;
    padding: 12px 28px;
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
    margin-top: 4px;
  }
  .bottom-text {
    font-size: 21px;
    font-weight: 800;
    color: #f8fafc;
  }
  .brand-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: #00f0ff;
    letter-spacing: 1px;
    text-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
  }
</style>
</head>
<body>
  <div class="ambient-top"></div>
  <div class="ambient-bottom"></div>
  <div class="cyber-grid"></div>

  <!-- Top Brand Accent (outside 1:1 safe zone, visible in 9:16 full cover) -->
  <div class="top-brand-bar">
    <span class="brand-name">⚡ MANODEMY SQL STUDIO</span>
    <span>•</span>
    <span>DAY 11 INTERVIEW TRAP</span>
  </div>

  <!-- 1:1 Safe Container (1080x1080 Center Box) -->
  <div class="safe-container">
    <!-- Category Pill -->
    <div class="top-pill">
      <div class="dot"></div>
      <span>AMAZON & FLIPKART INTERVIEW</span>
    </div>

    <!-- Title Section -->
    <div class="title-section">
      <h1 class="main-hook">
        <span class="highlight-gold">MANAGER SALARY</span> <span class="highlight-cyan">TRAP 💼</span>
      </h1>
      <p class="sub-question">Which query finds employees earning more than their manager?</p>
    </div>

    <!-- Problem Statement Visual: Org Chart Hierarchy Card -->
    <div class="org-chart-card">
      <!-- Manager Node -->
      <div class="manager-node">
        <div class="node-avatar">👔</div>
        <div class="node-info">
          <span class="node-title">Manager (ID: 101)</span>
          <span class="node-name">Sarah</span>
        </div>
        <span class="node-salary">₹18 LPA</span>
      </div>

      <!-- Tree Connector -->
      <div class="tree-branch">
        <div class="stem-vertical"></div>
        <div class="branch-split"></div>
      </div>

      <!-- Reports Row -->
      <div class="reports-row">
        <!-- Alex -->
        <div class="report-node">
          <div class="node-avatar" style="background:#475569;">👨‍💻</div>
          <div class="node-info">
            <span class="node-title">Alex (mgr: 101)</span>
            <span class="node-name">Alex</span>
          </div>
          <span class="node-salary" style="color:#94a3b8; border-color:rgba(148,163,184,0.3); background:rgba(148,163,184,0.1);">₹14 LPA</span>
        </div>

        <!-- Kavitha (Clash Highlight) -->
        <div class="report-node report-clash">
          <div class="node-avatar avatar-clash">🔥</div>
          <div class="node-info">
            <span class="clash-badge">🔥 EARNS MORE!</span>
            <span class="node-name" style="color:#facc15;">Kavitha</span>
          </div>
          <span class="node-salary salary-clash">₹24 LPA</span>
        </div>
      </div>
    </div>

    <!-- Dual Option Duel -->
    <div class="duel-container">
      <!-- Option A -->
      <div class="option-card opt-a">
        <div class="card-top">
          <div class="opt-badge badge-a">OPTION A</div>
          <div class="mac-dots">
            <div class="mac-dot" style="background: #ef4444;"></div>
            <div class="mac-dot" style="background: #f59e0b;"></div>
            <div class="mac-dot" style="background: #10b981;"></div>
          </div>
        </div>
        <div class="opt-code">
          <span class="kw">SELECT</span> e.name<br>
          <span class="kw">FROM</span> employees e<br>
          <span class="kw">JOIN</span> employees m<br>
          &nbsp;&nbsp;<span class="kw">ON</span> e.mgr_id = m.emp_id<br>
          <span class="kw">WHERE</span> e.salary &gt; m.salary;
        </div>
      </div>

      <!-- VS Badge -->
      <div class="vs-badge">VS</div>

      <!-- Option B -->
      <div class="option-card opt-b">
        <div class="card-top">
          <div class="opt-badge badge-b">OPTION B</div>
          <div class="mac-dots">
            <div class="mac-dot" style="background: #ef4444;"></div>
            <div class="mac-dot" style="background: #f59e0b;"></div>
            <div class="mac-dot" style="background: #10b981;"></div>
          </div>
        </div>
        <div class="opt-code">
          <span class="kw">SELECT</span> name<br>
          <span class="kw">FROM</span> employees e<br>
          <span class="kw">WHERE</span> salary &gt; (<br>
          &nbsp;&nbsp;<span class="kw">SELECT</span> salary <span class="kw">FROM</span> emp<br>
          &nbsp;&nbsp;<span class="kw">WHERE</span> emp_id = mgr_id<br>
          );
        </div>
      </div>
    </div>

    <!-- Bottom Callout Banner: Text Unified Together -->
    <div class="bottom-banner">
      <span class="bottom-text">👇 Test your code Live:</span>
      <span class="brand-text">manodemy.com/q18</span>
    </div>
  </div>

  <!-- Bottom Cue Accent (outside 1:1 safe zone, visible in 9:16 full cover) -->
  <div class="bottom-cue-bar">
    <span>🎧 Turn Sound On</span>
    <span style="color:#00f0ff;">•</span>
    <span>Practice Live on Manodemy</span>
  </div>
</body>
</html>
"""

async def build_cover():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # 1. Full 1080x1920 (9:16) Official Reel Cover
        page = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1.0)
        await page.set_content(HTML_TEMPLATE)
        await page.wait_for_timeout(500)

        official_cover = OUTPUT_DIR / "SQL-11-R1_Cover.jpg"
        official_cover_png = OUTPUT_DIR / "SQL-11-R1_Cover.png"
        await page.screenshot(path=str(official_cover), type="jpeg", quality=95)
        await page.screenshot(path=str(official_cover_png))
        print(f"[OK] Full 9:16 Official Cover generated: {official_cover} (1080x1920)")

        # 2. Instagram 1:1 Profile Grid Preview (Center 1080x1080 crop: y = (1920-1080)/2 = 420)
        grid_preview = OUTPUT_DIR / "SQL-11-R1_Grid_1x1_Preview.jpg"
        await page.screenshot(
            path=str(grid_preview),
            type="jpeg",
            quality=95,
            clip={"x": 0, "y": 420, "width": 1080, "height": 1080}
        )
        print(f"[OK] Instagram 1:1 Profile Grid Preview generated: {grid_preview} (1080x1080)")

        # 3. Instagram 4:5 Home Feed Preview (Center 1080x1350 crop: y = (1920-1350)/2 = 285)
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
    asyncio.run(build_cover())
