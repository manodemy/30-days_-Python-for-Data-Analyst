// Day 07 — Single-Row Functions: String & Numeric
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day07'] = {
  "day": 7,
  "title": "Single-Row Functions",
  "db": "retail",
  "emoji": "🧵",
  "slides": [
    {
      "title": "Single-Row Functions — String & Numeric",
      "duration": "0:00",
      "html": `
        <h2>🧵 Single-Row Functions</h2>

        <div class="slide-section">
          <h3>01. What Are Single-Row Functions?</h3>
          <p>Single-row (scalar) functions operate on <strong>one row at a time</strong> and return <strong>one result per row</strong>. Unlike aggregates (which collapse many rows to one), single-row functions transform individual values. They can appear in <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, and <code>GROUP BY</code>.</p>

          <div class="info-box">
            ℹ️ Single-row functions are divided into two main categories: <strong>String functions</strong> (manipulate text data) and <strong>Numeric functions</strong> (manipulate numeric data). Date functions are covered in Day 08.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. String Functions</h3>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Function</th><th>Description</th><th>Example</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td><code>UPPER(str)</code></td><td>Convert to uppercase</td><td><code>UPPER('hello')</code></td><td>HELLO</td></tr>
                <tr><td><code>LOWER(str)</code></td><td>Convert to lowercase</td><td><code>LOWER('HELLO')</code></td><td>hello</td></tr>
                <tr><td><code>LENGTH(str)</code></td><td>Character count</td><td><code>LENGTH('Hello')</code></td><td>5</td></tr>
                <tr><td><code>TRIM(str)</code></td><td>Remove leading/trailing spaces</td><td><code>TRIM('  hi  ')</code></td><td>hi</td></tr>
                <tr><td><code>LTRIM(str)</code></td><td>Remove leading spaces</td><td><code>LTRIM('  hi')</code></td><td>hi</td></tr>
                <tr><td><code>RTRIM(str)</code></td><td>Remove trailing spaces</td><td><code>RTRIM('hi  ')</code></td><td>hi</td></tr>
                <tr><td><code>REPLACE(str,old,new)</code></td><td>Replace substring</td><td><code>REPLACE('a-b-c','-','/')</code></td><td>a/b/c</td></tr>
                <tr><td><code>SUBSTR(str,pos,len)</code></td><td>Extract substring (SQLite/standard)</td><td><code>SUBSTR('Hello',2,3)</code></td><td>ell</td></tr>
                <tr><td><code>||</code> or <code>CONCAT</code></td><td>String concatenation</td><td><code>'Hello' || ' World'</code></td><td>Hello World</td></tr>
                <tr><td><code>INSTR(str,sub)</code></td><td>Position of substring</td><td><code>INSTR('Hello','ll')</code></td><td>3</td></tr>
              </tbody>
            </table>
          </div>

          <pre><code>-- Combine first and last name, convert email to uppercase
SELECT first_name || ' ' || last_name    AS full_name,
       UPPER(email)                       AS email_upper,
       LENGTH(first_name)                 AS name_length,
       REPLACE(email, '@manodemy.com', '') AS username
FROM   employees;

-- Find employees whose email username is shorter than 10 chars
SELECT first_name, email
FROM   employees
WHERE  LENGTH(REPLACE(email, '@manodemy.com', '')) < 10;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. SUBSTR — Extracting Substrings</h3>
          <p><code>SUBSTR(string, start_position, length)</code> extracts a substring. Position is 1-indexed. If length is omitted, it returns from start to end.</p>

          <pre><code>-- Extract the first 3 characters of first_name
SELECT first_name,
       SUBSTR(first_name, 1, 3) AS name_abbr
FROM   employees;

-- Extract year from a date string stored as TEXT
SELECT hire_date,
       SUBSTR(hire_date, 1, 4) AS hire_year,
       SUBSTR(hire_date, 6, 2) AS hire_month
FROM   employees;

-- Get the domain part of an email after '@'
SELECT email,
       SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM   employees;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. Numeric Functions</h3>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Function</th><th>Description</th><th>Example</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td><code>ROUND(n, d)</code></td><td>Round to d decimal places</td><td><code>ROUND(3.14159, 2)</code></td><td>3.14</td></tr>
                <tr><td><code>CEIL(n)</code></td><td>Round up to nearest integer</td><td><code>CEIL(3.1)</code></td><td>4</td></tr>
                <tr><td><code>FLOOR(n)</code></td><td>Round down to nearest integer</td><td><code>FLOOR(3.9)</code></td><td>3</td></tr>
                <tr><td><code>ABS(n)</code></td><td>Absolute value</td><td><code>ABS(-150)</code></td><td>150</td></tr>
                <tr><td><code>MOD(n, d)</code></td><td>Modulo / remainder</td><td><code>MOD(17, 5)</code></td><td>2</td></tr>
              </tbody>
            </table>
          </div>

          <pre><code>-- Round salary to nearest thousand, compute absolute difference
SELECT first_name,
       salary,
       ROUND(salary, -3)              AS salary_rounded,
       ROUND(salary / 12.0, 2)        AS monthly_salary,
       ABS(salary - 70000)            AS deviation_from_70k
FROM   employees;

-- Compute profit margin percentage, rounded to 1 decimal
SELECT name,
       ROUND((unit_price - cost_price) * 100.0 / unit_price, 1) AS margin_pct
FROM   products
ORDER BY margin_pct DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>05. Functions in WHERE and ORDER BY</h3>
          <p>Single-row functions can appear anywhere in a query — not just in SELECT. Using them in WHERE can cause performance issues by preventing index use (non-sargable conditions), so use with care on large tables.</p>

          <pre><code>-- Filter by derived string value
SELECT * FROM employees
WHERE  UPPER(first_name) = 'PRIYA';

-- Sort by computed length
SELECT name, LENGTH(name) AS name_len
FROM   products
ORDER BY LENGTH(name) DESC;

-- Find employees hired in a specific year
SELECT first_name, hire_date
FROM   employees
WHERE  SUBSTR(hire_date, 1, 4) = '2022';</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: Why should you avoid using functions on indexed columns in WHERE clauses?</strong></p>
              <p><em>A: When you wrap a column in a function (e.g. UPPER(email) = 'X'), the database cannot use an index on that column because the index stores the original values, not the function output. This forces a full table scan. Instead, you can store data in a normalised case (all lowercase), or create a functional index on UPPER(email) if your database supports it (PostgreSQL, MySQL 8.0+).</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Full Name Column</strong><br/>Retrieve <code>first_name</code>, <code>last_name</code>, and a combined <code>full_name</code> column (first_name || ' ' || last_name) from <code>employees</code>.",
      "referenceSql": "SELECT first_name, last_name, first_name || ' ' || last_name AS full_name FROM employees;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Email to Uppercase</strong><br/>Retrieve employee <code>first_name</code> and their <code>email</code> converted to all uppercase.",
      "referenceSql": "SELECT first_name, UPPER(email) AS email_upper FROM employees;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Monthly Salary (Rounded)</strong><br/>Compute <code>monthly_salary</code> by dividing salary by 12 and rounding to 2 decimal places.",
      "referenceSql": "SELECT first_name, ROUND(salary / 12.0, 2) AS monthly_salary FROM employees;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Product Name Length</strong><br/>Retrieve all product <code>name</code> values and their character <code>length</code>, sorted by length descending.",
      "referenceSql": "SELECT name, LENGTH(name) AS name_length FROM products ORDER BY name_length DESC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Extract Hire Year</strong><br/>Retrieve <code>first_name</code> and <code>hire_year</code> (first 4 characters of hire_date) from <code>employees</code>.",
      "referenceSql": "SELECT first_name, SUBSTR(hire_date, 1, 4) AS hire_year FROM employees;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Profit Margin Rounded</strong><br/>Retrieve product <code>name</code> and a <code>margin_pct</code> column ((unit_price - cost_price) * 100 / unit_price) rounded to 1 decimal place.",
      "referenceSql": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 1) AS margin_pct FROM products ORDER BY margin_pct DESC;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Concatenate first_name and last_name as <code>full_name</code> from employees.", "ref": "SELECT first_name || ' ' || last_name AS full_name FROM employees;" },
    { "id": 2, "prompt": "Convert all product names to UPPERCASE.", "ref": "SELECT UPPER(name) AS name_upper FROM products;" },
    { "id": 3, "prompt": "Retrieve the LENGTH of each employee's first_name.", "ref": "SELECT first_name, LENGTH(first_name) AS name_len FROM employees;" },
    { "id": 4, "prompt": "Compute monthly salary (salary / 12 rounded to 2 decimal places) for all employees.", "ref": "SELECT first_name, ROUND(salary / 12.0, 2) AS monthly_salary FROM employees;" },
    { "id": 5, "prompt": "Extract the first 3 characters of each employee's first_name.", "ref": "SELECT first_name, SUBSTR(first_name, 1, 3) AS abbr FROM employees;" },
    { "id": 6, "prompt": "Replace '@manodemy.com' with '' to extract the username from employee emails.", "ref": "SELECT email, REPLACE(email, '@manodemy.com', '') AS username FROM employees;" },
    { "id": 7, "prompt": "Retrieve employees whose first_name in UPPER case equals 'PRIYA'.", "ref": "SELECT * FROM employees WHERE UPPER(first_name) = 'PRIYA';" },
    { "id": 8, "prompt": "Round the unit_price of each product to the nearest hundred (ROUND(price, -2)).", "ref": "SELECT name, ROUND(unit_price, -2) AS rounded_price FROM products;" },
    { "id": 9, "prompt": "Find the absolute difference between each employee's salary and 80000.", "ref": "SELECT first_name, ABS(salary - 80000) AS diff_from_80k FROM employees;" },
    { "id": 10, "prompt": "Retrieve the LOWER version of each customer's email.", "ref": "SELECT first_name, LOWER(email) AS email_lower FROM customers;" },
    { "id": 11, "prompt": "Find all products whose name starts with 'P' (using UPPER for case-insensitivity).", "ref": "SELECT * FROM products WHERE UPPER(name) LIKE 'P%';" },
    { "id": 12, "prompt": "Extract hire year (first 4 chars of hire_date) and count employees hired per year.", "ref": "SELECT SUBSTR(hire_date, 1, 4) AS hire_year, COUNT(*) AS cnt FROM employees GROUP BY hire_year;" },
    { "id": 13, "prompt": "Find products where TRIM(name) != name (has leading/trailing spaces).", "ref": "SELECT * FROM products WHERE TRIM(name) <> name;" },
    { "id": 14, "prompt": "Compute CEIL(salary / 10000) as a salary band for each employee.", "ref": "SELECT first_name, salary, CEIL(salary / 10000.0) AS salary_band FROM employees;" },
    { "id": 15, "prompt": "Find employees whose email username (before '@') has more than 10 characters.", "ref": "SELECT * FROM employees WHERE LENGTH(REPLACE(email, '@manodemy.com', '')) > 10;" },
    { "id": 16, "prompt": "Concatenate region and first_name as 'region: name' for customers.", "ref": "SELECT region || ': ' || first_name AS region_name FROM customers;" },
    { "id": 17, "prompt": "Find the FLOOR of each product's unit_price divided by 1000.", "ref": "SELECT name, FLOOR(unit_price / 1000.0) AS price_tier FROM products;" },
    { "id": 18, "prompt": "Extract the month from hire_date (characters 6-7) for all employees.", "ref": "SELECT first_name, SUBSTR(hire_date, 6, 2) AS hire_month FROM employees;" },
    { "id": 19, "prompt": "Find products whose name contains 'Chair' (case-insensitive with UPPER).", "ref": "SELECT * FROM products WHERE UPPER(name) LIKE '%CHAIR%';" },
    { "id": 20, "prompt": "Compute the profit margin percentage (rounded to 0 decimals) for each product.", "ref": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 0) AS margin_pct FROM products;" },
    { "id": 21, "prompt": "Find employees with first_name length greater than 5.", "ref": "SELECT * FROM employees WHERE LENGTH(first_name) > 5;" },
    { "id": 22, "prompt": "Get the position of '@' in each employee's email using INSTR.", "ref": "SELECT email, INSTR(email, '@') AS at_position FROM employees;" },
    { "id": 23, "prompt": "Retrieve product name in LOWER case and its length.", "ref": "SELECT LOWER(name) AS name_lower, LENGTH(name) AS name_len FROM products;" },
    { "id": 24, "prompt": "Replace 'Ergonomic' with 'Premium' in all product names.", "ref": "SELECT REPLACE(name, 'Ergonomic', 'Premium') AS new_name FROM products;" },
    { "id": 25, "prompt": "Compute salary + ABS(commission - 5000) for employees with commission IS NOT NULL.", "ref": "SELECT first_name, salary + ABS(commission - 5000) AS adjusted_comp FROM employees WHERE commission IS NOT NULL;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: String & Numeric Single-Row Functions", "recordingKey": null }
  ]
};
