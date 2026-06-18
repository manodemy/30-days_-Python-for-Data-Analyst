import os
import json
from sql_curriculum import SQL_CURRICULUM

def generate_notebooks():
    os.makedirs('notebooks/sql', exist_ok=True)
    
    curriculum = SQL_CURRICULUM
    
    for item in curriculum:
        day_num = item['day']
        formatted_day = f"Day{day_num:02d}"
        filename = f"{formatted_day}_SQL_Blank.ipynb"
        
        # Build cells list
        cells = []
        
        # Cell 0: Objective
        cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                f"## 🎯 Enterprise Objective: {item['title']}\n",
                f"{item['objective']}\n\n",
                f"### 📋 Database Source: `{item['db']}`\n\n",
                "Every cell in this notebook runs against this database on the server.\n"
            ]
        })
        
        # Sections
        for sec in item['sections']:
            # Header + theory
            theory_md = (
                f"<h2 style=\"color: #000000ff; background-color: #02fff2ff; border-left: 6px solid #0c0c0cff; padding: 12px 15px; margin-top: 40px; border-radius: 4px;\">\n"
                f"    <b>{sec['num']}. {sec['title']} : <span style=\"color: #070707ff; font-size: 0.85em; font-weight: normal;\">{sec['subtitle']}</span></b>\n"
                f"</h2>\n\n"
                f"<div style=\"border-left: 4px solid #4DB6AC; padding-left: 15px; margin: 15px 0; color: #CCCCCC;\">\n"
                f"    <b>🔍 Concept</b><br>\n"
                f"    {sec['theory']}\n"
                f"</div>"
            )
            cells.append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [theory_md]
            })
            
            # Demo code cell
            cells.append({
                "cell_type": "code",
                "metadata": {},
                "source": [sec['demo']],
                "outputs": [],
                "execution_count": None
            })
            
            # Concept check header
            cc_hdr = (
                f"<h3 style=\"color: #C7D2FE; background-color: #0e0e0fff; border-left: 6px solid #6366F1; padding: 12px 15px; margin-top: 50px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);\">\n"
                f"    <b>🧪 Concept Checks: <code>{sec['cc']}</code></b>\n"
                f"</h3>"
            )
            cells.append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [cc_hdr]
            })
            
            # Questions and code boxes
            for q in sec['questions']:
                cells.append({
                    "cell_type": "markdown",
                    "metadata": {},
                    "source": [f"### {q}\n"]
                })
                cells.append({
                    "cell_type": "code",
                    "metadata": {},
                    "source": ["-- Write your SQL query here\n"],
                    "outputs": [],
                    "execution_count": None
                })
                
        # Practice tasks
        cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "# 🛠️ Professional Practice Tasks\n",
                "Write SQL queries to solve the following tasks.\n"
            ]
        })
        for i, task in enumerate(item['tasks'], 1):
            cells.append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [f"### **Task {i} ({task['name']}):** {task['desc']}\n"]
            })
            cells.append({
                "cell_type": "code",
                "metadata": {},
                "source": ["-- Write your SQL query here\n"],
                "outputs": [],
                "execution_count": None
            })
            
        # Interview Questions
        cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "# 💻 Pure Coding Interview Questions\n"
            ]
        })
        for i, q in enumerate(item['interviews'], 1):
            cells.append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [f"---\n## Q{i}.\n### {q}\n"]
            })
            cells.append({
                "cell_type": "code",
                "metadata": {},
                "source": ["-- Write your SQL query here\n"],
                "outputs": [],
                "execution_count": None
            })
            
        # Final Summary
        cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                f"# 📊 Day {day_num} Executive Summary\n\n",
                f"{item.get('summary', '')}\n\n",
                f"\n",
                f"**Next Up: SQL Day {day_num + 1 if day_num < 18 else 'Complete'}**\n"
            ]
        })
        
        # Build full JSON notebook structure
        notebook_data = {
            "nbformat": 4,
            "nbformat_minor": 5,
            "metadata": {
                "kernelspec": {
                    "display_name": "SQL",
                    "language": "sql",
                    "name": "sql"
                },
                "language_info": {
                    "name": "sql"
                },
                "database": item['db']
            },
            "cells": cells
        }
        
        # Save to notebooks/sql/
        filepath = os.path.join('notebooks/sql', filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(notebook_data, f, indent=1, ensure_ascii=False)
            
        print(f"Generated {filepath} successfully with {len(cells)} cells.")

if __name__ == '__main__':
    generate_notebooks()
