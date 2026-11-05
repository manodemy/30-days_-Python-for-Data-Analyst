if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day12'] = {
  "day": 12,
  "title": "Set Operations: UNION & INTERSECT",
  "db": "retail",
  "emoji": "⛔",
  "slides": [
    {
      "title": "Set Operations — UNION, UNION ALL, INTERSECT & EXCEPT",
      "duration": "9:15",
      "html": "<h2>⛔ Set Operations — Stacking &amp; Comparing Query Sets</h2>\n\n        <!-- ── Section 01: Set Theory Foundations ── -->\n        <div class=\"slide-section\" id=\"day12SetTheorySection\">\n          <h3 class=\"heading-with-audio\" id=\"day12SetTheory\">\n            01. What Are Set Operations?\n          </h3>\n          <p>Unlike <strong>Joins</strong> (which combine tables horizontally by matching related columns side-by-side), <strong>Set Operations</strong> combine query results <strong>vertically</strong>. They treat each <code>SELECT</code> output as a mathematical set, stacking rows from multiple queries into a single unified result set.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12RulesSection\">\n          <div class=\"info-box\" id=\"day12Rules\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">📐 Strict Schema Compatibility Rules:</strong>\n            </div>\n            <ul style=\"margin: 4px 0 0 16px; padding: 0; font-size: 0.88rem; line-height: 1.6;\">\n              <li><strong>Equal Column Count:</strong> Both <code>SELECT</code> statements must return the exact same number of columns.</li>\n              <li><strong>Compatible Data Types:</strong> Corresponding columns (1st with 1st, 2nd with 2nd) must share compatible data types.</li>\n              <li><strong>Column Names Inherited:</strong> The final result set always inherits column headers from the <strong>first</strong> query.</li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12InheritanceSection\">\n          <div class=\"db-mock-table-wrap\" id=\"day12RefTable\">\n            <div style=\"display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;\">\n              <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">The 4 Core Set Operators</h4>\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact\">\n              <thead><tr><th>Operator</th><th>Mathematical Meaning</th><th>Duplicate Handling</th></tr></thead>\n              <tbody>\n                <tr><td><code>UNION</code></td><td>Set Union (A ∪ B)</td><td>Deduplicates rows (expensive sort)</td></tr>\n                <tr><td><code>UNION ALL</code></td><td>Set Multiset Addition (A + B)</td><td>Keeps all duplicates (lightning-fast)</td></tr>\n                <tr><td><code>INTERSECT</code></td><td>Set Intersection (A ∩ B)</td><td>Returns only rows present in BOTH</td></tr>\n                <tr><td><code>EXCEPT</code></td><td>Set Difference (A − B)</td><td>Returns rows in A but NOT in B</td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- ── Section 02: UNION ── -->\n        <div class=\"slide-section\" id=\"day12UnionSection\">\n          <h3 class=\"heading-with-audio\" id=\"day12Union\">\n            02. UNION — Deduplicated Stacking\n          </h3>\n          <p><code>UNION</code> combines the outputs of two queries and removes duplicate rows, ensuring every record in the final result is unique.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12EmailExamplesSection\">\n          <div class=\"terminal-card\" id=\"day12EmailExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 1 — Master Deduplicated Email Directory (UNION)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT email FROM employees\nUNION\nSELECT email FROM customers\nORDER BY email;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 03: UNION ALL ── -->\n        <div class=\"slide-section\" id=\"day12UnionAllSection\">\n          <h3 class=\"heading-with-audio\" id=\"day12UnionAll\">\n            03. UNION ALL — High-Performance Stacking\n          </h3>\n          <p><code>UNION ALL</code> stacks rows directly without checking for duplicates. It does not perform an in-memory sort or hash deduplication pass, making it drastically faster on large tables.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12PerfBestPracticeSection\">\n          <div class=\"info-box\" id=\"day12PerfBestPractice\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">⚡ Production Rule:</strong>\n            </div>\n            <p style=\"margin: 0;\">Whenever you know the two datasets cannot overlap (or when duplicates are desired), <strong>always default to UNION ALL</strong>. In enterprise data warehouses, replacing <code>UNION</code> with <code>UNION ALL</code> can reduce query runtimes from minutes to seconds.</p>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12ContactExamplesSection\">\n          <div class=\"terminal-card\" id=\"day12ContactExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 2 — Contact Roster with Source Tags (UNION ALL)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT first_name,\n       last_name,\n       'Employee' AS entity_type\nFROM   employees\nUNION ALL\nSELECT first_name,\n       last_name,\n       'Customer' AS entity_type\nFROM   customers\nORDER BY last_name, first_name;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 04: INTERSECT ── -->\n        <div class=\"slide-section\" id=\"day12IntersectSection\">\n          <h3 class=\"heading-with-audio\" id=\"day12Intersect\">\n            04. INTERSECT — Finding Common Entities\n          </h3>\n          <p><code>INTERSECT</code> returns only rows that appear in <strong>both</strong> the first and second queries. It is ideal for identifying overlapping cohorts between distinct business tables.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12IntersectExamplesSection\">\n          <div class=\"terminal-card\" id=\"day12IntersectExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 3 — Finding Shared Names Between Customers &amp; Staff</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT first_name FROM customers\nINTERSECT\nSELECT first_name FROM employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 05: EXCEPT ── -->\n        <div class=\"slide-section\" id=\"day12ExceptSection\">\n          <h3 class=\"heading-with-audio\" id=\"day12Except\">\n            05. EXCEPT — Set Difference\n          </h3>\n          <p><code>EXCEPT</code> (known as <code>MINUS</code> in Oracle) returns records that exist in the first query but are <strong>absent</strong> from the second query.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12ExceptExamplesSection\">\n          <div class=\"terminal-card\" id=\"day12ExceptExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 4 — Finding Inactive Customer IDs (EXCEPT)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT customer_id FROM customers\nEXCEPT\nSELECT customer_id FROM orders\nWHERE  customer_id IS NOT NULL;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 06: Global ORDER BY ── -->\n        <div class=\"slide-section\" id=\"day12GlobalOrderBySection\">\n          <h3 class=\"heading-with-audio\" id=\"day12GlobalOrderBy\">\n            06. Global ORDER BY in Set Statements\n          </h3>\n          <p>In a compound set query, the <code>ORDER BY</code> clause can only appear <strong>once</strong>, at the very end of the entire statement. It sorts the final merged result set, using the column names established in the first query.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12FinanceExamplesSection\">\n          <div class=\"terminal-card\" id=\"day12FinanceExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 5 — Financial Ledger Consolidation</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT 'Total Revenue' AS metric,\n       SUM(total_amount) AS amount\nFROM   orders\nUNION ALL\nSELECT 'Total Payroll' AS metric,\n       SUM(salary) AS amount\nFROM   employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day12DialectsSection\">\n          <div class=\"info-box\" id=\"day12Dialects\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">🌐 Engine Compatibility:</strong>\n            </div>\n            <p style=\"margin: 0;\"><code>UNION</code> and <code>UNION ALL</code> are universal across all SQL systems. <code>INTERSECT</code> and <code>EXCEPT</code> are supported in SQLite, PostgreSQL, SQL Server, and Snowflake. Oracle uses the keyword <code>MINUS</code> instead of <code>EXCEPT</code>.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 07: Top 25 Interview Q&A ── -->\n        <div class=\"slide-section\" id=\"day12QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day12QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Set Operations\n            </h4>\n\n            <div id=\"day12QA1\">\n              <p><strong>Q1: What is the primary difference between UNION and UNION ALL?</strong></p>\n              <p><em>A: <code>UNION</code> removes duplicate rows by performing an internal distinct sort. <code>UNION ALL</code> simply concatenates all rows from both queries without deduplication, preserving duplicates and executing significantly faster.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA2\">\n              <p><strong>Q2: What are the two mandatory schema rules for combining queries with Set Operations?</strong></p>\n              <p><em>A: 1) Both queries must return the exact same number of columns. 2) Corresponding columns in each ordinal position must have compatible, convertible data types.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA3\">\n              <p><strong>Q3: Where does the column name in the final result set of a UNION query originate?</strong></p>\n              <p><em>A: From the first <code>SELECT</code> statement. Any aliases assigned in subsequent <code>SELECT</code> queries are completely ignored.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA4\">\n              <p><strong>Q4: Where must the ORDER BY clause be placed in a query using Set Operations?</strong></p>\n              <p><em>A: At the very end of the compound statement. It executes globally across the final merged result set, sorting the combined rows.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA5\">\n              <p><strong>Q5: What does the INTERSECT operator return?</strong></p>\n              <p><em>A: It returns only the distinct rows that appear in <strong>both</strong> input query result sets (the mathematical intersection).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA6\">\n              <p><strong>Q6: What does the EXCEPT operator return?</strong></p>\n              <p><em>A: It returns distinct rows from the first query that do not exist anywhere in the second query's result set (the set difference: A − B).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA7\">\n              <p><strong>Q7: What is the equivalent keyword for EXCEPT in Oracle database?</strong></p>\n              <p><em>A: <code>MINUS</code>. Oracle uses <code>SELECT ... MINUS SELECT ...</code> instead of the standard ANSI <code>EXCEPT</code> keyword.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA8\">\n              <p><strong>Q8: Why is UNION ALL generally preferred over UNION in production when duplicates are not an issue?</strong></p>\n              <p><em>A: <code>UNION ALL</code> avoids the heavy CPU and memory sorting overhead required to find and eliminate duplicates, running in linear O(N) streaming time.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA9\">\n              <p><strong>Q9: What is the result of: SELECT 1 UNION ALL SELECT 1 UNION SELECT 1?</strong></p>\n              <p><em>A: A single row with value 1. The final <code>UNION</code> deduplicates the entire accumulated result set, collapsing the identical rows into one.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA10\">\n              <p><strong>Q10: Can you use different alias names in the second SELECT query of a UNION statement?</strong></p>\n              <p><em>A: Yes, it is syntactically valid, but SQL ignores the second query's aliases and uses the column names defined in the first query.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA11\">\n              <p><strong>Q11: How do set operations treat NULL values during deduplication in UNION or INTERSECT?</strong></p>\n              <p><em>A: In ANSI SQL set operations, two NULL values are treated as equivalent duplicates and collapsed into a single NULL row.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA12\">\n              <p><strong>Q12: How do you combine 3 or more queries using set operations?</strong></p>\n              <p><em>A: Chain them sequentially: <code>SELECT ... UNION ALL SELECT ... UNION ALL SELECT ...</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA13\">\n              <p><strong>Q13: Which set operation can be used as an alternative to a NOT EXISTS or Anti-Join query?</strong></p>\n              <p><em>A: <code>EXCEPT</code>. <code>SELECT customer_id FROM customers EXCEPT SELECT customer_id FROM orders</code> returns the exact IDs of customers who placed zero orders.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA14\">\n              <p><strong>Q14: What error occurs if the first SELECT has 3 columns and the second SELECT has 2 columns in a UNION?</strong></p>\n              <p><em>A: The database immediately throws a query error: \"all queries combined using a UNION, INTERSECT or EXCEPT operator must have an equal number of expressions in their target lists.\"</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA15\">\n              <p><strong>Q15: Can you use parentheses to control the order of evaluation between UNION and INTERSECT?</strong></p>\n              <p><em>A: Yes. In standard SQL, <code>INTERSECT</code> takes higher precedence than <code>UNION</code>. Parentheses allow you to enforce your desired order of operations explicitly.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA16\">\n              <p><strong>Q16: Does UNION remove duplicates across individual queries or across the entire combined result?</strong></p>\n              <p><em>A: Across the entire combined result set. It merges all rows from both inputs first, then removes duplicates across the whole unified dataset.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA17\">\n              <p><strong>Q17: What is the output of: SELECT 'A' EXCEPT SELECT 'A'?</strong></p>\n              <p><em>A: 0 rows (an empty set). Subtracting 'A' from 'A' leaves nothing.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA18\">\n              <p><strong>Q18: What is the output of: SELECT 'A' INTERSECT SELECT 'B'?</strong></p>\n              <p><em>A: 0 rows. Since 'A' and 'B' have no common elements, the intersection is empty.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA19\">\n              <p><strong>Q19: Can you include literal constant values (like 'Customer' or 2024) in the SELECT list of a UNION query?</strong></p>\n              <p><em>A: Yes, string literals or numeric constants are commonly used to create synthetic tags (e.g. <code>'Customer' AS entity_type</code>) to track row origins.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA20\">\n              <p><strong>Q20: Which clause filters individual rows BEFORE they are fed into a UNION operation?</strong></p>\n              <p><em>A: The <code>WHERE</code> clause inside each respective <code>SELECT</code> query. Each sub-query filters its local dataset independently before unioning.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA21\">\n              <p><strong>Q21: How do you combine employee and customer emails with UNION?</strong></p>\n              <p><em>A: <code>SELECT email FROM employees UNION SELECT email FROM customers;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA22\">\n              <p><strong>Q22: How do you combine employee and customer first names preserving all occurrences with UNION ALL?</strong></p>\n              <p><em>A: <code>SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA23\">\n              <p><strong>Q23: How do you find first names common to both customers and employees using INTERSECT?</strong></p>\n              <p><em>A: <code>SELECT first_name FROM customers INTERSECT SELECT first_name FROM employees;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA24\">\n              <p><strong>Q24: How do you find customers who have never placed an order using EXCEPT?</strong></p>\n              <p><em>A: <code>SELECT customer_id FROM customers EXCEPT SELECT customer_id FROM orders;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day12QA25\">\n              <p><strong>Q25: How do you find catalog products that have never been purchased using EXCEPT?</strong></p>\n              <p><em>A: <code>SELECT product_id FROM products EXCEPT SELECT product_id FROM order_items;</code></em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Master Email Directory (UNION)",
      "prompt": "Combine unique email addresses from <code>employees</code> and <code>customers</code> into a single list with no duplicates using <code>UNION</code>, ordered alphabetically by email.",
      "starterSql": "SELECT email FROM employees;",
      "referenceSql": "SELECT email FROM employees\nUNION\nSELECT email FROM customers\nORDER BY email;",
      "solutionAudio": "Day12/New_Day12Question01sol.mp3"
    },
    {
      "id": 2,
      "title": "Consolidate Contacts with Source Tags",
      "prompt": "Combine <code>first_name</code>, <code>last_name</code>, and an entity type label of 'Employee' from <code>employees</code> with <code>first_name</code>, <code>last_name</code>, and 'Customer' from <code>customers</code> using <code>UNION ALL</code>, ordered by last_name, then first_name.",
      "starterSql": "SELECT first_name,\n       last_name,\n       'Employee' AS entity_type\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       last_name,\n       'Employee' AS entity_type\nFROM   employees\nUNION ALL\nSELECT first_name,\n       last_name,\n       'Customer' AS entity_type\nFROM   customers\nORDER BY last_name, first_name;",
      "solutionAudio": "Day12/New_Day12Question02sol.mp3"
    },
    {
      "id": 3,
      "title": "Unique First Names Directory",
      "prompt": "Extract all unique first names across both <code>employees</code> and <code>customers</code> into a single column using <code>UNION</code>, ordered alphabetically.",
      "starterSql": "SELECT first_name FROM employees;",
      "referenceSql": "SELECT first_name FROM employees\nUNION\nSELECT first_name FROM customers\nORDER BY first_name;",
      "solutionAudio": "Day12/New_Day12Question03sol.mp3"
    },
    {
      "id": 4,
      "title": "Deduplicate Order Statuses",
      "prompt": "Query <code>status</code> from <code>orders</code> combined with <code>status</code> from <code>orders</code> using <code>UNION</code> to return unique status values.",
      "starterSql": "SELECT status FROM orders;",
      "referenceSql": "SELECT status FROM orders\nUNION\nSELECT status FROM orders;",
      "solutionAudio": "Day12/New_Day12Question04sol.mp3"
    },
    {
      "id": 5,
      "title": "Shared Names Discovery (INTERSECT)",
      "prompt": "Find first names that exist in both the <code>customers</code> table and the <code>employees</code> table using <code>INTERSECT</code>.",
      "starterSql": "SELECT first_name FROM customers;",
      "referenceSql": "SELECT first_name FROM customers\nINTERSECT\nSELECT first_name FROM employees;",
      "solutionAudio": "Day12/New_Day12Question05sol.mp3"
    },
    {
      "id": 6,
      "title": "Active Customer ID Audit (INTERSECT)",
      "prompt": "Return <code>customer_id</code> for customers that exist in both <code>customers</code> and <code>orders</code> (where customer_id IS NOT NULL) using <code>INTERSECT</code>.",
      "starterSql": "SELECT customer_id FROM customers;",
      "referenceSql": "SELECT customer_id FROM customers\nINTERSECT\nSELECT customer_id FROM orders\nWHERE  customer_id IS NOT NULL;",
      "solutionAudio": "Day12/New_Day12Question06sol.mp3"
    },
    {
      "id": 7,
      "title": "Identify Inactive Customers (EXCEPT)",
      "prompt": "Find <code>customer_id</code> from <code>customers</code> that does not appear in <code>orders</code> using <code>EXCEPT</code>.",
      "starterSql": "SELECT customer_id FROM customers;",
      "referenceSql": "SELECT customer_id FROM customers\nEXCEPT\nSELECT customer_id FROM orders\nWHERE  customer_id IS NOT NULL;",
      "solutionAudio": "Day12/New_Day12Question07sol.mp3"
    },
    {
      "id": 8,
      "title": "Unsold Products Detection (EXCEPT)",
      "prompt": "Find <code>product_id</code> from <code>products</code> that has never been recorded in <code>order_items</code> using <code>EXCEPT</code>.",
      "starterSql": "SELECT product_id FROM products;",
      "referenceSql": "SELECT product_id FROM products\nEXCEPT\nSELECT product_id FROM order_items;",
      "solutionAudio": "Day12/New_Day12Question08sol.mp3"
    },
    {
      "id": 9,
      "title": "Active Categories with Inventory (INTERSECT)",
      "prompt": "Find category IDs that exist in both <code>categories</code> (id) and <code>products</code> (category_id, where not null) using <code>INTERSECT</code>.",
      "starterSql": "SELECT id AS category_id FROM categories;",
      "referenceSql": "SELECT id AS category_id FROM categories\nINTERSECT\nSELECT category_id FROM products\nWHERE  category_id IS NOT NULL;",
      "solutionAudio": "Day12/New_Day12Question09sol.mp3"
    },
    {
      "id": 10,
      "title": "VIP Entities Unified Ledger",
      "prompt": "Combine high-value order customer IDs (<code>total_amount &gt;= 50000</code>) tagged as 'High-Value Customer' with executive employee IDs (<code>salary &gt;= 100000</code>) tagged as 'Executive Staff' using <code>UNION</code>.",
      "starterSql": "SELECT customer_id AS entity_id,\n       'High-Value Customer' AS tag\nFROM   orders\nWHERE  total_amount >= 50000;",
      "referenceSql": "SELECT customer_id AS entity_id,\n       'High-Value Customer' AS tag\nFROM   orders\nWHERE  total_amount >= 50000\nUNION\nSELECT employee_id AS entity_id,\n       'Executive Staff' AS tag\nFROM   employees\nWHERE  salary >= 100000;",
      "solutionAudio": "Day12/New_Day12Question10sol.mp3"
    },
    {
      "id": 11,
      "title": "Empty Categories Audit (EXCEPT)",
      "prompt": "Return <code>category_id</code> (id) and <code>category_name</code> (name) from <code>categories</code> that have no products assigned to them using <code>EXCEPT</code> against an inner join of categories and products.",
      "starterSql": "SELECT id AS category_id, name AS category_name FROM categories;",
      "referenceSql": "SELECT id AS category_id, name AS category_name FROM categories\nEXCEPT\nSELECT c.id, c.name\nFROM   categories c\nINNER JOIN products p ON c.id = p.category_id;",
      "solutionAudio": "Day12/New_Day12Question11sol.mp3"
    },
    {
      "id": 12,
      "title": "Target Outreach Directory",
      "prompt": "Combine Data Science employees (<code>department_id = 20</code>) with role 'Employee' and North region customers (<code>region = 'North'</code>) with role 'VIP Customer' using <code>UNION ALL</code>, ordered by role, then first_name.",
      "starterSql": "SELECT first_name,\n       last_name,\n       'Employee' AS role\nFROM   employees\nWHERE  department_id = 20;",
      "referenceSql": "SELECT first_name,\n       last_name,\n       'Employee' AS role\nFROM   employees\nWHERE  department_id = 20\nUNION ALL\nSELECT first_name,\n       last_name,\n       'VIP Customer' AS role\nFROM   customers\nWHERE  region = 'North'\nORDER BY role, first_name;",
      "solutionAudio": "Day12/New_Day12Question12sol.mp3"
    },
    {
      "id": 13,
      "title": "Consolidated Three-Way Roster",
      "prompt": "Combine active employees (<code>is_active = 1</code>), inactive employees (<code>is_active = 0</code>), and customers into one list of <code>first_name</code> and <code>email</code> using <code>UNION</code>, ordered by email.",
      "starterSql": "SELECT first_name, email FROM employees WHERE is_active = 1;",
      "referenceSql": "SELECT first_name, email FROM employees WHERE is_active = 1\nUNION\nSELECT first_name, email FROM employees WHERE is_active = 0\nUNION\nSELECT first_name, email FROM customers\nORDER BY email;",
      "solutionAudio": "Day12/New_Day12Question13sol.mp3"
    },
    {
      "id": 14,
      "title": "Financial Inflow & Outflow Summary",
      "prompt": "Combine total order revenue with metric 'Total Revenue' and total employee payroll with metric 'Total Payroll' in a single summary table using <code>UNION ALL</code>.",
      "starterSql": "SELECT 'Total Revenue' AS metric,\n       SUM(total_amount) AS amount\nFROM   orders;",
      "referenceSql": "SELECT 'Total Revenue' AS metric,\n       SUM(total_amount) AS amount\nFROM   orders\nUNION ALL\nSELECT 'Total Payroll' AS metric,\n       SUM(salary) AS amount\nFROM   employees;",
      "solutionAudio": "Day12/New_Day12Question14sol.mp3"
    },
    {
      "id": 15,
      "title": "Customer Lifecycle Segmentation",
      "prompt": "Using <code>UNION</code>, label customers with orders as 'Active Buyer' and customers without orders as 'Prospect', returning <code>first_name</code>, <code>last_name</code>, and <code>customer_status</code>, ordered by customer_status, then first_name.",
      "starterSql": "SELECT c.first_name,\n       c.last_name,\n       'Active Buyer' AS customer_status\nFROM   customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id;",
      "referenceSql": "SELECT c.first_name,\n       c.last_name,\n       'Active Buyer' AS customer_status\nFROM   customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id\nUNION\nSELECT c.first_name,\n       c.last_name,\n       'Prospect' AS customer_status\nFROM   customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE  o.order_id IS NULL\nORDER BY customer_status, first_name;",
      "solutionAudio": "Day12/New_Day12Question15sol.mp3"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What is the primary difference between UNION and UNION ALL?",
      "options": [
        "UNION removes duplicate rows; UNION ALL keeps all rows including duplicates",
        "UNION ALL is only for integer columns; UNION is for text",
        "UNION is faster than UNION ALL",
        "UNION can only combine 2 queries; UNION ALL can combine unlimited queries"
      ],
      "answer": "UNION removes duplicate rows; UNION ALL keeps all rows including duplicates",
      "explanation": "UNION performs an internal sort and deduplication pass, whereas UNION ALL directly appends result sets.",
      "prompt": "What is the primary difference between UNION and UNION ALL?"
    },
    {
      "id": 2,
      "type": "mcq",
      "question": "What are the two mandatory schema rules for combining queries with Set Operations?",
      "options": [
        "Both queries must have the same number of columns, and corresponding columns must have compatible data types",
        "Both queries must query the same table",
        "Both queries must contain identical WHERE clauses",
        "Both queries must have primary keys"
      ],
      "answer": "Both queries must have the same number of columns, and corresponding columns must have compatible data types",
      "explanation": "Every set operation requires an identical column count and matching data types in corresponding ordinal positions.",
      "prompt": "What are the two mandatory schema rules for combining queries with Set Operations?"
    },
    {
      "id": 3,
      "type": "mcq",
      "question": "Where does the column name in the final result set of a UNION query originate?",
      "options": [
        "From the first SELECT statement",
        "From the last SELECT statement",
        "SQL generates synthetic names like col1, col2",
        "From the table with the most rows"
      ],
      "answer": "From the first SELECT statement",
      "explanation": "ANSI SQL specifies that the column names and aliases defined in the first query dictate the result set header.",
      "prompt": "Where does the column name in the final result set of a UNION query originate?"
    },
    {
      "id": 4,
      "type": "mcq",
      "question": "Where must the ORDER BY clause be placed in a query using Set Operations?",
      "options": [
        "At the very end of the entire compound statement, applying globally to the merged result",
        "Inside each individual SELECT query",
        "Immediately after the first SELECT",
        "ORDER BY is not permitted with set operations"
      ],
      "answer": "At the very end of the entire compound statement, applying globally to the merged result",
      "explanation": "A compound set query allows only one global ORDER BY clause placed after the final SELECT statement.",
      "prompt": "Where must the ORDER BY clause be placed in a query using Set Operations?"
    },
    {
      "id": 5,
      "type": "mcq",
      "question": "What does the INTERSECT operator return?",
      "options": [
        "Rows that appear in BOTH query result sets",
        "Rows that appear in either query",
        "Rows that appear only in the first query",
        "The Cartesian product of both queries"
      ],
      "answer": "Rows that appear in BOTH query result sets",
      "explanation": "INTERSECT computes the mathematical intersection: rows common to both result sets.",
      "prompt": "What does the INTERSECT operator return?"
    },
    {
      "id": 6,
      "type": "mcq",
      "question": "What does the EXCEPT operator return?",
      "options": [
        "Rows present in the first query that do not exist in the second query",
        "All rows except NULLs",
        "Rows with syntax exceptions",
        "Rows present in both queries"
      ],
      "answer": "Rows present in the first query that do not exist in the second query",
      "explanation": "EXCEPT calculates set difference: records in Query 1 minus any matching records in Query 2.",
      "prompt": "What does the EXCEPT operator return?"
    },
    {
      "id": 7,
      "type": "mcq",
      "question": "What is the equivalent keyword for EXCEPT in Oracle database?",
      "options": [
        "MINUS",
        "DIFFERENCE",
        "EXCLUDE",
        "SUBTRACT"
      ],
      "answer": "MINUS",
      "explanation": "Oracle SQL uses the MINUS keyword instead of the standard ANSI EXCEPT operator.",
      "prompt": "What is the equivalent keyword for EXCEPT in Oracle database?"
    },
    {
      "id": 8,
      "type": "mcq",
      "question": "Why is UNION ALL generally preferred over UNION in production when duplicates are not an issue?",
      "options": [
        "UNION ALL does not incur the CPU and memory overhead of sorting and deduplicating rows",
        "UNION ALL supports more data types",
        "UNION ALL automatically creates an index",
        "UNION ALL encrypts output"
      ],
      "answer": "UNION ALL does not incur the CPU and memory overhead of sorting and deduplicating rows",
      "explanation": "Without the expensive distinct-sort pass, UNION ALL executes in linear O(N) time.",
      "prompt": "Why is UNION ALL generally preferred over UNION in production when duplicates are not an issue?"
    },
    {
      "id": 9,
      "type": "mcq",
      "question": "What is the result of: SELECT 1 UNION ALL SELECT 1 UNION SELECT 1?",
      "options": [
        "A single row with 1",
        "Two rows with 1",
        "Three rows with 1",
        "Syntax error"
      ],
      "answer": "A single row with 1",
      "explanation": "The final UNION deduplicates the entire accumulated result set, yielding a single row.",
      "prompt": "What is the result of: SELECT 1 UNION ALL SELECT 1 UNION SELECT 1?"
    },
    {
      "id": 10,
      "type": "mcq",
      "question": "Can you use different alias names in the second SELECT query of a UNION statement?",
      "options": [
        "Yes, but they are completely ignored; the first query's aliases are used",
        "No, aliases in the second query cause a syntax error",
        "Only if quoted",
        "Only in MySQL"
      ],
      "answer": "Yes, but they are completely ignored; the first query's aliases are used",
      "explanation": "Aliases in subsequent queries are syntactically valid but disregarded by the query planner.",
      "prompt": "Can you use different alias names in the second SELECT query of a UNION statement?"
    },
    {
      "id": 11,
      "type": "mcq",
      "question": "How do set operations treat NULL values during deduplication in UNION or INTERSECT?",
      "options": [
        "Two NULL values are treated as identical duplicates and merged into a single NULL row",
        "NULL values cause the query to fail",
        "Every NULL is treated as unique",
        "NULLs are converted to 0"
      ],
      "answer": "Two NULL values are treated as identical duplicates and merged into a single NULL row",
      "explanation": "In set theory and ANSI SQL set operations, NULL rows are considered equivalent for deduplication.",
      "prompt": "How do set operations treat NULL values during deduplication in UNION or INTERSECT?"
    },
    {
      "id": 12,
      "type": "mcq",
      "question": "How do you combine 3 or more queries using set operations?",
      "options": [
        "Chain multiple UNION / INTERSECT / EXCEPT operators sequentially",
        "Use the MULTI_UNION keyword",
        "Wrap queries in parentheses with commas",
        "Only two queries can be combined"
      ],
      "answer": "Chain multiple UNION / INTERSECT / EXCEPT operators sequentially",
      "explanation": "Queries can be chained: SELECT ... UNION SELECT ... UNION SELECT ...",
      "prompt": "How do you combine 3 or more queries using set operations?"
    },
    {
      "id": 13,
      "type": "mcq",
      "question": "Which set operation can be used as an alternative to a NOT EXISTS or Anti-Join query?",
      "options": [
        "EXCEPT",
        "INTERSECT",
        "UNION",
        "CROSS JOIN"
      ],
      "answer": "EXCEPT",
      "explanation": "SELECT id FROM A EXCEPT SELECT id FROM B returns the identical entity IDs as an anti-join.",
      "prompt": "Which set operation can be used as an alternative to a NOT EXISTS or Anti-Join query?"
    },
    {
      "id": 14,
      "type": "mcq",
      "question": "What error occurs if the first SELECT has 3 columns and the second SELECT has 2 columns in a UNION?",
      "options": [
        "SQL raises an error indicating the queries have different numbers of result columns",
        "SQL pads the second query with NULLs",
        "The extra column is truncated",
        "Execution continues with a warning"
      ],
      "answer": "SQL raises an error indicating the queries have different numbers of result columns",
      "explanation": "Set operations require identical column counts; a mismatch causes an immediate query error.",
      "prompt": "What error occurs if the first SELECT has 3 columns and the second SELECT has 2 columns in a UNION?"
    },
    {
      "id": 15,
      "type": "mcq",
      "question": "Can you use parentheses to control the order of evaluation between UNION and INTERSECT?",
      "options": [
        "Yes, parentheses can explicitly group set operations to override default precedence",
        "No, parentheses are invalid around SELECT in set statements",
        "Only in PostgreSQL",
        "Only with CTEs"
      ],
      "answer": "Yes, parentheses can explicitly group set operations to override default precedence",
      "explanation": "Parentheses clarify evaluation order when mixing INTERSECT (which has higher precedence) and UNION.",
      "prompt": "Can you use parentheses to control the order of evaluation between UNION and INTERSECT?"
    },
    {
      "id": 16,
      "type": "mcq",
      "question": "Does UNION remove duplicates across individual queries or across the entire combined result?",
      "options": [
        "Across the entire combined result set",
        "Only within each query individually",
        "Only from the first query",
        "Only from the second query"
      ],
      "answer": "Across the entire combined result set",
      "explanation": "UNION merges all rows from both inputs and removes duplicates across the whole unified dataset.",
      "prompt": "Does UNION remove duplicates across individual queries or across the entire combined result?"
    },
    {
      "id": 17,
      "type": "mcq",
      "question": "What is the output of: SELECT 'A' EXCEPT SELECT 'A'?",
      "options": [
        "0 rows",
        "1 row with 'A'",
        "1 row with NULL",
        "An error"
      ],
      "answer": "0 rows",
      "explanation": "Subtracting 'A' from 'A' leaves an empty set.",
      "prompt": "What is the output of: SELECT 'A' EXCEPT SELECT 'A'?"
    },
    {
      "id": 18,
      "type": "mcq",
      "question": "What is the output of: SELECT 'A' INTERSECT SELECT 'B'?",
      "options": [
        "0 rows",
        "2 rows ('A', 'B')",
        "1 row with 'AB'",
        "NULL"
      ],
      "answer": "0 rows",
      "explanation": "Since 'A' and 'B' do not match, the intersection is empty.",
      "prompt": "What is the output of: SELECT 'A' INTERSECT SELECT 'B'?"
    },
    {
      "id": 19,
      "type": "mcq",
      "question": "Can you include literal constant values (like 'Customer' or 2024) in the SELECT list of a UNION query?",
      "options": [
        "Yes, literal expressions are frequently used to tag source datasets or fill missing attributes",
        "No, only table columns can be selected",
        "Only in WHERE clauses",
        "Only with CAST"
      ],
      "answer": "Yes, literal expressions are frequently used to tag source datasets or fill missing attributes",
      "explanation": "Literals like 'Employee' AS source are standard for labeling origins in combined reports.",
      "prompt": "Can you include literal constant values (like 'Customer' or 2024) in the SELECT list of a UNION query?"
    },
    {
      "id": 20,
      "type": "mcq",
      "question": "Which clause filters individual rows BEFORE they are fed into a UNION operation?",
      "options": [
        "The WHERE clause inside each individual SELECT statement",
        "A global WHERE clause at the end",
        "The HAVING clause of the final query",
        "The ON clause"
      ],
      "answer": "The WHERE clause inside each individual SELECT statement",
      "explanation": "Each SELECT query executes its own WHERE clause before its result set is handed to the set operator.",
      "prompt": "Which clause filters individual rows BEFORE they are fed into a UNION operation?"
    },
    {
      "id": 21,
      "type": "code",
      "question": "Write a query combining `email` from `employees` and `email` from `customers` using `UNION`.",
      "answer": "SELECT email FROM employees UNION SELECT email FROM customers;",
      "prompt": "Write a query combining `email` from `employees` and `email` from `customers` using `UNION`.",
      "ref": "SELECT email FROM employees UNION SELECT email FROM customers;"
    },
    {
      "id": 22,
      "type": "code",
      "question": "Write a query combining `first_name` from `employees` and `first_name` from `customers` using `UNION ALL`.",
      "answer": "SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers;",
      "prompt": "Write a query combining `first_name` from `employees` and `first_name` from `customers` using `UNION ALL`.",
      "ref": "SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers;"
    },
    {
      "id": 23,
      "type": "code",
      "question": "Write an `INTERSECT` query finding `first_name` values present in both `customers` and `employees`.",
      "answer": "SELECT first_name FROM customers INTERSECT SELECT first_name FROM employees;",
      "prompt": "Write an `INTERSECT` query finding `first_name` values present in both `customers` and `employees`.",
      "ref": "SELECT first_name FROM customers INTERSECT SELECT first_name FROM employees;"
    },
    {
      "id": 24,
      "type": "code",
      "question": "Write an `EXCEPT` query finding `customer_id` from `customers` that does not appear in `orders`.",
      "answer": "SELECT customer_id FROM customers EXCEPT SELECT customer_id FROM orders;",
      "prompt": "Write an `EXCEPT` query finding `customer_id` from `customers` that does not appear in `orders`.",
      "ref": "SELECT customer_id FROM customers EXCEPT SELECT customer_id FROM orders;"
    },
    {
      "id": 25,
      "type": "code",
      "question": "Write a query finding `product_id` from `products` that does not appear in `order_items` using `EXCEPT`.",
      "answer": "SELECT product_id FROM products EXCEPT SELECT product_id FROM order_items;",
      "prompt": "Write a query finding `product_id` from `products` that does not appear in `order_items` using `EXCEPT`.",
      "ref": "SELECT product_id FROM products EXCEPT SELECT product_id FROM order_items;"
    }
  ]
};
