"""
inject_theory_content.py
Reads the rich theory content from manodemy_sql_curriculum.md,
converts it to HTML, and updates sql_curriculum.py's `theory` fields.
Then re-runs generate_day_pages.py to regenerate all SQL day HTML files.
"""

import re
import os
import sys
import subprocess

# ─── Step 1: Read the markdown ───────────────────────────────────────────────
with open('manodemy_sql_curriculum.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# ─── Step 2: Split into day sections ─────────────────────────────────────────
day_pattern = re.compile(r'# DAY (\d+)[^\n]*\n', re.MULTILINE)
day_splits = list(day_pattern.finditer(md_content))

def get_day_section(day_num):
    for i, match in enumerate(day_splits):
        if int(match.group(1)) == day_num:
            start = match.end()
            end = day_splits[i + 1].start() if i + 1 < len(day_splits) else len(md_content)
            return md_content[start:end]
    return None

def extract_concept_section(day_md):
    concept_match = re.search(r'##\s+[^\n]*Concept[^\n]*\n', day_md)
    if not concept_match:
        return None
    start = concept_match.end()
    next_h2 = re.search(r'^## ', day_md[start:], re.MULTILINE)
    end = start + next_h2.start() if next_h2 else len(day_md)
    return day_md[start:end].strip()

def apply_inline_md(text):
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong style="color:#f1f5f9;">\1</strong>', text)
    text = re.sub(r'\*([^*]+?)\*', r'<em style="color:#e2e8f0;">\1</em>', text)
    text = re.sub(r'`([^`]+)`',
                  r'<code style="background:#1e2d40;color:#7dd3fc;padding:2px 6px;'
                  r'border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;">\1</code>',
                  text)
    return text

def md_to_html(md_text):
    lines = md_text.split('\n')
    html_parts = []
    in_code_block = False
    in_table = False
    in_list = False
    code_lang = ''
    code_lines = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Code block
        if line.strip().startswith('```'):
            if not in_code_block:
                in_code_block = True
                code_lang = line.strip()[3:].strip()
                code_lines = []
            else:
                in_code_block = False
                code_content = '\n'.join(code_lines)
                code_content = code_content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                lang_class = f'language-{code_lang}' if code_lang else ''
                html_parts.append(
                    f'<pre style="background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;'
                    f'overflow-x:auto;margin:16px 0;"><code class="{lang_class}" '
                    f'style="color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;'
                    f'white-space:pre;">{code_content}</code></pre>'
                )
            i += 1
            continue

        if in_code_block:
            code_lines.append(line)
            i += 1
            continue

        # Table rows
        if line.strip().startswith('|'):
            if not in_table:
                in_table = True
                html_parts.append(
                    '<div style="overflow-x:auto;margin:16px 0;">'
                    '<table style="border-collapse:collapse;width:100%;font-size:0.9em;'
                    'color:#e2e8f0;background:#0b1120;">'
                )
            if re.match(r'\|[-\s|:]+\|', line):
                i += 1
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            is_header = (i + 1 < len(lines) and re.match(r'\|[-\s|:]+\|', lines[i + 1]))
            tag = 'th' if is_header else 'td'
            style = ('background:#162032;color:#93c5fd;font-weight:bold;' if is_header
                     else 'background:#0b1120;color:#e2e8f0;')
            row_html = '<tr>' + ''.join(
                f'<{tag} style="border:1px solid #1e293b;padding:8px 12px;{style}">'
                f'{apply_inline_md(c)}</{tag}>' for c in cells
            ) + '</tr>'
            html_parts.append(row_html)
            i += 1
            continue
        elif in_table:
            html_parts.append('</table></div>')
            in_table = False

        # Blockquote
        if line.startswith('>'):
            text = line.lstrip('> ').strip()
            if text:
                html_parts.append(
                    f'<blockquote style="border-left:4px solid #f59e0b;background:#1c1a0e;'
                    f'padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;">'
                    f'{apply_inline_md(text)}</blockquote>'
                )
            i += 1
            continue

        # Horizontal rule
        if re.match(r'^-{3,}$', line.strip()):
            html_parts.append('<hr style="border:none;border-top:1px solid #1e293b;margin:24px 0;">')
            i += 1
            continue

        # Headings
        h4 = re.match(r'^#### (.+)', line)
        h3 = re.match(r'^### (.+)', line)
        h2 = re.match(r'^## (.+)', line)

        if h4:
            html_parts.append(
                f'<h4 style="color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;">'
                f'{apply_inline_md(h4.group(1))}</h4>'
            )
            i += 1; continue
        if h3:
            html_parts.append(
                f'<h3 style="color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;'
                f'border-bottom:1px solid #1e293b;padding-bottom:6px;">'
                f'{apply_inline_md(h3.group(1))}</h3>'
            )
            i += 1; continue
        if h2:
            html_parts.append(
                f'<h3 style="color:#c4b5fd;margin:32px 0 12px;font-size:1.1em;font-weight:700;">'
                f'{apply_inline_md(h2.group(1))}</h3>'
            )
            i += 1; continue

        # Bullet list
        if re.match(r'^[-*] ', line):
            if not in_list:
                in_list = True
                html_parts.append('<ul style="margin:10px 0 10px 20px;color:#cbd5e1;line-height:1.7;">')
            html_parts.append(f'<li>{apply_inline_md(line[2:].strip())}</li>')
            i += 1; continue
        elif in_list:
            html_parts.append('</ul>')
            in_list = False

        # Empty line
        if not line.strip():
            i += 1; continue

        # Regular paragraph
        html_parts.append(
            f'<p style="color:#cbd5e1;line-height:1.75;margin:10px 0;">'
            f'{apply_inline_md(line)}</p>'
        )
        i += 1

    if in_table:
        html_parts.append('</table></div>')
    if in_list:
        html_parts.append('</ul>')

    return '\n'.join(html_parts)


# ─── Step 3: Extract theory HTML for each day ─────────────────────────────────
sys.stdout.write("Extracting theory content from manodemy_sql_curriculum.md...\n")
sys.stdout.flush()

day_theory_html = {}
for day_num in range(1, 19):
    day_md = get_day_section(day_num)
    if not day_md:
        sys.stdout.write(f"  WARNING: Could not find Day {day_num:02d} in markdown\n")
        continue
    concept_md = extract_concept_section(day_md)
    if not concept_md:
        sys.stdout.write(f"  WARNING: Could not extract concept for Day {day_num:02d}\n")
        continue
    theory_html = md_to_html(concept_md)
    day_theory_html[day_num] = theory_html
    sys.stdout.write(f"  Day {day_num:02d}: extracted {len(concept_md)} chars\n")

sys.stdout.write(f"\nExtracted theory for {len(day_theory_html)} days\n\n")
sys.stdout.flush()

# ─── Step 4: Read the current sql_curriculum.py ───────────────────────────────
with open('sql_curriculum.py', 'r', encoding='utf-8') as f:
    curriculum_src = f.read()

original_src = curriculum_src

# ─── Step 5: Patch each day's theory field ────────────────────────────────────
sys.stdout.write("Patching sql_curriculum.py...\n")

for day_num, theory_html in day_theory_html.items():
    # Find the day's section marker
    day_marker = f'"day": {day_num},'
    pos = curriculum_src.find(day_marker)
    if pos == -1:
        sys.stdout.write(f"  WARNING: day {day_num} marker not found\n")
        continue

    # Find the "theory": field after this position
    theory_key_pos = curriculum_src.find('"theory":', pos)
    if theory_key_pos == -1:
        sys.stdout.write(f"  WARNING: theory field not found for day {day_num}\n")
        continue

    # Find the start of the value (skip whitespace after colon)
    colon_pos = curriculum_src.find(':', theory_key_pos + len('"theory"'))
    val_start_pos = colon_pos + 1
    while val_start_pos < len(curriculum_src) and curriculum_src[val_start_pos] in ' \t':
        val_start_pos += 1

    quote = curriculum_src[val_start_pos]  # ' or "
    if quote not in ("'", '"'):
        sys.stdout.write(f"  WARNING: unexpected char at value start for day {day_num}: {quote!r}\n")
        continue

    # Walk forward to find the end of the string literal
    end_pos = val_start_pos + 1
    while end_pos < len(curriculum_src):
        c = curriculum_src[end_pos]
        if c == '\\':
            end_pos += 2
            continue
        if c == quote:
            end_pos += 1
            break
        end_pos += 1

    # Build the replacement using repr() for safe Python string encoding
    theory_repr = repr(theory_html)
    replacement_field = f'"theory": {theory_repr}'

    curriculum_src = (curriculum_src[:theory_key_pos] +
                      replacement_field +
                      curriculum_src[end_pos:])

    sys.stdout.write(f"  Day {day_num:02d}: patched ({len(theory_html)} chars HTML)\n")

# ─── Step 6: Syntax-check before writing ──────────────────────────────────────
sys.stdout.write("\nVerifying Python syntax...\n")
import ast
try:
    ast.parse(curriculum_src)
    sys.stdout.write("  Syntax OK\n")
except SyntaxError as e:
    sys.stdout.write(f"  SYNTAX ERROR: {e}\n")
    sys.stdout.write("  Original file NOT modified.\n")
    sys.exit(1)

with open('sql_curriculum.py', 'w', encoding='utf-8') as f:
    f.write(curriculum_src)

sys.stdout.write("\nsql_curriculum.py saved!\n\n")
sys.stdout.flush()

# ─── Step 7: Re-generate all day pages ────────────────────────────────────────
sys.stdout.write("Re-generating all SQL day pages...\n\n")
result = subprocess.run(
    [sys.executable, 'generate_day_pages.py'],
    capture_output=True, text=True,
    env={**os.environ, 'PYTHONIOENCODING': 'utf-8'}
)
sys.stdout.write(result.stdout or '')
if result.returncode != 0:
    sys.stdout.write("Generator error:\n")
    sys.stdout.write(result.stderr or '')
else:
    sys.stdout.write("All pages regenerated!\n")
    sys.stdout.write("\nNext: git add, commit, push to deploy.\n")

sys.stdout.flush()
