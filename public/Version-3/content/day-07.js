// Day 07 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day07'] = {
  "day": 7,
  "title": "Data Types, Casting & Expressions",
  "db": "retail",
  "emoji": "\u2795",
  "slides": [
    {
      "title": "Topic 01: Data Types, Casting & Expressions",
      "duration": "0:00",
      "html": "\n            <h2>\u2795 Topic 01: Data Types, Casting & Expressions</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Why Data Types Matter for Analysts</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Data analysts frequently encounter data type mismatches when joining tables, performing arithmetic, or building reports. Understanding casting prevents silent data corruption and query errors.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Type Casting: CAST and ::</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Standard SQL CAST syntax\nSELECT CAST('2024-01-15' AS DATE);\nSELECT CAST(salary AS VARCHAR);\nSELECT CAST('125.50' AS DECIMAL(10,2));\nSELECT CAST(is_active AS INTEGER);  -- TRUE \u2192 1, FALSE \u2192 0\n\n-- PostgreSQL shorthand (:: operator)\nSELECT '2024-01-15'::DATE;\nSELECT salary::VARCHAR;\nSELECT '125.50'::DECIMAL(10,2);</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Implicit vs. Explicit Casting</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Implicit casting (database does it automatically)\nSELECT 5 + 2.0;  -- Result: 7.0 (integer is implicitly cast to decimal)\n\n-- Explicit casting is always safer and more readable\nSELECT CAST(5 AS DECIMAL) / 2;  -- Result: 2.5 (not 2!)\n\n-- Integer division trap\nSELECT 5 / 2;    -- Result: 2 (integer division in most databases!)\nSELECT 5.0 / 2;  -- Result: 2.5 (one operand is decimal)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Numeric Data Types Deep Dive</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Type</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Storage</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Precision</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Use Case</th></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">SMALLINT</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">2 bytes</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">-32,768 to 32,767</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Age, rating</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">INT / INTEGER</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">4 bytes</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">~\u00b12.1 billion</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">IDs, counts</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">BIGINT</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">8 bytes</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">~\u00b19.2 quintillion</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Large IDs, timestamps</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">DECIMAL(p,s) / NUMERIC(p,s)</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Variable</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Exact</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Currency, financial</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">FLOAT / DOUBLE</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">4-8 bytes</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Approximate</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Scientific data</td></tr>\n</table></div>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Critical:</strong> Never use <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">FLOAT</code> for money. Floating-point arithmetic is approximate.</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">```sql</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">SELECT 0.1 + 0.2 = 0.3;  -- Result: FALSE (floating point imprecision!)</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">SELECT CAST(0.1 AS DECIMAL(10,1)) + CAST(0.2 AS DECIMAL(10,1)) = 0.3;  -- TRUE</blockquote>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\">```</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Text / String Data Types</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Type</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Behavior</th><th style=\"border:1px solid #1e293b;padding:8px 12px;background:#162032;color:#93c5fd;font-weight:bold;\">Use Case</th></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">CHAR(n)</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Fixed-length, right-padded with spaces</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Country code 'IN', state code</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">VARCHAR(n)</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Variable-length, max n characters</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Names, emails</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">TEXT</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Unlimited length</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Descriptions, comments</td></tr>\n</table></div>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Date/Time Data Types</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">DATE        -- '2024-01-15'               (date only)\nTIME        -- '14:30:00'                 (time only)\nTIMESTAMP   -- '2024-01-15 14:30:00'      (date and time, no timezone)\nTIMESTAMPTZ -- '2024-01-15 14:30:00+05:30' (with timezone \u2014 preferred)\nINTERVAL    -- '3 months', '7 days'       (a duration)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Expressions and Computed Columns</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Arithmetic\nSELECT\n    salary,\n    salary * 12                    AS annual_salary,\n    salary * 0.20                  AS tax_deduction,\n    salary - (salary * 0.20)       AS net_monthly_salary,\n    ROUND((salary / 100000.0) * 100, 2) AS salary_pct_of_100k\nFROM employees;\n\n-- String expressions\nSELECT\n    UPPER(first_name)                              AS upper_name,\n    LOWER(email)                                   AS lower_email,\n    LENGTH(job_title)                              AS title_length,\n    first_name || ' ' || last_name                AS full_name,\n    TRIM('   hello   ')                            AS trimmed  -- 'hello'\nFROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">TRY_CAST / Safe Casting</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- SQL Server: TRY_CAST returns NULL instead of error on invalid cast\nSELECT TRY_CAST('not_a_number' AS INT);  -- Returns: NULL (not an error)\n\n-- PostgreSQL equivalent using REGEXP\nSELECT CASE\n    WHEN value ~ '^[0-9]+$' THEN CAST(value AS INT)\n    ELSE NULL\nEND FROM my_table;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Cast the unit_price of products as an INTEGER.",
      "referenceSql": "SELECT name, CAST(unit_price AS INTEGER) FROM products;"
    },
    {
      "id": 2,
      "prompt": "Concatenate the first_name and last_name of employees separated by a hyphen.",
      "referenceSql": "SELECT first_name || '-' || last_name FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Perform integer division on budget divided by 3 from departments.",
      "referenceSql": "SELECT department_name, CAST(budget AS INTEGER) / 3 FROM departments;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Clean Email Output</strong><br/>Return the employee first_name and email in uppercase. Rename columns appropriately.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Float to Int Convert</strong><br/>Cast orders total_amount as an integer to show rounded orders to the sales team.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Product SKU Builder</strong><br/>Construct an SKU code by concatenating product_id and category_id. E.g. 'ID-CAT'.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 1 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 1;"
    },
    {
      "id": 2,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 2 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 2;"
    },
    {
      "id": 3,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 3 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 3;"
    },
    {
      "id": 4,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 4 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 4;"
    },
    {
      "id": 5,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 5 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 5;"
    },
    {
      "id": 6,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 6 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 6;"
    },
    {
      "id": 7,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 7 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 7;"
    },
    {
      "id": 8,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 8 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 8;"
    },
    {
      "id": 9,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 9 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 9;"
    },
    {
      "id": 10,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 10 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 10;"
    },
    {
      "id": 11,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 11 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 11;"
    },
    {
      "id": 12,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 12 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 12;"
    },
    {
      "id": 13,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 13 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 13;"
    },
    {
      "id": 14,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 14 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 14;"
    },
    {
      "id": 15,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 15 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 15;"
    },
    {
      "id": 16,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 16 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 16;"
    },
    {
      "id": 17,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 17 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 17;"
    },
    {
      "id": 18,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 18 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 18;"
    },
    {
      "id": 19,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 19 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 19;"
    },
    {
      "id": 20,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 20 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 20;"
    },
    {
      "id": 21,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 21 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 21;"
    },
    {
      "id": 22,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 22 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 22;"
    },
    {
      "id": 23,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 23 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 23;"
    },
    {
      "id": 24,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 24 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 24;"
    },
    {
      "id": 25,
      "prompt": "Project first_name and their salary casted to an INTEGER, limited to 25 rows.",
      "ref": "SELECT first_name, CAST(salary AS INTEGER) AS integer_salary FROM employees LIMIT 25;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Data Types, Casting & Expressions",
      "recordingKey": null
    }
  ]
};
