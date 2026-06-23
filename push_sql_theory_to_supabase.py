"""
push_sql_theory_to_supabase.py
Reads html_body from the generated public/sql/dayNN.html files
and PATCHes the notebook_content table in Supabase via REST API.
"""

import re
import json
import urllib.request
import urllib.parse
from pathlib import Path

# ─── Supabase Config ──────────────────────────────────────────────────────────
SUPA_URL  = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co'
SUPA_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTM4OTUxMiwiZXhwIjoyMDk0OTY1NTEyfQ.pp5wMb4qwuIBq57YyAsPTtxtcnHY1Xmx_1uMMEkPaL0'

SQL_DIR = Path('public/sql')

def extract_html_body(html_path):
    """Extract the notebook body content from a generated day HTML file."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <main class="notebook"...> start
    main_start = content.find('<main class="notebook"')
    if main_start == -1:
        return None
    content_start = content.find('>', main_start) + 1

    # Find </main>
    main_end = content.find('</main>', content_start)
    if main_end == -1:
        return None

    body = content[content_start:main_end].strip()

    # Remove the nb-title div (it's rendered by the Next.js template separately)
    nb_title_match = re.search(r'<div class="nb-title">.*?</div>', body, re.DOTALL)
    if nb_title_match:
        body = body[nb_title_match.end():].strip()

    return body


def patch_supabase(day_id, html_body):
    """PATCH the notebook_content row via Supabase REST API."""
    url = f"{SUPA_URL}/rest/v1/notebook_content?day_id=eq.{day_id}"

    payload = json.dumps({"html_body": html_body}).encode('utf-8')

    req = urllib.request.Request(
        url,
        data=payload,
        method='PATCH',
        headers={
            'apikey': SUPA_KEY,
            'Authorization': f'Bearer {SUPA_KEY}',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
        }
    )

    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            return status, None
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        return e.code, body
    except Exception as ex:
        return None, str(ex)


# ─── Main ─────────────────────────────────────────────────────────────────────
print("Pushing SQL theory content to Supabase...\n")

success = 0
failed = 0

for day_num in range(1, 19):
    html_file = SQL_DIR / f'day{day_num:02d}.html'
    day_id    = f'sql-day{day_num:02d}'

    if not html_file.exists():
        print(f"  SKIP  Day {day_num:02d}: file not found")
        failed += 1
        continue

    body = extract_html_body(html_file)
    if not body:
        print(f"  ERROR Day {day_num:02d}: could not extract html_body")
        failed += 1
        continue

    status, err = patch_supabase(day_id, body)

    if status in (200, 204):
        print(f"  OK    Day {day_num:02d} ({day_id}): {len(body):,} chars → HTTP {status}")
        success += 1
    else:
        print(f"  FAIL  Day {day_num:02d} ({day_id}): HTTP {status} — {err}")
        failed += 1

print(f"\n{'='*50}")
print(f"Done: {success} succeeded, {failed} failed")
if failed == 0:
    print("All 18 SQL day pages updated in Supabase!")
    print("\nThe live site will now show the rich theory content.")
    print("Reload https://www.manodemy.com/sql/day01.html to verify.")
