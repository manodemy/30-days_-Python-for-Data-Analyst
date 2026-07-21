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
      "duration": "4:00",
      "html": `
        <h2>🔍 Filtering Data: WHERE, Operators &amp; Pattern Matching</h2>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03Where">
            01. The WHERE Clause — Row-Level Filtering
            <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The <code>WHERE</code> clause is SQL's <strong>horizontal row-level filter</strong>. The database engine evaluates the boolean expression in <code>WHERE</code> for every candidate row produced by <code>FROM</code>. Only rows that evaluate to <code>TRUE</code> pass through — rows that evaluate to <code>FALSE</code> <em>or</em> <code>NULL</code> are silently discarded.</p>

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">WHERE Clause — Minimal Anatomy</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio02.mp3', this)" title="Play narration" style="flex-shrink: 0;">
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
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color: #0f766e;">ℹ️ Execution Order:</strong>
              <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio03.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
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
                  color: #8a99ad;
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

        <div class="slide-section">
          <h3 class="heading-with-audio" id="day03CompOps">
            02. Comparison Operators — The Building Blocks
            <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio04.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Every <code>WHERE</code> predicate is built from comparison operators. Each one compares a column value to a literal, another column, or an expression and returns <code>TRUE</code>, <code>FALSE</code>, or <code>UNKNOWN</code> (when <code>NULL</code> is involved).</p>

          <div class="db-mock-table-wrap" id="day03OpsTable">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <small style="flex: 1; color: #64748b; font-size: 0.75rem; font-weight: 600;">Comparison Operator Reference</small>
              <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio05.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
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

          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 14px;">
            <small style="flex: 1; color: #64748b; font-size: 0.75rem;">Comparison Operator Examples</small>
            <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio06.mp3', this)" title="Play narration" style="flex-shrink: 0;">
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
            03. Logical Operators — Combining Conditions
            <button class="audio-play-btn" onclick="playAudio('Day03/New_Day3Part1audio07.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Logical operators let you compose complex filters from simple predicates.</p>

          <div id="day03PrecWrap" style="width:100%;margin:14px 0 16px">
            <style>
              #day03PrecWrap .prec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
              #day03PrecWrap .prec-card{background:rgba(9,15,28,0.92);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;animation:precReveal 0.45s ease both;transition:transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;overflow:hidden;position:relative}
              #day03PrecWrap .prec-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.12)}
              
              #day03PrecWrap .prec-card--not{border-top:3px solid #ef4444; --highlight-color: #ef4444; --highlight-color-rgb: 239, 68, 68;}
              #day03PrecWrap .prec-card--and{border-top:3px solid #f59e0b; --highlight-color: #f59e0b; --highlight-color-rgb: 245, 158, 11;}
              #day03PrecWrap .prec-card--or{border-top:3px solid #10b981; --highlight-color: #10b981; --highlight-color-rgb: 16, 185, 129;}

              #day03PrecWrap .prec-card.narration-highlight {
                border-color: var(--highlight-color) !important;
                box-shadow: 0 0 20px rgba(var(--highlight-color-rgb), 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                transform: translateY(-4px) scale(1.02);
                z-index: 10;
              }

              #day03PrecWrap.narration-active .prec-card {
                opacity: 0;
                transform: translateY(10px);
                pointer-events: none;
                transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.25s ease, box-shadow 0.25s ease;
              }

              #day03PrecWrap.narration-active .prec-card.revealed {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
              }

              #day03PrecWrap .precedence-note {
                transition: opacity 0.4s ease, transform 0.4s ease;
              }

              #day03PrecWrap.narration-active .precedence-note {
                opacity: 0;
                transform: translateY(10px);
              }

              #day03PrecWrap.narration-active .precedence-note.revealed {
                opacity: 1;
                transform: translateY(0);
              }

              #day03PrecWrap .prec-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
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
              
              #day03PrecWrap .prec-priority--1 .label { color: #fca5a5; }
              #day03PrecWrap .prec-priority--2 .label { color: #fcd34d; }
              #day03PrecWrap .prec-priority--3 .label { color: #6ee7b7; }
              
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
                color: #fca5a5 !important;
                border: 1px solid rgba(239, 68, 68, 0.25) !important;
              }
              #day03PrecWrap .formula-badge--and {
                background: rgba(245, 158, 11, 0.12) !important;
                color: #fcd34d !important;
                border: 1px solid rgba(245, 158, 11, 0.25) !important;
              }
              #day03PrecWrap .formula-badge--or {
                background: rgba(16, 185, 129, 0.12) !important;
                color: #6ee7b7 !important;
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

            <div class="precedence-note" id="day03PrecedenceNote" style="margin-top: 14px; padding: 12px; background: rgba(255,255,255,0.02); border-left: 3px solid #3b82f6; border-top: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); border-radius: 4px 8px 8px 4px;">
              <p style="margin: 0; font-size: 0.72rem; line-height: 1.5; color: #94a3b8;">
                <span style="color: #60a5fa; font-weight: 700; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 4px; margin-bottom: 2px;">⚠️ Precedence Rule</span><br>
                SQL evaluates them in <strong>operator precedence</strong> order: <code>NOT</code> binds tightest → then <code>AND</code> → then <code>OR</code>. Mixing <code>AND</code> and <code>OR</code> without parentheses is a classic bug source — always use brackets to make your intent explicit.
              </p>
            </div>
          </div>

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

          <div class="warn-box" id="day03LogicWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color: #b91c1c;">⚠️ Precedence Trap:</strong>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio09.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <p>
              <code>WHERE dept = 10 OR dept = 20 AND salary &gt; 60000</code> is parsed as <code>WHERE dept = 10 OR (dept = 20 AND salary &gt; 60000)</code> — which is very different from filtering both departments! Always wrap <code>OR</code> groups in parentheses: <code>WHERE (dept = 10 OR dept = 20) AND salary &gt; 60000</code>.
            </p>
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
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span>✅ BETWEEN — Correct Usage</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio12.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <ul>
                <li>Always put the <em>smaller</em> value first: <code>BETWEEN 50 AND 100</code></li>
                <li><code>BETWEEN 100 AND 50</code> returns zero rows — it's valid SQL but logically empty</li>
                <li>Works on <code>DATE</code>, <code>DATETIME</code>, <code>INT</code>, <code>DECIMAL</code>, and <code>VARCHAR</code></li>
              </ul>
            </div>
            <div class="vs-card" id="day03BetweenDateTip">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span>⏰ Date Precision Gotcha</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio13.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <ul>
                <li>A range like <code>BETWEEN '2024-01-01' AND '2024-12-31'</code> truncates the end date to <code>2024-12-31 00:00:00</code> on <code>DATETIME</code> columns.</li>
                <li>This means any records or transactions occurring later in the day on December 31st will be completely missed.</li>
                <li><strong>Safer Pattern:</strong> Avoid <code>BETWEEN</code> for date ranges; use <code>order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code> instead.</li>
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
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color: #b91c1c;">⚠️ NOT IN with NULLs — Silent Data Loss:</strong>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio16.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <p>
              If the list passed to <code>NOT IN</code> contains even a single <code>NULL</code>, the entire query returns <strong>zero rows</strong>. Why? Every comparison with <code>NULL</code> yields <code>UNKNOWN</code>, not <code>TRUE</code>, so the <code>WHERE</code> filter passes nothing. When the list comes from a subquery that might return <code>NULL</code>, use <code>NOT EXISTS</code> or add <code>WHERE col IS NOT NULL</code> to the subquery.
            </p>
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
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span><code>%</code> — Zero or More Characters</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio18.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
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
                <span><code>_</code> — Exactly One Character</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio19.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
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
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color: #b45309;">💡 Case Sensitivity by Engine:</strong>
              <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio21.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <p>
              In <strong>SQLite</strong> and <strong>MySQL</strong>, <code>LIKE</code> is case-insensitive for ASCII characters by default. In <strong>PostgreSQL</strong>, <code>LIKE</code> is case-sensitive — use <code>ILIKE</code> for a case-insensitive match. In <strong>SQL Server</strong>, behaviour depends on the column's collation setting.
            </p>
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
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span>❌ Wrong — Returns No Rows</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio24.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <pre><code>-- = NULL always yields UNKNOWN
WHERE commission = NULL    -- ❌

-- != NULL also always UNKNOWN
WHERE commission != NULL   -- ❌</code></pre>
              <p style="font-size:0.72rem;color:#f87171;margin:6px 0 0;">These return zero rows regardless of data because any comparison with <code>NULL</code> produces <code>UNKNOWN</code>, and <code>WHERE</code> only keeps <code>TRUE</code>.</p>
            </div>
            <div class="vs-card" id="day03NullRight">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span>✅ Correct — Use IS NULL</span>
                <button class="audio-play-btn" onclick="playAudio('Day03/Day3audio25.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
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
    { "id": "topic-2", "label": "Topic 2: Logical Operators & Operator Precedence", "recordingKey": null },
    { "id": "topic-3", "label": "Topic 3: BETWEEN, IN, LIKE & IS NULL", "recordingKey": null }
  ]
};
