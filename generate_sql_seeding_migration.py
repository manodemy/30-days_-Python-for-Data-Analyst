import json
import os
import re
from pathlib import Path
from server import parse_notebook

def generate_seeding_migration():
    nb_dir = Path('notebooks/sql')
    out_path = Path('supabase/migrations/043_seed_sql_notebooks.sql')
    
    # Header of the migration file
    sql_lines = [
        "-- ═══════════════════════════════════════════════════════════════",
        "-- Seed Notebook Content: SQL Days 01 to 18",
        "-- ═══════════════════════════════════════════════════════════════",
        "",
        "INSERT INTO public.notebook_content (day_id, title, html_body, sections, cells)",
        "VALUES"
    ]
    
    values = []
    
    for day in range(1, 19):
        filename = f"Day{day:02d}_SQL_Blank.ipynb"
        nb_path = nb_dir / filename
        
        if not nb_path.exists():
            print(f"Error: {filename} does not exist!")
            continue
            
        # Parse the notebook using server.py logic
        body, secs, cid = parse_notebook(str(nb_path), day)
        
        # Load the original JSON to get the title
        with open(nb_path, 'r', encoding='utf-8') as f:
            nb_data = json.load(f)
            
        # Format the title
        day_title = nb_data['cells'][0]['source'][1].replace('## 🎯 Enterprise Objective: ', '').strip()
        full_title = f"SQL Day {day:02d}: {day_title}"
        
        day_id = f"sql-day{day:02d}"
        
        # Create sections JSON list
        sections_list = [{"anchor": a, "title": t} for a, t in secs]
        sections_json = json.dumps(sections_list, ensure_ascii=False)
        
        # Create cells JSON list (simple metadata matching how the database was built)
        cells_list = []
        code_idx = 1
        for cell in nb_data['cells']:
            if cell['cell_type'] == 'code':
                cells_list.append({
                    "id": f"cell-{code_idx}",
                    "type": "code"
                })
                code_idx += 1
            else:
                cells_list.append({
                    "type": "markdown"
                })
        cells_json = json.dumps(cells_list, ensure_ascii=False)
        
        # Escape single quotes in HTML body and title for SQL syntax
        escaped_title = full_title.replace("'", "''")
        escaped_body = body.replace("'", "''")
        escaped_sections = sections_json.replace("'", "''")
        escaped_cells = cells_json.replace("'", "''")
        
        # Build SQL VALUE tuple
        value_tuple = f"('{day_id}', '{escaped_title}', '{escaped_body}', '{escaped_sections}'::jsonb, '{escaped_cells}'::jsonb)"
        values.append(value_tuple)
        
    # Join value tuples with commas and add ON CONFLICT upsert clause
    sql_lines.append(
        ",\n".join(values) +
        "\nON CONFLICT (day_id) DO UPDATE SET\n"
        "  title      = EXCLUDED.title,\n"
        "  html_body  = EXCLUDED.html_body,\n"
        "  sections   = EXCLUDED.sections,\n"
        "  cells      = EXCLUDED.cells;"
    )
    
    # Write to file
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql_lines) + "\n")
        
    print(f"Successfully generated database seed migration at {out_path}")

if __name__ == '__main__':
    generate_seeding_migration()
