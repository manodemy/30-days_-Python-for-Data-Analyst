import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Check Excel Day 02 Desktop
    p1 = browser.new_page(viewport={'width': 1440, 'height': 900})
    p1.goto('http://localhost:8080/excel/day02.html')
    p1.wait_for_selector('#pyLoadingOverlay', state='hidden', timeout=10000)
    
    # Check Topic Title
    topic_text = p1.locator('.topic-picker-pill .trigger-title').inner_text()
    print('Excel Day 02 Topic Title:', topic_text)
    assert 'Formatting, Sorting' in topic_text, f'Wrong title: {topic_text}'
    
    # Check Stepper positions
    prev_box = p1.locator('#prevDayBtn').bounding_box()
    day_box = p1.locator('.day-picker-pill:not(.topic-picker-pill)').bounding_box()
    next_box = p1.locator('#nextDayBtn').bounding_box()
    topic_box = p1.locator('.day-picker-pill.topic-picker-pill').bounding_box()
    
    print(f"Prev X: {prev_box['x']:.1f}, Day X: {day_box['x']:.1f}, Next X: {next_box['x']:.1f}, Topic X: {topic_box['x']:.1f}")
    assert prev_box['x'] < day_box['x'] < next_box['x'] < topic_box['x'], 'Stepper order incorrect!'
    print('PASS: Stepper fused in correct Linear order (Prev -> Day -> Next -> Topic)')
    
    # Check Mobile Layout
    mob = browser.new_page(viewport={'width': 390, 'height': 844})
    mob.goto('http://localhost:8080/excel/day02.html')
    mob.wait_for_selector('#pyLoadingOverlay', state='hidden', timeout=10000)
    
    # Theme button parent
    theme_parent = mob.evaluate("""() => {
        const btn = document.getElementById('themeToggleBtn');
        return btn.parentElement.className;
    }""")
    print('Mobile Theme Toggle Parent Class:', theme_parent)
    assert 'header-right' in theme_parent, 'Theme toggle should be in header-right!'
    
    # Check Light Mode Stats Label background
    mob.evaluate("""() => {
        document.documentElement.setAttribute('data-theme', 'light');
    }""")
    mob.wait_for_timeout(200)
    stats_bg = mob.evaluate("""() => {
        const el = document.querySelector('.stats-label');
        return window.getComputedStyle(el).backgroundColor;
    }""")
    print('Light Mode Stats Label BG:', stats_bg)
    assert stats_bg != 'rgb(30, 41, 59)', 'Stats label is dark in light mode!'
    
    # Check Python Day 01
    py = browser.new_page(viewport={'width': 1440, 'height': 900})
    py.goto('http://localhost:8080/python/day01.html')
    py.wait_for_timeout(1000)
    py_prev = py.locator('#prevDayBtn').bounding_box()
    py_day = py.locator('.day-picker-pill:not(.topic-picker-pill)').bounding_box()
    py_next = py.locator('#nextDayBtn').bounding_box()
    py_topic = py.locator('.day-picker-pill.topic-picker-pill').bounding_box()
    print(f"Python Stepper X: Prev={py_prev['x']:.1f}, Day={py_day['x']:.1f}, Next={py_next['x']:.1f}, Topic={py_topic['x']:.1f}")
    assert py_prev['x'] < py_day['x'] < py_next['x'] < py_topic['x'], 'Python stepper order incorrect!'
    print('PASS: Python stepper fused in correct Linear order')

    # Check SQL Day 01
    sql = browser.new_page(viewport={'width': 1440, 'height': 900})
    sql.goto('http://localhost:8080/sql/day01.html')
    sql.wait_for_timeout(1000)
    sql_prev = sql.locator('#prevDayBtn').bounding_box()
    sql_day = sql.locator('.day-picker-pill:not(.topic-picker-pill)').bounding_box()
    sql_next = sql.locator('#nextDayBtn').bounding_box()
    sql_topic = sql.locator('.day-picker-pill.topic-picker-pill').bounding_box()
    print(f"SQL Stepper X: Prev={sql_prev['x']:.1f}, Day={sql_day['x']:.1f}, Next={sql_next['x']:.1f}, Topic={sql_topic['x']:.1f}")
    assert sql_prev['x'] < sql_day['x'] < sql_next['x'] < sql_topic['x'], 'SQL stepper order incorrect!'
    print('PASS: SQL stepper fused in correct Linear order')

    browser.close()
    print('ALL VERIFICATIONS PASSED 100%!')
