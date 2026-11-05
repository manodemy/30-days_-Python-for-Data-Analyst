// Day 16 — Window Functions II: Analytic (LAG, LEAD, SUM OVER, AVG OVER, FIRST/LAST VALUE)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day16'] = {
  "day": 16,
  "title": "Analytic Functions: LAG & LEAD",
  "db": "retail",
  "emoji": "📈",
  "slides": [
    {
      "title": "Window Functions II — Analytic Functions",
      "duration": "11:11",
      "html": `<h2>📈 Window Functions II — Analytic (LAG, LEAD, Cumulative Totals &amp; Frames)</h2>

        <!-- ── Section 01: Running Totals ── -->
        <div class="slide-section" id="day16Overview">
          <h3 class="heading-with-audio" id="runningTotalsSection">
            01. Running Totals with SUM() OVER
          </h3>
          <p>Using <code>SUM()</code> with an <code>OVER(ORDER BY ...)</code> clause creates a <strong>running total (cumulative sum)</strong> — each row displays the sum accumulated from the start of the partition up to the current row without collapsing rows.</p>
        </div>

        <div class="slide-section" id="runningTotalsCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 1 — Global &amp; Partitioned Cumulative Totals</h4>
          </div>
          <div class="code-block-container" id="runningTotalsCode">
            <div class="code-subblock" id="runningTotalsQuery1">
              <pre><code><span class="code-comment">-- 1. Global Running Total across all orders over time</span>
<span class="kw">SELECT</span> order_id,
       order_date,
       total_amount,
       <span class="kw">SUM</span>(total_amount) <span class="kw">OVER</span> (
         <span class="kw">ORDER BY</span> order_date, order_id
       ) <span class="kw">AS</span> running_total
<span class="kw">FROM</span>   orders;

<span class="code-comment">-- 2. Running total WITHIN each customer (resets per customer)</span>
<span class="kw">SELECT</span> customer_id,
       order_id,
       order_date,
       total_amount,
       <span class="kw">SUM</span>(total_amount) <span class="kw">OVER</span> (
         <span class="kw">PARTITION BY</span> customer_id
         <span class="kw">ORDER BY</span> order_date, order_id
       ) <span class="kw">AS</span> customer_running_total
<span class="kw">FROM</span>   orders
<span class="kw">ORDER BY</span> customer_id, order_date;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 02: Window Frame Clause ── -->
        <div class="slide-section" id="windowFrameBoundariesSection">
          <h3 class="heading-with-audio" id="windowFrameBoundaries">
            02. The Window Frame Clause — ROWS vs RANGE
          </h3>
          <p>A window frame specifies exactly which rows within the partition are included in the calculation relative to the current row.</p>
        </div>

        <div class="slide-section" id="frameBoundariesTableSection">
          <div class="db-mock-table-wrap" id="frameBoundariesTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Frame Boundary Keywords Reference</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Boundary Keyword</th><th>Meaning in Frame</th><th>Common Context</th></tr></thead>
              <tbody>
                <tr id="day16Frame1"><td><code>UNBOUNDED PRECEDING</code></td><td>Start from the very first row of partition</td><td>Cumulative sums &amp; running totals</td></tr>
                <tr id="day16Frame2"><td><code>N PRECEDING</code></td><td>Start/End N physical rows prior to current row</td><td>Rolling windows (e.g. 7-day moving avg)</td></tr>
                <tr id="day16Frame3"><td><code>CURRENT ROW</code></td><td>The row currently being evaluated</td><td>Running total stop point</td></tr>
                <tr id="day16Frame4"><td><code>N FOLLOWING</code></td><td>Start/End N physical rows ahead of current row</td><td>Centered moving averages</td></tr>
                <tr id="day16Frame5"><td><code>UNBOUNDED FOLLOWING</code></td><td>Extend all the way to last row of partition</td><td>Required for <code>LAST_VALUE()</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="rowsVsRangeVsSection">
          <div class="vs-block" style="margin-top: 8px;">
            <div class="vs-card" id="day16RowsCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">ROWS (Physical Offsets)</h4>
              <p style="margin-bottom: 8px;">Operates on <strong>exact physical row counts</strong> regardless of duplicate values.</p>
              <pre><code><span class="kw">ROWS BETWEEN</span> 2 <span class="kw">PRECEDING AND CURRENT ROW</span></code></pre>
            </div>
            <div class="vs-card" id="day16RangeCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">RANGE (Logical Value Peers)</h4>
              <p style="margin-bottom: 8px;">Operates on <strong>value duplicates (peers)</strong>. Ties in ORDER BY are treated together!</p>
              <pre><code><span class="kw">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span></code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="defaultFrameWarnSection">
          <div class="warn-box" id="defaultFrameWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The Default Frame Trap:</strong>
            </div>
            <p style="margin: 0;">When <code>ORDER BY</code> is present without an explicit frame, SQL defaults to <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. If multiple rows share identical dates or timestamps, <code>RANGE</code> groups them as peers and sums them all at once. Always declare <code>ROWS BETWEEN ...</code> for strictly consecutive running calculations.</p>
          </div>
        </div>

        <!-- ── Section 03: Moving Averages ── -->
        <div class="slide-section" id="movingAveragesSection">
          <h3 class="heading-with-audio" id="day16MovingAvgHeading">
            03. Moving Averages &amp; Rolling Windows
          </h3>
          <p>Moving averages smooth out short-term fluctuations and highlight longer-term trends in financial, revenue, and transactional data.</p>
        </div>

        <div class="slide-section" id="movingAveragesCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 2 — 3-Row Rolling Average</h4>
          </div>
          <div class="code-block-container" id="day16MovingAveragesCode">
            <div class="code-subblock" id="movingAveragesQuery1">
              <pre><code><span class="code-comment">-- 3-row moving average (current row + 2 previous rows)</span>
<span class="kw">SELECT</span> order_id,
       order_date,
       total_amount,
       <span class="kw">ROUND</span>(<span class="kw">AVG</span>(total_amount) <span class="kw">OVER</span> (
         <span class="kw">ORDER BY</span> order_date, order_id
         <span class="kw">ROWS BETWEEN</span> 2 <span class="kw">PRECEDING AND CURRENT ROW</span>
       ), 2) <span class="kw">AS</span> moving_avg_3
<span class="kw">FROM</span>   orders;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 04: LAG() and LEAD() ── -->
        <div class="slide-section" id="lagLeadSection">
          <h3 class="heading-with-audio" id="day16LagLeadHeading">
            04. LAG() &amp; LEAD() — Accessing Adjacent Rows
          </h3>
          <p><code>LAG(column, offset, default)</code> accesses values from preceding rows. <code>LEAD(column, offset, default)</code> accesses values from succeeding rows. This completely eliminates expensive self-joins for delta tracking.</p>
        </div>

        <div class="slide-section" id="lagLeadSyntaxTableSection">
          <div class="db-mock-table-wrap" id="lagLeadSyntaxTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">LAG &amp; LEAD Parameter Reference</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr id="day16Param1"><td><code>column</code></td><td>Any column / expr</td><td>Required</td><td>The target column whose value is retrieved</td></tr>
                <tr id="day16Param2"><td><code>offset</code></td><td>Positive integer</td><td>1</td><td>How many rows back (LAG) or forward (LEAD) to look</td></tr>
                <tr id="day16Param3"><td><code>default_value</code></td><td>Scalar literal</td><td>NULL</td><td>Fallback value when offset falls beyond window boundaries</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="lagLeadCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 3 — Order-to-Order Spending Deltas</h4>
          </div>
          <div class="code-block-container" id="lagLeadCode">
            <div class="code-subblock" id="lagLeadQuery1">
              <pre><code><span class="code-comment">-- Compare current order with the immediate PREVIOUS order</span>
<span class="kw">SELECT</span> order_id,
       order_date,
       total_amount,
       <span class="kw">LAG</span>(total_amount, 1, 0) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> order_date, order_id) <span class="kw">AS</span> prev_amount,
       total_amount - <span class="kw">LAG</span>(total_amount, 1, total_amount) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> order_date, order_id) <span class="kw">AS</span> delta
<span class="kw">FROM</span>   orders;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="leadIntervalCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Predicting Intervals with LEAD</h4>
          </div>
          <div class="code-block-container" id="leadIntervalCode">
            <div class="code-subblock" id="leadIntervalQuery1">
              <pre><code><span class="code-comment">-- Look AHEAD to find customer's next order date</span>
<span class="kw">SELECT</span> customer_id,
       order_id,
       order_date,
       <span class="kw">LEAD</span>(order_date) <span class="kw">OVER</span> (
         <span class="kw">PARTITION BY</span> customer_id <span class="kw">ORDER BY</span> order_date, order_id
       ) <span class="kw">AS</span> next_order_date
<span class="kw">FROM</span>   orders;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 05: FIRST_VALUE & LAST_VALUE ── -->
        <div class="slide-section" id="firstLastValueSection">
          <h3 class="heading-with-audio" id="day16FirstLastHeading">
            05. FIRST_VALUE() &amp; LAST_VALUE()
          </h3>
          <p><code>FIRST_VALUE()</code> retrieves the first value in the window frame. <code>LAST_VALUE()</code> retrieves the final value in the window frame.</p>
        </div>

        <div class="slide-section" id="firstLastCodeSection">
          <div class="code-block-container" id="day16FirstLastCode">
            <div class="code-subblock" id="firstLastQuery1">
              <pre><code><span class="code-comment">-- Baseline comparison: compare employee salary to highest in department</span>
<span class="kw">SELECT</span> first_name,
       department_id,
       salary,
       <span class="kw">FIRST_VALUE</span>(salary) <span class="kw">OVER</span> (
         <span class="kw">PARTITION BY</span> department_id <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>
       ) <span class="kw">AS</span> dept_highest_salary
<span class="kw">FROM</span>   employees;

<span class="code-comment">-- ⚠️ LAST_VALUE Requires the FULL frame!</span>
<span class="kw">SELECT</span> first_name,
       department_id,
       salary,
       <span class="kw">LAST_VALUE</span>(salary) <span class="kw">OVER</span> (
         <span class="kw">PARTITION BY</span> department_id <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>
         <span class="kw">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</span>
       ) <span class="kw">AS</span> dept_lowest_salary
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="lastValueWarnSection">
          <div class="warn-box" id="lastValueWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The Infamous LAST_VALUE Trap:</strong>
            </div>
            <p style="margin: 0;">By default, the window frame stops at <code>CURRENT ROW</code>. Therefore, calling <code>LAST_VALUE()</code> without declaring <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> will simply return the current row's own value! Always specify the full frame when using <code>LAST_VALUE()</code>.</p>
          </div>
        </div>

        <!-- ── Section 06: Percentage of Total ── -->
        <div class="slide-section" id="percentOfTotalSection">
          <h3 class="heading-with-audio" id="day16PctHeading">
            06. Percentage of Total Calculations
          </h3>
          <p>Combining individual row columns with an un-partitioned or partitioned <code>SUM() OVER ()</code> calculates each row's exact contribution percentage to the group total in a single query.</p>
        </div>

        <div class="slide-section" id="percentOfTotalCodeSection">
          <div class="code-block-container" id="day16PercentOfTotalCode">
            <div class="code-subblock" id="pctQuery1">
              <pre><code><span class="code-comment">-- Share of departmental payroll</span>
<span class="kw">SELECT</span> first_name,
       department_id,
       salary,
       <span class="kw">ROUND</span>(salary * 100.0 / <span class="kw">SUM</span>(salary) <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> department_id), 2) <span class="kw">AS</span> pct_of_dept_payroll
<span class="kw">FROM</span>   employees
<span class="kw">ORDER BY</span> department_id, salary <span class="kw">DESC</span>;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 07: Named Windows ── -->
        <div class="slide-section" id="namedWindowsSection">
          <h3 class="heading-with-audio" id="day16NamedWindowHeading">
            07. Reusable Named Windows (WINDOW Clause)
          </h3>
          <p>When multiple window functions use the identical specification, define a named window at the query bottom to keep code DRY, performant, and maintainable.</p>
        </div>

        <div class="slide-section" id="namedWindowsCodeSection">
          <div class="code-block-container" id="day16NamedWindowsCode">
            <div class="code-subblock" id="namedWindowsQuery1">
              <pre><code><span class="kw">SELECT</span> order_id,
       order_date,
       total_amount,
       <span class="kw">SUM</span>(total_amount) <span class="kw">OVER</span> w <span class="kw">AS</span> running_total,
       <span class="kw">AVG</span>(total_amount) <span class="kw">OVER</span> w <span class="kw">AS</span> running_avg
<span class="kw">FROM</span>   orders
<span class="kw">WINDOW</span> w <span class="kw">AS</span> (<span class="kw">ORDER BY</span> order_date, order_id <span class="kw">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span>);</code></pre>
            </div>
          </div>
        </div>

                <!-- ── Section 08: Interview Q&A Consolidated Section ── -->
        <div class="slide-section" id="day16QASection">
          <div class="interview-box">
            <h4 id="day16QAHeading" style="margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Window Functions II (Analytic)
            </h4>

            <div id="day16QA1">
              <p><strong>Q1: How do you compute a running total in SQL without collapsing rows?</strong></p>
              <p><em>A: Use <code>SUM(column) OVER (ORDER BY date_column)</code>. By supplying an <code>ORDER BY</code> clause inside <code>OVER()</code>, SQL accumulates values row-by-row up to the current row without grouping rows. Key takeaway: <code>SUM() OVER ()</code> (no ORDER BY) returns the grand total on every row; <code>SUM() OVER (ORDER BY ...)</code> returns a cumulative running sum.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA2">
              <p><strong>Q2: What is the difference between LAG() and LEAD()?</strong></p>
              <p><em>A: <code>LAG(col, n)</code> looks backward into prior rows (default offset = 1 row behind). <code>LEAD(col, n)</code> looks forward into upcoming rows (default offset = 1 row ahead). Both eliminate complex self-joins for delta and interval calculations.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA3">
              <p><strong>Q3: How do you calculate Month-over-Month (MoM) revenue growth?</strong></p>
              <p><em>A: Aggregate revenue by month in a CTE, then use <code>LAG(revenue) OVER (ORDER BY month)</code> to retrieve the previous month's revenue and calculate percentage growth: <code>ROUND((revenue - prev_revenue) * 100.0 / prev_revenue, 2)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA4">
              <p><strong>Q4: Why does LAST_VALUE() often return the current row instead of the actual last value?</strong></p>
              <p><em>A: By default, when <code>ORDER BY</code> is present, the window frame is <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. Because the frame stops at <code>CURRENT ROW</code>, the 'last value' in that frame is the current row itself. To get the true last row, you must explicitly declare <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA5">
              <p><strong>Q5: What is the difference between ROWS and RANGE in a window frame specification?</strong></p>
              <p><em>A: <code>ROWS</code> counts physical row offsets (e.g. <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> strictly includes 3 physical rows). <code>RANGE</code> considers logical value boundaries. If two rows have identical values in the <code>ORDER BY</code> column, <code>RANGE</code> treats them as peers and includes both simultaneously.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA6">
              <p><strong>Q6: How do you compute a 7-day rolling average in SQL?</strong></p>
              <p><em>A: Use <code>AVG(sales) OVER (ORDER BY sales_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>. This includes the current day plus the preceding 6 days, totaling 7 periods for time-series smoothing.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA7">
              <p><strong>Q7: How do you calculate the number of days between consecutive orders for each customer?</strong></p>
              <p><em>A: Partition by customer and order by order_date: <code>CAST(julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)) AS INTEGER)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA8">
              <p><strong>Q8: How do you prevent NULL when LAG() or LEAD() references a non-existent boundary row?</strong></p>
              <p><em>A: Provide the optional 3rd argument for the default fallback value: <code>LAG(column, offset, default_value)</code>. For example, <code>LAG(total_amount, 1, 0)</code> returns <code>0</code> instead of <code>NULL</code> on the very first row.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA9">
              <p><strong>Q9: How do you compute each product's percentage contribution to total category revenue?</strong></p>
              <p><em>A: Divide the product revenue by the window partitioned sum: <code>ROUND(unit_price * 100.0 / SUM(unit_price) OVER (PARTITION BY category_id), 2)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA10">
              <p><strong>Q10: How does FIRST_VALUE() differ from MIN() OVER()?</strong></p>
              <p><em>A: <code>MIN() OVER()</code> finds the mathematically lowest value in the window regardless of sort order. <code>FIRST_VALUE() OVER (ORDER BY ...)</code> returns whichever value appears first according to the defined <code>ORDER BY</code> sequence.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA11">
              <p><strong>Q11: What does ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING do?</strong></p>
              <p><em>A: It creates a 3-point centered rolling window containing the row immediately before, the current row, and the row immediately after. This is used for centered smoothing of time-series data without backward lag bias.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA12">
              <p><strong>Q12: How do you find customers whose second purchase occurred within 30 days of their first?</strong></p>
              <p><em>A: Use <code>ROW_NUMBER()</code> and <code>LAG(order_date)</code> partitioned by customer in a CTE, then filter where <code>rn = 2 AND (julianday(order_date) - julianday(prev_date)) <= 30</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA13">
              <p><strong>Q13: What is the classic 'Gaps and Islands' problem, and how do window functions solve it?</strong></p>
              <p><em>A: It involves identifying contiguous sequences of events (islands) and missing intervals (gaps). Subtracting <code>ROW_NUMBER()</code> from an order sequence or date produces a constant grouping key for all consecutive rows within each island.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA14">
              <p><strong>Q14: What happens when you execute multiple window functions with identical OVER clauses?</strong></p>
              <p><em>A: Modern query optimizers detect the identical window specifications and sort/partition the data only once in memory, streaming the rows through each window function simultaneously for minimal overhead.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA15">
              <p><strong>Q15: What are the benefits of using the WINDOW clause in complex queries?</strong></p>
              <p><em>A: Improved readability, reduction of repetitive code, and easier query maintenance. If window partitioning or ordering needs modification, you update it once in the <code>WINDOW</code> clause rather than in multiple <code>SELECT</code> items.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA16">
              <p><strong>Q16: How do you calculate the difference between each employee's salary and their department's average salary?</strong></p>
              <p><em>A: Subtract the departmental window average from the current salary: <code>ROUND(salary - AVG(salary) OVER (PARTITION BY department_id), 2)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA17">
              <p><strong>Q17: Can window frame boundaries be dynamic based on current row values?</strong></p>
              <p><em>A: In standard SQL engines (PostgreSQL, MySQL 8+, BigQuery), yes, using <code>RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW</code>. In SQLite, frame boundaries are limited to physical row counts via <code>ROWS</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA18">
              <p><strong>Q18: How do you find the first and most recent purchase amount for each customer in one query?</strong></p>
              <p><em>A: Combine <code>FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date)</code> with <code>LAST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA19">
              <p><strong>Q19: What is the difference between COUNT(*) OVER () and COUNT(*) in GROUP BY?</strong></p>
              <p><em>A: <code>COUNT(*) OVER ()</code> appends the total record count as a constant column on every single row without collapsing the dataset. <code>COUNT(*)</code> with <code>GROUP BY</code> aggregates the table into a single row per distinct group.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA20">
              <p><strong>Q20: How do you calculate running inventory remaining as orders are fulfilled?</strong></p>
              <p><em>A: Subtract the running sum of ordered quantities from the initial stock: <code>initial_stock - SUM(qty) OVER (PARTITION BY product_id ORDER BY order_date)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA21">
              <p><strong>Q21: What does the NTH_VALUE(col, n) window function do?</strong></p>
              <p><em>A: It returns the value from the <em>n</em>-th row within the window frame. For example, <code>NTH_VALUE(salary, 2)</code> returns the 2nd salary in the frame. Requires the full frame specification to evaluate forward.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA22">
              <p><strong>Q22: What happens if you use LAG() on an unordered window?</strong></p>
              <p><em>A: <code>LAG()</code> and <code>LEAD()</code> require an explicit <code>ORDER BY</code> clause inside <code>OVER()</code>. Calling them without <code>ORDER BY</code> raises a syntax error because 'previous row' has no deterministic meaning without an explicit sort sequence.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA23">
              <p><strong>Q23: How do you identify churned customers who haven't ordered in over 90 days after their prior order?</strong></p>
              <p><em>A: Use <code>LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)</code> in a CTE. Customers where <code>next_date IS NULL AND julianday('now') - julianday(order_date) > 90</code> represent churned accounts.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA24">
              <p><strong>Q24: What are peer rows in window function terminology?</strong></p>
              <p><em>A: Peer rows are rows that have identical values in the <code>ORDER BY</code> columns within a partition. Under <code>RANGE</code> framing, all peer rows are processed together in the same window frame.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day16QA25">
              <p><strong>Q25: What is the comprehensive toolkit of SQL Analytic Functions every senior analyst must know?</strong></p>
              <p><em>A: The essential toolkit consists of: <strong>Offset Functions</strong> (<code>LAG</code>, <code>LEAD</code>), <strong>Value Functions</strong> (<code>FIRST_VALUE</code>, <code>LAST_VALUE</code>, <code>NTH_VALUE</code>), <strong>Cumulative Aggregates</strong> (<code>SUM() OVER (...)</code>, <code>AVG() OVER (...)</code>), and <strong>Framing</strong> (<code>ROWS BETWEEN ...</code>).</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Global Running Total of Orders",
      "prompt": "Calculate a cumulative running total of <code>total_amount</code> across all orders ordered by <code>order_date, order_id</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>running_total</code>.",
      "starterSql": "-- Cumulative running total of orders\nSELECT order_id, order_date, total_amount,\n       SUM(total_amount) OVER (ORDER BY order_date, order_id) AS running_total\nFROM orders;",
      "referenceSql": "SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, order_id) AS running_total FROM orders;",
      "solutionAudio": "Day16/New_Day16Question01sol.mp3",
      "solutionCode": "SELECT order_id, order_date, total_amount,\n       SUM(total_amount) OVER (ORDER BY order_date, order_id) AS running_total\nFROM orders;",
      "tableScroll": true
    },
    {
      "id": 2,
      "title": "Customer Running Spend",
      "prompt": "Calculate a cumulative running total of <code>total_amount</code> for each customer ordered by <code>order_date, order_id</code>. Return <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>cust_running_total</code> ordered by <code>customer_id, order_date</code>.",
      "starterSql": "-- Cumulative spend per customer\nSELECT customer_id, order_id, order_date, total_amount,\n       SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS cust_running_total\nFROM orders\nORDER BY customer_id, order_date;",
      "referenceSql": "SELECT customer_id, order_id, order_date, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS cust_running_total FROM orders ORDER BY customer_id, order_date;",
      "solutionAudio": "Day16/New_Day16Question02sol.mp3",
      "solutionCode": "SELECT customer_id, order_id, order_date, total_amount,\n       SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS cust_running_total\nFROM orders\nORDER BY customer_id, order_date;",
      "tableScroll": true
    },
    {
      "id": 3,
      "title": "Previous Order Amount Comparison",
      "prompt": "For every order, inspect the immediately preceding order's total amount using <code>LAG()</code> with a fallback default of <code>0</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>prev_amount</code> ordered by <code>order_date, order_id</code>.",
      "starterSql": "-- Compare with previous order amount\nSELECT order_id, order_date, total_amount,\n       LAG(total_amount, 1, 0) OVER (ORDER BY order_date, order_id) AS prev_amount\nFROM orders;",
      "referenceSql": "SELECT order_id, order_date, total_amount, LAG(total_amount, 1, 0) OVER (ORDER BY order_date, order_id) AS prev_amount FROM orders;",
      "solutionAudio": "Day16/New_Day16Question03sol.mp3",
      "solutionCode": "SELECT order_id, order_date, total_amount,\n       LAG(total_amount, 1, 0) OVER (ORDER BY order_date, order_id) AS prev_amount\nFROM orders;",
      "tableScroll": true
    },
    {
      "id": 4,
      "title": "Order-to-Order Spending Difference",
      "prompt": "Calculate the difference between the current order amount and the previous order amount using <code>LAG()</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>diff_from_prev</code> ordered by <code>order_date, order_id</code>.",
      "starterSql": "-- Spending delta from previous order\nSELECT order_id, order_date, total_amount,\n       total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date, order_id) AS diff_from_prev\nFROM orders;",
      "referenceSql": "SELECT order_id, order_date, total_amount, total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date, order_id) AS diff_from_prev FROM orders;",
      "solutionAudio": "Day16/New_Day16Question04sol.mp3",
      "solutionCode": "SELECT order_id, order_date, total_amount,\n       total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date, order_id) AS diff_from_prev\nFROM orders;",
      "tableScroll": true
    },
    {
      "id": 5,
      "title": "Next Order Date per Customer",
      "prompt": "Using <code>LEAD()</code>, look ahead to determine each customer's subsequent order date. Return <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, and <code>next_order_date</code> ordered by <code>customer_id, order_date</code>.",
      "starterSql": "-- Customer subsequent order date\nSELECT customer_id, order_id, order_date,\n       LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS next_order_date\nFROM orders\nORDER BY customer_id, order_date;",
      "referenceSql": "SELECT customer_id, order_id, order_date, LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS next_order_date FROM orders ORDER BY customer_id, order_date;",
      "solutionAudio": "Day16/New_Day16Question05sol.mp3",
      "solutionCode": "SELECT customer_id, order_id, order_date,\n       LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS next_order_date\nFROM orders\nORDER BY customer_id, order_date;",
      "tableScroll": true
    },
    {
      "id": 6,
      "title": "Three-Order Moving Average",
      "prompt": "Calculate a 3-order rolling average of <code>total_amount</code> using <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>moving_avg</code> rounded to 2 decimal places.",
      "starterSql": "-- 3-order moving average\nSELECT order_id, order_date, total_amount,\n       ROUND(AVG(total_amount) OVER (ORDER BY order_date, order_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg\nFROM orders;",
      "referenceSql": "SELECT order_id, order_date, total_amount, ROUND(AVG(total_amount) OVER (ORDER BY order_date, order_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM orders;",
      "solutionAudio": "Day16/New_Day16Question06sol.mp3",
      "solutionCode": "SELECT order_id, order_date, total_amount,\n       ROUND(AVG(total_amount) OVER (ORDER BY order_date, order_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg\nFROM orders;",
      "tableScroll": true
    },
    {
      "id": 7,
      "title": "First Order Baseline per Customer",
      "prompt": "Using <code>FIRST_VALUE()</code>, find the first order amount for each customer ordered by <code>order_date, order_id</code>. Return <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>first_order_amount</code> ordered by <code>customer_id, order_date</code>.",
      "starterSql": "-- Opening order baseline\nSELECT customer_id, order_id, order_date, total_amount,\n       FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS first_order_amount\nFROM orders\nORDER BY customer_id, order_date;",
      "referenceSql": "SELECT customer_id, order_id, order_date, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS first_order_amount FROM orders ORDER BY customer_id, order_date;",
      "solutionAudio": "Day16/New_Day16Question07sol.mp3",
      "solutionCode": "SELECT customer_id, order_id, order_date, total_amount,\n       FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS first_order_amount\nFROM orders\nORDER BY customer_id, order_date;",
      "tableScroll": true
    },
    {
      "id": 8,
      "title": "Percentage of Department Payroll",
      "prompt": "Compute each employee's salary percentage of their department's total payroll. Return <code>employee_id</code>, <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>pct_of_dept</code> rounded to 2 decimal places ordered by <code>department_id, salary DESC</code>.",
      "starterSql": "-- Percentage of departmental payroll\nSELECT employee_id, first_name, department_id, salary,\n       ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS pct_of_dept\nFROM employees\nORDER BY department_id, salary DESC;",
      "referenceSql": "SELECT employee_id, first_name, department_id, salary, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS pct_of_dept FROM employees ORDER BY department_id, salary DESC;",
      "solutionAudio": "Day16/New_Day16Question08sol.mp3",
      "solutionCode": "SELECT employee_id, first_name, department_id, salary,\n       ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS pct_of_dept\nFROM employees\nORDER BY department_id, salary DESC;",
      "tableScroll": true
    },
    {
      "id": 9,
      "title": "Cumulative Product Quantity Sold",
      "prompt": "From <code>order_items</code>, calculate the cumulative running sum of <code>qty</code> for each <code>product_id</code> ordered by <code>order_item_id</code>. Return <code>order_item_id</code>, <code>order_id</code>, <code>product_id</code>, <code>qty</code>, and <code>running_qty</code> ordered by <code>product_id, order_item_id</code>.",
      "starterSql": "-- Cumulative quantity sold per product\nSELECT order_item_id, order_id, product_id, qty,\n       SUM(qty) OVER (PARTITION BY product_id ORDER BY id) AS running_qty\nFROM order_items\nORDER BY product_id, order_item_id;",
      "referenceSql": "SELECT id, order_id, product_id, qty, SUM(qty) OVER (PARTITION BY product_id ORDER BY id) AS running_qty FROM order_items ORDER BY product_id, id;",
      "solutionAudio": "Day16/New_Day16Question09sol.mp3",
      "solutionCode": "SELECT order_item_id, order_id, product_id, qty,\n       SUM(qty) OVER (PARTITION BY product_id ORDER BY id) AS running_qty\nFROM order_items\nORDER BY product_id, order_item_id;",
      "tableScroll": true
    },
    {
      "id": 10,
      "title": "Customer Order Interval in Days",
      "prompt": "Using <code>LAG()</code> and <code>julianday()</code>, calculate <code>days_between</code> consecutive orders for each customer. Return <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, and <code>days_between</code> (cast to INTEGER) ordered by <code>customer_id, order_date</code>.",
      "starterSql": "-- Days between customer orders\nSELECT customer_id, order_id, order_date,\n       CAST(julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id)) AS INTEGER) AS days_between\nFROM orders\nORDER BY customer_id, order_date;",
      "referenceSql": "SELECT customer_id, order_id, order_date, CAST(julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id)) AS INTEGER) AS days_between FROM orders ORDER BY customer_id, order_date;",
      "solutionAudio": "Day16/New_Day16Question10sol.mp3",
      "solutionCode": "SELECT customer_id, order_id, order_date,\n       CAST(julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id)) AS INTEGER) AS days_between\nFROM orders\nORDER BY customer_id, order_date;",
      "tableScroll": true
    },
    {
      "id": 11,
      "title": "Top Department Salary Benchmark",
      "prompt": "Using <code>FIRST_VALUE()</code>, return each employee's <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and the highest salary in their department as <code>top_dept_salary</code> ordered by <code>department_id, salary DESC</code>.",
      "starterSql": "-- Compare with highest salary in department\nSELECT first_name, department_id, salary,\n       FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS top_dept_salary\nFROM employees\nORDER BY department_id, salary DESC;",
      "referenceSql": "SELECT first_name, department_id, salary, FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS top_dept_salary FROM employees ORDER BY department_id, salary DESC;",
      "solutionAudio": "Day16/New_Day16Question11sol.mp3",
      "solutionCode": "SELECT first_name, department_id, salary,\n       FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS top_dept_salary\nFROM employees\nORDER BY department_id, salary DESC;",
      "tableScroll": true
    },
    {
      "id": 12,
      "title": "Centered Three-Point Moving Average",
      "prompt": "Compute a 3-point centered moving average of <code>total_amount</code> using <code>ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING</code>. Return <code>order_id</code>, <code>total_amount</code>, and <code>centered_avg</code> rounded to 2 decimal places ordered by <code>order_id</code>.",
      "starterSql": "-- Centered moving average\nSELECT order_id, total_amount,\n       ROUND(AVG(total_amount) OVER (ORDER BY order_id ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_avg\nFROM orders\nORDER BY order_id;",
      "referenceSql": "SELECT order_id, total_amount, ROUND(AVG(total_amount) OVER (ORDER BY order_id ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_avg FROM orders ORDER BY order_id;",
      "solutionAudio": "Day16/New_Day16Question12sol.mp3",
      "solutionCode": "SELECT order_id, total_amount,\n       ROUND(AVG(total_amount) OVER (ORDER BY order_id ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_avg\nFROM orders\nORDER BY order_id;",
      "tableScroll": true
    },
    {
      "id": 13,
      "title": "Cumulative Category Price",
      "prompt": "From <code>products</code>, calculate the cumulative running total of <code>unit_price</code> within each <code>category_id</code> ordered by <code>unit_price, product_id</code>. Return <code>product_id</code>, <code>name</code>, <code>category_id</code>, <code>unit_price</code>, and <code>cumulative_price</code> ordered by <code>category_id, unit_price</code>.",
      "starterSql": "-- Cumulative price within category\nSELECT product_id, name, category_id, unit_price,\n       SUM(unit_price) OVER (PARTITION BY category_id ORDER BY unit_price, product_id) AS cumulative_price\nFROM products\nORDER BY category_id, unit_price;",
      "referenceSql": "SELECT product_id, name, category_id, unit_price, SUM(unit_price) OVER (PARTITION BY category_id ORDER BY unit_price, product_id) AS cumulative_price FROM products ORDER BY category_id, unit_price;",
      "solutionAudio": "Day16/New_Day16Question13sol.mp3",
      "solutionCode": "SELECT product_id, name, category_id, unit_price,\n       SUM(unit_price) OVER (PARTITION BY category_id ORDER BY unit_price, product_id) AS cumulative_price\nFROM products\nORDER BY category_id, unit_price;",
      "tableScroll": true
    },
    {
      "id": 14,
      "title": "Percentage Change Between Orders",
      "prompt": "Using a CTE with <code>LAG()</code>, calculate <code>pct_change</code> between consecutive orders as <code>ROUND((total_amount - prev_amount) * 100.0 / prev_amount, 2)</code>. Filter for rows where <code>prev_amount IS NOT NULL</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, <code>prev_amount</code>, and <code>pct_change</code>.",
      "starterSql": "-- Consecutive order percentage change\nWITH ords AS (\n  SELECT order_id, order_date, total_amount,\n         LAG(total_amount) OVER (ORDER BY order_date, order_id) AS prev_amount\n  FROM orders\n)\nSELECT order_id, order_date, total_amount, prev_amount,\n       ROUND((total_amount - prev_amount) * 100.0 / prev_amount, 2) AS pct_change\nFROM ords\nWHERE prev_amount IS NOT NULL\nORDER BY order_date, order_id;",
      "referenceSql": "WITH ords AS (SELECT order_id, order_date, total_amount, LAG(total_amount) OVER (ORDER BY order_date, order_id) AS prev_amount FROM orders) SELECT order_id, order_date, total_amount, prev_amount, ROUND((total_amount - prev_amount) * 100.0 / prev_amount, 2) AS pct_change FROM ords WHERE prev_amount IS NOT NULL ORDER BY order_date, order_id;",
      "solutionAudio": "Day16/New_Day16Question14sol.mp3",
      "solutionCode": "WITH ords AS (\n  SELECT order_id, order_date, total_amount,\n         LAG(total_amount) OVER (ORDER BY order_date, order_id) AS prev_amount\n  FROM orders\n)\nSELECT order_id, order_date, total_amount, prev_amount,\n       ROUND((total_amount - prev_amount) * 100.0 / prev_amount, 2) AS pct_change\nFROM ords\nWHERE prev_amount IS NOT NULL\nORDER BY order_date, order_id;",
      "tableScroll": true
    },
    {
      "id": 15,
      "title": "Lowest Departmental Salary with Full Frame",
      "prompt": "Using <code>LAST_VALUE()</code> with the explicit full frame <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>, return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>lowest_dept_salary</code> ordered by <code>department_id, salary DESC</code>.",
      "starterSql": "-- Department lowest salary using LAST_VALUE\nSELECT first_name, department_id, salary,\n       LAST_VALUE(salary) OVER (\n         PARTITION BY department_id ORDER BY salary DESC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS lowest_dept_salary\nFROM employees\nORDER BY department_id, salary DESC;",
      "referenceSql": "SELECT first_name, department_id, salary, LAST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_dept_salary FROM employees ORDER BY department_id, salary DESC;",
      "solutionAudio": "Day16/New_Day16Question15sol.mp3",
      "solutionCode": "SELECT first_name, department_id, salary,\n       LAST_VALUE(salary) OVER (\n         PARTITION BY department_id ORDER BY salary DESC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS lowest_dept_salary\nFROM employees\nORDER BY department_id, salary DESC;",
      "tableScroll": true
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "prompt": "Which SQL window function retrieves a value from the preceding row without a self-join?",
      "options": ["LEAD()", "LAG()", "FIRST_VALUE()", "PRIOR()"],
      "correct": 1,
      "explanation": "LAG() accesses data from a previous row at a specified physical offset."
    },
    {
      "id": 2,
      "type": "mcq",
      "prompt": "What is the result of `SUM(amount) OVER (ORDER BY date)`?",
      "options": [
        "The grand total on every row",
        "A cumulative running total up to each row's date",
        "The average of all previous rows",
        "A syntax error because SUM requires GROUP BY"
      ],
      "correct": 1,
      "explanation": "When an ORDER BY is included in OVER(), SUM() computes a running cumulative total from the start of the window up to the current row."
    },
    {
      "id": 3,
      "type": "mcq",
      "prompt": "What is the default window frame when an ORDER BY clause is present but no ROWS/RANGE specification is written?",
      "options": [
        "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
        "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
        "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
        "RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING"
      ],
      "correct": 1,
      "explanation": "Standard SQL specifies that when ORDER BY is supplied without a frame clause, the default is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
    },
    {
      "id": 4,
      "type": "mcq",
      "prompt": "Why does `LAST_VALUE(salary) OVER (ORDER BY salary DESC)` return the current row's salary instead of the minimum salary?",
      "options": [
        "LAST_VALUE is deprecated in modern SQL",
        "The default frame ends at CURRENT ROW, making the current row the 'last' row evaluated in the frame",
        "LAST_VALUE only works with ascending order",
        "It requires a GROUP BY clause"
      ],
      "correct": 1,
      "explanation": "Because the default frame ends at CURRENT ROW, LAST_VALUE evaluates only up to the current row. You must specify `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` to include the entire partition."
    },
    {
      "id": 5,
      "type": "mcq",
      "prompt": "What does the 3rd argument in `LAG(sales, 1, 0)` represent?",
      "options": [
        "The number of partitions",
        "The default replacement value when the offset falls out of bounds (such as on the first row)",
        "The maximum allowed threshold",
        "The sort order direction"
      ],
      "correct": 1,
      "explanation": "The 3rd argument provides a default value to return instead of NULL when referencing a row outside the partition boundary."
    },
    {
      "id": 6,
      "type": "mcq",
      "prompt": "Which frame specification correctly calculates a 3-day moving average including the current day and the previous 2 days?",
      "options": [
        "ROWS BETWEEN 3 PRECEDING AND CURRENT ROW",
        "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
        "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
        "RANGE BETWEEN 2 PRECEDING AND 2 FOLLOWING"
      ],
      "correct": 1,
      "explanation": "2 PRECEDING + CURRENT ROW = 3 total physical rows."
    },
    {
      "id": 7,
      "type": "mcq",
      "prompt": "How does LEAD(hire_date, 2) behave?",
      "options": [
        "Returns the hire date from 2 rows behind",
        "Returns the hire date from 2 rows ahead",
        "Multiplies the hire date by 2",
        "Returns the 2nd distinct hire date in the table"
      ],
      "correct": 1,
      "explanation": "LEAD(column, offset) looks forward by 'offset' rows (here, 2 rows ahead)."
    },
    {
      "id": 8,
      "type": "mcq",
      "prompt": "What does `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` define?",
      "options": [
        "A 3-row centered window around the current row",
        "The entire table",
        "Only the first and last rows",
        "Rows with identical values"
      ],
      "correct": 0,
      "explanation": "It creates a symmetric 3-row centered frame comprising the prior row, current row, and next row."
    },
    {
      "id": 9,
      "type": "mcq",
      "prompt": "What does `SUM(revenue) OVER ()` (with completely empty parentheses) return?",
      "options": [
        "A syntax error",
        "The grand total revenue across the entire table, repeated on every single row",
        "Zero for all rows",
        "A cumulative sum up to each row"
      ],
      "correct": 1,
      "explanation": "An empty OVER() clause treats the entire result set as a single unpartitioned, un-ordered window, returning the overall aggregate on every row."
    },
    {
      "id": 10,
      "type": "mcq",
      "prompt": "How do you calculate each product's percentage of total category revenue in a single query?",
      "options": [
        "Using a CROSS JOIN to a temporary table",
        "unit_price * 100.0 / SUM(unit_price) OVER (PARTITION BY category_id)",
        "unit_price / COUNT(*) OVER ()",
        "Using GROUP BY ROLLUP"
      ],
      "correct": 1,
      "explanation": "Dividing the row's value by the partitioned window sum gives the exact percentage contribution per row without subqueries."
    },
    {
      "id": 11,
      "type": "mcq",
      "prompt": "Can you use LAG() without an ORDER BY clause inside OVER()?",
      "options": [
        "Yes, it defaults to primary key order",
        "No, LAG() strictly requires an ORDER BY clause because 'previous' is undefined without ordering",
        "Only in SQLite",
        "Only if PARTITION BY is present"
      ],
      "correct": 1,
      "explanation": "Offset functions like LAG and LEAD require an ORDER BY clause to establish deterministic sequence."
    },
    {
      "id": 12,
      "type": "mcq",
      "prompt": "What is the difference between FIRST_VALUE() and MIN() as window functions?",
      "options": [
        "They are identical in all cases",
        "MIN() returns the lowest scalar value in the frame; FIRST_VALUE() returns the value of the first row ordered by the ORDER BY clause",
        "FIRST_VALUE only works with strings",
        "MIN requires a frame specification"
      ],
      "correct": 1,
      "explanation": "MIN finds the minimum value, while FIRST_VALUE retrieves whichever value occurs in the first sorted position."
    },
    {
      "id": 13,
      "type": "mcq",
      "prompt": "What does UNBOUNDED PRECEDING indicate in a window frame?",
      "options": [
        "Start of the current partition",
        "The current row",
        "10 rows before the current row",
        "The end of the current partition"
      ],
      "correct": 0,
      "explanation": "UNBOUNDED PRECEDING sets the starting boundary at the very first row of the partition."
    },
    {
      "id": 14,
      "type": "mcq",
      "prompt": "What does UNBOUNDED FOLLOWING indicate in a window frame?",
      "options": [
        "The end of the current partition",
        "The current row",
        "The next 10 rows",
        "Start of the current partition"
      ],
      "correct": 0,
      "explanation": "UNBOUNDED FOLLOWING sets the ending boundary at the very last row of the partition."
    },
    {
      "id": 15,
      "type": "mcq",
      "prompt": "How does `PARTITION BY customer_id` affect a running total?",
      "options": [
        "Combines all customers together",
        "Resets the running total back to 0 at the start of each new customer",
        "Sorts customers by ID",
        "Filters out customers with single orders"
      ],
      "correct": 1,
      "explanation": "PARTITION BY creates isolated window partitions; cumulative calculations restart from zero for each partition key."
    },
    {
      "id": 16,
      "type": "mcq",
      "prompt": "In an order tracking query, how do you find the interval in days between orders using SQLite?",
      "options": [
        "DATEDIFF(order_date, LAG(order_date) OVER (...))",
        "julianday(order_date) - julianday(LAG(order_date) OVER (...))",
        "order_date - LAG(order_date) OVER (...)",
        "TIMEDIFF(order_date, LEAD(order_date) OVER (...))"
      ],
      "correct": 1,
      "explanation": "SQLite uses julianday() to calculate the difference in fractional days between two date strings."
    },
    {
      "id": 17,
      "type": "mcq",
      "prompt": "What is the primary benefit of the named WINDOW clause in complex analytic SQL queries?",
      "options": [
        "Makes queries execute in parallel threads",
        "Avoids repeating identical OVER clause specifications across multiple SELECT expressions",
        "Forces index creation on temp tables",
        "Automatically handles NULL values"
      ],
      "correct": 1,
      "explanation": "The WINDOW clause provides DRY (Don't Repeat Yourself) window definitions, making queries easier to read and maintain."
    },
    {
      "id": 18,
      "type": "mcq",
      "prompt": "How does RANGE handle duplicate values in the ORDER BY column compared to ROWS?",
      "options": [
        "RANGE treats duplicate values as peer rows and calculates them together, while ROWS calculates them row-by-row sequentially",
        "RANGE is faster than ROWS in all scenarios",
        "ROWS cannot be used with date columns",
        "They behave identically"
      ],
      "correct": 0,
      "explanation": "RANGE groups rows with identical ORDER BY values as peers in the same frame, while ROWS strictly counts physical row numbers."
    },
    {
      "id": 19,
      "type": "mcq",
      "prompt": "Can you combine LAG() and LEAD() in the same SQL query?",
      "options": [
        "No, only one offset function is allowed per query",
        "Yes, you can look both backward with LAG and forward with LEAD simultaneously",
        "Only when using subqueries",
        "Only in MySQL"
      ],
      "correct": 1,
      "explanation": "You can freely combine multiple analytic and offset window functions in the same SELECT statement."
    },
    {
      "id": 20,
      "type": "mcq",
      "prompt": "In financial analysis, what is the formula for percentage growth using LAG()?",
      "options": [
        "(current - prev) * 100.0 / prev",
        "(current + prev) / 2",
        "prev / current * 100.0",
        "current * prev"
      ],
      "correct": 0,
      "explanation": "Percentage change is computed as ((Current - Previous) / Previous) * 100."
    },
    {
      "id": 21,
      "type": "coding",
      "prompt": "Write a query to calculate a cumulative running total of <code>total_amount</code> from <code>orders</code> ordered by <code>order_date, order_id</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>running_total</code>.",
      "ref": "SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, order_id) AS running_total FROM orders;"
    },
    {
      "id": 22,
      "type": "coding",
      "prompt": "For every order, return <code>order_id</code>, <code>total_amount</code>, and the previous order's amount as <code>prev_amount</code> using <code>LAG()</code> with default 0 ordered by <code>order_date, order_id</code>.",
      "ref": "SELECT order_id, total_amount, LAG(total_amount, 1, 0) OVER (ORDER BY order_date, order_id) AS prev_amount FROM orders;"
    },
    {
      "id": 23,
      "type": "coding",
      "prompt": "Calculate a 3-order moving average of <code>total_amount</code> using <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>. Return <code>order_id</code>, <code>total_amount</code>, and <code>moving_avg</code> rounded to 2 decimal places.",
      "ref": "SELECT order_id, total_amount, ROUND(AVG(total_amount) OVER (ORDER BY order_date, order_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM orders;"
    },
    {
      "id": 24,
      "type": "coding",
      "prompt": "Using <code>LEAD()</code>, return each customer's <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, and their subsequent <code>next_order_date</code> partitioned by <code>customer_id</code> ordered by <code>order_date, order_id</code>.",
      "ref": "SELECT customer_id, order_id, order_date, LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS next_order_date FROM orders;"
    },
    {
      "id": 25,
      "type": "coding",
      "prompt": "Calculate each employee's salary percentage of their department's total payroll. Return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>pct_of_dept</code> rounded to 2 decimal places.",
      "ref": "SELECT first_name, department_id, salary, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS pct_of_dept FROM employees;"
    }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Analytic Window Functions (LAG, LEAD, Cumulative Sums, Rolling Averages)", "recordingKey": null }
  ]
};
