// Day 03 — Filtering Data: WHERE, Comparison Operators, AND/OR/NOT, BETWEEN, IN, LIKE, IS NULL
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day03'] = {
  "day": 3,
  "title": "Filtering Data: WHERE, Operators & Pattern Matching",
  "db": "retail",
  "emoji": "🔍",
  "slides": [
    {
      "title": "Filtering Data: WHERE, Operators & Pattern Matching",
      "duration": "0:00",
      "html": `
        <h2>🔍 Filtering Data: WHERE, Operators &amp; Pattern Matching</h2>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03Where">
            01. The WHERE Clause — Row-Level Filtering
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The <code>WHERE</code> clause is SQL's <strong>horizontal row-level filter</strong>. The database engine evaluates the boolean expression in <code>WHERE</code> for every candidate row produced by <code>FROM</code>. Only rows that evaluate to <code>TRUE</code> pass through — rows that evaluate to <code>FALSE</code> <em>or</em> <code>NULL</code> are silently discarded.</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">WHERE Clause — Minimal Anatomy</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio02.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03WhereCode"><code>-- Syntax skeleton
SELECT column1, column2
FROM   table_name
WHERE  condition;

-- Concrete example: only employees earning above ₹80 000
SELECT first_name,
       last_name,
       salary
FROM   employees
WHERE  salary > 80000;</code></pre>

          <div class="info-box" id="day03WhereInfo">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
              <div style="flex: 1;">
                ℹ️ <strong>Execution Order:</strong> <code>WHERE</code> is Step 2 in SQL's logical execution order — <em>after</em> <code>FROM</code> but <em>before</em> <code>GROUP BY</code>, <code>HAVING</code>, and <code>SELECT</code>. This means <code>WHERE</code> <strong>cannot reference column aliases</strong> defined in the <code>SELECT</code> list because those aliases don't exist yet at filtering time.
              </div>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio03.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03CompOps">
            02. Comparison Operators — The Building Blocks
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio04.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Every <code>WHERE</code> predicate is built from comparison operators. Each one compares a column value to a literal, another column, or an expression and returns <code>TRUE</code>, <code>FALSE</code>, or <code>UNKNOWN</code> (when <code>NULL</code> is involved).</p>

          <div class="db-mock-table-wrap" id="day03OpsTable">
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

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">Comparison Operator Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio05.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03CompCode"><code>-- Equal: fetch only the Engineering department
SELECT first_name, department_id
FROM   employees
WHERE  department_id = 10;

-- Not equal: orders that haven't shipped
SELECT order_id, status
FROM   orders
WHERE  status <> 'Shipped';

-- Range: products that cost more than ₹5 000
SELECT name, unit_price
FROM   products
WHERE  unit_price > 5000;

-- Combined: cheap items still in stock
SELECT name, unit_price, stock_qty
FROM   products
WHERE  unit_price <= 1000
  AND  stock_qty  >= 50;</code></pre>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03LogicOps">
            03. AND, OR, NOT — Combining Conditions
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio06.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Logical operators let you compose complex filters from simple predicates. SQL evaluates them in <strong>operator precedence</strong> order: <code>NOT</code> binds tightest → then <code>AND</code> → then <code>OR</code>. Mixing <code>AND</code> and <code>OR</code> without parentheses is a classic bug source — always use brackets to make your intent explicit.</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">AND / OR / NOT Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio07.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03LogicCode"><code>-- AND: every condition must be TRUE
SELECT first_name, department_id, salary
FROM   employees
WHERE  department_id = 20
  AND  salary > 70000;

-- OR: at least one condition must be TRUE
SELECT first_name, department_id
FROM   employees
WHERE  department_id = 10
  OR   department_id = 20;

-- NOT: negates the condition
SELECT first_name, is_active
FROM   employees
WHERE  NOT is_active = 1;

-- Parentheses clarify mixed AND + OR
SELECT first_name, department_id, salary
FROM   employees
WHERE  (department_id = 10 OR department_id = 20)
  AND  salary > 60000;</code></pre>

          <!-- Operator Precedence & Venn Diagrams Visual -->
          <div id="day03PrecWrap" style="width:100%;margin:14px 0 16px">
            <style>
              #day03PrecWrap .prec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
              #day03PrecWrap .prec-card{background:rgba(9,15,28,0.92);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;animation:precReveal 0.45s ease both;transition:transform 0.25s ease, border-color 0.25s ease;overflow:hidden;position:relative}
              #day03PrecWrap .prec-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.12)}
              
              #day03PrecWrap .prec-card--not{border-top:3px solid #ef4444}
              #day03PrecWrap .prec-card--and{border-top:3px solid #f59e0b}
              #day03PrecWrap .prec-card--or{border-top:3px solid #10b981}

              #day03PrecWrap .prec-badge{display:inline-block;width:fit-content;padding:2px 10px;border-radius:20px;font-family:'JetBrains Mono',monospace;font-size:0.62rem;font-weight:700;letter-spacing:0.05em}
              #day03PrecWrap .prec-badge--red{background:rgba(239,68,68,0.18);color:#fca5a5;border:1px solid rgba(239,68,68,0.3)}
              #day03PrecWrap .prec-badge--amber{background:rgba(245,158,11,0.18);color:#fcd34d;border:1px solid rgba(245,158,11,0.3)}
              #day03PrecWrap .prec-badge--emerald{background:rgba(16,185,129,0.18);color:#6ee7b7;border:1px solid rgba(16,185,129,0.3)}
              
              #day03PrecWrap .prec-rank{font-size:0.64rem;color:#94a3b8;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
              #day03PrecWrap .prec-desc{font-size:0.72rem;color:#cbd5e1;line-height:1.45;margin-bottom:2px}
              #day03PrecWrap .prec-venn{width:100%;background:rgba(5, 8, 16, 0.7);border-radius:8px;padding:6px;border:1px solid rgba(255, 255, 255, 0.04);box-sizing:border-box}
              
              #day03PrecWrap .prec-table-title{font-size:0.6rem;color:#64748b;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-top:4px}
              #day03PrecWrap .prec-matrix{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:#94a3b8;background:rgba(0,0,0,0.25);border-radius:6px;padding:8px 10px;margin:0;line-height:1.4;border:1px solid rgba(255,255,255,0.03)}
              #day03PrecWrap .prec-matrix span.t{color:#34d399}
              #day03PrecWrap .prec-matrix span.f{color:#f87171}
              #day03PrecWrap .prec-matrix span.u{color:#fb7185;opacity:0.85}

              @keyframes precReveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
              @media(max-width:768px){#day03PrecWrap .prec-grid{grid-template-columns:1fr;gap:12px}}
            </style>
            
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
              <small style="color:#94a3b8;font-size:0.75rem;font-weight:600;letter-spacing:0.02em;">⚡ Logical Set Diagrams &amp; Operator Precedence</small>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio08.mp3', this)" title="Play narration" style="flex-shrink:0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            
            <div class="prec-grid">
              <!-- CARD 1: NOT -->
              <div class="prec-card prec-card--not" style="--d:0.15s;animation-delay:0.15s">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span class="prec-badge prec-badge--red">NOT</span>
                  <span class="prec-rank" style="color:#ef4444">1. Highest</span>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="0 0 200 110" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-not" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
                      </radialGradient>
                      <mask id="not-a-mask">
                        <rect x="0" y="0" width="200" height="110" fill="#ffffff" />
                        <circle cx="75" cy="55" r="30" fill="#000000" />
                      </mask>
                    </defs>
                    <pattern id="grid-pattern-1" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-1)" rx="4" />
                    <!-- Universal Set Glow without outer stroke box -->
                    <rect width="100%" height="100%" fill="url(#glow-not)" mask="url(#not-a-mask)" />
                    <rect width="100%" height="100%" fill="rgba(239, 68, 68, 0.05)" mask="url(#not-a-mask)" />
                    
                    <!-- Circle Wireframes -->
                    <circle cx="75" cy="55" r="30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-dasharray="2 2" stroke-width="1.2" />
                    <circle cx="125" cy="55" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" />
                    
                    <!-- Text Labels -->
                    <text x="75" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="rgba(255,255,255,0.3)" text-anchor="middle">A</text>
                    <text x="125" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle">B</text>
                    <text x="14" y="18" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#fca5a5">U (NOT A)</text>
                  </svg>
                </div>
                
                <span class="prec-desc">A <strong>unary operator</strong> that negates a condition. In set theory, it represents the <strong>Complement</strong> (everything outside Set A). Evaluated first.</span>
              </div>
              
              <!-- CARD 2: AND -->
              <div class="prec-card prec-card--and" style="--d:0.3s;animation-delay:0.3s">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span class="prec-badge prec-badge--amber">AND</span>
                  <span class="prec-rank" style="color:#f59e0b">2. Middle</span>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="0 0 200 110" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-and" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
                        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                      </radialGradient>
                      <clipPath id="intersect-clip">
                        <circle cx="75" cy="55" r="30" />
                      </clipPath>
                    </defs>
                    <pattern id="grid-pattern-2" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-2)" rx="4" />
                    
                    <!-- Highlighted Intersection Area -->
                    <circle cx="125" cy="55" r="30" fill="url(#glow-and)" clip-path="url(#intersect-clip)" />
                    <circle cx="125" cy="55" r="30" fill="rgba(245, 158, 11, 0.12)" clip-path="url(#intersect-clip)" />
                    <circle cx="125" cy="55" r="30" fill="none" stroke="#f59e0b" stroke-width="1.5" clip-path="url(#intersect-clip)" />

                    <!-- Circle Wireframes -->
                    <circle cx="75" cy="55" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" />
                    <circle cx="125" cy="55" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" />
                    
                    <!-- Text Labels -->
                    <text x="54" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle">A</text>
                    <text x="146" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle">B</text>
                    <text x="100" y="58" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#f59e0b" text-anchor="middle">A ∩ B</text>
                  </svg>
                </div>
                
                <span class="prec-desc">A <strong>binary operator</strong> that returns TRUE if <em>both</em> conditions are TRUE. Represents the <strong>Intersection</strong>. Binds tighter than OR.</span>
              </div>
              
              <!-- CARD 3: OR -->
              <div class="prec-card prec-card--or" style="--d:0.45s;animation-delay:0.45s">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span class="prec-badge prec-badge--emerald">OR</span>
                  <span class="prec-rank" style="color:#10b981">3. Lowest</span>
                </div>
                
                <!-- Venn SVG -->
                <div class="prec-venn">
                  <svg viewBox="0 0 200 110" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="glow-or" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                      </radialGradient>
                    </defs>
                    <pattern id="grid-pattern-3" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-3)" rx="4" />
                    
                    <!-- Highlighted Union Area -->
                    <circle cx="75" cy="55" r="30" fill="url(#glow-or)" />
                    <circle cx="125" cy="55" r="30" fill="url(#glow-or)" />
                    <circle cx="75" cy="55" r="30" fill="rgba(16, 185, 129, 0.08)" />
                    <circle cx="125" cy="55" r="30" fill="rgba(16, 185, 129, 0.08)" />
                    
                    <!-- Circle Wireframes / Borders -->
                    <circle cx="75" cy="55" r="30" fill="none" stroke="#10b981" stroke-width="1.2" />
                    <circle cx="125" cy="55" r="30" fill="none" stroke="#10b981" stroke-width="1.2" />
                    
                    <!-- Text Labels -->
                    <text x="60" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
                    <text x="140" y="58" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
                    <text x="100" y="58" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#10b981" text-anchor="middle">A ∪ B</text>
                  </svg>
                </div>
                
                <span class="prec-desc">A <strong>binary operator</strong> that returns TRUE if <em>at least one</em> condition is TRUE. Represents the <strong>Union</strong>. Evaluated last.</span>
              </div>
            </div>
          </div>

          <div class="warn-box" id="day03LogicWarn">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
              <div style="flex: 1;">
                ⚠️ <strong>Precedence Trap:</strong> <code>WHERE dept = 10 OR dept = 20 AND salary &gt; 60000</code> is parsed as <code>WHERE dept = 10 OR (dept = 20 AND salary &gt; 60000)</code> — which is very different from filtering both departments! Always wrap <code>OR</code> groups in parentheses: <code>WHERE (dept = 10 OR dept = 20) AND salary &gt; 60000</code>.
              </div>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio09.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03Between">
            04. BETWEEN — Inclusive Range Filter
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio10.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><code>BETWEEN low AND high</code> is a clean shorthand for <code>&gt;= low AND &lt;= high</code>. <strong>Both endpoints are inclusive.</strong> It works on numbers, dates, and text (lexicographic order for text).</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">BETWEEN — Numeric, Date, and NOT BETWEEN</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio11.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03BetweenCode"><code>-- Numeric: salary range (inclusive on both ends)
SELECT first_name, last_name, salary
FROM   employees
WHERE  salary BETWEEN 50000 AND 90000;

-- Equivalent using explicit operators:
-- WHERE salary >= 50000 AND salary <= 90000

-- Date range: all orders placed in 2024
SELECT order_id, order_date, total_amount
FROM   orders
WHERE  order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- NOT BETWEEN: products outside a price band
SELECT name, unit_price
FROM   products
WHERE  unit_price NOT BETWEEN 1000 AND 5000;</code></pre>

          <div class="vs-block" id="day03BetweenVs">
            <div class="vs-card" id="day03BetweenOk">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;">✅ BETWEEN — Correct Usage</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio12.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <ul>
                <li>Always put the <em>smaller</em> value first: <code>BETWEEN 50 AND 100</code></li>
                <li><code>BETWEEN 100 AND 50</code> returns zero rows — it's valid SQL but logically empty</li>
                <li>Works on <code>DATE</code>, <code>DATETIME</code>, <code>INT</code>, <code>DECIMAL</code>, and <code>VARCHAR</code></li>
              </ul>
            </div>
            <div class="vs-card" id="day03BetweenDateTip">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;">⏰ Date Precision Gotcha</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio13.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <ul>
                <li>For <code>DATETIME</code> columns, <code>BETWEEN '2024-12-31'</code> stops at <code>2024-12-31 00:00:00</code></li>
                <li>To include the full last day, use <code>&lt; '2025-01-01'</code> instead</li>
                <li>Safer pattern: <code>order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03In">
            05. IN — Matching a List of Values
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio14.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><code>IN (...)</code> is a compact replacement for chained <code>OR</code> conditions. The engine checks whether a column's value exists in the provided list. <code>NOT IN</code> inverts that check — returning only rows whose value is absent from the list.</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">IN / NOT IN Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio15.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03InCode"><code>-- IN with numbers (equivalent to OR conditions)
SELECT first_name, department_id
FROM   employees
WHERE  department_id IN (10, 20, 30);

-- Same result as:
-- WHERE department_id = 10
--    OR department_id = 20
--    OR department_id = 30

-- IN with strings
SELECT customer_id, first_name, region
FROM   customers
WHERE  region IN ('North', 'South', 'East');

-- NOT IN: exclude specified departments
SELECT first_name, department_id
FROM   employees
WHERE  department_id NOT IN (10, 20);</code></pre>

          <div class="warn-box" id="day03InWarn">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
              <div style="flex: 1;">
                ⚠️ <strong>NOT IN with NULLs — Silent Data Loss:</strong> If the list passed to <code>NOT IN</code> contains even a single <code>NULL</code>, the entire query returns <strong>zero rows</strong>. Why? Every comparison with <code>NULL</code> yields <code>UNKNOWN</code>, not <code>TRUE</code>, so the <code>WHERE</code> filter passes nothing. When the list comes from a subquery that might return <code>NULL</code>, use <code>NOT EXISTS</code> or add <code>WHERE col IS NOT NULL</code> to the subquery.
              </div>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio16.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03Like">
            06. LIKE — Pattern Matching with Wildcards
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio17.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><code>LIKE</code> performs pattern-based string matching using two special wildcard characters. It is the go-to operator for partial text searches — such as finding all customers whose name starts with a letter or all emails from a specific domain.</p>

          <div class="vs-block" id="day03LikeVs">
            <div class="vs-card" id="day03LikePercent">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;"><code>%</code> — Zero or More Characters</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio18.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
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
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;"><code>_</code> — Exactly One Character</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio19.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
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

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">LIKE in Context — Full Query Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio20.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03LikeCode"><code>-- Employees whose first name starts with 'S'
SELECT first_name, last_name
FROM   employees
WHERE  first_name LIKE 'S%';

-- Products whose name contains 'Mouse'
SELECT name, unit_price
FROM   products
WHERE  name LIKE '%Mouse%';

-- Exclude all Gmail addresses
SELECT customer_id, email
FROM   customers
WHERE  email NOT LIKE '%@gmail.com';</code></pre>

          <div class="pro-tip-box" id="day03LikeTip">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
              <div style="flex: 1;">
                💡 <strong>Case Sensitivity by Engine:</strong> In <strong>SQLite</strong> and <strong>MySQL</strong>, <code>LIKE</code> is case-insensitive for ASCII characters by default. In <strong>PostgreSQL</strong>, <code>LIKE</code> is case-sensitive — use <code>ILIKE</code> for a case-insensitive match. In <strong>SQL Server</strong>, behaviour depends on the column's collation setting.
              </div>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio21.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03Null">
            07. IS NULL &amp; IS NOT NULL — Handling Missing Values
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio22.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><code>NULL</code> in SQL represents a <strong>missing, unknown, or inapplicable value</strong>. A column is <code>NULL</code> when no data was provided. The critical rule: <strong>you cannot test for NULL with <code>=</code></strong> — the result is always <code>UNKNOWN</code>, never <code>TRUE</code>. Always use <code>IS NULL</code> or <code>IS NOT NULL</code>.</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">IS NULL / IS NOT NULL Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio23.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <pre id="day03NullCode"><code>-- Top-level employees (no manager)
SELECT first_name, manager_id
FROM   employees
WHERE  manager_id IS NULL;

-- Employees who report to someone
SELECT first_name, manager_id
FROM   employees
WHERE  manager_id IS NOT NULL;

-- Employees with no commission assigned
SELECT first_name, last_name, commission
FROM   employees
WHERE  commission IS NULL;

-- Active employees who have a commission
SELECT first_name, commission
FROM   employees
WHERE  is_active = 1
  AND  commission IS NOT NULL;</code></pre>

          <div class="vs-block" id="day03NullVs">
            <div class="vs-card" id="day03NullWrong">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;">❌ Wrong — Returns No Rows</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio24.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <pre><code>-- = NULL always yields UNKNOWN
WHERE commission = NULL    -- ❌

-- != NULL also always UNKNOWN
WHERE commission != NULL   -- ❌</code></pre>
              <p style="font-size:0.72rem;color:#f87171;margin:6px 0 0;">These return zero rows regardless of data because any comparison with <code>NULL</code> produces <code>UNKNOWN</code>, and <code>WHERE</code> only keeps <code>TRUE</code>.</p>
            </div>
            <div class="vs-card" id="day03NullRight">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0;">✅ Correct — Use IS NULL</h4>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio25.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <pre><code>-- Correctly finds NULL rows
WHERE commission IS NULL     -- ✅

-- Correctly excludes NULL rows
WHERE commission IS NOT NULL -- ✅</code></pre>
              <p style="font-size:0.72rem;color:#6ee7b7;margin:6px 0 0;"><code>IS NULL</code> is a special predicate built to detect the absence of a value — it correctly returns <code>TRUE</code> for NULL rows.</p>
            </div>
          </div>
        </div>

        <!-- ── Interview Q&A Consolidated Section ── -->
        <div class="slide-section">
          <div class="interview-box">
            <h4 id="day03QAHeading">🎯 Interview Insights &amp; Q&amp;A</h4>

            <div style="margin-bottom: 14px;" id="day03QANull">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
                <div style="flex: 1;">
                  <p><strong>Q: Why does <code>WHERE commission = NULL</code> return no rows, even when commission is NULL for several employees?</strong></p>
                  <p style="margin-bottom: 0;"><em>A: In SQL, NULL represents an <strong>unknown value</strong>. Any comparison involving NULL — including <code>= NULL</code>, <code>!= NULL</code>, or arithmetic — returns a third truth value called <strong>UNKNOWN</strong> (not TRUE, not FALSE). The WHERE clause only retains rows that evaluate to TRUE, so UNKNOWN rows are silently discarded. The correct syntax is <code>WHERE commission IS NULL</code>, which is a special predicate designed specifically to detect the absence of a value.</em></p>
                </div>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio26.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            </div>

            <div style="margin-bottom: 14px;" id="day03QANotIn">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
                <div style="flex: 1;">
                  <p><strong>Q: You write <code>WHERE department_id NOT IN (SELECT dept_id FROM inactive_depts)</code> and get zero rows back — but you know there are valid employees. What is the likely cause?</strong></p>
                  <p style="margin-bottom: 0;"><em>A: The subquery is almost certainly returning at least one <code>NULL</code> value. When <code>NOT IN</code> is evaluated, SQL internally expands it into a chain of <code>AND column != val1 AND column != val2 ...</code>. Any comparison of a column against <code>NULL</code> produces <code>UNKNOWN</code>, which makes the entire AND-chain UNKNOWN — causing every row to be filtered out. The fix is to add <code>WHERE dept_id IS NOT NULL</code> to the subquery, or to rewrite with <code>NOT EXISTS</code> which handles NULLs correctly.</em></p>
                </div>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio27.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            </div>

            <div id="day03QALike">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; width: 100%;">
                <div style="flex: 1;">
                  <p><strong>Q: What is the performance impact of leading-wildcard LIKE patterns such as <code>WHERE name LIKE '%Manager%'</code>?</strong></p>
                  <p style="margin-bottom: 0;"><em>A: A leading <code>%</code> wildcard forces a <strong>full table scan</strong> — the database engine cannot use a B-tree index on the <code>name</code> column because the index is ordered by the start of the string, not by what's in the middle. This is one of the most common performance anti-patterns in SQL. For large tables, the solution is a <strong>Full-Text Search index</strong> (e.g., <code>FULLTEXT</code> in MySQL, <code>tsvector</code> in PostgreSQL, or <code>CONTAINS</code> in SQL Server) which is optimised for substring and keyword lookups. If you can anchor the pattern to the start (e.g., <code>LIKE 'Manager%'</code>), the index can be used.</em></p>
                </div>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio28.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
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
      "referenceSql": "SELECT name,\n       unit_price\nFROM   products\nWHERE  unit_price > 10000\nORDER BY unit_price DESC;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Regional Customers</strong><br/>Retrieve <code>first_name</code>, <code>last_name</code>, and <code>region</code> for customers in the <code>'North'</code> or <code>'East'</code> region. Use the <code>IN</code> operator.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       region\nFROM   customers\nWHERE  region IN ('North', 'East');"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Mid-Range Salary Band</strong><br/>Find employees earning between 60000 and 100000 (inclusive). Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary BETWEEN 60000 AND 100000;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Name Pattern Search</strong><br/>Find all employees whose <code>first_name</code> starts with the letter <code>'S'</code>. Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  first_name LIKE 'S%';"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Active Data Science Team</strong><br/>Find active employees (<code>is_active = 1</code>) in department 20. Retrieve <code>first_name</code>, <code>department_id</code>, and <code>salary</code>. Use <code>AND</code>.",
      "referenceSql": "SELECT first_name,\n       department_id,\n       salary\nFROM   employees\nWHERE  is_active = 1\n  AND  department_id = 20;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Employees Without Commission</strong><br/>Find all employees who have no commission assigned (<code>commission IS NULL</code>). Retrieve <code>first_name</code>, <code>last_name</code>, and <code>commission</code>.",
      "referenceSql": "SELECT first_name,\n       last_name,\n       commission\nFROM   employees\nWHERE  commission IS NULL;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Retrieve all employees with <code>salary</code> greater than 80000.", "ref": "SELECT * FROM employees WHERE salary > 80000;" },
    { "id": 2, "prompt": "Find products with <code>unit_price</code> less than or equal to 2000.", "ref": "SELECT * FROM products WHERE unit_price <= 2000;" },
    { "id": 3, "prompt": "Find customers in the <code>'North'</code> region.", "ref": "SELECT * FROM customers WHERE region = 'North';" },
    { "id": 4, "prompt": "Find employees in <code>department_id</code> 10 with <code>salary</code> above 70000.", "ref": "SELECT * FROM employees WHERE department_id = 10 AND salary > 70000;" },
    { "id": 5, "prompt": "Find employees in <code>department_id</code> 10 or 20 using <code>IN</code>.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20);" },
    { "id": 6, "prompt": "Retrieve orders with <code>total_amount</code> between 5000 and 50000.", "ref": "SELECT * FROM orders WHERE total_amount BETWEEN 5000 AND 50000;" },
    { "id": 7, "prompt": "Find all customers who signed up after 2022-12-31.", "ref": "SELECT * FROM customers WHERE signup_date > '2022-12-31';" },
    { "id": 8, "prompt": "Find products whose <code>name</code> contains the word <code>'Mouse'</code>.", "ref": "SELECT * FROM products WHERE name LIKE '%Mouse%';" },
    { "id": 9, "prompt": "Find employees who do NOT have a <code>manager_id</code> (top-level employees).", "ref": "SELECT * FROM employees WHERE manager_id IS NULL;" },
    { "id": 10, "prompt": "Find all orders that are NOT <code>'Shipped'</code>.", "ref": "SELECT * FROM orders WHERE status <> 'Shipped';" },
    { "id": 11, "prompt": "Retrieve employees with <code>salary</code> between 45000 and 70000.", "ref": "SELECT * FROM employees WHERE salary BETWEEN 45000 AND 70000;" },
    { "id": 12, "prompt": "Find active employees (<code>is_active = 1</code>) with a commission assigned (not NULL).", "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL;" },
    { "id": 13, "prompt": "Find products in <code>category_id</code> 5 or 6 using <code>IN</code>.", "ref": "SELECT * FROM products WHERE category_id IN (5, 6);" },
    { "id": 14, "prompt": "Find employees whose <code>first_name</code> starts with <code>'S'</code>.", "ref": "SELECT * FROM employees WHERE first_name LIKE 'S%';" },
    { "id": 15, "prompt": "Find customers from the <code>'South'</code> or <code>'West'</code> region who signed up before 2023-01-01.", "ref": "SELECT * FROM customers WHERE region IN ('South', 'West') AND signup_date < '2023-01-01';" },
    { "id": 16, "prompt": "Retrieve products where <code>stock_qty</code> is less than 20.", "ref": "SELECT * FROM products WHERE stock_qty < 20;" },
    { "id": 17, "prompt": "Find employees who earn more than 90000 AND were hired before 2021-01-01.", "ref": "SELECT * FROM employees WHERE salary > 90000 AND hire_date < '2021-01-01';" },
    { "id": 18, "prompt": "Find orders placed in 2024 (<code>order_date</code> between 2024-01-01 and 2024-12-31).", "ref": "SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 19, "prompt": "Find employees whose <code>job_title</code> contains the word <code>'Manager'</code>.", "ref": "SELECT * FROM employees WHERE job_title LIKE '%Manager%';" },
    { "id": 20, "prompt": "Retrieve employees whose <code>department_id</code> is NOT in (10, 20, 30).", "ref": "SELECT * FROM employees WHERE department_id NOT IN (10, 20, 30);" },
    { "id": 21, "prompt": "Find products whose <code>name</code> ends with <code>'Book'</code>.", "ref": "SELECT * FROM products WHERE name LIKE '%Book';" },
    { "id": 22, "prompt": "Find orders with <code>status</code> = <code>'Processing'</code> and <code>total_amount</code> &gt; 3000.", "ref": "SELECT * FROM orders WHERE status = 'Processing' AND total_amount > 3000;" },
    { "id": 23, "prompt": "Find all employees in <code>department_id</code> 20 who are NOT active (<code>is_active = 0</code>).", "ref": "SELECT * FROM employees WHERE department_id = 20 AND is_active = 0;" },
    { "id": 24, "prompt": "Find customers whose <code>email</code> contains <code>'@example.com'</code>.", "ref": "SELECT * FROM customers WHERE email LIKE '%@example.com';" },
    { "id": 25, "prompt": "Find employees earning more than 80000 OR having <code>commission</code> greater than 10000.", "ref": "SELECT * FROM employees WHERE salary > 80000 OR commission > 10000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: WHERE & Comparison Operators", "recordingKey": null },
    { "id": "topic-2", "label": "Topic 2: AND / OR / NOT & Operator Precedence", "recordingKey": null },
    { "id": "topic-3", "label": "Topic 3: BETWEEN, IN, LIKE & IS NULL", "recordingKey": null }
  ]
};
