// Day 13 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day13'] = {
  "day": 13,
  "title": "CTEs (Common Table Expressions)",
  "db": "retail",
  "emoji": "\ud83c\udfd7\ufe0f",
  "slides": [
    {
      "title": "Topic 01: CTEs (Common Table Expressions)",
      "duration": "0:00",
      "html": "\n            <h2>\ud83c\udfd7\ufe0f Topic 01: CTEs (Common Table Expressions)</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What is a CTE?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">A Common Table Expression (CTE) is a <strong style=\"color:#f1f5f9;\">named, temporary result set</strong> defined with the <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WITH</code> keyword at the start of a query. It exists only for the duration of the query execution.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Basic CTE Syntax</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">WITH cte_name AS (\n    -- Your subquery here\n    SELECT ...\n    FROM ...\n    WHERE ...\n)\nSELECT *\nFROM cte_name;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">CTE vs. Derived Table vs. Subquery</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Feature</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Subquery</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Derived Table</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">CTE</th></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Reusability</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Once</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Once</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Multiple times in same query</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Readability</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Low</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Medium</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">High</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Recursion</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">No</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">No</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Yes (recursive CTE)</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Debug-friendliness</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Hard</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Medium</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Easy (run inner part alone)</td></tr>\n</table></div>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Multiple CTEs in One Query</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">WITH\ndept_averages AS (\n    SELECT department_id, AVG(salary) AS avg_salary\n    FROM employees\n    GROUP BY department_id\n),\ntop_departments AS (\n    SELECT department_id\n    FROM dept_averages\n    WHERE avg_salary &gt; 70000\n)\nSELECT e.first_name, e.salary, e.department_id\nFROM employees e\nINNER JOIN top_departments td ON e.department_id = td.department_id;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Recursive CTE \u2014 Organizational Hierarchy</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Recursive CTEs allow querying hierarchical data (like org charts, bill of materials, category trees).</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">WITH RECURSIVE org_chart AS (\n    -- Anchor member: top-level employees (no manager)\n    SELECT employee_id, first_name, manager_id, 1 AS level\n    FROM employees\n    WHERE manager_id IS NULL\n\n    UNION ALL\n\n    -- Recursive member: find employees managed by previous level\n    SELECT e.employee_id, e.first_name, e.manager_id, oc.level + 1\n    FROM employees e\n    INNER JOIN org_chart oc ON e.manager_id = oc.employee_id\n)\nSELECT employee_id, first_name, level\nFROM org_chart\nORDER BY level, employee_id;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">CTE Best Practices</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- CTEs improve readability of complex analytics\nWITH\nmonthly_sales AS (\n    SELECT\n        EXTRACT(MONTH FROM order_date) AS month,\n        SUM(amount) AS total_sales\n    FROM orders\n    WHERE EXTRACT(YEAR FROM order_date) = 2024\n    GROUP BY EXTRACT(MONTH FROM order_date)\n),\nmonthly_avg AS (\n    SELECT AVG(total_sales) AS avg_monthly_sales\n    FROM monthly_sales\n)\nSELECT\n    ms.month,\n    ms.total_sales,\n    ma.avg_monthly_sales,\n    ms.total_sales - ma.avg_monthly_sales AS diff_from_avg\nFROM monthly_sales ms, monthly_avg ma\nORDER BY ms.month;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Performance Note:</strong> In PostgreSQL, CTEs are <strong style=\"color:#f1f5f9;\">optimization fences</strong> by default (pre-v12). The planner cannot optimize the CTE and outer query together. Use <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WITH ... AS MATERIALIZED</code> or <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">AS NOT MATERIALIZED</code> to control this. In newer versions, the optimizer is smarter.</blockquote>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a simple CTE to calculate average order amount, then query it.",
      "referenceSql": "WITH AvgOrder AS (SELECT AVG(total_amount) AS avg_amt FROM orders) SELECT * FROM orders, AvgOrder WHERE total_amount > avg_amt;"
    },
    {
      "id": 2,
      "prompt": "Write a query using a CTE to count orders per customer, and find customers with more than 1 order.",
      "referenceSql": "WITH CustOrders AS (SELECT customer_id, COUNT(*) AS ord_count FROM orders GROUP BY customer_id) SELECT * FROM CustOrders WHERE ord_count > 1;"
    },
    {
      "id": 3,
      "prompt": "Write a query with two CTEs: one for department budget averages and one for employee salaries.",
      "referenceSql": "WITH DeptAvg AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id), HighEarners AS (SELECT * FROM employees) SELECT * FROM HighEarners h JOIN DeptAvg d ON h.department_id = d.department_id WHERE h.salary > d.avg_sal;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Customer Orders CTE</strong><br/>Calculate order summaries per client. Use a CTE to calculate total spent and count of orders per customer_id.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Top Priced Products CTE</strong><br/>Find products priced higher than average category price. Use a CTE to pre-calculate average price per category_id.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Active Reps Sales CTE</strong><br/>Calculate average sales per rep. Use a CTE to aggregate sales amount grouped by product_id.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 2,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 3,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 4,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 5,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 6,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 7,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 8,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 9,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 10,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 11,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 12,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 13,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 14,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 15,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 16,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 17,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 18,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 19,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 20,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 21,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 22,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 23,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 24,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    },
    {
      "id": 25,
      "prompt": "Write a CTE named high_earners to filter employees earning > 70000, then SELECT everything from it.",
      "ref": "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: CTEs (Common Table Expressions)",
      "recordingKey": null
    }
  ]
};
