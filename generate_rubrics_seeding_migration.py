import os
import json
import re
from pathlib import Path

def is_question(s):
    stripped = s.strip()
    return stripped.startswith('### **Q') or (stripped.startswith('### ') and not stripped.startswith('### **Task') and not 'Concept Checks' in stripped and not 'Database Source' in stripped)

def is_task(s):           return s.strip().startswith('### **Task')
def is_interview_q(s):
    clean = s.replace('---', '').strip()
    return bool(re.match(r'^##\s*Q\d+', clean)) or bool(re.match(r'^###\s*Q\d+', clean))

def generate_rubrics():
    sql_dir = Path('notebooks/sql')
    excel_dir = Path('notebooks/excel')
    out_path = Path('supabase/migrations/045_seed_rubrics.sql')
    
    # Ensure migrations directory exists
    os.makedirs('supabase/migrations', exist_ok=True)
    
    inserts = []
    
    # 1. SQL Days 1 to 18
    for day in range(1, 19):
        filename = f"Day{day:02d}_SQL_Blank.ipynb"
        nb_path = sql_dir / filename
        if not nb_path.exists(): continue
        
        with open(nb_path, 'r', encoding='utf-8') as f:
            nb = json.load(f)
            
        code_idx = 0
        last_question = None
        
        for c in nb['cells']:
            ct = c['cell_type']
            src = ''.join(c['source']).strip()
            
            # Skip copyright or empty
            if not src or '©' in src or 'copyright' in src.lower() or ('manodemy' in src.lower() and ('copyright' in src.lower() or 'all rights' in src.lower() or 'protected' in src.lower())):
                continue
                
            if ct == 'markdown':
                if is_question(src) or is_task(src) or is_interview_q(src):
                    last_question = src
            elif ct == 'code':
                code_idx += 1
                if last_question:
                    # Clean up question text for DB
                    clean_q = last_question.replace('### ', '').replace('## ', '').strip()
                    day_id = f"sql-day{day:02d}"
                    cell_id = f"cell-{code_idx}"
                    inserts.append((day_id, cell_id, clean_q, 'sql'))
                    last_question = None
                    
    # 2. Excel Days 1 to 12
    for day in range(1, 13):
        filename = f"Day{day:02d}_Excel_Blank.ipynb"
        nb_path = excel_dir / filename
        if not nb_path.exists(): continue
        
        with open(nb_path, 'r', encoding='utf-8') as f:
            nb = json.load(f)
            
        code_idx = 0
        last_question = None
        
        for c in nb['cells']:
            ct = c['cell_type']
            src = ''.join(c['source']).strip()
            
            if not src or '©' in src or 'copyright' in src.lower() or ('manodemy' in src.lower() and ('copyright' in src.lower() or 'all rights' in src.lower() or 'protected' in src.lower())):
                continue
                
            if ct == 'markdown':
                if is_question(src) or is_task(src) or is_interview_q(src):
                    last_question = src
            elif ct == 'code':
                code_idx += 1
                if last_question:
                    clean_q = last_question.replace('### ', '').replace('## ', '').strip()
                    day_id = f"excel-day{day:02d}"
                    cell_id = f"cell-{code_idx}"
                    inserts.append((day_id, cell_id, clean_q, 'excel'))
                    last_question = None

    # Write SQL migration
    sql_lines = [
        "-- ═══════════════════════════════════════════════════════════════",
        "-- Migration: 045_seed_rubrics.sql",
        "-- Description: Seed grading rubrics for SQL and Excel courses.",
        "-- ═══════════════════════════════════════════════════════════════",
        "",
        "INSERT INTO public.grading_rubrics (day_id, cell_id, question_text, kernel, marks, ignore_tokens)",
        "VALUES"
    ]
    
    values = []
    for day_id, cell_id, q_text, kernel in inserts:
        escaped_q = q_text.replace("'", "''")
        values.append(f"('{day_id}', '{cell_id}', '{escaped_q}', '{kernel}', 10, '{{}}')")
        
    sql_lines.append(",\n".join(values) + "\nON CONFLICT (day_id, cell_id) DO UPDATE SET question_text = EXCLUDED.question_text, kernel = EXCLUDED.kernel;")
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql_lines) + "\n")
        
    print(f"Generated rubrics seed migration at {out_path} with {len(inserts)} questions.")

if __name__ == '__main__':
    generate_rubrics()
