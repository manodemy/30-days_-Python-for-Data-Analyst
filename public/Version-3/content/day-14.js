// Day 14 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day14'] = {
  "day": 14,
  "title": "Window Functions Part 1 (Ranking)",
  "db": "retail",
  "emoji": "\ud83d\udd22",
  "slides": [
    {
      "title": "Topic 01: Window Functions Part 1 (Ranking)",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udd22 Topic 01: Window Functions Part 1 (Ranking)</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What are Window Functions?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Window functions perform calculations <strong style=\"color:#f1f5f9;\">across a set of rows related to the current row</strong> \u2014 without collapsing those rows the way <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code> does. They are called \"window\" functions because each row looks out a \"window\" of related rows.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Key Difference: Aggregate vs. Window</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Aggregate (GROUP BY): collapses rows\nSELECT department_id, AVG(salary)  -- 8 rows returned (one per dept)\nFROM employees\nGROUP BY department_id;\n\n-- Window function: preserves all rows\nSELECT department_id, salary,\n       AVG(salary) OVER (PARTITION BY department_id)  -- 100 rows, each with dept avg\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Syntax of OVER()</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">function_name() OVER (\n    [PARTITION BY column1, column2]  -- define groups (like GROUP BY)\n    [ORDER BY column ASC/DESC]       -- define order within window\n    [frame_clause]                   -- define window frame (Day 15)\n)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Ranking Functions</h3>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">ROW_NUMBER() \u2014 Unique sequential number</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    first_name,\n    salary,\n    department_id,\n    ROW_NUMBER() OVER (\n        PARTITION BY department_id\n        ORDER BY salary DESC\n    ) AS row_num\nFROM employees;\n-- Within each department, assigns 1, 2, 3... regardless of ties\n-- Tied salaries get different row numbers (non-deterministic which gets which)</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">RANK() \u2014 Rank with gaps for ties</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    first_name,\n    salary,\n    RANK() OVER (ORDER BY salary DESC) AS rank\nFROM employees;\n-- If two employees have salary 90000:\n-- Position 1: 90000\n-- Position 1: 90000 (tie)\n-- Position 3: 85000 (gap \u2014 no position 2)</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">DENSE_RANK() \u2014 Rank without gaps</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    first_name,\n    salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank\nFROM employees;\n-- If two employees tie at position 1:\n-- Position 1: 90000\n-- Position 1: 90000 (tie)\n-- Position 2: 85000 (NO gap \u2014 continues from 2)</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">NTILE(n) \u2014 Divide rows into n equal buckets</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">SELECT\n    first_name,\n    salary,\n    NTILE(4) OVER (ORDER BY salary DESC) AS quartile\nFROM employees;\n-- Divides all employees into 4 equal salary quartiles (Q1=highest, Q4=lowest)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Practical Patterns</h3>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">Top N per Group (classic interview problem)</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Get top 3 earners per department\nWITH ranked_employees AS (\n    SELECT\n        first_name,\n        salary,\n        department_id,\n        RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank\n    FROM employees\n)\nSELECT *\nFROM ranked_employees\nWHERE salary_rank &lt;= 3;\n-- Cannot use window function directly in WHERE \u2014 must use CTE or subquery!</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">Percentile with NTILE</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Mark employees in the top 10% salary bracket\nWITH salary_percentiles AS (\n    SELECT\n        first_name,\n        salary,\n        NTILE(10) OVER (ORDER BY salary DESC) AS decile\n    FROM employees\n)\nSELECT *\nFROM salary_percentiles\nWHERE decile = 1;  -- Top 10%</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to rank products by unit_price using ROW_NUMBER().",
      "referenceSql": "SELECT name, unit_price, ROW_NUMBER() OVER (ORDER BY unit_price DESC) AS price_rank FROM products;"
    },
    {
      "id": 2,
      "prompt": "Write a query to rank employees within their department by salary using RANK() and DENSE_RANK().",
      "referenceSql": "SELECT department_id, first_name, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dense_rank FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Write a query to divide products into 4 price quartiles using NTILE(4).",
      "referenceSql": "SELECT name, unit_price, NTILE(4) OVER (ORDER BY unit_price DESC) AS quartile FROM products;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Region Customer Rank</strong><br/>Rank customers within each region by their signup_date. Use ROW_NUMBER().",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Order Amount Rank</strong><br/>Rank orders in 2024 by total_amount descending. Use DENSE_RANK() to handle identical values.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Employee Salary Deciles</strong><br/>Divide employees into 3 salary bands (low, medium, high) using NTILE(3).",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 10,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 15,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Use the ROW_NUMBER() window function to rank all employees by salary descending.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Window Functions Part 1 (Ranking)",
      "recordingKey": null
    }
  ]
};
