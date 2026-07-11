// Day 16 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day16'] = {
  "day": 16,
  "title": "String Functions",
  "db": "retail",
  "emoji": "\ud83e\uddf9",
  "slides": [
    {
      "title": "Topic 01: String Functions",
      "duration": "0:00",
      "html": "\n            <h2>\ud83e\uddf9 Topic 01: String Functions</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Why String Functions Matter for Analysts</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Real-world data is messy. Product names have extra spaces, emails are in inconsistent case, phone numbers have dashes and parentheses, and names are split or combined differently across systems. String functions are the data analyst's cleansing toolkit.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Core String Functions</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Case functions\nUPPER('hello world')          \u2192 'HELLO WORLD'\nLOWER('HELLO WORLD')          \u2192 'hello world'\nINITCAP('hello world')        \u2192 'Hello World'  -- PostgreSQL\n\n-- Length\nLENGTH('hello')               \u2192 5\nCHAR_LENGTH('hello')          \u2192 5  (counts characters, not bytes)\n\n-- Trimming whitespace\nTRIM('  hello  ')             \u2192 'hello'\nLTRIM('  hello  ')            \u2192 'hello  '\nRTRIM('  hello  ')            \u2192 '  hello'\nTRIM(BOTH '-' FROM '--hello--') \u2192 'hello'  -- trim specific characters\n\n-- Padding\nLPAD('42', 5, '0')            \u2192 '00042'  -- pad left to width 5 with '0'\nRPAD('hello', 10, '.')        \u2192 'hello.....'\n\n-- Concatenation\n'hello' || ' ' || 'world'     \u2192 'hello world'  -- PostgreSQL\nCONCAT('hello', ' ', 'world') \u2192 'hello world'   -- Standard SQL\nCONCAT_WS(', ', 'Alice', 'Bob', 'Charlie')       \u2192 'Alice, Bob, Charlie'</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Substring Extraction</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- SUBSTRING(string, start, length)\nSUBSTRING('Hello World', 1, 5)          \u2192 'Hello'  -- 1-indexed\nSUBSTRING('Hello World', 7)             \u2192 'World'  -- from position 7 to end\n\n-- LEFT and RIGHT\nLEFT('Hello World', 5)                  \u2192 'Hello'\nRIGHT('Hello World', 5)                 \u2192 'World'\n\n-- Extract email domain\nSELECT RIGHT(email, LENGTH(email) - POSITION('@' IN email)) AS domain\nFROM employees;\n-- 'alice@manodemy.com' \u2192 'manodemy.com'</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Pattern Search</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- POSITION / STRPOS: find character position\nPOSITION('@' IN 'alice@manodemy.com')   \u2192 6\nSTRPOS('alice@manodemy.com', '@')       \u2192 6  -- PostgreSQL\n\n-- LIKE (already covered Day 3)\n-- REGEXP_MATCH / ~ (regex)\nSELECT * FROM employees WHERE email ~ '^[a-z]+\\.[a-z]+@manodemy\\.com$';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">String Replacement</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- REPLACE: replaces all occurrences\nREPLACE('hello world', 'world', 'SQL')  \u2192 'hello SQL'\nREPLACE(phone, '-', '')                 \u2192 removes all dashes from phone number\n\n-- REGEXP_REPLACE: replace using regex\nREGEXP_REPLACE('Hello  World', '\\s+', ' ', 'g')  \u2192 'Hello World'  -- normalize spaces\nREGEXP_REPLACE(phone, '[^0-9]', '', 'g')          \u2192 keeps only digits</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">SPLIT_PART \u2014 Splitting Strings by Delimiter</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- SPLIT_PART(string, delimiter, field_number)\nSPLIT_PART('John|Doe|35', '|', 1)       \u2192 'John'\nSPLIT_PART('John|Doe|35', '|', 2)       \u2192 'Doe'\nSPLIT_PART('John|Doe|35', '|', 3)       \u2192 '35'\n\n-- Extract username from email\nSELECT SPLIT_PART(email, '@', 1) AS username FROM employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Practical Data Cleaning Example</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Clean a messy name column in one query\nSELECT\n    TRIM(                            -- remove leading/trailing spaces\n        REGEXP_REPLACE(              -- normalize multiple spaces\n            INITCAP(                 -- proper case\n                LOWER(name)          -- normalize case first\n            ),\n        '\\s+', ' ', 'g')\n    ) AS clean_name\nFROM raw_customers;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to return customer first_name in lowercase and last_name in uppercase.",
      "referenceSql": "SELECT LOWER(first_name), UPPER(last_name) FROM customers;"
    },
    {
      "id": 2,
      "prompt": "Write a query to extract the domain from employee email addresses. (Hint: use SUBSTR and INSTR).",
      "referenceSql": "SELECT email, SUBSTR(email, INSTR(email, '@') + 1) AS domain FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Write a query to trim leading and trailing spaces from first_name in raw_customers.",
      "referenceSql": "SELECT name, TRIM(email) FROM raw_customers;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Customer Name Format</strong><br/>Standardize display. Combine customers first_name and last_name, converting to title case or uppercase.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Area Code Extract</strong><br/>Find area codes from phone. Use SUBSTR to extract first 3 characters from raw_customers phone column.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Product Initial Tag</strong><br/>Retrieve name and first 3 characters of name in uppercase as product code.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 10,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 15,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Apply UPPER() to first_name and TRIM() to last_name, returning them under aliases upper_name and clean_last.",
      "ref": "SELECT UPPER(first_name) AS upper_name, TRIM(last_name) AS clean_last FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: String Functions",
      "recordingKey": null
    }
  ]
};
