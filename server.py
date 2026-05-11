"""
server.py — Manodemy Live Development Server + Static Builder

TWO MODES:
  python server.py              → Live server at http://localhost:8080
                                  Reads notebooks on every request.
                                  Edit a notebook → refresh browser → see changes.

  python server.py build        → Generates all 30 static HTML files for deployment.
                                  Push manodemy_web/ to GitHub Pages / Vercel / Netlify.

  python server.py build 5      → Rebuild only day05.html
  python server.py build 10 20  → Rebuild day10 through day20
"""

import json, sys, re, os, html as ht, time
from pathlib import Path
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parent
NB_DIR = ROOT / 'notebooks'

# ═══════════════════════════════════════════════════════════════════════════
# CURRICULUM MAP — (notebook_file, display_title, emoji)
# ═══════════════════════════════════════════════════════════════════════════
DAYS = [
    ('Day01_Data_Types_Blank.ipynb',      'Data Types and Memory',     '🔢'),
    ('Day02_Operators_Blank.ipynb',       'Operators and Expressions', '➕'),
    ('Day03_Strings_Blank.ipynb',         'Strings',                   '📝'),
    ('Day04_Lists_Blank.ipynb',           'Lists',                     '📋'),
    ('Day05_Tuples_Blank.ipynb',          'Tuples',                    '📦'),
    ('Day06_Sets_Blank.ipynb',            'Sets',                      '⭕'),
    ('Day07_Dictionaries_Blank.ipynb',    'Dictionaries',              '🗂️'),
    ('Day08_Conditionals_Blank.ipynb',    'Conditionals',              '🔀'),
    ('Day09_Loops_Blank.ipynb',           'Loops',                     '🔄'),
    ('Day10_Functions_Blank.ipynb',       'Functions',                 '⚙️'),
    ('Day11_Modules_Blank.ipynb',         'Modules',                   '📦'),
    ('Day12_Comprehensions_Blank.ipynb',  'Comprehensions',            '🧮'),
    ('Day13_Lambda_Blank.ipynb',          'Lambda Functions',          'λ'),
    ('Day14_Exceptions_Blank.ipynb',      'Exceptions',                '⚠️'),
    ('Day15_FileHandling_Blank.ipynb',    'File Handling',             '📂'),
    ('Day16_OOP_Basics_Blank.ipynb',      'OOP Basics',                '🧩'),
    ('Day17_OOP_Advanced_Blank.ipynb',    'OOP Advanced',              '🏗️'),
    ('Day18_Regex_Blank.ipynb',           'Regex',                     '🔍'),
    ('Day19_Generators_Blank.ipynb',      'Generators and Iterators',  '⚡'),
    ('Day20_Capstone_Blank.ipynb',        'Capstone Project',          '🏆'),
    ('Day21_NumPy_Blank.ipynb',           'NumPy Fundamentals',        '📊'),
    ('Day22_NumPy_Advanced_Blank.ipynb',  'NumPy Advanced',            '📈'),
    ('Day23_Pandas_Intro_Blank.ipynb',    'Pandas Introduction',       '🐼'),
    ('Day24_Pandas_Selection_Blank.ipynb','Pandas Selection',          '🎯'),
    ('Day25_Pandas_Cleaning_Blank.ipynb', 'Pandas Cleaning',           '🧹'),
    ('Day26_Pandas_GroupBy_Blank.ipynb',  'Pandas GroupBy',             '🗃️'),
    ('Day27_Pandas_Merging_Blank.ipynb',  'Pandas Merging',            '🔗'),
    ('Day28_Pandas_Series_Blank.ipynb',   'Pandas Time Series',        '📉'),
    ('Day29_Data_Seaborn_Blank.ipynb',    'Data Visualization',        '🎨'),
    ('Day30_Phase_Analysis_Blank.ipynb',  'Phase Analysis & Review',   '🔬'),
]

# ═══════════════════════════════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════════════════════════════
def esc(s):
    return ht.escape(s)

def strip_html(text):
    text = re.sub(r'<img[^>]*>', '', text)
    m = re.search(r'<b>(.+?)</b>', text, re.DOTALL)
    if m:
        return re.sub(r'<[^>]+>', '', m.group(1)).strip()
    return re.sub(r'<[^>]+>', '', text).strip()

def md(text):
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'__([^_]+)__', r'<strong>\1</strong>', text)
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
    return text

# ═══════════════════════════════════════════════════════════════════════════
# CELL CLASSIFIERS
# ═══════════════════════════════════════════════════════════════════════════
def is_section_header(s): return 'background-color: #02fff2ff' in s or 'background-color:#02fff2ff' in s
def is_concept_check(s):  return 'Concept Checks' in s
def is_question(s):       return s.strip().startswith('### **Q')
def is_task(s):           return s.strip().startswith('### **Task')
def is_interview_q(s):    return bool(re.match(r'^##\s*Q\d+', s.strip()))
def is_practice_hdr(s):   return 'Practice Tasks' in s
def is_interview_hdr(s):  return 'Interview Questions' in s
def is_summary(s):         return 'Executive Summary' in s

# ═══════════════════════════════════════════════════════════════════════════
# NOTEBOOK → HTML BODY
# ═══════════════════════════════════════════════════════════════════════════
def parse_notebook(nb_path, day_num):
    nb = json.load(open(nb_path, 'r', encoding='utf-8'))
    secs, out, cid, opened = [], [], 0, False

    def w(s): out.append(s)
    def close():
        nonlocal opened
        if opened: w('</div>'); opened = False
    def open_sec(anchor, label):
        nonlocal opened
        close()
        secs.append((anchor, label)); opened = True
        w(f'<div class="nb-section" id="{anchor}">')

    for i, c in enumerate(nb['cells']):
        ct, src = c['cell_type'], ''.join(c['source'])

        # skip copyright cell
        if i == 0 and ('©' in src or 'copyright' in src.lower() or 'manodemy' in src.lower()):
            continue

        # ── CODE CELLS ──
        if ct == 'code':
            cid += 1
            code = src.strip() or '# Write your answer here'
            w(f'<div class="code-cell" id="cell-{cid}">')
            w(f'<div class="cell-bar"><span class="cell-label">In [ ]:</span><div class="cell-actions"><button class="run-btn" onclick="runCell(\'cell-{cid}\')">▶ Run</button><button class="clear-btn" onclick="clearOutput(\'cell-{cid}\')">✕ Clear</button></div></div>')
            w(f'<textarea class="cm-source" id="src-{cid}">{esc(code)}</textarea>')
            w('<div class="cell-output hidden"></div></div>')
            continue

        # ── GENERIC MARKDOWN ──
        if ct == 'markdown':
            clean = src.strip()
            if not clean or clean == '---': continue

            # Skip massive base64 logos
            if re.match(r'^<(table|img)\b', clean) and 'base64,' in clean and len(clean) > 50000:
                continue

            # Extract TOC anchors
            if is_section_header(src):
                title = re.sub(r'\s+', ' ', strip_html(src)).strip() or f'Section {len(secs)+1}'
                open_sec(f'sec-{i}', title)
            elif is_concept_check(src):
                tn = (re.search(r'<code>(.*?)</code>', src) or re.search(r'`(.*?)`', src))
                tn = tn.group(1) if tn else 'Check'
                open_sec(f'checks-{tn}-{i}', f'🧪 Checks: {tn}')
            elif is_practice_hdr(src):
                open_sec('practice', '🛠️ Practice Tasks')
            elif is_interview_hdr(src):
                open_sec('interview', '💻 Interview Questions')
            elif is_summary(src):
                open_sec('summary', '📊 Executive Summary')
            elif not is_question(src) and not is_task(src) and not is_interview_q(src):
                hm = re.search(r'^(#{1,3})\s+(.+)', clean, re.MULTILINE)
                if hm:
                    txt = md(hm.group(2).strip())
                    disp = re.sub(r'<[^>]+>', '', txt).strip()
                    if len(hm.group(1)) <= 2 and len(disp) > 1:
                        open_sec(f'sec-{i}', disp[:60])

            # RENDER — split mixed cells (HTML + markdown) into proper segments
            _render_mixed_cell(clean, w, day_num)

    close()
    return '\n'.join(out), secs, cid


def _render_mixed_cell(text, w, day_num):
    """Split a cell into HTML segments and markdown segments, render each."""
    # Remove base64 images
    text = re.sub(r'<img\s+[^>]*src="data:[^"]*"[^>]*/?\s*>', '', text)

    # Split text into segments: HTML blocks vs markdown blocks
    # An HTML block starts with < and continues until the tag is closed
    segments = []
    buf = []
    in_code_fence = False

    for line in text.split('\n'):
        stripped = line.strip()

        # Track code fences
        if stripped.startswith('```'):
            in_code_fence = not in_code_fence
            buf.append(line)
            continue

        if in_code_fence:
            buf.append(line)
            continue

        # Detect HTML block starts
        if stripped.startswith('<') and re.match(r'^<(h[1-6]|div|table|blockquote|p|ul|ol|section)\b', stripped, re.IGNORECASE):
            # Flush any pending markdown
            if buf:
                md_text = '\n'.join(buf).strip()
                if md_text:
                    segments.append(('md', md_text))
                buf = []
            # Accumulate the HTML block
            html_buf = [line]
            # Simple heuristic: if the line also closes the tag, it's self-contained
            # Otherwise accumulate until we hit a blank line or the next segment
            segments.append(('html', line))
            continue

        # If the line starts with < but is a continuation of HTML (e.g. closing </div>)
        if stripped.startswith('</') or (stripped.startswith('<') and not stripped.startswith('<-')):
            if segments and segments[-1][0] == 'html':
                segments[-1] = ('html', segments[-1][1] + '\n' + line)
                continue

        buf.append(line)

    # Flush remaining
    if buf:
        md_text = '\n'.join(buf).strip()
        if md_text:
            segments.append(('md', md_text))

    # Merge consecutive HTML segments and consecutive md segments
    merged = []
    for kind, content in segments:
        if merged and merged[-1][0] == kind:
            merged[-1] = (kind, merged[-1][1] + '\n' + content)
        else:
            merged.append((kind, content))

    # Render each segment
    for kind, content in merged:
        content = content.strip()
        if not content:
            continue
        if kind == 'html':
            w(f'<div class="nb-rich">{content}</div>')
        else:
            _render_md_block(content, w, day_num)


def _render_md_block(text, w, day_num):
    """Render a block of plain markdown text with full markdown support."""
    lines = text.split('\n')
    in_table = False
    table_rows = []
    in_code_fence = False
    code_lines = []
    code_lang = ''
    in_interview_q = False

    for line in lines:
        stripped = line.strip()

        # ── CODE FENCES ──
        if stripped.startswith('```'):
            if in_code_fence:
                # Close code fence
                code = esc('\n'.join(code_lines))
                w(f'<pre class="nb-code-block"><code>{code}</code></pre>')
                code_lines = []; in_code_fence = False
            else:
                # Open code fence
                in_code_fence = True
                code_lang = stripped[3:].strip()
                code_lines = []
            continue

        if in_code_fence:
            code_lines.append(line)
            continue

        # ── BLANK / SEPARATOR ──
        if not stripped or stripped == '---':
            if in_table and table_rows:
                _flush_table(table_rows, w)
                table_rows = []; in_table = False
            continue

        # ── TABLE ROWS ──
        if '|' in stripped and stripped.startswith('|') and stripped.endswith('|'):
            in_table = True
            if re.match(r'^\|[\s\-:|]+\|$', stripped): continue
            table_rows.append(stripped)
            continue

        if in_table and table_rows:
            _flush_table(table_rows, w)
            table_rows = []; in_table = False

        # ── QUESTIONS / TASKS ──
        if is_question(stripped):
            w(f'<div class="question"><p>{md(stripped.replace("### ",""))}</p></div>')
            continue
        if is_task(stripped):
            w(f'<div class="question task"><p>{md(stripped.replace("### ",""))}</p></div>')
            continue
        if is_interview_q(stripped):
            qn = re.sub(r'^##\s*', '', stripped)
            w(f'<div class="question interview"><p><strong>{esc(qn)}</strong></p>')
            in_interview_q = True
            continue

        # ── PREMIUM SECTION HEADERS ──
        if is_practice_hdr(stripped):
            w('<div class="section-header gold"><h2>🛠️ Professional Practice Tasks</h2></div>')
            continue
        if is_interview_hdr(stripped):
            w('<div class="section-header purple"><h2>💻 Pure Coding Interview Questions</h2></div>')
            continue
        if is_concept_check(stripped):
            tn = (re.search(r'<code>(\w+)</code>', stripped) or re.search(r'`(\w+)`', stripped))
            tn = tn.group(1) if tn else 'Check'
            w(f'<div class="concept-header"><h3>🧪 Concept Checks: <code>{tn}</code></h3></div>')
            continue
        if is_summary(stripped):
            w(f'<div class="section-header cyan"><h2>📊 Day {day_num} Executive Summary</h2></div>')
            continue

        # ── BLOCKQUOTES ──
        if stripped.startswith('> '):
            w(f'<div class="callout">{md(stripped[2:])}</div>')
            continue

        # ── BULLET LISTS ──
        if stripped.startswith('- ') or stripped.startswith('* '):
            w(f'<p>• {md(stripped[2:])}</p>')
            continue

        # ── NUMBERED LISTS ──
        nm = re.match(r'^(\d+)\.\s+(.+)', stripped)
        if nm:
            w(f'<p>{nm.group(1)}. {md(nm.group(2))}</p>')
            continue

        # ── HEADERS ──
        if stripped.startswith('### '):
            w(f'<h3>{md(stripped[4:])}</h3>')
        elif stripped.startswith('## '):
            w(f'<h2>{md(stripped[3:])}</h2>')
        elif stripped.startswith('# '):
            w(f'<h1>{md(stripped[2:])}</h1>')
        # ── CHECKLIST ──
        elif stripped.startswith('- ['):
            item = re.sub(r'^- \[.\]\s*', '', stripped)
            w(f'<label class="check-item"><input type="checkbox"><span>{md(item)}</span></label>')
        # ── PARAGRAPH ──
        else:
            w(f'<p>{md(stripped)}</p>')

    # Flush remaining
    if in_code_fence and code_lines:
        code = esc('\n'.join(code_lines))
        w(f'<pre class="nb-code-block"><code>{code}</code></pre>')
    if in_table and table_rows:
        _flush_table(table_rows, w)
    if in_interview_q:
        w('</div>')


def _flush_table(rows, w):
    """Convert collected table rows into an HTML table."""
    if not rows: return
    w('<table>')
    for idx, row in enumerate(rows):
        cols = [c.strip() for c in row.split('|')[1:-1]]
        if idx == 0:
            w('<thead><tr>' + ''.join(f'<th>{md(c)}</th>' for c in cols) + '</tr></thead><tbody>')
        else:
            w('<tr>' + ''.join(f'<td>{md(c)}</td>' for c in cols) + '</tr>')
    w('</tbody></table>')

# ═══════════════════════════════════════════════════════════════════════════
# HTML PAGE TEMPLATE
# ═══════════════════════════════════════════════════════════════════════════
def build_page(day_num, title, body, secs, cells):
    dd = f'{day_num:02d}'

    prev = '<a href="#" class="nav-icon-btn prev-btn disabled"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Prev</a>' if day_num == 1 \
        else f'<a href="day{day_num-1:02d}.html" class="nav-icon-btn prev-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Prev</a>'
    
    nxt = '<a href="index.html" class="nav-icon-btn next-btn finish-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Finish</a>' if day_num >= 30 \
        else f'<a href="day{day_num+1:02d}.html" class="nav-icon-btn next-btn">Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>'

    toc = '\n'.join(f'<li><a href="#{a}" class="toc-link">{t}</a></li>' for a, t in secs)

    dropdown_list = ''
    for i, (f, t, e) in enumerate(DAYS, 1):
        active = 'active' if i == day_num else ''
        dropdown_list += f'<a href="day{i:02d}.html" class="dropdown-item {active}"><span class="day-num">Day {i:02d}</span> <span class="day-em">{e}</span> {t}</a>\n'

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {dd}: {title} — Manodemy</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- Authentication + Enrollment Route Guard -->
<script>
  // PaywallGuard — executes before DOM render
  (async function PaywallGuard() {{
    const currentPath = window.location.pathname;
    const isProtectedDay = currentPath.match(/day(0[3-9]|[1-2][0-9]|30)\\.html/);

    const removePreload = () => {{
      const p = document.getElementById('paywall-preload-screen');
      if (p) p.remove();
      else document.addEventListener('DOMContentLoaded', () => {{
        const p2 = document.getElementById('paywall-preload-screen');
        if (p2) p2.remove();
      }});
    }};

    if (!isProtectedDay) {{
      removePreload();
      return;
    }}

    try {{
      if (typeof window.supabase === 'undefined') {{
        removePreload();
        return;
      }}
      const SUPA_URL = 'https://gvhnwmuyrwissgkumeif.supabase.co';
      const SUPA_KEY = 'sb_publishable_x0gyXkcrCSaxSG23Zyi7qA__v1sBgOq';
      const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
      
      const {{ data: {{ session }}, error }} = await sb.auth.getSession();
      
      if (error || !session) {{
        window.location.href = `index.html?redirect=${{encodeURIComponent(currentPath)}}`;
        return;
      }}
      
      const plan = session.user.user_metadata?.plan;
      const isEnrolled = localStorage.getItem('manodemy_enrolled') === 'true';
      if (plan !== 'pro' && !isEnrolled) {{
        window.location.href = `index.html#pricing?locked=true`;
        return;
      }}
      
      removePreload();
      
    }} catch (err) {{
      console.error('Auth verification failed', err);
      window.location.href = `index.html`;
    }}
  }})();
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<link rel="stylesheet" href="notebook.css">
</head>
<body>
<!-- Paywall Preload Screen -->
<div id="paywall-preload-screen" class="paywall-preload" aria-hidden="true">
  <div class="paywall-preload__spinner"></div>
</div>

<nav class="top-bar nav-container" id="topBar">
  <div class="nav-zone--left">
    <!-- Profile Avatar -->
    <div class="avatar-wrapper" id="profileAvatar" 
         role="button" 
         tabindex="0" 
         aria-label="Open profile card"
         aria-expanded="false"
         aria-haspopup="true">
      <div class="avatar-circle" id="avatarCircle"></div>
      <div class="avatar-status-dot" aria-hidden="true"></div>
    </div>
    
    <!-- App Navigation -->
    <div class="nav-controls">
      <a href="index.html" class="nav-icon-btn home-btn" title="Back to Dashboard" aria-label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </a>
      {prev}
      {nxt}
    </div>
  </div>

  <div class="nav-center has-dropdown">
    <button class="nav-dropdown-btn" id="dayDropdownBtn">
      <span class="day-badge">Day {dd}</span>
      <span class="day-title">{title}</span>
      <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>
    <div class="nav-dropdown-menu" id="dayDropdownMenu">
      <div class="dropdown-header">Jump to another day</div>
      <div class="dropdown-scroll">
        {dropdown_list}
      </div>
    </div>
  </div>

  <div class="nav-zone--right">
    <div class="nav-score-card">
      <div class="score-info">
        <span class="score-label">Solved</span>
        <span class="score-values"><span id="scoreSolved" class="score-highlight">0</span> / <span id="scoreTotal">0</span></span>
      </div>
      <div class="score-track"><div class="score-fill" id="scoreProgress" style="width:0%"></div></div>
    </div>
  </div>
</nav>

<div class="profile-card" id="profileCard" 
     role="dialog" 
     aria-label="User profile summary"
     aria-modal="false">
  <div class="profile-card__header">
    <div class="profile-card__info">
      <h2 class="profile-card__name" id="profileName">Loading...</h2>
      <p class="profile-card__email" id="profileEmail">loading@... </p>
    </div>
    <span class="profile-card__badge" id="profileBadge">Free</span>
  </div>
  
  <div class="profile-card__progress-section">
    <div class="profile-card__progress-labels">
      <span class="profile-card__progress-text">Overall Progress</span>
      <span class="profile-card__progress-pct" id="profileProgressPct">0%</span>
    </div>
  </div>
  
  <button class="profile-card__signout" id="signOutBtn">Sign Out</button>
</div>

<div class="pyodide-status" id="pyStatus">⏳ Loading Python Engine...</div>
<div class="layout">
  <main class="notebook" id="notebook">
    <div class="nb-title"><h1>📊 Day {dd} : {title}</h1></div>
{body}
  </main>
  <nav class="sidebar" id="sidebar">
    <div class="sidebar-top"><div class="sidebar-header"><span class="icon">📄</span> CONTENTS</div></div>
    <ul class="toc-list">{toc}</ul>
    <div class="sidebar-resize" id="sidebarResize"></div>
  </nav>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/comment/comment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldcode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/indent-fold.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/anyword-hint.min.js"></script>
<script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
<script src="notebook.js"></script>
</body>
</html>'''


# ═══════════════════════════════════════════════════════════════════════════
# LIVE SERVER — reads notebook fresh on every request
# ═══════════════════════════════════════════════════════════════════════════
class LiveHandler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def do_GET(self):
        # Intercept dayXX.html requests — generate on the fly from notebook
        m = re.match(r'/day(\d{2})\.html', self.path)
        if m:
            day_num = int(m.group(1))
            if 1 <= day_num <= len(DAYS):
                nb_file, title, emoji = DAYS[day_num - 1]
                nb_path = NB_DIR / nb_file
                if nb_path.exists():
                    try:
                        body, secs, cells = parse_notebook(nb_path, day_num)
                        html = build_page(day_num, title, body, secs, cells)
                        data = html.encode('utf-8')
                        self.send_response(200)
                        self.send_header('Content-Type', 'text/html; charset=utf-8')
                        self.send_header('Content-Length', len(data))
                        self.send_header('Cache-Control', 'no-cache, no-store')
                        self.end_headers()
                        self.wfile.write(data)
                        ts = time.strftime('%H:%M:%S')
                        print(f'  📄 [{ts}] day{day_num:02d}.html → {cells} cells, {len(secs)} sections (live from {nb_file})')
                        return
                    except Exception as e:
                        self.send_error(500, f'Error generating page: {e}')
                        return
        # Everything else (CSS, JS, index.html) served normally
        super().do_GET()

    def log_message(self, fmt, *args):
        p = args[0].split()[1] if args else ''
        if p.endswith('.html') and not p.startswith('/day'):
            print(f'  📄 [{time.strftime("%H:%M:%S")}] {p}')


# ═══════════════════════════════════════════════════════════════════════════
# STATIC BUILD — for GitHub Pages deployment
# ═══════════════════════════════════════════════════════════════════════════
def build_static(start=1, end=30):
    total_c, total_s = 0, 0
    for day_num in range(start, end + 1):
        if day_num < 1 or day_num > len(DAYS): continue
        nb_file, title, emoji = DAYS[day_num - 1]
        nb_path = NB_DIR / nb_file
        if not nb_path.exists():
            print(f'  ⚠️  {nb_file} not found — skipping.')
            continue
        body, secs, cells = parse_notebook(nb_path, day_num)
        html = build_page(day_num, title, body, secs, cells)
        out = ROOT / f'day{day_num:02d}.html'
        out.write_text(html, encoding='utf-8')
        total_c += cells; total_s += len(secs)
        print(f'  ✅ day{day_num:02d}.html — {cells} cells, {len(secs)} sections')

    # Update landing page links
    lp = ROOT / 'index.html'
    if lp.exists():
        h = lp.read_text(encoding='utf-8')
        skills = []
        for idx, (_, title, emoji) in enumerate(DAYS):
            dd = f'{idx+1:02d}'
            short = title[:16].rstrip() if len(title) > 16 else title
            if idx >= 2:
                skills.append(f'        <a href="day{dd}.html" class="skill day-card--locked"><span class="skill-icon">{emoji}</span><span>{dd} {short}</span><div class="lock-overlay"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div></a>')
            else:
                skills.append(f'        <a href="day{dd}.html" class="skill"><span class="skill-icon">{emoji}</span><span>{dd} {short}</span></a>')
        new_grid = '\n'.join(skills)
        h2 = re.sub(r'(<div class="skills-grid s30">)\s*(.*?)\s*(</div>\s*</div>\s*</div>\s*</section>)',
                     r'\1\n' + new_grid + r'\n      \3', h, flags=re.DOTALL)
        lp.write_text(h2, encoding='utf-8')
        print('  ✅ index.html — all 30 days linked.')

    print(f'\n🎉 Built {end-start+1} pages, {total_c} code cells, {total_s} sidebar sections.')


# ═══════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════
if __name__ == '__main__':
    args = sys.argv[1:]

    if args and args[0] == 'build':
        # Static build mode
        if len(args) == 1:
            build_static(1, 30)
        elif len(args) == 2:
            n = int(args[1])
            build_static(n, n)
        else:
            build_static(int(args[1]), int(args[2]))
    else:
        # Live server mode
        port = int(args[0]) if args else 8080
        print(f'\n🚀 Manodemy Live Server')
        print(f'   http://localhost:{port}/index.html')
        print(f'   Notebooks: {NB_DIR}')
        print(f'   Edit any notebook → refresh browser → see changes instantly!')
        print(f'   Press Ctrl+C to stop.\n')
        TCPServer.allow_reuse_address = True
        with TCPServer(('', port), LiveHandler) as httpd:
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print('\n👋 Server stopped.')
