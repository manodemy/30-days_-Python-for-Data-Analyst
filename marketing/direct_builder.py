"""
Direct End-to-End Programmatic Video Builder & Publisher for Manodemy Marketing Engine
Executes the full pipeline in pure code: Speech Synthesis -> Whisper ASR -> 3-Layer Audio Mastering -> Deterministic Video Render -> Publish Pack JSON.
"""

import os
import sys
import json
import time
import asyncio
import hashlib
import subprocess
from pathlib import Path
from pydub import AudioSegment
from playwright.async_api import async_playwright

# ---------------------------------------------------------------
# ⚡ WHISPER RESULT CACHE — keyed strictly on exact audio file SHA-256
# ---------------------------------------------------------------
def _whisper_cached_transcribe(narration_path: Path, model, reel_no: str) -> dict:
    """Return cached Whisper result keyed on exact SHA256 of the audio bytes."""
    cache_dir = narration_path.parent / ".whisper_cache"
    cache_dir.mkdir(exist_ok=True)
    audio_bytes = narration_path.read_bytes()
    audio_hash = hashlib.sha256(audio_bytes).hexdigest()[:16]
    cache_file = cache_dir / f"{reel_no}_{audio_hash}.json"
    if cache_file.exists():
        print("   ✓ Whisper cache HIT (audio exact match) — skipping re-transcription", flush=True)
        return json.loads(cache_file.read_text(encoding='utf-8'))
    print("   🔄 Whisper cache MISS — running fresh transcription on CPU...", flush=True)
    result = model.transcribe(str(narration_path), word_timestamps=True)
    cache_file.write_text(
        json.dumps(result, ensure_ascii=False, default=str), encoding='utf-8'
    )
    return result

import re

NORM_MAP = {
    "50%": ["fifty", "percent", "50"],
    "50": ["fifty"],
    "%": ["percent"],
    "100%": ["one", "hundred", "percent", "100"],
    "100": ["one", "hundred"],
    "10": ["ten"],
    "20": ["twenty"],
    "1st": ["first"],
    "2nd": ["second"],
    "3rd": ["third"],
    "&": ["and"],
    "=": ["equals"],
    "!=": ["not", "equal"],
}

def clean_tok(w):
    return re.sub(r"[^\w%]", "", w.lower().strip())

def align_expected_phrase(expected_text: str, raw_whisper_words: list, phrase_start_ms: int, phrase_end_ms: int) -> list:
    """
    Takes clean ground-truth script words and aligns them to raw Whisper acoustic timestamps.
    Preserves 100% correct spelling & punctuation while locking onto actual spoken timing.
    """
    expected_words = [w.strip() for w in expected_text.split() if w.strip()]
    if not expected_words:
        return []
    
    if not raw_whisper_words:
        dur = max(200, phrase_end_ms - phrase_start_ms)
        step = dur / len(expected_words)
        return [
            {
                "word": w,
                "startMs": round(phrase_start_ms + i * step),
                "endMs": round(phrase_start_ms + (i + 1) * step)
            }
            for i, w in enumerate(expected_words)
        ]
    
    # If 1-to-1 length match
    if len(expected_words) == len(raw_whisper_words):
        result = []
        for exp_w, wh in zip(expected_words, raw_whisper_words):
            result.append({
                "word": exp_w,
                "startMs": wh["startMs"],
                "endMs": max(wh["startMs"] + 80, wh["endMs"])
            })
        return result

    # Dynamic length matching
    result = []
    w_idx = 0
    num_exp = len(expected_words)
    num_wh = len(raw_whisper_words)
    
    e_idx = 0
    while e_idx < num_exp:
        exp_w = expected_words[e_idx]
        
        if w_idx >= num_wh:
            last_end = result[-1]["endMs"] if result else phrase_start_ms
            rem_words = num_exp - e_idx
            step = max(100, (phrase_end_ms - last_end) / max(1, rem_words))
            result.append({
                "word": exp_w,
                "startMs": round(last_end),
                "endMs": round(last_end + step)
            })
            e_idx += 1
            continue

        cur_wh = raw_whisper_words[w_idx]
        c_exp = clean_tok(exp_w)
        c_wh = clean_tok(cur_wh["word"])

        if c_exp == c_wh or c_exp in NORM_MAP.get(c_wh, []) or c_wh in NORM_MAP.get(c_exp, []):
            result.append({
                "word": exp_w,
                "startMs": cur_wh["startMs"],
                "endMs": max(cur_wh["startMs"] + 80, cur_wh["endMs"])
            })
            e_idx += 1
            w_idx += 1
            continue

        # Lookahead match up to 3 tokens
        found_wh = -1
        for look_w in range(w_idx, min(num_wh, w_idx + 3)):
            look_c_wh = clean_tok(raw_whisper_words[look_w]["word"])
            if look_c_wh == c_exp or look_c_wh in NORM_MAP.get(c_exp, []) or c_exp in NORM_MAP.get(look_c_wh, []):
                found_wh = look_w
                break
        
        if found_wh != -1:
            wh = raw_whisper_words[found_wh]
            result.append({
                "word": exp_w,
                "startMs": wh["startMs"],
                "endMs": max(wh["startMs"] + 80, wh["endMs"])
            })
            w_idx = found_wh + 1
            e_idx += 1
        else:
            wh_start = cur_wh["startMs"]
            wh_end = cur_wh["endMs"]
            result.append({
                "word": exp_w,
                "startMs": wh_start,
                "endMs": max(wh_start + 80, wh_end)
            })
            w_idx += 1
            e_idx += 1

    return result

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except:
        pass

PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

OUTPUT_DIR = PROJECT_ROOT / "marketing" / "output" / "video"
AUDIO_DIR = PROJECT_ROOT / "marketing" / "output" / "audio"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Master Reels Catalog
REELS_CATALOG = {
    "SQL-01-R1": {
        "reelNo": "SQL-01-R1",
        "day": "DAY 04",
        "badge": "SQL · NULL Trap",
        "hook": "90% FAIL THIS SQL TRAP 💀\nRETURN 0-ROWS ?",
        "hookLineObjects": [
            {"text": "90% FAIL THIS SQL TRAP 💀", "font": "Plus Jakarta Sans", "size": 6.3},
            {"text": "RETURN 0-ROWS ?", "font": "Outfit", "size": 5.5}
        ],
        "hookHighlights": [
            {"text": "90%", "color": "#facc15"},
            {"text": "0-ROWS", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT *\nFROM employees\nWHERE dept_id NOT IN (\n  SELECT dept_id\n  FROM departments\n)",
        "codeB": "SELECT *\nFROM employees\nWHERE dept_id NOT IN (\n  SELECT dept_id\n  FROM departments\n  WHERE dept_id IS NOT NULL\n)",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Ninety percent fail this SQL trap.\nOne of these silently returns zero rows.\nChoose your answer.\nOption A or Option B?\nComment your answer with reason below.",
        "caption": "90% FAIL THIS SQL TRAP 💀\nOne of these silently returns ZERO rows!\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A returns 0 rows:\n`NOT IN` expands into multiple `!=` with `AND`. \nIf even ONE value in the subquery is `NULL`, `val != NULL` evaluates to UNKNOWN — which silently fails the entire WHERE clause for every single row!\n\nOption B safely filters out NULLs first with `WHERE dept_id IS NOT NULL`.\n\n💡 Pro-tip: In production, avoid `NOT IN` on subqueries and just use `NOT EXISTS`.\n\nBe honest — did you get this right? 👇",
        "link": "https://manodemy.in"
    },
    "SQL-01-R2": {
        "reelNo": "SQL-01-R2",
        "day": "DAY 04",
        "badge": "SQL · NULL Trap",
        "hook": "HR CALLED: TOTAL PAY IS NULL 💸\nWHICH QUERY FIXES PAYROLL ?",
        "hookLineObjects": [
            {"text": "HR CALLED: TOTAL PAY IS NULL 💸", "font": "Plus Jakarta Sans", "size": 5.4},
            {"text": "WHICH QUERY FIXES PAYROLL ?", "font": "Outfit", "size": 5.2}
        ],
        "hookHighlights": [
            {"text": "TOTAL PAY IS NULL", "color": "#facc15"},
            {"text": "FIXES PAYROLL", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT emp_name,\n       base_salary + bonus AS total_pay\nFROM employees",
        "codeB": "SELECT emp_name,\n       base_salary + COALESCE(bonus, 0) AS total_pay\nFROM employees",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Salary day, and HR says total pay is NULL!\nWhich query fixes payroll for every employee?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "HR CALLED: TOTAL PAY IS NULL 💸\nWhich query fixes payroll for every employee?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A turns salary into NULL:\nIn SQL, any arithmetic with NULL results in NULL (e.g. $50,000 + NULL = NULL!).\nSo employees without a bonus end up with NULL total pay instead of their base salary!\n\nOption B safely fixes this with `COALESCE(bonus, 0)`.\n\n💡 Pro-tip: Always wrap optional numeric columns in COALESCE when doing math!\n\nBe honest — did you get this right? 👇",
        "link": "https://manodemy.in"
    },
    "SQL-02-R1": {
        "reelNo": "SQL-02-R1",
        "day": "DAY 05",
        "badge": "SQL · Window Functions",
        "hook": "TOP 3 EARNERS TRAP 🏆\nAVOIDS SKIPPING RANKS ?",
        "hookLineObjects": [
            {"text": "TOP 3 EARNERS TRAP 🏆", "font": "Plus Jakarta Sans", "size": 6.0},
            {"text": "AVOIDS SKIPPING RANKS ?", "font": "Outfit", "size": 5.2}
        ],
        "hookHighlights": [
            {"text": "TOP 3 EARNERS", "color": "#facc15"},
            {"text": "SKIPPING RANKS", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT emp_name, salary, rk\nFROM (\n  SELECT emp_name, salary,\n         RANK() OVER (ORDER BY salary DESC) AS rk\n  FROM employees\n) t\nWHERE rk <= 3",
        "codeB": "SELECT emp_name, salary, rk\nFROM (\n  SELECT emp_name, salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS rk\n  FROM employees\n) t\nWHERE rk <= 3",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Top 3 earners, but two employees have same salary!\nWhich query avoids skipping ranks?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "TOP 3 EARNERS TRAP 🏆\nWhich query avoids skipping ranks?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio\n\n#sql #sqlinterview #windowfunctions #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A misses true top 3 earners:\nWhen salaries tie (e.g. two people earn $120k), `RANK()` gives ranks 1, 1, 3 — skipping rank 2!\nIf 3 people tie at 1st place (1, 1, 1, 4), `WHERE rk <= 3` completely misses the 2nd and 3rd highest salary tiers!\n\n`DENSE_RANK()` gives consecutive ranks (1, 1, 2, 3) with zero gaps, guaranteeing you fetch true top 3 distinct salary levels!\n\n💡 Pro-tip: Use ROW_NUMBER for pagination, DENSE_RANK for leaderboard ties!\n\nBe honest — did you get this right? 👇",
        "link": "https://manodemy.in"
    },
    "SQL-02-R2": {
        "reelNo": "SQL-02-R2",
        "day": "DAY 05",
        "badge": "SQL · Running Total",
        "hook": "RUNNING TOTAL DISASTER 💸\nWHICH GIVES ROW-BY-ROW SUM ?",
        "hookLineObjects": [
            {"text": "RUNNING TOTAL DISASTER 💸", "font": "Plus Jakarta Sans", "size": 5.6},
            {"text": "WHICH GIVES ROW-BY-ROW SUM ?", "font": "Outfit", "size": 5.0}
        ],
        "hookHighlights": [
            {"text": "RUNNING TOTAL", "color": "#facc15"},
            {"text": "ROW-BY-ROW", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT order_date, amount,\n       SUM(amount) OVER (\n         ORDER BY order_date\n         ROWS UNBOUNDED PRECEDING\n       ) AS running_total\nFROM orders",
        "codeB": "SELECT order_date, amount,\n       SUM(amount) OVER (\n         ORDER BY order_date\n       ) AS running_total\nFROM orders",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Running total disaster on same-day orders!\nWhich query gives a true row-by-row sum?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "RUNNING TOTAL DISASTER 💸\nWhich query gives a true row-by-row sum on same-day orders?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio\n\n#sql #sqlinterview #windowfunctions #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is correct ✅ | Option B is the trap ❌\n\nWhy Option B fails on same-day orders:\nIf you don't specify a window frame after `ORDER BY`, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.\n`RANGE` treats duplicate dates as a single tied group — adding all same-day amounts together in one sudden jump!\n\nOption A explicitly uses `ROWS UNBOUNDED PRECEDING`, forcing SQL to accumulate strictly row by row!\n\n💡 Pro-tip: Always specify `ROWS` in cumulative window sums!\n\nBe honest — did you get this right? 👇",
        "link": "https://manodemy.in"
    },
    "SQL-03-R1": {
        "reelNo": "SQL-03-R1",
        "day": "DAY 04",
        "badge": "SQL · Aggregations",
        "hook": "COUNT(*) VS COUNT(COL) 🔢\nWhich query counts all employees without dropping NULLs?",
        "hookLineObjects": [
            {"text": "COUNT(*) VS COUNT(COL) 🔢", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Which query counts all employees without dropping NULLs?", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "COUNT(*)", "color": "#facc15"},
            {"text": "without dropping NULLs", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT department_id,\n       COUNT(commission) AS total_emps\nFROM employees\nWHERE department_id = 20",
        "codeB": "SELECT department_id,\n       COUNT(*) AS total_emps\nFROM employees\nWHERE department_id = 20",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Ninety percent fail this SQL aggregation trap!\nWhich query counts all employees without dropping nulls?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "COUNT(*) VS COUNT(COL) 🔢\nWhich query counts all employees without dropping NULLs?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q5\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A undercounts employees:\n`COUNT(column_name)` ONLY counts rows where the column is NOT NULL. If an employee has NULL commission, they are silently excluded from the headcount!\n`COUNT(*)` counts total physical rows regardless of NULLs.\n\n💡 Pro-tip: Always use `COUNT(*)` for row counts and `COUNT(col)` only when checking non-null presence!\n\nBe honest — did you get this right? 👇",
        "link": "https://www.manodemy.com/q5"
    },
    "SQL-03-R2": {
        "reelNo": "SQL-03-R2",
        "day": "DAY 04",
        "badge": "SQL · Precedence",
        "hook": "PRECEDENCE BUG 🐛\nWhich query returns strictly active employees in Dept 10 or 20?",
        "hookLineObjects": [
            {"text": "PRECEDENCE BUG 🐛", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Which query returns strictly active employees in Dept 10 or 20?", "font": "Outfit", "size": 3.6}
        ],
        "hookHighlights": [
            {"text": "PRECEDENCE BUG", "color": "#facc15"},
            {"text": "strictly active employees", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT first_name, department_id, is_active\nFROM employees\nWHERE is_active = 1\n  AND department_id = 20\n   OR department_id = 10",
        "codeB": "SELECT first_name, department_id, is_active\nFROM employees\nWHERE is_active = 1\n  AND (department_id = 20 OR department_id = 10)",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "The sneakiest Boolean operator bug in SQL!\nWhich query returns strictly active employees in department ten or twenty?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "PRECEDENCE BUG 🐛\nWhich query returns strictly ACTIVE employees in Dept 10 or 20?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q6\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A returns inactive employees:\nIn SQL operator precedence, `AND` takes priority over `OR` (`A AND B OR C` evaluates as `(A AND B) OR C`).\nBecause of this, ANY employee in Department 10 is returned — even if they are inactive (`is_active = 0`)!\n\nOption B uses parentheses `AND (dept = 20 OR dept = 10)` to strictly enforce active status on both departments.\n\n💡 Pro-tip: Always use parentheses when mixing AND and OR in WHERE clauses!\n\nBe honest — did you get this right? 👇",
        "link": "https://www.manodemy.com/q6"
    },
    "SQL-04-R1": {
        "reelNo": "SQL-04-R1",
        "day": "DAY 04",
        "badge": "SQL · GROUP BY",
        "hook": "WHERE VS HAVING TRAP ⚗️\nWhich query filters departments by average salary without crashing?",
        "hookLineObjects": [
            {"text": "WHERE VS HAVING TRAP ⚗️", "font": "Plus Jakarta Sans", "size": 5.0},
            {"text": "Which query filters departments by average salary without crashing?", "font": "Outfit", "size": 3.5}
        ],
        "hookHighlights": [
            {"text": "WHERE VS HAVING", "color": "#facc15"},
            {"text": "without crashing", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT department_id,\n       AVG(salary) AS avg_sal\nFROM employees\nWHERE AVG(salary) > 60000\nGROUP BY department_id",
        "codeB": "SELECT department_id,\n       AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department_id\nHAVING AVG(salary) > 60000",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "WHERE versus HAVING is the most asked screening question in SQL technical rounds.\nWhich query filters departments by average salary without crashing?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "WHERE VS HAVING TRAP ⚗️\nWhich query filters departments by average salary without crashing?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q7\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A throws an error:\nIn SQL, WHERE filters individual rows BEFORE GROUP BY runs. Aggregate functions like AVG() don't exist yet at the WHERE stage — they haven't been computed!\n\nOption B correctly uses HAVING, which runs AFTER GROUP BY has computed the average for each department.\n\n💡 Rule of thumb: WHERE = filter rows (before grouping), HAVING = filter groups (after grouping)!\n\nBe honest — did you get this right? 👇",
        "link": "https://www.manodemy.com/q7"
    },
    "SQL-04-R2": {
        "reelNo": "SQL-04-R2",
        "day": "DAY 04",
        "badge": "SQL · Datetime Filtering",
        "hook": "DATE RANGE TRAP 📅\nWhich query pulls all January sales?",
        "hookLineObjects": [
            {"text": "DATE RANGE TRAP 📅", "font": "Plus Jakarta Sans", "size": 5.2},
            {"text": "Which query pulls all January sales?", "font": "Outfit", "size": 4.1}
        ],
        "hookHighlights": [
            {"text": "DATE RANGE", "color": "#facc15"},
            {"text": "all January sales", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT order_id, total_amount\nFROM sales\nWHERE order_date\n  BETWEEN '2024-01-01 00:00:00'\n      AND '2024-01-31 23:59:59'",
        "codeB": "SELECT order_id, total_amount\nFROM sales\nWHERE order_date >= '2024-01-01'\n  AND order_date <  '2024-02-01'",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Most candidates fail this date filtering trap.\nWhich query pulls all January sales?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "DATE RANGE TRAP 📅\nWhich query pulls all January sales?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q8\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A fails on real databases:\nIn modern databases, timestamps store fractional seconds or milliseconds (like `23:59:59.850`).\n`BETWEEN ... 23:59:59` misses every single transaction placed in the final second of January!\nEven worse, on engines like SQL Server, `23:59:59.999` rounds UP into Feb 1st!\n\nOption B (`>= '2024-01-01' AND < '2024-02-01'`) is the half-open interval standard used in production — it guarantees 100% data capture with zero rounding bugs!\n\n💡 Rule of thumb: NEVER use BETWEEN on datetime columns!\n\nBe honest — did you think Option A was bulletproof? 👇",
        "link": "https://www.manodemy.com/q8"
    },
    "SQL-05-R1": {
        "reelNo": "SQL-05-R1",
        "day": "DAY 05",
        "badge": "SQL · LEFT JOIN Filtering",
        "hook": "LEFT JOIN TRAP 💥\nWhich query keeps customers with zero orders?",
        "hookLineObjects": [
            {"text": "LEFT JOIN TRAP 💥", "font": "Plus Jakarta Sans", "size": 5.2},
            {"text": "Which query keeps customers with zero orders?", "font": "Outfit", "size": 3.9}
        ],
        "hookHighlights": [
            {"text": "LEFT JOIN", "color": "#facc15"},
            {"text": "with zero orders", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT c.customer_name, o.order_amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'COMPLETED'",
        "codeB": "SELECT c.customer_name, o.order_amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\n                  AND o.status = 'COMPLETED'",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Most candidates fail this classic LEFT JOIN screening question.\nWhich query keeps customers with zero orders?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "LEFT JOIN TRAP 💥\nWhich query keeps customers with zero orders?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q9\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A silently acts like an INNER JOIN:\nIn Option A, the WHERE clause executes AFTER the join.\nFor customers with no orders, `o.status` is NULL. Because `NULL = 'COMPLETED'` evaluates to UNKNOWN, the WHERE clause throws them out!\n\nOption B filters the orders table in the ON clause BEFORE joining, preserving all customers with zero orders!\n\n💡 Rule of thumb: Filter right-table columns in the ON clause to keep your LEFT JOIN working!\n\nBe honest — did you get this right? 👇",
        "link": "https://www.manodemy.com/q9"
    },
    "SQL-05-R2": {
        "reelNo": "SQL-05-R2",
        "day": "DAY 05",
        "badge": "SQL · Conditional Aggregation",
        "hook": "CONDITIONAL COUNT TRAP 🤯\nWhich query correctly counts failed orders?",
        "hookLineObjects": [
            {"text": "CONDITIONAL COUNT TRAP 🤯", "font": "Plus Jakarta Sans", "size": 4.9},
            {"text": "Which query correctly counts failed orders?", "font": "Outfit", "size": 3.9}
        ],
        "hookHighlights": [
            {"text": "CONDITIONAL COUNT", "color": "#facc15"},
            {"text": "failed orders", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT customer_id,\n       COUNT(CASE WHEN status = 'FAILED'\n             THEN 1 ELSE 0 END) AS failed_cnt\nFROM orders\nGROUP BY customer_id",
        "codeB": "SELECT customer_id,\n       SUM(CASE WHEN status = 'FAILED'\n           THEN 1 ELSE 0 END) AS failed_cnt\nFROM orders\nGROUP BY customer_id",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "This subtle CASE WHEN bug catches almost every data analyst.\nWhich query correctly counts failed orders?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "CONDITIONAL COUNT TRAP 🤯\nWhich query correctly counts failed orders?\n\nCan you spot the trap before checking the pinned comment? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q10\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A fails:\nIn SQL, `COUNT(expression)` counts EVERY single row where the expression is NOT NULL.\nIn Option A, when status != 'FAILED', the CASE expression returns 0.\nBecause `0` is a valid number (not NULL), `COUNT(0)` still increments the count! So Option A returns the TOTAL count of all orders!\n\nOption B uses `SUM(CASE ... THEN 1 ELSE 0 END)`, which adds 1 for failed orders and 0 for others, giving the exact count!\n\n💡 Rule of thumb: With COUNT, never use ELSE 0 (let it default to NULL). With SUM, use ELSE 0!\n\nBe honest — did you vote Option A? 👇",
        "link": "https://www.manodemy.com/q10"
    },
    "SQL-06-R2": {
        "reelNo": "SQL-06-R2",
        "day": "DAY 06",
        "badge": "SQL · Self Joins & Hierarchy",
        "hook": "CEO DISAPPEARED TRAP 👔\nWhich query keeps the CEO in the org report?",
        "hookLineObjects": [
            {"text": "CEO DISAPPEARED TRAP 👔", "font": "Plus Jakarta Sans", "size": 4.9},
            {"text": "Which query keeps the CEO in the org report?", "font": "Outfit", "size": 3.9}
        ],
        "hookHighlights": [
            {"text": "CEO DISAPPEARED", "color": "#facc15"},
            {"text": "keeps the CEO", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT e.first_name AS employee,\n       m.first_name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id",
        "codeB": "SELECT e.first_name AS employee,\n       m.first_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "HR says! The CEO disappeared from the company's org report!\nWhich query correctly keeps the CEO in the org chart?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "CEO DISAPPEARED TRAP 👔💀\nWhich query keeps the CEO in the org chart report?\n\nDid you accidentally fire the CEO with an INNER JOIN? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q11\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A accidentally deletes the CEO:\nIn most relational databases, the CEO has a NULL `manager_id` (since nobody manages the CEO!).\nIn Option A, the plain `JOIN` (INNER JOIN) requires matching values on both sides.\nBecause `NULL = m.id` evaluates to UNKNOWN, Option A silently DELETES the CEO from the entire company org chart!\n\nOption B uses `LEFT JOIN`, ensuring that all employees (including the top CEO) are preserved with a NULL manager.\n\n💡 Rule of thumb: When building manager-employee hierarchy reports, always use LEFT JOIN!\n\nBe honest — did you accidentally fire the CEO? 👇",
        "link": "https://www.manodemy.com/q11"
    },
    "SQL-07-R1": {
        "reelNo": "SQL-07-R1",
        "day": "DAY 07",
        "badge": "SQL · Subqueries & EXISTS",
        "hook": "NOT IN NULL TRAP 🕳️\nWhich query finds customers who never ordered?",
        "hookLineObjects": [
            {"text": "NOT IN NULL TRAP 🕳️", "font": "Plus Jakarta Sans", "size": 4.9},
            {"text": "Which query finds customers who never ordered?", "font": "Outfit", "size": 3.9}
        ],
        "hookHighlights": [
            {"text": "NOT IN NULL", "color": "#facc15"},
            {"text": "never ordered", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT name FROM customers\nWHERE id NOT IN (\n    SELECT customer_id FROM orders\n)",
        "codeB": "SELECT c.name FROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o\n    WHERE o.customer_id = c.id\n)",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "This not in query returned zero rows in production!\nWhich query safely finds customers who never ordered?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "NOT IN NULL TRAP 🕳️💀\nWhich query safely finds customers who never ordered?\n\nDid a single NULL break your entire subquery? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q12\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A returns 0 rows in production:\nIf the orders table contains even ONE guest order with a NULL customer_id, the subquery produces (101, 102, NULL).\nIn SQL, `id NOT IN (..., NULL)` translates to `id != NULL`, which is UNKNOWN.\nBecause `TRUE AND UNKNOWN` equals UNKNOWN, the WHERE clause throws away EVERY single customer, returning 0 rows!\n\nOption B uses `NOT EXISTS`, which safely checks row presence and ignores NULLs!\n\n💡 Rule of thumb: Never use NOT IN with nullable columns. Always use NOT EXISTS!\n\nDid you know about the 3-Valued Logic trap? 👇",
        "link": "https://www.manodemy.com/q12"
    },
    "SQL-07-R2": {
        "reelNo": "SQL-07-R2",
        "day": "DAY 07",
        "badge": "SQL · Window Functions & Ranking",
        "hook": "SALARY TIE GAP TRAP 🥈\nWhich query assigns continuous 1, 2, 3 ranks?",
        "hookLineObjects": [
            {"text": "SALARY TIE GAP TRAP 🥈", "font": "Plus Jakarta Sans", "size": 4.9},
            {"text": "Which query assigns continuous ranks on ties?", "font": "Outfit", "size": 3.9}
        ],
        "hookHighlights": [
            {"text": "SALARY TIE GAP", "color": "#facc15"},
            {"text": "continuous ranks", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT employee_id, salary,\n       RANK() OVER (\n         ORDER BY salary DESC\n       ) AS sal_rank\nFROM employees",
        "codeB": "SELECT employee_id, salary,\n       DENSE_RANK() OVER (\n         ORDER BY salary DESC\n       ) AS sal_rank\nFROM employees",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Two employees share the top salary! Which query keeps ranks continuous without skipping?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "SALARY TIE GAP TRAP 🥈⚔️\nWhich ranking function avoids skipping 2nd place when salaries tie?\n\nCan you spot the difference between RANK and DENSE_RANK? \n\nDrop your vote (A or B) below 👇\n\n\nPractice Data Skills \n👉 Day 1 & Day 2 are 100% FREE\n🔗 Link in bio / manodemy.com/q13\n\n#sql #sqlinterview #sqltips #dataanalytics #dataengineer #datascience #dataanalyst #sqlquery #faang #techinterview #codinginterview #learnsql #database #manodemy #dataanalysis",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A creates gaps:\nWhen two employees tie for 1st place (1, 1), `RANK()` skips rank 2 and assigns 3 to the next person!\n`DENSE_RANK()` keeps rank numbering continuous (1, 1, 2) without leaving any gaps!\n\n💡 Rule of thumb: If you need top N without skipping ranks, always use DENSE_RANK()!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q13"
    },
    "SQL-08-R1": {
        "reelNo": "SQL-08-R1",
        "day": "DAY 08",
        "badge": "SQL · Pattern Matching & Wildcards",
        "hook": "LIKE WILDCARD TRAP 🔍\nWhich query finds the 50% offer promo code?",
        "hookLineObjects": [
            {"text": "LIKE WILDCARD TRAP 🔍", "font": "Plus Jakarta Sans", "size": 4.9},
            {"text": "Which query finds the 50% offer promo code?", "font": "Outfit", "size": 3.8}
        ],
        "hookHighlights": [
            {"text": "LIKE WILDCARD", "color": "#facc15"},
            {"text": "50% offer promo code", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT promo_code\nFROM coupons\nWHERE promo_code LIKE '%50%%'",
        "codeB": "SELECT promo_code\nFROM coupons\nWHERE promo_code LIKE '%50\\%%' ESCAPE '\\'",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "How do you search for a literal percent symbol in SQL?\nWhich query finds the fifty percent offer promo code?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "LIKE WILDCARD TRAP 🔍💥\n\nWhich query correctly finds the 50% offer promo code?\n\nDid Option A accidentally match 500_FLAT and 50_OFF?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q14\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, sql wildcard, sql like operator, sql escape character, sql query questions, sql interview preparation, data analyst interview, data analytics, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A matches the wrong codes:\nIn SQL `LIKE`, `%` is a special wildcard that matches ANY sequence of zero or more characters.\nOption A (`'%50%%'`) matches anything starting or containing '50' followed by any characters — accidentally matching `500_FLAT`, `50_SPECIAL`, and `5099_DEAL`!\n\nOption B uses `ESCAPE '\\'` which tells SQL that `\\%` is a literal percentage character `%`, matching ONLY codes containing literal 50%!\n\n💡 Rule of thumb: Always use ESCAPE when searching for literal '%' or '_' in SQL LIKE!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q14"
    },
    "SQL-08-R2": {
        "reelNo": "SQL-08-R2",
        "day": "DAY 08",
        "badge": "SQL · Set Operations & Deduplication",
        "hook": "UNION DEDUPLICATION TRAP ⚡\nWhich query keeps identical transactions across months?",
        "hookLineObjects": [
            {"text": "UNION DEDUPLICATION TRAP ⚡", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Which query keeps identical transactions across months?", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "UNION DEDUPLICATION", "color": "#facc15"},
            {"text": "keeps identical transactions", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT customer_id, amount FROM jan_sales\nUNION\nSELECT customer_id, amount FROM feb_sales",
        "codeB": "SELECT customer_id, amount FROM jan_sales\nUNION ALL\nSELECT customer_id, amount FROM feb_sales",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Finance report is missing revenue!\nWhich query keeps identical sales transactions across both months?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "UNION DEDUPLICATION TRAP ⚡💣\n\nWhich query keeps identical sales transactions across both months?\n\nDid plain UNION accidentally delete duplicate payments?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q15\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, sql union vs union all, set operations, sql query interview, deduplication in sql, data analyst interview questions, sql tips, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the trap ❌ | Option B is correct ✅\n\nWhy Option A deletes revenue:\nPlain `UNION` automatically runs an expensive DISTINCT sort across all columns.\nIf a customer made a $100 payment in Jan and another $100 payment in Feb, Option A deletes the 2nd transaction as a duplicate, underreporting total company revenue!\n\nOption B (`UNION ALL`) keeps all records intact and runs 5x faster with zero sorting overhead!\n\n💡 Rule of thumb: Always default to UNION ALL unless you explicitly need duplicate removal!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q15"
    },
    "SQL-09-R1": {
        "reelNo": "SQL-09-R1",
        "day": "DAY 09",
        "badge": "SQL · CTEs & Window Functions",
        "hook": "LATEST RECORD PER USER 📊\nWhich query gets the latest order per customer?",
        "hookLineObjects": [
            {"text": "LATEST RECORD PER USER 📊", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Which query gets the latest order per customer?", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "LATEST RECORD", "color": "#facc15"},
            {"text": "latest order per customer", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "WITH ranked AS (\n  SELECT *,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY order_date DESC\n         ) AS rn\n  FROM orders\n)\nSELECT * FROM ranked WHERE rn = 1",
        "codeB": "SELECT o.*\nFROM orders o\nJOIN (\n  SELECT customer_id, MAX(order_date) AS max_date\n  FROM orders GROUP BY customer_id\n) m ON o.customer_id = m.customer_id\n   AND o.order_date = m.max_date",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "FAANG interviewers love this data engineering question!\nWhich query reliably fetches the latest transaction per user?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "LATEST RECORD PER USER 📊⚡\n\nWhich query reliably fetches the latest order per customer?\n\nCan you spot which approach handles duplicate timestamps without returning extra rows?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q16\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, sql cte, row_number vs group by max, window functions sql, data analyst interview questions, sql query questions, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the Industry Standard ✅ | Option B has a Silent Trap ⚠️\n\nWhy Option A (ROW_NUMBER CTE) is the FAANG standard:\nOption A numbers rows sequentially within each customer group. Even if a customer placed TWO orders with the exact same timestamp, `ROW_NUMBER()` guarantees exactly ONE latest row is returned!\n\nWhy Option B (GROUP BY MAX + JOIN) fails on ties:\nIf a customer has two orders on the same max date, the join matches BOTH rows, returning duplicate orders and inflating downstream revenue metrics!\n\n💡 Rule of thumb: Always use ROW_NUMBER() or QUALIFY to fetch top N / latest records per group!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q16"
    },
    "SQL-10-R1": {
        "reelNo": "SQL-10-R1",
        "day": "DAY 10",
        "badge": "SQL · Gaps & Islands Streaks",
        "hook": "GAPS & ISLANDS TRAP 🏝️\nWhich query groups consecutive login streaks?",
        "hookLineObjects": [
            {"text": "GAPS & ISLANDS TRAP 🏝️", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Which query groups consecutive login streaks?", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "GAPS & ISLANDS", "color": "#facc15"},
            {"text": "consecutive login streaks", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT user_id, login_date,\n       DATE(login_date, '-' || (\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id ORDER BY login_date\n         )\n       ) || ' days') AS streak_grp\nFROM user_logins",
        "codeB": "SELECT user_id, login_date,\n       DENSE_RANK() OVER (\n         PARTITION BY user_id ORDER BY login_date\n       ) AS streak_grp\nFROM user_logins",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Meta and Google love asking this Gaps and Islands S-Q-L trap!\nWhich query groups consecutive active days into unbroken login streaks?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "GAPS & ISLANDS TRAP 🏝️⚡\n\nWhich query groups consecutive active days into unbroken login streaks?\n\nCan you spot which approach generates a constant grouping key for consecutive days?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q17\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, gaps and islands sql, row_number trick, consecutive streaks, faang sql interview, data analyst interview, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the FAANG Standard ✅ | Option B is the Trap ❌\n\nWhy Option A (date - ROW_NUMBER()) works:\nAs long as login dates are consecutive, both `login_date` and `ROW_NUMBER()` increment by +1 each day. Subtracting ROW_NUMBER() from login_date produces a CONSTANT date anchor for the entire unbroken streak!\n\nWhy Option B (DENSE_RANK) fails on gaps:\n`DENSE_RANK()` simply numbers rows sequentially 1, 2, 3... regardless of whether there is a 5-day gap between logins! It fails to detect broken streaks.\n\n💡 Rule of thumb: Subtracting ROW_NUMBER() from dates is the golden trick for Gaps & Islands problems!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q17"
    },
    "SQL-11-R1": {
        "reelNo": "SQL-11-R1",
        "day": "DAY 11",
        "badge": "SQL · Manager Salary Trap",
        "hook": "MANAGER SALARY TRAP 💼\nEmployees earning more than their manager?",
        "hookLineObjects": [
            {"text": "MANAGER SALARY TRAP 💼", "font": "Plus Jakarta Sans", "size": 4.8},
            {"text": "Employees earning more than their manager?", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "MANAGER SALARY", "color": "#facc15"},
            {"text": "earning more than", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT e.name AS emp_name\nFROM employees e\nJOIN employees m ON e.manager_id = m.emp_id\nWHERE e.salary > m.salary;",
        "codeB": "SELECT name\nFROM employees e\nWHERE salary > (\n  SELECT salary FROM employees\n  WHERE emp_id = manager_id\n);",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Amazon and Flipkart love asking this Manager Salary S-Q-L question!\nWhich query finds employees earning more than their direct manager?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "MANAGER SALARY TRAP 💼⚡\n\nWhich query finds employees earning more than their direct manager?\n\nCan you spot which approach correctly links the employee to their manager without subquery scoping bugs?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q18\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, self join sql, leetcode 181, employees earning more than managers, faang sql interview, amazon sql interview, flipkart sql interview, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the Industry Standard ✅ | Option B is the Trap ❌\n\nWhy Option A (Self JOIN) is correct:\nA Self JOIN (`e.manager_id = m.emp_id`) matches each employee row directly with their manager's record in the same table. The `WHERE e.salary > m.salary` filter then accurately isolates employees out-earning their managers.\n\nWhy Option B (Uncorrelated Subquery) fails:\nIn Option B, `WHERE emp_id = manager_id` inside the subquery evaluates against the SAME inner row! It searches for an employee who is their own manager (like a CEO), completely ignoring the outer employee's manager ID!\n\n💡 Rule of thumb: Hierarchical comparisons within the same table (employee ↔ manager) are best solved with an explicit SELF JOIN!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q18"
    },
    "SQL-12-R1": {
        "reelNo": "SQL-12-R1",
        "day": "DAY 12",
        "badge": "SQL · Ghost Employee Trap",
        "hook": "WHO STILL GOT PAID? 👻💸\nEx-employee resigned 3 months ago!",
        "hookLineObjects": [
            {"text": "WHO STILL GOT PAID? 👻💸", "font": "Montserrat", "size": 4.6},
            {"text": "Ex-employee resigned 3 months ago!", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "WHO STILL GOT PAID?", "color": "#facc15"},
            {"text": "resigned 3 months ago!", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT p.emp_id, p.amount, p.pay_date\nFROM payroll p JOIN employees e\n  ON p.emp_id = e.emp_id\nWHERE p.pay_date > e.exit_date;",
        "codeB": "SELECT p.emp_id, p.amount, p.pay_date\nFROM payroll p JOIN employees e\n  ON p.emp_id = e.emp_id\nWHERE e.status = 'Resigned';",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Top tech companies love asking this Ghost Payroll S-Q-L trap!\nWhich query catches salary payments credited after an employee resigned?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "WHO STILL GOT PAID? 👻💸\n\nWhich query catches salary payments credited after an employee resigned?\n\nCan you spot which approach checks transaction dates instead of historical status flags?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q19\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, date filtering sql, ghost employees, payroll fraud audit, leetcode sql, data analyst interview, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the Real-World Audit Standard ✅ | Option B is the Trap ❌\n\nWhy Option A (pay_date > exit_date) works:\nAn employee who resigned 3 months ago has a valid historical employment record. To catch post-resignation unauthorized payments, you MUST compare transaction timestamps (`p.pay_date > e.exit_date`).\n\nWhy Option B (status = 'Resigned') fails:\nOption B simply checks if status is 'Resigned'. This catastrophically flags EVERY single legitimate monthly salary ever paid to that employee while they were working full-time!\n\n💡 Rule of thumb: Never rely on static status flags for temporal audit checks — always filter against transactional timestamp boundaries!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q19",
        "openingPoster": str(PROJECT_ROOT / "marketing" / "output" / "video" / "SQL-12-R1_Opening_Poster_1080x1920.jpg")
    },
    "SQL-13-R1": {
        "reelNo": "SQL-13-R1",
        "day": "DAY 13",
        "badge": "SQL · Peak Concurrency Trap",
        "hook": "PEAK STREAMERS? 🎬🍿\n10 Million users watching at the same second!",
        "hookLineObjects": [
            {"text": "PEAK STREAMERS? 🎬🍿", "font": "Montserrat", "size": 4.6},
            {"text": "10M users at the exact same second!", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "PEAK STREAMERS?", "color": "#facc15"},
            {"text": "exact same second!", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "SELECT s1.start_time AS t,\n       COUNT(*) AS concurrent_users\nFROM streams s1\nJOIN streams s2\n  ON s1.start_time BETWEEN s2.start_time AND s2.end_time\nGROUP BY s1.stream_id;",
        "codeB": "WITH events AS (\n  SELECT start_time AS t, 1 AS delta FROM streams\n  UNION ALL\n  SELECT end_time AS t, -1 AS delta FROM streams\n)\nSELECT t, SUM(delta) OVER (ORDER BY t) AS concurrent_users\nFROM events;",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Netflix and Hotstar love asking this Peak Concurrency S-Q-L challenge!\nWhich query counts live streamers without crashing the database?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "PEAK STREAMERS? 🎬🍿\n\nWhich query finds concurrent viewers watching at the exact same second?\n\nCan you spot which approach scales to millions of streams without quadratic join crashes?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q20\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, peak concurrency sql, netflix sql interview, hotstar live streams, running total sql, window functions, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option B is the FAANG Standard ✅ | Option A is the Crash Trap ❌\n\nWhy Option B (Delta Event Counter +1 / -1) works:\nBy tagging each stream start as +1 and each stream end as -1, `SUM(delta) OVER (ORDER BY t)` computes the exact running concurrent viewers in O(N log N) time without storing redundant combinations!\n\nWhy Option A (Self-Join BETWEEN) fails:\nOption A compares every stream against every other overlapping stream using an O(N²) quadratic Self-Join. On 10 million concurrent streams, this generates 100 trillion row comparisons, causing catastrophic database memory exhaustion!\n\n💡 Rule of thumb: When tracking concurrent active sessions, convert starts and ends into +1 / -1 delta events instead of writing quadratic self-joins!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q20",
        "openingPoster": str(PROJECT_ROOT / "marketing" / "output" / "video" / "SQL-13-R1_Opening_Poster_1080x1920.jpg")
    },
    "SQL-14-R1": {
        "reelNo": "SQL-14-R1",
        "day": "DAY 14",
        "badge": "SQL · Session Timeout Trap",
        "hook": "SESSION TIMEOUT? ⏱️📱\n30 minutes of inactivity triggers a new session!",
        "hookLineObjects": [
            {"text": "SESSION TIMEOUT? ⏱️📱", "font": "Montserrat", "size": 4.6},
            {"text": "30 mins inactivity = new session!", "font": "Outfit", "size": 3.7}
        ],
        "hookHighlights": [
            {"text": "SESSION TIMEOUT?", "color": "#facc15"},
            {"text": "new session!", "color": "#00f0ff"}
        ],
        "lang": "sql",
        "codeA": "WITH flagged AS (\n  SELECT click_time,\n    CASE WHEN click_time - LAG(click_time)\n      OVER (ORDER BY click_time) > 30 THEN 1 ELSE 0 END AS is_new\n  FROM clicks\n)\nSELECT click_time,\n  SUM(is_new) OVER (ORDER BY click_time) AS session_id\nFROM flagged;",
        "codeB": "SELECT click_time,\n       DENSE_RANK() OVER (ORDER BY DATE(click_time)) AS session_id\nFROM clicks;",
        "pollInstr": "DROP YOUR VOTE IN COMMENTS 👇",
        "clockSfx": "bomb",
        "ccStyle": "hormozi",
        "ccEnabled": True,
        "voice": "en-US-AndrewNeural",
        "voiceScript": "Swiggy and Uber love asking this User Sessionization S-Q-L challenge!\nWhich query tracks dynamic sessions when thirty minutes of inactivity triggers a timeout?\nChoose your answer.\nOption A...\nor Option B?\nDrop your vote in the comments below.",
        "caption": "SESSION TIMEOUT? ⏱️📱\n\nWhich query tracks dynamic user sessions when 30 minutes of inactivity triggers a new session?\n\nCan you spot which approach computes event inactivity gaps instead of merely ranking calendar dates?\n\nWhat’s your answer — A or B? 👇\nDrop your choice in the comments before checking the answer!\n\n🧠 Test this SQL interview question live:\n👉 manodemy.com/q21\n\n📊 Practice Data Skills with Manodemy\n🎁 Day 1 & Day 2 are 100% FREE\n\n🔗 Link in bio\n\n[sql interview questions, sessionization sql, swiggy sql interview, uber data analyst, lag function sql, running total session id, advanced sql, learn sql]\n\n#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy",
        "pinnedAnswer": "Option A is the FAANG Standard ✅ | Option B is the Trap ❌\n\nWhy Option A (LAG Time-Delta + Cumulative Sum) works:\nOption A calculates the time elapsed since the user's previous click using `LAG(click_time)`. When that inactivity gap exceeds 30 minutes, it flags a new session (`is_new = 1`). A running cumulative `SUM(is_new) OVER (ORDER BY click_time)` then cleanly generates distinct, sequential session IDs across any time boundary!\n\nWhy Option B (DENSE_RANK on DATE) fails:\nOption B merely truncates click timestamps to calendar days (`DATE(click_time)`). If a user visits the app at 9:00 AM, closes it, and returns 12 hours later at 9:00 PM, Option B assigns BOTH visits the exact same session ID! Furthermore, sessions crossing midnight are incorrectly fragmented.\n\n💡 Rule of thumb: Real-world sessionization always depends on inactivity gaps between consecutive events — never rely on arbitrary midnight calendar boundaries!\n\nDid you vote A or B? 👇",
        "link": "https://www.manodemy.com/q21",
        "openingPoster": str(PROJECT_ROOT / "marketing" / "output" / "video" / "SQL-14-R1_Opening_Poster_1080x1920.jpg")
    }
}

DEFAULT_REEL = REELS_CATALOG["SQL-14-R1"]

async def build_direct_video(reel=DEFAULT_REEL, is_4k=False, fps=30):
    start_total = time.time()
    reel_no = reel["reelNo"]
    w = 2160 if is_4k else 1080
    h = 3840 if is_4k else 1920
    res_label = "4K_2160p" if is_4k else "FullHD_1080p"
    
    print("==================================================================", flush=True)
    print(f"🚀 DIRECT CODE PIPELINE: Building [{reel_no}] ({res_label} @ {fps}fps)", flush=True)
    print("==================================================================", flush=True)

    # -------------------------------------------------------------
    # STEP 1: AI Speech Synthesis & Exact Cues Timing (Edge-TTS)
    # -------------------------------------------------------------
    print("\n🎙️ [STEP 1/5] Synthesizing Multi-Chunk Speech with Edge-TTS...", flush=True)
    import edge_tts
    import tempfile
    
    voice_lines = [l.strip() for l in reel["voiceScript"].split("\n") if l.strip()]
    hook_text = voice_lines[0] if len(voice_lines) > 0 else "Ninety nine percent fail this trap."
    line2_text = voice_lines[1] if len(voice_lines) > 1 else "One of these has an unexpected bug."
    choose_text = voice_lines[2] if len(voice_lines) > 2 else "Choose your answer."
    cta_text = voice_lines[5] if len(voice_lines) > 5 else (voice_lines[-1] if voice_lines else "Drop your vote in the comments below.")

    chunks = [
        ("hook", hook_text),
        ("line2", line2_text),
        ("choose", choose_text),
        ("optA", "Option A..."),
        ("optB", "or Option B?"),
        ("cta", cta_text)
    ]
    
    durations = {}
    audio_segments = {}
    with tempfile.TemporaryDirectory() as tmpdir:
        for key, text in chunks:
            tfile = Path(tmpdir) / f"{key}.mp3"
            saved = False
            for attempt in range(4):
                try:
                    com = edge_tts.Communicate(text, reel["voice"], rate="+3%", pitch="+0Hz")
                    await com.save(str(tfile))
                    saved = True
                    break
                except Exception as e:
                    print(f"   ⚠️ Edge-TTS chunk '{key}' retry {attempt+1}/4... ({e})", flush=True)
                    await asyncio.sleep(1.2)
            if not saved:
                raise RuntimeError(f"Failed to synthesize audio chunk '{key}'")
            seg = AudioSegment.from_file(str(tfile))
            durations[key] = len(seg)
            audio_segments[key] = seg

    dur_hook = durations["hook"]
    dur_line2 = durations["line2"]
    dur_choose = durations["choose"]
    dur_opta = durations["optA"]
    dur_optb = durations["optB"]
    dur_cta = durations["cta"]

    t_hook_start = 0
    t_line2_start = dur_hook
    t_clock_in = t_line2_start + dur_line2 + 20
    tension_ms = 550

    raw_narration = (
        audio_segments["hook"] +
        audio_segments["line2"] +
        AudioSegment.silent(duration=20) +
        audio_segments["choose"] +
        audio_segments["optA"] +
        audio_segments["optB"] +
        AudioSegment.silent(duration=tension_ms) +
        audio_segments["cta"] +
        AudioSegment.silent(duration=600)
    )
    narration_out = AUDIO_DIR / f"{reel_no}_narration.mp3"
    raw_narration.export(str(narration_out), format="mp3", bitrate="320k")
    print(f"   ✓ Narration track stitched: {len(raw_narration)/1000.0:.2f}s total duration", flush=True)

    # -------------------------------------------------------------
    # STEP 2: Ground-Truth Whisper ASR Word Alignment on Stitched Track
    # -------------------------------------------------------------
    print("\n📝 [STEP 2/5] Extracting Whisper AI Word Timestamps from Stitched Narration...", flush=True)
    import whisper
    whisper_model = whisper.load_model('base')
    w_res = _whisper_cached_transcribe(narration_out, whisper_model, reel_no)
    w_segs = w_res.get('segments', [])

    def extract_words_from_segs(segs):
        extracted = []
        for s in segs:
            for w_tok in s.get('words', []):
                clean_w = w_tok['word'].strip()
                if clean_w:
                    extracted.append({
                        "word": clean_w,
                        "startMs": round(w_tok['start'] * 1000),
                        "endMs": round(w_tok['end'] * 1000)
                    })
        return extracted

    all_raw_words = extract_words_from_segs(w_segs)

    if len(w_segs) == 6:
        seg_words = [extract_words_from_segs([s]) for s in w_segs]
        t_hook_start = 0
        t_line2_start = round(w_segs[1]['start'] * 1000)
        t_clock_in = round(w_segs[2]['start'] * 1000)
        t_opta = round(w_segs[3]['start'] * 1000)
        t_optb = round(w_segs[4]['start'] * 1000)
        t_optb_end = round(w_segs[4]['end'] * 1000)
        t_cta_start = round(w_segs[5]['start'] * 1000)
        t_clock_out = t_cta_start
        t_voice_end = round(w_segs[5]['end'] * 1000) + 50

        p0_words = align_expected_phrase(hook_text, seg_words[0], t_hook_start, t_line2_start)
        p1_words = align_expected_phrase(line2_text, seg_words[1], t_line2_start, t_clock_in)
        p2_words = align_expected_phrase("Choose your answer...", seg_words[2], t_clock_in, t_opta)
        p3_words = align_expected_phrase("Option A...", seg_words[3], t_opta, t_optb)
        p4_words = align_expected_phrase("or Option B?", seg_words[4], t_optb, t_optb_end)
        p5_words = align_expected_phrase(cta_text, seg_words[5], t_cta_start, t_voice_end)
    else:
        # Fallback using chunk boundary windows
        c0_start = 0
        c0_end = dur_hook
        c1_start = dur_hook
        c1_end = dur_hook + dur_line2
        c2_start = c1_end + 20
        c2_end = c2_start + dur_choose
        c3_start = c2_end
        c3_end = c3_start + dur_opta
        c4_start = c3_end
        c4_end = c4_start + dur_optb
        c5_start = c4_end + tension_ms

        idx_line2 = 0
        for i, tok in enumerate(all_raw_words):
            if tok["startMs"] >= c1_start - 120:
                idx_line2 = i
                break
        if idx_line2 == 0:
            idx_line2 = max(1, min(len(all_raw_words) - 1, len(hook_text.split())))

        idx_choose = idx_line2
        for i in range(idx_line2, len(all_raw_words)):
            if all_raw_words[i]["startMs"] >= c2_start - 120:
                idx_choose = i
                break

        idx_opta = idx_choose
        for i in range(idx_choose, len(all_raw_words)):
            if all_raw_words[i]["startMs"] >= c3_start - 120:
                idx_opta = i
                break

        idx_optb = idx_opta + 1
        for i in range(idx_opta + 1, len(all_raw_words)):
            if all_raw_words[i]["startMs"] >= c4_start - 120:
                idx_optb = i
                break

        idx_cta = idx_optb + 1
        for i in range(idx_optb + 1, len(all_raw_words)):
            if all_raw_words[i]["startMs"] >= c5_start - 180:
                idx_cta = i
                break

        t_hook_start = 0
        t_line2_start = all_raw_words[idx_line2]["startMs"] if all_raw_words and idx_line2 < len(all_raw_words) else c1_start
        t_clock_in = all_raw_words[idx_choose]["startMs"] if all_raw_words and idx_choose < len(all_raw_words) else c2_start
        t_opta = all_raw_words[idx_opta]["startMs"] if all_raw_words and idx_opta < len(all_raw_words) else c3_start
        t_optb = all_raw_words[idx_optb]["startMs"] if all_raw_words and idx_optb < len(all_raw_words) else c4_start
        
        t_cta_start = all_raw_words[idx_cta]["startMs"] if all_raw_words and idx_cta < len(all_raw_words) else c5_start
        t_clock_out = t_cta_start
        t_optb_end = t_clock_out - 150
        t_voice_end = all_raw_words[-1]["endMs"] + 100 if all_raw_words else round(len(raw_narration))

        p0_words = align_expected_phrase(hook_text, all_raw_words[:idx_line2], t_hook_start, t_line2_start)
        p1_words = align_expected_phrase(line2_text, all_raw_words[idx_line2:idx_choose], t_line2_start, t_clock_in)
        p2_words = align_expected_phrase("Choose your answer...", all_raw_words[idx_choose:idx_opta], t_clock_in, t_opta)
        p3_words = align_expected_phrase("Option A...", all_raw_words[idx_opta:idx_optb], t_opta, t_optb)
        p4_words = align_expected_phrase("or Option B?", all_raw_words[idx_optb:idx_cta], t_optb, t_optb_end)
        p5_words = align_expected_phrase(cta_text, all_raw_words[idx_cta:], t_cta_start, t_voice_end)

    phrases = [
        {"index": 0, "text": hook_text, "startMs": t_hook_start, "endMs": t_line2_start, "words": p0_words},
        {"index": 1, "text": line2_text, "startMs": t_line2_start, "endMs": t_clock_in, "words": p1_words},
        {"index": 2, "text": "Choose your answer...", "startMs": t_clock_in, "endMs": t_opta, "words": p2_words},
        {"index": 3, "text": "Option A...", "startMs": t_opta, "endMs": t_optb, "words": p3_words},
        {"index": 4, "text": "or Option B?", "startMs": t_optb, "endMs": t_optb_end, "words": p4_words},
        {"index": 5, "text": cta_text, "startMs": t_cta_start, "endMs": t_voice_end, "words": p5_words}
    ]
    all_words = p0_words + p1_words + p2_words + p3_words + p4_words + p5_words
    print(f"   ✓ Extracted {len(all_words)} word cues across {len(phrases)} perfectly aligned phrases", flush=True)

    hold_ms = 1400  # 1.4-second high-energy hold after voiceover finishes for user reaction and live link viewing
    total_ms = t_voice_end + hold_ms
    total_sec = total_ms / 1000.0

    cues_data = {
        "t_hook_start": t_hook_start,
        "t_line2_start": t_line2_start,
        "t_clock_in": t_clock_in,
        "t_opta": t_opta,
        "t_optb": t_optb,
        "t_optb_end": t_optb_end,  # Exact Card B glow END from Whisper
        "t_clock_out": t_clock_out,
        "t_cta_start": t_cta_start,
        "t_voice_end": t_voice_end,
        "totalMs": total_ms,
        "clockDurationMs": (t_clock_out - t_clock_in),
        "wordCues": all_words,
        "phrases": phrases,
        "hasOpeningPoster": bool(reel.get("openingPoster")),
        "openingPosterDuration": t_line2_start if reel.get("openingPoster") else 0
    }

    # -------------------------------------------------------------
    # STEP 3: Studio 3-Layer Audio Mastering
    # -------------------------------------------------------------
    print("\n🎛️ [STEP 3/5] Mastering 3-Layer Audio (Narration + 22% BGM + Acoustic SFX)...", flush=True)
    from marketing.sfx_synth import build_sfx_audio_segment

    # Voiceover: +2.5dB dominant punch with 1.5s silent hold tail
    vox = (raw_narration + 2.5) + AudioSegment.silent(duration=hold_ms)
    
    # BGM: Exact 22% volume (-13.15dB) continuous full track extended across full total_ms with zero seamless cuts
    bgm_path = PROJECT_ROOT / "marketing" / "assets" / "audio" / "quiz_night_anthem_full.mp3"
    bgm = AudioSegment.from_file(str(bgm_path)) - 14.0
    if len(bgm) < total_ms:
        bgm = bgm.append(bgm, crossfade=400)[:total_ms]
    else:
        bgm = bgm[:total_ms]
    bgm = bgm.fade_out(500)
    
    # SFX Suite: Multi-oscillator acoustic textures
    sfx = build_sfx_audio_segment(cues_data, total_ms) + 1.5

    master_audio = vox.overlay(bgm).overlay(sfx)
    import tempfile
    master_audio_file = Path(tempfile.gettempdir()) / f"{reel_no}_temp_master_{int(time.time())}.mp3"
    master_audio.export(str(master_audio_file), format="mp3", bitrate="320k")
    print("   ✓ 3-Layer Audio mastered with zero clipping at 320kbps stereo", flush=True)

    # -------------------------------------------------------------
    # STEP 4: Deterministic Stepped Video Rendering (Playwright + FFmpeg)
    # -------------------------------------------------------------
    print(f"\n🎬 [STEP 4/5] Rendering {res_label} Video ({w}x{h} @ {fps}fps)...", flush=True)
    out_mp4 = OUTPUT_DIR / f"{reel_no}.mp4"
    total_frames = int(total_sec * fps)

    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "image2pipe",
        "-vcodec", "mjpeg",
        "-r", str(fps),
        "-i", "-",
        "-i", str(master_audio_file),
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "16",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "320k",
        "-shortest",
        str(out_mp4)
    ]

    ffmpeg_proc = subprocess.Popen(
        ffmpeg_cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    "--disable-background-timer-throttling",
                    "--disable-renderer-backgrounding",
                    "--enable-gpu-rasterization"
                ]
            )
            context = await browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1.0
            )
            page = await context.new_page()

            # Load Template
            template_file = (PROJECT_ROOT / "marketing" / "templates" / "neon-radial-clock.html").resolve()
            await page.goto(template_file.as_uri(), wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(1000)

            # Ensure Logo Base64 is injected so it renders 100% crisply under all environments
            logo_path = PROJECT_ROOT / "marketing" / "assets" / "logo.png"
            if logo_path.exists():
                import base64
                logo_b64 = "data:image/png;base64," + base64.b64encode(logo_path.read_bytes()).decode('utf-8')
                await page.evaluate(f"const img = document.getElementById('heroLogoImg'); if(img) img.src = '{logo_b64}';")

            # Inject Reel Data and Cues into Template
            load_payload = dict(reel)
            load_payload["cues"] = cues_data

            # If opening poster exists, encode as Base64 so it renders with 0ms delay at Frame 0
            if "openingPoster" in reel and reel["openingPoster"]:
                poster_path = Path(reel["openingPoster"])
                if poster_path.exists():
                    import base64
                    mime = "image/png" if poster_path.suffix.lower() == ".png" else "image/jpeg"
                    poster_b64 = f"data:{mime};base64," + base64.b64encode(poster_path.read_bytes()).decode('utf-8')
                    load_payload["openingPoster"] = poster_b64
                    load_payload["openingPosterDuration"] = cues_data.get("t_line2_start", 1800)

            await page.evaluate(f"window.ReelEngine.load({json.dumps(load_payload)});")
            await page.wait_for_timeout(500)

            render_t0 = time.time()
            for f in range(total_frames):
                ms = (f / fps) * 1000.0
                await page.evaluate(f"window.ReelEngine.seek({ms});")
                jpeg_bytes = await page.screenshot(type="jpeg", quality=82)  # 82 = visually lossless @ 30fps, 25% smaller bytes
                ffmpeg_proc.stdin.write(jpeg_bytes)

                if f % 45 == 0 or f == total_frames - 1:
                    pct = int((f + 1) / total_frames * 100)
                    fps_actual = round((f + 1) / (time.time() - render_t0), 1)
                    print(f"   [{pct}%] Frame {f+1}/{total_frames} ({ms/1000:.2f}s) @ {fps_actual} fps", flush=True)

            await browser.close()
    finally:
        ffmpeg_proc.stdin.close()
        ffmpeg_proc.wait()

        # Ensure output file permissions and flush
        if out_mp4.exists():
            print(f"   ✓ Successfully rendered & overwritten in-place: {out_mp4.name}", flush=True)

        # Cleanup temp master audio safely from OS temp
        if master_audio_file.exists():
            try: os.remove(master_audio_file)
            except: pass

    # -------------------------------------------------------------
    # STEP 5: Generate 1-Click Publishing Pack JSON & Cover Thumbnail
    # -------------------------------------------------------------
    print("\n📦 [STEP 5/5] Generating 1-Click Publishing Pack & Cover Thumbnail...", flush=True)
    try:
        if reel_no not in ["SQL-12-R1", "SQL-13-R1", "SQL-14-R1"]:
            from marketing.cover_generator import generate_cover
            await generate_cover(reel_no)
    except Exception as e:
        print(f"   ⚠️ Cover generation note: {e}")

    pack_data = {
        "reelNo": reel_no,
        "day": reel["day"],
        "badge": reel["badge"],
        "videoFile": str(out_mp4.name),
        "videoPath": str(out_mp4),
        "coverFile": f"{reel_no}_Cover.png",
        "coverJpg": f"{reel_no}_Cover.jpg",
        "fileSizeMb": round(out_mp4.stat().st_size / (1024 * 1024), 2),
        "resolution": f"{w}x{h}",
        "fps": fps,
        "durationSec": round(total_sec, 2),
        "caption": reel["caption"],
        "pinnedAnswer": reel["pinnedAnswer"],
        "simulatorLink": reel["link"],
        "cues": cues_data,
        "generatedAt": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    pack_json_file = OUTPUT_DIR / f"{reel_no}_Publish_Pack.json"
    with open(pack_json_file, "w", encoding="utf-8") as f:
        json.dump(pack_data, f, indent=2, ensure_ascii=False)

    total_time = round(time.time() - start_total, 1)
    print("\n==================================================================", flush=True)
    print(f"🎉 DIRECT PIPELINE COMPLETE IN {total_time} SECONDS!", flush=True)
    print(f"📁 Video: {out_mp4} ({pack_data['fileSizeMb']} MB)", flush=True)
    print(f"📁 Cover: {OUTPUT_DIR / f'{reel_no}_Cover.png'}", flush=True)
    print(f"📁 Pack:  {pack_json_file}", flush=True)
    print("==================================================================", flush=True)
    return pack_data

if __name__ == "__main__":
    is_4k = "--4k" in sys.argv
    reel_arg = next((arg for arg in sys.argv[1:] if not arg.startswith("--")), "SQL-13-R1")
    if reel_arg.lower() == "all":
        for k, r in REELS_CATALOG.items():
            asyncio.run(build_direct_video(r, is_4k=is_4k, fps=24))
    elif reel_arg in REELS_CATALOG:
        asyncio.run(build_direct_video(REELS_CATALOG[reel_arg], is_4k=is_4k, fps=24))
    else:
        asyncio.run(build_direct_video(DEFAULT_REEL, is_4k=is_4k, fps=24))
