// Day 03 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Pattern Matching & NULL Handling",
  "db": "retail",
  "emoji": "📝",
  "slides": [
    {
      "title": "Topic 01: Pattern Matching & NULL Handling",
      "duration": "0:00",
      "html": `
        <h2>📝 01. Pattern Matching &amp; NULL Handling</h2>
        
        <!-- Unboxed Intro Paragraph -->
        <p>In real-world databases, text records and data fields are rarely perfect matches. Standard SQL comparison operators like <code>=</code> require absolute character-by-character equality. To query records containing partial matches, spelling variations, or missing values, SQL provides powerful pattern matching predicates and dedicated three-valued logical operators.</p>

        <!-- PART 1: Pattern Matching & Wildcards -->
        <div class="slide-section">
          <h3>Pattern Matching &amp; Wildcards</h3>
          <p>The <strong>LIKE</strong> operator evaluates whether a character string matches a specified pattern. SQL defines two standard wildcard characters used inside matching templates:</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 20%;">Wildcard</th>
                  <th style="width: 40%;">Matching Criteria</th>
                  <th style="width: 40%;">Syntax Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>%</code></td>
                  <td>Matches <strong>zero or more</strong> characters of any type.</td>
                  <td><code>LIKE 'Sales%'</code> matches "Sales", "Sales Rep", or "Sales Executive".</td>
                </tr>
                <tr>
                  <td><code>_</code></td>
                  <td>Matches <strong>exactly one</strong> character of any type.</td>
                  <td><code>LIKE 'T_m'</code> matches "Tim", "Tom", or "Tam", but not "Team".</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔍 Common LIKE Patterns</h4>
              <pre>-- Starts with 'Data'
WHERE job_title LIKE 'Data%';

-- Ends with 'Manager'
WHERE job_title LIKE '%Manager';

-- Contains 'Analyst' anywhere
WHERE job_title LIKE '%Analyst%';

-- Exactly 5 characters long starting with 'P'
WHERE name LIKE 'P____';</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🛡️ Case Insensitivity &amp; Escaping</h4>
              <pre>-- PostgreSQL case-insensitive pattern match
WHERE email ILIKE '%@example.com';

-- Standard ANSI SQL case-insensitive match
WHERE LOWER(email) LIKE '%@example.com';

-- Escape literal wildcards using backslash
-- (Find promo codes containing "10%")
WHERE promo_code LIKE '%10\\%%' ESCAPE '\\';</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="performanceWildcards">
            <strong>💡 Performance Pro Tip — Leading Wildcards:</strong> Using a leading wildcard like <code>LIKE '%Text'</code> is non-sargable. It prevents the database optimizer from using B-Tree index seeks, forcing a full table scan. Minimize leading wildcards on large production tables.
          </div>
        </div>

        <!-- PART 2: NULL & Three-Valued Logic -->
        <div class="slide-section">
          <h3>NULL &amp; Three-Valued Logic (3VL)</h3>
          <p>In SQL, <strong>NULL</strong> represents the <strong>absence of a value</strong>. It is a marker indicating that data is missing, unknown, or inapplicable. It is **not** equivalent to a zero number, an empty string, or a boolean false.</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ The Invalid NULL Trap</h4>
              <p>Because NULL represents an unknown value, direct comparison against it using standard relational operators always yields <strong>UNKNOWN</strong>:</p>
              <pre>-- These evaluate to UNKNOWN (returning 0 rows):
SELECT NULL = NULL;     -- UNKNOWN
SELECT salary = NULL;   -- UNKNOWN
SELECT commission != 0; -- UNKNOWN (if commission is NULL)</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Correct NULL Filtering</h4>
              <p>To verify if a column value is missing or populated, you must use the unary operators <code>IS NULL</code> or <code>IS NOT NULL</code>:</p>
              <pre>-- Matches employees without a manager
SELECT * FROM employees 
WHERE manager_id IS NULL;

-- Matches employees with a recorded email
SELECT * FROM employees 
WHERE email IS NOT NULL;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="info-box" id="threeValuedLogicBox">
            <strong>🧠 Three-Valued Logic (3VL):</strong>
            <p>SQL uses three truth values: <strong>TRUE</strong>, <strong>FALSE</strong>, and <strong>UNKNOWN</strong>. WHERE clauses only return rows where the filter evaluates to <strong>TRUE</strong>. When joining NULL-able fields, logic gates collapse:
            <ul style="margin-top: 6px; padding-left: 18px;">
              <li><strong>TRUE AND UNKNOWN</strong> evaluates to <strong>UNKNOWN</strong> (discards row)</li>
              <li><strong>FALSE AND UNKNOWN</strong> evaluates to <strong>FALSE</strong> (discards row)</li>
              <li><strong>TRUE OR UNKNOWN</strong> evaluates to <strong>TRUE</strong> (accepts row)</li>
              <li><strong>FALSE OR UNKNOWN</strong> evaluates to <strong>UNKNOWN</strong> (discards row)</li>
            </ul>
            </p>
          </div>
        </div>

        <!-- PART 3: NULL Functions & Aggregates -->
        <div class="slide-section">
          <h3>NULL Functions &amp; Aggregates</h3>
          <p>To handle missing values gracefully in calculations and reports, SQL engines provide conditional functions that substitute defaults or enforce mathematical safety:</p>

          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔄 COALESCE &amp; NULLIF</h4>
              <p>These functions evaluate a list of parameters to clean up NULLs or generate them deliberately to avoid errors:</p>
              <pre>-- Returns first non-NULL value (defaults to 0)
SELECT salary + COALESCE(commission, 0)
FROM employees;

-- Safe division (returns NULL instead of DB crash)
SELECT revenue / NULLIF(units_sold, 0)
FROM sales;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>📊 Aggregates &amp; Sorting</h4>
              <p>Aggregates ignore NULLs, and sorting positions them at the beginning or end depending on query specifications:</p>
              <pre>-- AVG ignores NULLs, only averaging active numbers
SELECT AVG(commission) FROM employees;

-- Include NULLs as 0 in mathematical average
SELECT AVG(COALESCE(commission, 0)) FROM employees;

-- Explicit sorting placement
SELECT * FROM employees ORDER BY commission ASC NULLS LAST;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="notInNullTrap">
            <strong>⚠️ The NOT IN NULL Trap:</strong> Evaluating <code>val NOT IN (1, 2, NULL)</code> expands to <code>val != 1 AND val != 2 AND val != NULL</code>. Because <code>val != NULL</code> always yields <strong>UNKNOWN</strong>, the entire conjunct evaluates to <strong>UNKNOWN</strong>, causing the query to return **0 rows**. Always filter out NULLs when querying subqueries inside <code>NOT IN</code>, or rewrite using <code>NOT EXISTS</code>.
          </div>
        </div>

        <!-- PART 4: Unified Interview Questions -->
        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 16px;">🎓 Interview Q&amp;A — Pattern Matching &amp; NULLs</h4>
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q1: How does <code>LIKE</code> compare to standard equality operators in terms of performance?</strong></p>
              <p><em>A: <code>LIKE</code> is generally slower than <code>=</code> because it requires string pattern scanning. If a search pattern starts with a wildcard (e.g. <code>'%Sales'</code>), the engine cannot utilize indexes (non-sargable query) and performs a full table scan. In contrast, <code>LIKE 'Sales%'</code> can perform index seeks.</em></p>
            </div>
            
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q2: How do you query a literal percent (%) or underscore (_) character in text?</strong></p>
              <p><em>A: You specify an escape character using the <code>ESCAPE</code> clause. For example: <code>WHERE description LIKE '%\_%' ESCAPE '\'</code>. This treats the backslash as a literal signifier, treating the following underscore as a literal character rather than a wildcard.</em></p>
            </div>
            
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q3: Why doesn't the expression <code>NULL = NULL</code> return TRUE?</strong></p>
              <p><em>A: NULL represents an unknown value. Comparisons between two unknown values cannot determine equality because we don't know what either value actually is. Therefore, <code>NULL = NULL</code> evaluates to <strong>UNKNOWN</strong>.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q4: What is the difference between <code>COALESCE</code> and <code>NULLIF</code>?</strong></p>
              <p><em>A: <code>COALESCE</code> accepts multiple arguments and returns the first non-NULL parameter. It is used to supply fallbacks. <code>NULLIF</code> takes two arguments and returns NULL if they are equal; otherwise, it returns the first argument. It is used to prevent mathematical division-by-zero errors.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q5: How do aggregate functions handle NULL values?</strong></p>
              <p><em>A: Aggregate functions (like <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code>) ignore NULL values entirely. For example, <code>AVG(salary)</code> only averages rows with active numeric salaries. However, <code>COUNT(*)</code> counts all rows in a group, regardless of NULL columns.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q6: How do standard relational databases sort NULL values?</strong></p>
              <p><em>A: In standard SQL, NULL sorting behaviors vary by engine. PostgreSQL and Oracle treat NULLs as larger than any non-NULL value (sorting them last in ASC). MySQL and SQL Server treat them as smaller (sorting them first in ASC). You can explicitly control this placement using <code>ORDER BY column_name ASC NULLS LAST</code> or <code>NULLS FIRST</code>.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q7: What is three-valued logic and how does it affect row filtering?</strong></p>
              <p><em>A: Three-valued logic dictates that logical operations can result in TRUE, FALSE, or UNKNOWN. In a WHERE clause, rows are only returned if the final filter expression evaluates to TRUE. Rows that evaluate to FALSE or UNKNOWN are skipped, which is why filter queries like <code>WHERE salary > 50000</code> exclude NULL salary rows.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q8: How does <code>IS NOT NULL</code> treat empty strings (<code>""</code>)?</strong></p>
              <p><em>A: In standard SQL databases like PostgreSQL, MySQL, and SQL Server, an empty string is a valid text value with zero characters and is **not** NULL. Thus, <code>IS NOT NULL</code> returns TRUE. In Oracle, empty strings are treated as NULL values.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 12px 0;" />
            
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q9: How do you bypass the NOT IN NULL trap?</strong></p>
              <p><em>A: You can resolve this by adding an explicit filter to the subquery (e.g. <code>WHERE column IS NOT NULL</code>), or by using the <code>NOT EXISTS</code> operator, which handles matching records correctly in three-valued logic without complex subquery exclusions.</em></p>
            </div>

          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find all customers whose first_name starts with the letter 'A'.",
      "referenceSql": "SELECT * FROM customers WHERE first_name LIKE 'A%';"
    },
    {
      "id": 2,
      "prompt": "Find all products whose name contains 'Phone' (case-insensitive).",
      "referenceSql": "SELECT * FROM products WHERE LOWER(name) LIKE '%phone%';"
    },
    {
      "id": 3,
      "prompt": "Find all employees who do not receive a commission (commission is NULL).",
      "referenceSql": "SELECT * FROM employees WHERE commission IS NULL;"
    },
    {
      "id": 4,
      "prompt": "Find customers whose email address ends with '@example.com'.",
      "referenceSql": "SELECT * FROM customers WHERE email LIKE '%@example.com';"
    },
    {
      "id": 5,
      "prompt": "Clean up reports by replacing NULL commissions with 0. Retrieve first_name, last_name, and a clean_commission column using COALESCE.",
      "referenceSql": "SELECT first_name, last_name, COALESCE(commission, 0) AS clean_commission FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Find all products whose names are exactly 10 characters long. Use the underscore (_) wildcard.",
      "referenceSql": "SELECT * FROM products WHERE name LIKE '__________';"
    },
    {
      "id": 7,
      "prompt": "Find active employees (is_active = 1) whose manager_id is NOT NULL.",
      "referenceSql": "SELECT * FROM employees WHERE is_active = 1 AND manager_id IS NOT NULL;"
    },
    {
      "id": 8,
      "prompt": "Find orders that have not been shipped yet (shipped_date is NULL).",
      "referenceSql": "SELECT * FROM orders WHERE shipped_date IS NULL;"
    },
    {
      "id": 9,
      "prompt": "Find customers whose last_name contains 'Sh' (case-sensitive).",
      "referenceSql": "SELECT * FROM customers WHERE last_name LIKE '%Sh%';"
    },
    {
      "id": 10,
      "prompt": "Retrieve the names of employees and their total compensation (salary + commission) using COALESCE. Name the calculation column 'total_comp'.",
      "referenceSql": "SELECT first_name, last_name, salary + COALESCE(commission, 0) AS total_comp FROM employees;"
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
      "prompt": "Find all customers whose last_name ends with 'a'.",
      "ref": "SELECT * FROM customers WHERE last_name LIKE '%a';"
    },
    {
      "id": 3,
      "prompt": "Find all products whose name contains 'Book' (case-sensitive).",
      "ref": "SELECT * FROM products WHERE name LIKE '%Book%';"
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
      "prompt": "Find all orders whose shipped_date is NULL.",
      "ref": "SELECT * FROM orders WHERE shipped_date IS NULL;"
    },
    {
      "id": 7,
      "prompt": "Find all orders whose shipped_date is NOT NULL.",
      "ref": "SELECT * FROM orders WHERE shipped_date IS NOT NULL;"
    },
    {
      "id": 8,
      "prompt": "Retrieve all employees, showing first_name, last_name, and a column clean_commission that replaces NULL commission values with 0 using COALESCE.",
      "ref": "SELECT first_name, last_name, COALESCE(commission, 0) AS clean_commission FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Find all products whose name contains 'Desk' (case-sensitive).",
      "ref": "SELECT * FROM products WHERE name LIKE '%Desk%';"
    },
    {
      "id": 10,
      "prompt": "Find all products whose name starts with 'LED'.",
      "ref": "SELECT * FROM products WHERE name LIKE 'LED%';"
    },
    {
      "id": 11,
      "prompt": "Find all products whose name ends with 'Chair'.",
      "ref": "SELECT * FROM products WHERE name LIKE '%Chair';"
    },
    {
      "id": 12,
      "prompt": "Find customers whose email contains 'example.com'.",
      "ref": "SELECT * FROM customers WHERE email LIKE '%example.com%';"
    },
    {
      "id": 13,
      "prompt": "Find all products where category_id is NULL.",
      "ref": "SELECT * FROM products WHERE category_id IS NULL;"
    },
    {
      "id": 14,
      "prompt": "Find all products where category_id is NOT NULL.",
      "ref": "SELECT * FROM products WHERE category_id IS NOT NULL;"
    },
    {
      "id": 15,
      "prompt": "Select first_name, last_name, and commission from employees, sorted by commission ascending (showing NULLs last).",
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
      "prompt": "Find all products whose name contains 'Mouse' (case-sensitive).",
      "ref": "SELECT * FROM products WHERE name LIKE '%Mouse%';"
    },
    {
      "id": 19,
      "prompt": "Retrieve employee first_name, salary, and total compensation (salary + commission) named total_compensation, using COALESCE to handle NULL commission.",
      "ref": "SELECT first_name, salary, salary + COALESCE(commission, 0) AS total_compensation FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Find all products whose category_id is NOT NULL and unit_price is greater than 1000.",
      "ref": "SELECT * FROM products WHERE category_id IS NOT NULL AND unit_price > 1000;"
    },
    {
      "id": 21,
      "prompt": "Find active employees (is_active = 1) whose commission is NULL.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NULL;"
    },
    {
      "id": 22,
      "prompt": "Find customers whose region is NOT NULL.",
      "ref": "SELECT * FROM customers WHERE region IS NOT NULL;"
    },
    {
      "id": 23,
      "prompt": "Find all products whose name has exactly 8 characters. Use the underscore (_) wildcard.",
      "ref": "SELECT * FROM products WHERE name LIKE '________';"
    },
    {
      "id": 24,
      "prompt": "Find products whose category_id is NULL or stock_qty is less than 20.",
      "ref": "SELECT * FROM products WHERE category_id IS NULL OR stock_qty < 20;"
    },
    {
      "id": 25,
      "prompt": "Find active employees (is_active = 1) whose commission is NOT NULL and manager_id is NULL.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL AND manager_id IS NULL;"
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
