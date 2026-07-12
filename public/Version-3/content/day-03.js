// Day 03 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Pattern Matching & NULL Handling",
  "db": "retail",
  "emoji": "📝",
  "slides": [
    {
      "title": "Topic 01: Pattern Matching & wildcards",
      "duration": "0:00",
      "html": `
        <h2>📝 01. Pattern Matching &amp; Wildcards</h2>
        <div class="slide-section">
          <p>Standard SQL comparisons like <code>=</code> check for absolute equality. For data queries searching for partial text strings, SQL provides the <code>LIKE</code> operator alongside wildcard markers:</p>
          
          <div class="rdbms-intro-section" id="likeWildcardConcepts">
            <h3 style="margin-top: 0;">Wildcard Operators Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
              <thead>
                <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Wildcard</th>
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Matching Meaning</th>
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Syntax Example</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>%</code></td>
                  <td style="padding: 6px 8px;">Matches <strong>zero or more</strong> characters of any type.</td>
                  <td style="padding: 6px 8px;"><code>'%analyst'</code> matches "data analyst", "lead analyst", or just "analyst".</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>_</code></td>
                  <td style="padding: 6px 8px;">Matches <strong>exactly one</strong> character of any type.</td>
                  <td style="padding: 6px 8px;"><code>'An_a'</code> matches "Anna", "Anya", or "Anita" (if exactly one character fits).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔍 Common LIKE Patterns</h4>
              <pre>-- Starts with 'Sales'
WHERE job_title LIKE 'Sales%';

-- Ends with 'Manager'
WHERE job_title LIKE '%Manager';

-- Contains 'data' anywhere
WHERE job_title LIKE '%data%';

-- Exactly 5 characters long and starts with 'A'
WHERE first_name LIKE 'A____';</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🛡️ Case Insensitivity &amp; Escaping</h4>
              <pre>-- Case-insensitive pattern match (PostgreSQL specific)
WHERE email ILIKE '%@gmail.com';

-- Standard SQL case-insensitive match (all engines)
WHERE LOWER(email) LIKE '%@gmail.com';

-- Escape literal '%' or '_' characters
-- (Find values containing "10%")
WHERE promo_code LIKE '%10\\%%' ESCAPE '\\';</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="performanceWildcards">
            <strong>💡 Performance Pro Tip — Leading Wildcards:</strong> Using a leading wildcard like <code>LIKE '%text%'</code> is non-sargable. It forces the query optimizer to perform a full table scan because it cannot traverse a B-Tree index from right to left. Avoid leading wildcards on millions of rows.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does <code>LIKE</code> compare to standard comparison operators in terms of performance?</strong></p>
              <p><em>A: LIKE is generally slower than <code>=</code> because it requires character-by-character pattern scanning. More importantly, if the search pattern starts with a wildcard (e.g. <code>'%sales'</code>), the database engine cannot perform index seeks and is forced to fall back to a full table scan, degrading execution speed on large datasets.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How do you search for a literal underscore (_) or percent (%) character in a text field?</strong></p>
              <p><em>A: You specify an escape character using the <code>ESCAPE</code> clause. For example, to match an underscore, you write <code>WHERE text_column LIKE '%\_%' ESCAPE '\'</code>. This tells the SQL compiler to treat the character immediately following the backslash as a literal symbol rather than a pattern wildcard.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the PostgreSQL <code>ILIKE</code> operator, and how do you write standard SQL equivalents?</strong></p>
              <p><em>A: <code>ILIKE</code> is a PostgreSQL vendor extension for case-insensitive pattern matching. To achieve the exact same behavior in standard ANSI SQL across all relational database systems (like MySQL, SQL Server, and SQLite), you convert the text column to lowercase using the <code>LOWER()</code> function, then perform a standard <code>LIKE</code> match: <code>WHERE LOWER(column_name) LIKE '%pattern%'</code>.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 02: NULL & Three-Valued Logic",
      "duration": "0:00",
      "html": `
        <h2>❓ 02. NULL &amp; Three-Valued Logic</h2>
        <div class="slide-section">
          <p>In relational databases, <code>NULL</code> represents the <strong>absence of a value</strong>. It does not represent zero, an empty string, or a boolean false. It is simply <em>unknown</em>.</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ The Invalid NULL Trap</h4>
              <p>Because NULL is unknown, comparisons against it using standard logical operators yield <code>UNKNOWN</code> (never TRUE or FALSE):</p>
              <pre>-- These ALWAYS evaluate to UNKNOWN (returns 0 rows):
SELECT NULL = NULL;   -- UNKNOWN
SELECT NULL = 5;      -- UNKNOWN
SELECT NULL != 5;     -- UNKNOWN
SELECT salary = NULL; -- UNKNOWN (row rejected!)</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Correct NULL Filtering</h4>
              <p>To verify if a field is NULL or has a valid value, you must use the unary SQL operators <code>IS NULL</code> or <code>IS NOT NULL</code>:</p>
              <pre>-- Correct way to query manager status:
SELECT * FROM employees 
WHERE manager_id IS NULL; -- Top executive rows

-- Correct way to query contact status:
SELECT * FROM employees 
WHERE phone IS NOT NULL; -- Row list with values</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="info-box" id="threeValuedLogicBox">
            <strong>🧠 Three-Valued Logic (3VL):</strong>
            <p>SQL uses three truth values: <code>TRUE</code>, <code>FALSE</code>, and <code>UNKNOWN</code>. When joining conditions, remember:
            <ul>
              <li><code>TRUE AND UNKNOWN</code> evaluates to <strong>UNKNOWN</strong></li>
              <li><code>FALSE AND UNKNOWN</code> evaluates to <strong>FALSE</strong></li>
              <li><code>TRUE OR UNKNOWN</code> evaluates to <strong>TRUE</strong></li>
              <li><code>FALSE OR UNKNOWN</code> evaluates to <strong>UNKNOWN</strong></li>
            </ul>
            </p>
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: If NULL represents nothing, why doesn't the expression <code>NULL = NULL</code> return TRUE?</strong></p>
              <p><em>A: In SQL, NULL indicates an "unknown" or "missing" value. When comparing two unknown values, we cannot determine if they are identical. Therefore, <code>NULL = NULL</code> yields <code>UNKNOWN</code> (not TRUE or FALSE). To explicitly compare columns that may contain NULLs, SQL Standard provides the <code>IS DISTINCT FROM</code> predicate.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is three-valued logic, and how does it impact row filters in a WHERE clause?</strong></p>
              <p><em>A: Three-valued logic defines the truth tables for TRUE, FALSE, and UNKNOWN. In a WHERE clause, a row is only returned if the final logical evaluation is explicitly TRUE. If the filter condition evaluates to FALSE or UNKNOWN, the row is discarded. This is why rows with NULL values are excluded when using standard filters like <code>WHERE salary > 50000</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does <code>IS NOT NULL</code> handle columns that contain empty strings (<code>""</code>)?</strong></p>
              <p><em>A: In standard SQL and databases like MySQL, PostgreSQL, and SQL Server, an empty string is a valid text value with zero length, so it is **not** NULL. Thus, <code>IS NOT NULL</code> returns TRUE for empty strings. However, in Oracle Database, empty strings are treated as NULL values, so they behave identically under NULL checks.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 03: NULL Functions & Aggregates",
      "duration": "0:00",
      "html": `
        <h2>⚙️ 03. NULL Functions &amp; Aggregates</h2>
        <div class="slide-section">
          <p>Handling and cleaning NULL values is critical for accurate calculations and summaries. SQL provides built-in conditional functions to replace and evaluate NULL values:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔄 COALESCE &amp; NULLIF</h4>
              <p>These functions replace NULLs with default fallbacks, or create NULLs to prevent errors:</p>
              <pre>-- COALESCE returns the first non-NULL value
SELECT salary + COALESCE(commission, 0)
FROM employees;

-- Multiple fallback hierarchy
SELECT COALESCE(pref_name, first_name, 'Guest');

-- NULLIF returns NULL if values are equal
-- (Safe division: returns NULL instead of throwing 0 error)
SELECT revenue / NULLIF(units_sold, 0);</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>📊 Aggregates &amp; Sort Behaviors</h4>
              <p>Aggregates ignore NULLs, and sorting places them at the beginning/end depending on database engine settings:</p>
              <pre>-- AVG ignores NULLs (only averages rows with values!)
SELECT AVG(commission) FROM employees;

-- AVG across all employees (treating NULL commission as 0)
SELECT AVG(COALESCE(commission, 0)) FROM employees;

-- Explicit NULL sorting placement
SELECT first_name, commission FROM employees
ORDER BY commission ASC NULLS LAST;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="notInNullTrap">
            <strong>⚠️ The NOT IN NULL Trap:</strong> Evaluating <code>x NOT IN (1, 2, NULL)</code> resolves to <code>x != 1 AND x != 2 AND x != NULL</code>. Because <code>x != NULL</code> always yields <code>UNKNOWN</code>, the entire filter evaluates to UNKNOWN, returning 0 rows. Always filter out NULLs when using subqueries inside <code>NOT IN</code>, or rewrite using <code>NOT EXISTS</code>.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the difference between <code>COALESCE</code> and <code>NULLIF</code>?</strong></p>
              <p><em>A: <code>COALESCE</code> receives multiple arguments and returns the first one that is NOT NULL (used for fallbacks). <code>NULLIF</code> receives two arguments and returns NULL if they are equal, otherwise returning the first argument (used to prevent errors like division-by-zero).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does <code>AVG(commission)</code> yield different results from <code>SUM(commission)/COUNT(*)</code>?</strong></p>
              <p><em>A: <code>AVG(commission)</code> ignores rows where commission is NULL, dividing the sum only by rows containing valid numbers. <code>COUNT(*)</code>, however, counts all rows in the table. If any row has a NULL commission, it acts as a zero in terms of salary impact but is counted in the denominator for <code>COUNT(*)</code>, leading to a smaller average.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does a query using <code>NOT IN</code> return zero rows if the subquery contains a single NULL?</strong></p>
              <p><em>A: In SQL, <code>NOT IN</code> evaluates to a chain of <code>AND</code> checks. If a single value in that list is NULL, the check <code>x != NULL</code> evaluates to UNKNOWN. In three-valued logic, any chain of conjuncts containing an UNKNOWN (e.g. <code>TRUE AND TRUE AND UNKNOWN</code>) evaluates to UNKNOWN, causing the WHERE filter to discard all rows.</em></p>
            </div>
          </div>
        </div>
      `
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
      "referenceSql": "SELECT * FROM products WHERE LOWER(name) LIKE '%phone%';"
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
      "prompt": "Retrieve employee details with a column <code>clean_commission</code> that uses <code>COALESCE</code> to replace NULL commission with 0.",
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
      "ref": "SELECT first_name, last_name, commission FROM employees ORDER BY commission ASC NULLS LAST;"
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
      "label": "Topic 1: Pattern Matching",
      "recordingKey": null
    },
    {
      "id": "topic-2",
      "label": "Topic 2: NULL & Three-Valued Logic",
      "recordingKey": null
    },
    {
      "id": "topic-3",
      "label": "Topic 3: NULL Functions & Aggregates",
      "recordingKey": null
    }
  ]
};
