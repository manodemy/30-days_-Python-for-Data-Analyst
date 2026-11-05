import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1. Excel Day 02 Desktop (Light & Dark)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:8080/excel/day02.html')
    page.wait_for_selector('#pyLoadingOverlay', state='hidden', timeout=10000)
    page.wait_for_timeout(500)
    page.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/excel_day02_desktop_light.png')

    page.locator('#themeToggleBtn').click()
    page.wait_for_timeout(500)
    page.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/excel_day02_desktop_dark.png')

    # 2. Excel Day 02 Mobile (Light & Dark)
    mob = browser.new_page(viewport={'width': 390, 'height': 844})
    mob.goto('http://localhost:8080/excel/day02.html')
    mob.wait_for_selector('#pyLoadingOverlay', state='hidden', timeout=10000)
    mob.wait_for_timeout(500)
    mob.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/excel_day02_mobile_light.png')

    mob.locator('#themeToggleBtn').click()
    mob.wait_for_timeout(500)
    mob.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/excel_day02_mobile_dark.png')

    # 3. Python Day 01 Desktop & Mobile
    py = browser.new_page(viewport={'width': 1440, 'height': 900})
    py.goto('http://localhost:8080/python/day01.html')
    py.wait_for_timeout(1000)
    py.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/python_day01_desktop.png')

    py_mob = browser.new_page(viewport={'width': 390, 'height': 844})
    py_mob.goto('http://localhost:8080/python/day01.html')
    py_mob.wait_for_timeout(1000)
    py_mob.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/python_day01_mobile.png')

    # 4. SQL Day 01 Desktop & Mobile
    sql_desk = browser.new_page(viewport={'width': 1440, 'height': 900})
    sql_desk.goto('http://localhost:8080/sql/day01.html')
    sql_desk.wait_for_timeout(1000)
    sql_desk.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/sql_day01_desktop.png')

    sql_mob = browser.new_page(viewport={'width': 390, 'height': 844})
    sql_mob.goto('http://localhost:8080/sql/day01.html')
    sql_mob.wait_for_timeout(1000)
    sql_mob.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/sql_day01_mobile.png')

    browser.close()
    print("All screenshots captured successfully!")
