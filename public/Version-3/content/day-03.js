// Day 03 — Filtering Data: WHERE, Comparison Operators, AND/OR/NOT, BETWEEN, IN, LIKE, IS NULL
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Filtering Data",
  "db": "retail",
  "emoji": "🔍",
  "slides": [
    {
      "title": "The WHERE Clause — Horizontal Row Filtering",
      "duration": "0:00",
      "html": `
        <h2>🔍 Filtering Data with WHERE</h2>

        <div class="slide-section">
          <h3>01. The WHERE Clause</h3>
          <p>The <code>WHERE</code> clause is SQL's <strong>row-level filter</strong>. It evaluates a boolean expression for each row in the table and keeps only those rows where the expression evaluates to <code>TRUE</code>. Rows that evaluate to <code>FALSE</code> or <code>NULL</code> are discarded.</p>

          <pre><code>SELECT first_name, salary
FROM   employees
WHERE  salary > 80000;</code></pre>

          <div class="info-box">
            ℹ️ <strong>Execution Order:</strong> <code>WHERE</code> is evaluated at Step 3 (after <code>FROM</code>/<code>JOIN</code>, before <code>GROUP BY</code>/<code>SELECT</code>). This means it cannot reference column aliases defined in <code>SELECT</code>.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Comparison Operators</h3>
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>=</code></td><td>Equal to</td><td><code>WHERE department_id = 10</code></td></tr>
                <tr><td><code>&lt;&gt;</code> or <code>!=</code></td><td>Not equal to</td><td><code>WHERE status &lt;&gt; 'Shipped'</code></td></tr>
                <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>WHERE salary &gt; 80000</code></td></tr>
                <tr><td><code>&gt;=</code></td><td>Greater than or equal</td><td><code>WHERE salary &gt;= 80000</code></td></tr>
                <tr><td><code>&lt;</code></td><td>Less than</td><td><code>WHERE stock_qty &lt; 20</code></td></tr>
                <tr><td><code>&lt;=</code></td><td>Less than or equal</td><td><code>WHERE unit_price &lt;= 5000</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>03. AND, OR, NOT — Combining Conditions</h3>
          <p>Multiple conditions can be combined with logical operators. <strong>Operator precedence</strong>: <code>NOT</code> binds tightest, then <code>AND</code>, then <code>OR</code>. Always use parentheses to make intent explicit.</p>

          <pre><code>-- AND: both conditions must be true
SELECT * FROM employees
WHERE  department_id = 20 AND salary > 70000;

-- OR: at least one condition must be true
SELECT * FROM employees
WHERE  department_id = 10 OR department_id = 20;

-- NOT: negates the condition
SELECT * FROM employees
WHERE  NOT is_active = 1;

-- Mixed — use parentheses for clarity!
SELECT * FROM employees
WHERE  (department_id = 10 OR department_id = 20)
  AND  salary > 60000;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Precedence Trap:</strong> <code>WHERE dept = 10 OR dept = 20 AND salary &gt; 60000</code> is interpreted as <code>WHERE dept = 10 OR (dept = 20 AND salary &gt; 60000)</code> — NOT what you might intend! Always use parentheses with mixed AND/OR.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. BETWEEN — Inclusive Range Filter</h3>
          <p><code>BETWEEN low AND high</code> is inclusive on both ends — equivalent to <code>&gt;= low AND &lt;= high</code>. Works on numbers, dates, and text.</p>

          <pre><code>-- Numeric range
SELECT first_name, salary
FROM   employees
WHERE  salary BETWEEN 50000 AND 90000;

-- Date range
SELECT order_id, order_date, total_amount
FROM   orders
WHERE  order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- NOT BETWEEN excludes the range
SELECT * FROM products
WHERE  unit_price NOT BETWEEN 1000 AND 5000;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip:</strong> <code>BETWEEN</code> on dates: The high end is <em>midnight of that day</em> (i.e., the start of the day). To include the full last day, use <code>&lt; '2024-12-32'</code> or <code>&lt;= '2024-12-31 23:59:59'</code> for datetime columns.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. IN — Matching a List of Values</h3>
          <p><code>IN (...)</code> is shorthand for multiple <code>OR</code> conditions. It checks whether a column's value exists in a given list. <code>NOT IN</code> returns rows where the value is absent from the list.</p>

          <pre><code>-- Equivalent to department_id = 10 OR department_id = 20 OR department_id = 30
SELECT first_name, department_id
FROM   employees
WHERE  department_id IN (10, 20, 30);

-- NOT IN: exclude these departments
SELECT first_name, department_id
FROM   employees
WHERE  department_id NOT IN (10, 20);

-- IN with strings
SELECT * FROM customers
WHERE  region IN ('North', 'South', 'East');</code></pre>

          <div class="warn-box">
            ⚠️ <strong>NOT IN with NULLs:</strong> If the list contains <code>NULL</code>, <code>NOT IN</code> returns <em>no rows at all</em> — because any comparison with <code>NULL</code> yields <code>UNKNOWN</code>, not <code>TRUE</code>. Always use <code>NOT EXISTS</code> or handle NULLs explicitly when the subquery could return NULL.
          </div>
        </div>

        <div class="slide-section">
          <h3>06. LIKE — Pattern Matching with Wildcards</h3>
          <p><code>LIKE</code> enables pattern-based string matching. Two wildcard characters are supported:</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>% — Zero or More Characters</h4>
              <pre><code>-- Names starting with 'R'
WHERE first_name LIKE 'R%'

-- Names ending with 'a'
WHERE first_name LIKE '%a'

-- Names containing 'esh'
WHERE first_name LIKE '%esh%'</code></pre>
            </div>
            <div class="vs-card">
              <h4>_ — Exactly One Character</h4>
              <pre><code>-- 5-letter names starting with 'R'
WHERE first_name LIKE 'R____'

-- Email with exactly 2 chars before @
WHERE email LIKE '__@%'

-- NOT LIKE to exclude patterns
WHERE email NOT LIKE '%@gmail%'</code></pre>
            </div>
          </div>

          <div class="info-box">
            ℹ️ <strong>Case Sensitivity:</strong> In SQLite and MySQL, <code>LIKE</code> is case-insensitive by default for ASCII characters. In PostgreSQL, use <code>ILIKE</code> for case-insensitive matching, or <code>LIKE</code> is case-sensitive.
          </div>
        </div>

        <div class="slide-section">
          <h3>07. IS NULL & IS NOT NULL</h3>
          <p><code>NULL</code> represents a missing or unknown value. You <strong>cannot</strong> use <code>= NULL</code> to check for nullity — it always returns <code>UNKNOWN</code>. Use <code>IS NULL</code> and <code>IS NOT NULL</code> instead.</p>

          <pre><code>-- Employees without a manager (top-level)
SELECT first_name, manager_id
FROM   employees
WHERE  manager_id IS NULL;

-- Employees with a manager
SELECT first_name, manager_id
FROM   employees
WHERE  manager_id IS NOT NULL;

-- Employees with no commission
SELECT first_name, commission
FROM   employees
WHERE  commission IS NULL;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — NULL Comparison</h4>
            <div>
              <p><strong>Q: Why does WHERE commission = NULL return no rows?</strong></p>
              <p><em>A: In SQL, any arithmetic or comparison involving NULL produces UNKNOWN (a third truth value). Since WHERE only keeps rows that evaluate to TRUE, rows where commission IS NULL are excluded. The correct syntax is WHERE commission IS NULL.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: High-Value Products</strong><br/>Retrieve the <code>name</code> and <code>unit_price</code> of all products with a price greater than 10000.",
      "referenceSql": "SELECT name, unit_price FROM products WHERE unit_price > 10000;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Regional Customers</strong><br/>Retrieve <code>first_name</code>, <code>last_name</code>, and <code>region</code> for customers in the 'North' or 'East' region.",
      "referenceSql": "SELECT first_name, last_name, region FROM customers WHERE region IN ('North', 'East');"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Mid-Range Salary Band</strong><br/>Find employees earning between 60000 and 100000 (inclusive). Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code>.",
      "referenceSql": "SELECT first_name, last_name, salary FROM employees WHERE salary BETWEEN 60000 AND 100000;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Name Search</strong><br/>Find all employees whose <code>first_name</code> starts with the letter 'R'.",
      "referenceSql": "SELECT * FROM employees WHERE first_name LIKE 'R%';"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Active Data Science Team</strong><br/>Find active employees (<code>is_active = 1</code>) in the Data Science department (<code>department_id = 20</code>).",
      "referenceSql": "SELECT * FROM employees WHERE is_active = 1 AND department_id = 20;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Employees Without Commission</strong><br/>Find all employees who have no commission assigned. Retrieve <code>first_name</code>, <code>last_name</code>, and <code>commission</code>.",
      "referenceSql": "SELECT first_name, last_name, commission FROM employees WHERE commission IS NULL;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Retrieve all employees with salary greater than 80000.", "ref": "SELECT * FROM employees WHERE salary > 80000;" },
    { "id": 2, "prompt": "Find products with <code>unit_price</code> less than or equal to 2000.", "ref": "SELECT * FROM products WHERE unit_price <= 2000;" },
    { "id": 3, "prompt": "Find customers in the 'North' region.", "ref": "SELECT * FROM customers WHERE region = 'North';" },
    { "id": 4, "prompt": "Find employees in <code>department_id</code> 10 with salary above 70000.", "ref": "SELECT * FROM employees WHERE department_id = 10 AND salary > 70000;" },
    { "id": 5, "prompt": "Find employees in <code>department_id</code> 10 or 20.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20);" },
    { "id": 6, "prompt": "Retrieve orders with <code>total_amount</code> between 5000 and 50000.", "ref": "SELECT * FROM orders WHERE total_amount BETWEEN 5000 AND 50000;" },
    { "id": 7, "prompt": "Find all customers who signed up after 2022-12-31.", "ref": "SELECT * FROM customers WHERE signup_date > '2022-12-31';" },
    { "id": 8, "prompt": "Find products whose <code>name</code> contains the word 'Mouse'.", "ref": "SELECT * FROM products WHERE name LIKE '%Mouse%';" },
    { "id": 9, "prompt": "Find employees who do NOT have a <code>manager_id</code> (they are top-level).", "ref": "SELECT * FROM employees WHERE manager_id IS NULL;" },
    { "id": 10, "prompt": "Find all orders that are NOT 'Shipped'.", "ref": "SELECT * FROM orders WHERE status <> 'Shipped';" },
    { "id": 11, "prompt": "Retrieve employees with <code>salary</code> between 45000 and 70000.", "ref": "SELECT * FROM employees WHERE salary BETWEEN 45000 AND 70000;" },
    { "id": 12, "prompt": "Find active employees (<code>is_active = 1</code>) with a commission assigned (not NULL).", "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL;" },
    { "id": 13, "prompt": "Find products in <code>category_id</code> 5 or 6.", "ref": "SELECT * FROM products WHERE category_id IN (5, 6);" },
    { "id": 14, "prompt": "Find employees whose <code>first_name</code> starts with 'S'.", "ref": "SELECT * FROM employees WHERE first_name LIKE 'S%';" },
    { "id": 15, "prompt": "Find customers from the 'South' or 'West' region who signed up before 2023-01-01.", "ref": "SELECT * FROM customers WHERE region IN ('South', 'West') AND signup_date < '2023-01-01';" },
    { "id": 16, "prompt": "Retrieve products where <code>stock_qty</code> is less than 20.", "ref": "SELECT * FROM products WHERE stock_qty < 20;" },
    { "id": 17, "prompt": "Find employees who earn more than 90000 AND were hired before 2021-01-01.", "ref": "SELECT * FROM employees WHERE salary > 90000 AND hire_date < '2021-01-01';" },
    { "id": 18, "prompt": "Find orders placed in 2024 (order_date between 2024-01-01 and 2024-12-31).", "ref": "SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 19, "prompt": "Find employees whose <code>job_title</code> contains 'Manager'.", "ref": "SELECT * FROM employees WHERE job_title LIKE '%Manager%';" },
    { "id": 20, "prompt": "Retrieve employees whose <code>department_id</code> is NOT in (10, 20, 30).", "ref": "SELECT * FROM employees WHERE department_id NOT IN (10, 20, 30);" },
    { "id": 21, "prompt": "Find products whose <code>name</code> ends with 'Book'.", "ref": "SELECT * FROM products WHERE name LIKE '%Book';" },
    { "id": 22, "prompt": "Find orders with <code>status</code> = 'Processing' and <code>total_amount</code> > 3000.", "ref": "SELECT * FROM orders WHERE status = 'Processing' AND total_amount > 3000;" },
    { "id": 23, "prompt": "Find all employees in <code>department_id</code> 20 who are NOT active.", "ref": "SELECT * FROM employees WHERE department_id = 20 AND is_active = 0;" },
    { "id": 24, "prompt": "Find customers whose <code>email</code> contains '@example.com'.", "ref": "SELECT * FROM customers WHERE email LIKE '%@example.com';" },
    { "id": 25, "prompt": "Find employees earning more than 80000 OR having commission greater than 10000.", "ref": "SELECT * FROM employees WHERE salary > 80000 OR commission > 10000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: WHERE & Comparison Operators", "recordingKey": null }
  ]
};
