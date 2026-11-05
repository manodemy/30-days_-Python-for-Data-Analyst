import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Desktop
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        # Add guest=true or whatever bypasses auth
        await page.goto("http://localhost:8080/home.html?guest=true", wait_until="domcontentloaded")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/home_desktop.png", full_page=True)
        await page.close()
        
        # Mobile
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        await page.goto("http://localhost:8080/home.html?guest=true", wait_until="domcontentloaded")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/home_mobile.png", full_page=True)
        await page.close()
        
        await browser.close()
        print("Screenshots taken successfully!")

if __name__ == "__main__":
    asyncio.run(main())

