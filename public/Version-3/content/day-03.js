// Day 03 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Pattern Matching & NULL Handling",
  "db": "retail",
  "emoji": "\ud83d\udcdd",
  "slides": [
    {
      "title": "Topic 01: Pattern Matching & NULL Handling",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udcdd Topic 01: Pattern Matching & NULL Handling</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LIKE Operator \u2014 Pattern Matching</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">LIKE</code> performs <strong style=\"color:#f1f5f9;\">partial text matching</strong> using two wildcard characters:</p>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Wildcard</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Meaning</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Example</th></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">%</code></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Zero or more characters</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">'%analyst'</code> matches \"data analyst\", \"business analyst\", \"analyst\"</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">_</code></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Exactly one character</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">'An_a'</code> matches \"Anna\", \"Anya\"</td></tr>\n</table></div>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Starts with 'Sales'\nSELECT * FROM employees WHERE job_title LIKE 'Sales%';\n\n-- Ends with 'Manager'\nSELECT * FROM employees WHERE job_title LIKE '%Manager';\n\n-- Contains 'data' anywhere (case-insensitive with ILIKE in PostgreSQL)\nSELECT * FROM employees WHERE job_title ILIKE '%data%';\n\n-- Exactly 5 characters starting with 'A'\nSELECT * FROM employees WHERE first_name LIKE 'A____';\n\n-- Escape a literal % or _ character using ESCAPE\nSELECT * FROM products WHERE discount_code LIKE '20\\%' ESCAPE '\\';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">ILIKE (PostgreSQL) vs LOWER() + LIKE</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- PostgreSQL-specific case-insensitive LIKE\nWHERE email ILIKE '%@gmail.com'\n\n-- Standard SQL approach (works in all databases)\nWHERE LOWER(email) LIKE '%@gmail.com'</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Performance Warning:</strong> <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">LIKE '%text%'</code> (leading wildcard) cannot use indexes and will trigger a full table scan. Avoid leading wildcards on large tables.</blockquote>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">NULL Handling \u2014 The Most Misunderstood Topic in SQL</h3>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">What is NULL?</h4>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NULL</code> represents the <strong style=\"color:#f1f5f9;\">absence of a value</strong> \u2014 it is not zero, not empty string, not false. It is <em style=\"color:#e2e8f0;\">unknown</em>.</p>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">NULL in Comparisons</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- These ALWAYS return NULL (neither TRUE nor FALSE):\nSELECT NULL = NULL;     -- NULL\nSELECT NULL = 5;        -- NULL\nSELECT NULL &lt;&gt; 5;       -- NULL\nSELECT NULL &gt; 5;        -- NULL\n\n-- This is why NULL rows are excluded from WHERE conditions:\n-- WHERE salary = NULL  \u2192 evaluates to NULL \u2192 row is excluded</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">IS NULL and IS NOT NULL</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Correct way to filter NULL values:\nSELECT * FROM employees WHERE manager_id IS NULL;      -- Find top-level employees\nSELECT * FROM employees WHERE phone_number IS NOT NULL; -- Find employees with phone\n\n-- WRONG (always returns 0 rows):\nSELECT * FROM employees WHERE manager_id = NULL;  -- \u274c</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">COALESCE \u2014 Replace NULL with a default value</h4>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">COALESCE(value1, value2, ..., valueN)</code> \u2014 returns the first non-NULL value in the list.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Replace NULL commission with 0 for calculations\nSELECT\n    employee_id,\n    salary,\n    COALESCE(commission, 0) AS commission,\n    salary + COALESCE(commission, 0) AS total_compensation\nFROM employees;\n\n-- Multiple fallbacks\nSELECT COALESCE(preferred_name, first_name, 'Unknown') AS display_name\nFROM employees;</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">NULLIF \u2014 Returns NULL if two values are equal</h4>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NULLIF(value1, value2)</code> \u2014 returns NULL if value1 = value2, otherwise returns value1.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Common use: prevent division by zero\nSELECT revenue / NULLIF(units_sold, 0) AS revenue_per_unit\nFROM sales;\n-- When units_sold = 0, NULLIF returns NULL, making the division NULL (not an error)</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">NULL in Aggregate Functions</h4>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Aggregate functions like <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">SUM</code>, <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">AVG</code>, <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">COUNT</code> <strong style=\"color:#f1f5f9;\">ignore NULL values</strong> by default.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- If 3 out of 10 employees have NULL commission, AVG ignores the 3 NULLs\nSELECT AVG(commission) FROM employees;  -- averages only 7 non-NULL values\n\n-- COUNT(*) counts all rows; COUNT(column) ignores NULLs\nSELECT\n    COUNT(*)           AS total_rows,\n    COUNT(commission)  AS rows_with_commission\nFROM employees;</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">NULL in ORDER BY</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- NULL sorts LAST by default in ascending order (PostgreSQL/MySQL)\nSELECT * FROM employees ORDER BY commission ASC;\n\n-- Control NULL sort position:\nSELECT * FROM employees ORDER BY commission ASC NULLS FIRST;\nSELECT * FROM employees ORDER BY commission ASC NULLS LAST;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find all customers whose first_name starts with 'A'.",
      "referenceSql": "SELECT * FROM customers WHERE first_name LIKE 'A%';"
    },
    {
      "id": 2,
      "prompt": "Find all products whose name contains the word 'Phone' (case-insensitive).",
      "referenceSql": "SELECT * FROM products WHERE name LIKE '%Phone%';"
    },
    {
      "id": 3,
      "prompt": "Find all employees who do not receive a commission (commission is NULL).",
      "referenceSql": "SELECT * FROM employees WHERE commission IS NULL;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Domain Lookup</strong><br/>Find customers using a Gmail address. Retrieve customer_id, first_name, and email for customers whose email ends with '@gmail.com'.",
      "referenceSql": "SELECT customer_id, first_name, email FROM customers WHERE email LIKE '%@gmail.com';"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Commission Backup</strong><br/>Clean up reports by replacing NULL commissions with 0. Retrieve first_name, last_name, commission, and a new column clean_commission using COALESCE.",
      "referenceSql": "SELECT first_name, last_name, commission, COALESCE(commission, 0) AS clean_commission FROM employees;"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Short Name Search</strong><br/>Find products whose names are exactly 5 characters long. Use the underscore (_) wildcard.",
      "referenceSql": "SELECT name FROM products WHERE name LIKE '_____';"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Find all employees whose first_name starts with the letter 'A'.",
      "ref": "SELECT * FROM employees WHERE first_name LIKE 'A%';"
    },
    {
      "id": 2,
      "prompt": "Find all employees whose last_name ends with 'Nair'.",
      "ref": "SELECT * FROM employees WHERE last_name LIKE '%Nair';"
    },
    {
      "id": 3,
      "prompt": "Find all employees whose email contains the domain '@manodemy.com'.",
      "ref": "SELECT * FROM employees WHERE email LIKE '%@manodemy.com';"
    },
    {
      "id": 4,
      "prompt": "Find all employees whose manager_id is NULL.",
      "ref": "SELECT * FROM employees WHERE manager_id IS NULL;"
    },
    {
      "id": 5,
      "prompt": "Find all employees whose manager_id is NOT NULL.",
      "ref": "SELECT * FROM employees WHERE manager_id IS NOT NULL;"
    },
    {
      "id": 6,
      "prompt": "Find all employees who do not earn a commission (commission is NULL).",
      "ref": "SELECT * FROM employees WHERE commission IS NULL;"
    },
    {
      "id": 7,
      "prompt": "Find all employees who receive a commission (commission is NOT NULL).",
      "ref": "SELECT * FROM employees WHERE commission IS NOT NULL;"
    },
    {
      "id": 8,
      "prompt": "Retrieve the employee details with a column <code>clean_commission</code> that uses <code>COALESCE</code> to replace NULL commission with 0.",
      "ref": "SELECT first_name, last_name, COALESCE(commission, 0) AS clean_commission FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Find all products whose name contains 'Phone' (case-insensitive).",
      "ref": "SELECT * FROM products WHERE name LIKE '%Phone%';"
    },
    {
      "id": 10,
      "prompt": "Find all products whose name contains 'Desk'.",
      "ref": "SELECT * FROM products WHERE name LIKE '%Desk%';"
    },
    {
      "id": 11,
      "prompt": "Find products whose name starts with 'LED'.",
      "ref": "SELECT * FROM products WHERE name LIKE 'LED%';"
    },
    {
      "id": 12,
      "prompt": "Find customers whose email ends with '@example.com'.",
      "ref": "SELECT * FROM customers WHERE email LIKE '%@example.com';"
    },
    {
      "id": 13,
      "prompt": "Find all products where category_id is NULL.",
      "ref": "SELECT * FROM products WHERE category_id IS NULL;"
    },
    {
      "id": 14,
      "prompt": "Find products where category_id is NOT NULL.",
      "ref": "SELECT * FROM products WHERE category_id IS NOT NULL;"
    },
    {
      "id": 15,
      "prompt": "Select first_name, last_name, and commission, sorting by commission ascending (showing NULLs last).",
      "ref": "SELECT first_name, last_name, commission FROM employees ORDER BY commission ASC;"
    },
    {
      "id": 16,
      "prompt": "Find customers whose first_name starts with 'A' and ends with 't'.",
      "ref": "SELECT * FROM customers WHERE first_name LIKE 'A%t';"
    },
    {
      "id": 17,
      "prompt": "Find customers whose last_name starts with 'G' or 'S'.",
      "ref": "SELECT * FROM customers WHERE last_name LIKE 'G%' OR last_name LIKE 'S%';"
    },
    {
      "id": 18,
      "prompt": "Find products whose name has 'Mouse' in it.",
      "ref": "SELECT * FROM products WHERE name LIKE '%Mouse%';"
    },
    {
      "id": 19,
      "prompt": "Retrieve employee names, salaries, and total compensation (salary + commission) using COALESCE for commission.",
      "ref": "SELECT first_name, salary, salary + COALESCE(commission, 0) AS total_compensation FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Find products whose stock_qty is not NULL and unit_price > 1000.",
      "ref": "SELECT * FROM products WHERE stock_qty IS NOT NULL AND unit_price > 1000;"
    },
    {
      "id": 21,
      "prompt": "Find active employees whose commission is NULL.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NULL;"
    },
    {
      "id": 22,
      "prompt": "Find customers whose region is NOT NULL.",
      "ref": "SELECT * FROM customers WHERE region IS NOT NULL;"
    },
    {
      "id": 23,
      "prompt": "Find active employees with email NOT LIKE '%example.com'.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND email NOT LIKE '%example.com';"
    },
    {
      "id": 24,
      "prompt": "Find products whose name contains 'Book'.",
      "ref": "SELECT * FROM products WHERE name LIKE '%Book%';"
    },
    {
      "id": 25,
      "prompt": "Find employees with a commission whose manager_id is NULL.",
      "ref": "SELECT * FROM employees WHERE commission IS NOT NULL AND manager_id IS NULL;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Pattern Matching & NULL Handling",
      "recordingKey": null
    }
  ]
};
