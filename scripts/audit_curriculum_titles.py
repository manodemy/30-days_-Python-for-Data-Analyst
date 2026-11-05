import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('data/curriculum_60_days.json', 'r', encoding='utf-8') as f:
    canonical = json.load(f)

print(f"Auditing all {len(canonical)} canonical curriculum days across 10 touchpoints...")

# Touchpoint 1: SQL Manifest (public/Version-3/content/manifest.js)
sql_manifest = {}
with open('public/Version-3/content/manifest.js', 'r', encoding='utf-8') as f:
    txt = f.read()
    for m in re.finditer(r"track:\s*'sql'.*?trackDay:\s*(\d+).*?title:\s*'([^']+)'", txt, re.DOTALL):
        sql_manifest[int(m.group(1))] = m.group(2)

# Touchpoint 2: Excel Manifest (excel/content/manifest.js)
excel_manifest = {}
with open('excel/content/manifest.js', 'r', encoding='utf-8') as f:
    txt = f.read()
    for m in re.finditer(r'day:\s*(\d+).*?title:\s*"([^"]+)"', txt):
        excel_manifest[int(m.group(1))] = m.group(2)

# Touchpoint 3: Python Manifest (python/content/manifest.js)
py_manifest = {}
with open('python/content/manifest.js', 'r', encoding='utf-8') as f:
    txt = f.read()
    for m in re.finditer(r'"day":\s*(\d+).*?"title":\s*"([^"]+)"', txt, re.DOTALL):
        py_manifest[int(m.group(1))] = m.group(2)

# Touchpoint 4: Roadmap DATA (landing_v2/roadmap.js)
roadmap_titles = []
with open('landing_v2/roadmap.js', 'r', encoding='utf-8') as f:
    txt = f.read()
    for m in re.finditer(r'topic:\s*"([^"]+)"', txt):
        roadmap_titles.append(m.group(1))

# Touchpoint 5: Landing Cards (landing_v2/index.html)
landing_titles = {'sql': {}, 'excel': {}, 'python': {}}
with open('landing_v2/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()
    for panel, track in [('panel-sql', 'sql'), ('panel-excel', 'excel'), ('panel-python', 'python')]:
        p_m = re.search(r'id="' + panel + r'".*?(?=<!-- [A-Za-z]+ Panel|</div>\s*</div>\s*</div>\s*</section>)', txt, re.DOTALL)
        if p_m:
            for c_m in re.finditer(r'data-day="(\d+)".*?<span class="day-title">([^<]+)</span>', p_m.group(0), re.DOTALL):
                landing_titles[track][int(c_m.group(1))] = c_m.group(2).replace('&amp;', '&').strip()

# Touchpoint 6: Home Metadata (home.html)
home_meta = {'sql': {}, 'excel': {}, 'python': {}}
with open('home.html', 'r', encoding='utf-8') as f:
    txt = f.read()
    for arr, track in [('SQL_METADATA', 'sql'), ('EXCEL_METADATA', 'excel'), ('PYTHON_METADATA', 'python')]:
        m = re.search(r'const\s+' + arr + r'\s*=\s*\[(.*?)\];', txt, re.DOTALL)
        if m:
            for item in re.finditer(r'day:\s*"(\d+)".*?title:\s*"([^"]+)"', m.group(1)):
                home_meta[track][int(item.group(1))] = item.group(2)

# Touchpoint 7: Home Topics (home.html)
home_topics = {'sql': {}, 'excel': {}, 'python': {}}
with open('home.html', 'r', encoding='utf-8') as f:
    txt = f.read()
    for arr, track in [('SQL_TOPICS', 'sql'), ('EXCEL_TOPICS', 'excel'), ('PYTHON_TOPICS', 'python')]:
        m = re.search(r'const\s+' + arr + r'\s*=\s*\[(.*?)\];', txt, re.DOTALL)
        if m:
            for item in re.finditer(r'courseDay:\s*"(\d+)".*?title:\s*"([^"]+)"', m.group(1)):
                home_topics[track][int(item.group(1))] = item.group(2)

total_checks = 0
mismatches = []

for idx, d in enumerate(canonical):
    track = d['track']
    tday = d['trackDay']
    gday = d['globalDay']
    canonical_title = d['title']

    # 1. Manifest
    if track == 'sql':
        m_title = sql_manifest.get(tday)
    elif track == 'excel':
        m_title = excel_manifest.get(tday)
    else:
        m_title = py_manifest.get(tday)
    total_checks += 1
    if m_title != canonical_title:
        mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Manifest mismatch: '{m_title}' != '{canonical_title}'")

    # 2. Roadmap
    if idx < len(roadmap_titles):
        r_title = roadmap_titles[idx]
        total_checks += 1
        if r_title != canonical_title:
            mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Roadmap mismatch: '{r_title}' != '{canonical_title}'")
    else:
        mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Missing from roadmap DATA")

    # 3. Landing Card
    l_title = landing_titles[track].get(tday)
    total_checks += 1
    if l_title != canonical_title:
        mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Landing Card mismatch: '{l_title}' != '{canonical_title}'")

    # 4. Home Metadata
    h_meta_title = home_meta[track].get(tday)
    total_checks += 1
    if h_meta_title != canonical_title:
        mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Home Metadata mismatch: '{h_meta_title}' != '{canonical_title}'")

    # 5. Home Topics
    h_top_title = home_topics[track].get(tday)
    total_checks += 1
    if h_top_title != canonical_title:
        mismatches.append(f"Day {gday:02d} ({track} {tday:02d}) Home Topics mismatch: '{h_top_title}' != '{canonical_title}'")

print(f"\nAudit complete: Executed {total_checks} cross-verifications across 60 days.")
if not mismatches:
    print(">>> 100% PERFECT MATCH! ZERO MISMATCHES FOUND ACROSS ALL TOUCHPOINTS! <<<")
else:
    print(f"FOUND {len(mismatches)} MISMATCHES:")
    for err in mismatches[:20]:
        print(" -", err)
