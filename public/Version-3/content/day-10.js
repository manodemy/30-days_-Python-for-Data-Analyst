// Day 10 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day10'] = {
  "day": 10,
  "title": "LEFT, RIGHT & FULL OUTER JOIN",
  "db": "retail",
  "emoji": "\ud83d\udd04",
  "slides": [
    {
      "title": "Topic 01: LEFT, RIGHT & FULL OUTER JOIN",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udd04 Topic 01: LEFT, RIGHT & FULL OUTER JOIN</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LEFT JOIN (LEFT OUTER JOIN)</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Returns <strong style=\"color:#f1f5f9;\">all rows from the LEFT table</strong> + matching rows from the right table. If no match exists in the right table, the right-side columns are filled with <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NULL</code>.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- ALL employees, even those with no department\nSELECT\n    e.first_name,\n    e.last_name,\n    d.department_name  -- NULL for unmatched employees\nFROM employees e\nLEFT JOIN departments d\n    ON e.department_id = d.department_id;\n-- Every employee row appears; unmatched employees show NULL for department columns</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">RIGHT JOIN (RIGHT OUTER JOIN)</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Returns <strong style=\"color:#f1f5f9;\">all rows from the RIGHT table</strong> + matching rows from the left table. Right JOINs can always be rewritten as LEFT JOINs (just swap table order) \u2014 most developers prefer LEFT JOIN for consistency.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- ALL departments, even those with no employees\nSELECT\n    e.first_name,       -- NULL if no employees in this department\n    d.department_name\nFROM employees e\nRIGHT JOIN departments d\n    ON e.department_id = d.department_id;\n\n-- Equivalent LEFT JOIN (preferred style):\nSELECT\n    e.first_name,\n    d.department_name\nFROM departments d\nLEFT JOIN employees e\n    ON e.department_id = d.department_id;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">FULL OUTER JOIN</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Returns <strong style=\"color:#f1f5f9;\">all rows from BOTH tables</strong>. NULLs fill in for unmatched sides.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    e.first_name,\n    d.department_name\nFROM employees e\nFULL OUTER JOIN departments d\n    ON e.department_id = d.department_id;\n-- Rows: employees without dept (NULL dept name) + depts without employees (NULL names)</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">MySQL does not support FULL OUTER JOIN natively.</strong> Simulate it with UNION:</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">```sql</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">SELECT e.first_name, d.department_name</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">UNION</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">SELECT e.first_name, d.department_name</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id;</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">```</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Finding Unmatched Rows (Anti-Join Pattern)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Find employees who have NO department (dangling employees)\nSELECT e.first_name, e.employee_id\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id\nWHERE d.department_id IS NULL;  -- The IS NULL check on the right table = \"no match\"\n\n-- Find departments with NO employees\nSELECT d.department_name\nFROM departments d\nLEFT JOIN employees e ON e.department_id = d.department_id\nWHERE e.employee_id IS NULL;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Anti-Join is one of the most important data quality patterns in analytics.</strong></blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LEFT JOIN vs. INNER JOIN: Choosing the Right One</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Question</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Use</th></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\"Show me all X even if there's no matching Y\"</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">LEFT JOIN</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\"Show me only X that have a matching Y\"</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">INNER JOIN</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\"Find X that do NOT have a matching Y\"</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">LEFT JOIN + WHERE right_key IS NULL</td></tr>\n</table></div>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Multiple LEFT JOINs</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    e.first_name,\n    d.department_name,\n    m.first_name AS manager_name  -- NULL if no manager\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id\nLEFT JOIN employees m ON e.manager_id = m.employee_id;\n-- Even employees with no manager are included</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a LEFT JOIN query to list all departments and their employees (including departments with no employees).",
      "referenceSql": "SELECT d.department_name, e.first_name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id;"
    },
    {
      "id": 2,
      "prompt": "Write a query to list all employees and the project names they are working on (including employees with no projects).",
      "referenceSql": "SELECT e.first_name, p.name FROM employees e LEFT JOIN emp_projects ep ON e.employee_id = ep.emp_id LEFT JOIN projects p ON ep.project_id = p.id;"
    },
    {
      "id": 3,
      "prompt": "Find the count of employees in each department using LEFT JOIN so departments with 0 employees are listed.",
      "referenceSql": "SELECT d.department_name, COUNT(e.employee_id) FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: All Departments Audit</strong><br/>Generate a list of all department names and their employees. Sort by department name.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Unassigned Project Check</strong><br/>Identify projects that have no employees assigned. (Hint: left join projects with emp_projects and filter where emp_id IS NULL).",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Employees Project Mapping</strong><br/>List employee first_name and role. Include employees who are currently not assigned to any projects.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 2,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 3,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 4,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 5,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 6,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 7,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 8,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 9,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 10,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 11,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 12,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 13,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 14,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 15,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 16,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 17,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 18,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 19,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 20,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 21,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 22,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 23,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 24,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    },
    {
      "id": 25,
      "prompt": "Perform a LEFT JOIN between employees and departments, projecting first_name and department_name.",
      "ref": "SELECT e.first_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: LEFT, RIGHT & FULL OUTER JOIN",
      "recordingKey": null
    }
  ]
};
