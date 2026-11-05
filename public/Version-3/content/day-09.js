if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day09'] = {
  "day": 9,
  "title": "CASE Expressions & Logic",
  "db": "retail",
  "emoji": "🔀",
  "slides": [
    {
      "title": "CASE Expressions & Conditional Logic in SQL",
      "duration": "8:45",
      "html": "<h2>🔀 CASE Expressions &amp; Conditional Logic</h2>\n\n        <!-- ── Section 01: The CASE Expression ── -->\n        <div class=\"slide-section\" id=\"day09CaseSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09Case\">\n            01. What Is the CASE Expression?\n          </h3>\n          <p>The <code>CASE</code> expression is SQL's conditional logic construct — equivalent to an if-else statement. It evaluates conditions sequentially and returns a corresponding value when the first condition is met. It can appear in <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, and <code>GROUP BY</code>.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09IfElseSection\">\n          <div class=\"info-box\" id=\"day09IfElse\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">💡 Anywhere in SQL:</strong>\n            </div>\n            <p style=\"margin: 0;\">Because <code>CASE</code> is a scalar expression, you can use it in <code>SELECT</code> to create custom columns, in <code>ORDER BY</code> to sort by custom priority, or inside aggregate functions like <code>SUM()</code> and <code>COUNT()</code> for conditional analytics.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 02: Searched vs Simple CASE ── -->\n        <div class=\"slide-section\" id=\"day09SearchedSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09Searched\">\n            02. Searched vs Simple CASE Syntax\n          </h3>\n          <p>SQL provides two ways to write conditional expressions:</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09VsSection\">\n          <div class=\"vs-block\" id=\"day09SearchedFlex\">\n            <div class=\"vs-card\">\n              <h4>Searched CASE (Most Flexible)</h4>\n              <p style=\"font-size:0.82rem; color:var(--text-muted); margin-bottom:8px;\">Evaluates distinct boolean expressions:</p>\n              <pre><code>CASE\n  WHEN salary &gt;= 100000 THEN 'Executive'\n  WHEN salary &gt;= 75000  THEN 'Senior'\n  WHEN salary &gt;= 50000  THEN 'Mid-Level'\n  ELSE                       'Junior'\nEND</code></pre>\n            </div>\n            <div class=\"vs-card\">\n              <h4>Simple CASE (Exact Value Match)</h4>\n              <p style=\"font-size:0.82rem; color:var(--text-muted); margin-bottom:8px;\">Tests a single expression against literals:</p>\n              <pre><code>CASE status\n  WHEN 'Shipped'    THEN 'Completed'\n  WHEN 'Processing' THEN 'In Flight'\n  ELSE                   'Pending'\nEND</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 03: Searched CASE Examples & Ordering ── -->\n        <div class=\"slide-section\" id=\"day09SalaryExamplesSection\">\n          <div class=\"terminal-card\" id=\"day09SalaryExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 1 — Salary Tier Categorization (Searched CASE)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT first_name,\n       salary,\n       CASE\n         WHEN salary >= 100000 THEN 'Executive'\n         WHEN salary >= 75000  THEN 'Senior'\n         WHEN salary >= 50000  THEN 'Mid-Level'\n         ELSE                       'Junior'\n       END AS salary_tier\nFROM   employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09OrderWarnSection\">\n          <div class=\"warn-box\" id=\"day09OrderWarn\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-amber); flex: 1;\">⚠️ First-Match Wins Trap:</strong>\n            </div>\n            <p style=\"margin: 0;\">SQL evaluates <code>WHEN</code> clauses top-to-bottom and stops immediately upon finding the first true condition. If you place <code>WHEN salary >= 50000</code> before <code>WHEN salary >= 100000</code>, an executive earning $150,000 will be mistakenly assigned 'Mid-Level'!</p>\n          </div>\n        </div>\n\n        <!-- ── Section 04: Simple CASE ── -->\n        <div class=\"slide-section\" id=\"day09SimpleCaseSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09SimpleCase\">\n            03. Simple CASE Expressions\n          </h3>\n          <p>Simple <code>CASE</code> evaluates a single column expression once and checks for exact matches. It is concise and perfect for status mapping and domain lookups.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09SimpleExamplesSection\">\n          <div class=\"terminal-card\" id=\"day09SimpleExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 2 — Human-Friendly Status Mapping (Simple CASE)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT order_id,\n       status,\n       CASE status\n         WHEN 'Shipped'    THEN 'Completed Order'\n         WHEN 'Processing' THEN 'In Flight'\n         ELSE                   'Pending Review'\n       END AS status_label\nFROM   orders;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 05: Conditional Aggregation ── -->\n        <div class=\"slide-section\" id=\"day09ConditionalAggSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09ConditionalAgg\">\n            04. Conditional Aggregation (Pivoting Metrics)\n          </h3>\n          <p>One of the most powerful SQL patterns in business reporting is combining <code>COUNT()</code> and <code>SUM()</code> with <code>CASE</code>. This allows you to pivot row metrics into side-by-side columns in a single table scan.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09PivotExamplesSection\">\n          <div class=\"terminal-card\" id=\"day09PivotExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 3 — Pivoting Status Counts Side-by-Side</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT COUNT(*) AS total_orders,\n       COUNT(CASE WHEN status = 'Shipped' THEN 1 END) AS shipped_count,\n       COUNT(CASE WHEN status = 'Processing' THEN 1 END) AS processing_count,\n       SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_revenue\nFROM   orders;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 06: NULL Handling & Safe Division ── -->\n        <div class=\"slide-section\" id=\"day09NullsSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09Nulls\">\n            05. NULL Handling &amp; Safe Division\n          </h3>\n          <p>Always provide an explicit <code>ELSE</code> fallback in your <code>CASE</code> statements. If omitted and no condition matches, SQL returns <code>NULL</code> by default.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09SafeDivExamplesSection\">\n          <div class=\"terminal-card\" id=\"day09SafeDivExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Safe Division &amp; Markup Calculation</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT name,\n       unit_price,\n       cost_price,\n       CASE\n         WHEN cost_price = 0 THEN 0.0\n         ELSE ROUND((unit_price - cost_price) * 100.0 / cost_price, 2)\n       END AS markup_pct\nFROM   products;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 07: Custom Sorting with CASE ── -->\n        <div class=\"slide-section\" id=\"day09OrderSortSection\">\n          <h3 class=\"heading-with-audio\" id=\"day09OrderSort\">\n            06. Custom Sorting with CASE in ORDER BY\n          </h3>\n          <p>You can inject <code>CASE</code> directly into the <code>ORDER BY</code> clause to establish bespoke sorting hierarchies that alphabetical or numerical ordering cannot achieve.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09SortExamplesSection\">\n          <div class=\"terminal-card\" id=\"day09SortExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 4 — Custom Urgency Priority Sorting</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT order_id,\n       status,\n       total_amount\nFROM   orders\nORDER BY CASE status\n           WHEN 'Processing' THEN 1\n           WHEN 'Shipped'    THEN 2\n           ELSE                   3\n         END,\n         total_amount DESC;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day09CrossDbSection\">\n          <div class=\"info-box\" id=\"day09CrossDb\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">🌐 100% ANSI-SQL Compatible:</strong>\n            </div>\n            <p style=\"margin: 0;\">The <code>CASE</code> statement is part of standard ANSI-SQL and behaves identically across PostgreSQL, SQLite, MySQL, SQL Server, Oracle, Snowflake, and BigQuery.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 08: Top 25 Interview Q&A ── -->\n        <div class=\"slide-section\" id=\"day09QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day09QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>🎯</span> Top 25 SQL Interview Q&amp;A — CASE &amp; Conditional Logic\n            </h4>\n\n            <div id=\"day09QA1\">\n              <p><strong>Q1: What does a CASE expression return if no WHEN conditions match and no ELSE clause is specified?</strong></p>\n              <p><em>A: If no WHEN condition matches and no ELSE clause is provided, SQL silently returns NULL. Always specify an explicit ELSE fallback when NULL is undesirable.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA2\">\n              <p><strong>Q2: What is the key difference between Searched CASE and Simple CASE?</strong></p>\n              <p><em>A: Simple CASE (<code>CASE expr WHEN val THEN ...</code>) evaluates only equality matches against a single operand. Searched CASE (<code>CASE WHEN condition THEN ...</code>) evaluates arbitrary boolean expressions including inequalities, ranges, NULL checks, and logical AND/OR combinations.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA3\">\n              <p><strong>Q3: What happens when multiple WHEN conditions in a CASE expression evaluate to true?</strong></p>\n              <p><em>A: CASE evaluates top-to-bottom and short-circuits. It stops immediately at the first condition that evaluates to TRUE, returns that branch's result, and ignores all subsequent WHEN clauses.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA4\">\n              <p><strong>Q4: Which SQL clause is required to terminate a CASE expression?</strong></p>\n              <p><em>A: Every CASE expression must conclude with the <code>END</code> keyword.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA5\">\n              <p><strong>Q5: What technique is used to count specific subsets of rows in a single query pass?</strong></p>\n              <p><em>A: Conditional Aggregation: <code>COUNT(CASE WHEN condition THEN 1 END)</code>. Because <code>COUNT(col)</code> ignores NULL values, non-matching rows produce NULL and are excluded, allowing multiple category counts in one table scan.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA6\">\n              <p><strong>Q6: Can a CASE expression be used inside an ORDER BY clause?</strong></p>\n              <p><em>A: Yes. CASE in <code>ORDER BY</code> maps column values to arbitrary numerical ranks (e.g., <code>WHEN 'Processing' THEN 1 WHEN 'Shipped' THEN 2</code>), enabling custom business sorting hierarchies that alphabetical or numerical ordering cannot achieve.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA7\">\n              <p><strong>Q7: How can CASE prevent a division-by-zero error?</strong></p>\n              <p><em>A: By checking the denominator in a WHEN clause: <code>CASE WHEN denominator = 0 THEN 0 ELSE numerator * 1.0 / denominator END</code>. Because CASE short-circuits, the division is never evaluated when denominator is 0.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA8\">\n              <p><strong>Q8: In SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END), why is ELSE 0 recommended?</strong></p>\n              <p><em>A: Providing <code>ELSE 0</code> ensures that non-matching rows add 0 rather than NULL. If no rows match, the aggregate yields 0 instead of NULL, keeping reporting cards and charts reliable.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA9\">\n              <p><strong>Q9: Which is valid syntax for a Searched CASE?</strong></p>\n              <p><em>A: <code>CASE WHEN salary &gt; 50000 THEN 'High' ELSE 'Low' END</code>. In Searched CASE, the keyword <code>CASE</code> is immediately followed by <code>WHEN</code> and a boolean condition.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA10\">\n              <p><strong>Q10: Is it valid to nest a CASE expression inside another CASE expression?</strong></p>\n              <p><em>A: Yes, SQL fully supports nesting CASE expressions inside THEN or ELSE branches, although maintaining clean indented formatting or using boolean AND/OR in a single searched CASE is usually preferred for readability.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA11\">\n              <p><strong>Q11: Can CASE expressions be used inside the GROUP BY clause?</strong></p>\n              <p><em>A: Yes. Grouping by a CASE expression (e.g. <code>GROUP BY CASE WHEN age &lt; 25 THEN 'Youth' ELSE 'Adult' END</code>) dynamically clusters records into analytical cohorts without requiring new database columns.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA12\">\n              <p><strong>Q12: What is the result of CASE WHEN NULL THEN 'A' ELSE 'B' END?</strong></p>\n              <p><em>A: It returns 'B'. In SQL three-valued logic, NULL evaluates to UNKNOWN (neither TRUE nor FALSE). Because the WHEN condition is not TRUE, execution falls through to the ELSE clause.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA13\">\n              <p><strong>Q13: What data type does a CASE expression return?</strong></p>\n              <p><em>A: The highest-precedence compatible data type among all THEN and ELSE return expressions. If types cannot be implicitly converted (such as mixing dates and integers), SQL raises a type mismatch error.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA14\">\n              <p><strong>Q14: Why is COUNT(CASE WHEN x &gt; 10 THEN 0 END) equal to the count of matching rows, even though it returns 0?</strong></p>\n              <p><em>A: Because <code>COUNT(expr)</code> counts every non-NULL instance. The scalar value 0 is a non-null number, so every row meeting the condition increments the tally.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA15\">\n              <p><strong>Q15: How do you test for NULL in a Searched CASE statement?</strong></p>\n              <p><em>A: You must use the <code>IS NULL</code> or <code>IS NOT NULL</code> predicate: <code>WHEN col IS NULL THEN ...</code>. In SQL, <code>col = NULL</code> always evaluates to UNKNOWN.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA16\">\n              <p><strong>Q16: In Simple CASE: CASE dept_id WHEN 10 THEN 'Eng' WHEN 20 THEN 'Data' END, what comparison operator is applied implicitly?</strong></p>\n              <p><em>A: The equality operator (<code>=</code>). It translates to <code>dept_id = 10</code>, <code>dept_id = 20</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA17\">\n              <p><strong>Q17: What is the output of CASE WHEN 5 &gt; 10 THEN 'A' WHEN 10 &gt; 5 THEN 'B' WHEN 20 &gt; 5 THEN 'C' ELSE 'D' END?</strong></p>\n              <p><em>A: 'B'. 5 &gt; 10 is false; 10 &gt; 5 is true, so 'B' is returned immediately and subsequent conditions are ignored.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA18\">\n              <p><strong>Q18: Which function can replace a simple two-valued CASE statement in SQLite?</strong></p>\n              <p><em>A: <code>IIF(condition, true_val, false_val)</code>. Supported natively in SQLite 3.32+ and SQL Server as a compact equivalent.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA19\">\n              <p><strong>Q19: Can you use subqueries inside a CASE expression's WHEN condition?</strong></p>\n              <p><em>A: Yes, scalar subqueries or <code>EXISTS (...)</code> checks can be embedded directly in WHEN predicates.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA20\">\n              <p><strong>Q20: What is a key performance tip when using CASE expressions with indexed columns in WHERE?</strong></p>\n              <p><em>A: Wrapping an indexed column inside a CASE expression in a WHERE clause makes the predicate non-sargable, preventing index seeks and forcing full table scans. Use standard boolean logic instead whenever possible.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA21\">\n              <p><strong>Q21: How do you classify products into price tiers in SQL?</strong></p>\n              <p><em>A: <code>SELECT name, unit_price, CASE WHEN unit_price &lt; 2000 THEN 'Budget' ELSE 'Standard' END AS tier FROM products;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA22\">\n              <p><strong>Q22: How do you calculate progressive tax rates using Searched CASE?</strong></p>\n              <p><em>A: <code>SELECT first_name, salary, CASE WHEN salary &gt;= 90000 THEN 0.30 WHEN salary &gt;= 60000 THEN 0.20 ELSE 0.10 END AS tax_rate FROM employees;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA23\">\n              <p><strong>Q23: How do you implement Simple CASE to map order statuses to urgency flags?</strong></p>\n              <p><em>A: <code>SELECT order_id, CASE status WHEN 'Processing' THEN 'High' WHEN 'Shipped' THEN 'Normal' ELSE 'Unknown' END AS urgency FROM orders;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA24\">\n              <p><strong>Q24: How do you create a binary indicator flag (0 or 1) with CASE?</strong></p>\n              <p><em>A: <code>SELECT customer_id, CASE WHEN region = 'West' THEN 1 ELSE 0 END AS is_west FROM customers;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day09QA25\">\n              <p><strong>Q25: How do you calculate conditional revenue in a single summary row?</strong></p>\n              <p><em>A: <code>SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_total FROM orders;</code></em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Salary Tier Classification",
      "prompt": "From <code>employees</code>, return <code>first_name</code>, <code>salary</code>, and a calculated <code>salary_tier</code>: 'Executive' for salaries &gt;= 100000, 'Senior' for &gt;= 75000, 'Mid-Level' for &gt;= 50000, and 'Junior' otherwise.",
      "starterSql": "SELECT first_name,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       salary,\n       CASE\n         WHEN salary >= 100000 THEN 'Executive'\n         WHEN salary >= 75000  THEN 'Senior'\n         WHEN salary >= 50000  THEN 'Mid-Level'\n         ELSE                       'Junior'\n       END AS salary_tier\nFROM   employees;",
      "solutionAudio": "Day09/New_Day9Question01sol.mp3"
    },
    {
      "id": 2,
      "title": "Order Value Segmentation",
      "prompt": "From <code>orders</code>, return <code>order_id</code>, <code>customer_id</code>, <code>total_amount</code>, and <code>order_size</code>: 'Small' for amounts &lt; 2000, 'Medium' for amounts &lt; 15000, and 'Large' otherwise.",
      "starterSql": "SELECT order_id,\n       customer_id,\n       total_amount\nFROM   orders;",
      "referenceSql": "SELECT order_id,\n       customer_id,\n       total_amount,\n       CASE\n         WHEN total_amount < 2000  THEN 'Small'\n         WHEN total_amount < 15000 THEN 'Medium'\n         ELSE                           'Large'\n       END AS order_size\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question02sol.mp3"
    },
    {
      "id": 3,
      "title": "Customer Loyalty Segmentation",
      "prompt": "From <code>customers</code>, return <code>first_name</code>, <code>signup_date</code>, and <code>customer_status</code>: 'Veteran' if registered before '2023-01-01', else 'Recent'.",
      "starterSql": "SELECT first_name,\n       signup_date\nFROM   customers;",
      "referenceSql": "SELECT first_name,\n       signup_date,\n       CASE\n         WHEN signup_date < '2023-01-01' THEN 'Veteran'\n         ELSE                                 'Recent'\n       END AS customer_status\nFROM   customers;",
      "solutionAudio": "Day09/New_Day9Question03sol.mp3"
    },
    {
      "id": 4,
      "title": "Translate Order Status Codes",
      "prompt": "Using a Simple CASE expression on <code>orders</code>, return <code>order_id</code>, <code>status</code>, and <code>status_label</code>: 'Completed Order' for 'Shipped', 'In Flight' for 'Processing', and 'Pending Review' otherwise.",
      "starterSql": "SELECT order_id,\n       status\nFROM   orders;",
      "referenceSql": "SELECT order_id,\n       status,\n       CASE status\n         WHEN 'Shipped'    THEN 'Completed Order'\n         WHEN 'Processing' THEN 'In Flight'\n         ELSE                   'Pending Review'\n       END AS status_label\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question04sol.mp3"
    },
    {
      "id": 5,
      "title": "Inventory Replenishment Alert",
      "prompt": "From <code>products</code>, return <code>name</code>, <code>stock_qty</code>, and <code>inventory_status</code>: 'Critical' if stock &lt; 20, 'Moderate' if stock &lt; 50, and 'Plentiful' otherwise.",
      "starterSql": "SELECT name,\n       stock_qty\nFROM   products;",
      "referenceSql": "SELECT name,\n       stock_qty,\n       CASE\n         WHEN stock_qty < 20 THEN 'Critical'\n         WHEN stock_qty < 50 THEN 'Moderate'\n         ELSE                     'Plentiful'\n       END AS inventory_status\nFROM   products;",
      "solutionAudio": "Day09/New_Day9Question05sol.mp3"
    },
    {
      "id": 6,
      "title": "Conditional Order Counts",
      "prompt": "Across the <code>orders</code> table, return <code>total_orders</code>, <code>shipped_count</code> (where status = 'Shipped'), and <code>processing_count</code> (where status = 'Processing') in a single row using conditional aggregation.",
      "starterSql": "SELECT COUNT(*) AS total_orders\nFROM   orders;",
      "referenceSql": "SELECT COUNT(*) AS total_orders,\n       COUNT(CASE WHEN status = 'Shipped' THEN 1 END) AS shipped_count,\n       COUNT(CASE WHEN status = 'Processing' THEN 1 END) AS processing_count\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question06sol.mp3"
    },
    {
      "id": 7,
      "title": "Annual Bonus Calculation",
      "prompt": "From <code>employees</code>, return <code>first_name</code>, <code>salary</code>, and calculated <code>bonus</code>: 10% of salary (salary * 0.10) if salary &lt; 60000, else 5% of salary (salary * 0.05).",
      "starterSql": "SELECT first_name,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       salary,\n       CASE\n         WHEN salary < 60000 THEN salary * 0.10\n         ELSE                     salary * 0.05\n       END AS bonus\nFROM   employees;",
      "solutionAudio": "Day09/New_Day9Question07sol.mp3"
    },
    {
      "id": 8,
      "title": "Safe Markup Percentage Calculation",
      "prompt": "From <code>products</code>, return <code>name</code>, <code>unit_price</code>, <code>cost_price</code>, and <code>markup_pct</code> calculated as <code>ROUND((unit_price - cost_price) * 100.0 / cost_price, 2)</code>, returning 0.0 if cost_price is 0.",
      "starterSql": "SELECT name,\n       unit_price,\n       cost_price\nFROM   products;",
      "referenceSql": "SELECT name,\n       unit_price,\n       cost_price,\n       CASE\n         WHEN cost_price = 0 THEN 0.0\n         ELSE                     ROUND((unit_price - cost_price) * 100.0 / cost_price, 2)\n       END AS markup_pct\nFROM   products;",
      "solutionAudio": "Day09/New_Day9Question08sol.mp3"
    },
    {
      "id": 9,
      "title": "Flag High-Cost Tech Staff",
      "prompt": "From <code>employees</code>, return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>compensation_tier</code>: 'High-Cost Tech' if department_id is 10 or 20 AND salary &gt;= 80000, else 'Standard'.",
      "starterSql": "SELECT first_name,\n       department_id,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       department_id,\n       salary,\n       CASE\n         WHEN department_id IN (10, 20) AND salary >= 80000 THEN 'High-Cost Tech'\n         ELSE                                                    'Standard'\n       END AS compensation_tier\nFROM   employees;",
      "solutionAudio": "Day09/New_Day9Question09sol.mp3"
    },
    {
      "id": 10,
      "title": "Sort by Custom Business Urgency",
      "prompt": "Return <code>order_id</code>, <code>status</code>, and <code>total_amount</code> from <code>orders</code>, ordered with 'Processing' orders first, 'Shipped' orders second, and then by <code>total_amount</code> descending.",
      "starterSql": "SELECT order_id,\n       status,\n       total_amount\nFROM   orders;",
      "referenceSql": "SELECT order_id,\n       status,\n       total_amount\nFROM   orders\nORDER BY CASE status\n           WHEN 'Processing' THEN 1\n           WHEN 'Shipped'    THEN 2\n           ELSE                   3\n         END,\n         total_amount DESC;",
      "solutionAudio": "Day09/New_Day9Question10sol.mp3"
    },
    {
      "id": 11,
      "title": "Catalog Price Category",
      "prompt": "From <code>products</code>, return <code>name</code>, <code>unit_price</code>, and <code>price_category</code>: 'Budget' for unit_price &lt; 1000, 'Standard' for unit_price &lt; 10000, and 'Luxury' otherwise.",
      "starterSql": "SELECT name,\n       unit_price\nFROM   products;",
      "referenceSql": "SELECT name,\n       unit_price,\n       CASE\n         WHEN unit_price < 1000  THEN 'Budget'\n         WHEN unit_price < 10000 THEN 'Standard'\n         ELSE                         'Luxury'\n       END AS price_category\nFROM   products;",
      "solutionAudio": "Day09/New_Day9Question11sol.mp3"
    },
    {
      "id": 12,
      "title": "Fiscal Quarter Extraction",
      "prompt": "From <code>orders</code>, return <code>order_id</code>, <code>order_date</code>, and <code>quarter</code>: 'Q1' for months 01-03, 'Q2' for 04-06, 'Q3' for 07-09, and 'Q4' for 10-12 using strftime('%m', order_date).",
      "starterSql": "SELECT order_id,\n       order_date\nFROM   orders;",
      "referenceSql": "SELECT order_id,\n       order_date,\n       CASE\n         WHEN strftime('%m', order_date) IN ('01', '02', '03') THEN 'Q1'\n         WHEN strftime('%m', order_date) IN ('04', '05', '06') THEN 'Q2'\n         WHEN strftime('%m', order_date) IN ('07', '08', '09') THEN 'Q3'\n         ELSE                                                       'Q4'\n       END AS quarter\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question12sol.mp3"
    },
    {
      "id": 13,
      "title": "Audit Commission Eligibility",
      "prompt": "From <code>employees</code>, return <code>first_name</code>, <code>commission</code>, and <code>commission_status</code>: 'Eligible' if commission IS NOT NULL, else 'Base Salary Only'.",
      "starterSql": "SELECT first_name,\n       commission\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       commission,\n       CASE\n         WHEN commission IS NOT NULL THEN 'Eligible'\n         ELSE                             'Base Salary Only'\n       END AS commission_status\nFROM   employees;",
      "solutionAudio": "Day09/New_Day9Question13sol.mp3"
    },
    {
      "id": 14,
      "title": "VIP Order Flagging",
      "prompt": "From <code>orders</code>, return <code>order_id</code>, <code>customer_id</code>, <code>total_amount</code>, and <code>vip_flag</code>: 'VIP Order' if total_amount &gt;= 50000, else 'Regular Order'.",
      "starterSql": "SELECT order_id,\n       customer_id,\n       total_amount\nFROM   orders;",
      "referenceSql": "SELECT order_id,\n       customer_id,\n       total_amount,\n       CASE\n         WHEN total_amount >= 50000 THEN 'VIP Order'\n         ELSE                            'Regular Order'\n       END AS vip_flag\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question14sol.mp3"
    },
    {
      "id": 15,
      "title": "Multi-Metric Revenue Summary",
      "prompt": "Calculate total revenue from Shipped orders (<code>shipped_revenue</code>) and Processing orders (<code>processing_revenue</code>) in a single summary row using conditional aggregation.",
      "starterSql": "SELECT SUM(total_amount) AS total_revenue\nFROM   orders;",
      "referenceSql": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_revenue,\n       SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_revenue\nFROM   orders;",
      "solutionAudio": "Day09/New_Day9Question15sol.mp3"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What does a CASE expression return if no WHEN conditions match and no ELSE clause is specified?",
      "options": [
        "An error",
        "0",
        "NULL",
        "An empty string"
      ],
      "answer": "NULL",
      "explanation": "If no WHEN condition matches and no ELSE clause is provided, SQL silently returns NULL.",
      "prompt": "What does a CASE expression return if no WHEN conditions match and no ELSE clause is specified?"
    },
    {
      "id": 2,
      "type": "mcq",
      "question": "What is the key difference between Searched CASE and Simple CASE?",
      "options": [
        "Simple CASE can only compare equality against a single expression; Searched CASE evaluates arbitrary boolean expressions",
        "Searched CASE only works in WHERE; Simple CASE only works in SELECT",
        "Simple CASE evaluates conditions in parallel; Searched CASE is sequential",
        "There is no difference"
      ],
      "answer": "Simple CASE can only compare equality against a single expression; Searched CASE evaluates arbitrary boolean expressions",
      "explanation": "Simple CASE evaluates CASE expr WHEN val THEN ... whereas Searched CASE evaluates arbitrary boolean conditions (ranges, AND/OR, inequalities) with CASE WHEN condition THEN ...",
      "prompt": "What is the key difference between Searched CASE and Simple CASE?"
    },
    {
      "id": 3,
      "type": "mcq",
      "question": "What happens when multiple WHEN conditions in a CASE expression evaluate to true?",
      "options": [
        "All matching THEN clauses execute and concatenate",
        "Only the first matching condition executes and its result is returned",
        "SQL raises an AmbiguousMatchException",
        "The last matching condition overrides earlier ones"
      ],
      "answer": "Only the first matching condition executes and its result is returned",
      "explanation": "CASE evaluates top-to-bottom and stops immediately at the first condition that evaluates to true.",
      "prompt": "What happens when multiple WHEN conditions in a CASE expression evaluate to true?"
    },
    {
      "id": 4,
      "type": "mcq",
      "question": "Which SQL clause is required to terminate a CASE expression?",
      "options": [
        "STOP",
        "END",
        "EXIT",
        "FINISH"
      ],
      "answer": "END",
      "explanation": "Every CASE expression must conclude with the END keyword.",
      "prompt": "Which SQL clause is required to terminate a CASE expression?"
    },
    {
      "id": 5,
      "type": "mcq",
      "question": "What technique is used to count specific subsets of rows in a single query pass?",
      "options": [
        "COUNT(DISTINCT *)",
        "Conditional Aggregation: COUNT(CASE WHEN condition THEN 1 END)",
        "HAVING COUNT() > 0",
        "WHERE CASE = 1"
      ],
      "answer": "Conditional Aggregation: COUNT(CASE WHEN condition THEN 1 END)",
      "explanation": "Because COUNT(expr) ignores NULLs, returning 1 when the condition matches and NULL otherwise counts only matching rows.",
      "prompt": "What technique is used to count specific subsets of rows in a single query pass?"
    },
    {
      "id": 6,
      "type": "mcq",
      "question": "Can a CASE expression be used inside an ORDER BY clause?",
      "options": [
        "No, ORDER BY only accepts column names",
        "Yes, to implement custom non-alphabetical sorting hierarchies",
        "Only in MySQL",
        "Only if aliased in SELECT"
      ],
      "answer": "Yes, to implement custom non-alphabetical sorting hierarchies",
      "explanation": "CASE in ORDER BY maps column values to arbitrary numerical ranks, enabling custom sort orders.",
      "prompt": "Can a CASE expression be used inside an ORDER BY clause?"
    },
    {
      "id": 7,
      "type": "mcq",
      "question": "How can CASE prevent a division-by-zero error?",
      "options": [
        "By wrapping the division in TRY_DIVIDE",
        "By checking if the denominator is 0 in a WHEN clause and returning 0 or NULL before dividing",
        "By setting ZERO_MODE = OFF",
        "CASE cannot prevent runtime arithmetic errors"
      ],
      "answer": "By checking if the denominator is 0 in a WHEN clause and returning 0 or NULL before dividing",
      "explanation": "WHEN denominator = 0 THEN 0 (or NULL) prevents the division expression from evaluating on zero values.",
      "prompt": "How can CASE prevent a division-by-zero error?"
    },
    {
      "id": 8,
      "type": "mcq",
      "question": "In the expression SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END), why is ELSE 0 recommended?",
      "options": [
        "To avoid adding NULLs, which could result in a NULL total if all rows fail",
        "Because SUM requires an integer",
        "To speed up query compilation",
        "It is not recommended, ELSE NULL is mandatory"
      ],
      "answer": "To avoid adding NULLs, which could result in a NULL total if all rows fail",
      "explanation": "Providing ELSE 0 ensures that non-matching rows add 0, and if no rows match, the result is 0 rather than NULL.",
      "prompt": "In the expression SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END), why is ELSE 0 recommended?"
    },
    {
      "id": 9,
      "type": "mcq",
      "question": "Which of the following is valid syntax for a Searched CASE?",
      "options": [
        "CASE WHEN salary > 50000 THEN 'High' ELSE 'Low' END",
        "CASE salary WHEN > 50000 THEN 'High' END",
        "SELECT IF salary > 50000 THEN 'High'",
        "CASE WHERE salary > 50000 THEN 'High' END"
      ],
      "answer": "CASE WHEN salary > 50000 THEN 'High' ELSE 'Low' END",
      "explanation": "Searched CASE syntax starts with CASE followed directly by WHEN <condition> THEN <result>.",
      "prompt": "Which of the following is valid syntax for a Searched CASE?"
    },
    {
      "id": 10,
      "type": "mcq",
      "question": "Is it valid to nest a CASE expression inside another CASE expression in SQL?",
      "options": [
        "No, nested CASE expressions are forbidden by ANSI standard",
        "Yes, SQL fully supports nested CASE expressions",
        "Only in SQLite",
        "Only up to 1 level"
      ],
      "answer": "Yes, SQL fully supports nested CASE expressions",
      "explanation": "SQL expressions are fully composable, allowing CASE expressions inside THEN or ELSE clauses.",
      "prompt": "Is it valid to nest a CASE expression inside another CASE expression in SQL?"
    },
    {
      "id": 11,
      "type": "mcq",
      "question": "Can CASE expressions be used inside the GROUP BY clause?",
      "options": [
        "Yes, to group records into dynamic analytical buckets",
        "No, GROUP BY only accepts base table columns",
        "Only if the expression is aliased in the SELECT list",
        "Only with aggregate functions"
      ],
      "answer": "Yes, to group records into dynamic analytical buckets",
      "explanation": "You can group by a CASE expression to aggregate data into custom tiers without persisting calculated columns.",
      "prompt": "Can CASE expressions be used inside the GROUP BY clause?"
    },
    {
      "id": 12,
      "type": "mcq",
      "question": "What is the result of CASE WHEN NULL THEN 'A' ELSE 'B' END?",
      "options": [
        "'A'",
        "'B'",
        "NULL",
        "Syntax Error"
      ],
      "answer": "'B'",
      "explanation": "In SQL, NULL evaluates to UNKNOWN (not true). Since the condition is not true, execution proceeds to the ELSE clause and returns 'B'.",
      "prompt": "What is the result of CASE WHEN NULL THEN 'A' ELSE 'B' END?"
    },
    {
      "id": 13,
      "type": "mcq",
      "question": "What data type does a CASE expression return?",
      "options": [
        "Always TEXT",
        "The highest precedence compatible data type among all THEN and ELSE return values",
        "Always INTEGER",
        "A dynamic Variant type"
      ],
      "answer": "The highest precedence compatible data type among all THEN and ELSE return values",
      "explanation": "SQL resolves the return type by determining the common data type with highest conversion precedence among all result branches.",
      "prompt": "What data type does a CASE expression return?"
    },
    {
      "id": 14,
      "type": "mcq",
      "question": "Why is COUNT(CASE WHEN x > 10 THEN 0 END) equal to the count of matching rows, even though it returns 0?",
      "options": [
        "Because 0 is evaluated as boolean true",
        "Because COUNT(expr) counts non-NULL values, and 0 is not NULL",
        "Because SQL converts 0 to 1",
        "It will return 0 rows"
      ],
      "answer": "Because COUNT(expr) counts non-NULL values, and 0 is not NULL",
      "explanation": "COUNT(expr) counts every row where expr is NOT NULL. Since 0 is a non-null scalar, each match increments the counter.",
      "prompt": "Why is COUNT(CASE WHEN x > 10 THEN 0 END) equal to the count of matching rows, even though it returns 0?"
    },
    {
      "id": 15,
      "type": "mcq",
      "question": "How do you test for NULL in a Searched CASE statement?",
      "options": [
        "WHEN col = NULL THEN ...",
        "WHEN col IS NULL THEN ...",
        "WHEN ISNULL(col) THEN ...",
        "WHEN col == NULL THEN ..."
      ],
      "answer": "WHEN col IS NULL THEN ...",
      "explanation": "In SQL, NULL cannot be compared with the equality operator =; the IS NULL predicate must be used.",
      "prompt": "How do you test for NULL in a Searched CASE statement?"
    },
    {
      "id": 16,
      "type": "mcq",
      "question": "In Simple CASE: CASE dept_id WHEN 10 THEN 'Eng' WHEN 20 THEN 'Data' END, what comparison operator is applied implicitly?",
      "options": [
        "LIKE",
        "IN",
        "=",
        "IS"
      ],
      "answer": "=",
      "explanation": "Simple CASE evaluates equality (dept_id = 10, dept_id = 20).",
      "prompt": "In Simple CASE: CASE dept_id WHEN 10 THEN 'Eng' WHEN 20 THEN 'Data' END, what comparison operator is applied implicitly?"
    },
    {
      "id": 17,
      "type": "mcq",
      "question": "What is the output of CASE WHEN 5 > 10 THEN 'A' WHEN 10 > 5 THEN 'B' WHEN 20 > 5 THEN 'C' ELSE 'D' END?",
      "options": [
        "'A'",
        "'B'",
        "'C'",
        "'D'"
      ],
      "answer": "'B'",
      "explanation": "5 > 10 is false. 10 > 5 is true, so 'B' is returned immediately without evaluating subsequent conditions.",
      "prompt": "What is the output of CASE WHEN 5 > 10 THEN 'A' WHEN 10 > 5 THEN 'B' WHEN 20 > 5 THEN 'C' ELSE 'D' END?"
    },
    {
      "id": 18,
      "type": "mcq",
      "question": "Which of the following can replace a simple two-valued CASE statement in SQLite?",
      "options": [
        "IIF(condition, true_val, false_val)",
        "IFELSE()",
        "CHOOSE()",
        "DECODE()"
      ],
      "answer": "IIF(condition, true_val, false_val)",
      "explanation": "SQLite 3.32+ natively supports IIF(c, t, f) as shorthand syntax for CASE WHEN c THEN t ELSE f END.",
      "prompt": "Which of the following can replace a simple two-valued CASE statement in SQLite?"
    },
    {
      "id": 19,
      "type": "mcq",
      "question": "Can you use subqueries inside a CASE expression's WHEN condition?",
      "options": [
        "No, subqueries cannot appear in CASE",
        "Yes, scalar or EXISTS subqueries are permitted in WHEN clauses",
        "Only with INNER JOIN",
        "Only in stored procedures"
      ],
      "answer": "Yes, scalar or EXISTS subqueries are permitted in WHEN clauses",
      "explanation": "A CASE expression can contain scalar subqueries or EXISTS checks inside its conditions.",
      "prompt": "Can you use subqueries inside a CASE expression's WHEN condition?"
    },
    {
      "id": 20,
      "type": "mcq",
      "question": "What is a common performance tip when using CASE expressions with indexed columns in WHERE?",
      "options": [
        "Wrapping indexed columns in CASE prevents index usage (non-sargable)",
        "CASE speeds up index lookups by 50%",
        "Always put CASE in WHERE rather than Boolean OR",
        "Indices ignore CASE"
      ],
      "answer": "Wrapping indexed columns in CASE prevents index usage (non-sargable)",
      "explanation": "Wrapping indexed columns inside functions or CASE expressions prevents B-Tree index range scans, forcing a full table scan.",
      "prompt": "What is a common performance tip when using CASE expressions with indexed columns in WHERE?"
    },
    {
      "id": 21,
      "type": "code",
      "question": "Write a query on `products` that returns `name`, `unit_price`, and `tier`: 'Budget' if unit_price < 2000, else 'Standard'.",
      "answer": "SELECT name, unit_price, CASE WHEN unit_price < 2000 THEN 'Budget' ELSE 'Standard' END AS tier FROM products;",
      "prompt": "Write a query on `products` that returns `name`, `unit_price`, and `tier`: 'Budget' if unit_price < 2000, else 'Standard'.",
      "ref": "SELECT name, unit_price, CASE WHEN unit_price < 2000 THEN 'Budget' ELSE 'Standard' END AS tier FROM products;"
    },
    {
      "id": 22,
      "type": "code",
      "question": "Write a query on `employees` that returns `first_name`, `salary`, and `tax_rate`: 0.30 if salary >= 90000, 0.20 if salary >= 60000, else 0.10.",
      "answer": "SELECT first_name, salary, CASE WHEN salary >= 90000 THEN 0.30 WHEN salary >= 60000 THEN 0.20 ELSE 0.10 END AS tax_rate FROM employees;",
      "prompt": "Write a query on `employees` that returns `first_name`, `salary`, and `tax_rate`: 0.30 if salary >= 90000, 0.20 if salary >= 60000, else 0.10.",
      "ref": "SELECT first_name, salary, CASE WHEN salary >= 90000 THEN 0.30 WHEN salary >= 60000 THEN 0.20 ELSE 0.10 END AS tax_rate FROM employees;"
    },
    {
      "id": 23,
      "type": "code",
      "question": "Write a query on `orders` using Simple CASE to return `order_id` and `urgency`: 'High' for 'Processing', 'Normal' for 'Shipped', and 'Unknown' otherwise.",
      "answer": "SELECT order_id, CASE status WHEN 'Processing' THEN 'High' WHEN 'Shipped' THEN 'Normal' ELSE 'Unknown' END AS urgency FROM orders;",
      "prompt": "Write a query on `orders` using Simple CASE to return `order_id` and `urgency`: 'High' for 'Processing', 'Normal' for 'Shipped', and 'Unknown' otherwise.",
      "ref": "SELECT order_id, CASE status WHEN 'Processing' THEN 'High' WHEN 'Shipped' THEN 'Normal' ELSE 'Unknown' END AS urgency FROM orders;"
    },
    {
      "id": 24,
      "type": "code",
      "question": "Write a query on `customers` that returns `customer_id` and `is_west`: 1 if region = 'West', else 0.",
      "answer": "SELECT customer_id, CASE WHEN region = 'West' THEN 1 ELSE 0 END AS is_west FROM customers;",
      "prompt": "Write a query on `customers` that returns `customer_id` and `is_west`: 1 if region = 'West', else 0.",
      "ref": "SELECT customer_id, CASE WHEN region = 'West' THEN 1 ELSE 0 END AS is_west FROM customers;"
    },
    {
      "id": 25,
      "type": "code",
      "question": "Write a query on `orders` calculating total revenue from orders with status 'Shipped' as `shipped_total` using SUM and CASE.",
      "answer": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_total FROM orders;",
      "prompt": "Write a query on `orders` calculating total revenue from orders with status 'Shipped' as `shipped_total` using SUM and CASE.",
      "ref": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_total FROM orders;"
    }
  ]
};
