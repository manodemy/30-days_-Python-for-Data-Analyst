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

          <pre><code>-- Compute monthly salary, annual bonus, and gross profit
SELECT first_name,
       salary,
       salary / 12.0            AS monthly_salary,
       salary * 0.10            AS annual_bonus
FROM   employees;

SELECT name,
       unit_price,
       cost_price,
       unit_price - cost_price  AS gross_profit
FROM   products;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Integer Division:</strong> In some SQL dialects, dividing two integers returns an integer (e.g. <code>7 / 2 = 3</code>, not <code>3.5</code>). Cast one operand to REAL or multiply by <code>1.0</code>: <code>salary * 1.0 / 12</code>. In SQLite, <code>/</code> between integers truncates — always include a decimal when you need precision.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Operator Precedence — Evaluation Order</h3>
          <p>SQL evaluates expressions following strict precedence rules. Higher-precedence operators bind tighter. When in doubt, use parentheses — they are always evaluated first and make intent explicit.</p>

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

          <pre><code>-- Without parentheses: AND binds tighter than OR
-- Reads as: dept=10 OR (dept=20 AND salary>60000)
SELECT * FROM employees
WHERE department_id = 10 OR department_id = 20 AND salary > 60000;

-- With parentheses: explicit intent (both depts, salary>60000)
SELECT * FROM employees
WHERE (department_id = 10 OR department_id = 20) AND salary > 60000;</code></pre>

          <div class="info-box">
            ℹ️ <strong>Always parenthesise mixed <code>AND</code>/<code>OR</code>.</strong> Relying on implicit precedence is a common source of production bugs. Parentheses are free, they document intent, and they override precedence when you need it.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. ALL and ANY — Subquery Comparison Modifiers</h3>
          <p><code>ALL</code> and <code>ANY</code> (also written <code>SOME</code>) compare a value against every / any row returned by a subquery. They are part of the SQL standard and appear frequently in interviews.</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>&gt; ANY (…)</h4>
              <p>TRUE if the value is greater than <em>at least one</em> value in the list — i.e. greater than the <strong>minimum</strong>.</p>
              <pre><code>-- Earn more than at least one
-- Marketing employee
SELECT first_name, salary
FROM employees
WHERE salary > ANY (
  SELECT salary FROM employees
  WHERE department_id = 30
);
-- Equivalent: > (SELECT MIN(salary) ...)</code></pre>
            </div>
            <div class="vs-card">
              <h4>&gt; ALL (…)</h4>
              <p>TRUE if the value is greater than <em>every</em> value in the list — i.e. greater than the <strong>maximum</strong>.</p>
              <pre><code>-- Earn more than every
-- Sales employee
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
  SELECT salary FROM employees
  WHERE department_id = 40
);
-- Equivalent: > (SELECT MAX(salary) ...)</code></pre>
            </div>
          </div>

          <div class="warn-box">
            ⚠️ <strong>Engine support:</strong> <code>ALL</code>/<code>ANY</code> are standard SQL but <strong>not implemented in SQLite</strong> (the engine used in this playground). For runnable queries here, rewrite using <code>&gt; (SELECT MIN(...))</code> for <code>ANY</code> and <code>&gt; (SELECT MAX(...))</code> for <code>ALL</code>. MySQL and PostgreSQL support them natively.
          </div>

          <div class="pro-tip-box">
            💡 <strong>Equivalences to memorise:</strong> <code>= ANY (...)</code> ≡ <code>IN (...)</code>; <code>&lt;&gt; ALL (...)</code> ≡ <code>NOT IN (...)</code>; <code>&gt; ALL (...)</code> ≡ <code>&gt; (SELECT MAX(...))</code>; <code>&gt; ANY (...)</code> ≡ <code>&gt; (SELECT MIN(...))</code>.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. ESCAPE in LIKE — Searching for Literal Wildcards</h3>
          <p>If your data contains the literal characters <code>%</code> or <code>_</code>, you must <strong>escape</strong> them in a <code>LIKE</code> pattern. The <code>ESCAPE</code> clause declares which character to treat as the escape character.</p>

          <pre><code>-- Find products whose name contains a literal '%' character.
-- Here '!' is the escape char; '!!' = literal '!', '!%' = literal '%'.
SELECT name FROM products
WHERE name LIKE '%50!%%' ESCAPE '!';

-- Find emails containing a literal '_' underscore
SELECT first_name, email FROM employees
WHERE email LIKE '%!_%' ESCAPE '!';</code></pre>

          <pre><code>-- Practical: rows in raw_customers whose name starts with a space
SELECT name FROM raw_customers
WHERE name LIKE ' %';</code></pre>

          <div class="info-box">
            ℹ️ <strong>Which escape char?</strong> There is no fixed default in standard SQL — always specify <code>ESCAPE '!'</code> (or another chosen char) explicitly. Common choices are <code>\\</code>, <code>!</code>, or <code>#</code>. Once declared, that character escapes itself: <code>!!</code> matches a literal <code>!</code>.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Handling NULLs in Expressions and Conditions</h3>
          <p>NULL propagates through arithmetic and produces UNKNOWN in comparisons. Any arithmetic with NULL yields NULL; any comparison with NULL yields UNKNOWN, which <code>WHERE</code> treats the same as FALSE (the row is filtered out). Use <code>COALESCE</code> to substitute a default.</p>

          <pre><code>-- NULL propagation in arithmetic
SELECT first_name,
       commission,
       salary + commission                  AS total_comp,    -- NULL when commission is NULL
       salary + COALESCE(commission, 0)     AS safe_comp      -- 0 replaces NULL
FROM   employees;

-- Filtering with NULL awareness
SELECT * FROM employees
WHERE  commission > 5000;        -- Excludes NULLs (NULL > 5000 is UNKNOWN)

SELECT * FROM employees
WHERE  commission > 5000
   OR  commission IS NULL;       -- Explicitly include NULLs</code></pre>

          <div class="info-box">
            ℹ️ <strong>NULL ≠ 0.</strong> NULL means "unknown", not "zero". <code>salary + NULL</code> is NULL (not salary). <code>NULL = NULL</code> is UNKNOWN (not TRUE) — use <code>IS NULL</code> / <code>IS NOT NULL</code> to test for NULL.
          </div>
        </div>

        <div class="slide-section">
          <h3>06. Three-Valued Logic (TRUE / FALSE / UNKNOWN)</h3>
          <p>SQL uses three-valued logic. Every condition evaluates to TRUE, FALSE, or UNKNOWN. <code>WHERE</code> keeps rows only when the predicate is TRUE; both FALSE and UNKNOWN rows are discarded. This is why <code>NOT IN</code> with a NULL in the list returns no rows.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Expression</th><th>Result</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td><code>5 = 5</code></td><td>TRUE</td><td>Equal values</td></tr>
                <tr><td><code>5 = NULL</code></td><td>UNKNOWN</td><td>Comparison with NULL</td></tr>
                <tr><td><code>NULL = NULL</code></td><td>UNKNOWN</td><td>Two unknowns</td></tr>
                <tr><td><code>NOT UNKNOWN</code></td><td>UNKNOWN</td><td>NOT of unknown stays unknown</td></tr>
                <tr><td><code>TRUE AND UNKNOWN</code></td><td>UNKNOWN</td><td>Unknown dominates</td></tr>
                <tr><td><code>FALSE OR UNKNOWN</code></td><td>UNKNOWN</td><td>Not definitely true</td></tr>
              </tbody>
            </table>
          </div>

          <pre><code>-- The NOT IN + NULL trap
SELECT first_name FROM employees
WHERE salary NOT IN (SELECT commission FROM employees);
-- If the subquery returns ANY NULL, the whole result is EMPTY,
-- because salary != UNKNOWN for every row. Safer:</code></pre>

          <div class="warn-box">
            ⚠️ <strong>The <code>NOT IN</code> NULL trap:</strong> If the right-hand list contains a NULL, <code>x NOT IN (...)</code> evaluates to UNKNOWN for every row, returning <strong>zero rows</strong>. Always filter NULLs out of the subquery, or use <code>NOT EXISTS</code> instead.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎯 Interview Q&amp;A — Operators &amp; Expressions</h4>

            <p><strong>Q1: Explain SQL's operator precedence. Which binds tighter, AND or OR?</strong></p>
            <p><em>A: Parentheses bind tightest, then arithmetic (<code>* / %</code> before <code>+ -</code>), then comparisons (<code>= &lt; &gt;</code>), then <code>NOT</code>, then <code>AND</code>, and finally <code>OR</code> binds loosest. So <code>a OR b AND c</code> is parsed as <code>a OR (b AND c)</code>. Best practice: always parenthesise mixed AND/OR to make intent explicit.</em></p>

            <p><strong>Q2: What is three-valued logic in SQL?</strong></p>
            <p><em>A: SQL predicates evaluate to TRUE, FALSE, or UNKNOWN. UNKNOWN arises from any comparison or arithmetic involving NULL. The WHERE clause keeps only rows where the predicate is TRUE; UNKNOWN rows are discarded just like FALSE rows. This third value is the root of most NULL-related surprises.</em></p>

            <p><strong>Q3: Why does <code>NULL = NULL</code> return UNKNOWN (effectively FALSE) instead of TRUE?</strong></p>
            <p><em>A: Because NULL means "unknown value", not "a specific value". Two unknowns cannot be compared for equality — they might or might not be the same. SQL therefore returns UNKNOWN, and WHERE discards the row. Use <code>IS NULL</code> to test for the absence of a value.</em></p>

            <p><strong>Q4: What is NULL propagation in arithmetic, and how do you prevent it?</strong></p>
            <p><em>A: Any arithmetic operation involving NULL yields NULL — e.g. <code>salary + NULL</code> is NULL. To prevent it, wrap nullable columns in <code>COALESCE(col, default)</code> before the arithmetic: <code>salary + COALESCE(commission, 0)</code>. The same applies to string concatenation with <code>||</code> in SQLite.</em></p>

            <p><strong>Q5: Explain the <code>NOT IN</code> NULL trap.</strong></p>
            <p><em>A: If the right-hand list of <code>NOT IN</code> contains a NULL, the expression becomes <code>x != NULL</code> for every value, which is UNKNOWN, so the query returns zero rows. Fix by removing NULLs (<code>WHERE col IS NOT NULL</code>) inside the subquery, or prefer <code>NOT EXISTS</code> which is NULL-safe.</em></p>

            <p><strong>Q6: What do <code>ALL</code> and <code>ANY</code> do, and how do you emulate them with aggregates?</strong></p>
            <p><em>A: <code>x &gt; ALL (subquery)</code> is TRUE when x exceeds every returned value — equivalent to <code>x &gt; (SELECT MAX(...) ...)</code>. <code>x &gt; ANY (subquery)</code> is TRUE when x exceeds at least one value — equivalent to <code>x &gt; (SELECT MIN(...) ...)</code>. <code>= ANY</code> equals <code>IN</code>; <code>&lt;&gt; ALL</code> equals <code>NOT IN</code>.</em></p>

            <p><strong>Q7: What is the difference between <code>= ANY</code> and <code>IN</code>?</strong></p>
            <p><em>A: They are semantically identical — <code>x = ANY (list)</code> is the same as <code>x IN (list)</code>. <code>ANY</code> is the general form that works with any comparison operator (<code>&gt; ANY</code>, <code>&lt;&gt; ANY</code>), while <code>IN</code> is shorthand specifically for equality. Use <code>IN</code> for readability when checking membership.</em></p>

            <p><strong>Q8: How does the <code>ESCAPE</code> clause work in <code>LIKE</code>?</strong></p>
            <p><em>A: <code>LIKE</code> treats <code>%</code> and <code>_</code> as wildcards. To match them literally, declare an escape character: <code>LIKE '%50!%%' ESCAPE '!'</code> matches strings containing "50%". The escape char escapes itself too (<code>!!</code> matches a literal "!"). Always declare ESCAPE explicitly for portable code.</em></p>

            <p><strong>Q9: Difference between integer division and real division?</strong></p>
            <p><em>A: In many engines (including SQLite), <code>7 / 2</code> yields <code>3</code> because both operands are integers and the result is truncated. To get <code>3.5</code>, cast one operand (<code>CAST(7 AS REAL) / 2</code>) or multiply by 1.0 (<code>7 * 1.0 / 2</code>). Always check the dialect — PostgreSQL also truncates integer/integer; MySQL produces decimals.</em></p>

            <p><strong>Q10: What does the modulo operator <code>%</code> return, and when is it useful?</strong></p>
            <p><em>A: <code>%</code> returns the remainder of integer division: <code>17 % 5 = 2</code>. It's useful for parity checks (<code>id % 2 = 0</code> for even), bucketing/modular sharding (<code>id % 10</code> to split into 10 buckets), and detecting round numbers (<code>amount % 1000 = 0</code>). MySQL also offers <code>MOD(a, b)</code> as a function form.</em></p>

            <p><strong>Q11: What is short-circuit evaluation in SQL, and can you rely on it?</strong></p>
            <p><em>A: SQL may evaluate <code>AND</code>/<code>OR</code> with short-circuiting (stopping once the result is known), but the standard does not guarantee it, and engines may reorder predicates for optimisation. Never rely on short-circuit to avoid errors (e.g. don't assume <code>col IS NOT NULL AND 1/col &gt; 0</code> skips the division). Write predicates that are safe to evaluate in any order.</em></p>

            <p><strong>Q12: What is the difference between <code>!=</code> and <code>&lt;&gt;</code>?</strong></p>
            <p><em>A: They are identical — both mean "not equal". <code>&lt;&gt;</code> is the SQL-standard form; <code>!=</code> is widely supported as an extension. Use <code>&lt;&gt;</code> for maximum portability. Both return UNKNOWN (not TRUE) when either operand is NULL.</em></p>

            <p><strong>Q13: How does <code>COALESCE</code> differ from <code>IFNULL</code>/<code>NVL</code>?</strong></p>
            <p><em>A: <code>COALESCE(a, b, c, ...)</code> is the SQL-standard function that returns the first non-NULL argument and accepts any number of arguments. <code>IFNULL(a, b)</code> (SQLite/MySQL) and <code>NVL(a, b)</code> (Oracle) accept exactly two arguments. <code>COALESCE</code> is portable and more flexible; use it by default.</em></p>

            <p><strong>Q14: What does <code>NULLIF(a, b)</code> do, and where is it useful?</strong></p>
            <p><em>A: <code>NULLIF(a, b)</code> returns NULL if <code>a = b</code>, otherwise returns <code>a</code>. It's the classic way to prevent divide-by-zero: <code>revenue / NULLIF(units, 0)</code> returns NULL instead of an error when units is 0. The result can then be wrapped in <code>COALESCE(..., 0)</code> if a number is needed.</em></p>

            <p><strong>Q15: Explain the difference between <code>WHERE</code> and <code>HAVING</code>.</strong></p>
            <p><em>A: <code>WHERE</code> filters individual rows BEFORE grouping/aggregation (Step 3 of logical order); it cannot contain aggregate functions. <code>HAVING</code> filters groups AFTER aggregation (Step 5) and CAN contain aggregates. Use WHERE to reduce input rows cheaply, and HAVING to filter on computed summaries like <code>SUM(total) &gt; 1000</code>.</em></p>

            <p><strong>Q16: Can you use an alias defined in SELECT inside the WHERE clause? Why or why not?</strong></p>
            <p><em>A: No. The logical execution order processes WHERE (Step 3) before SELECT (Step 5), so the alias does not exist yet. Workarounds: repeat the expression in WHERE, wrap the query in a subquery/CTE so the alias becomes a real column, or use HAVING for aggregate aliases (some engines allow it). ORDER BY can usually use SELECT aliases because it runs after SELECT.</em></p>

            <p><strong>Q17: How does <code>IS DISTINCT FROM</code> improve on <code>&lt;&gt;</code>?</strong></p>
            <p><em>A: <code>a &lt;&gt; b</code> returns UNKNOWN if either side is NULL. <code>IS DISTINCT FROM</code> treats NULLs as a comparable value: <code>NULL IS DISTINCT FROM NULL</code> is FALSE, and <code>5 IS DISTINCT FROM NULL</code> is TRUE. It's SQL-standard but not supported in SQLite/MySQL — emulate with <code>(a &lt;&gt; b OR a IS NULL OR b IS NULL) AND NOT (a IS NULL AND b IS NULL)</code>.</em></p>

            <p><strong>Q18: What is operator precedence vs associativity?</strong></p>
            <p><em>A: Precedence decides which operator binds tighter when different operators appear (e.g. <code>*</code> before <code>+</code>). Associativity decides the order when the SAME operator repeats: most operators are left-associative (<code>a - b - c</code> = <code>(a-b)-c</code>). In SQL, <code>AND</code> and <code>OR</code> are left-associative. Parentheses override both.</em></p>

            <p><strong>Q19: How do concatenation operators behave with NULL?</strong></p>
            <p><em>A: In SQLite and PostgreSQL, <code>'a' || NULL</code> yields NULL (NULL propagates). In MySQL, <code>CONCAT('a', NULL)</code> returns NULL too, but <code>CONCAT_WS(sep, a, b)</code> skips NULL arguments. To safely concatenate, wrap nullable columns with <code>COALESCE(col, '')</code> before concatenating.</em></p>

            <p><strong>Q20: Why are parentheses considered "free" in SQL?</strong></p>
            <p><em>A: They add no runtime cost — query optimisers flatten redundant parentheses — but they dramatically improve readability and prevent precedence bugs. A 10-second readability investment prevents hour-long debugging of <code>OR ... AND</code> precedence mistakes. Style guides universally recommend parenthesising any mixed AND/OR condition.</em></p>

            <p><strong>Q21: What happens when you compare a STRING to a NUMBER, e.g. <code>'10' &lt; '9'</code>?</strong></p>
            <p><em>A: It depends on context. If both sides are strings, the comparison is lexicographic, so <code>'10' &lt; '9'</code> is TRUE (because '1' &lt; '9'). If one side is numeric, the engine coerces; SQLite and MySQL will coerce the string to a number, giving <code>10 &lt; 9</code> = FALSE. To avoid surprises, always store numbers in numeric columns, not TEXT.</em></p>

            <p><strong>Q22: Explain the difference between <code>IN</code>, <code>ANY</code>, and <code>ALL</code> with subqueries.</strong></p>
            <p><em>A: <code>IN (subq)</code> = membership test = <code>= ANY (subq)</code> — TRUE if the value matches at least one row. <code>ANY</code> generalises this to any operator (<code>&gt; ANY</code>, <code>&lt;&gt; ANY</code>). <code>ALL</code> requires the condition to hold for every row (<code>&gt; ALL</code> = greater than the max). <code>NOT IN</code> = <code>&lt;&gt; ALL</code> and is vulnerable to the NULL trap.</em></p>

            <p><strong>Q23: How does SQLite differ from MySQL/PostgreSQL on <code>ALL</code>/<code>ANY</code>?</strong></p>
            <p><em>A: <code>ALL</code>, <code>ANY</code>, and <code>SOME</code> are SQL-standard but not implemented in SQLite. MySQL and PostgreSQL support them. When writing portable SQL or running on SQLite, replace <code>&gt; ALL (subq)</code> with <code>&gt; (SELECT MAX(...) FROM ...)</code> and <code>&gt; ANY (subq)</code> with <code>&gt; (SELECT MIN(...) FROM ...)</code>.</em></p>

            <p><strong>Q24: What's the safest pattern for filtering "rows where col is greater than 5000 OR col is missing"?</strong></p>
            <p><em>A: <code>WHERE col &gt; 5000 OR col IS NULL</code>. You cannot write <code>col &gt;= NULL</code> or <code>col = NULL</code> — both are UNKNOWN. The explicit <code>IS NULL</code> branch is the only correct way. Wrapping with <code>COALESCE(col, -1) &gt; 5000</code> would NOT include NULL rows, so the OR pattern is required.</em></p>

            <p><strong>Q25: How would you safely compute a ratio that could divide by zero?</strong></p>
            <p><em>A: Use <code>NULLIF</code> in the denominator: <code>SUM(revenue) * 1.0 / NULLIF(SUM(units), 0)</code>. If <code>SUM(units)</code> is 0 the denominator becomes NULL, the ratio becomes NULL (not a crash), and you can wrap with <code>COALESCE(..., 0)</code> to display 0 instead. This pattern is the standard interview answer for divide-by-zero in SQL.</em></p>
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
      "prompt": "<strong>Task: Gross Profit</strong><br/>Retrieve <code>name</code>, <code>unit_price</code>, <code>cost_price</code>, and the gross profit (<code>unit_price - cost_price</code>) from <code>products</code>. Sort by gross profit descending.",
      "referenceSql": "SELECT name, unit_price, cost_price, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Total Compensation with COALESCE</strong><br/>Retrieve <code>first_name</code>, <code>salary</code>, <code>commission</code>, and a <code>total_comp</code> column that adds salary and commission, treating NULL commission as 0.",
      "referenceSql": "SELECT first_name, salary, commission, salary + COALESCE(commission, 0) AS total_comp FROM employees;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: High Earners (explicit parentheses)</strong><br/>Using explicit parentheses, find employees in department 10 or 20 who earn more than 70000. Return all columns.",
      "referenceSql": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 70000;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Earn more than every Sales employee</strong><br/>Using a <code>MAX</code> subquery, find employees whose <code>salary</code> is greater than every salary in the Sales department (<code>department_id = 40</code>). Return <code>first_name</code> and <code>salary</code>.",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 40);"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Price Markup</strong><br/>Retrieve <code>name</code> and a <code>markup_price</code> column representing <code>unit_price * 1.18</code> (price after 18% markup) from <code>products</code>.",
      "referenceSql": "SELECT name, unit_price * 1.18 AS markup_price FROM products;"
    },
    {
      "id": 7,
      "prompt": "<strong>Task: Include NULLs</strong><br/>Find all employees whose <code>commission</code> is greater than 5000 OR whose commission is NULL. Return <code>first_name</code> and <code>commission</code>.",
      "referenceSql": "SELECT first_name, commission FROM employees WHERE commission > 5000 OR commission IS NULL;"
    },
    {
      "id": 8,
      "prompt": "<strong>Task: Safe ratio with NULLIF</strong><br/>For each product, compute the profit margin as <code>(unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0)</code> aliased <code>margin</code>. Return <code>name</code> and <code>margin</code>.",
      "referenceSql": "SELECT name, (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin FROM products;"
    },
    {
      "id": 9,
      "prompt": "<strong>Task: Profit percentage</strong><br/>For each product compute <code>profit_pct = (unit_price - cost_price) * 100.0 / unit_price</code>. Return <code>name</code> and <code>profit_pct</code> rounded to 2 decimals.",
      "referenceSql": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct FROM products;"
    },
    {
      "id": 10,
      "prompt": "<strong>Task: Earn more than at least one Marketing employee</strong><br/>Using a <code>MIN</code> subquery (the SQLite-friendly equivalent of <code>&gt; ANY</code>), find employees whose <code>salary</code> is greater than at least one salary in Marketing (<code>department_id = 30</code>). Return <code>first_name</code> and <code>salary</code>.",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MIN(salary) FROM employees WHERE department_id = 30);"
    },
    {
      "id": 11,
      "prompt": "<strong>Task: Parity check with modulo</strong><br/>Find all products whose <code>product_id</code> is even (use modulo). Return <code>product_id</code> and <code>name</code>.",
      "referenceSql": "SELECT product_id, name FROM products WHERE product_id % 2 = 0;"
    },
    {
      "id": 12,
      "prompt": "<strong>Task: Stock value</strong><br/>For each product compute <code>stock_value = stock_qty * cost_price</code>. Return <code>name</code> and <code>stock_value</code> for products whose stock value exceeds 100000.",
      "referenceSql": "SELECT name, stock_qty * cost_price AS stock_value FROM products WHERE stock_qty * cost_price > 100000;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Compute <code>monthly_salary</code> (salary / 12.0) for all employees.", "ref": "SELECT first_name, salary / 12.0 AS monthly_salary FROM employees;" },
    { "id": 2, "prompt": "Find employees with a calculated bonus (salary * 0.1) greater than 8000.", "ref": "SELECT * FROM employees WHERE salary * 0.1 > 8000;" },
    { "id": 3, "prompt": "Retrieve <code>name</code> and <code>gross_profit</code> (unit_price - cost_price) from products, sorted descending.", "ref": "SELECT name, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;" },
    { "id": 4, "prompt": "Retrieve employees in department_id 10 or 20 earning over 80000 (use parentheses).", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 80000;" },
    { "id": 5, "prompt": "Compute <code>total_comp</code> as salary + COALESCE(commission, 0) for all employees.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees;" },
    { "id": 6, "prompt": "Find employees whose salary is greater than the MAX salary in department_id = 50.", "ref": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 50);" },
    { "id": 7, "prompt": "Find products where unit_price modulo 1000 equals 0.", "ref": "SELECT * FROM products WHERE unit_price % 1000 = 0;" },
    { "id": 8, "prompt": "Retrieve <code>name</code> and a <code>discounted_price</code> (unit_price * 0.9) from products.", "ref": "SELECT name, unit_price * 0.9 AS discounted_price FROM products;" },
    { "id": 9, "prompt": "Find employees whose salary is greater than the MIN salary in department_id = 40.", "ref": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MIN(salary) FROM employees WHERE department_id = 40);" },
    { "id": 10, "prompt": "Retrieve <code>first_name</code>, <code>salary</code>, and <code>tax</code> (salary * 0.3) from employees.", "ref": "SELECT first_name, salary, salary * 0.3 AS tax FROM employees;" },
    { "id": 11, "prompt": "Find products whose unit_price / cost_price is greater than 1.5.", "ref": "SELECT * FROM products WHERE unit_price / cost_price > 1.5;" },
    { "id": 12, "prompt": "Find all employees who have a commission greater than 5000, OR a NULL commission.", "ref": "SELECT * FROM employees WHERE commission > 5000 OR commission IS NULL;" },
    { "id": 13, "prompt": "Retrieve orders where total_amount + 500 is less than 5000.", "ref": "SELECT * FROM orders WHERE total_amount + 500 < 5000;" },
    { "id": 14, "prompt": "Retrieve employees from department 10 or 20, sorted by salary descending.", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) ORDER BY salary DESC;" },
    { "id": 15, "prompt": "Compute <code>profit_pct</code> = ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) for all products.", "ref": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct FROM products;" },
    { "id": 16, "prompt": "Find employees where salary * 12 (annual) exceeds 1000000.", "ref": "SELECT * FROM employees WHERE salary * 12 > 1000000;" },
    { "id": 17, "prompt": "Retrieve all products and compute <code>stock_value</code> (stock_qty * unit_price).", "ref": "SELECT name, stock_qty * unit_price AS stock_value FROM products;" },
    { "id": 18, "prompt": "Find employees whose salary is greater than the MAX salary in department_id = 30.", "ref": "SELECT * FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 30);" },
    { "id": 19, "prompt": "Retrieve <code>first_name</code> and <code>salary_after_raise</code> (salary * 1.05) for active employees.", "ref": "SELECT first_name, salary * 1.05 AS salary_after_raise FROM employees WHERE is_active = 1;" },
    { "id": 20, "prompt": "Find orders where total_amount - 1000 is greater than 100000.", "ref": "SELECT * FROM orders WHERE total_amount - 1000 > 100000;" },
    { "id": 21, "prompt": "Compute <code>total_comp</code> for employees where total_comp (salary + COALESCE(commission,0)) is above 90000.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees WHERE salary + COALESCE(commission, 0) > 90000;" },
    { "id": 22, "prompt": "Find products where stock_qty * cost_price exceeds 100000.", "ref": "SELECT * FROM products WHERE stock_qty * cost_price > 100000;" },
    { "id": 23, "prompt": "Retrieve employees in dept 10, 20, or 50, sorted by salary ASC.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20, 50) ORDER BY salary ASC;" },
    { "id": 24, "prompt": "Retrieve order_id, total_amount and a <code>vat</code> column (total_amount * 0.18) from orders.", "ref": "SELECT order_id, total_amount, total_amount * 0.18 AS vat FROM orders;" },
    { "id": 25, "prompt": "Find products where (unit_price - cost_price) > 5000.", "ref": "SELECT * FROM products WHERE unit_price - cost_price > 5000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Arithmetic, Precedence & Expressions", "recordingKey": null }
  ]
};
