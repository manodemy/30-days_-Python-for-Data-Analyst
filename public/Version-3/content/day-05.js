// Day 05 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day05'] = {
  "day": 5,
  "title": "Aggregate Functions",
  "db": "retail",
  "emoji": "\ud83d\udcca",
  "slides": [
    {
      "title": "Topic 01: Aggregate Functions",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udcca Topic 01: Aggregate Functions</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What are Aggregate Functions?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Aggregate functions collapse <strong style=\"color:#f1f5f9;\">multiple rows</strong> into a <strong style=\"color:#f1f5f9;\">single result value</strong>. They perform calculations across a set of rows.</p>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Execution context:</strong> Aggregate functions run during the <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code> phase \u2014 but they operate on the row groups produced after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WHERE</code> and <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code> have been processed.</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Core Aggregate Functions</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">COUNT(*)          -- Count all rows (including NULLs)\nCOUNT(column)     -- Count non-NULL values in column\nSUM(column)       -- Sum of all non-NULL values\nAVG(column)       -- Average of all non-NULL values\nMIN(column)       -- Minimum value (works on numbers, dates, text)\nMAX(column)       -- Maximum value (works on numbers, dates, text)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Practical Examples</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Global aggregations (across the entire table)\nSELECT\n    COUNT(*)                    AS total_employees,\n    COUNT(commission)           AS employees_with_commission,\n    SUM(salary)                 AS total_payroll,\n    AVG(salary)                 AS average_salary,\n    MIN(salary)                 AS lowest_salary,\n    MAX(salary)                 AS highest_salary,\n    MAX(hire_date)              AS most_recent_hire,\n    MIN(hire_date)              AS earliest_hire\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">COUNT Nuances</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- COUNT(*): counts all rows regardless of NULLs\nSELECT COUNT(*) FROM employees;  -- Returns: 500\n\n-- COUNT(column): counts only non-NULL values\nSELECT COUNT(manager_id) FROM employees;  -- Returns: 490 (if 10 have NULL)\n\n-- COUNT(DISTINCT column): counts unique non-NULL values\nSELECT COUNT(DISTINCT department_id) FROM employees;  -- Returns: 8 (if 8 departments)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">AVG and NULL</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- AVG ignores NULLs \u2014 this can be misleading\nSELECT AVG(commission) FROM employees;\n-- If 100 employees have commission, only those 100 are averaged\n-- If you want average across ALL employees (treating NULL as 0):\nSELECT AVG(COALESCE(commission, 0)) FROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Combining Aggregates with WHERE</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Aggregates after filtering\nSELECT\n    COUNT(*)    AS dept3_headcount,\n    AVG(salary) AS dept3_avg_salary,\n    MAX(salary) AS dept3_top_salary\nFROM employees\nWHERE department_id = 3;\n-- WHERE runs first (filters to dept 3 rows), then aggregates apply</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">ROUND \u2014 Formatting Aggregate Results</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT ROUND(AVG(salary), 2) AS avg_salary  -- Round to 2 decimal places\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">STRING_AGG / GROUP_CONCAT \u2014 Aggregating Text</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- PostgreSQL: concatenate names into a comma-separated list\nSELECT STRING_AGG(first_name, ', ' ORDER BY first_name) AS all_names\nFROM employees\nWHERE department_id = 3;\n\n-- MySQL equivalent\nSELECT GROUP_CONCAT(first_name ORDER BY first_name SEPARATOR ', ') AS all_names\nFROM employees\nWHERE department_id = 3;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find the total number of employees in the company.",
      "referenceSql": "SELECT COUNT(*) FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Find the average salary and total salary of all active employees.",
      "referenceSql": "SELECT AVG(salary), SUM(salary) FROM employees WHERE is_active = 1;"
    },
    {
      "id": 3,
      "prompt": "Find the minimum and maximum unit_price of products in category_id 1.",
      "referenceSql": "SELECT MIN(unit_price), MAX(unit_price) FROM products WHERE category_id = 1;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Total Active Users</strong><br/>Find the total number of customers signed up in region 'North'.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Category Inventory Valuation</strong><br/>Calculate the total inventory value (stock_qty * unit_price) for all products.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Salary Distribution metrics</strong><br/>Retrieve average salary, min salary, and max salary for Data Analysts.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 10,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 15,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Aggregate Functions",
      "recordingKey": null
    }
  ]
};
