// Day 17 — DDL, DML & Constraints (CREATE, ALTER, DROP, TRUNCATE, INSERT, UPDATE, DELETE & Transactions)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day17'] = {
  "day": 17,
  "title": "DDL, DML & Schema Design",
  "db": "retail",
  "emoji": "🛠️",
  "slides": [
    {
      "title": "DDL, DML, Constraints & Transactions",
      "duration": "09:01",
      "html": `<h2>🛠️ DDL, DML, Constraints &amp; Transactions (Data Architecture &amp; Integrity)</h2>

        <!-- ── Section 01: SQL Command Categories ── -->
        <div class="slide-section" id="day17Overview">
          <h3 class="heading-with-audio" id="sqlCommandCategories">
            01. SQL Command Classification (DDL, DML, DQL, DCL, TCL)
          </h3>
          <p>SQL statements are partitioned into five functional domains. As a data analyst or analytics engineer, understanding these boundaries is fundamental to creating, maintaining, and transforming production datasets safely.</p>
        </div>

        <div class="slide-section" id="sqlCommandTableSection">
          <div class="db-mock-table-wrap" id="sqlCommandTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">SQL Language Classification Matrix</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Category</th><th>Full Name</th><th>Core Commands</th><th>Target Level</th><th>Primary Objective</th></tr></thead>
              <tbody>
                <tr id="day17Cmd1"><td><strong>DDL</strong></td><td>Data Definition Language</td><td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code></td><td>Schema &amp; Metadata</td><td>Define, modify, or destroy table structures</td></tr>
                <tr id="day17Cmd2"><td><strong>DML</strong></td><td>Data Manipulation Language</td><td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE</code></td><td>Data Rows</td><td>Add, modify, or remove data records inside tables</td></tr>
                <tr id="day17Cmd3"><td><strong>DQL</strong></td><td>Data Query Language</td><td><code>SELECT</code></td><td>Data Retrieval</td><td>Extract, filter, join, and aggregate datasets</td></tr>
                <tr id="day17Cmd4"><td><strong>DCL</strong></td><td>Data Control Language</td><td><code>GRANT</code>, <code>REVOKE</code></td><td>Security &amp; RBAC</td><td>Manage user roles, privileges, and object permissions</td></tr>
                <tr id="day17Cmd5"><td><strong>TCL</strong></td><td>Transaction Control Language</td><td><code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></td><td>Transaction Engine</td><td>Manage atomic units of execution and state recovery</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 02: DDL — CREATE TABLE & Data Types ── -->
        <div class="slide-section" id="ddlCreateTableSection">
          <h3 class="heading-with-audio" id="ddlCreateTable">
            02. DDL Deep Dive — CREATE TABLE &amp; Data Types
          </h3>
          <p><code>CREATE TABLE</code> establishes a new relation, specifying its column definitions, physical storage types, and column-level invariants.</p>
        </div>

        <div class="slide-section" id="createTableSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 1 — Creating Production Tables with Constraints</h4>
          </div>
          <div class="code-block-container" id="createTableCode">
            <div class="code-subblock" id="createTableQuery1">
              <pre><code><span class="code-comment">-- 1. Create product_reviews with PK, FK, and CHECK constraints</span>
<span class="kw">CREATE TABLE IF NOT EXISTS</span> product_reviews (
  review_id    <span class="kw">INTEGER PRIMARY KEY AUTOINCREMENT</span>,
  product_id   <span class="kw">INTEGER NOT NULL</span>,
  customer_id  <span class="kw">INTEGER NOT NULL</span>,
  rating       <span class="kw">INTEGER NOT NULL CHECK</span> (rating <span class="kw">BETWEEN</span> 1 <span class="kw">AND</span> 5),
  review_text  <span class="kw">TEXT</span>,
  review_date  <span class="kw">TEXT NOT NULL DEFAULT</span> (date(<span class="str">'now'</span>)),
  <span class="kw">FOREIGN KEY</span> (product_id)  <span class="kw">REFERENCES</span> products(product_id),
  <span class="kw">FOREIGN KEY</span> (customer_id) <span class="kw">REFERENCES</span> customers(customer_id)
);</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 03: Integrity Constraints ── -->
        <div class="slide-section" id="constraintsSection">
          <h3 class="heading-with-audio" id="constraintsMatrix">
            03. Database Integrity Constraints Matrix
          </h3>
          <p>Constraints enforce schema-level business logic directly within the storage engine, rejecting corrupt or illegal data before it can be written to disk.</p>
        </div>

        <div class="slide-section" id="constraintsTableSection">
          <div class="db-mock-table-wrap" id="constraintsTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Relational Constraint Types Reference</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Constraint</th><th>Rule Enforced</th><th>NULL Behavior</th><th>Production Example</th></tr></thead>
              <tbody>
                <tr id="day17Const1"><td><code>PRIMARY KEY</code></td><td>Uniquely identifies each record</td><td>Disallows NULLs entirely</td><td><code>employee_id INTEGER PRIMARY KEY</code></td></tr>
                <tr id="day17Const2"><td><code>FOREIGN KEY</code></td><td>Referential integrity to parent table PK</td><td>Permits NULL (unless NOT NULL declared)</td><td><code>REFERENCES departments(department_id)</code></td></tr>
                <tr id="day17Const3"><td><code>NOT NULL</code></td><td>Prevents missing or absent values</td><td>Rejects all NULL values</td><td><code>email TEXT NOT NULL</code></td></tr>
                <tr id="day17Const4"><td><code>UNIQUE</code></td><td>Ensures all non-null values are distinct</td><td>Permits NULLs in standard SQL engines</td><td><code>promo_code TEXT UNIQUE</code></td></tr>
                <tr id="day17Const5"><td><code>CHECK</code></td><td>Evaluates a boolean condition for every row</td><td>Passes if expression evaluates to TRUE or NULL</td><td><code>CHECK (salary &gt; 0 AND rating &lt;= 5)</code></td></tr>
                <tr id="day17Const6"><td><code>DEFAULT</code></td><td>Supplies a fallback literal or system call</td><td>Substitutes value when column omitted in INSERT</td><td><code>created_at TEXT DEFAULT (datetime('now'))</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="foreignKeysSection">
          <div class="info-box" id="foreignKeysCallout">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">🔗 Referential Integrity &amp; Cascades:</strong>
            </div>
            <p style="margin: 0;">Foreign keys can specify cascade actions on parent record mutation: <code>ON DELETE CASCADE</code> deletes child rows automatically, while <code>ON DELETE SET NULL</code> or <code>ON DELETE RESTRICT</code> protects parent rows from being orphaned.</p>
          </div>
        </div>

        <!-- ── Section 04: Schema Evolution: ALTER TABLE & DROP ── -->
        <div class="slide-section" id="alterDropSection">
          <h3 class="heading-with-audio" id="alterDropTable">
            04. Schema Evolution — ALTER TABLE &amp; DROP TABLE
          </h3>
          <p>As business requirements evolve, schema definitions must change without losing existing transactional data.</p>
        </div>

        <div class="slide-section" id="alterDropCodeSection">
          <div class="code-block-container" id="alterDropCode">
            <div class="code-subblock" id="alterDropQuery1">
              <pre><code><span class="code-comment">-- 1. Add a new column with a default value</span>
<span class="kw">ALTER TABLE</span> customers <span class="kw">ADD COLUMN</span> loyalty_points <span class="kw">INTEGER DEFAULT</span> 0;

<span class="code-comment">-- 2. Create performance index on high-cardinality foreign key</span>
<span class="kw">CREATE INDEX IF NOT EXISTS</span> idx_orders_cust <span class="kw">ON</span> orders(customer_id);

<span class="code-comment">-- 3. Safely drop an obsolete staging table</span>
<span class="kw">DROP TABLE IF EXISTS</span> temp_analytics;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="dropTruncateDeleteSection">
          <div class="vs-block" id="dropTruncateDelete" style="margin-top: 8px;">
            <div class="vs-card" id="dropCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-neg);">DROP TABLE (DDL)</h4>
              <p style="margin-bottom: 6px;">Destroys the <strong>entire table structure, indexes, and all rows</strong>. Irreversible and frees metadata catalog entries.</p>
              <pre><code><span class="kw">DROP TABLE</span> temp_table;</code></pre>
            </div>
            <div class="vs-card" id="truncateCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">TRUNCATE TABLE (DDL)</h4>
              <p style="margin-bottom: 6px;">Removes <strong>all data rows instantly</strong> by deallocating storage pages. Retains table schema and column definitions.</p>
              <pre><code><span class="kw">TRUNCATE TABLE</span> logs;</code></pre>
            </div>
            <div class="vs-card" id="deleteCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-warn);">DELETE (DML)</h4>
              <p style="margin-bottom: 6px;">Scans and removes <strong>targeted or all rows row-by-row</strong>. Can be filtered with <code>WHERE</code> and rolled back inside transactions.</p>
              <pre><code><span class="kw">DELETE FROM</span> orders <span class="kw">WHERE</span> status = <span class="str">'Cancelled'</span>;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 05: DML — INSERT, UPDATE & DELETE ── -->
        <div class="slide-section" id="dmlOperations">
          <h3 class="heading-with-audio" id="insertSection">
            05. DML Operations — INSERT, UPDATE &amp; DELETE
          </h3>
          <p>DML manipulates row-level data. Correct execution guarantees consistent business records without accidental table-wide overwrites.</p>
        </div>

        <div class="slide-section" id="dmlCodeSection">
          <div class="code-block-container" id="dmlCode">
            <div class="code-subblock" id="dmlQuery1">
              <pre><code><span class="code-comment">-- 1. Single &amp; Bulk Multi-Row INSERT</span>
<span class="kw">INSERT INTO</span> product_reviews (product_id, customer_id, rating, review_text)
<span class="kw">VALUES</span> (1, 2, 5, <span class="str">'Exceptional sound quality!'</span>),
       (2, 3, 4, <span class="str">'Durable build, fast delivery.'</span>),
       (3, 1, 3, <span class="str">'Average battery life.'</span>);

<span class="code-comment">-- 2. Targeted UPDATE with WHERE</span>
<span class="kw">UPDATE</span> employees
<span class="kw">SET</span>    salary = salary * 1.05
<span class="kw">WHERE</span>  department_id = 10 <span class="kw">AND</span> is_active = 1;

<span class="code-comment">-- 3. Filtered DELETE with WHERE</span>
<span class="kw">DELETE FROM</span> product_reviews
<span class="kw">WHERE</span>  rating &lt; 2;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 06: Defensive DML & Safety Best Practices ── -->
        <div class="slide-section" id="whereClauseSafetySection">
          <div class="warn-box" id="whereClauseSafety">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The Cardinal Rule of UPDATE &amp; DELETE:</strong>
            </div>
            <p style="margin: 0;">Never execute an <code>UPDATE</code> or <code>DELETE</code> statement without a verified <code>WHERE</code> clause in production. Omitting <code>WHERE</code> applies the operation to <strong>every single row in the entire table</strong>. Always run a <code>SELECT * FROM table WHERE condition</code> first to visually inspect and count the targeted rows before executing modification.</p>
          </div>
        </div>

        <!-- ── Section 07: Transactions & ACID Properties ── -->
        <div class="slide-section" id="transactionsAcidSection">
          <h3 class="heading-with-audio" id="transactionsAcid">
            06. Transaction Management &amp; ACID Architecture
          </h3>
          <p>A database <strong>transaction</strong> encapsulates multiple SQL operations into a single atomic execution unit: either every statement commits successfully, or the entire batch is rolled back to maintain complete data consistency.</p>
        </div>

        <div class="slide-section" id="transactionCodeSection">
          <div class="code-block-container" id="transactionCode">
            <div class="code-subblock" id="transactionQuery1">
              <pre><code><span class="code-comment">-- Atomic Banking / Inventory Transfer Pattern</span>
<span class="kw">BEGIN TRANSACTION</span>;

<span class="code-comment">-- Step 1: Deduct 10 units from inventory</span>
<span class="kw">UPDATE</span> products
<span class="kw">SET</span>    stock_qty = stock_qty - 10
<span class="kw">WHERE</span>  product_id = 1;

<span class="code-comment">-- Step 2: Record order item row</span>
<span class="kw">INSERT INTO</span> order_items (order_id, product_id, qty, unit_price)
<span class="kw">VALUES</span> (99, 1, 10, 5000);

<span class="code-comment">-- Commit both changes permanently to disk</span>
<span class="kw">COMMIT</span>;

<span class="code-comment">-- In case of failure or constraint violation:</span>
<span class="code-comment">-- ROLLBACK;</span></code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="acidPropertiesSection">
          <div class="pro-tip-box" id="acidProperties">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">🛡️ The ACID Invariants:</strong>
            </div>
            <ul style="margin: 4px 0 0 16px; padding: 0; line-height: 1.5;">
              <li><strong>Atomicity:</strong> All-or-nothing. If statement 9 of 10 fails, statements 1 through 8 are automatically undone.</li>
              <li><strong>Consistency:</strong> The database transitions strictly between valid schema states, respecting all constraints and foreign keys.</li>
              <li><strong>Isolation:</strong> Concurrent transactions execute independently without dirty reads or uncommitted state interference.</li>
              <li><strong>Durability:</strong> Once a transaction commits via write-ahead logging (WAL), its state survives crashes and power outages.</li>
            </ul>
          </div>
        </div>

        <!-- ── Section 08: Interview Q&A Consolidated Section ── -->
        <div class="slide-section" id="day17QASection">
          <div class="interview-box">
            <h4 id="day17QAHeading" style="margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> Top 25 SQL Interview Q&amp;A — DDL, DML, Constraints &amp; Transactions
            </h4>

            <div id="day17QA1">
              <p><strong>Q1: What is the primary difference between DDL and DML in SQL?</strong></p>
              <p><em>A: DDL (Data Definition Language) operates on database schemas and structures (<code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>) without processing individual rows. DML (Data Manipulation Language) operates on the data records stored inside tables (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE</code>).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA2">
              <p><strong>Q2: What is the difference between DROP, TRUNCATE, and DELETE?</strong></p>
              <p><em>A: <code>DROP</code> removes the entire table structure and data permanently. <code>TRUNCATE</code> removes all rows by deallocating data pages, keeping the table structure intact (DDL). <code>DELETE</code> removes specified or all rows row-by-row, generates transaction log entries, and can be filtered using a <code>WHERE</code> clause (DML).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA3">
              <p><strong>Q3: Why does SQLite not support the TRUNCATE TABLE command?</strong></p>
              <p><em>A: SQLite deliberately omits <code>TRUNCATE</code> to maintain a minimal binary footprint. In SQLite, running <code>DELETE FROM table_name;</code> without a <code>WHERE</code> clause activates the internal "truncate optimizer", deallocating the table b-tree directly for instant clearing.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA4">
              <p><strong>Q4: What happens if you execute an UPDATE or DELETE statement without a WHERE clause?</strong></p>
              <p><em>A: Without a <code>WHERE</code> filter, the engine modifies or deletes every single row across the entire table. In production systems, this causes catastrophic data loss.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA5">
              <p><strong>Q5: What is a PRIMARY KEY constraint, and can a table have more than one?</strong></p>
              <p><em>A: A PRIMARY KEY uniquely identifies each row and strictly disallows NULL values. A table can have only <strong>one</strong> PRIMARY KEY, but that primary key can consist of multiple columns (composite primary key).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA6">
              <p><strong>Q6: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?</strong></p>
              <p><em>A: A table can have only one PRIMARY KEY (which rejects NULLs). In contrast, a table can have multiple UNIQUE constraints, and in standard SQL, UNIQUE columns can accept NULL values (as NULL is not equal to another NULL).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA7">
              <p><strong>Q7: What is the purpose of the FOREIGN KEY constraint?</strong></p>
              <p><em>A: It enforces referential integrity between tables by requiring that values in a child table column must exist as a primary or unique key in the referenced parent table.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA8">
              <p><strong>Q8: What are cascading actions in foreign keys (ON DELETE CASCADE, ON UPDATE CASCADE)?</strong></p>
              <p><em>A: Cascading actions specify what happens to child rows when a referenced parent record is deleted or updated. <code>ON DELETE CASCADE</code> automatically removes associated child rows; <code>ON DELETE SET NULL</code> sets foreign key values to NULL; and <code>ON DELETE RESTRICT</code> blocks parent deletion if child records exist.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA9">
              <p><strong>Q9: What is a CHECK constraint and when is it evaluated?</strong></p>
              <p><em>A: A CHECK constraint defines a boolean expression that all column values must satisfy (e.g. <code>CHECK (age &gt;= 18)</code>). It is evaluated whenever a row is inserted or updated. If the condition evaluates to FALSE, the transaction aborts with a constraint violation.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA10">
              <p><strong>Q10: What is the DEFAULT constraint and when is its value applied?</strong></p>
              <p><em>A: It provides a pre-configured literal value or function output (such as <code>DEFAULT 'Active'</code> or <code>DEFAULT (date('now'))</code>) whenever an <code>INSERT</code> statement does not explicitly provide a value for that column.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA11">
              <p><strong>Q11: Can a column with a UNIQUE constraint contain multiple NULL values?</strong></p>
              <p><em>A: Yes, in standard SQL, PostgreSQL, MySQL, and SQLite. Because NULL represents an unknown value, one NULL cannot be said to equal another NULL. In Microsoft SQL Server, however, a standard UNIQUE constraint allows only a single NULL unless declared as a filtered unique index.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA12">
              <p><strong>Q12: What is an AUTOINCREMENT column in SQLite and how does it prevent ID reuse?</strong></p>
              <p><em>A: In SQLite, <code>INTEGER PRIMARY KEY AUTOINCREMENT</code> guarantees that new rows receive an integer strictly greater than the largest ID ever stored in that table. Even if the row with the highest ID is deleted, its ID is never recycled.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA13">
              <p><strong>Q13: What are the ACID properties in database transaction management?</strong></p>
              <p><em>A: Atomicity (all statements succeed or all are rolled back), Consistency (all constraints and invariants are preserved), Isolation (concurrent transactions execute without interference), and Durability (committed changes persist across system restarts and crashes).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA14">
              <p><strong>Q14: What is the difference between COMMIT and ROLLBACK?</strong></p>
              <p><em>A: <code>COMMIT</code> finalizes all statements executed within the transaction, writing them permanently to disk and releasing locks. <code>ROLLBACK</code> reverts all modifications made since the beginning of the transaction, restoring the database to its pre-transaction state.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA15">
              <p><strong>Q15: What is a SAVEPOINT in transaction control?</strong></p>
              <p><em>A: A SAVEPOINT establishes a checkpoint within an ongoing transaction. If a subsequent statement fails, the application can issue <code>ROLLBACK TO savepoint_name</code> to undo partial work without discarding the entire transaction.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA16">
              <p><strong>Q16: Can DDL statements like CREATE TABLE or ALTER TABLE be rolled back inside a transaction?</strong></p>
              <p><em>A: In PostgreSQL and SQLite, yes: DDL statements are transactional and can be rolled back via <code>ROLLBACK</code>. In MySQL and Oracle, DDL statements trigger an implicit <code>COMMIT</code> and cannot be rolled back.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA17">
              <p><strong>Q17: What is the difference between CHAR, VARCHAR, and TEXT data types?</strong></p>
              <p><em>A: <code>CHAR(n)</code> is fixed-length, right-padding shorter strings with spaces up to n characters. <code>VARCHAR(n)</code> stores variable-length strings up to a specified maximum length of n. <code>TEXT</code> stores variable-length character data without length limits (ideal for essays, JSON, or logs).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA18">
              <p><strong>Q18: How do you add a new column to an existing table using ALTER TABLE?</strong></p>
              <p><em>A: Use <code>ALTER TABLE table_name ADD COLUMN column_name data_type [constraints];</code>. If adding a NOT NULL column to a table with existing rows, you must supply a DEFAULT value.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA19">
              <p><strong>Q19: Can you drop or rename a column using ALTER TABLE in all SQL dialects?</strong></p>
              <p><em>A: In modern PostgreSQL, MySQL 8+, and SQLite 3.35+, yes: <code>ALTER TABLE table DROP COLUMN col</code> and <code>RENAME COLUMN old TO new</code> are supported. In legacy SQLite versions, dropping a column required copying data to a new table and dropping the old table.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA20">
              <p><strong>Q20: What is the purpose of the IF EXISTS and IF NOT EXISTS clauses in DDL?</strong></p>
              <p><em>A: They provide idempotent schema migrations. <code>CREATE TABLE IF NOT EXISTS</code> creates the object only if it is missing, preventing runtime errors. <code>DROP TABLE IF EXISTS</code> drops the table safely without failing if the table was already deleted.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA21">
              <p><strong>Q21: How do you perform a bulk multi-row INSERT in standard SQL?</strong></p>
              <p><em>A: By supplying multiple comma-delimited parenthesized value lists in a single <code>VALUES</code> clause: <code>INSERT INTO table (col1, col2) VALUES (v1, v2), (v3, v4), (v5, v6);</code>. This minimizes round trips and lock acquisition overhead.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA22">
              <p><strong>Q22: What is an UPSERT operation, and how is it implemented in modern SQL engines?</strong></p>
              <p><em>A: UPSERT inserts a new record or updates existing matching rows if a primary or unique key conflict occurs. In SQLite and PostgreSQL, it is written as <code>INSERT INTO ... VALUES (...) ON CONFLICT (col) DO UPDATE SET ...</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA23">
              <p><strong>Q23: How do you safely test an UPDATE or DELETE query before executing it in production?</strong></p>
              <p><em>A: First, run <code>SELECT count(*), * FROM table WHERE condition;</code> using the exact same WHERE predicate to inspect the candidate rows. Second, wrap the modification in <code>BEGIN TRANSACTION; ... ROLLBACK;</code> in a staging environment to observe execution impact without persistence.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA24">
              <p><strong>Q24: What is the difference between a Clustered Index and a Non-Clustered Index?</strong></p>
              <p><em>A: A Clustered Index dictates the physical ordering of data pages on disk (only one clustered index can exist per table, typically the primary key). A Non-Clustered Index is an auxiliary B-tree structure holding key columns and row locators (pointers) to the physical rows.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day17QA25">
              <p><strong>Q25: What are composite indexes, and what is the "Leftmost Prefix" rule?</strong></p>
              <p><em>A: A composite index indexes multiple columns (e.g. <code>(department_id, salary)</code>). The leftmost prefix rule dictates that the query optimizer can only utilize the index if the query filters on the leading column (e.g., filtering on <code>department_id</code> or both columns, but not solely on <code>salary</code>).</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Create Reviews Table with Constraints",
      "prompt": "Create a table named <code>product_reviews</code> with columns: <code>review_id</code> (INTEGER PRIMARY KEY AUTOINCREMENT), <code>product_id</code> (INTEGER NOT NULL), <code>customer_id</code> (INTEGER NOT NULL), <code>rating</code> (INTEGER NOT NULL with a CHECK constraint between 1 and 5), <code>review_text</code> (TEXT), and <code>review_date</code> (TEXT with DEFAULT <code>date('now')</code>).",
      "starterSql": "-- Create table product_reviews with constraints\nCREATE TABLE product_reviews (\n  review_id   INTEGER PRIMARY KEY AUTOINCREMENT,\n  product_id  INTEGER NOT NULL,\n  customer_id INTEGER NOT NULL,\n  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),\n  review_text TEXT,\n  review_date TEXT DEFAULT (date('now'))\n);",
      "referenceSql": "CREATE TABLE IF NOT EXISTS product_reviews (review_id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5), review_text TEXT, review_date TEXT DEFAULT (date('now')));",
      "solutionAudio": "Day17/New_Day17Question01sol.mp3",
      "solutionCode": "CREATE TABLE product_reviews (\n  review_id   INTEGER PRIMARY KEY AUTOINCREMENT,\n  product_id  INTEGER NOT NULL,\n  customer_id INTEGER NOT NULL,\n  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),\n  review_text TEXT,\n  review_date TEXT DEFAULT (date('now'))\n);",
      "tableScroll": false
    },
    {
      "id": 2,
      "title": "Insert Single Review Record",
      "prompt": "Insert a single row into <code>product_reviews</code> for <code>product_id</code> 1, <code>customer_id</code> 2, <code>rating</code> 5, and <code>review_text</code> 'Excellent quality!'.",
      "starterSql": "-- Insert a single review into product_reviews\nINSERT INTO product_reviews (product_id, customer_id, rating, review_text)\nVALUES (1, 2, 5, 'Excellent quality!');",
      "referenceSql": "INSERT INTO product_reviews (product_id, customer_id, rating, review_text) VALUES (1, 2, 5, 'Excellent quality!');",
      "solutionAudio": "Day17/New_Day17Question02sol.mp3",
      "solutionCode": "INSERT INTO product_reviews (product_id, customer_id, rating, review_text)\nVALUES (1, 2, 5, 'Excellent quality!');",
      "tableScroll": false
    },
    {
      "id": 3,
      "title": "Bulk Insert Multiple Reviews",
      "prompt": "Perform a multi-row bulk insert into <code>product_reviews</code> with three tuples: <code>(2, 3, 4)</code>, <code>(3, 1, 3)</code>, and <code>(4, 5, 5)</code> for <code>(product_id, customer_id, rating)</code>.",
      "starterSql": "-- Bulk insert multiple rows in one statement\nINSERT INTO product_reviews (product_id, customer_id, rating)\nVALUES (2, 3, 4),\n       (3, 1, 3),\n       (4, 5, 5);",
      "referenceSql": "INSERT INTO product_reviews (product_id, customer_id, rating) VALUES (2, 3, 4), (3, 1, 3), (4, 5, 5);",
      "solutionAudio": "Day17/New_Day17Question03sol.mp3",
      "solutionCode": "INSERT INTO product_reviews (product_id, customer_id, rating)\nVALUES (2, 3, 4),\n       (3, 1, 3),\n       (4, 5, 5);",
      "tableScroll": false
    },
    {
      "id": 4,
      "title": "Targeted Salary Raise",
      "prompt": "Update the <code>employees</code> table to grant a 5% raise (<code>salary * 1.05</code>) to all active employees (<code>is_active = 1</code>) in department 10.",
      "starterSql": "-- Apply 5% raise to active employees in dept 10\nUPDATE employees\nSET    salary = salary * 1.05\nWHERE  department_id = 10 AND is_active = 1;",
      "referenceSql": "UPDATE employees SET salary = salary * 1.05 WHERE department_id = 10 AND is_active = 1;",
      "solutionAudio": "Day17/New_Day17Question04sol.mp3",
      "solutionCode": "UPDATE employees\nSET    salary = salary * 1.05\nWHERE  department_id = 10 AND is_active = 1;",
      "tableScroll": false
    },
    {
      "id": 5,
      "title": "Purge Out-of-Stock Products",
      "prompt": "Delete all products from the <code>products</code> table where <code>stock_qty = 0</code>.",
      "starterSql": "-- Delete zero stock items from products\nDELETE FROM products\nWHERE  stock_qty = 0;",
      "referenceSql": "DELETE FROM products WHERE stock_qty = 0;",
      "solutionAudio": "Day17/New_Day17Question05sol.mp3",
      "solutionCode": "DELETE FROM products\nWHERE  stock_qty = 0;",
      "tableScroll": false
    },
    {
      "id": 6,
      "title": "Alter Table Add Column",
      "prompt": "Add a new column <code>loyalty_points</code> of type <code>INTEGER</code> with a default value of <code>0</code> to the <code>customers</code> table.",
      "starterSql": "-- Add loyalty_points column to customers\nALTER TABLE customers\nADD COLUMN loyalty_points INTEGER DEFAULT 0;",
      "referenceSql": "ALTER TABLE customers ADD COLUMN loyalty_points INTEGER DEFAULT 0;",
      "solutionAudio": "Day17/New_Day17Question06sol.mp3",
      "solutionCode": "ALTER TABLE customers\nADD COLUMN loyalty_points INTEGER DEFAULT 0;",
      "tableScroll": false
    },
    {
      "id": 7,
      "title": "Create B-Tree Index for Lookups",
      "prompt": "Create a standard index named <code>idx_orders_customer</code> on the <code>orders</code> table indexing the <code>customer_id</code> column.",
      "starterSql": "-- Create index on customer_id in orders\nCREATE INDEX idx_orders_customer\nON orders (customer_id);",
      "referenceSql": "CREATE INDEX idx_orders_customer ON orders (customer_id);",
      "solutionAudio": "Day17/New_Day17Question07sol.mp3",
      "solutionCode": "CREATE INDEX idx_orders_customer\nON orders (customer_id);",
      "tableScroll": false
    },
    {
      "id": 8,
      "title": "Cancel Stale Processing Orders",
      "prompt": "Update all orders in the <code>orders</code> table to <code>status = 'Cancelled'</code> where <code>status = 'Processing'</code> and <code>order_date < '2024-01-01'</code>.",
      "starterSql": "-- Cancel outdated processing orders\nUPDATE orders\nSET    status = 'Cancelled'\nWHERE  status = 'Processing' AND order_date < '2024-01-01';",
      "referenceSql": "UPDATE orders SET status = 'Cancelled' WHERE status = 'Processing' AND order_date < '2024-01-01';",
      "solutionAudio": "Day17/New_Day17Question08sol.mp3",
      "solutionCode": "UPDATE orders\nSET    status = 'Cancelled'\nWHERE  status = 'Processing' AND order_date < '2024-01-01';",
      "tableScroll": false
    },
    {
      "id": 9,
      "title": "Create Promo Codes Table",
      "prompt": "Create a table named <code>promo_codes</code> with columns: <code>code</code> (TEXT PRIMARY KEY NOT NULL UNIQUE), <code>discount_pct</code> (REAL with a CHECK constraint between 0 and 100), and <code>is_active</code> (INTEGER DEFAULT 1).",
      "starterSql": "-- Create table promo_codes with CHECK constraint\nCREATE TABLE promo_codes (\n  code         TEXT PRIMARY KEY NOT NULL UNIQUE,\n  discount_pct REAL CHECK (discount_pct BETWEEN 0 AND 100),\n  is_active    INTEGER DEFAULT 1\n);",
      "referenceSql": "CREATE TABLE promo_codes (code TEXT PRIMARY KEY NOT NULL UNIQUE, discount_pct REAL CHECK (discount_pct BETWEEN 0 AND 100), is_active INTEGER DEFAULT 1);",
      "solutionAudio": "Day17/New_Day17Question09sol.mp3",
      "solutionCode": "CREATE TABLE promo_codes (\n  code         TEXT PRIMARY KEY NOT NULL UNIQUE,\n  discount_pct REAL CHECK (discount_pct BETWEEN 0 AND 100),\n  is_active    INTEGER DEFAULT 1\n);",
      "tableScroll": false
    },
    {
      "id": 10,
      "title": "Safe Table Deletion",
      "prompt": "Safely drop the table <code>temp_analytics</code> if it exists in the database.",
      "starterSql": "-- Drop table if it exists\nDROP TABLE IF EXISTS temp_analytics;",
      "referenceSql": "DROP TABLE IF EXISTS temp_analytics;",
      "solutionAudio": "Day17/New_Day17Question10sol.mp3",
      "solutionCode": "DROP TABLE IF EXISTS temp_analytics;",
      "tableScroll": false
    },
    {
      "id": 11,
      "title": "Nullify Department Commission",
      "prompt": "Update the <code>employees</code> table to set <code>commission = NULL</code> for all employees belonging to department 30.",
      "starterSql": "-- Set commission to NULL for department 30\nUPDATE employees\nSET    commission = NULL\nWHERE  department_id = 30;",
      "referenceSql": "UPDATE employees SET commission = NULL WHERE department_id = 30;",
      "solutionAudio": "Day17/New_Day17Question11sol.mp3",
      "solutionCode": "UPDATE employees\nSET    commission = NULL\nWHERE  department_id = 30;",
      "tableScroll": false
    },
    {
      "id": 12,
      "title": "Create System Notifications Table",
      "prompt": "Create a table <code>notifications</code> with columns: <code>id</code> (INTEGER PRIMARY KEY AUTOINCREMENT), <code>message</code> (TEXT NOT NULL), <code>seen</code> (INTEGER DEFAULT 0), and <code>created_at</code> (TEXT DEFAULT <code>datetime('now')</code>).",
      "starterSql": "-- Create notifications table with datetime DEFAULT\nCREATE TABLE notifications (\n  id         INTEGER PRIMARY KEY AUTOINCREMENT,\n  message    TEXT NOT NULL,\n  seen       INTEGER DEFAULT 0,\n  created_at TEXT DEFAULT (datetime('now'))\n);",
      "referenceSql": "CREATE TABLE notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL, seen INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')));",
      "solutionAudio": "Day17/New_Day17Question12sol.mp3",
      "solutionCode": "CREATE TABLE notifications (\n  id         INTEGER PRIMARY KEY AUTOINCREMENT,\n  message    TEXT NOT NULL,\n  seen       INTEGER DEFAULT 0,\n  created_at TEXT DEFAULT (datetime('now'))\n);",
      "tableScroll": false
    },
    {
      "id": 13,
      "title": "Add Tags Column with Default",
      "prompt": "Alter the <code>products</code> table to add a column named <code>tags</code> of type <code>TEXT</code> with a default value of <code>'none'</code>.",
      "starterSql": "-- Add tags column to products\nALTER TABLE products\nADD COLUMN tags TEXT DEFAULT 'none';",
      "referenceSql": "ALTER TABLE products ADD COLUMN tags TEXT DEFAULT 'none';",
      "solutionAudio": "Day17/New_Day17Question13sol.mp3",
      "solutionCode": "ALTER TABLE products\nADD COLUMN tags TEXT DEFAULT 'none';",
      "tableScroll": false
    },
    {
      "id": 14,
      "title": "Atomic Transaction with Commit",
      "prompt": "Wrap an inventory update inside a transaction: begin the transaction, deduct 10 units from <code>stock_qty</code> for <code>product_id = 1</code> in <code>products</code>, and commit the transaction.",
      "starterSql": "-- Atomic transaction with COMMIT\nBEGIN TRANSACTION;\nUPDATE products\nSET    stock_qty = stock_qty - 10\nWHERE  product_id = 1;\nCOMMIT;",
      "referenceSql": "BEGIN TRANSACTION; UPDATE products SET stock_qty = stock_qty - 10 WHERE product_id = 1; COMMIT;",
      "solutionAudio": "Day17/New_Day17Question14sol.mp3",
      "solutionCode": "BEGIN TRANSACTION;\nUPDATE products\nSET    stock_qty = stock_qty - 10\nWHERE  product_id = 1;\nCOMMIT;",
      "tableScroll": false
    },
    {
      "id": 15,
      "title": "Transaction Rollback Recovery",
      "prompt": "Demonstrate atomic rollback safety: begin a transaction, execute a test delete removing all employees in department 10, and immediately roll back the transaction to preserve original data.",
      "starterSql": "-- Transaction safety with ROLLBACK\nBEGIN TRANSACTION;\nDELETE FROM employees\nWHERE  department_id = 10;\nROLLBACK;",
      "referenceSql": "BEGIN TRANSACTION; DELETE FROM employees WHERE department_id = 10; ROLLBACK;",
      "solutionAudio": "Day17/New_Day17Question15sol.mp3",
      "solutionCode": "BEGIN TRANSACTION;\nDELETE FROM employees\nWHERE  department_id = 10;\nROLLBACK;",
      "tableScroll": false
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Create a table called <code>feedback</code> with id (PK), comment (TEXT, NOT NULL), rating (INT, CHECK 1-5).", "ref": "CREATE TABLE feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT NOT NULL, rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5));" },
    { "id": 2, "prompt": "Insert a row into <code>employees</code>: first_name='John', last_name='Doe', salary=60000, department_id=10, is_active=1.", "ref": "INSERT INTO employees (first_name, last_name, salary, hire_date, job_title, email, department_id, is_active) VALUES ('John', 'Doe', 60000, '2023-01-01', 'Analyst', 'john.doe@example.com', 10, 1);" },
    { "id": 3, "prompt": "Update salary by 10% for all employees in department 20.", "ref": "UPDATE employees SET salary = salary * 1.10 WHERE department_id = 20;" },
    { "id": 4, "prompt": "Delete orders older than 2023-01-01 with status 'Cancelled'.", "ref": "DELETE FROM orders WHERE order_date < '2023-01-01' AND status = 'Cancelled';" },
    { "id": 5, "prompt": "Add a column <code>tags</code> (TEXT, DEFAULT 'none') to the <code>products</code> table.", "ref": "ALTER TABLE products ADD COLUMN tags TEXT DEFAULT 'none';" },
    { "id": 6, "prompt": "Create a table <code>audit_log</code> with id (PK), action (TEXT NOT NULL), logged_at (TEXT DEFAULT datetime('now')).", "ref": "CREATE TABLE audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL, logged_at TEXT DEFAULT (datetime('now')));" },
    { "id": 7, "prompt": "Insert 2 rows into <code>products</code>: ('Widget A', 5000, 3500, 1, 50) and ('Widget B', 7500, 5000, 2, 30) — (name, unit_price, cost_price, category_id, stock_qty).", "ref": "INSERT INTO products (name, unit_price, cost_price, category_id, stock_qty) VALUES ('Widget A', 5000, 3500, 1, 50), ('Widget B', 7500, 5000, 2, 30);" },
    { "id": 8, "prompt": "Set all products' stock_qty to 100 where stock_qty = 0.", "ref": "UPDATE products SET stock_qty = 100 WHERE stock_qty = 0;" },
    { "id": 9, "prompt": "DELETE all employees where is_active = 0.", "ref": "DELETE FROM employees WHERE is_active = 0;" },
    { "id": 10, "prompt": "Create an index on the orders table for faster lookups by customer_id.", "ref": "CREATE INDEX idx_orders_customer ON orders(customer_id);" },
    { "id": 11, "prompt": "Rename a column by adding a new column <code>full_name</code> to customers as a TEXT column.", "ref": "ALTER TABLE customers ADD COLUMN full_name TEXT;" },
    { "id": 12, "prompt": "Update a single employee's salary: set salary=90000 where employee_id=5.", "ref": "UPDATE employees SET salary = 90000 WHERE employee_id = 5;" },
    { "id": 13, "prompt": "Create a table <code>promo_codes</code> with code (TEXT UNIQUE NOT NULL, PRIMARY KEY), discount_pct (REAL CHECK 0-100), active (INTEGER DEFAULT 1).", "ref": "CREATE TABLE promo_codes (code TEXT PRIMARY KEY NOT NULL UNIQUE, discount_pct REAL CHECK(discount_pct BETWEEN 0 AND 100), active INTEGER DEFAULT 1);" },
    { "id": 14, "prompt": "Insert a new order: customer_id=1, order_date='2026-01-15', total_amount=50000, status='Processing'.", "ref": "INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES (1, '2026-01-15', 50000, 'Processing');" },
    { "id": 15, "prompt": "Delete all order_items for orders that have been Cancelled.", "ref": "DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE status = 'Cancelled');" },
    { "id": 16, "prompt": "Use a transaction to: (1) deduct 10 from stock_qty of product_id=1, and (2) insert into order_items.", "ref": "BEGIN TRANSACTION; UPDATE products SET stock_qty = stock_qty - 10 WHERE product_id = 1; INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (99, 1, 10, 5000); COMMIT;" },
    { "id": 17, "prompt": "Create a UNIQUE constraint: add unique index on employees(email).", "ref": "CREATE UNIQUE INDEX idx_emp_email ON employees(email);" },
    { "id": 18, "prompt": "Drop the table <code>temp_analytics</code> if it exists.", "ref": "DROP TABLE IF EXISTS temp_analytics;" },
    { "id": 19, "prompt": "Update all orders from customer_id=3 that are Processing to Shipped.", "ref": "UPDATE orders SET status = 'Shipped' WHERE customer_id = 3 AND status = 'Processing';" },
    { "id": 20, "prompt": "Insert a new category: name='Accessories' with parent_id=NULL.", "ref": "INSERT INTO categories (name, parent_id) VALUES ('Accessories', NULL);" },
    { "id": 21, "prompt": "Show the definition of all tables in the SQLite database.", "ref": "SELECT name, sql FROM sqlite_master WHERE type = 'table';" },
    { "id": 22, "prompt": "Create a <code>notifications</code> table: id PK, message TEXT NOT NULL, seen INTEGER DEFAULT 0, created_at TEXT DEFAULT datetime('now').", "ref": "CREATE TABLE notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL, seen INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')));" },
    { "id": 23, "prompt": "Use UPDATE to set commission=NULL for all employees in department 30.", "ref": "UPDATE employees SET commission = NULL WHERE department_id = 30;" },
    { "id": 24, "prompt": "Use ROLLBACK after a wrong DELETE to undo it (inside a transaction).", "ref": "BEGIN TRANSACTION; DELETE FROM employees WHERE department_id = 10; ROLLBACK;" },
    { "id": 25, "prompt": "Create table <code>shipping_rates</code>: region (TEXT PRIMARY KEY), rate_per_kg (REAL NOT NULL CHECK > 0), effective_date (TEXT NOT NULL).", "ref": "CREATE TABLE shipping_rates (region TEXT PRIMARY KEY, rate_per_kg REAL NOT NULL CHECK(rate_per_kg > 0), effective_date TEXT NOT NULL);" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: DDL, DML, Constraints & Transactions", "recordingKey": null }
  ]
};
