from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://localhost:8080/landing_v2/index.html')
    page.wait_for_timeout(500)
    
    hook = page.locator('#navCenterAudioHook').bounding_box()
    tabs = page.locator('.curr-tabs').bounding_box()
    first_days = page.locator('.curr-tab-days').first.bounding_box()
    
    hook_bottom = hook['y'] + hook['height']
    tabs_top = tabs['y']
    days_top = first_days['y']
    gap = tabs_top - hook_bottom
    days_clearance = days_top - hook_bottom
    
    print(f'HookBottom={hook_bottom:.1f}px, TabsTop={tabs_top:.1f}px (Gap={gap:.1f}px), 18DaysTop={days_top:.1f}px (DaysClearance={days_clearance:.1f}px)')
    
    # Save a screenshot of the top 200px
    page.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/verified_mobile_landing_fixed.png')
    browser.close()
    print('SUCCESS')
