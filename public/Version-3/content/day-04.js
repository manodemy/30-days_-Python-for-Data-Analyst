// Day 04 — Operators & Expressions: Arithmetic, Logical Precedence, ALL/ANY, ESCAPE, NULL handling
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day04'] = {
  "day": 4,
  "title": "Operators & Expressions",
  "db": "retail",
  "emoji": "⚙️",
  "slides": [
    {
      "title": "Operators & Expressions in SQL",
      "duration": "0:00",
      "html": `
        <h2>⚙️ Operators & Expressions</h2>

        <div class="slide-section">
          <h3>01. Arithmetic Operators</h3>
          <p>SQL supports standard arithmetic operators that can be used in <code>SELECT</code> expressions, <code>WHERE</code> conditions, and <code>ORDER BY</code> clauses. They operate on numeric data types.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result (salary=80000)</th></tr></thead>
              <tbody>
                <tr><td><code>+</code></td><td>Addition</td><td><code>salary + 10000</code></td><td>90000</td></tr>
                <tr><td><code>-</code></td><td>Subtraction</td><td><code>salary - 5000</code></td><td>75000</td></tr>
                <tr><td><code>*</code></td><td>Multiplication</td><td><code>salary * 1.1</code></td><td>88000</td></tr>
                <tr><td><code>/</code></td><td>Division</td><td><code>salary / 12</code></td><td>6666.67</td></tr>
                <tr><td><code>%</code></td><td>Modulo (remainder)</td><td><code>salary % 7</code></td><td>varies</td></tr>
              </tbody>
            </table>
          </div>

          <pre><code>-- Compute monthly salary, annual bonus, and profit margin
SELECT first_name,
       salary,
       salary / 12           AS monthly_salary,
       salary * 0.10         AS annual_bonus,
       unit_price - cost_price AS gross_profit
FROM   employees;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Integer Division:</strong> In some SQL dialects, dividing two integers returns an integer (e.g. <code>7 / 2 = 3</code>, not <code>3.5</code>). Cast one operand to REAL: <code>CAST(salary AS REAL) / 12</code> or <code>salary * 1.0 / 12</code>.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Operator Precedence — Evaluation Order</h3>
          <p>SQL evaluates expressions following strict precedence rules. Higher precedence operators are evaluated first. When in doubt, use parentheses — they are always evaluated first.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Precedence</th><th>Operators</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1 (highest)</td><td><code>( )</code></td><td>Parentheses — explicitly group</td></tr>
                <tr><td>2</td><td><code>* / %</code></td><td>Multiplication, Division, Modulo</td></tr>
                <tr><td>3</td><td><code>+ -</code></td><td>Addition, Subtraction</td></tr>
                <tr><td>4</td><td><code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></td><td>Comparison operators</td></tr>
                <tr><td>5</td><td><code>NOT</code></td><td>Logical NOT</td></tr>
                <tr><td>6</td><td><code>AND</code></td><td>Logical AND</td></tr>
                <tr><td>7 (lowest)</td><td><code>OR</code></td><td>Logical OR</td></tr>
              </tbody>
            </table>
          </div>

          <pre><code>-- Without parentheses: AND binds before OR
-- Reads as: dept=10 OR (dept=20 AND salary>60000)
SELECT * FROM employees
WHERE department_id = 10 OR department_id = 20 AND salary > 60000;

-- With parentheses: explicit intent
SELECT * FROM employees
WHERE (department_id = 10 OR department_id = 20) AND salary > 60000;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. ALL and ANY — Subquery Comparison Modifiers</h3>
          <p><code>ALL</code> and <code>ANY</code> compare a value against a list or subquery result. They are typically used with comparison operators.</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>ANY (= SOME)</h4>
              <p>Returns TRUE if the condition is true for <em>at least one</em> value in the list.</p>
              <pre><code>-- Employees earning more than ANY
-- Data Science employee salary
SELECT first_name, salary
FROM employees
WHERE salary > ANY (
  SELECT salary FROM employees
  WHERE department_id = 20
);</code></pre>
            </div>
            <div class="vs-card">
              <h4>ALL</h4>
              <p>Returns TRUE if the condition is true for <em>every</em> value in the list.</p>
              <pre><code>-- Employees earning more than ALL
-- Marketing employee salaries
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
  SELECT salary FROM employees
  WHERE department_id = 30
);</code></pre>
            </div>
          </div>

          <div class="info-box">
            ℹ️ <code>= ANY (...)</code> is equivalent to <code>IN (...)</code>. <code>&lt;&gt; ALL (...)</code> is equivalent to <code>NOT IN (...)</code>. <code>ANY</code> is also written as <code>SOME</code> in the SQL standard.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. ESCAPE in LIKE — Searching for Literal Wildcards</h3>
          <p>If your data contains the literal characters <code>%</code> or <code>_</code>, you need to <strong>escape</strong> them in a <code>LIKE</code> pattern. The <code>ESCAPE</code> clause defines the escape character.</p>

          <pre><code>-- Find products whose name contains a literal '%' character
-- Using backslash as escape character
SELECT * FROM products
WHERE name LIKE '%50\%%' ESCAPE '\\';

-- Using '!' as escape character
SELECT * FROM products
WHERE name LIKE '%50!%%' ESCAPE '!';

-- Find emails containing literal '_' underscore
SELECT * FROM employees
WHERE email LIKE '%user!_name%' ESCAPE '!';</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip:</strong> In standard SQL, the ANSI escape character is <code>\\</code> (backslash). However, different databases have different defaults. Always explicitly specify <code>ESCAPE '!'</code> to write portable code.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Handling NULLs in Expressions and Conditions</h3>
          <p>NULL propagates through arithmetic and logical operations. Any arithmetic involving NULL returns NULL. Any comparison with NULL returns UNKNOWN. Use <code>COALESCE</code> to substitute a default value.</p>

          <pre><code>-- NULL propagation in arithmetic
SELECT first_name,
       commission,
       salary + commission          AS total_comp,   -- NULL if commission IS NULL
       salary + COALESCE(commission, 0) AS safe_comp  -- 0 replaces NULL
FROM   employees;

-- Filtering with NULL awareness
SELECT * FROM employees
WHERE  commission > 5000;   -- Excludes NULLs (NULL > 5000 is UNKNOWN)

SELECT * FROM employees
WHERE  commission > 5000
   OR  commission IS NULL;  -- Explicitly include NULLs</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — The Three-Valued Logic</h4>
            <div>
              <p><strong>Q: SQL uses three-valued logic — explain what that means.</strong></p>
              <p><em>A: Unlike classical Boolean logic (TRUE/FALSE), SQL adds a third value: UNKNOWN. Any comparison or operation involving NULL produces UNKNOWN. The WHERE clause only passes rows where the condition is TRUE — UNKNOWN rows are filtered out, just like FALSE rows. This is why NULL = NULL returns UNKNOWN, not TRUE, and you must use IS NULL instead.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Monthly Pay</strong><br/>Retrieve <code>first_name</code>, <code>salary</code>, and a computed <code>monthly_salary</code> column (salary divided by 12) for all employees.",
      "referenceSql": "SELECT first_name, salary, salary / 12.0 AS monthly_salary FROM employees;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Profit Margin</strong><br/>Retrieve <code>name</code>, <code>unit_price</code>, <code>cost_price</code>, and the gross profit (<code>unit_price - cost_price</code>) from <code>products</code>. Sort by gross profit descending.",
      "referenceSql": "SELECT name, unit_price, cost_price, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Total Compensation with COALESCE</strong><br/>Retrieve <code>first_name</code>, <code>salary</code>, <code>commission</code>, and a <code>total_comp</code> column that adds salary and commission, treating NULL commission as 0.",
      "referenceSql": "SELECT first_name, salary, commission, salary + COALESCE(commission, 0) AS total_comp FROM employees;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: High Earners Across Departments</strong><br/>Using explicit parentheses, find employees in department 10 or 20 who earn more than 70000.",
      "referenceSql": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 70000;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: ANY Operator</strong><br/>Find employees whose salary is greater than ANY salary in the Marketing department (department_id = 30).",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 30);"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Price Markup</strong><br/>Retrieve <code>name</code> and a <code>markup_price</code> column that represents <code>unit_price * 1.18</code> (price after 18% markup) from <code>products</code>.",
      "referenceSql": "SELECT name, unit_price * 1.18 AS markup_price FROM products;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Compute <code>monthly_salary</code> (salary / 12) for all employees.", "ref": "SELECT first_name, salary / 12.0 AS monthly_salary FROM employees;" },
    { "id": 2, "prompt": "Find employees with a calculated bonus (salary * 0.1) greater than 8000.", "ref": "SELECT * FROM employees WHERE salary * 0.1 > 8000;" },
    { "id": 3, "prompt": "Retrieve <code>name</code> and <code>gross_profit</code> (unit_price - cost_price) from products, sorted descending.", "ref": "SELECT name, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;" },
    { "id": 4, "prompt": "Retrieve employees in department_id 10 or 20 earning over 80000 (use parentheses).", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 80000;" },
    { "id": 5, "prompt": "Compute <code>total_comp</code> as salary + COALESCE(commission, 0) for all employees.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees;" },
    { "id": 6, "prompt": "Find employees whose salary is greater than ALL salaries in department_id = 50.", "ref": "SELECT first_name, salary FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 50);" },
    { "id": 7, "prompt": "Find products where unit_price modulo 1000 equals 0.", "ref": "SELECT * FROM products WHERE unit_price % 1000 = 0;" },
    { "id": 8, "prompt": "Retrieve <code>name</code> and a <code>discounted_price</code> (unit_price * 0.9) from products.", "ref": "SELECT name, unit_price * 0.9 AS discounted_price FROM products;" },
    { "id": 9, "prompt": "Find employees whose salary is greater than ANY salary in department_id = 40.", "ref": "SELECT first_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 40);" },
    { "id": 10, "prompt": "Retrieve <code>first_name</code>, <code>salary</code>, and <code>tax</code> (salary * 0.3) from employees.", "ref": "SELECT first_name, salary, salary * 0.3 AS tax FROM employees;" },
    { "id": 11, "prompt": "Find products whose unit_price divided by cost_price is greater than 1.5.", "ref": "SELECT * FROM products WHERE unit_price / cost_price > 1.5;" },
    { "id": 12, "prompt": "Find all employees who have a commission greater than 5000, OR a NULL commission.", "ref": "SELECT * FROM employees WHERE commission > 5000 OR commission IS NULL;" },
    { "id": 13, "prompt": "Retrieve orders where total_amount plus 500 is less than 5000.", "ref": "SELECT * FROM orders WHERE total_amount + 500 < 5000;" },
    { "id": 14, "prompt": "Retrieve employees from department 10 or 20, sorted by salary descending.", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) ORDER BY salary DESC;" },
    { "id": 15, "prompt": "Compute <code>profit_pct</code> = (unit_price - cost_price) * 100.0 / unit_price for all products.", "ref": "SELECT name, (unit_price - cost_price) * 100.0 / unit_price AS profit_pct FROM products;" },
    { "id": 16, "prompt": "Find employees where salary * 12 (annual) exceeds 1000000.", "ref": "SELECT * FROM employees WHERE salary * 12 > 1000000;" },
    { "id": 17, "prompt": "Retrieve all products and compute <code>stock_value</code> (stock_qty * unit_price).", "ref": "SELECT name, stock_qty * unit_price AS stock_value FROM products;" },
    { "id": 18, "prompt": "Find employees whose salary is greater than ALL salaries in department_id = 30.", "ref": "SELECT * FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 30);" },
    { "id": 19, "prompt": "Retrieve <code>first_name</code> and <code>salary_after_raise</code> (salary * 1.05) for active employees.", "ref": "SELECT first_name, salary * 1.05 AS salary_after_raise FROM employees WHERE is_active = 1;" },
    { "id": 20, "prompt": "Find orders where total_amount - 1000 is greater than 100000.", "ref": "SELECT * FROM orders WHERE total_amount - 1000 > 100000;" },
    { "id": 21, "prompt": "Compute <code>total_comp</code> for employees where total_comp (salary + COALESCE(commission,0)) is above 90000.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees WHERE salary + COALESCE(commission, 0) > 90000;" },
    { "id": 22, "prompt": "Find products where stock_qty * cost_price exceeds 100000.", "ref": "SELECT * FROM products WHERE stock_qty * cost_price > 100000;" },
    { "id": 23, "prompt": "Retrieve employees in dept 10 or 20 or 50, sorted by salary ASC.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20, 50) ORDER BY salary ASC;" },
    { "id": 24, "prompt": "Retrieve order_id, total_amount and a <code>vat</code> column (total_amount * 0.18) from orders.", "ref": "SELECT order_id, total_amount, total_amount * 0.18 AS vat FROM orders;" },
    { "id": 25, "prompt": "Find products where (unit_price - cost_price) > 5000.", "ref": "SELECT * FROM products WHERE unit_price - cost_price > 5000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Arithmetic, Precedence & Expressions", "recordingKey": null }
  ]
};
