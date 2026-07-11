// Day 17 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day17'] = {
  "day": 17,
  "title": "Date & Time Functions",
  "db": "retail",
  "emoji": "\ud83d\udcc5",
  "slides": [
    {
      "title": "Topic 01: Date & Time Functions",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udcc5 Topic 01: Date & Time Functions</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Why Date Functions are Critical for Analysts</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">90% of analytical SQL queries involve date filters, date arithmetic, or date-based grouping (daily/weekly/monthly reporting). Mastering date functions is non-negotiable.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Getting the Current Date and Time</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">CURRENT_DATE         -- Current date: '2024-06-15'\nCURRENT_TIME         -- Current time: '14:30:00'\nCURRENT_TIMESTAMP    -- Current datetime: '2024-06-15 14:30:00'\nNOW()                -- Same as CURRENT_TIMESTAMP (PostgreSQL/MySQL)\nGETDATE()            -- SQL Server equivalent\nSYSDATE              -- Oracle equivalent</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Extracting Parts of a Date</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- EXTRACT function (SQL Standard)\nEXTRACT(YEAR FROM hire_date)       \u2192 2022\nEXTRACT(MONTH FROM hire_date)      \u2192 6\nEXTRACT(DAY FROM hire_date)        \u2192 15\nEXTRACT(QUARTER FROM order_date)   \u2192 2  (Q2 = April-June)\nEXTRACT(DOW FROM hire_date)        \u2192 0-6 (0=Sunday in PostgreSQL)\nEXTRACT(WEEK FROM hire_date)       \u2192 24  (ISO week number)\nEXTRACT(EPOCH FROM timestamp)      \u2192 Unix timestamp (seconds since 1970-01-01)\n\n-- DATE_PART (PostgreSQL) \u2014 equivalent to EXTRACT\nDATE_PART('year', hire_date)       \u2192 2022\n\n-- DATE_TRUNC \u2014 truncate to a time unit\nDATE_TRUNC('month', '2024-06-15'::DATE)   \u2192 '2024-06-01'  -- start of month\nDATE_TRUNC('year', '2024-06-15'::DATE)    \u2192 '2024-01-01'  -- start of year\nDATE_TRUNC('week', '2024-06-15'::DATE)    \u2192 '2024-06-10'  -- start of week (Monday)\nDATE_TRUNC('quarter', '2024-06-15'::DATE) \u2192 '2024-04-01'  -- start of quarter</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Date Arithmetic</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Adding and subtracting days (PostgreSQL)\nCURRENT_DATE + INTERVAL '7 days'       -- one week from today\nCURRENT_DATE - INTERVAL '1 month'      -- one month ago\nhire_date + INTERVAL '90 days'         -- 90 days after hire\n\n-- DATE_ADD / DATE_SUB (MySQL)\nDATE_ADD(hire_date, INTERVAL 30 DAY)\nDATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)\n\n-- Difference between dates\nage(CURRENT_DATE, hire_date)                    -- PostgreSQL: returns interval '5 years 3 months...'\nCURRENT_DATE - hire_date                        -- Returns number of days\nDATEDIFF(CURRENT_DATE, hire_date)               -- MySQL: number of days\n\n-- Years of service\nEXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) AS years_of_service</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Formatting Dates for Output</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- TO_CHAR (PostgreSQL/Oracle): format a date as a string\nTO_CHAR(hire_date, 'DD/MM/YYYY')    \u2192 '15/06/2024'\nTO_CHAR(hire_date, 'Month DD, YYYY') \u2192 'June 15, 2024'\nTO_CHAR(hire_date, 'YYYY-\"Q\"Q')    \u2192 '2024-Q2'\nTO_CHAR(hire_date, 'Day, DD Mon')   \u2192 'Saturday, 15 Jun'\n\n-- DATE_FORMAT (MySQL)\nDATE_FORMAT(hire_date, '%d/%m/%Y')  \u2192 '15/06/2024'\nDATE_FORMAT(hire_date, '%M %Y')     \u2192 'June 2024'</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Common Analytical Patterns</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Filter by date range (last 30 days)\nWHERE order_date &gt;= CURRENT_DATE - INTERVAL '30 days';\n\n-- Filter by current month\nWHERE DATE_TRUNC('month', order_date) = DATE_TRUNC('month', CURRENT_DATE);\n\n-- Filter by year\nWHERE EXTRACT(YEAR FROM order_date) = 2024;\n\n-- Monthly aggregation\nSELECT\n    DATE_TRUNC('month', order_date) AS month,\n    COUNT(*) AS order_count,\n    SUM(amount) AS monthly_revenue\nFROM orders\nGROUP BY DATE_TRUNC('month', order_date)\nORDER BY month;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to extract the year and month from order_date.",
      "referenceSql": "SELECT order_date, STRFTIME('%Y', order_date) AS year, STRFTIME('%m', order_date) AS month FROM orders;"
    },
    {
      "id": 2,
      "prompt": "Write a query to calculate the number of days between order_date and shipped_date.",
      "referenceSql": "SELECT order_id, JULIANDAY(shipped_date) - JULIANDAY(order_date) AS days_to_ship FROM orders WHERE shipped_date IS NOT NULL;"
    },
    {
      "id": 3,
      "prompt": "Write a query to find all orders placed in the last 1000 days. (Hint: use date('now') or similar).",
      "referenceSql": "SELECT * FROM orders WHERE order_date >= DATE('now', '-1000 days');"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Customer Tenure Days</strong><br/>Calculate days since signup. Retrieve name and number of days since signup_date.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Weekday Order Analysis</strong><br/>Identify popular shopping days. Extract day of the week from order_date.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Shipping Delay Flags</strong><br/>Find orders that took > 5 days to ship. Compare shipped_date and order_date.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 10,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 15,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Extract the year of hire from the hire_date column using the strftime function.",
      "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Date & Time Functions",
      "recordingKey": null
    }
  ]
};
