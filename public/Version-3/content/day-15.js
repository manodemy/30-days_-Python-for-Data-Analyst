// Day 15 — Window Functions I: Ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day15'] = {
  "day": 15,
  "title": "Window Functions: ROW_NUMBER & RANK",
  "db": "retail",
  "emoji": "🔢",
  "slides": [
    {
      "title": "Window Functions I — Ranking Functions",
      "duration": "11:09",
      "html": `<h2>🔢 Window Functions I — Ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE)</h2>

        <!-- ── Section 01: What Are Window Functions? ── -->
        <div class="slide-section" id="day15Overview">
          <h3 class="heading-with-audio" id="whatAreWindowFunctions">
            01. What Are Window Functions?
          </h3>
          <p>Window functions perform calculations <strong>across a set of table rows related to the current row</strong> — without collapsing them into a single output row (unlike standard aggregate functions). They compute values per row while still retaining full row-level detail.</p>
        </div>

        <div class="slide-section" id="day15RefTableSection">
          <div class="db-mock-table-wrap" id="day15RefTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Ranking Functions Comparison Matrix</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Function</th><th>Tie Handling</th><th>Gaps / Skips</th><th>Sequence Example</th><th>Analyst Use Case</th></tr></thead>
              <tbody>
                <tr id="day15Row1"><td><code>ROW_NUMBER()</code></td><td>Arbitrary consecutive</td><td><strong>Never skips</strong></td><td>1, 2, 3, 4, 5</td><td>Pagination &amp; Deduplication</td></tr>
                <tr id="day15Row2"><td><code>RANK()</code></td><td>Identical rank for ties</td><td><strong>Skips ranks</strong></td><td>1, 2, 2, <strong>4</strong>, 5</td><td>Olympic medals / Competitions</td></tr>
                <tr id="day15Row3"><td><code>DENSE_RANK()</code></td><td>Identical rank for ties</td><td><strong>Never skips</strong></td><td>1, 2, 2, <strong>3</strong>, 4</td><td>Leaderboards / Nth Highest Salary</td></tr>
                <tr id="day15Row4"><td><code>NTILE(n)</code></td><td>Divides into n buckets</td><td>Equally distributed</td><td>1, 1, 2, 2, 3, 3</td><td>Quartiles, Deciles &amp; Percentiles</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day15VsSection">
          <div class="vs-block" style="margin-top: 8px;">
            <div class="vs-card" id="day15VsGroupBy" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">Aggregate Function (GROUP BY)</h4>
              <p style="margin-bottom: 8px;">Collapses many rows into <strong>ONE single summary row</strong> per group.</p>
              <pre><code><span class="code-comment">-- Returns 1 row per department</span>
<span class="kw">SELECT</span> department_id, <span class="kw">AVG</span>(salary) <span class="kw">AS</span> avg_sal
<span class="kw">FROM</span>   employees
<span class="kw">GROUP BY</span> department_id;</code></pre>
            </div>
            <div class="vs-card" id="day15VsWindow" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">Window Function (OVER)</h4>
              <p style="margin-bottom: 8px;">Computes an aggregate or rank <strong>PER ROW</strong> while seeing related rows.</p>
              <pre><code><span class="code-comment">-- Returns EVERY employee row with dept avg alongside!</span>
<span class="kw">SELECT</span> first_name, salary,
       <span class="kw">AVG</span>(salary) <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> department_id) <span class="kw">AS</span> dept_avg
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 02: Anatomy of the OVER() Clause ── -->
        <div class="slide-section" id="overClauseAnatomySection">
          <h3 class="heading-with-audio" id="overClauseAnatomy">
            02. Anatomy of the OVER() Clause
          </h3>
          <p>The <code>OVER()</code> clause defines the window or slice of rows over which the function operates. It contains up to three optional components:</p>
        </div>

        <div class="slide-section" id="overClauseCodeSection">
          <div class="code-block-container" id="overClauseCode">
            <div class="code-subblock" id="overClauseSkeleton">
              <pre><code><span class="kw">function_name</span>() <span class="kw">OVER</span> (
  <span class="kw">PARTITION BY</span> column(s)   <span class="code-comment">-- Divides rows into groups (optional)</span>
  <span class="kw">ORDER BY</span>     column(s)   <span class="code-comment">-- Sort sequence within each partition (optional)</span>
  <span class="kw">ROWS/RANGE</span>   frame_spec  <span class="code-comment">-- Physical/logical boundary window (optional)</span>
)</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="overClauseInfoSection">
          <div class="info-box" id="overClauseInfo">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">💡 PARTITION BY vs ORDER BY:</strong>
            </div>
            <p style="margin: 0;"><strong>PARTITION BY</strong> is like <code>GROUP BY</code> for the window — it divides rows into independent subsets. <strong>ORDER BY</strong> sorts rows <em>within each partition</em> for ranking and running metrics. Neither collapses the result set.</p>
          </div>
        </div>

        <!-- ── Section 03: ROW_NUMBER() ── -->
        <div class="slide-section" id="rowNumberSection">
          <h3 class="heading-with-audio" id="day15RowNumberHeading">
            03. ROW_NUMBER() — Unique Consecutive Numbering
          </h3>
          <p><code>ROW_NUMBER()</code> assigns a strictly consecutive unique integer (1, 2, 3, …) to each row within a partition. Even when multiple rows share identical column values, <code>ROW_NUMBER()</code> never produces ties and never skips an integer.</p>
        </div>

        <div class="slide-section" id="rowNumberCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 1 — Department Salary Sequence</h4>
          </div>
          <div class="code-block-container" id="day15RowNumberCode">
            <div class="code-subblock" id="day15RowNumberQuery1">
              <pre><code><span class="code-comment">-- Rank employees by salary within each department</span>
<span class="kw">SELECT</span> first_name,
       department_id,
       salary,
       <span class="kw">ROW_NUMBER</span>() <span class="kw">OVER</span> (
         <span class="kw">PARTITION BY</span> department_id
         <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>
       ) <span class="kw">AS</span> row_num
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="topNCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Top-N Records per Group Pattern via CTE</h4>
          </div>
          <div class="code-block-container" id="day15TopNCode">
            <div class="code-subblock" id="day15TopNQuery1">
              <pre><code><span class="code-comment">-- Find the single highest earner in each department</span>
<span class="kw">WITH</span> ranked <span class="kw">AS</span> (
  <span class="kw">SELECT</span> first_name, department_id, salary,
         <span class="kw">ROW_NUMBER</span>() <span class="kw">OVER</span> (
           <span class="kw">PARTITION BY</span> department_id <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>
         ) <span class="kw">AS</span> rn
  <span class="kw">FROM</span>   employees
)
<span class="kw">SELECT</span> * <span class="kw">FROM</span> ranked <span class="kw">WHERE</span> rn = 1;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 04: RANK() vs DENSE_RANK() ── -->
        <div class="slide-section" id="rankVsDenseRankSection">
          <h3 class="heading-with-audio" id="rankVsDenseRank">
            04. RANK() vs DENSE_RANK() — Handling Ties
          </h3>
          <p>When multiple records share identical values in the <code>ORDER BY</code> column, choosing between <code>RANK()</code> and <code>DENSE_RANK()</code> controls whether subsequent rank numbers are skipped.</p>
        </div>

        <div class="slide-section" id="day15RankVsDenseVsSection">
          <div class="vs-block" style="margin-top: 8px;">
            <div class="vs-card" id="day15RankCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">RANK() (Skips After Ties)</h4>
              <p style="margin-bottom: 8px;">Tied rows receive the identical rank. The next rank <strong>skips</strong> numbers based on how many rows tied (e.g. 1, 2, 2, <strong>4</strong>, 5).</p>
              <pre><code><span class="kw">SELECT</span> first_name, salary,
       <span class="kw">RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> rnk
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
            <div class="vs-card" id="day15DenseRankCard" style="flex: 1;">
              <h4 style="margin: 0 0 6px; font-size: 0.95rem; color:var(--ink-info);">DENSE_RANK() (Never Skips)</h4>
              <p style="margin-bottom: 8px;">Tied rows receive the identical rank. The next rank <strong>never skips</strong> consecutive numbers (e.g. 1, 2, 2, <strong>3</strong>, 4).</p>
              <pre><code><span class="kw">SELECT</span> first_name, salary,
       <span class="kw">DENSE_RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> drnk
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="rankComparisonCode">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 2 — Side-by-Side Comparison of Ranking Functions</h4>
          </div>
          <div class="code-block-container" id="day15RankComparisonCode">
            <div class="code-subblock" id="day15RankComparisonQuery1">
              <pre><code><span class="kw">SELECT</span> first_name,
       salary,
       <span class="kw">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> row_num,
       <span class="kw">RANK</span>()       <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> rank_val,
       <span class="kw">DENSE_RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> dense_rank_val
<span class="kw">FROM</span>   employees
<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="nthHighestWarnSection">
          <div class="warn-box" id="nthHighestWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The N-th Highest Salary Interview Trap:</strong>
            </div>
            <p style="margin: 0;">If an interviewer asks for the <em>2nd or 3rd highest salary</em>, always use <code>DENSE_RANK()</code> inside a CTE! Using <code>RANK() = 2</code> will fail if two people share the top salary (both get rank 1, and rank 2 is skipped completely).</p>
          </div>
        </div>

        <!-- ── Section 05: NTILE(n) ── -->
        <div class="slide-section" id="ntileBucketingSection">
          <h3 class="heading-with-audio" id="ntileBucketing">
            05. NTILE(n) — Distributing Rows into Buckets
          </h3>
          <p><code>NTILE(n)</code> divides rows into <strong>n equal buckets</strong> and assigns an integer bucket number (from 1 to n). Perfect for calculating quartiles (4), deciles (10), or percentiles (100).</p>
        </div>

        <div class="slide-section" id="ntileCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query 3 — Salary Quartile Bucketing</h4>
          </div>
          <div class="code-block-container" id="day15NtileCode">
            <div class="code-subblock" id="day15NtileQuery1">
              <pre><code><span class="code-comment">-- Divide employees into 4 salary quartiles</span>
<span class="kw">SELECT</span> first_name,
       salary,
       <span class="kw">NTILE</span>(4) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> salary_quartile
<span class="kw">FROM</span>   employees
<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day15NtileTipSection">
          <div class="pro-tip-box" id="day15NtileTip">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-warn); flex: 1;">💡 NTILE Remainder Handling:</strong>
            </div>
            <p style="margin: 0;">If rows are not evenly divisible by <code>n</code>, the remainder rows are distributed starting from bucket 1 forward. For 10 rows and 4 buckets: Buckets 1 &amp; 2 get 3 rows each; Buckets 3 &amp; 4 get 2 rows each.</p>
          </div>
        </div>

        <!-- ── Section 06: WHERE Clause Execution Order Trap ── -->
        <div class="slide-section" id="whereExecutionOrderSection">
          <h3 class="heading-with-audio" id="whereExecutionOrder">
            06. Why Window Functions Cannot Appear in WHERE
          </h3>
          <p>In the SQL logical order of operations, <code>WHERE</code> and <code>HAVING</code> evaluate in Steps 2 and 4 — well before <code>SELECT</code> (Step 5) where window functions are computed. Thus, filtering directly on a window function causes a syntax error.</p>
        </div>

        <div class="slide-section" id="cteFilteringCode">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Syntax Error vs CTE Filtering Pattern</h4>
          </div>
          <div class="code-block-container" id="day15CteFilteringCode">
            <div class="code-subblock" id="day15CteFilteringQuery1">
              <pre><code><span class="code-comment">-- ❌ Syntax Error: Window functions not permitted in WHERE</span>
<span class="kw">SELECT</span> first_name, salary,
       <span class="kw">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> rn
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  <span class="kw">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <= 3;  <span class="code-comment">-- ERROR!</span>

<span class="code-comment">-- ✅ Golden Industry Pattern: Calculate in CTE, then filter</span>
<span class="kw">WITH</span> ranked <span class="kw">AS</span> (
  <span class="kw">SELECT</span> first_name, salary,
         <span class="kw">DENSE_RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> dr
  <span class="kw">FROM</span>   employees
)
<span class="kw">SELECT</span> first_name, salary, dr
<span class="kw">FROM</span>   ranked
<span class="kw">WHERE</span>  dr <= 3;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 07: Global Ranking vs Partitioned Ranking ── -->
        <div class="slide-section" id="globalVsPartitionedSection">
          <h3 class="heading-with-audio" id="globalVsPartitioned">
            07. Global Ranking vs Partitioned Ranking
          </h3>
          <p>Omitting <code>PARTITION BY</code> creates a single global window across the entire dataset. Adding <code>PARTITION BY</code> restarts the sequence for each unique partition key.</p>
        </div>

        <div class="slide-section" id="globalVsPartCodeSection">
          <div class="code-block-container" id="day15GlobalVsPartCode">
            <div class="code-subblock" id="day15GlobalVsPartQuery1">
              <pre><code><span class="code-comment">-- 1. Global Rank (no PARTITION BY)</span>
<span class="kw">SELECT</span> first_name, salary,
       <span class="kw">RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> global_rank
<span class="kw">FROM</span>   employees;

<span class="code-comment">-- 2. Partitioned Rank (resets per department)</span>
<span class="kw">SELECT</span> first_name, department_id, salary,
       <span class="kw">RANK</span>() <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> department_id <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>) <span class="kw">AS</span> dept_rank
<span class="kw">FROM</span>   employees;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="windowIndexingPerfSection">
          <div class="info-box" id="windowIndexingPerf">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">⚡ Indexing for Window Performance:</strong>
            </div>
            <p style="margin: 0;">To execute window functions with maximum speed, create a composite B-tree index on <code>(partition_col, order_col)</code>. This allows the query engine to read pre-sorted streams without in-memory sorting.</p>
          </div>
        </div>

        <!-- ── Section 08: Interview Q&A Consolidated Section ── -->
        <div class="slide-section" id="day15QASection">
          <div class="interview-box">
            <h4 id="day15QAHeading" style="margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Window Functions I (Ranking)
            </h4>

            <div id="day15QA1">
              <p><strong>Q1: What is a window function, and how does it differ from a GROUP BY aggregation?</strong></p>
              <p><em>A: A regular <code>GROUP BY</code> aggregation collapses multiple individual rows into a single summary row per group. A <strong>window function</strong> calculates metrics across a set of rows while preserving the individual identity of each row in the output.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA2">
              <p><strong>Q2: What is the fundamental difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?</strong></p>
              <p><em>A: <code>ROW_NUMBER()</code> assigns unique sequential integers (1, 2, 3...) without ties or gaps. <code>RANK()</code> gives tied values the same rank and skips subsequent numbers (1, 2, 2, 4...). <code>DENSE_RANK()</code> gives tied values the same rank and never skips (1, 2, 2, 3...).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA3">
              <p><strong>Q3: How do you find the N-th highest salary in a company?</strong></p>
              <p><em>A: Use <code>DENSE_RANK()</code> inside a Common Table Expression: <code>WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM ranked WHERE dr = N;</code></em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA4">
              <p><strong>Q4: Can you use a window function in a WHERE or HAVING clause? Why or why not?</strong></p>
              <p><em>A: No. In SQL execution order, <code>WHERE</code> (Step 2) and <code>HAVING</code> (Step 4) evaluate before the <code>SELECT</code> clause (Step 5) where window functions are computed. To filter on a window function, wrap it in a CTE or subquery first.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA5">
              <p><strong>Q5: How do you find the top earner in every single department?</strong></p>
              <p><em>A: Partition by department and order by salary descending with <code>ROW_NUMBER()</code> inside a CTE, then filter where <code>rn = 1</code> in the outer query.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA6">
              <p><strong>Q6: How does NTILE(n) handle datasets that are not evenly divisible by n?</strong></p>
              <p><em>A: The remainder rows are distributed one-by-one to the starting buckets. For example, 10 rows into 4 buckets: Buckets 1 and 2 receive 3 rows each, while Buckets 3 and 4 receive 2 rows each.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA7">
              <p><strong>Q7: How do you remove duplicate rows using ROW_NUMBER()?</strong></p>
              <p><em>A: Partition by all columns that define a duplicate and order by primary key or date. Rows with <code>ROW_NUMBER() > 1</code> are duplicates and can be deleted using a CTE.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA8">
              <p><strong>Q8: What happens if you omit the PARTITION BY clause in a window function?</strong></p>
              <p><em>A: The entire result set is treated as a single global partition. Ranking or aggregate calculations occur across all returned rows.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA9">
              <p><strong>Q9: What happens if you omit the ORDER BY clause inside OVER() for ROW_NUMBER()?</strong></p>
              <p><em>A: Most enterprise engines (PostgreSQL, SQL Server, Oracle) reject it with a syntax error because <code>ROW_NUMBER()</code> strictly requires an ordering to assign deterministic integers.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA10">
              <p><strong>Q10: How do you find employees whose salary ranks in the top 10% company-wide?</strong></p>
              <p><em>A: Use <code>NTILE(10) OVER (ORDER BY salary DESC) AS decile</code> in a CTE, then filter for <code>decile = 1</code> in the outer query.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA11">
              <p><strong>Q11: When would you prefer RANK() over DENSE_RANK()?</strong></p>
              <p><em>A: In competitive sports or Olympic medal standings, where two contestants tying for 1st place means nobody receives 2nd place, and the next contestant gets 3rd place (bronze).</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA12">
              <p><strong>Q12: When would you prefer DENSE_RANK() over RANK()?</strong></p>
              <p><em>A: In price tiers, customer loyalty brackets, or executive pay grade banding, where tiers should be consecutive integers without arbitrary holes or gaps caused by ties.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA13">
              <p><strong>Q13: How do window functions perform compared to self-joins or correlated subqueries?</strong></p>
              <p><em>A: Window functions are significantly faster (typically O(N log N) for sorting) compared to correlated subqueries which execute O(N²) quadratic loops. Modern engines calculate window functions in a single pass after sorting.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA14">
              <p><strong>Q14: How do you select the two most recent orders for every customer?</strong></p>
              <p><em>A: Partition by <code>customer_id</code> and order by <code>order_date DESC</code> with <code>ROW_NUMBER()</code> inside a CTE, then filter where <code>rn <= 2</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA15">
              <p><strong>Q15: How do you ensure deterministic output with ROW_NUMBER() when values tie?</strong></p>
              <p><em>A: Add a secondary tie-breaker column (such as the primary key <code>employee_id ASC</code>) to the <code>ORDER BY</code> clause.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA16">
              <p><strong>Q16: What is a named WINDOW clause and why use it?</strong></p>
              <p><em>A: The <code>WINDOW</code> clause lets you define a named window specification at the query bottom to avoid repeating identical <code>(PARTITION BY ... ORDER BY ...)</code> definitions across multiple columns.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA17">
              <p><strong>Q17: Can you use QUALIFY to filter window functions directly in SQL?</strong></p>
              <p><em>A: In Snowflake, BigQuery, and Databricks, yes: <code>QUALIFY</code> acts like a <code>HAVING</code> clause for window functions. In PostgreSQL, MySQL, and SQLite, <code>QUALIFY</code> is not supported, so a CTE is required.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA18">
              <p><strong>Q18: How do you rank products by sales revenue within their category?</strong></p>
              <p><em>A: In a CTE, group by category and product, compute <code>SUM(revenue)</code>, and apply <code>DENSE_RANK() OVER (PARTITION BY category_id ORDER BY SUM(revenue) DESC)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA19">
              <p><strong>Q19: What indexes best optimize window function queries?</strong></p>
              <p><em>A: A composite B-tree index on <code>(partition_column, order_column)</code>. This allows the query engine to read pre-sorted rows directly, eliminating costly sorting operations.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA20">
              <p><strong>Q20: How do window ranking functions handle NULL values in ORDER BY?</strong></p>
              <p><em>A: In standard SQL, NULLs sort together (either all first or all last depending on dialect). In PostgreSQL and SQLite, NULLs sort first in ASC and last in DESC, customizable via <code>NULLS FIRST / LAST</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA21">
              <p><strong>Q21: How do you find all employees tied for the lowest salary in each department?</strong></p>
              <p><em>A: Partition by department and order by salary ascending with <code>RANK()</code> in a CTE, then filter where <code>rnk = 1</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA22">
              <p><strong>Q22: How do you find customers who placed orders in consecutive sequence?</strong></p>
              <p><em>A: Use <code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)</code> to sequence customer orders chronologically.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA23">
              <p><strong>Q23: What is the difference between PARTITION BY and GROUP BY under the hood?</strong></p>
              <p><em>A: <code>GROUP BY</code> aggregates rows into distinct buckets and synthesizes one output row per group. <code>PARTITION BY</code> sorts rows into segments, computes metrics, and attaches that metadata to every individual row without collapsing the dataset.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA24">
              <p><strong>Q24: Can you use multiple distinct window functions with different PARTITION BY clauses in the same SELECT statement?</strong></p>
              <p><em>A: Yes. You can compute global rank, department rank, and job title rank simultaneously in a single query by using different <code>OVER(...)</code> clauses.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day15QA25">
              <p><strong>Q25: What is the execution sequence of a query containing WHERE, GROUP BY, HAVING, and OVER()?</strong></p>
              <p><em>A: 1. FROM/JOIN → 2. WHERE → 3. GROUP BY → 4. HAVING → 5. SELECT (Base expressions, Aggregates, Window Functions via OVER) → 6. DISTINCT → 7. ORDER BY → 8. LIMIT/OFFSET.</em></p>
            </div>
          </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Global Salary Ranking",
      "prompt": "Assign a global consecutive row number to all employees ordered by <code>salary DESC</code>. Return <code>first_name</code>, <code>job_title</code>, <code>salary</code>, and <code>global_rank</code>.",
      "starterSql": "-- Assign global row number by salary\nSELECT first_name, job_title, salary,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS global_rank\nFROM employees\nORDER BY salary DESC;",
      "referenceSql": "SELECT first_name, job_title, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS global_rank FROM employees ORDER BY salary DESC;",
      "solutionAudio": "Day15/New_Day15Question01sol.mp3",
      "solutionCode": "SELECT first_name, job_title, salary,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS global_rank\nFROM employees\nORDER BY salary DESC;",
      "tableScroll": true
    },
    {
      "id": 2,
      "title": "Department Salary Ranking",
      "prompt": "Rank employees within each department using <code>RANK()</code> ordered by salary descending. Return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>dept_rank</code> ordered by <code>department_id</code>, then <code>dept_rank</code>.",
      "starterSql": "-- Rank employees within department\nSELECT first_name, department_id, salary,\n       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank\nFROM employees\nORDER BY department_id, dept_rank;",
      "referenceSql": "SELECT first_name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank FROM employees ORDER BY department_id, dept_rank;",
      "solutionAudio": "Day15/New_Day15Question02sol.mp3",
      "solutionCode": "SELECT first_name, department_id, salary,\n       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank\nFROM employees\nORDER BY department_id, dept_rank;",
      "tableScroll": true
    },
    {
      "id": 3,
      "title": "Rank Function Comparison",
      "prompt": "Display <code>first_name</code>, <code>salary</code>, and compare <code>RANK()</code> as <code>rnk</code>, <code>DENSE_RANK()</code> as <code>dense_rnk</code>, and <code>ROW_NUMBER()</code> as <code>row_num</code> ordered by <code>salary DESC</code>.",
      "starterSql": "-- Compare ranking functions side by side\nSELECT first_name, salary,\n       RANK() OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num\nFROM employees\nORDER BY salary DESC;",
      "referenceSql": "SELECT first_name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees ORDER BY salary DESC;",
      "solutionAudio": "Day15/New_Day15Question03sol.mp3",
      "solutionCode": "SELECT first_name, salary,\n       RANK() OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num\nFROM employees\nORDER BY salary DESC;",
      "tableScroll": true
    },
    {
      "id": 4,
      "title": "Top Earner per Department",
      "prompt": "Using a CTE and <code>ROW_NUMBER()</code>, find the highest-paid employee in each department. Return <code>first_name</code>, <code>department_id</code>, and <code>salary</code>.",
      "starterSql": "-- CTE with ROW_NUMBER to find #1 earner\nWITH ranked AS (\n  SELECT first_name, department_id, salary,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, salary\nFROM ranked\nWHERE rn = 1;",
      "referenceSql": "WITH ranked AS (SELECT first_name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees) SELECT first_name, department_id, salary FROM ranked WHERE rn = 1;",
      "solutionAudio": "Day15/New_Day15Question04sol.mp3",
      "solutionCode": "WITH ranked AS (\n  SELECT first_name, department_id, salary,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, salary\nFROM ranked\nWHERE rn = 1;",
      "tableScroll": false
    },
    {
      "id": 5,
      "title": "Third Highest Salary",
      "prompt": "Find the 3rd highest distinct salary across the entire company using <code>DENSE_RANK()</code> in a CTE. Return <code>salary</code>.",
      "starterSql": "-- Find 3rd highest salary using DENSE_RANK\nWITH ranked AS (\n  SELECT salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS dr\n  FROM employees\n)\nSELECT DISTINCT salary\nFROM ranked\nWHERE dr = 3;",
      "referenceSql": "WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM ranked WHERE dr = 3;",
      "solutionAudio": "Day15/New_Day15Question05sol.mp3",
      "solutionCode": "WITH ranked AS (\n  SELECT salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS dr\n  FROM employees\n)\nSELECT DISTINCT salary\nFROM ranked\nWHERE dr = 3;",
      "tableScroll": false
    },
    {
      "id": 6,
      "title": "Customer Spending Tiers",
      "prompt": "From <code>orders</code>, calculate <code>total_spent</code> (sum of <code>total_amount</code>) per customer, and assign <code>spend_rank</code> using <code>DENSE_RANK()</code> ordered by total spent descending. Return <code>customer_id</code>, <code>total_spent</code>, and <code>spend_rank</code>.",
      "starterSql": "-- Rank customer total spend\nSELECT customer_id,\n       SUM(total_amount) AS total_spent,\n       DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spend_rank\nFROM orders\nGROUP BY customer_id\nORDER BY spend_rank;",
      "referenceSql": "SELECT customer_id, SUM(total_amount) AS total_spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spend_rank FROM orders GROUP BY customer_id ORDER BY spend_rank;",
      "solutionAudio": "Day15/New_Day15Question06sol.mp3",
      "solutionCode": "SELECT customer_id,\n       SUM(total_amount) AS total_spent,\n       DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spend_rank\nFROM orders\nGROUP BY customer_id\nORDER BY spend_rank;",
      "tableScroll": true
    },
    {
      "id": 7,
      "title": "Company Salary Quartiles",
      "prompt": "Divide all employees into 4 salary quartiles using <code>NTILE(4)</code> ordered by salary descending. Return <code>first_name</code>, <code>salary</code>, and <code>quartile</code>.",
      "starterSql": "-- Divide employees into quartiles\nSELECT first_name, salary,\n       NTILE(4) OVER (ORDER BY salary DESC) AS quartile\nFROM employees\nORDER BY salary DESC;",
      "referenceSql": "SELECT first_name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS quartile FROM employees ORDER BY salary DESC;",
      "solutionAudio": "Day15/New_Day15Question07sol.mp3",
      "solutionCode": "SELECT first_name, salary,\n       NTILE(4) OVER (ORDER BY salary DESC) AS quartile\nFROM employees\nORDER BY salary DESC;",
      "tableScroll": true
    },
    {
      "id": 8,
      "title": "Top 2 Products by Category Revenue",
      "prompt": "Join <code>order_items</code> and <code>products</code>, calculate product revenue (<code>SUM(oi.qty * oi.unit_price)</code>), and use <code>ROW_NUMBER()</code> partitioned by <code>category_id</code> to return the top 2 products in each category. Return <code>category_id</code>, <code>product_name</code>, and <code>revenue</code>.",
      "starterSql": "-- Top 2 products per category by revenue\nWITH prod_rev AS (\n  SELECT p.category_id,\n         p.name AS product_name,\n         SUM(oi.qty * oi.unit_price) AS revenue,\n         ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS rn\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.product_id\n  GROUP BY p.category_id, p.product_id\n)\nSELECT category_id, product_name, revenue\nFROM prod_rev\nWHERE rn <= 2;",
      "referenceSql": "WITH prod_rev AS (SELECT p.category_id, p.name AS product_name, SUM(oi.qty * oi.unit_price) AS revenue, ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS rn FROM order_items oi JOIN products p ON oi.product_id = p.product_id GROUP BY p.category_id, p.product_id) SELECT category_id, product_name, revenue FROM prod_rev WHERE rn <= 2;",
      "solutionAudio": "Day15/New_Day15Question08sol.mp3",
      "solutionCode": "WITH prod_rev AS (\n  SELECT p.category_id,\n         p.name AS product_name,\n         SUM(oi.qty * oi.unit_price) AS revenue,\n         ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS rn\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.product_id\n  GROUP BY p.category_id, p.product_id\n)\nSELECT category_id, product_name, revenue\nFROM prod_rev\nWHERE rn <= 2;",
      "tableScroll": true
    },
    {
      "id": 9,
      "title": "Lowest Earners per Department",
      "prompt": "Using <code>ROW_NUMBER()</code> ordered by salary ascending, return <code>first_name</code>, <code>department_id</code>, and <code>salary</code> for the 2 lowest-paid employees in each department.",
      "starterSql": "-- 2 lowest paid per department\nWITH lowest AS (\n  SELECT first_name, department_id, salary,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary ASC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, salary\nFROM lowest\nWHERE rn <= 2\nORDER BY department_id, salary ASC;",
      "referenceSql": "WITH lowest AS (SELECT first_name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary ASC) AS rn FROM employees) SELECT first_name, department_id, salary FROM lowest WHERE rn <= 2 ORDER BY department_id, salary ASC;",
      "solutionAudio": "Day15/New_Day15Question09sol.mp3",
      "solutionCode": "WITH lowest AS (\n  SELECT first_name, department_id, salary,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary ASC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, salary\nFROM lowest\nWHERE rn <= 2\nORDER BY department_id, salary ASC;",
      "tableScroll": true
    },
    {
      "id": 10,
      "title": "Customer Order Frequency Ranking",
      "prompt": "From <code>orders</code>, count orders per customer and assign <code>order_rank</code> using <code>RANK()</code> ordered by order count descending. Return <code>customer_id</code>, <code>order_count</code>, and <code>order_rank</code>.",
      "starterSql": "-- Rank customers by order frequency\nSELECT customer_id,\n       COUNT(*) AS order_count,\n       RANK() OVER (ORDER BY COUNT(*) DESC) AS order_rank\nFROM orders\nGROUP BY customer_id\nORDER BY order_rank;",
      "referenceSql": "SELECT customer_id, COUNT(*) AS order_count, RANK() OVER (ORDER BY COUNT(*) DESC) AS order_rank FROM orders GROUP BY customer_id ORDER BY order_rank;",
      "solutionAudio": "Day15/New_Day15Question10sol.mp3",
      "solutionCode": "SELECT customer_id,\n       COUNT(*) AS order_count,\n       RANK() OVER (ORDER BY COUNT(*) DESC) AS order_rank\nFROM orders\nGROUP BY customer_id\nORDER BY order_rank;",
      "tableScroll": true
    },
    {
      "id": 11,
      "title": "Product Price Tiers via NTILE",
      "prompt": "Divide products into 3 price tiers using <code>NTILE(3)</code> ordered by <code>unit_price DESC</code>. Return <code>name</code>, <code>unit_price</code>, and <code>price_tier</code>.",
      "starterSql": "-- 3 price tiers with NTILE\nSELECT name, unit_price,\n       NTILE(3) OVER (ORDER BY unit_price DESC) AS price_tier\nFROM products\nORDER BY unit_price DESC;",
      "referenceSql": "SELECT name, unit_price, NTILE(3) OVER (ORDER BY unit_price DESC) AS price_tier FROM products ORDER BY unit_price DESC;",
      "solutionAudio": "Day15/New_Day15Question11sol.mp3",
      "solutionCode": "SELECT name, unit_price,\n       NTILE(3) OVER (ORDER BY unit_price DESC) AS price_tier\nFROM products\nORDER BY unit_price DESC;",
      "tableScroll": true
    },
    {
      "id": 12,
      "title": "Seniority per Department",
      "prompt": "Find the earliest hired employee in each department using <code>ROW_NUMBER()</code> ordered by <code>hire_date ASC</code>. Return <code>first_name</code>, <code>department_id</code>, and <code>hire_date</code>.",
      "starterSql": "-- Earliest hired employee per department\nWITH senior AS (\n  SELECT first_name, department_id, hire_date,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY hire_date ASC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, hire_date\nFROM senior\nWHERE rn = 1;",
      "referenceSql": "WITH senior AS (SELECT first_name, department_id, hire_date, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY hire_date ASC) AS rn FROM employees) SELECT first_name, department_id, hire_date FROM senior WHERE rn = 1;",
      "solutionAudio": "Day15/New_Day15Question12sol.mp3",
      "solutionCode": "WITH senior AS (\n  SELECT first_name, department_id, hire_date,\n         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY hire_date ASC) AS rn\n  FROM employees\n)\nSELECT first_name, department_id, hire_date\nFROM senior\nWHERE rn = 1;",
      "tableScroll": false
    },
    {
      "id": 13,
      "title": "Top Spender per Country",
      "prompt": "Join <code>customers</code> and <code>orders</code>, calculate total spent per customer, and use <code>ROW_NUMBER()</code> partitioned by <code>country</code> to find the single top spender in each country. Return <code>country</code>, <code>first_name</code>, and <code>spent</code>.",
      "starterSql": "-- Single top spender per country\nWITH country_spend AS (\n  SELECT c.region, c.first_name,\n         SUM(o.total_amount) AS spent,\n         ROW_NUMBER() OVER (PARTITION BY c.region ORDER BY SUM(o.total_amount) DESC) AS rn\n  FROM customers c\n  JOIN orders o ON c.customer_id = o.customer_id\n  GROUP BY c.region, c.customer_id\n)\nSELECT country, first_name, spent\nFROM country_spend\nWHERE rn = 1;",
      "referenceSql": "WITH region_spend AS (SELECT c.region, c.first_name, SUM(o.total_amount) AS spent, ROW_NUMBER() OVER (PARTITION BY c.region ORDER BY SUM(o.total_amount) DESC) AS rn FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.region, c.customer_id) SELECT region, first_name, spent FROM region_spend WHERE rn = 1;",
      "solutionAudio": "Day15/New_Day15Question13sol.mp3",
      "solutionCode": "WITH country_spend AS (\n  SELECT c.region, c.first_name,\n         SUM(o.total_amount) AS spent,\n         ROW_NUMBER() OVER (PARTITION BY c.region ORDER BY SUM(o.total_amount) DESC) AS rn\n  FROM customers c\n  JOIN orders o ON c.customer_id = o.customer_id\n  GROUP BY c.region, c.customer_id\n)\nSELECT country, first_name, spent\nFROM country_spend\nWHERE rn = 1;",
      "tableScroll": false
    },
    {
      "id": 14,
      "title": "Departmental Salary Quintiles",
      "prompt": "Divide employees within each department into 5 quintiles using <code>NTILE(5)</code>. Return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>quintile</code> ordered by <code>department_id</code>, <code>salary DESC</code>.",
      "starterSql": "-- Departmental quintiles with NTILE(5)\nSELECT first_name, department_id, salary,\n       NTILE(5) OVER (PARTITION BY department_id ORDER BY salary DESC) AS quintile\nFROM employees\nORDER BY department_id, salary DESC;",
      "referenceSql": "SELECT first_name, department_id, salary, NTILE(5) OVER (PARTITION BY department_id ORDER BY salary DESC) AS quintile FROM employees ORDER BY department_id, salary DESC;",
      "solutionAudio": "Day15/New_Day15Question14sol.mp3",
      "solutionCode": "SELECT first_name, department_id, salary,\n       NTILE(5) OVER (PARTITION BY department_id ORDER BY salary DESC) AS quintile\nFROM employees\nORDER BY department_id, salary DESC;",
      "tableScroll": true
    },
    {
      "id": 15,
      "title": "Customer Order Chronology",
      "prompt": "Assign a sequential <code>order_seq</code> number to every order per customer ordered by <code>order_date ASC</code>. Return <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, and <code>order_seq</code>.",
      "starterSql": "-- Order sequence per customer\nSELECT customer_id, order_id, order_date,\n       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq\nFROM orders\nORDER BY customer_id, order_seq;",
      "referenceSql": "SELECT customer_id, order_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq FROM orders ORDER BY customer_id, order_seq;",
      "solutionAudio": "Day15/New_Day15Question15sol.mp3",
      "solutionCode": "SELECT customer_id, order_id, order_date,\n       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq\nFROM orders\nORDER BY customer_id, order_seq;",
      "tableScroll": true
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "prompt": "Which ranking function guarantees that every row receives a strictly unique consecutive integer with no ties and no gaps?",
      "options": ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"],
      "correct": 2,
      "explanation": "ROW_NUMBER() always assigns a unique sequential integer (1, 2, 3...) regardless of duplicate values in the sorting column."
    },
    {
      "id": 2,
      "type": "mcq",
      "prompt": "If two employees tie for 1st place in salary, what rank will the 3rd employee receive using RANK()?",
      "options": ["Rank 2", "Rank 3", "Rank 4", "Rank 1.5"],
      "correct": 1,
      "explanation": "RANK() assigns identical ranks (1, 1) to tied rows, but skips subsequent rank numbers by the number of ties. Thus, the 3rd employee receives rank 3."
    },
    {
      "id": 3,
      "type": "mcq",
      "prompt": "If two employees tie for 1st place in salary, what rank will the 3rd employee receive using DENSE_RANK()?",
      "options": ["Rank 2", "Rank 3", "Rank 4", "Rank 1"],
      "correct": 0,
      "explanation": "DENSE_RANK() never skips numbers. After tied ranks (1, 1), the immediate next distinct value receives rank 2."
    },
    {
      "id": 4,
      "type": "mcq",
      "prompt": "Why does the query `SELECT * FROM employees WHERE ROW_NUMBER() OVER (ORDER BY salary DESC) <= 3;` throw a syntax error?",
      "options": [
        "ROW_NUMBER() cannot be ordered descending",
        "Window functions are evaluated in the SELECT phase, so they cannot be filtered directly in WHERE",
        "OVER() requires a PARTITION BY clause",
        "Window functions only work inside subqueries"
      ],
      "correct": 1,
      "explanation": "In SQL logical execution, WHERE filters rows in Step 2, whereas window functions are evaluated in Step 6 (SELECT). You must wrap the calculation in a CTE or derived table to filter it."
    },
    {
      "id": 5,
      "type": "mcq",
      "prompt": "What is the purpose of NTILE(4)?",
      "options": [
        "Filters rows having value 4",
        "Divides rows into 4 approximately equal buckets (quartiles)",
        "Multiplies values by 4",
        "Returns the top 4 highest records"
      ],
      "correct": 1,
      "explanation": "NTILE(n) divides ordered rows into n equal statistical buckets (e.g. NTILE(4) produces quartiles 1 through 4)."
    },
    {
      "id": 6,
      "type": "mcq",
      "prompt": "Which function should you use to find the distinct 2nd highest salary in a table that may have ties for the highest salary?",
      "options": ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE(2)"],
      "correct": 2,
      "explanation": "DENSE_RANK() ensures that if multiple people share the #1 salary, the next distinct salary level is guaranteed to be rank 2."
    },
    {
      "id": 7,
      "type": "mcq",
      "prompt": "What does PARTITION BY department_id do inside an OVER() clause?",
      "options": [
        "Collapses rows into one row per department",
        "Restarts the ranking sequence from 1 for each department",
        "Filters out rows that do not have a department",
        "Sorts departments alphabetically"
      ],
      "correct": 1,
      "explanation": "PARTITION BY defines window boundaries; ranking counters restart from 1 at the beginning of each partition."
    },
    {
      "id": 8,
      "type": "mcq",
      "prompt": "What happens if PARTITION BY is omitted inside an OVER() clause?",
      "options": [
        "A syntax error is thrown",
        "The entire result set is evaluated as a single partition",
        "The function returns 0 for all rows",
        "The engine partitions by the primary key automatically"
      ],
      "correct": 1,
      "explanation": "Omitting PARTITION BY creates a single global window spanning all rows in the query."
    },
    {
      "id": 9,
      "type": "mcq",
      "prompt": "If a dataset of 11 rows is partitioned with NTILE(3), how many rows will be in each bucket?",
      "options": [
        "Bucket 1: 3, Bucket 2: 3, Bucket 3: 5",
        "Bucket 1: 4, Bucket 2: 4, Bucket 3: 3",
        "Bucket 1: 4, Bucket 2: 3, Bucket 3: 4",
        "Bucket 1: 3.66 in all buckets"
      ],
      "correct": 1,
      "explanation": "11 divided by 3 has remainder 2. The first 2 buckets receive 4 rows each (3+1), and the final bucket receives 3 rows (4, 4, 3)."
    },
    {
      "id": 10,
      "type": "mcq",
      "prompt": "In Snowflake and BigQuery, which clause allows direct filtering on window functions without a CTE?",
      "options": ["HAVING", "WHERE", "QUALIFY", "FILTER"],
      "correct": 2,
      "explanation": "QUALIFY is evaluated after window functions and allows direct filtering (e.g. QUALIFY ROW_NUMBER() OVER (...) = 1)."
    },
    {
      "id": 11,
      "type": "mcq",
      "prompt": "How does DENSE_RANK() handle NULL values when ORDER BY salary DESC is specified?",
      "options": [
        "NULLs are completely ignored and omitted from output",
        "NULLs appear first (or last depending on NULLS FIRST/LAST) and are grouped with rank 1 if first",
        "Throws a runtime exception",
        "Replaces NULL with 0"
      ],
      "correct": 1,
      "explanation": "NULLs are treated as identical values by window functions and receive the same rank."
    },
    {
      "id": 12,
      "type": "mcq",
      "prompt": "What index structure best optimizes a query using `ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY hire_date)`?",
      "options": [
        "Single-column index on hire_date",
        "Single-column index on dept_id",
        "Composite index on (dept_id, hire_date)",
        "Bitmap index on employee_id"
      ],
      "correct": 2,
      "explanation": "A composite index on (dept_id, hire_date) allows the query engine to read rows pre-partitioned and pre-sorted, avoiding in-memory sort operations."
    },
    {
      "id": 13,
      "type": "mcq",
      "prompt": "Which ranking function is standard practice for removing duplicate rows in a table?",
      "options": ["NTILE(1)", "RANK()", "ROW_NUMBER()", "DENSE_RANK()"],
      "correct": 2,
      "explanation": "ROW_NUMBER() uniquely identifies duplicates as rn > 1 when partitioned by the duplicate key columns."
    },
    {
      "id": 14,
      "type": "mcq",
      "prompt": "Can you use different PARTITION BY clauses on different columns in the same SELECT statement?",
      "options": [
        "No, all window functions in a query must share the same partition",
        "Yes, each window function can define its own independent PARTITION BY and ORDER BY",
        "Only if connected by UNION ALL",
        "Only in commercial engines like Oracle"
      ],
      "correct": 1,
      "explanation": "SQL allows multiple independent window specifications in the same SELECT statement."
    },
    {
      "id": 15,
      "type": "mcq",
      "prompt": "What is the primary difference in execution time complexity between window functions and correlated subqueries for ranking?",
      "options": [
        "Window functions are O(N²) while subqueries are O(N)",
        "Window functions are O(N log N) while correlated subqueries are O(N²)",
        "They have identical performance",
        "Correlated subqueries use indexes while window functions cannot"
      ],
      "correct": 1,
      "explanation": "Window functions process rows via a sorting pass in O(N log N) time, whereas correlated subqueries re-scan the table for every row, taking O(N²) time."
    },
    {
      "id": 16,
      "type": "mcq",
      "prompt": "What does `WINDOW w AS (PARTITION BY department_id ORDER BY salary DESC)` achieve at the end of a query?",
      "options": [
        "Creates a physical materialized view",
        "Defines a reusable named window to prevent duplicate OVER clauses",
        "Creates a temporary table on disk",
        "Executes a recursive loop"
      ],
      "correct": 1,
      "explanation": "The WINDOW clause defines a named window specification that can be referenced by multiple window functions in SELECT (e.g. OVER w)."
    },
    {
      "id": 17,
      "type": "mcq",
      "prompt": "In a table where 5 employees earn $100k and 1 earns $90k, what will DENSE_RANK() assign to the $90k earner?",
      "options": ["Rank 6", "Rank 2", "Rank 5", "Rank 1"],
      "correct": 1,
      "explanation": "All 5 employees earning $100k get DENSE_RANK 1. Because DENSE_RANK does not skip numbers, the $90k earner gets rank 2."
    },
    {
      "id": 18,
      "type": "mcq",
      "prompt": "In the same table (5 employees at $100k, 1 at $90k), what will RANK() assign to the $90k earner?",
      "options": ["Rank 2", "Rank 6", "Rank 5", "Rank 1"],
      "correct": 1,
      "explanation": "The 5 employees at $100k tie at rank 1. RANK() skips 2, 3, 4, and 5, assigning rank 6 to the $90k earner."
    },
    {
      "id": 19,
      "type": "mcq",
      "prompt": "Can aggregate functions like SUM(), AVG(), and COUNT() be used as window functions?",
      "options": [
        "No, only ROW_NUMBER, RANK, DENSE_RANK, and NTILE are window functions",
        "Yes, any aggregate function followed by an OVER() clause functions as a window function",
        "Only if PARTITION BY is omitted",
        "Only in PostgreSQL"
      ],
      "correct": 1,
      "explanation": "Adding an OVER() clause converts standard aggregate functions (SUM, AVG, COUNT, MIN, MAX) into window functions that calculate values without collapsing rows."
    },
    {
      "id": 20,
      "type": "mcq",
      "prompt": "What happens if two rows have identical values in ORDER BY when using ROW_NUMBER() without a secondary tie-breaker?",
      "options": [
        "Throws an error",
        "The assignment between the two tied rows is non-deterministic",
        "Both rows get the same integer",
        "The query hangs"
      ],
      "correct": 1,
      "explanation": "Without a deterministic tie-breaker column (like a primary key), the database engine arbitrarily decides which tied row gets which number."
    },
    {
      "id": 21,
      "type": "coding",
      "prompt": "Write a query to rank all employees globally by salary in descending order using <code>ROW_NUMBER()</code>. Return <code>first_name</code>, <code>salary</code>, and <code>rn</code>.",
      "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn FROM employees;"
    },
    {
      "id": 22,
      "type": "coding",
      "prompt": "Write a query to rank employees within each department by salary descending using <code>RANK()</code>. Return <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>rnk</code>.",
      "ref": "SELECT first_name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees;"
    },
    {
      "id": 23,
      "type": "coding",
      "prompt": "Using a CTE and <code>DENSE_RANK()</code>, return the 2nd highest distinct salary across the entire company.",
      "ref": "WITH r AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM r WHERE dr = 2;"
    },
    {
      "id": 24,
      "type": "coding",
      "prompt": "Divide products into 3 price tiers using <code>NTILE(3)</code> ordered by <code>unit_price DESC</code>. Return <code>name</code>, <code>unit_price</code>, and <code>price_tier</code>.",
      "ref": "SELECT name, unit_price, NTILE(3) OVER (ORDER BY unit_price DESC) AS price_tier FROM products;"
    },
    {
      "id": 25,
      "type": "coding",
      "prompt": "Using a CTE and <code>ROW_NUMBER()</code>, return the single highest-paid employee in each department. Return <code>first_name</code>, <code>department_id</code>, and <code>salary</code>.",
      "ref": "WITH r AS (SELECT first_name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees) SELECT first_name, department_id, salary FROM r WHERE rn = 1;"
    }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Ranking Window Functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)", "recordingKey": null }
  ]
};
