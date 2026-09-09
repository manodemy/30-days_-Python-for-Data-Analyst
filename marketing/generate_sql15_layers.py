"""
Automated 7-Layer Generator for SQL-15-R1 (Fintech Running Balance Trap)
Generates 100% native vector-sharp 1080x1920 PNG layers using Playwright HTML/CSS rendering:
- 0_background.png: Dark fintech stadium with cyan/red atmospheric ambient
- 1_title.png: Giant 3D Gold Metallic 'RUNNING BALANCE BUG?' + LIVE UPI / LEDGER badge
- 2_tape.png: Angled yellow hazard tape '2 TRANSACTIONS ON THE EXACT SAME DATE!'
- 3_card_left.png: Google Pay payment transaction card (Blue glowing frame)
- 4_card_right.png: Bank Ledger balance jump audit card (Red glowing frame)
- 5_vs_lightning.png: Reusable 3D chrome VS badge + lightning clash
- 6_bottom.png: macOS dark glass question card + interactive CTA pill
"""

import sys
import asyncio
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

PROJECT_ROOT = Path(__file__).resolve().parent.parent
LAYERS_DIR = PROJECT_ROOT / "marketing" / "assets" / "sql15_layers"
LAYERS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR = PROJECT_ROOT / "marketing" / "output" / "video"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SHARED_CSS = """
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&family=Plus+Jakarta+Sans:wght@800;900&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@700;800&family=Space+Grotesk:wght@700;900&display=swap');

  :root {
    --cyan: #00f0ff;
    --red: #ff0055;
    --gold: #facc15;
    --gold-light: #fff066;
    --bg-dark: #030611;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1080px;
    height: 1920px;
    background: transparent;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
    position: relative;
  }
"""

async def render_layer(html_body: str, output_path: Path, omit_bg: bool = True):
    full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>{SHARED_CSS}</style>
</head>
<body>
{html_body}
</body>
</html>"""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
        await page.set_content(full_html)
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(output_path), omit_background=omit_bg, type="png")
        await browser.close()
    print(f"   ✓ Rendered: {output_path.name}", flush=True)

async def build_all_sql15_layers():
    print("🎨 Generating 7 Clean Native Layers for SQL-15-R1...", flush=True)

    # 1. LAYER 0: BACKGROUND
    html_bg = """
    <div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 35%, #0a1128 0%, #030611 70%, #010206 100%);">
      <!-- Ambient stadium glow left (cyan) -->
      <div style="position:absolute; top:35%; left:-10%; width:600px; height:800px; background:radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%); filter:blur(80px);"></div>
      <!-- Ambient stadium glow right (red) -->
      <div style="position:absolute; top:35%; right:-10%; width:600px; height:800px; background:radial-gradient(circle, rgba(255,0,85,0.18) 0%, transparent 70%); filter:blur(80px);"></div>
      <!-- Top Title Glow -->
      <div style="position:absolute; top:10%; left:50%; transform:translateX(-50%); width:900px; height:450px; background:radial-gradient(circle, rgba(250,204,21,0.16) 0%, transparent 70%); filter:blur(80px);"></div>
    </div>
    """
    await render_layer(html_bg, LAYERS_DIR / "0_background.png", omit_bg=False)

    # 2. LAYER 1: 3D METALLIC TITLE + LIVE BADGE
    html_title = """
    <div style="position:absolute; top:90px; left:50%; transform:translateX(-50%); width:980px; text-align:center; display:flex; flex-direction:column; align-items:center;">
      <h1 style="font-family:'Montserrat', sans-serif; font-size:88px; font-weight:900; line-height:0.92; letter-spacing:-2px; text-transform:uppercase; color:#fff;
                 text-shadow: 0 4px 0 #94a3b8, 0 8px 0 #475569, 0 12px 0 #1e293b, 0 18px 35px rgba(0,0,0,0.95), 0 0 50px rgba(250,204,21,0.45);">
        RUNNING
      </h1>
      <div style="display:flex; align-items:center; justify-content:center; gap:20px; width:100%; margin-top:8px;">
        <h1 style="font-family:'Montserrat', sans-serif; font-size:92px; font-weight:900; line-height:0.92; letter-spacing:-2px; text-transform:uppercase;
                   background:linear-gradient(180deg, #ffffff 0%, #fff066 35%, #facc15 70%, #d97706 100%);
                   -webkit-background-clip:text; -webkit-text-fill-color:transparent;
                   filter:drop-shadow(0 4px 0 #b45309) drop-shadow(0 8px 0 #78350f) drop-shadow(0 16px 30px rgba(250,204,21,0.65));">
          BALANCE?
        </h1>
        <div style="background:rgba(3,6,17,0.95); border:2.5px solid #00f0ff; border-radius:30px; padding:10px 24px; display:flex; align-items:center; gap:12px; box-shadow:0 0 30px rgba(0,240,255,0.55), inset 0 0 15px rgba(0,240,255,0.2);">
          <div style="width:14px; height:14px; border-radius:50%; background:#ff0055; box-shadow:0 0 14px #ff0055;"></div>
          <span style="font-family:'Plus Jakarta Sans', sans-serif; font-size:22px; font-weight:900; letter-spacing:1.5px; color:#fff; text-shadow:0 0 10px rgba(255,255,255,0.8);">
            UPI · LEDGER
          </span>
        </div>
      </div>
    </div>
    """
    await render_layer(html_title, LAYERS_DIR / "1_title.png")

    # 3. LAYER 2: ANGLE HAZARD CAUTION TAPE
    html_tape = """
    <div style="position:absolute; top:520px; left:50%; transform:translateX(-50%) rotate(-1.5deg); width:1020px;
                background:linear-gradient(90deg, #facc15 0%, #ffe840 50%, #facc15 100%);
                padding:15px 32px; border-radius:10px; display:flex; align-items:center; justify-content:center; gap:16px;
                box-shadow: 0 14px 40px rgba(0,0,0,0.95), 0 0 40px rgba(250,204,21,0.5); border:3.5px solid #fff;">
      <span style="font-size:30px;">⚠️</span>
      <span style="font-family:'Plus Jakarta Sans', sans-serif; font-size:25px; font-weight:900; letter-spacing:2px; color:#030611; text-transform:uppercase;">
        2 TRANSACTIONS ON THE EXACT SAME DATE!
      </span>
      <span style="font-size:30px;">⚠️</span>
    </div>
    """
    await render_layer(html_tape, LAYERS_DIR / "2_tape.png")

    # 4. LAYER 3: CARD LEFT (Google Pay Transaction)
    html_card_left = """
    <div style="position:absolute; top:635px; left:65px; width:455px; height:745px;
                border-radius:28px; border:4px solid #00f0ff; background:linear-gradient(180deg, rgba(8,25,55,0.96) 0%, rgba(3,10,25,0.98) 100%);
                box-shadow: 0 25px 60px rgba(0,0,0,0.98), 0 0 55px rgba(0,240,255,0.45), inset 0 0 35px rgba(0,240,255,0.2);
                display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:28px 24px; overflow:hidden;">
      
      <!-- Card Top Badge -->
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; border-bottom:1.5px solid rgba(0,240,255,0.25); padding-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg, #00f0ff, #0284c7); display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:0 0 18px rgba(0,240,255,0.6);">
            ⚡
          </div>
          <div>
            <div style="font-family:'Montserrat', sans-serif; font-size:20px; font-weight:900; color:#fff; letter-spacing:0.5px;">GOOGLE PAY</div>
            <div style="font-size:13px; font-weight:700; color:#38bdf8;">INSTANT UPI APP</div>
          </div>
        </div>
        <div style="background:rgba(34,197,94,0.15); border:1.5px solid #22c55e; border-radius:12px; padding:4px 10px; font-size:12px; font-weight:800; color:#22c55e; letter-spacing:1px;">
          SUCCESS
        </div>
      </div>

      <!-- Smartphone Payment Screen Graphic -->
      <div style="width:100%; background:linear-gradient(180deg, #0f172a 0%, #020617 100%); border:2px solid #1e293b; border-radius:22px; padding:26px 18px; display:flex; flex-direction:column; align-items:center; gap:14px; box-shadow:0 15px 35px rgba(0,0,0,0.8), inset 0 0 25px rgba(0,240,255,0.08);">
        <div style="width:76px; height:76px; border-radius:50%; background:linear-gradient(135deg, #22c55e, #15803d); display:flex; align-items:center; justify-content:center; font-size:42px; box-shadow:0 0 35px rgba(34,197,94,0.65); border:3px solid #86efac;">
          ✓
        </div>
        <div style="font-family:'Montserrat', sans-serif; font-size:52px; font-weight:900; color:#ffffff; letter-spacing:-1px; text-shadow:0 0 25px rgba(34,197,94,0.55);">
          +₹500.00
        </div>
        <div style="font-size:15px; font-weight:800; color:#94a3b8; letter-spacing:1.5px; text-transform:uppercase;">
          PAID TO STARBUCKS
        </div>
        <!-- Mini Ledger Row Preview -->
        <div style="width:100%; background:rgba(255,255,255,0.05); border-radius:12px; padding:12px 14px; display:flex; justify-content:space-between; font-family:'JetBrains Mono', monospace; font-size:14px; color:#cbd5e1;">
          <span>DATE: OCT 15</span>
          <span style="color:#22c55e; font-weight:800;">BAL: ₹500</span>
        </div>
      </div>

      <!-- Bottom Card Pill -->
      <div style="width:100%; background:rgba(3,6,17,0.95); border:2.5px solid #22c55e; border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(34,197,94,0.4);">
        <span style="font-family:'JetBrains Mono', monospace; font-size:22px; font-weight:900; color:#22c55e; letter-spacing:1px;">
          ROW 1: BAL = ₹500 ✅
        </span>
      </div>
    </div>
    """
    await render_layer(html_card_left, LAYERS_DIR / "3_card_left.png")

    # 5. LAYER 4: CARD RIGHT (Bank Ledger Duplicate Trap)
    html_card_right = """
    <div style="position:absolute; top:635px; right:65px; width:455px; height:745px;
                border-radius:28px; border:4px solid #ff0055; background:linear-gradient(180deg, rgba(55,8,25,0.96) 0%, rgba(25,3,10,0.98) 100%);
                box-shadow: 0 25px 60px rgba(0,0,0,0.98), 0 0 55px rgba(255,0,85,0.45), inset 0 0 35px rgba(255,0,85,0.2);
                display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:28px 24px; overflow:hidden;">
      
      <!-- Card Top Badge -->
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; border-bottom:1.5px solid rgba(255,0,85,0.25); padding-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg, #ff0055, #dc2626); display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:0 0 18px rgba(255,0,85,0.6);">
            🏦
          </div>
          <div>
            <div style="font-family:'Montserrat', sans-serif; font-size:20px; font-weight:900; color:#fff; letter-spacing:0.5px;">STRIPE LEDGER</div>
            <div style="font-size:13px; font-weight:700; color:#f87171;">BANK AUDIT LOG</div>
          </div>
        </div>
        <div style="background:rgba(255,0,85,0.15); border:1.5px solid #ff0055; border-radius:12px; padding:4px 10px; font-size:12px; font-weight:800; color:#ff0055; letter-spacing:1px;">
          GLITCH
        </div>
      </div>

      <!-- Ledger Bug Warning Graphic -->
      <div style="width:100%; background:linear-gradient(180deg, #1e0a14 0%, #0a0206 100%); border:2px solid #450a1e; border-radius:22px; padding:26px 18px; display:flex; flex-direction:column; align-items:center; gap:14px; box-shadow:0 15px 35px rgba(0,0,0,0.8), inset 0 0 25px rgba(255,0,85,0.1);">
        <div style="width:76px; height:76px; border-radius:50%; background:linear-gradient(135deg, #ff0055, #991b1b); display:flex; align-items:center; justify-content:center; font-size:42px; box-shadow:0 0 35px rgba(255,0,85,0.65); border:3px solid #fca5a5;">
          ⚠️
        </div>
        <div style="font-family:'Montserrat', sans-serif; font-size:52px; font-weight:900; color:#ff0055; letter-spacing:-1px; text-shadow:0 0 25px rgba(255,0,85,0.55);">
          ₹1000.00
        </div>
        <div style="font-size:15px; font-weight:800; color:#fca5a5; letter-spacing:1.5px; text-transform:uppercase;">
          SAME DATE TIE JUMP!
        </div>
        <!-- Mini Ledger Row Preview -->
        <div style="width:100%; background:rgba(255,0,85,0.1); border-radius:12px; padding:12px 14px; display:flex; justify-content:space-between; font-family:'JetBrains Mono', monospace; font-size:14px; color:#fecdd3;">
          <span>DATE: OCT 15</span>
          <span style="color:#ff0055; font-weight:800;">BAL: ₹1000 (CORRUPT)</span>
        </div>
      </div>

      <!-- Bottom Card Pill -->
      <div style="width:100%; background:rgba(3,6,17,0.95); border:2.5px solid #ff0055; border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(255,0,85,0.4);">
        <span style="font-family:'JetBrains Mono', monospace; font-size:22px; font-weight:900; color:#ff0055; letter-spacing:1px;">
          ROW 1: BAL = ₹1000 ❌
        </span>
      </div>
    </div>
    """
    await render_layer(html_card_right, LAYERS_DIR / "4_card_right.png")

    # 6. LAYER 6: BOTTOM QUESTION CARD + INTERACTIVE CTA
    html_bottom = """
    <div style="position:absolute; top:1425px; left:50%; transform:translateX(-50%); width:960px; display:flex; flex-direction:column; align-items:center; gap:20px;">
      
      <!-- Question Terminal Card -->
      <div style="width:100%; background:rgba(7,13,31,0.96); border:2.5px solid #1e293b; border-radius:24px; padding:28px 32px; box-shadow:0 25px 60px rgba(0,0,0,0.98); display:flex; flex-direction:column; align-items:center; gap:16px;">
        <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:24px; font-weight:900; color:#f8fafc; text-transform:uppercase; letter-spacing:1px; text-align:center;">
          WHICH QUERY CALCULATES DAILY TOTALS WITHOUT GLITCHING?
        </div>
        <div style="display:flex; align-items:center; justify-content:center; gap:16px; width:100%;">
          <div style="flex:1; background:rgba(255,0,85,0.1); border:2px solid #ff0055; border-radius:14px; padding:12px 16px; text-align:center; font-family:'JetBrains Mono', monospace; font-size:20px; font-weight:800; color:#ff0055;">
            [A] DEFAULT RANGE ❌
          </div>
          <span style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; color:#64748b;">VS</span>
          <div style="flex:1; background:rgba(34,197,94,0.1); border:2px solid #22c55e; border-radius:14px; padding:12px 16px; text-align:center; font-family:'JetBrains Mono', monospace; font-size:20px; font-weight:800; color:#22c55e;">
            [B] ROWS UNBOUNDED ✅
          </div>
        </div>
      </div>

      <!-- CTA Pill -->
      <div style="background:rgba(3,6,17,0.96); border:2.5px solid #00f0ff; border-radius:30px; padding:14px 42px; display:flex; align-items:center; gap:12px; box-shadow:0 0 35px rgba(0,240,255,0.45), inset 0 0 15px rgba(0,240,255,0.2);">
        <span style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; color:#00f0ff; letter-spacing:2px; text-transform:uppercase;">
          VOTE A OR B: manodemy.com/q22
        </span>
      </div>
    </div>
    """
    await render_layer(html_bottom, LAYERS_DIR / "6_bottom.png")

    # 7. GENERATE COMPOSITE MASTER COVER (SQL-15-R1_Opening_Poster_1080x1920.jpg)
    print("🖼️ Stacking all 7 layers to export Master Cover...", flush=True)
    bg = Image.open(LAYERS_DIR / "0_background.png").convert("RGBA")
    title = Image.open(LAYERS_DIR / "1_title.png").convert("RGBA")
    tape = Image.open(LAYERS_DIR / "2_tape.png").convert("RGBA")
    c_l = Image.open(LAYERS_DIR / "3_card_left.png").convert("RGBA")
    c_r = Image.open(LAYERS_DIR / "4_card_right.png").convert("RGBA")
    vs = Image.open(LAYERS_DIR / "5_vs_lightning.png").convert("RGBA")
    bot = Image.open(LAYERS_DIR / "6_bottom.png").convert("RGBA")

    comp = bg.copy()
    comp = Image.alpha_composite(comp, c_l)
    comp = Image.alpha_composite(comp, c_r)
    comp = Image.alpha_composite(comp, vs)
    comp = Image.alpha_composite(comp, tape)
    comp = Image.alpha_composite(comp, title)
    comp = Image.alpha_composite(comp, bot)

    cover_jpg = OUTPUT_DIR / "SQL-15-R1_Opening_Poster_1080x1920.jpg"
    comp.convert("RGB").save(cover_jpg, quality=95)
    print(f"   ✓ Master Cover saved: {cover_jpg}", flush=True)

    # Standard reel cover files
    cover_std_jpg = OUTPUT_DIR / "SQL-15-R1_Cover.jpg"
    cover_std_png = OUTPUT_DIR / "SQL-15-R1_Cover.png"
    comp.convert("RGB").save(cover_std_jpg, quality=95)
    comp.save(cover_std_png)
    print(f"   ✓ Standard Covers saved: {cover_std_jpg} and {cover_std_png}", flush=True)

if __name__ == "__main__":
    asyncio.run(build_all_sql15_layers())
