"""Notebook building helpers matching Day01 gold standard."""
import json, os

def SH(num, title, subtitle):
    """Section header (cyan bar)."""
    return (f'<h2 style="color: #000000ff; background-color: #02fff2ff; border-left: 6px solid #0c0c0cff; '
            f'padding: 12px 15px; margin-top: 40px; border-radius: 4px;">\n'
            f'    <b>{num}. {title} : <span style="color: #070707ff; font-size: 0.85em; font-weight: normal;">{subtitle}</span></b>\n</h2>')

def WH(text):
    """What is it? block."""
    return (f'<div style="border-left: 4px solid #4DB6AC; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n'
            f'    <b>🔍 What is it?</b><br>\n    {text}\n</div>')

def WC(bullets):
    """Why Data Analysts Care."""
    bl = '\n'.join(f'* **{b[0]}**: {b[1]}' for b in bullets)
    return (f'<h3 style="color: #64B5F6; background-color: #0F1A2A; padding: 8px 12px; border-radius: 4px; '
            f'margin-top: 25px;"><b>💼 Why Data Analysts Care</b></h3>\n\n{bl}')

def PF(title, text):
    """Common Pitfall block."""
    return (f'<h3 style="color: #FFB74D; background-color: #2B1A0D; padding: 8px 12px; border-radius: 4px; '
            f'margin-top: 25px;"><b>⚠️ {title}</b></h3>\n\n'
            f'<div style="border-left: 4px solid #FFB74D; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n    {text}\n</div>')

def PT(text):
    """Pro Tip block."""
    return (f'<h3 style="color: #81C784; background-color: #102414; padding: 8px 12px; border-radius: 4px; '
            f'margin-top: 25px;"><b>🧠 Pro Tip</b></h3>\n\n'
            f'<div style="border-left: 4px solid #81C784; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">\n    {text}\n</div>')

def CC(topic):
    """Concept Check header."""
    return (f'<h3 style="color: #C7D2FE; background-color: #0e0e0fff; border-left: 6px solid #6366F1; '
            f'padding: 12px 15px; margin-top: 50px; margin-bottom: 20px; border-radius: 4px; '
            f'box-shadow: 0 4px 6px rgba(0,0,0,0.3);">\n    <b>🧪 Concept Checks: <code>{topic}</code></b>\n</h3>')

def md(src):
    lines = src.split('\n') if isinstance(src, str) else src
    fixed = []
    for i, l in enumerate(lines):
        fixed.append(l if l.endswith('\n') or i == len(lines)-1 else l+'\n')
    return {"cell_type":"markdown","metadata":{},"source":fixed}

def code(src="# Write your answer here\n"):
    lines = src.split('\n') if isinstance(src, str) else src
    fixed = []
    for i, l in enumerate(lines):
        fixed.append(l if l.endswith('\n') or i == len(lines)-1 else l+'\n')
    return {"cell_type":"code","metadata":{},"source":fixed,"outputs":[],"execution_count":None}

def build(day, title, obj_text, obj_table, sections, tasks, interviews, summary, checklist, next_up):
    """Build a complete notebook.
    sections: list of (header_theory_md, demo_code, cc_topic, [q1..q5])
    tasks: list of (name, desc)
    interviews: list of question strings
    """
    cells = []
    cells.append(md(f"---\n## 🎯 Enterprise Objective\n{obj_text}\n\n### 📋 Strategic Overview\n{obj_table}\n"))
    for hdr_theory, demo, cc, qs in sections:
        cells.append(md(hdr_theory))
        cells.append(code(demo))
        cells.append(md(CC(cc)))
        for q in qs:
            cells.append(md(q))
            cells.append(code())
    cells.append(md("---\n# 🛠️ Professional Practice Tasks\nTheory is useless without muscle memory. Complete these tasks to solidify your understanding.\n"))
    for i,(n,d) in enumerate(tasks,1):
        cells.append(md(f"### **Task {i} ({n}):** {d}\n"))
        cells.append(code())
    cells.append(md("---\n# 💻 Pure Coding Interview Questions\n"))
    for i,q in enumerate(interviews,1):
        cells.append(md(f"---\n## Q{i}.\n### {q}\n"))
        cells.append(code(f"# Solution for Q{i}\n"))
    cells.append(md(f"---\n# 📊 Day {day} Executive Summary\n\n{summary}\n\n## ✅ Instructor's End-of-Day Checklist\n{checklist}\n\n---\n**Next Up: {next_up}**\n"))
    return {"nbformat":4,"nbformat_minor":5,"metadata":{"kernelspec":{"display_name":"Python 3","language":"python","name":"python3"},"language_info":{"name":"python","version":"3.12.0"}},"cells":cells}

def save(nb, path):
    with open(path,'w',encoding='utf-8') as f:
        json.dump(nb,f,ensure_ascii=False,indent=1)
    mc=sum(1 for c in nb['cells'] if c['cell_type']=='markdown')
    cc=sum(1 for c in nb['cells'] if c['cell_type']=='code')
    print(f"  OK {os.path.basename(path)} - {len(nb['cells'])} cells (md:{mc}, code:{cc})")
