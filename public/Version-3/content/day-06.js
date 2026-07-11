// Day 06 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day06'] = {
  "day": 6,
  "title": "GROUP BY & HAVING",
  "db": "retail",
  "emoji": "\ud83d\uddc3\ufe0f",
  "slides": [
    {
      "title": "Topic 01: GROUP BY & HAVING",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\uddc3\ufe0f Topic 01: GROUP BY & HAVING</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">GROUP BY \u2014 Aggregating by Category</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code> collapses rows with the same value in specified columns into single summary rows. It runs at <strong style=\"color:#f1f5f9;\">Step 4</strong> of the SQL Order of Execution \u2014 after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WHERE</code>, before <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code>.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Without GROUP BY: one row with global aggregate\nSELECT AVG(salary) FROM employees;  -- Returns: 65000\n\n-- With GROUP BY: one row per department\nSELECT department_id, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id;\n-- Returns 8 rows (one per unique department_id)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">The Golden Rule of GROUP BY</h3>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Every column in <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code> must either be in <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code> or inside an aggregate function.</strong></blockquote>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- \u274c WRONG: first_name is neither grouped nor aggregated\nSELECT department_id, first_name, AVG(salary)\nFROM employees\nGROUP BY department_id;\n\n-- \u2705 CORRECT: all non-aggregate SELECT columns are in GROUP BY\nSELECT department_id, job_title, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id, job_title;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">GROUP BY with Multiple Columns</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Breakdown: average salary per department AND per job title\nSELECT\n    department_id,\n    job_title,\n    COUNT(*)    AS headcount,\n    AVG(salary) AS avg_salary,\n    MIN(salary) AS min_salary,\n    MAX(salary) AS max_salary\nFROM employees\nGROUP BY department_id, job_title\nORDER BY department_id, avg_salary DESC;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">HAVING \u2014 Filter on Groups</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">HAVING</code> is the group-level equivalent of <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WHERE</code>. It runs at <strong style=\"color:#f1f5f9;\">Step 5</strong> \u2014 after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code>, before <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code>.</p>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Filters</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Individual rows</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Groups</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Execution Step</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Step 3 (before GROUP BY)</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Step 5 (after GROUP BY)</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Can use aggregates?</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\u274c No</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\u2705 Yes</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Can use aliases?</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\u274c No</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">\u274c No (in standard SQL)</td></tr>\n</table></div>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Find departments with more than 10 employees AND average salary &gt; 60000\nSELECT\n    department_id,\n    COUNT(*)    AS headcount,\n    AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) &gt; 10\n   AND AVG(salary) &gt; 60000\nORDER BY avg_salary DESC;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">WHERE vs HAVING Together \u2014 Performance Matters</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Filter BEFORE grouping (preferred for performance):\nSELECT department_id, AVG(salary)\nFROM employees\nWHERE is_active = TRUE         -- Pre-filter: reduces rows before grouping\nGROUP BY department_id\nHAVING COUNT(*) &gt;= 5;          -- Post-filter: applied on groups\n\n-- Why: WHERE reduces the row set before GROUP BY processes it.\n-- Filtering inactive employees with HAVING would group them first (wasteful).</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">GROUP BY Expressions</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Group by derived expressions\nSELECT\n    EXTRACT(YEAR FROM hire_date) AS hire_year,\n    COUNT(*) AS hires_per_year\nFROM employees\nGROUP BY EXTRACT(YEAR FROM hire_date)  -- must repeat the expression\nORDER BY hire_year;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">ROLLUP \u2014 Subtotals and Grand Totals</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- ROLLUP adds subtotal and grand total rows\nSELECT department_id, job_title, COUNT(*) AS headcount\nFROM employees\nGROUP BY ROLLUP(department_id, job_title);\n-- Produces: detail rows + department subtotals + grand total</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find the number of employees in each department.",
      "referenceSql": "SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;"
    },
    {
      "id": 2,
      "prompt": "Find the average salary for each job_title, showing only job titles with average salary > 60000.",
      "referenceSql": "SELECT job_title, AVG(salary) FROM employees GROUP BY job_title HAVING AVG(salary) > 60000;"
    },
    {
      "id": 3,
      "prompt": "Find the total amount spent by each customer on orders, showing only customers who spent more than 500.",
      "referenceSql": "SELECT customer_id, SUM(total_amount) FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 500;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Region Signups Count</strong><br/>Find the total number of customer signups in each region.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Product Category Valuation</strong><br/>Calculate total stock and average price for each product category_id.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: High Sales Reps</strong><br/>Identify sales reps with high average sales. Find average amount in sales grouped by product_id, having average amount > 10000.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 2,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 3,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 4,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 5,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 6,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 7,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 8,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 9,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 10,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 11,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 12,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 13,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 14,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 15,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 16,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 17,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 18,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 19,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 20,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 21,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 22,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 23,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 24,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    },
    {
      "id": 25,
      "prompt": "Group employees by department_id, showing the number of employees and average salary for each group.",
      "ref": "SELECT department_id, COUNT(*) AS num_emps, AVG(salary) AS avg_sal FROM employees GROUP BY department_id;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: GROUP BY & HAVING",
      "recordingKey": null
    }
  ]
};
