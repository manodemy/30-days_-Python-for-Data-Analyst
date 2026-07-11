// Day 08 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day08'] = {
  "day": 8,
  "title": "CASE WHEN (Conditional Logic)",
  "db": "retail",
  "emoji": "\ud83d\udd00",
  "slides": [
    {
      "title": "Topic 01: CASE WHEN (Conditional Logic)",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udd00 Topic 01: CASE WHEN (Conditional Logic)</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What is CASE WHEN?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">CASE WHEN</code> is SQL's conditional expression \u2014 it's the equivalent of <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">IF/ELSE</code> from programming. It evaluates conditions row-by-row and returns a value based on the first matching condition.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Syntax: Simple CASE vs. Searched CASE</h3>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">Simple CASE (equality checks only)</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    employee_id,\n    department_id,\n    CASE department_id\n        WHEN 1 THEN 'Engineering'\n        WHEN 2 THEN 'Sales'\n        WHEN 3 THEN 'HR'\n        WHEN 4 THEN 'Finance'\n        ELSE 'Other'\n    END AS department_name\nFROM employees;</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">Searched CASE (any condition, most flexible)</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    employee_id,\n    salary,\n    CASE\n        WHEN salary &gt;= 100000 THEN 'Senior Level'\n        WHEN salary &gt;= 70000  THEN 'Mid Level'\n        WHEN salary &gt;= 40000  THEN 'Junior Level'\n        ELSE 'Entry Level'\n    END AS salary_band\nFROM employees;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Execution:</strong> <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">CASE WHEN</code> evaluates conditions <strong style=\"color:#f1f5f9;\">top to bottom</strong> and returns the value of the <strong style=\"color:#f1f5f9;\">first match</strong>. Once matched, it stops checking remaining conditions \u2014 order matters!</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">CASE WHEN in SELECT, WHERE, ORDER BY, GROUP BY</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- In SELECT (most common use)\nSELECT first_name,\n       CASE WHEN is_active THEN 'Active' ELSE 'Inactive' END AS status\nFROM employees;\n\n-- In ORDER BY (custom sort order)\nSELECT first_name, job_title\nFROM employees\nORDER BY\n    CASE job_title\n        WHEN 'CEO' THEN 1\n        WHEN 'VP' THEN 2\n        WHEN 'Director' THEN 3\n        ELSE 4\n    END;\n\n-- In GROUP BY (create dynamic categories)\nSELECT\n    CASE\n        WHEN salary &gt;= 100000 THEN 'High'\n        WHEN salary &gt;= 60000  THEN 'Medium'\n        ELSE 'Low'\n    END AS salary_bracket,\n    COUNT(*) AS headcount\nFROM employees\nGROUP BY\n    CASE\n        WHEN salary &gt;= 100000 THEN 'High'\n        WHEN salary &gt;= 60000  THEN 'Medium'\n        ELSE 'Low'\n    END;\n\n-- In WHERE (conditional filtering)\nSELECT *\nFROM orders\nWHERE\n    CASE\n        WHEN status = 'priority' THEN amount\n        ELSE 0\n    END &gt; 1000;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">CASE WHEN for Conditional Aggregation</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">This is the <strong style=\"color:#f1f5f9;\">most powerful</strong> and interview-frequent use of CASE WHEN.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Count by category in a SINGLE query (pivot-style)\nSELECT\n    COUNT(*)                                      AS total_employees,\n    COUNT(CASE WHEN department_id = 1 THEN 1 END) AS engineering_count,\n    COUNT(CASE WHEN department_id = 2 THEN 1 END) AS sales_count,\n    SUM(CASE WHEN is_active THEN salary ELSE 0 END) AS active_payroll,\n    AVG(CASE WHEN gender = 'F' THEN salary END)   AS avg_female_salary\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">IIF \u2014 Shorthand (SQL Server / Access)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- SQL Server shorthand for simple CASE:\nSELECT IIF(salary &gt; 70000, 'High', 'Low') AS pay_tier\nFROM employees;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Create a query that classifies products as 'High Price' (unit_price > 100) or 'Low Price' otherwise.",
      "referenceSql": "SELECT name, CASE WHEN unit_price > 100 THEN 'High Price' ELSE 'Low Price' END AS price_category FROM products;"
    },
    {
      "id": 2,
      "prompt": "Create a query to show employee salary grade: 'A' (salary > 100000), 'B' (salary between 70000 and 100000), or 'C' otherwise.",
      "referenceSql": "SELECT first_name, salary, CASE WHEN salary > 100000 THEN 'A' WHEN salary >= 70000 THEN 'B' ELSE 'C' END AS grade FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Find the total active employees count and inactive employees count using CASE WHEN inside COUNT.",
      "referenceSql": "SELECT COUNT(CASE WHEN is_active = 1 THEN 1 END) AS active_count, COUNT(CASE WHEN is_active = 0 THEN 1 END) AS inactive_count FROM employees;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Region Tier Class</strong><br/>Categorize customers as 'Tier 1' (North/South regions) or 'Tier 2' (East/West regions).",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Order Urgency Tag</strong><br/>Tag orders based on amount: 'Premium' (>500), 'Mid' (100-500), or 'Standard' (<100).",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Department Budget Level</strong><br/>Label departments as 'High Budget' (>2000000) or 'Normal Budget'.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 10,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 15,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Evaluate employee salaries, labeling those earning > 80,000 as 'High' and others as 'Standard' in a column aliased as 'tier'.",
      "ref": "SELECT first_name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS tier FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: CASE WHEN (Conditional Logic)",
      "recordingKey": null
    }
  ]
};
