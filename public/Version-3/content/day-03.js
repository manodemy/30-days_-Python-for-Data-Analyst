// Day 03 — Filtering Data: WHERE, Comparison Operators, AND/OR/NOT, BETWEEN, IN, LIKE, IS NULL
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Filtering Data: WHERE & LIKE",
  "db": "retail",
  "emoji": "🔍",
  "slides": [
    {
      "title": "Filtering Data: WHERE, Operators & Pattern Matching",
      "duration": "4:53",
      "html": `
        <div class="slide-section" id="day03WhereSection">
          <h2>🔍 Filtering Data: WHERE, Operators &amp; Pattern Matching</h2>
          <h3 class="heading-with-audio" id="day03Where">
            01. The WHERE Clause — Row-Level Filtering
          </h3>
          <p>The <code>WHERE</code> clause is SQL's <strong>horizontal row-level filter</strong>. The database engine evaluates the boolean expression in <code>WHERE</code> for every candidate row produced by <code>FROM</code>. Only rows that evaluate to <code>TRUE</code> pass through — rows that evaluate to <code>FALSE</code> <em>or</em> <code>NULL</code> are silently discarded.</p>
        </div>

        <div class="slide-section" id="day03WhereCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">WHERE Clause — Minimal Anatomy</h4>
          </div>
          <div class="code-block-container" id="day03WhereCode">
            <div class="code-subblock" id="whereCodeSyntax">
              <pre><code><span class="code-comment">-- 1. Syntax Skeleton</span>
<span class="kw">SELECT</span> column1, column2
<span class="kw">FROM</span>   table_name
<span class="kw">WHERE</span>  condition;</code></pre>
            </div>

            <div class="code-subblock" id="whereCodeExample">
              <pre><code><span class="code-comment">-- 2. Concrete Example: High salary filter</span>
<span class="kw">SELECT</span> first_name, last_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > 80000;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03WhereInfoSection">
          <div class="info-box" id="day03WhereInfo">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">ℹ️ Execution Order:</strong>
            </div>
            <p>
              <code>WHERE</code> is Step 2 in SQL's logical execution order — <em>after</em> <code>FROM</code> but <em>before</em> <code>GROUP BY</code>, <code>HAVING</code>, and <code>SELECT</code>. This means <code>WHERE</code> <strong>cannot reference column aliases</strong> defined in the <code>SELECT</code> list because those aliases don't exist yet at filtering time.
            </p>

            <!-- ALIAS TIMELINE EMBED -->
            <div class="alias-timeline-wrapper">
              <style>
                #day03WhereInfo .alias-timeline-wrapper {
                  background: linear-gradient(135deg, #090e1a 0%, #050811 100%);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  border-radius: 12px;
                  padding: 18px 16px 22px;
                  margin-top: 12px;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
                }
                #day03WhereInfo .timeline-header-wrap {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 12px;
                  margin-bottom: 6px;
                }
                #day03WhereInfo .timeline-line-decorator {
                  flex: 1;
                  height: 1px;
                  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0) 100%);
                }
                #day03WhereInfo .timeline-header {
                  font-family: 'Inter', sans-serif;
                  font-size: 0.65rem;
                  font-weight: 800;
                  color:var(--ink-muted);
                  letter-spacing: 0.15em;
                  text-transform: uppercase;
                  white-space: nowrap;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                }
                #day03WhereInfo .alias-timeline-grid {
                  display: grid;
                  grid-template-columns: repeat(5, 1fr);
                  row-gap: 12px;
                  position: relative;
                  width: 100%;
                  margin-top: 8px;
                }
                #day03WhereInfo .timeline-track-line {
                  position: absolute;
                  top: 15px; /* aligns with center of dot wrapper (height 30px) */
                  left: 10%; /* Center of 1st column */
                  right: 10%; /* Center of 5th column */
                  height: 3px;
                  background: linear-gradient(to right, #3b82f6 0%, #06b6d4 25%, #a855f7 50%, #f97316 75%, #22c55e 100%);
                  z-index: 1;
                  border-radius: 2px;
                  opacity: 0.75;
                  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
                }
                #day03WhereInfo .timeline-node {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  z-index: 2;
                  position: relative;
                }
                #day03WhereInfo .timeline-dot-wrap {
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                #day03WhereInfo .timeline-dot {
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: #050811;
                  border: 3px solid var(--step-color);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 0 10px var(--step-color), inset 0 0 4px var(--step-color);
                  transition: transform 0.2s ease-in-out;
                }
                #day03WhereInfo .timeline-dot::after {
                  content: '';
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  background: var(--step-color);
                }
                #day03WhereInfo .timeline-label {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.58rem;
                  font-weight: 800;
                  color: var(--step-color);
                  margin-top: 4px;
                  text-align: center;
                  letter-spacing: 0.01em;
                  text-shadow: 0 0 8px rgba(var(--step-color-rgb), 0.2);
                }
                #day03WhereInfo .step-from { --step-color: #3b82f6; --step-color-rgb: 59, 130, 246; }
                #day03WhereInfo .step-where { --step-color: #06b6d4; --step-color-rgb: 6, 182, 212; }
                #day03WhereInfo .step-groupby { --step-color: #a855f7; --step-color-rgb: 168, 85, 247; }
                #day03WhereInfo .step-having { --step-color: #f97316; --step-color-rgb: 249, 115, 22; }
                #day03WhereInfo .step-select { --step-color: #22c55e; --step-color-rgb: 34, 197, 94; }

                #day03WhereInfo .bracket-item {
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-top: 6px;
                }
                #day03WhereInfo .bracket-shape {
                  height: 10px;
                  border-left: 2px solid var(--bracket-color);
                  border-right: 2px solid var(--bracket-color);
                  border-bottom: 2px solid var(--bracket-color);
                  border-radius: 0 0 6px 6px;
                  opacity: 0.8;
                }
                #day03WhereInfo .no-alias .bracket-shape {
                  width: 75%; /* Spans exactly center of col 1 to center of col 4 in 4-column space */
                  margin-left: 12.5%;
                  margin-right: 12.5%;
                }
                #day03WhereInfo .has-alias .bracket-shape {
                  width: 50%;
                  margin-left: 25%;
                  margin-right: 25%;
                }
                #day03WhereInfo .bracket-item.no-alias {
                  --bracket-color: #f87171;
                }
                #day03WhereInfo .bracket-item.has-alias {
                  --bracket-color: #4ade80;
                }
                #day03WhereInfo .bracket-content {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
                  white-space: nowrap;
                  margin-top: 6px;
                }
                #day03WhereInfo .bracket-icon {
                  font-size: 0.58rem;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                }
                #day03WhereInfo .bracket-text {
                  font-family: 'Inter', sans-serif;
                  font-size: 0.56rem;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.04em;
                  color: var(--bracket-color);
                }
                #day03WhereInfo .has-alias .bracket-text {
                  text-shadow: 0 0 8px rgba(74, 222, 128, 0.25);
                }
                #day03WhereInfo .no-alias .bracket-text {
                  text-shadow: 0 0 8px rgba(248, 113, 113, 0.25);
                }
                @media(max-width: 580px) {
                  #day03WhereInfo .timeline-label {
                    font-size: 0.5rem;
                  }
                  #day03WhereInfo .bracket-text {
                    font-size: 0.48rem;
                  }
                }
                @media(max-width: 400px) {
                  #day03WhereInfo .timeline-label {
                    font-size: 0.45rem;
                  }
                  #day03WhereInfo .bracket-text {
                    font-size: 0.42rem;
                  }
                }
              </style>
              
              <div class="timeline-header-wrap">
                <div class="timeline-line-decorator"></div>
                <div class="timeline-header">ALIAS LIFECYCLE</div>
                <div class="timeline-line-decorator"></div>
              </div>
              
              <div class="alias-timeline-grid">
                <div class="timeline-track-line"></div>
                
                <div class="timeline-node step-from" style="grid-column: 1;">
                  <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                  <div class="timeline-label">FROM</div>
                </div>
                <div class="timeline-node step-where" style="grid-column: 2;">
                  <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                  <div class="timeline-label">WHERE</div>
                </div>
                <div class="timeline-node step-groupby" style="grid-column: 3;">
                  <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                  <div class="timeline-label">GROUP BY</div>
                </div>
                <div class="timeline-node step-having" style="grid-column: 4;">
                  <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                  <div class="timeline-label">HAVING</div>
                </div>
                <div class="timeline-node step-select" style="grid-column: 5;">
                  <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                  <div class="timeline-label">SELECT</div>
                </div>
                
                <div class="bracket-item no-alias" style="grid-column: 1 / 5;">
                  <div class="bracket-shape"></div>
                  <div class="bracket-content">
                    <span class="bracket-icon">❌</span>
                    <span class="bracket-text">ALIAS DOESN'T EXIST</span>
                  </div>
                </div>
                <div class="bracket-item has-alias" style="grid-column: 5 / 6;">
                  <div class="bracket-shape"></div>
                  <div class="bracket-content">
                    <span class="bracket-icon">✅</span>
                    <span class="bracket-text">ALIAS CREATED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03CompOpsSection">
          <h3 class="heading-with-audio" id="day03CompOps">
            02. Comparison Operators — The Building Blocks
          </h3>
          <p>Every <code>WHERE</code> predicate is built from comparison operators. Each one compares a column value to a literal, another column, or an expression and returns <code>TRUE</code>, <code>FALSE</code>, or <code>UNKNOWN</code> (when <code>NULL</code> is involved).</p>
        </div>

        <div class="slide-section" id="day03OpsTableSection">
          <div class="db-mock-table-wrap" id="day03OpsTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">Comparison Operator Reference</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Live Example</th></tr></thead>
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

        <div class="slide-section" id="day03CompCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">Comparison Operator Examples</h4>
          </div>
          <div class="code-block-container" id="day03CompCode">
            <div class="code-subblock" id="compCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Earning more than ₹60,000</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > 60000;</code></pre>
            </div>

            <div class="code-subblock" id="compCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Products where stock quantity is zero or less</span>
<span class="kw">SELECT</span> name, stock_qty
<span class="kw">FROM</span>   products
<span class="kw">WHERE</span>  stock_qty <= 0;</code></pre>
            </div>

            <div class="code-subblock" id="compCodeQuery3">
              <pre><code><span class="code-comment">-- 3. Exclude a specific department with not-equal</span>
<span class="kw">SELECT</span> first_name, department_id
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  department_id <> 10;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03LogicOps">
            03. Logical Operators — Combining Conditions
          </h3>
          <p id="day03LogicIntro">Logical operators let you compose complex filters from simple predicates.</p>

          <div id="day03PrecWrap" style="width:100%;margin:14px 0 16px">
            <style>
              #day03PrecWrap .prec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
              #day03PrecWrap .prec-card{background:rgba(9,15,28,0.94)!important;color:#f8fafc!important;border:1px solid rgba(255,255,255,0.08)!important;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;animation:precReveal 0.45s ease both;transition:opacity 0.45s ease, transform 0.45s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;overflow:hidden;position:relative}
              #day03PrecWrap .prec-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.12)}

              /* Smooth card transitions matching Day 01 standard */
              #day03PrecWrap .prec-card {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
              }
              
              #day03PrecWrap .prec-card--not{border-top:3px solid #ef4444!important; --highlight-color: #ef4444; --highlight-color-rgb: 239, 68, 68;}
              #day03PrecWrap .prec-card--and{border-top:3px solid #f59e0b!important; --highlight-color: #f59e0b; --highlight-color-rgb: 245, 158, 11;}
              #day03PrecWrap .prec-card--or{border-top:3px solid #10b981!important; --highlight-color: #10b981; --highlight-color-rgb: 16, 185, 129;}

              #day03PrecWrap .prec-card.narration-highlight {
                border-color: var(--highlight-color) !important;
                box-shadow: 0 12px 28px -6px rgba(var(--highlight-color-rgb), 0.4), 0 0 20px rgba(var(--highlight-color-rgb), 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                transform: translateY(-4px) scale(1.02);
                z-index: 10;
              }
              #day03PrecWrap .prec-card--not.narration-highlight { background: #170e14 !important; }
              #day03PrecWrap .prec-card--and.narration-highlight { background: #181308 !important; }
              #day03PrecWrap .prec-card--or.narration-highlight { background: #081712 !important; }



              #day03LogicIntro {
                transition: color 0.3s ease, text-shadow 0.3s ease;
              }
              #day03LogicIntro.narration-highlight {
                color: #f8fafc !important;
                text-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
              }

              #day03PrecWrap .precedence-note {
                transition: opacity 0.4s ease, transform 0.4s ease, border-left-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
              }

              #day03PrecWrap.narration-active .precedence-note {
                opacity: 0;
                transform: translateY(10px);
              }

              #day03PrecWrap.narration-active .precedence-note.revealed {
                opacity: 1;
                transform: translateY(0);
              }

              #day03PrecedenceNote.narration-highlight {
                border-left-color: #60a5fa !important;
                box-shadow: 0 0 20px rgba(96, 165, 250, 0.35) !important;
                background: rgba(59, 130, 246, 0.1) !important;
              }

              #day03PrecWrap .prec-header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                padding-bottom: 8px;
                margin-bottom: 2px;
              }
              
              #day03PrecWrap .prec-op {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.72rem;
                font-weight: 800;
                padding: 3px 10px;
                border-radius: 6px;
                letter-spacing: 0.04em;
                text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                box-shadow: 0 2px 6px rgba(0,0,0,0.25);
              }
              
              #day03PrecWrap .prec-op--not {
                background: linear-gradient(135deg, #ef4444, #b91c1c);
                color: #fff;
                border: 1px solid rgba(239, 68, 68, 0.4);
              }
              
              #day03PrecWrap .prec-op--and {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: #fff;
                border: 1px solid rgba(245, 158, 11, 0.4);
              }
              
              #day03PrecWrap .prec-op--or {
                background: linear-gradient(135deg, #10b981, #047857);
                color: #fff;
                border: 1px solid rgba(16, 185, 129, 0.4);
              }
              
              #day03PrecWrap .prec-priority {
                display: flex;
                align-items: center;
              }
              
              #day03PrecWrap .prec-priority .label {
                font-family: 'Inter', sans-serif;
                font-size: 0.58rem;
                font-weight: 800;
                letter-spacing: 0.06em;
              }
              
              #day03PrecWrap .prec-priority--1 .label { color:var(--ink-neg); }
              #day03PrecWrap .prec-priority--2 .label { color:var(--ink-warn); }
              #day03PrecWrap .prec-priority--3 .label { color:var(--ink-pos); }
              
              #day03PrecWrap .prec-venn{width:100%;background:rgba(5, 8, 16, 0.7);border-radius:8px;padding:0;border:1px solid rgba(255, 255, 255, 0.08);box-sizing:border-box;overflow:hidden;display:flex;align-items:center;justify-content:center}

              #day03PrecWrap .formula-bar {
                display: flex;
                justify-content: center;
                margin: 4px 0 2px 0;
              }
              #day03PrecWrap .formula-badge {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.70rem;
                font-weight: 700;
                padding: 3px 8px;
                border-radius: 6px;
                letter-spacing: 0.01em;
                box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
                white-space: nowrap;
              }
              #day03PrecWrap .formula-badge--not {
                background: rgba(239, 68, 68, 0.12) !important;
                color:var(--ink-neg) !important;
                border: 1px solid rgba(239, 68, 68, 0.25) !important;
              }
              #day03PrecWrap .formula-badge--and {
                background: rgba(245, 158, 11, 0.12) !important;
                color:var(--ink-warn) !important;
                border: 1px solid rgba(245, 158, 11, 0.25) !important;
              }
              #day03PrecWrap .formula-badge--or {
                background: rgba(16, 185, 129, 0.12) !important;
                color:var(--ink-pos) !important;
                border: 1px solid rgba(16, 185, 129, 0.25) !important;
              }

              #day03PrecWrap .prec-list {
                list-style-type: disc !important;
                padding: 0 0 0 14px !important;
                margin: 6px 0 0 0 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 5px !important;
              }
              #day03PrecWrap .prec-list li {
                font-size: 0.72rem !important;
                line-height: 1.45 !important;
                color: #cbd5e1 !important; /* Force readable light text */
                margin-bottom: 0 !important;
                padding: 0 !important;
                display: list-item !important;
              }
              #day03PrecWrap .prec-list li::marker {
                color: var(--bullet-color) !important;
                font-size: 0.78rem !important;
              }
              #day03PrecWrap .prec-list li strong {
                color: #f8fafc !important; /* Force high-contrast white labels */
              }

              @keyframes precReveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
              @media(max-width:768px){#day03PrecWrap .prec-grid{grid-template-columns:1fr;gap:12px}}
            </style>
            
            <div class="prec-grid">
              <!-- CARD 1: NOT -->
              <div class="prec-card prec-card--not" style="--d:0.15s;animation-delay:0.15s">
                <div class="prec-header">
                  <div class="prec-op prec-op--not">NOT</div>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="25 15 150 80" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-not" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.35"/>
                        <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
                      </radialGradient>
                      <mask id="not-a-mask">
                        <rect x="0" y="0" width="200" height="110" fill="#ffffff" />
                        <circle cx="75" cy="55" r="38" fill="#000000" />
                      </mask>
                    </defs>
                    <pattern id="grid-pattern-1" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect x="0" y="0" width="200" height="110" fill="url(#grid-pattern-1)" rx="4" />
                    <!-- Universal Set Glow without outer stroke box -->
                    <rect x="0" y="0" width="200" height="110" fill="url(#glow-not)" mask="url(#not-a-mask)" />
                    <rect x="0" y="0" width="200" height="110" fill="rgba(239, 68, 68, 0.06)" mask="url(#not-a-mask)" />
                    
                    <!-- Circle Wireframes -->
                    <circle cx="75" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.12)" stroke-dasharray="2 2" stroke-width="1.2" />
                    <circle cx="125" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
                    
                    <!-- Text Labels -->
                    <text x="75" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.3)" text-anchor="middle">A</text>
                    <text x="125" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.85)" text-anchor="middle">B</text>
                  </svg>
                </div>

                <!-- Formula badge -->
                <div class="formula-bar">
                  <span class="formula-badge formula-badge--not">NOT A = A′ = U ∖ A</span>
                </div>
                
                <ul class="prec-list" style="--bullet-color: #ef4444;">
                  <li><strong>Unary:</strong> Negates a condition</li>
                  <li><strong>Complement:</strong> Area outside A</li>
                  <li><strong>1st Priority:</strong> Evaluated first</li>
                </ul>
              </div>
              
              <!-- CARD 2: AND -->
              <div class="prec-card prec-card--and" style="--d:0.3s;animation-delay:0.3s">
                <div class="prec-header">
                  <div class="prec-op prec-op--and">AND</div>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="25 15 150 80" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-and" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45"/>
                        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                      </radialGradient>
                      <clipPath id="intersect-clip">
                        <circle cx="75" cy="55" r="38" />
                      </clipPath>
                    </defs>
                    <pattern id="grid-pattern-2" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect x="0" y="0" width="200" height="110" fill="url(#grid-pattern-2)" rx="4" />
                    
                    <!-- Highlighted Intersection Area -->
                    <circle cx="125" cy="55" r="38" fill="url(#glow-and)" clip-path="url(#intersect-clip)" />
                    <circle cx="125" cy="55" r="38" fill="rgba(245, 158, 11, 0.16)" clip-path="url(#intersect-clip)" />
                    <circle cx="125" cy="55" r="38" fill="none" stroke="#f59e0b" stroke-width="1.8" clip-path="url(#intersect-clip)" />

                    <!-- Circle Wireframes -->
                    <circle cx="75" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
                    <circle cx="125" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
                    
                    <!-- Text Labels -->
                    <text x="50" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.85)" text-anchor="middle">A</text>
                    <text x="150" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.85)" text-anchor="middle">B</text>
                  </svg>
                </div>

                <!-- Formula badge -->
                <div class="formula-bar">
                  <span class="formula-badge formula-badge--and">A AND B = A ∩ B</span>
                </div>
                
                <ul class="prec-list" style="--bullet-color: #f59e0b;">
                  <li><strong>Binary:</strong> Both must be TRUE</li>
                  <li><strong>Intersection:</strong> Overlapping area</li>
                  <li><strong>2nd Priority:</strong> Binds tighter than OR</li>
                </ul>
              </div>
              
              <!-- CARD 3: OR -->
              <div class="prec-card prec-card--or" style="--d:0.45s;animation-delay:0.45s">
                <div class="prec-header">
                  <div class="prec-op prec-op--or">OR</div>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="25 15 150 80" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-or" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
                        <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                      </radialGradient>
                    </defs>
                    <pattern id="grid-pattern-3" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect x="0" y="0" width="200" height="110" fill="url(#grid-pattern-3)" rx="4" />
                    
                    <!-- Highlighted Union Area -->
                    <circle cx="75" cy="55" r="38" fill="url(#glow-or)" />
                    <circle cx="125" cy="55" r="38" fill="url(#glow-or)" />
                    <circle cx="75" cy="55" r="38" fill="rgba(16, 185, 129, 0.1)" />
                    <circle cx="125" cy="55" r="38" fill="rgba(16, 185, 129, 0.1)" />
                    
                    <!-- Circle Wireframes / Borders -->
                    <circle cx="75" cy="55" r="38" fill="none" stroke="#10b981" stroke-width="1.5" />
                    <circle cx="125" cy="55" r="38" fill="none" stroke="#10b981" stroke-width="1.5" />
                    
                    <!-- Text Labels -->
                    <text x="58" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
                    <text x="142" y="59" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
                  </svg>
                </div>

                <!-- Formula badge -->
                <div class="formula-bar">
                  <span class="formula-badge formula-badge--or">A OR B = A ∪ B</span>
                </div>
                
                <ul class="prec-list" style="--bullet-color: #10b981;">
                  <li><strong>Binary:</strong> One must be TRUE</li>
                  <li><strong>Union:</strong> Combined area</li>
                  <li><strong>3rd Priority:</strong> Evaluated last</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03PrecedenceSection">
          <div class="precedence-note" id="day03PrecedenceNote" style="margin: 0; padding: 16px; background: rgba(59, 130, 246, 0.08); border-left: 4px solid #3b82f6; border-top: 1px solid rgba(255,255,255,0.08); border-right: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="color:var(--ink-link); font-weight: 800; font-size: 0.90rem; display: inline-flex; align-items: center; gap: 6px;">⚠️ Operator Precedence Rule</span>
            </div>
            <p style="margin: 0; font-size: 0.85rem; line-height: 1.65; color: var(--theory-text);">
              SQL evaluates them in <strong>operator precedence</strong> order: <code>NOT</code> binds tightest → then <code>AND</code> → then <code>OR</code>. Mixing <code>AND</code> and <code>OR</code> without parentheses is a classic bug source — always use brackets to make your intent explicit.
            </p>
          </div>
        </div>

        <div class="slide-section" id="day03LogicCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; color: var(--theory-heading); font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">AND / OR / NOT Examples</h4>
          </div>
          <div class="code-block-container" id="day03LogicCode">
            <div class="code-subblock" id="logicCodeQuery1">
              <pre><code><span class="code-comment">-- 1. AND: Active employees in department 20</span>
<span class="kw">SELECT</span> first_name, department_id, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  is_active = 1
  <span class="kw">AND</span>  department_id = 20;</code></pre>
            </div>

            <div class="code-subblock" id="logicCodeQuery2">
              <pre><code><span class="code-comment">-- 2. OR: Customers in the North or South region</span>
<span class="kw">SELECT</span> first_name, region
<span class="kw">FROM</span>   customers
<span class="kw">WHERE</span>  region = 'North'
   <span class="kw">OR</span>  region = 'South';</code></pre>
            </div>

            <div class="code-subblock" id="logicCodeQuery3">
              <pre><code><span class="code-comment">-- 3. NOT with LIKE: Exclude a naming pattern</span>
<span class="kw">SELECT</span> customer_id, email
<span class="kw">FROM</span>   customers
<span class="kw">WHERE</span>  email <span class="kw">NOT LIKE</span> '%@gmail.com';</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03LogicWarnSection">
          <div class="warn-box" id="day03LogicWarn">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-neg);">⚠️ Precedence Trap:</strong>
            </div>
            <p>
              <code>WHERE dept = 10 OR dept = 20 AND salary &gt; 60000</code> is parsed as <code>WHERE dept = 10 OR (dept = 20 AND salary &gt; 60000)</code> — which is very different from filtering both departments! Always wrap <code>OR</code> groups in parentheses: <code>WHERE (dept = 10 OR dept = 20) AND salary &gt; 60000</code>.
            </p>
          </div>
        </div>

        <div class="slide-section" id="day03BetweenSection">
          <h3 class="heading-with-audio" id="day03Between">
            04. BETWEEN — Inclusive Range Filter
          </h3>
          <p><code>BETWEEN low AND high</code> is a clean shorthand for <code>&gt;= low AND &lt;= high</code>. <strong>Both endpoints are inclusive.</strong> It works on numbers, dates, and text (lexicographic order for text).</p>
        </div>

        <div class="slide-section" id="day03BetweenCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">BETWEEN — Numeric, Date, and NOT BETWEEN</h4>
          </div>
          <div class="code-block-container" id="day03BetweenCode">
            <div class="code-subblock" id="betweenCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Numeric: salary range (inclusive on both ends)</span>
<span class="kw">SELECT</span> first_name, last_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary <span class="kw">BETWEEN</span> 50000 <span class="kw">AND</span> 90000;

<span class="code-comment">-- Equivalent using explicit operators:</span>
<span class="code-comment">-- WHERE salary &gt;= 50000 AND salary &lt;= 90000</span></code></pre>
            </div>

            <div class="code-subblock" id="betweenCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Date range: all orders placed in 2024</span>
<span class="kw">SELECT</span> order_id, order_date, total_amount
<span class="kw">FROM</span>   orders
<span class="kw">WHERE</span>  order_date <span class="kw">BETWEEN</span> '2024-01-01' <span class="kw">AND</span> '2024-12-31';</code></pre>
            </div>

            <div class="code-subblock" id="betweenCodeQuery3">
              <pre><code><span class="code-comment">-- 3. NOT BETWEEN: products outside a price band</span>
<span class="kw">SELECT</span> name, unit_price
<span class="kw">FROM</span>   products
<span class="kw">WHERE</span>  unit_price <span class="kw">NOT BETWEEN</span> 1000 <span class="kw">AND</span> 5000;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03BetweenVsSection">
          <div class="vs-block" id="day03BetweenVs">
            <div class="vs-card" id="day03BetweenOk">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">✅ BETWEEN — Correct Usage</span>
              </h4>
              <ul>
                <li>Always put the <em>smaller</em> value first: <code>BETWEEN 50 AND 100</code></li>
                <li><code>BETWEEN 100 AND 50</code> returns zero rows — it's valid SQL but logically empty</li>
                <li>Works on <code>DATE</code>, <code>DATETIME</code>, <code>INT</code>, <code>DECIMAL</code>, and <code>VARCHAR</code></li>
              </ul>
            </div>
            <div class="vs-card" id="day03BetweenDateTip">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">⏰ Date Precision Gotcha</span>
              </h4>
              <ul>
                <li>A range like <code>BETWEEN '2024-01-01' AND '2024-12-31'</code> truncates the end date to <code>2024-12-31 00:00:00</code> on <code>DATETIME</code> columns.</li>
                <li>This means any records or transactions occurring later in the day on December 31st will be completely missed.</li>
                <li><strong>Safer Pattern:</strong> Avoid <code>BETWEEN</code> for date ranges; use <code>order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code> instead.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03InSection">
          <h3 class="heading-with-audio" id="day03In">
            05. IN — Matching a List of Values
          </h3>
          <p><code>IN (...)</code> is a compact replacement for chained <code>OR</code> conditions. The engine checks whether a column's value exists in the provided list. <code>NOT IN</code> inverts that check — returning only rows whose value is absent from the list.</p>
        </div>

        <div class="slide-section" id="day03InCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">IN / NOT IN Examples</h4>
          </div>
          <div class="code-block-container" id="day03InCode">
            <div class="code-subblock" id="inCodeQuery1">
              <pre><code><span class="code-comment">-- 1. IN with numbers (equivalent to chained OR conditions)</span>
<span class="kw">SELECT</span> first_name, department_id
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  department_id <span class="kw">IN</span> (10, 20, 30);</code></pre>
            </div>

            <div class="code-subblock" id="inCodeQuery2">
              <pre><code><span class="code-comment">-- 2. IN with strings: customers in targeted sales regions</span>
<span class="kw">SELECT</span> customer_id, first_name, region
<span class="kw">FROM</span>   customers
<span class="kw">WHERE</span>  region <span class="kw">IN</span> ('North', 'South', 'East');</code></pre>
            </div>

            <div class="code-subblock" id="inCodeQuery3">
              <pre><code><span class="code-comment">-- 3. NOT IN: exclude specified departments</span>
<span class="kw">SELECT</span> first_name, department_id
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  department_id <span class="kw">NOT IN</span> (10, 20);</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03InWarnSection">
          <div class="warn-box" id="day03InWarn">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ NOT IN with NULLs — Silent Data Loss:</strong>
            </div>
            <p>
              If the list passed to <code>NOT IN</code> contains even a single <code>NULL</code>, the entire query returns <strong>zero rows</strong>. Why? Every comparison with <code>NULL</code> yields <code>UNKNOWN</code>, not <code>TRUE</code>, so the <code>WHERE</code> filter passes nothing. When the list comes from a subquery that might return <code>NULL</code>, use <code>NOT EXISTS</code> or add <code>WHERE col IS NOT NULL</code> to the subquery.
            </p>
          </div>
        </div>

        <div class="slide-section" id="day03LikeSection">
          <h3 class="heading-with-audio" id="day03Like">
            06. LIKE — Pattern Matching with Wildcards
          </h3>
          <p><code>LIKE</code> performs pattern-based string matching using two special wildcard characters. It is the go-to operator for partial text searches — such as finding all customers whose name starts with a letter or all emails from a specific domain.</p>
        </div>

        <div class="slide-section" id="day03LikeVsSection">
          <div class="vs-block" id="day03LikeVs">
            <div class="vs-card" id="day03LikePercent">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;"><code>%</code> — Zero or More Characters</span>
              </h4>
              <pre><code>-- Names starting with 'R'
WHERE first_name LIKE 'R%'

-- Names ending with 'a'
WHERE first_name LIKE '%a'

-- Names containing 'esh' anywhere
WHERE first_name LIKE '%esh%'

-- Emails from gmail
WHERE email LIKE '%@gmail.com'</code></pre>
            </div>
            <div class="vs-card" id="day03LikeUnderscore">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;"><code>_</code> — Exactly One Character</span>
              </h4>
              <pre><code>-- Exactly 5-letter names starting with 'R'
WHERE first_name LIKE 'R____'

-- 3-char product codes like 'A1B'
WHERE product_code LIKE '___'

-- NOT LIKE to exclude a pattern
WHERE email NOT LIKE '%@gmail%'

-- Combined wildcards
WHERE name LIKE '_oo%'  -- 2nd/3rd = 'oo'</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03LikeCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">LIKE in Context — Full Query Examples</h4>
          </div>
          <div class="code-block-container" id="day03LikeCode">
            <div class="code-subblock" id="likeCodeQuery1">
              <pre><code><span class="code-comment">-- 1. First name starts with 'S' (% matches remaining chars)</span>
<span class="kw">SELECT</span> first_name, last_name
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  first_name <span class="kw">LIKE</span> 'S%';</code></pre>
            </div>

            <div class="code-subblock" id="likeCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Products whose name contains 'Mouse' anywhere (%...%)</span>
<span class="kw">SELECT</span> name, unit_price
<span class="kw">FROM</span>   products
<span class="kw">WHERE</span>  name <span class="kw">LIKE</span> '%Mouse%';</code></pre>
            </div>

            <div class="code-subblock" id="likeCodeQuery3">
              <pre><code><span class="code-comment">-- 3. NOT LIKE: exclude all Gmail addresses</span>
<span class="kw">SELECT</span> customer_id, email
<span class="kw">FROM</span>   customers
<span class="kw">WHERE</span>  email <span class="kw">NOT LIKE</span> '%@gmail.com';</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03LikeTipSection">
          <div class="pro-tip-box" id="day03LikeTip">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-warn); flex: 1;">💡 Case Sensitivity by Engine:</strong>
            </div>
            <p>
              In <strong>SQLite</strong> and <strong>MySQL</strong>, <code>LIKE</code> is case-insensitive for ASCII characters by default. In <strong>PostgreSQL</strong>, <code>LIKE</code> is case-sensitive — use <code>ILIKE</code> for a case-insensitive match. In <strong>SQL Server</strong>, behaviour depends on the column's collation setting.
            </p>
          </div>
        </div>

        <div class="slide-section" id="day03NullSection">
          <h3 class="heading-with-audio" id="day03Null">
            07. IS NULL &amp; IS NOT NULL — Handling Missing Values
          </h3>
          <p><code>NULL</code> in SQL represents a <strong>missing, unknown, or inapplicable value</strong>. A column is <code>NULL</code> when no data was provided. The critical rule: <strong>you cannot test for NULL with <code>=</code></strong> — the result is always <code>UNKNOWN</code>, never <code>TRUE</code>. Always use <code>IS NULL</code> or <code>IS NOT NULL</code>.</p>
        </div>

        <div class="slide-section" id="day03NullCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0;  font-size: 1.0rem; font-weight: 800; letter-spacing: -0.01em; flex: 1;">IS NULL / IS NOT NULL Examples</h4>
          </div>
          <div class="code-block-container" id="day03NullCode">
            <div class="code-subblock" id="nullCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Top-level employees (no manager assigned)</span>
<span class="kw">SELECT</span> first_name, manager_id
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  manager_id <span class="kw">IS NULL</span>;</code></pre>
            </div>

            <div class="code-subblock" id="nullCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Employees who report to someone (manager is present)</span>
<span class="kw">SELECT</span> first_name, manager_id
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  manager_id <span class="kw">IS NOT NULL</span>;</code></pre>
            </div>

            <div class="code-subblock" id="nullCodeQuery3">
              <pre><code><span class="code-comment">-- 3. Employees with no commission assigned</span>
<span class="kw">SELECT</span> first_name, last_name, commission
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  commission <span class="kw">IS NULL</span>;</code></pre>
            </div>

            <div class="code-subblock" id="nullCodeQuery4">
              <pre><code><span class="code-comment">-- 4. Active employees who do earn a commission</span>
<span class="kw">SELECT</span> first_name, commission
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  is_active = 1
  <span class="kw">AND</span>  commission <span class="kw">IS NOT NULL</span>;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day03NullVsSection">
          <div class="vs-block" id="day03NullVs">
            <div class="vs-card" id="day03NullWrong">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">❌ Wrong — Returns No Rows</span>
              </h4>
              <pre><code>-- = NULL always yields UNKNOWN
WHERE commission = NULL    -- ❌

-- != NULL also always UNKNOWN
WHERE commission != NULL   -- ❌</code></pre>
              <p style="font-size:0.72rem;color:#f87171;margin:6px 0 0;">These return zero rows regardless of data because any comparison with <code>NULL</code> produces <code>UNKNOWN</code>, and <code>WHERE</code> only keeps <code>TRUE</code>.</p>
            </div>
            <div class="vs-card" id="day03NullRight">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">✅ Correct — Use IS NULL</span>
              </h4>
              <pre><code>-- Correctly finds NULL rows
WHERE commission IS NULL     -- ✅

-- Correctly excludes NULL rows
WHERE commission IS NOT NULL -- ✅</code></pre>
              <p style="font-size:0.72rem;color:var(--ink-pos);margin:6px 0 0;"><code>IS NULL</code> is a special predicate built to detect the absence of a value — it correctly returns <code>TRUE</code> for NULL rows.</p>
            </div>
          </div>
        </div>

        <!-- ── Interview Q&A Consolidated Section ── -->
        <div class="slide-section" id="day03QASection">
          <div class="interview-box">
            <h4 id="day03QAHeading">🎓 Interview Insights &amp; Q&amp;A</h4>

            <div id="day03QANull">
              <p><strong>Q: Why does <code>WHERE commission = NULL</code> return no rows, even when commission is NULL for several employees?</strong></p>
              <p><em>A: In SQL, NULL represents an <strong>unknown value</strong>. Any comparison involving NULL — including <code>= NULL</code>, <code>!= NULL</code>, or arithmetic — returns a third truth value called <strong>UNKNOWN</strong> (not TRUE, not FALSE). The WHERE clause only retains rows that evaluate to TRUE, so UNKNOWN rows are silently discarded. The correct syntax is <code>WHERE commission IS NULL</code>, which is a special predicate designed specifically to detect the absence of a value.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day03QANotIn">
              <p><strong>Q: You write <code>WHERE department_id NOT IN (SELECT dept_id FROM inactive_depts)</code> and get zero rows back — but you know there are valid employees. What is the likely cause?</strong></p>
              <p><em>A: The subquery is almost certainly returning at least one <code>NULL</code> value. When <code>NOT IN</code> is evaluated, SQL internally expands it into a chain of <code>AND column != val1 AND column != val2 ...</code>. Any comparison of a column against <code>NULL</code> produces <code>UNKNOWN</code>, which makes the entire AND-chain UNKNOWN — causing every row to be filtered out. The fix is to add <code>WHERE dept_id IS NOT NULL</code> to the subquery, or to rewrite with <code>NOT EXISTS</code> which handles NULLs correctly.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day03QALike">
              <p><strong>Q: What is the performance impact of leading-wildcard LIKE patterns such as <code>WHERE name LIKE '%Manager%'</code>?</strong></p>
              <p><em>A: A leading <code>%</code> wildcard forces a <strong>full table scan</strong> — the database engine cannot use a B-tree index on the <code>name</code> column because the index is ordered by the start of the string, not by what's in the middle. This is one of the most common performance anti-patterns in SQL. For large tables, the solution is a <strong>Full-Text Search index</strong> (e.g., <code>FULLTEXT</code> in MySQL, <code>tsvector</code> in PostgreSQL, or <code>CONTAINS</code> in SQL Server) which is optimised for substring and keyword lookups. If you can anchor the pattern to the start (e.g., <code>LIKE 'Manager%'</code>), the index can be used.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: High-Value Products</strong><br/>Retrieve the <code>name</code> and <code>unit_price</code> of all products with a price greater than 10000. Sort by price descending.",
      "referenceSql": "SELECT name,\n       unit_price\nFROM   products\nWHERE  unit_price > 10000\nORDER BY unit_price DESC;",
      "questionAudio": "Day03/New_Day3Question01.mp3",
      "solutionAudio": "Day03/New_Day3Question01sol.mp3"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Regional Customers</strong><br/>Retrieve <code>first_name</code>, <code>last_name</code>, and <code>region</code> for customers in the <code>'North'</code> or <code>'East'</code> region. Use the <code>IN</code> operator.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       region\nFROM   customers\nWHERE  region IN ('North', 'East');",
      "questionAudio": "Day03/New_Day3Question02.mp3",
      "solutionAudio": "Day03/New_Day3Question02sol.mp3"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Mid-Range Salary Band</strong><br/>Find employees earning between 60000 and 100000 (inclusive). Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary BETWEEN 60000 AND 100000;",
      "questionAudio": "Day03/New_Day3Question03.mp3",
      "solutionAudio": "Day03/New_Day3Question03sol.mp3"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Name Pattern Search</strong><br/>Find all employees whose <code>first_name</code> starts with the letter <code>'S'</code>. Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  first_name LIKE 'S%';",
      "questionAudio": "Day03/New_Day3Question04.mp3",
      "solutionAudio": "Day03/New_Day3Question04sol.mp3"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Active Data Science Team</strong><br/>Find active employees (<code>is_active = 1</code>) in department 20. Retrieve <code>first_name</code>, <code>department_id</code>, and <code>salary</code>. Use <code>AND</code>.",
      "referenceSql": "SELECT first_name,\n       department_id,\n       salary\nFROM   employees\nWHERE  is_active = 1\n  AND  department_id = 20;",
      "questionAudio": "Day03/New_Day3Question05.mp3",
      "solutionAudio": "Day03/New_Day3Question05sol.mp3"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Employees Without Commission</strong><br/>Find all employees who have no commission assigned (<code>commission IS NULL</code>). Retrieve <code>first_name</code>, <code>last_name</code>, and <code>commission</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       commission\nFROM   employees\nWHERE  commission IS NULL;",
      "questionAudio": "Day03/New_Day3Question06.mp3",
      "solutionAudio": "Day03/New_Day3Question06sol.mp3"
    }
  ],

  "testQuestions": [
    { "id": 1, "prompt": "Finance wants a high-earners list. From <code>employees</code>, retrieve all records where <code>salary</code> exceeds 80000.", "ref": "SELECT * FROM employees WHERE salary > 80000;" },
    { "id": 2, "prompt": "A budget filter is needed on the catalogue. From <code>products</code>, find all items where <code>unit_price</code> is ₹2000 or below.", "ref": "SELECT * FROM products WHERE unit_price <= 2000;" },
    { "id": 3, "prompt": "The North region sales team needs their customer list. From <code>customers</code>, return all rows where <code>region</code> equals <code>'North'</code>.", "ref": "SELECT * FROM customers WHERE region = 'North';" },
    { "id": 4, "prompt": "HR wants senior staff in one department. From <code>employees</code>, find everyone in <code>department_id</code> 10 who earns more than 70000.", "ref": "SELECT * FROM employees WHERE department_id = 10 AND salary > 70000;" },
    { "id": 5, "prompt": "Two departments are being audited. Use <code>IN</code> to fetch all employees from <code>employees</code> whose <code>department_id</code> is either 10 or 20.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20);" },
    { "id": 6, "prompt": "A report only covers mid-range transactions. From <code>orders</code>, retrieve all rows where <code>total_amount</code> falls between 5000 and 50000 (inclusive).", "ref": "SELECT * FROM orders WHERE total_amount BETWEEN 5000 AND 50000;" },
    { "id": 7, "prompt": "Your manager asks: &quot;Who are our newest customers?&quot; From <code>customers</code>, find everyone who signed up after <code>'2022-12-31'</code>.", "ref": "SELECT * FROM customers WHERE signup_date > '2022-12-31';" },
    { "id": 8, "prompt": "A customer searched for &quot;Mouse&quot;. From <code>products</code>, find all items whose <code>name</code> contains the word <code>'Mouse'</code> — use <code>LIKE</code>.", "ref": "SELECT * FROM products WHERE name LIKE '%Mouse%';" },
    { "id": 9, "prompt": "Who reports to nobody? From <code>employees</code>, identify all top-level staff where <code>manager_id</code> <code>IS NULL</code>.", "ref": "SELECT * FROM employees WHERE manager_id IS NULL;" },
    { "id": 10, "prompt": "Ops wants to follow up on unshipped orders. From <code>orders</code>, retrieve all rows where <code>status</code> is not <code>'Shipped'</code>.", "ref": "SELECT * FROM orders WHERE status <> 'Shipped';" },
    { "id": 11, "prompt": "Compensation planning needs a mid-range band. From <code>employees</code>, retrieve all rows where <code>salary</code> is between 45000 and 70000.", "ref": "SELECT * FROM employees WHERE salary BETWEEN 45000 AND 70000;" },
    { "id": 12, "prompt": "Sales leadership wants to review commissioned, currently active staff. From <code>employees</code>, find rows where <code>is_active = 1</code> AND <code>commission IS NOT NULL</code>.", "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL;" },
    { "id": 13, "prompt": "A promotion targets two product categories. Use <code>IN</code> to fetch all rows from <code>products</code> where <code>category_id</code> is 5 or 6.", "ref": "SELECT * FROM products WHERE category_id IN (5, 6);" },
    { "id": 14, "prompt": "A search bar received the letter &quot;S&quot;. From <code>employees</code>, find all records where <code>first_name</code> starts with <code>'S'</code> — use a <code>LIKE</code> pattern.", "ref": "SELECT * FROM employees WHERE first_name LIKE 'S%';" },
    { "id": 15, "prompt": "A legacy customer campaign targets two regions. From <code>customers</code>, find those in <code>'South'</code> or <code>'West'</code> who signed up before <code>'2023-01-01'</code>.", "ref": "SELECT * FROM customers WHERE region IN ('South', 'West') AND signup_date < '2023-01-01';" },
    { "id": 16, "prompt": "The warehouse alerts team needs low-stock items. From <code>products</code>, find all rows where <code>stock_qty</code> is below 20.", "ref": "SELECT * FROM products WHERE stock_qty < 20;" },
    { "id": 17, "prompt": "Find veteran high-earners: from <code>employees</code>, filter for those with <code>salary</code> above 90000 AND <code>hire_date</code> before <code>'2021-01-01'</code>.", "ref": "SELECT * FROM employees WHERE salary > 90000 AND hire_date < '2021-01-01';" },
    { "id": 18, "prompt": "The annual report covers FY 2024. From <code>orders</code>, retrieve all records where <code>order_date</code> falls within the full year 2024.", "ref": "SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 19, "prompt": "HR needs all people-managers identified. From <code>employees</code>, find all rows where <code>job_title</code> contains the word <code>'Manager'</code>.", "ref": "SELECT * FROM employees WHERE job_title LIKE '%Manager%';" },
    { "id": 20, "prompt": "Three departments are being excluded from a review. From <code>employees</code>, retrieve everyone whose <code>department_id</code> is NOT in (10, 20, 30).", "ref": "SELECT * FROM employees WHERE department_id NOT IN (10, 20, 30);" },
    { "id": 21, "prompt": "A stationery collection is being curated. From <code>products</code>, find all items whose <code>name</code> ends with the word <code>'Book'</code>.", "ref": "SELECT * FROM products WHERE name LIKE '%Book';" },
    { "id": 22, "prompt": "Priority orders need urgent attention. From <code>orders</code>, find rows where <code>status</code> is <code>'Processing'</code> AND <code>total_amount</code> exceeds 3000.", "ref": "SELECT * FROM orders WHERE status = 'Processing' AND total_amount > 3000;" },
    { "id": 23, "prompt": "HR needs to offboard inactive staff from one department. From <code>employees</code>, retrieve rows in <code>department_id</code> 20 where <code>is_active = 0</code>.", "ref": "SELECT * FROM employees WHERE department_id = 20 AND is_active = 0;" },
    { "id": 24, "prompt": "The team wants to filter test accounts. From <code>customers</code>, find all rows where the <code>email</code> ends with <code>'@example.com'</code>.", "ref": "SELECT * FROM customers WHERE email LIKE '%@example.com';" },
    { "id": 25, "prompt": "A bonus eligibility check covers two conditions. From <code>employees</code>, find all rows where <code>salary</code> exceeds 80000 OR <code>commission</code> is above 10000.", "ref": "SELECT * FROM employees WHERE salary > 80000 OR commission > 10000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: WHERE & Comparison Operators", "recordingKey": null },
    { "id": "topic-2", "label": "Topic 2: Logical Operators & Operator Precedence", "recordingKey": null },
    { "id": "topic-3", "label": "Topic 3: BETWEEN, IN, LIKE & IS NULL", "recordingKey": null }
  ]
};
