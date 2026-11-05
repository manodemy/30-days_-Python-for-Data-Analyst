// Day 06 — GROUP BY & HAVING: Grouping Rows, Post-Aggregation Filtering & Execution Order
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day06'] = {
  "day": 6,
  "title": "GROUP BY & HAVING Clauses",
  "db": "retail",
  "emoji": "🗃️",
  "slides": [
    {
      "title": "GROUP BY & HAVING — Aggregating by Categorical Groups",
      "duration": "8:45",
      "html": `<h2>🗃️ GROUP BY &amp; HAVING — Aggregating by Groups</h2>

        <!-- ── Section 01: GROUP BY — Bucketing Rows ── -->
        <div class="slide-section" id="day06GroupBySection">
          <h3 class="heading-with-audio" id="day06GroupBy">
            01. GROUP BY — Bucketing Rows into Groups
          </h3>
          <p>Standard SQL aggregates collapse all input rows into a single summary row. <code>GROUP BY</code> divides the dataset into discrete <strong>categorical buckets</strong> based on one or more columns. Aggregate functions then compute metrics <em>per bucket</em>.</p>
        </div>

        <div class="slide-section" id="day06GroupByExamplesSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">GROUP BY in Action</h4>
          </div>
          <div class="code-block-container" id="day06GroupByExamples">
            <div class="code-subblock" id="day06GroupByQuery1">
              <pre><code><span class="code-comment">-- 1. Headcount per department</span>
<span class="kw">SELECT</span> department_id,
       COUNT(*) <span class="kw">AS</span> headcount
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id;</code></pre>
            </div>
            <div class="code-subblock" id="day06GroupByQuery2">
              <pre><code><span class="code-comment">-- 2. Department compensation summary (total payroll &amp; average salary)</span>
<span class="kw">SELECT</span> department_id,
       SUM(salary) <span class="kw">AS</span> total_payroll,
       AVG(salary) <span class="kw">AS</span> avg_salary
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id
<span class="kw">ORDER BY</span> total_payroll <span class="kw">DESC</span>;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06BucketingVisualSection">
          <div class="db-mock-table-wrap" id="day06BucketingVisual">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">How GROUP BY Buckets &amp; Collapses Rows</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Department ID</th><th>Input Rows Collapsed</th><th>headcount: COUNT(*)</th><th>avg_salary: AVG(salary)</th></tr></thead>
              <tbody>
                <tr id="day06BucketRow1"><td><code>10 (Engineering)</code></td><td>3 employees (Amit, Siddharth, Rohit)</td><td><strong>3</strong></td><td>₹81,000</td></tr>
                <tr id="day06BucketRow2"><td><code>20 (Data Science)</code></td><td>4 employees (Priya, Sneha, Rahul, Devendra)</td><td><strong>4</strong></td><td>₹90,000</td></tr>
                <tr id="day06BucketRow3"><td><code>30 (Marketing)</code></td><td>2 employees (Vikram, Riya)</td><td><strong>2</strong></td><td>₹57,500</td></tr>
                <tr id="day06BucketRow4"><td><code>40 (Sales)</code></td><td>3 employees (Ananya, Neha, Aditi)</td><td><strong>3</strong></td><td>₹52,333</td></tr>
                <tr id="day06BucketRow5"><td><code>50 (HR)</code></td><td>2 employees (Karan, Pooja)</td><td><strong>2</strong></td><td>₹51,500</td></tr>
                <tr id="day06BucketRow6"><td><code>1 (Executive)</code></td><td>1 employee (Rajesh)</td><td><strong>1</strong></td><td>₹160,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day06GroupByRuleWarnSection">
          <div class="warn-box" id="day06GroupByRuleWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The Golden GROUP BY Rule:</strong>
            </div>
            <p style="margin: 0;">Any column in your <code>SELECT</code> list that is <strong>not enclosed inside an aggregate function</strong> (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, etc.) <strong>must appear in the GROUP BY clause</strong>. Violating this rule fails with <em>"non-aggregated column not in GROUP BY"</em> in standard SQL.</p>
          </div>
        </div>

        <!-- ── Section 02: GROUP BY Multiple Columns ── -->
        <div class="slide-section" id="day06MultiGroupSection">
          <h3 class="heading-with-audio" id="day06MultiGroup">
            02. GROUP BY Multiple Columns — Hierarchical Aggregation
          </h3>
          <p>Grouping by multiple columns creates one output row per <strong>unique combination</strong> of values across all specified columns. This enables multi-dimensional business segmentation.</p>
        </div>

        <div class="slide-section" id="day06MultiGroupExamplesSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Multi-Column Grouping Examples</h4>
          </div>
          <div class="code-block-container" id="day06MultiGroupExamples">
            <div class="code-subblock" id="day06MultiGroupQuery1">
              <pre><code><span class="code-comment">-- 1. Active vs Inactive headcount per department</span>
<span class="kw">SELECT</span> department_id,
       is_active,
       COUNT(*) <span class="kw">AS</span> employee_count
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id, is_active
<span class="kw">ORDER BY</span> department_id, is_active;</code></pre>
            </div>
            <div class="code-subblock" id="day06MultiGroupQuery2">
              <pre><code><span class="code-comment">-- 2. Customer order frequency &amp; spending per status</span>
<span class="kw">SELECT</span> customer_id,
       status,
       COUNT(*)          <span class="kw">AS</span> num_orders,
       AVG(total_amount) <span class="kw">AS</span> avg_order_val
<span class="kw">FROM</span>   orders
<span class="kw">GROUP BY</span> customer_id, status;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06MultiGroupInfoSection">
          <div class="info-box" id="day06MultiGroupInfo">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">💡 Cardinality Growth:</strong>
            </div>
            <p style="margin: 0;">Adding columns to <code>GROUP BY</code> increases result granularity. If table A has 6 departments and 2 active statuses, <code>GROUP BY department_id, is_active</code> produces up to 6 × 2 = 12 output groups.</p>
          </div>
        </div>

        <!-- ── Section 03: HAVING — Filtering Groups ── -->
        <div class="slide-section" id="day06HavingSection">
          <h3 class="heading-with-audio" id="day06Having">
            03. HAVING — Filtering Groups After Aggregation
          </h3>
          <p>The <code>HAVING</code> clause is a <strong>group-level filter</strong>. While <code>WHERE</code> filters individual candidate rows before grouping, <code>HAVING</code> filters aggregated summary groups after aggregation occurs.</p>
        </div>

        <div class="slide-section" id="day06HavingExamplesSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">HAVING in Action</h4>
          </div>
          <div class="code-block-container" id="day06HavingExamples">
            <div class="code-subblock" id="day06HavingQuery1">
              <pre><code><span class="code-comment">-- 1. Only departments with more than 2 employees</span>
<span class="kw">SELECT</span> department_id,
       COUNT(*) <span class="kw">AS</span> headcount
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id
<span class="kw">HAVING</span> COUNT(*) > 2;</code></pre>
            </div>
            <div class="code-subblock" id="day06HavingQuery2">
              <pre><code><span class="code-comment">-- 2. High-paying departments where average salary exceeds 70,000</span>
<span class="kw">SELECT</span> department_id,
       AVG(salary) <span class="kw">AS</span> avg_salary
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id
<span class="kw">HAVING</span> AVG(salary) > 70000
<span class="kw">ORDER BY</span> avg_salary <span class="kw">DESC</span>;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06HavingFilterTableSection">
          <div class="db-mock-table-wrap" id="day06HavingFilterTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">HAVING Filter Mechanics: COUNT(*) &gt; 2</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Department</th><th>Group Headcount</th><th>HAVING Condition</th><th>Filter Outcome</th></tr></thead>
              <tbody>
                <tr id="day06HavRow1"><td>Dept 10 (Engineering)</td><td>3</td><td>3 &gt; 2</td><td><strong style="color: #16a34a;">✅ Included</strong></td></tr>
                <tr id="day06HavRow2"><td>Dept 20 (Data Science)</td><td>4</td><td>4 &gt; 2</td><td><strong style="color: #16a34a;">✅ Included</strong></td></tr>
                <tr id="day06HavRow3"><td>Dept 30 (Marketing)</td><td>2</td><td>2 &gt; 2</td><td><strong style="color: #ef4444;">❌ Dropped</strong></td></tr>
                <tr id="day06HavRow4"><td>Dept 40 (Sales)</td><td>3</td><td>3 &gt; 2</td><td><strong style="color: #16a34a;">✅ Included</strong></td></tr>
                <tr id="day06HavRow5"><td>Dept 50 (HR)</td><td>2</td><td>2 &gt; 2</td><td><strong style="color: #ef4444;">❌ Dropped</strong></td></tr>
                <tr id="day06HavRow6"><td>Dept 1 (Executive)</td><td>1</td><td>1 &gt; 2</td><td><strong style="color: #ef4444;">❌ Dropped</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 04: WHERE vs HAVING ── -->
        <div class="slide-section" id="day06WhereVsHavingSection">
          <h3 class="heading-with-audio" id="day06WhereVsHaving">
            04. WHERE vs HAVING — The Critical Distinction
          </h3>
          <p>Choosing between <code>WHERE</code> and <code>HAVING</code> depends on <strong>when</strong> the filter executes and <strong>what</strong> it operates on:</p>

          <div class="vs-block" id="day06WhereVsHavingCards" style="margin-top: 10px;">
            <div class="vs-card" id="day06WhereCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">WHERE — Row Filter (Pre-Aggregation)</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; line-height: 1.5;">
                <li><strong>Timing:</strong> Step 2 — Evaluates BEFORE <code>GROUP BY</code></li>
                <li><strong>Operates on:</strong> Individual base table rows</li>
                <li><strong>Aggregates:</strong> ❌ Disallowed (causes syntax error)</li>
                <li><strong>Performance:</strong> High — leverages B-Tree indexes and reduces rows early</li>
              </ul>
            </div>
            <div class="vs-card" id="day06HavingCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color: #d97706;">HAVING — Group Filter (Post-Aggregation)</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; line-height: 1.5;">
                <li><strong>Timing:</strong> Step 4 — Evaluates AFTER <code>GROUP BY</code></li>
                <li><strong>Operates on:</strong> Aggregated summary groups</li>
                <li><strong>Aggregates:</strong> ✅ Allowed &amp; intended (e.g. <code>SUM &gt; 100k</code>)</li>
                <li><strong>Performance:</strong> Moderate — aggregates all groups before filtering</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06WhereVsHavingCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Side-by-Side Comparison</h4>
          </div>
          <div class="code-block-container" id="day06WhereVsHavingCode">
            <div class="code-subblock" id="day06WhereCode">
              <pre><code><span class="code-comment">-- WHERE: Discards inactive rows BEFORE calculating average</span>
<span class="kw">SELECT</span> department_id, AVG(salary)
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  is_active = 1
<span class="kw">GROUP BY</span> department_id;</code></pre>
            </div>
            <div class="code-subblock" id="day06HavingCode">
              <pre><code><span class="code-comment">-- HAVING: Computes average for ALL rows, then drops low-paying groups</span>
<span class="kw">SELECT</span> department_id, AVG(salary)
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id
<span class="kw">HAVING</span> AVG(salary) > 70000;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06WhereHavingProTipSection">
          <div class="pro-tip-box" id="day06WhereHavingProTip">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-warn); flex: 1;">💡 Golden Best Practice:</strong>
            </div>
            <p style="margin: 0;">Apply non-aggregate filters in <code>WHERE</code> whenever possible. Only use <code>HAVING</code> when testing aggregate function results. Combining both maximizes performance: <code>WHERE</code> shrinks the dataset upfront, and <code>HAVING</code> prunes the final summaries.</p>
          </div>
        </div>

        <!-- ── Section 05: Combining WHERE, GROUP BY & HAVING ── -->
        <div class="slide-section" id="day06CombineSection">
          <h3 class="heading-with-audio" id="day06Combine">
            05. Combining WHERE, GROUP BY &amp; HAVING in One Pipeline
          </h3>
          <p>Real-world analytical queries frequently combine row filtering, categorical aggregation, group filtering, and sorting into a unified query pipeline.</p>
        </div>

        <div class="slide-section" id="day06CombineCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Complete 6-Clause Query Flow</h4>
          </div>
          <div class="code-block-container" id="day06CombineCode">
            <div class="code-subblock" id="day06CombineQuery">
              <pre><code><span class="code-comment">-- Business Question: Which departments have more than 2 active</span>
<span class="code-comment">-- high-earning staff, and what is their average salary?</span>
<span class="kw">SELECT</span>   department_id,
         COUNT(*)    <span class="kw">AS</span> qualifying_staff,
         AVG(salary) <span class="kw">AS</span> avg_salary
<span class="kw">FROM</span>     employees
<span class="kw">WHERE</span>    is_active = 1 <span class="kw">AND</span> salary > 50000 <span class="code-comment">-- Step 2: Row filter</span>
<span class="kw">GROUP BY</span> department_id                     <span class="code-comment">-- Step 3: Bucket filtered rows</span>
<span class="kw">HAVING</span>   COUNT(*) >= 2                     <span class="code-comment">-- Step 4: Group filter on aggregate</span>
<span class="kw">ORDER BY</span> avg_salary <span class="kw">DESC</span>                   <span class="code-comment">-- Step 7: Sort final output</span>
<span class="kw">LIMIT</span>    5;                                <span class="code-comment">-- Step 8: Return top 5</span></code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day06AliasInHavingSection">
          <div class="interview-box" id="day06AliasInHaving">
            <h4 style="margin: 0 0 8px; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> Interview Insight: Can you use SELECT aliases in HAVING?
            </h4>
            <p style="margin: 0 0 6px; font-size: 0.85rem; line-height: 1.45;"><strong>Standard SQL Answer:</strong> <strong>No!</strong> <code>HAVING</code> is evaluated at Step 4, while <code>SELECT</code> creates column aliases at Step 5. Because aliases do not exist yet when <code>HAVING</code> executes, you must repeat the full aggregate expression: <code>HAVING COUNT(*) &gt;= 2</code>, not <code>HAVING qualifying_staff &gt;= 2</code>.</p>
            <p style="margin: 0; font-size: 0.82rem; color: #94a3b8;"><em>(Dialect note: MySQL allows aliases in HAVING as a non-standard convenience, but PostgreSQL, SQL Server, Oracle, and SQLite strictly reject them.)</em></p>
          </div>
        </div>

        <!-- ── Section 06: SQL Logical Execution Order ── -->
        <div class="slide-section" id="day06ExecOrderSection">
          <h3 class="heading-with-audio" id="day06ExecOrder">
            06. SQL Logical Execution Order — Complete 8-Step Pipeline
          </h3>
          <p>SQL is a declarative language written in one order (<code>SELECT ... FROM ... WHERE</code>) but executed by database engines in a strict logical sequence:</p>
        </div>

        <div class="slide-section" id="day06ExecPipelineVisualSection">
          <div class="db-mock-table-wrap" id="day06ExecPipelineVisual">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">The 8-Step Logical Execution Hierarchy</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Step</th><th>Clause</th><th>Phase</th><th>What Happens Here?</th></tr></thead>
              <tbody>
                <tr id="day06ExecStep1"><td style="font-weight: 700; color:var(--ink-info);">Step 1</td><td><code>FROM &amp; JOIN</code></td><td>Source</td><td>Identify source tables and evaluate join predicates</td></tr>
                <tr id="day06ExecStep2"><td style="font-weight: 700; color:var(--ink-info);">Step 2</td><td><code>WHERE</code></td><td>Filter Rows</td><td>Discard non-matching candidate rows before aggregation</td></tr>
                <tr id="day06ExecStep3"><td style="font-weight: 700; color: #e11d48; background: rgba(225,29,72,0.06);">Step 3</td><td><strong style="color: #e11d48;">GROUP BY</strong></td><td>Bucket</td><td>Partition remaining rows into categorical groups</td></tr>
                <tr id="day06ExecStep4"><td style="font-weight: 700; color: #e11d48; background: rgba(225,29,72,0.06);">Step 4</td><td><strong style="color: #e11d48;">HAVING</strong></td><td>Filter Groups</td><td>Discard aggregated groups based on aggregate conditions</td></tr>
                <tr id="day06ExecStep5"><td style="font-weight: 700; color:var(--ink-info);">Step 5</td><td><code>SELECT</code></td><td>Project</td><td>Evaluate expressions, scalar calculations, and column aliases</td></tr>
                <tr id="day06ExecStep6"><td style="font-weight: 700; color:var(--ink-info);">Step 6</td><td><code>DISTINCT</code></td><td>Deduplicate</td><td>Remove duplicate projected rows from the output</td></tr>
                <tr id="day06ExecStep7"><td style="font-weight: 700; color:var(--ink-info);">Step 7</td><td><code>ORDER BY</code></td><td>Sort</td><td>Sort the final result set (aliases from SELECT are valid here!)</td></tr>
                <tr id="day06ExecStep8"><td style="font-weight: 700; color:var(--ink-info);">Step 8</td><td><code>LIMIT / OFFSET</code></td><td>Slice</td><td>Restrict output row count and skip initial rows</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day06ExecOrderTipSection">
          <div class="info-box" id="day06ExecOrderTip">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">💡 Why Aliases Work in ORDER BY but Not WHERE:</strong>
            </div>
            <p style="margin: 0;">Because <code>ORDER BY</code> runs at Step 7 (<em>after</em> Step 5 <code>SELECT</code>), it can reference column aliases like <code>avg_salary</code>. But <code>WHERE</code> and <code>HAVING</code> run at Steps 2 and 4 (<em>before</em> <code>SELECT</code>), so aliases do not exist yet.</p>
          </div>
        </div>

        <!-- ── Section 07: Top 25 Interview Q&A ── -->
        <div class="slide-section" id="day06QASection">
          <div class="interview-box">
            <h4 id="day06QAHeading" style="margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> Top 25 SQL Interview Q&amp;A — GROUP BY &amp; HAVING
            </h4>

            <div id="day06QA1">
              <p><strong>Q1: What is the primary purpose of the GROUP BY clause?</strong></p>
              <p><em>A: GROUP BY partitions dataset rows into summary groups based on identical values in one or more specified columns. Aggregate functions (SUM, AVG, COUNT, etc.) are then evaluated per group rather than across the whole table.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA2">
              <p><strong>Q2: What is the "Golden Rule" of GROUP BY?</strong></p>
              <p><em>A: Every column in the SELECT clause must either be explicitly listed in the GROUP BY clause or enclosed within an aggregate function. Selecting a unaggregated column not in GROUP BY violates the relational model.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA3">
              <p><strong>Q3: What is the difference between WHERE and HAVING?</strong></p>
              <p><em>A: WHERE filters individual rows before grouping (Step 2) and cannot use aggregate functions. HAVING filters aggregated groups after grouping (Step 4) and is specifically designed to filter on aggregate results.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA4">
              <p><strong>Q4: Can you use a HAVING clause without a GROUP BY clause?</strong></p>
              <p><em>A: Yes! When HAVING is used without GROUP BY, the entire table is treated as a single group. For example, SELECT AVG(salary) FROM employees HAVING AVG(salary) &gt; 50000; returns the company average if it exceeds 50000, or an empty set otherwise.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA5">
              <p><strong>Q5: Can you reference column aliases defined in SELECT inside the HAVING clause?</strong></p>
              <p><em>A: In standard SQL, no. HAVING executes at Step 4, before SELECT executes at Step 5. Therefore, column aliases do not yet exist when HAVING is evaluated. You must repeat the aggregate expression (e.g. HAVING COUNT(*) &gt; 2).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA6">
              <p><strong>Q6: How does GROUP BY handle NULL values?</strong></p>
              <p><em>A: Standard SQL treats all NULL values in the grouping column as identical, grouping them together into a single NULL bucket.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA7">
              <p><strong>Q7: Why does SELECT department_id, salary FROM employees GROUP BY department_id fail in PostgreSQL/Oracle?</strong></p>
              <p><em>A: Because each department_id group contains multiple distinct salary rows. The database cannot determine which single salary value to return for that group without an aggregate function like AVG, MIN, or MAX.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA8">
              <p><strong>Q8: What is multi-column grouping and how does it determine output rows?</strong></p>
              <p><em>A: GROUP BY colA, colB groups rows by unique pairs of (colA, colB). If colA has 3 values and colB has 4 values, up to 12 distinct summary groups can be produced.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA9">
              <p><strong>Q9: Why is WHERE preferred over HAVING for non-aggregate conditions?</strong></p>
              <p><em>A: WHERE filters rows before aggregation, dramatically reducing the volume of data that must be sorted or hashed in memory. HAVING operates after all groups are formed, doing redundant aggregation work.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA10">
              <p><strong>Q10: Walk through SQL's 8-step logical execution order.</strong></p>
              <p><em>A: 1. FROM &amp; JOIN, 2. WHERE, 3. GROUP BY, 4. HAVING, 5. SELECT, 6. DISTINCT, 7. ORDER BY, 8. LIMIT / OFFSET.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA11">
              <p><strong>Q11: Can you group by expressions rather than raw columns?</strong></p>
              <p><em>A: Yes! You can group by scalar expressions, such as GROUP BY strftime('%Y', order_date), GROUP BY UPPER(country), or GROUP BY CASE WHEN salary &gt; 80000 THEN 'High' ELSE 'Low' END.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA12">
              <p><strong>Q12: Is grouping by ordinal column numbers (e.g. GROUP BY 1, 2) good practice?</strong></p>
              <p><em>A: While supported in SQLite and PostgreSQL for rapid prototyping, it is considered bad practice in production code because altering column positions in SELECT silently alters grouping logic, causing severe bugs.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA13">
              <p><strong>Q13: What happens when you GROUP BY a table's Primary Key?</strong></p>
              <p><em>A: Every row is unique, so every group contains exactly one row. Standard SQL engines (like PostgreSQL 9.1+) recognize that any other column from that table is functionally dependent on the PK and permit selecting other columns without wrapping them in aggregates.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA14">
              <p><strong>Q14: What are GROUPING SETS, ROLLUP, and CUBE?</strong></p>
              <p><em>A: Extensions to standard GROUP BY: ROLLUP produces hierarchical subtotals and grand totals. CUBE produces all 2^N dimensional combinations of subtotals. GROUPING SETS specifies exact combinations to aggregate in a single query.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA15">
              <p><strong>Q15: How does MySQL's ONLY_FULL_GROUP_BY mode affect query execution?</strong></p>
              <p><em>A: When enabled (default in MySQL 5.7+), MySQL enforces standard SQL and rejects queries selecting non-aggregated columns missing from GROUP BY. When disabled, it returns arbitrary values from one row in the group.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA16">
              <p><strong>Q16: Can you place subqueries inside a HAVING clause?</strong></p>
              <p><em>A: Yes. You can compare an aggregate to a subquery: HAVING AVG(salary) &gt; (SELECT AVG(salary) FROM employees) filters for departments whose average salary beats the company-wide average.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA17">
              <p><strong>Q17: What is the difference between COUNT(*) and COUNT(col) in a grouped query?</strong></p>
              <p><em>A: COUNT(*) returns the total count of rows within each group. COUNT(col) counts only rows where that specific column is non-NULL within each group.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA18">
              <p><strong>Q18: How do database engines execute GROUP BY internally?</strong></p>
              <p><em>A: Primarily two methods: Hash Aggregation (builds an in-memory hash table of keys and running aggregate accumulators; best for unsorted data) and Sort/Stream Aggregation (sorts rows by group keys then streams through rows; best when a matching index already exists).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA19">
              <p><strong>Q19: How do B-Tree indexes speed up GROUP BY queries?</strong></p>
              <p><em>A: An index on the grouping column allows the engine to perform a sorted Index Scan, eliminating expensive in-memory sort or hash operations. A covering composite index on (group_col, agg_col) enables an index-only scan with zero table access.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA20">
              <p><strong>Q20: Can you use Window Functions inside a GROUP BY clause?</strong></p>
              <p><em>A: No. Window functions are evaluated after GROUP BY and HAVING. Placing a window function in GROUP BY or HAVING causes a syntax error. To filter by window function results, wrap the query in a CTE or subquery.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA21">
              <p><strong>Q21: Can you filter groups by comparing two aggregate expressions in HAVING?</strong></p>
              <p><em>A: Yes! For example, HAVING SUM(unit_price * qty) &gt; SUM(cost_price * qty) filters for product orders where gross revenue exceeds cost.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA22">
              <p><strong>Q22: Is SELECT DISTINCT col equivalent to SELECT col GROUP BY col?</strong></p>
              <p><em>A: In terms of output rows, yes: both produce the set of distinct values in col. However, DISTINCT communicates intent to deduplicate, whereas GROUP BY is designed for evaluating aggregate functions per distinct value.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA23">
              <p><strong>Q23: How does conditional aggregation with CASE WHEN replace multiple GROUP BY queries?</strong></p>
              <p><em>A: By placing CASE expressions inside aggregates: SUM(CASE WHEN status = 'Shipped' THEN 1 ELSE 0 END) AS shipped_count. This pivots multiple category metrics into columns in a single scan of the table.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA24">
              <p><strong>Q24: What happens if all values in a group are NULL for SUM() or AVG()?</strong></p>
              <p><em>A: Both SUM and AVG evaluate to NULL for that group. COUNT(*) returns the number of physical rows, while COUNT(col) returns 0.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day06QA25">
              <p><strong>Q25: What are top strategies for optimizing slow GROUP BY queries on multi-million row tables?</strong></p>
              <p><em>A: 1. Push selective filters into WHERE to shrink row counts before grouping. 2. Create composite covering indexes matching (where_cols, group_cols, agg_cols). 3. Pre-aggregate data using Materialized Views or summary roll-up tables for real-time dashboards.</em></p>
            </div>
          </div>
        </div>`
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>[Easy] Department Headcount Audit</strong><br/>HR leadership needs a headcount breakdown across all business divisions. Write a query from <code>employees</code> that returns each <code>department_id</code> and the total number of staff in that department aliased as <code>headcount</code>.",
      "referenceSql": "SELECT department_id,\n       COUNT(*) AS headcount\nFROM   employees\nGROUP BY department_id;",
      "questionAudio": "Day06/New_Day6Question01.mp3",
      "solutionAudio": "Day06/New_Day6Question01sol.mp3"
    },
    {
      "id": 2,
      "prompt": "<strong>[Easy] Department Compensation &amp; Average Salary</strong><br/>Finance is reviewing organizational salary distributions. Return <code>department_id</code>, total salary expenditure aliased as <code>total_payroll</code>, and the average salary aliased as <code>avg_salary</code> for each department from <code>employees</code>. Sort by <code>total_payroll</code> descending.",
      "referenceSql": "SELECT department_id,\n       SUM(salary) AS total_payroll,\n       AVG(salary) AS avg_salary\nFROM   employees\nGROUP BY department_id\nORDER BY total_payroll DESC;",
      "questionAudio": "Day06/New_Day6Question02.mp3",
      "solutionAudio": "Day06/New_Day6Question02sol.mp3"
    },
    {
      "id": 3,
      "prompt": "<strong>[Easy] Order Fulfillment Pipeline Summary</strong><br/>Operations needs to track transaction stages. From <code>orders</code>, calculate the total number of orders (<code>order_count</code>) and the gross monetary sum (<code>total_revenue</code>) grouped by order <code>status</code>.",
      "referenceSql": "SELECT status,\n       COUNT(*) AS order_count,\n       SUM(total_amount) AS total_revenue\nFROM   orders\nGROUP BY status;",
      "questionAudio": "Day06/New_Day6Question03.mp3",
      "solutionAudio": "Day06/New_Day6Question03sol.mp3"
    },
    {
      "id": 4,
      "prompt": "<strong>[Easy] Product Catalog Category Summary</strong><br/>Merchandising wants an overview of catalog coverage. From <code>products</code>, return the <code>category_id</code>, total number of distinct products (<code>product_count</code>), and average price (<code>avg_price</code>) for each category.",
      "referenceSql": "SELECT category_id,\n       COUNT(*) AS product_count,\n       AVG(unit_price) AS avg_price\nFROM   products\nGROUP BY category_id;",
      "questionAudio": "Day06/New_Day6Question04.mp3",
      "solutionAudio": "Day06/New_Day6Question04sol.mp3"
    },
    {
      "id": 5,
      "prompt": "<strong>[Medium] Filter Large Divisions with HAVING</strong><br/>Find departments that have more than 2 employees. Return <code>department_id</code> and the employee count aliased as <code>headcount</code> using <code>HAVING</code>.",
      "referenceSql": "SELECT department_id,\n       COUNT(*) AS headcount\nFROM   employees\nGROUP BY department_id\nHAVING COUNT(*) > 2;",
      "questionAudio": "Day06/New_Day6Question05.mp3",
      "solutionAudio": "Day06/New_Day6Question05sol.mp3"
    },
    {
      "id": 6,
      "prompt": "<strong>[Medium] High-Compensation Departments</strong><br/>Identify executive and senior divisions where the average departmental compensation exceeds ₹70,000. Return <code>department_id</code> and <code>avg_salary</code>, ordered by <code>avg_salary</code> descending.",
      "referenceSql": "SELECT department_id,\n       AVG(salary) AS avg_salary\nFROM   employees\nGROUP BY department_id\nHAVING AVG(salary) > 70000\nORDER BY avg_salary DESC;",
      "questionAudio": "Day06/New_Day6Question06.mp3",
      "solutionAudio": "Day06/New_Day6Question06sol.mp3"
    },
    {
      "id": 7,
      "prompt": "<strong>[Medium] Multi-Column Grouping: Division &amp; Status</strong><br/>HR needs an active versus inactive headcount matrix. Group <code>employees</code> by both <code>department_id</code> and <code>is_active</code>, returning <code>employee_count</code> for each combination. Sort by <code>department_id</code> and <code>is_active</code>.",
      "referenceSql": "SELECT department_id,\n       is_active,\n       COUNT(*) AS employee_count\nFROM   employees\nGROUP BY department_id, is_active\nORDER BY department_id, is_active;",
      "questionAudio": "Day06/New_Day6Question07.mp3",
      "solutionAudio": "Day06/New_Day6Question07sol.mp3"
    },
    {
      "id": 8,
      "prompt": "<strong>[Medium] Combining WHERE and HAVING</strong><br/>Focusing <em>only on active employees</em> (<code>is_active = 1</code>), find departments that maintain 2 or more active personnel. Return <code>department_id</code>, <code>active_headcount</code>, and <code>avg_salary</code>.",
      "referenceSql": "SELECT department_id,\n       COUNT(*) AS active_headcount,\n       AVG(salary) AS avg_salary\nFROM   employees\nWHERE  is_active = 1\nGROUP BY department_id\nHAVING COUNT(*) >= 2;",
      "questionAudio": "Day06/New_Day6Question08.mp3",
      "solutionAudio": "Day06/New_Day6Question08sol.mp3"
    },
    {
      "id": 9,
      "prompt": "<strong>[Medium] Item Sales Volume Leaderboard</strong><br/>Supply chain requires unit turnover metrics. From <code>order_items</code>, calculate the total quantity sold (<code>total_qty_sold</code>) per <code>product_id</code>. Order results by <code>total_qty_sold</code> descending.",
      "referenceSql": "SELECT product_id,\n       SUM(qty) AS total_qty_sold\nFROM   order_items\nGROUP BY product_id\nORDER BY total_qty_sold DESC;",
      "questionAudio": "Day06/New_Day6Question09.mp3",
      "solutionAudio": "Day06/New_Day6Question09sol.mp3"
    },
    {
      "id": 10,
      "prompt": "<strong>[Medium] Repeat Customer Segmentation</strong><br/>Marketing wants to identify returning customers. From <code>orders</code>, find <code>customer_id</code>s who have placed more than 1 order. Return <code>customer_id</code> and <code>order_count</code>.",
      "referenceSql": "SELECT customer_id,\n       COUNT(*) AS order_count\nFROM   orders\nGROUP BY customer_id\nHAVING COUNT(*) > 1;",
      "questionAudio": "Day06/New_Day6Question10.mp3",
      "solutionAudio": "Day06/New_Day6Question10sol.mp3"
    },
    {
      "id": 11,
      "prompt": "<strong>[Hard] Premium Catalog Categories</strong><br/>Identify luxury tiers in product merchandising. Group <code>products</code> by <code>category_id</code> and filter for categories where the average product price exceeds ₹5,000. Return <code>category_id</code>, <code>product_count</code>, and <code>avg_price</code>.",
      "referenceSql": "SELECT category_id,\n       COUNT(*) AS product_count,\n       AVG(unit_price) AS avg_price\nFROM   products\nGROUP BY category_id\nHAVING AVG(unit_price) > 5000;",
      "questionAudio": "Day06/New_Day6Question11.mp3",
      "solutionAudio": "Day06/New_Day6Question11sol.mp3"
    },
    {
      "id": 12,
      "prompt": "<strong>[Hard] Annual Sales &amp; Transaction Growth</strong><br/>Executive leadership needs an annual revenue report. Extract the calendar year from <code>order_date</code> using SQLite's <code>strftime('%Y', order_date)</code> aliased as <code>order_year</code>. Return <code>order_year</code>, <code>total_orders</code>, and <code>total_revenue</code> grouped by year.",
      "referenceSql": "SELECT strftime('%Y', order_date) AS order_year,\n       COUNT(*) AS total_orders,\n       SUM(total_amount) AS total_revenue\nFROM   orders\nGROUP BY order_year;",
      "questionAudio": "Day06/New_Day6Question12.mp3",
      "solutionAudio": "Day06/New_Day6Question12sol.mp3"
    },
    {
      "id": 13,
      "prompt": "<strong>[Hard] High-Payroll Department Filter</strong><br/>Treasury wants to flag divisions with aggregate salary commitments exceeding ₹200,000. Return <code>department_id</code> and <code>total_payroll</code> using <code>HAVING</code>, sorted with highest payroll first.",
      "referenceSql": "SELECT department_id,\n       SUM(salary) AS total_payroll\nFROM   employees\nGROUP BY department_id\nHAVING SUM(salary) > 200000\nORDER BY total_payroll DESC;",
      "questionAudio": "Day06/New_Day6Question13.mp3",
      "solutionAudio": "Day06/New_Day6Question13sol.mp3"
    },
    {
      "id": 14,
      "prompt": "<strong>[Hard] Top Regional Market</strong><br/>Growth marketing wants to know which geographic region has the single highest number of customers. Group <code>customers</code> by <code>region</code>, calculate <code>customer_count</code>, sort descending, and return only the top region using <code>LIMIT 1</code>.",
      "referenceSql": "SELECT region,\n       COUNT(*) AS customer_count\nFROM   customers\nGROUP BY region\nORDER BY customer_count DESC\nLIMIT 1;",
      "questionAudio": "Day06/New_Day6Question14.mp3",
      "solutionAudio": "Day06/New_Day6Question14sol.mp3"
    },
    {
      "id": 15,
      "prompt": "<strong>[Hard] Multi-Column Grouping with Agg Filter</strong><br/>Fraud prevention and fulfillment audit: Group <code>orders</code> by both <code>customer_id</code> and <code>status</code>, and return pairs where the customer has placed more than 1 order in that specific status. Return <code>customer_id</code>, <code>status</code>, <code>order_count</code>, and <code>total_amount</code> (sum of order amounts).",
      "referenceSql": "SELECT customer_id,\n       status,\n       COUNT(*) AS order_count,\n       SUM(total_amount) AS total_amount\nFROM   orders\nGROUP BY customer_id, status\nHAVING COUNT(*) > 1;",
      "questionAudio": "Day06/New_Day6Question15.mp3",
      "solutionAudio": "Day06/New_Day6Question15sol.mp3"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Count the number of employees in each department.", "ref": "SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id;" },
    { "id": 2, "prompt": "Find the average salary per department.", "ref": "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id;" },
    { "id": 3, "prompt": "Find the total <code>total_amount</code> per order status.", "ref": "SELECT status, SUM(total_amount) AS total FROM orders GROUP BY status;" },
    { "id": 4, "prompt": "Find departments with more than 2 employees.", "ref": "SELECT department_id, COUNT(*) AS cnt FROM employees GROUP BY department_id HAVING COUNT(*) > 2;" },
    { "id": 5, "prompt": "Find the average salary per department, only for departments with average salary above 60000.", "ref": "SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id HAVING AVG(salary) > 60000;" },
    { "id": 6, "prompt": "Count active vs inactive employees per department.", "ref": "SELECT department_id, is_active, COUNT(*) AS cnt FROM employees GROUP BY department_id, is_active;" },
    { "id": 7, "prompt": "Find the total <code>qty</code> sold per <code>product_id</code> from <code>order_items</code>.", "ref": "SELECT product_id, SUM(qty) AS total_sold FROM order_items GROUP BY product_id;" },
    { "id": 8, "prompt": "Find customers who have placed more than 1 order.", "ref": "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;" },
    { "id": 9, "prompt": "Find the maximum <code>total_amount</code> per customer.", "ref": "SELECT customer_id, MAX(total_amount) AS max_order FROM orders GROUP BY customer_id;" },
    { "id": 10, "prompt": "Count the number of products per <code>category_id</code>.", "ref": "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;" },
    { "id": 11, "prompt": "Find the total payroll for active employees per department.", "ref": "SELECT department_id, SUM(salary) AS payroll FROM employees WHERE is_active = 1 GROUP BY department_id;" },
    { "id": 12, "prompt": "Find the number of orders per customer, only for customers with 2 or more orders.", "ref": "SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2;" },
    { "id": 13, "prompt": "Find the minimum and maximum salary per department.", "ref": "SELECT department_id, MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM employees GROUP BY department_id;" },
    { "id": 14, "prompt": "Find average unit_price per category_id from products.", "ref": "SELECT category_id, AVG(unit_price) AS avg_price FROM products GROUP BY category_id;" },
    { "id": 15, "prompt": "Find total revenue per year from orders (extract year from order_date using strftime).", "ref": "SELECT strftime('%Y', order_date) AS year, SUM(total_amount) AS revenue FROM orders GROUP BY year;" },
    { "id": 16, "prompt": "Find departments where total payroll exceeds 200000.", "ref": "SELECT department_id, SUM(salary) AS payroll FROM employees GROUP BY department_id HAVING SUM(salary) > 200000;" },
    { "id": 17, "prompt": "Find the total qty sold per product from order_items, only for products with total qty > 2.", "ref": "SELECT product_id, SUM(qty) AS total_qty FROM order_items GROUP BY product_id HAVING SUM(qty) > 2;" },
    { "id": 18, "prompt": "Find average commission per department (ignoring NULLs).", "ref": "SELECT department_id, AVG(commission) AS avg_commission FROM employees GROUP BY department_id;" },
    { "id": 19, "prompt": "Count customers per region.", "ref": "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;" },
    { "id": 20, "prompt": "Find region with the most customers.", "ref": "SELECT region, COUNT(*) AS cnt FROM customers GROUP BY region ORDER BY cnt DESC LIMIT 1;" },
    { "id": 21, "prompt": "Find product categories where average unit_price exceeds 5000.", "ref": "SELECT category_id, AVG(unit_price) AS avg_price FROM products GROUP BY category_id HAVING AVG(unit_price) > 5000;" },
    { "id": 22, "prompt": "Group orders by status and find the average total_amount per status.", "ref": "SELECT status, AVG(total_amount) AS avg_amount FROM orders GROUP BY status;" },
    { "id": 23, "prompt": "Find which department has the highest average salary.", "ref": "SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ORDER BY avg_sal DESC LIMIT 1;" },
    { "id": 24, "prompt": "Count orders grouped by customer_id and status.", "ref": "SELECT customer_id, status, COUNT(*) AS cnt FROM orders GROUP BY customer_id, status;" },
    { "id": 25, "prompt": "Find the total stock quantity per category_id from products, only for categories with total stock above 100.", "ref": "SELECT category_id, SUM(stock_qty) AS total_stock FROM products GROUP BY category_id HAVING SUM(stock_qty) > 100;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: GROUP BY & HAVING", "recordingKey": null }
  ]
};
