import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:8080/python/day01.html')
    page.wait_for_timeout(1000)
    trigger = page.locator('#daySelect').locator('xpath=..').locator('.custom-select-trigger')
    trigger.click()
    page.wait_for_timeout(300)
    info = page.evaluate('''() => {
        const menu = document.querySelector('.day-picker-pill .custom-select-options');
        return {
            scrollHeight: menu.scrollHeight,
            clientHeight: menu.clientHeight,
            headers: Array.from(menu.querySelectorAll('.dropdown-section-header')).map(h => ({
                text: h.innerText.trim(),
                offsetTop: h.offsetTop
            }))
        };
    }''')
    print('Dropdown scroll info:', info)

    # Scroll directly to SQL header offsetTop
    sql_top = [h['offsetTop'] for h in info['headers'] if 'SQL' in h['text']][0]
    page.evaluate(f'''() => {{
        const menu = document.querySelector('.day-picker-pill .custom-select-options');
        menu.scrollTop = {sql_top - 10};
    }}''')
    page.wait_for_timeout(300)
    page.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/python_dropdown_sql_section.png')

    # Scroll directly to Excel header offsetTop
    excel_top = [h['offsetTop'] for h in info['headers'] if 'EXCEL' in h['text']][0]
    page.evaluate(f'''() => {{
        const menu = document.querySelector('.day-picker-pill .custom-select-options');
        menu.scrollTop = {excel_top - 10};
    }}''')
    page.wait_for_timeout(300)
    page.screenshot(path='C:/Users/deepa/.gemini/antigravity/brain/156e6662-103e-4503-98f3-6a07072b2420/python_dropdown_excel_section.png')

    browser.close()
    print("SQL and Excel section screenshots taken successfully!")
