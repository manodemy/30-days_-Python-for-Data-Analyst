import asyncio
from playwright.async_api import async_playwright

VIEWPORTS = [
    {"name": "360px_Galaxy", "width": 360, "height": 740},
    {"name": "375px_iPhoneSE", "width": 375, "height": 667},
    {"name": "390px_iPhone14", "width": 390, "height": 844},
    {"name": "412px_Pixel7", "width": 412, "height": 915},
    {"name": "430px_iPhone14ProMax", "width": 430, "height": 932},
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for vp in VIEWPORTS:
            page = await browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
            await page.goto("http://localhost:8080/landing_v2/index.html", wait_until="domcontentloaded")
            await page.wait_for_timeout(600)
            
            cta = page.locator("#stickyMobileCta")
            is_visible = await cta.is_visible()
            
            info = page.locator(".mobile-cta-info")
            action = page.locator(".mobile-cta-action")
            btn_sec = page.locator(".btn-mobile-cta-secondary")
            btn_pri = page.locator(".btn-mobile-cta-primary")
            
            info_box = await info.bounding_box()
            action_box = await action.bounding_box()
            sec_box = await btn_sec.bounding_box()
            pri_box = await btn_pri.bounding_box()
            
            info_right = info_box["x"] + info_box["width"] if info_box else 0
            action_left = action_box["x"] if action_box else 0
            overlap = info_right > action_left
            gap = action_left - info_right
            
            print(f"=== Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ===")
            print(f"CTA Visible: {is_visible}")
            print(f"Info Box: x={info_box['x']:.1f}, w={info_box['width']:.1f}, right={info_right:.1f}")
            print(f"Action Box: x={action_box['x']:.1f}, w={action_box['width']:.1f}, left={action_left:.1f}")
            print(f"Try Free Box: w={sec_box['width']:.1f}, h={sec_box['height']:.1f}")
            print(f"Enroll Box: w={pri_box['width']:.1f}, h={pri_box['height']:.1f}")
            print(f"Gap between Info and Action: {gap:.1f}px (Collision/Overlap: {overlap})")
            
            clip_y = vp["height"] - 80
            await page.screenshot(
                path=f"C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/cta_{vp['width']}.png",
                clip={"x": 0, "y": clip_y, "width": vp["width"], "height": 80}
            )
            await page.close()
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
