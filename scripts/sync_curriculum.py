import json
import re
import os
import sys

# Configure UTF-8 encoding for standard output
sys.stdout.reconfigure(encoding='utf-8')

MASTER_FILE = 'data/curriculum_60_days.json'
if not os.path.exists(MASTER_FILE):
    raise FileNotFoundError(f"Missing master curriculum file: {MASTER_FILE}")

with open(MASTER_FILE, 'r', encoding='utf-8') as f:
    CURRICULUM = json.load(f)

print(f"Loaded {len(CURRICULUM)} canonical days from {MASTER_FILE}")
canonical_map = {f"{d['track']}_{d['trackDay']}": d for d in CURRICULUM}

# -------------------------------------------------------------
# 1. Update public/Version-3/content/manifest.js
# -------------------------------------------------------------
def update_version3_manifest(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = ["  const MANIFEST_60 = ["]
    lines.append("    // 🗄️ SQL Track (Days 01–18)")
    for d in CURRICULUM:
        if d['track'] == 'sql':
            lines.append(f"    {{ globalDay: {d['globalDay']}, track: '{d['track']}', id: '{d['id']}', trackDay: {d['trackDay']}, title: '{d['title']}', emoji: '{d['emoji']}', url: '{d['url']}', free: true, prepared: true, comingSoon: false }},")
    lines.append("\n    // 📊 Excel Track (Days 19–30 / Excel Days 01–12)")
    for d in CURRICULUM:
        if d['track'] == 'excel':
            lines.append(f"    {{ globalDay: {d['globalDay']}, track: '{d['track']}', id: '{d['id']}', trackDay: {d['trackDay']}, title: '{d['title']}', emoji: '{d['emoji']}', url: '{d['url']}', free: true, prepared: true, comingSoon: false }},")
    lines.append("\n    // 🐍 Python Track (Days 31–60 / Python Days 01–30)")
    for d in CURRICULUM:
        if d['track'] == 'python':
            lines.append(f"    {{ globalDay: {d['globalDay']}, track: '{d['track']}', id: '{d['id']}', trackDay: {d['trackDay']}, title: '{d['title']}', emoji: '{d['emoji']}', url: '{d['url']}', free: true, prepared: true, comingSoon: false }},")
    lines.append("  ];")
    new_manifest_code = "\n".join(lines)
    
    pattern = re.compile(r'  const MANIFEST_60 = \[.*?\];', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_manifest_code, content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"Failed to match MANIFEST_60 in {path}")

# -------------------------------------------------------------
# 2. Update Excel manifests (excel/content/manifest.js & public)
# -------------------------------------------------------------
def update_excel_manifest(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = ["window.EXCEL_MANIFEST = ["]
    for d in CURRICULUM:
        if d['track'] == 'excel':
            lines.append(f'  {{ day: {d["trackDay"]}, globalDay: {d["globalDay"]}, id: "excelDay{d["trackDay"]:02d}", title: "{d["title"]}", emoji: "{d["emoji"]}", status: "live", prepared: true, free: true }},')
    lines.append("];")
    new_code = "\n".join(lines)
    
    pattern = re.compile(r'window\.EXCEL_MANIFEST\s*=\s*\[.*?\];', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_code, content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"Failed to match EXCEL_MANIFEST in {path}")

# -------------------------------------------------------------
# 3. Update Python manifests (python/content/manifest.js & public)
# -------------------------------------------------------------
def update_python_manifest(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    items = []
    for d in CURRICULUM:
        if d['track'] == 'python':
            items.append({
                "day": d["trackDay"],
                "id": f"pyDay{d['trackDay']:02d}",
                "title": d["title"],
                "emoji": d["emoji"],
                "status": "live",
                "prepared": True
            })
    json_str = json.dumps(items, indent=2, ensure_ascii=False)
    new_code = f"window.COURSE_MANIFEST = {json_str};"
    
    pattern = re.compile(r'window\.COURSE_MANIFEST\s*=\s*\[.*?\];', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_code, content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"Failed to match COURSE_MANIFEST in {path}")

# -------------------------------------------------------------
# 4. Update Roadmap JS (landing_v2/roadmap.js & public)
# -------------------------------------------------------------
def update_roadmap_js(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = ["const DATA=["]
    lines.append("  // SQL Phase (Days 1–18)")
    for d in CURRICULUM:
        if d['track'] == 'sql':
            lines.append(f'  {{topic:"{d["title"]}",phase:"SQL",icon:"{d["emoji"]}",free:true}},')
    lines.append("\n  // Excel Phase (Days 19–30)")
    for d in CURRICULUM:
        if d['track'] == 'excel':
            lines.append(f'  {{topic:"{d["title"]}",phase:"Excel",icon:"{d["emoji"]}",free:true}},')
    lines.append("\n  // Python Phase (Days 31–60)")
    for d in CURRICULUM:
        if d['track'] == 'python':
            lines.append(f'  {{topic:"{d["title"]}",phase:"Python",icon:"{d["emoji"]}",free:true}},')
    lines.append("];")
    new_code = "\n".join(lines)
    
    pattern = re.compile(r'const DATA=\[.*?\];', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_code, content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"Failed to match DATA=[ in {path}")

# -------------------------------------------------------------
# 5. Update Landing Cards (landing_v2/index.html & public)
# -------------------------------------------------------------
def update_landing_cards(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    def generate_panel_cards(track_name, badge_color_var):
        cards_html = []
        track_days = [d for d in CURRICULUM if d['track'] == track_name]
        for d in track_days:
            day_str = f"{d['trackDay']:02d}"
            if track_name == 'sql' and d['trackDay'] == 1:
                icon_html = '<span class="tech-logo logo-sql" title="SQL"><svg fill="none" stroke="#f97316" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg></span>'
            elif track_name == 'excel' and d['trackDay'] == 1:
                icon_html = '<span class="tech-logo logo-excel" title="Excel"><svg fill="none" viewbox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"></path><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"></path><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"></path><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"></path><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"></path><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"></path><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"></path><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"></path></svg></span>'
            elif track_name == 'python' and d['trackDay'] == 1:
                icon_html = '<span class="tech-logo logo-python" title="Python"><svg fill="none" viewbox="45.9 0 367.2 459"><path d="M229.5 0C161.4 0 122.4 15.6 122.4 53.6v34.4h107.1v15.3H122.4c-47.8 0-76.5 30.6-76.5 76.5v61.2c0 45.9 28.7 76.5 76.5 76.5h30.6v-45.9c0-51 41.3-91.8 91.8-91.8h107.1V107.1c0-53.6-47.8-107.1-122.4-107.1zM175.9 30.6c8.4 0 15.3 6.9 15.3 15.3s-6.9 15.3-15.3 15.3-15.3-6.9-15.3-15.3 6.9-15.3 15.3-15.3z" fill="#306998"></path><path d="M229.5 459c68.1 0 107.1-15.6 107.1-53.6v-34.4H229.5v-15.3h107.1c47.8 0 76.5-30.6 76.5-76.5v-61.2c0-45.9-28.7-76.5-76.5-76.5h-30.6v45.9c0 51-41.3 91.8-91.8 91.8H122.4V351.9c0 53.6 47.8 107.1 122.4 107.1zm53.6-30.6c-8.4 0-15.3-6.9-15.3-15.3s6.9-15.3 15.3-15.3 15.3 6.9 15.3 15.3-6.9 15.3-15.3 15.3z" fill="#FFE873"></path></svg></span>'
            else:
                icon_html = d['emoji']
            
            badge_text = d.get('badge', 'FREE')
            title_escaped = d['title'].replace('&', '&amp;')
            
            card = f'''<a class="day-card" data-day="{day_str}" href="{d['url']}" tabindex="0">
<span class="day-num" style="color:{badge_color_var}">Day {day_str}</span>
<span class="day-emoji">{icon_html}</span>
<span class="day-title">{title_escaped}</span>
<span class="day-badge badge-free">{badge_text}</span>
</a>'''
            cards_html.append(card)
        return "\n".join(cards_html)

    sql_pattern = re.compile(r'(<div class="curr-panel curr-panel--sql active" id="panel-sql">\s*<div class="curriculum-grid">).*?(</div>\s*</div>\s*<!-- Excel Panel -->)', re.DOTALL)
    new_sql = "\\1\n" + generate_panel_cards('sql', 'var(--emerald)') + "\n\\2"
    html = sql_pattern.sub(new_sql, html)

    excel_pattern = re.compile(r'(<div class="curr-panel curr-panel--excel" id="panel-excel"[^>]*>\s*<div class="curriculum-grid">).*?(</div>\s*</div>\s*<!-- Python Panel -->)', re.DOTALL)
    new_excel = "\\1\n" + generate_panel_cards('excel', 'var(--gold)') + "\n\\2"
    html = excel_pattern.sub(new_excel, html)

    python_pattern = re.compile(r'(<div class="curr-panel curr-panel--python" id="panel-python"[^>]*>\s*<div class="curriculum-grid">).*?(</div>\s*</div>\s*</div>\s*</section>)', re.DOTALL)
    new_python = "\\1\n" + generate_panel_cards('python', 'var(--cyan)') + "\n\\2"
    html = python_pattern.sub(new_python, html)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {path}")

# -------------------------------------------------------------
# 6. Update Home & Dashboard (home.html & public)
# -------------------------------------------------------------
def generate_metadata_array(track_name):
    days = [d for d in CURRICULUM if d['track'] == track_name]
    lines = []
    for d in days:
        day_str = f"{d['trackDay']:02d}"
        title = d['title']
        emoji = d['emoji']
        totalCells = d.get('totalCells', 25)
        category = d.get('category', 'basics')
        testCount = d.get('testCount', 25)
        marksPerQ = d.get('marksPerQ', 1)
        lines.append(f'      {{ day: "{day_str}", title: "{title}", emoji: "{emoji}", totalCells: {totalCells}, category: "{category}", testCount: {testCount}, marksPerQ: {marksPerQ} }},')
    return "\n".join(lines)

def generate_topics_array(track_name):
    days = [d for d in CURRICULUM if d['track'] == track_name]
    lines = []
    for d in days:
        day_str = f"{d['trackDay']:02d}"
        title = d['title']
        emoji = d['emoji']
        cells = d.get('totalCells', 25)
        lines.append(f'        {{ courseDay: "{day_str}", title: "{title}", emoji: "{emoji}", cells: {cells} }},')
    return "\n".join(lines)

def update_home_html(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_sql_meta = "const SQL_METADATA = [\n" + generate_metadata_array('sql') + "\n    ];"
    content = re.sub(r'const\s+SQL_METADATA\s*=\s*\[.*?\];', new_sql_meta, content, flags=re.DOTALL)

    new_excel_meta = "const EXCEL_METADATA = [\n" + generate_metadata_array('excel') + "\n    ];"
    content = re.sub(r'const\s+EXCEL_METADATA\s*=\s*\[.*?\];', new_excel_meta, content, flags=re.DOTALL)

    new_py_meta = "const PYTHON_METADATA = [\n" + generate_metadata_array('python') + "\n    ];"
    content = re.sub(r'const\s+PYTHON_METADATA\s*=\s*\[.*?\];', new_py_meta, content, flags=re.DOTALL)

    new_sql_topics = "const SQL_TOPICS = [\n" + generate_topics_array('sql') + "\n      ];"
    content = re.sub(r'const\s+SQL_TOPICS\s*=\s*\[.*?\];', new_sql_topics, content, flags=re.DOTALL)

    new_excel_topics = "const EXCEL_TOPICS = [\n" + generate_topics_array('excel') + "\n      ];"
    content = re.sub(r'const\s+EXCEL_TOPICS\s*=\s*\[.*?\];', new_excel_topics, content, flags=re.DOTALL)

    new_py_topics = "const PYTHON_TOPICS = [\n" + generate_topics_array('python') + "\n      ];"
    content = re.sub(r'const\s+PYTHON_TOPICS\s*=\s*\[.*?\];', new_py_topics, content, flags=re.DOTALL)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {path}")

# -------------------------------------------------------------
# 7. Update Studio Content Files (SQL, Excel, Python)
# -------------------------------------------------------------
def update_sql_content(track_day, title):
    path = f"public/Version-3/content/day-{track_day:02d}.js"
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace top title in first 600 chars
    head = content[:600]
    tail = content[600:]
    pattern = re.compile(r'(["\']?title["\']?\s*:\s*)["\'][^"\']+["\']')
    if pattern.search(head):
        new_head = pattern.sub(f'\\1"{title}"', head, count=1)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_head + tail)

def update_excel_content(track_day, title):
    for base in ['excel', 'public/excel']:
        path = f"{base}/content/excel-day-{track_day:02d}.js"
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Locate window.EXCEL_COURSE_CONTENT
        m = re.search(r'window\.EXCEL_COURSE_CONTENT\[.+?\]\s*=\s*\{', content)
        if m:
            start = m.start()
            head = content[:start]
            body = content[start:start+700]
            tail = content[start+700:]
            pat = re.compile(r'(title\s*:\s*)["\'][^"\']+["\']')
            if pat.search(body):
                new_body = pat.sub(f'\\1"{title}"', body, count=1)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(head + new_body + tail)

def update_python_content(track_day, title):
    for base in ['python', 'public/python']:
        path = f"{base}/content/py-day-{track_day:02d}.js"
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        head = content[:600]
        tail = content[600:]
        pat = re.compile(r'(["\']?title["\']?\s*:\s*)["\'][^"\']+["\']')
        if pat.search(head):
            new_head = pat.sub(f'\\1"{title}"', head, count=1)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_head + tail)

# -------------------------------------------------------------
# 8. Update Day HTML Page Titles (<title> & <meta description>)
# -------------------------------------------------------------
def update_day_html_pages():
    # SQL
    for d in CURRICULUM:
        if d['track'] == 'sql':
            day_str = f"{d['trackDay']:02d}"
            title = d['title']
            for path in [f"sql/day{day_str}.html", f"public/sql/day{day_str}.html"]:
                if os.path.exists(path):
                    with open(path, 'r', encoding='utf-8') as f:
                        html = f.read()
                    html = re.sub(r'<title>.*?</title>', f'<title>Manodemy — Day {day_str}: {title}</title>', html, count=1)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(html)
    # Excel
    for d in CURRICULUM:
        if d['track'] == 'excel':
            day_str = f"{d['trackDay']:02d}"
            title = d['title']
            for path in [f"excel/day{day_str}.html", f"public/excel/day{day_str}.html"]:
                if os.path.exists(path):
                    with open(path, 'r', encoding='utf-8') as f:
                        html = f.read()
                    html = re.sub(r'<title>.*?</title>', f'<title>Manodemy — Excel Day {day_str}: {title}</title>', html, count=1)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(html)
    # Python
    for d in CURRICULUM:
        if d['track'] == 'python':
            day_str = f"{d['trackDay']:02d}"
            title = d['title']
            for path in [f"python/day{day_str}.html", f"public/python/day{day_str}.html"]:
                if os.path.exists(path):
                    with open(path, 'r', encoding='utf-8') as f:
                        html = f.read()
                    html = re.sub(r'<title>.*?</title>', f'<title>Manodemy — Python Day {day_str}: {title}</title>', html, count=1)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(html)
    print("Updated day HTML page <title> headers across all tracks")

# -------------------------------------------------------------
# MASTER EXECUTION PIPELINE
# -------------------------------------------------------------
print("\n--- RUNNING MASTER CURRICULUM SYNCHRONIZATION ---")
update_version3_manifest('public/Version-3/content/manifest.js')
update_excel_manifest('excel/content/manifest.js')
update_excel_manifest('public/excel/content/manifest.js')
update_python_manifest('python/content/manifest.js')
update_python_manifest('public/python/content/manifest.js')
update_roadmap_js('landing_v2/roadmap.js')
update_roadmap_js('public/landing_v2/roadmap.js')
update_landing_cards('landing_v2/index.html')
update_landing_cards('public/landing_v2/index.html')
update_home_html('home.html')
update_home_html('public/home.html')

for i in range(1, 19):
    update_sql_content(i, canonical_map[f'sql_{i}']['title'])
print("Updated all 18 SQL content files")

for i in range(1, 13):
    update_excel_content(i, canonical_map[f'excel_{i}']['title'])
print("Updated all 12 Excel content files")

for i in range(1, 31):
    update_python_content(i, canonical_map[f'python_{i}']['title'])
print("Updated all 30 Python content files")

update_day_html_pages()

print("\n--- MASTER SYNC FINISHED: 100% UNIFIED ACROSS ALL TOUCHPOINTS! ---")
