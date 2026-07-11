// Day 04 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day04'] = {
  "day": 4,
  "title": "Sorting & Limiting Results",
  "db": "retail",
  "emoji": "\ud83d\udcc8",
  "slides": [
    {
      "title": "Topic 01: Sorting & Limiting Results",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udcc8 Topic 01: Sorting & Limiting Results</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">ORDER BY \u2014 Sorting Query Results</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">ORDER BY</code> executes at <strong style=\"color:#f1f5f9;\">Step 8</strong> of the SQL Order of Execution \u2014 after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code>. This means you CAN reference column aliases defined in <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code>.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Basic ascending sort (default)\nSELECT first_name, salary FROM employees ORDER BY salary;           -- ASC is default\nSELECT first_name, salary FROM employees ORDER BY salary ASC;\nSELECT first_name, salary FROM employees ORDER BY salary DESC;\n\n-- Sort by multiple columns (primary sort, then secondary)\nSELECT first_name, last_name, department_id, salary\nFROM employees\nORDER BY department_id ASC, salary DESC;\n-- Within each department, employees are sorted highest salary first\n\n-- Sort by column alias (works because ORDER BY runs after SELECT)\nSELECT first_name, salary * 1.10 AS new_salary\nFROM employees\nORDER BY new_salary DESC;  -- \u2705 This works\n\n-- Sort by column position (1-indexed) \u2014 avoid in production code, fragile\nSELECT first_name, last_name, salary\nFROM employees\nORDER BY 3 DESC;  -- sorts by the 3rd column (salary)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LIMIT and OFFSET \u2014 Pagination</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">LIMIT</code> restricts the number of rows returned. <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">OFFSET</code> skips a specified number of rows.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Get the top 5 highest-paid employees\nSELECT first_name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;\n\n-- Pagination: get page 2 (rows 11\u201320) assuming page size of 10\nSELECT first_name, salary\nFROM employees\nORDER BY employee_id\nLIMIT 10 OFFSET 10;  -- Skip first 10 rows, take next 10\n\n-- Page 3 (rows 21-30)\nLIMIT 10 OFFSET 20;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Always pair LIMIT with ORDER BY.</strong> Without ORDER BY, the database can return rows in <em style=\"color:#e2e8f0;\">any</em> order \u2014 your \"top 5\" is meaningless without specifying top 5 of <em style=\"color:#e2e8f0;\">what</em>.</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">FETCH FIRST (SQL Standard)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- SQL Standard syntax (works in PostgreSQL, Oracle, SQL Server 2012+)\nSELECT first_name, salary\nFROM employees\nORDER BY salary DESC\nFETCH FIRST 5 ROWS ONLY;\n\n-- With offset\nOFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">DISTINCT \u2014 Remove Duplicate Rows</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">DISTINCT</code> executes at <strong style=\"color:#f1f5f9;\">Step 7</strong> of the SQL Order of Execution \u2014 after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SELECT</code> but before <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">ORDER BY</code>.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Return unique department IDs\nSELECT DISTINCT department_id FROM employees;\n\n-- Distinct combination of two columns\nSELECT DISTINCT department_id, job_title FROM employees;\n\n-- DISTINCT with COUNT \u2014 count unique values\nSELECT COUNT(DISTINCT department_id) AS num_departments FROM employees;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Performance:</strong> <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">DISTINCT</code> is expensive \u2014 it sorts the result set to remove duplicates. Don't use it as a band-aid for duplicates from incorrect JOINs. Fix the JOIN instead.</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">RANDOM Sampling</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Get 5 random employees (PostgreSQL)\nSELECT * FROM employees ORDER BY RANDOM() LIMIT 5;\n\n-- MySQL equivalent\nSELECT * FROM employees ORDER BY RAND() LIMIT 5;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all products sorted by unit_price in descending order.",
      "referenceSql": "SELECT * FROM products ORDER BY unit_price DESC;"
    },
    {
      "id": 2,
      "prompt": "Retrieve all employees sorted by department_id ascending, and then by salary descending.",
      "referenceSql": "SELECT * FROM employees ORDER BY department_id ASC, salary DESC;"
    },
    {
      "id": 3,
      "prompt": "Retrieve the top 3 highest-earning employees.",
      "referenceSql": "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Next Page Products</strong><br/>Implement pagination for products list. Sort products by product_id and retrieve products 6 to 10 (LIMIT 5, OFFSET 5).",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Recent High Orders</strong><br/>Retrieve the top 5 most expensive orders placed in 2024. Sort by total_amount descending.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Sorted Contact List</strong><br/>List all customers sorted by last_name and then first_name alphabetically.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 1 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 1;"
    },
    {
      "id": 2,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 2 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 2;"
    },
    {
      "id": 3,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 3 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;"
    },
    {
      "id": 4,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 4 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 4;"
    },
    {
      "id": 5,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 5 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;"
    },
    {
      "id": 6,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 6 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 6;"
    },
    {
      "id": 7,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 7 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 7;"
    },
    {
      "id": 8,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 8 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 8;"
    },
    {
      "id": 9,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 9 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 9;"
    },
    {
      "id": 10,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 10 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 10;"
    },
    {
      "id": 11,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 11 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 11;"
    },
    {
      "id": 12,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 12 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 12;"
    },
    {
      "id": 13,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 13 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 13;"
    },
    {
      "id": 14,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 14 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 14;"
    },
    {
      "id": 15,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 15 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 15;"
    },
    {
      "id": 16,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 16 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 16;"
    },
    {
      "id": 17,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 17 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 17;"
    },
    {
      "id": 18,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 18 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 18;"
    },
    {
      "id": 19,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 19 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 19;"
    },
    {
      "id": 20,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 20 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 20;"
    },
    {
      "id": 21,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 21 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 21;"
    },
    {
      "id": 22,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 22 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 22;"
    },
    {
      "id": 23,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 23 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 23;"
    },
    {
      "id": 24,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 24 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 24;"
    },
    {
      "id": 25,
      "prompt": "Retrieve employees sorted by salary descending and limit output to the top 25 records.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 25;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Sorting & Limiting Results",
      "recordingKey": null
    }
  ]
};
