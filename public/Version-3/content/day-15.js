// Day 15 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day15'] = {
  "day": 15,
  "title": "Window Functions Part 2 (Analytic)",
  "db": "retail",
  "emoji": "\ud83d\udcc8",
  "slides": [
    {
      "title": "Topic 01: Window Functions Part 2 (Analytic)",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udcc8 Topic 01: Window Functions Part 2 (Analytic)</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Analytic Window Functions</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">These functions look at rows before and after the current row to compute running totals, moving averages, lead/lag comparisons, and cumulative sums.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LAG and LEAD \u2014 Accessing Adjacent Rows</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- LAG: access the previous row's value\n-- LEAD: access the next row's value\nLAG(column, offset, default)  OVER (PARTITION BY ... ORDER BY ...)\nLEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)\n\n-- Month-over-month sales comparison\nSELECT\n    month,\n    total_sales,\n    LAG(total_sales, 1, 0) OVER (ORDER BY month) AS prev_month_sales,\n    total_sales - LAG(total_sales, 1, 0) OVER (ORDER BY month) AS mom_change\nFROM monthly_sales;\n\n-- Predict next month (or peek at next row)\nSELECT\n    order_date,\n    amount,\n    LEAD(amount) OVER (ORDER BY order_date) AS next_order_amount\nFROM orders;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">SUM OVER \u2014 Running Total (Cumulative Sum)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    order_date,\n    amount,\n    SUM(amount) OVER (\n        ORDER BY order_date\n        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) AS running_total\nFROM orders;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Window Frame Clause \u2014 Controlling the Window</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- ROWS vs. RANGE:\nROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- cumulative from start to current row\nROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING          -- 3-row moving window (prev, current, next)\nRANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW  -- 7-day rolling window (by date value)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Moving/Rolling Average</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- 3-month rolling average of sales\nSELECT\n    month,\n    total_sales,\n    AVG(total_sales) OVER (\n        ORDER BY month\n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW  -- current + 2 prior months\n    ) AS rolling_3m_avg\nFROM monthly_sales;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">FIRST_VALUE and LAST_VALUE</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    employee_id,\n    salary,\n    department_id,\n    FIRST_VALUE(salary) OVER (\n        PARTITION BY department_id\n        ORDER BY salary DESC\n    ) AS dept_max_salary,   -- Highest salary in department (same for all rows in dept)\n    LAST_VALUE(salary) OVER (\n        PARTITION BY department_id\n        ORDER BY salary DESC\n        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n    ) AS dept_min_salary    -- IMPORTANT: must extend frame to include all rows\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">PERCENT_RANK and CUME_DIST</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    salary,\n    PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,  -- 0 to 1\n    CUME_DIST() OVER (ORDER BY salary) AS cume_dist      -- 0 to 1\nFROM employees;\n\n-- Practical: what percentile is an employee in?\nSELECT first_name, salary,\n       ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 2) AS salary_percentile\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Combining Window Functions for Complex Analysis</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Year-over-year growth analysis\nWITH yearly_revenue AS (\n    SELECT\n        EXTRACT(YEAR FROM order_date) AS year,\n        SUM(amount) AS revenue\n    FROM orders\n    GROUP BY EXTRACT(YEAR FROM order_date)\n)\nSELECT\n    year,\n    revenue,\n    LAG(revenue) OVER (ORDER BY year)                           AS prev_year_revenue,\n    ROUND((revenue - LAG(revenue) OVER (ORDER BY year))\n          / LAG(revenue) OVER (ORDER BY year) * 100, 2)         AS yoy_growth_pct,\n    SUM(revenue) OVER (ORDER BY year)                           AS cumulative_revenue\nFROM yearly_revenue;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to compare each employee's salary to the previous employee's salary (sorted by salary DESC) using LAG().",
      "referenceSql": "SELECT first_name, salary, LAG(salary) OVER (ORDER BY salary DESC) AS prev_sal FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Write a query to find the difference between each product's unit_price and the next product's price (sorted by price ASC) using LEAD().",
      "referenceSql": "SELECT name, unit_price, LEAD(unit_price) OVER (ORDER BY unit_price ASC) - unit_price AS diff FROM products;"
    },
    {
      "id": 3,
      "prompt": "Write a running total of order amounts sorted by order_date using SUM() OVER.",
      "referenceSql": "SELECT order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date) AS running_total FROM orders;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Salary Growth Tracker</strong><br/>Find history of employee salaries. Compare current salary to next salary using LEAD().",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Customer Signup Flow</strong><br/>Calculate a running count of customer signups sorted by signup_date.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Sales Volume Growth</strong><br/>Compare sales revenue of each transaction with the previous transaction using LAG().",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 2,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 3,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 4,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 5,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 6,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 7,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 8,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 9,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 10,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 11,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 12,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 13,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 14,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 15,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 16,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 17,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 18,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 19,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 20,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 21,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 22,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 23,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 24,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    },
    {
      "id": 25,
      "prompt": "For each employee, retrieve their salary and the next lower salary using the LAG window function.",
      "ref": "SELECT first_name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Window Functions Part 2 (Analytic)",
      "recordingKey": null
    }
  ]
};
