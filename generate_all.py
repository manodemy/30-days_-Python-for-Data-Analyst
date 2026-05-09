"""
Master Generator: Recreate Day02-Day30 notebooks matching Day01 gold standard.
Run: python generate_all.py
"""
import json, os, sys

NOTEBOOKS_DIR = os.path.join(os.path.dirname(__file__), 'notebooks')

# ═══════════════════════════════════════════════════════════════
# HTML TEMPLATES (matching Day01 exactly)
# ═══════════════════════════════════════════════════════════════

def section_header(num, title, code_name, subtitle):
    return (
        f'<h2 style="color: #000000ff; background-color: #02fff2ff; border-left: 6px solid #0c0c0cff; '
        f'padding: 12px 15px; margin-top: 40px; border-radius: 4px;">\n'
        f'    <b>{num}. {title} (<code>{code_name}</code>) : '
        f'<span style="color: #070707ff; font-size: 0.85em; font-weight: normal;">{subtitle}</span></b>\n'
        f'</h2>'
    )

def section_header_simple(num, title, subtitle):
    return (
        f'<h2 style="color: #000000ff; background-color: #02fff2ff; border-left: 6px solid #0c0c0cff; '
        f'padding: 12px 15px; margin-top: 40px; border-radius: 4px;">\n'
        f'    <b>{num}. {title} : '
        f'<span style="color: #070707ff; font-size: 0.85em; font-weight: normal;">{subtitle}</span></b>\n'
        f'</h2>'
    )

def what_is_it(text):
    return (
        f'<div style="border-left: 4px solid #4DB6AC; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n'
        f'    <b>🔍 What is it?</b><br>\n'
        f'    {text}\n'
        f'</div>'
    )

def why_care(text):
    return (
        f'<h3 style="color: #64B5F6; background-color: #0F1A2A; padding: 8px 12px; border-radius: 4px; '
        f'margin-top: 25px;"><b>💼 Why Data Analysts Care</b></h3>\n\n{text}'
    )

def pitfall(title, text):
    return (
        f'<h3 style="color: #FFB74D; background-color: #2B1A0D; padding: 8px 12px; border-radius: 4px; '
        f'margin-top: 25px;"><b>⚠️ {title}</b></h3>\n\n'
        f'<div style="border-left: 4px solid #FFB74D; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n'
        f'    {text}\n'
        f'</div>'
    )

def pro_tip(text):
    return (
        f'<h3 style="color: #81C784; background-color: #102414; padding: 8px 12px; border-radius: 4px; '
        f'margin-top: 25px;"><b>🧠 Pro Tip</b></h3>\n\n'
        f'<div style="border-left: 4px solid #81C784; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n'
        f'    {text}\n'
        f'</div>'
    )

def concept_check_header(topic):
    return (
        f'<h3 style="color: #C7D2FE; background-color: #0e0e0fff; border-left: 6px solid #6366F1; '
        f'padding: 12px 15px; margin-top: 50px; margin-bottom: 20px; border-radius: 4px; '
        f'box-shadow: 0 4px 6px rgba(0,0,0,0.3);">\n'
        f'    <b>🧪 Concept Checks: <code>{topic}</code></b>\n'
        f'</h3>'
    )

# ═══════════════════════════════════════════════════════════════
# NOTEBOOK BUILDER
# ═══════════════════════════════════════════════════════════════

def md(source):
    return {"cell_type": "markdown", "metadata": {}, "source": source.split('\n') if isinstance(source, str) else source}

def code(source="# Write your answer here\n"):
    return {"cell_type": "code", "metadata": {}, "source": [source] if isinstance(source, str) else source, "outputs": [], "execution_count": None}

def build_notebook(cells):
    # Fix source: ensure each line ends with \n except the last
    for cell in cells:
        lines = []
        for i, line in enumerate(cell['source']):
            if not line.endswith('\n') and i < len(cell['source']) - 1:
                lines.append(line + '\n')
            else:
                lines.append(line)
        cell['source'] = lines
    
    return {
        "nbformat": 4,
        "nbformat_minor": 5,
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
            "language_info": {"name": "python", "version": "3.12.0"}
        },
        "cells": cells
    }

def build_day(day_num, day_title, objective_text, objective_table,
              sections, practice_tasks, interview_questions, summary_table, summary_checklist, next_up):
    """
    sections: list of dicts with keys:
        header_html, theory_html, demo_code, cc_topic, questions (list of 5 Q strings)
    practice_tasks: list of 5 task strings
    interview_questions: list of 25 Q strings
    summary_table, summary_checklist: markdown strings
    """
    cells = []
    
    # ── CELL 0: Enterprise Objective ──
    obj = f"---\n## 🎯 Enterprise Objective\n{objective_text}\n\n### 📋 Strategic Overview\n{objective_table}\n"
    cells.append(md(obj))
    
    # ── SECTIONS (each: header+theory, demo code, concept check header, 5 Qs with code cells) ──
    for sec in sections:
        # Section header + theory (single markdown cell, matching Day01)
        cells.append(md(sec['header_html'] + '\n\n' + sec['theory_html']))
        
        # Demo code cell
        cells.append(code(sec['demo_code']))
        
        # Concept check header
        cells.append(md(concept_check_header(sec['cc_topic'])))
        
        # 5 questions, each followed by a code cell
        for q in sec['questions']:
            cells.append(md(q))
            cells.append(code("# Write your answer here\n"))
    
    # ── PRACTICE TASKS ──
    cells.append(md("---\n# 🛠️ Professional Practice Tasks\nTheory is useless without muscle memory. Complete these tasks to solidify your understanding.\n"))
    for i, task in enumerate(practice_tasks, 1):
        cells.append(md(f"### **Task {i} ({task['name']}):** {task['desc']}\n"))
        cells.append(code("# Write your answer here\n"))
    
    # ── INTERVIEW QUESTIONS ──
    cells.append(md("---\n# 💻 Pure Coding Interview Questions\n"))
    for i, q in enumerate(interview_questions, 1):
        cells.append(md(f"---\n## Q{i}.\n### {q}\n"))
        cells.append(code(f"# Solution for Q{i}\n"))
    
    # ── EXECUTIVE SUMMARY ──
    summary = f"---\n# 📊 Day {day_num} Executive Summary\n\n{summary_table}\n\n## ✅ Instructor's End-of-Day Checklist\n{summary_checklist}\n\n---\n**Next Up: {next_up}**\n"
    cells.append(md(summary))
    
    return build_notebook(cells)

def save_notebook(nb, filename):
    path = os.path.join(NOTEBOOKS_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(nb, f, ensure_ascii=False, indent=1)
    cells_md = sum(1 for c in nb['cells'] if c['cell_type'] == 'markdown')
    cells_code = sum(1 for c in nb['cells'] if c['cell_type'] == 'code')
    print(f"  ✅ {filename} — {len(nb['cells'])} cells (md:{cells_md}, code:{cells_code})")


# ═══════════════════════════════════════════════════════════════
# DAY CONTENT DEFINITIONS
# ═══════════════════════════════════════════════════════════════

def make_section(num, title, code_name, subtitle, theory_html, demo_code, cc_topic, questions):
    if code_name:
        hdr = section_header(num, title, code_name, subtitle)
    else:
        hdr = section_header_simple(num, title, subtitle)
    return {
        'header_html': hdr,
        'theory_html': theory_html,
        'demo_code': demo_code,
        'cc_topic': cc_topic,
        'questions': questions
    }

print("Loading day content modules...")
# Import content for each day from separate files
from day_content import get_day_content

if __name__ == '__main__':
    os.makedirs(NOTEBOOKS_DIR, exist_ok=True)
    
    FILENAMES = {
        2: 'Day02_Operators_Blank.ipynb',
        3: 'Day03_Strings_Blank.ipynb',
        4: 'Day04_Lists_Blank.ipynb',
        5: 'Day05_Tuples_Blank.ipynb',
        6: 'Day06_Sets_Blank.ipynb',
        7: 'Day07_Dictionaries_Blank.ipynb',
        8: 'Day08_Conditionals_Blank.ipynb',
        9: 'Day09_Loops_Blank.ipynb',
        10: 'Day10_Functions_Blank.ipynb',
        11: 'Day11_Modules_Blank.ipynb',
        12: 'Day12_Comprehensions_Blank.ipynb',
        13: 'Day13_Lambda_Blank.ipynb',
        14: 'Day14_Exceptions_Blank.ipynb',
        15: 'Day15_FileHandling_Blank.ipynb',
        16: 'Day16_OOP_Basics_Blank.ipynb',
        17: 'Day17_OOP_Advanced_Blank.ipynb',
        18: 'Day18_Regex_Blank.ipynb',
        19: 'Day19_Generators_Blank.ipynb',
        20: 'Day20_Capstone_Blank.ipynb',
        21: 'Day21_NumPy_Blank.ipynb',
        22: 'Day22_NumPy_Advanced_Blank.ipynb',
        23: 'Day23_Pandas_Intro_Blank.ipynb',
        24: 'Day24_Pandas_Selection_Blank.ipynb',
        25: 'Day25_Pandas_Cleaning_Blank.ipynb',
        26: 'Day26_Pandas_GroupBy_Blank.ipynb',
        27: 'Day27_Pandas_Merging_Blank.ipynb',
        28: 'Day28_Pandas_Series_Blank.ipynb',
        29: 'Day29_Data_Seaborn_Blank.ipynb',
        30: 'Day30_Phase_Analysis_Blank.ipynb',
    }
    
    # Build specified days (or all)
    days_to_build = list(range(2, 31))
    if len(sys.argv) > 1:
        days_to_build = [int(x) for x in sys.argv[1:]]
    
    print(f"\n🏗️ Building {len(days_to_build)} notebooks...\n")
    
    for day in days_to_build:
        if day not in FILENAMES:
            print(f"  ⚠️ Day {day} not in filename map, skipping")
            continue
        content = get_day_content(day)
        if content is None:
            print(f"  ⚠️ Day {day} content not yet defined, skipping")
            continue
        nb = build_day(**content)
        save_notebook(nb, FILENAMES[day])
    
    print(f"\n🎉 Done!")
