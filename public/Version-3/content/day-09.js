// Day 09 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day09'] = {
  "day": 9,
  "title": "Understanding Relationships & INNER JOIN",
  "db": "retail",
  "emoji": "\ud83d\udd17",
  "slides": [
    {
      "title": "Topic 01: Understanding Relationships & INNER JOIN",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udd17 Topic 01: Understanding Relationships & INNER JOIN</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Why JOINs Exist</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">In a normalized relational database, data is split across multiple tables to avoid redundancy. JOINs <strong style=\"color:#f1f5f9;\">reassemble</strong> this data when needed for querying. The cost of JOIN operations is why query optimization matters \u2014 JOIN runs at <strong style=\"color:#f1f5f9;\">Step 2</strong> of the SQL Order of Execution.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Types of JOINs (Overview)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">INNER JOIN      \u2014 Only matching rows from BOTH tables\nLEFT JOIN       \u2014 All rows from left + matching rows from right\nRIGHT JOIN      \u2014 All rows from right + matching rows from left\nFULL OUTER JOIN \u2014 All rows from both tables\nCROSS JOIN      \u2014 Every row from left combined with every row from right (Cartesian product)\nSELF JOIN       \u2014 A table joined to itself</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">INNER JOIN \u2014 The Most Common JOIN</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Returns only rows where the join condition is <strong style=\"color:#f1f5f9;\">TRUE in both tables</strong>.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Basic INNER JOIN syntax\nSELECT\n    e.employee_id,\n    e.first_name,\n    e.last_name,\n    d.department_name,\n    e.salary\nFROM employees e\nINNER JOIN departments d\n    ON e.department_id = d.department_id;\n-- Only employees WITH a matching department appear in results\n-- Employees with NULL department_id are EXCLUDED</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Table Aliases \u2014 Best Practice</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Always use short aliases for readability\nFROM employees e\nFROM departments d\nFROM orders o\nFROM customers c\nFROM products p\n\n-- Multi-table join with aliases\nSELECT\n    e.first_name,\n    e.last_name,\n    d.department_name,\n    j.job_title_description\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id\nINNER JOIN job_levels j ON e.job_level_id = j.job_level_id;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">JOIN on Multiple Conditions (Composite Join)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Join on more than one column\nSELECT *\nFROM orders o\nINNER JOIN order_items oi\n    ON o.order_id = oi.order_id\n   AND o.tenant_id = oi.tenant_id;  -- Multi-tenant safety check</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">JOIN with WHERE (Filtering After JOIN)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Filter after joining\nSELECT e.first_name, d.department_name, e.salary\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id\nWHERE e.salary &gt; 60000\n  AND d.department_name = 'Engineering';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Equi-Join vs. Non-Equi Join</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Equi-Join (equality condition \u2014 most common)\nON e.department_id = d.department_id\n\n-- Non-Equi Join (range or inequality condition)\nSELECT e.first_name, e.salary, sg.grade\nFROM employees e\nINNER JOIN salary_grades sg\n    ON e.salary BETWEEN sg.min_salary AND sg.max_salary;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Understanding the Result Set</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- employees: 100 rows\n-- departments: 10 rows\n-- After INNER JOIN: could be 0 to many rows\n-- If every employee has a valid department_id \u2192 100 rows\n-- If 5 employees have NULL department_id \u2192 95 rows\n-- If all department_ids are invalid \u2192 0 rows</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write an INNER JOIN query to show employees first_name and their department_name.",
      "referenceSql": "SELECT e.first_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 2,
      "prompt": "Write a query to list all projects that employees are assigned to, showing employee name and project name.",
      "referenceSql": "SELECT e.first_name, p.name FROM employees e INNER JOIN emp_projects ep ON e.employee_id = ep.emp_id INNER JOIN projects p ON ep.project_id = p.id;"
    },
    {
      "id": 3,
      "prompt": "Find the total budget of departments that have active employees.",
      "referenceSql": "SELECT DISTINCT d.department_name, d.budget FROM departments d INNER JOIN employees e ON d.department_id = e.department_id WHERE e.is_active = 1;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Employee Managers</strong><br/>Join employees table with departments to display department name and manager id.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Project Assignment Roles</strong><br/>List employee first_name, project name, and role for all assigned projects.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Active DS Staff</strong><br/>Retrieve active employees working in 'Data Science' department using INNER JOIN.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 2,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 3,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 4,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 5,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 6,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 7,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 8,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 9,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 10,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 11,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 12,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 13,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 14,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 15,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 16,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 17,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 18,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 19,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 20,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 21,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 22,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 23,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 24,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 25,
      "prompt": "INNER JOIN employees with departments, returning first_name, last_name, and department_name.",
      "ref": "SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Understanding Relationships & INNER JOIN",
      "recordingKey": null
    }
  ]
};
