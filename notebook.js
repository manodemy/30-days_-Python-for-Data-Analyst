// ═══════ MANODEMY — CODEMIRROR + PYODIDE ENGINE (shared across all days) ═══════

let pyodide = null;
let cellCounter = 0;
const editors = {};  // cellId -> CodeMirror instance
const statusEl = document.getElementById('pyStatus');

// ── INIT CODEMIRROR EDITORS ──
document.querySelectorAll('.cm-source').forEach(ta => {
  const cellEl = ta.closest('.code-cell');
  const cellId = cellEl.id;
  const cm = CodeMirror.fromTextArea(ta, {
    mode: 'python',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    smartIndent: true,
    electricChars: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumber', 'CodeMirror-foldgutter'],
    lineWrapping: false,
    viewportMargin: Infinity,
    extraKeys: {
      'Shift-Enter': function(cm) { runCell(cellId); },
      'Ctrl-Enter': function(cm) { runCell(cellId); },
      'Ctrl-/': 'toggleComment',
      'Cmd-/': 'toggleComment',
      'Ctrl-Space': 'autocomplete',
      'Tab': function(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection('add');
        } else {
          cm.replaceSelection('    ', 'end');
        }
      },
      'Shift-Tab': function(cm) { cm.indentSelection('subtract'); },
      'Ctrl-D': function(cm) {
        // Duplicate line (VS Code style)
        const cur = cm.getCursor();
        const line = cm.getLine(cur.line);
        cm.replaceRange('\n' + line, {line: cur.line, ch: line.length});
      },
      'Ctrl-Shift-K': function(cm) {
        // Delete line (VS Code style)
        const cur = cm.getCursor();
        cm.replaceRange('', {line: cur.line, ch: 0}, {line: cur.line + 1, ch: 0});
      },
      'Alt-Up': function(cm) {
        // Move line up
        const cur = cm.getCursor();
        if (cur.line === 0) return;
        const line = cm.getLine(cur.line);
        const above = cm.getLine(cur.line - 1);
        cm.replaceRange(line + '\n' + above,
          {line: cur.line - 1, ch: 0},
          {line: cur.line, ch: cm.getLine(cur.line).length});
        cm.setCursor({line: cur.line - 1, ch: cur.ch});
      },
      'Alt-Down': function(cm) {
        // Move line down
        const cur = cm.getCursor();
        if (cur.line >= cm.lineCount() - 1) return;
        const line = cm.getLine(cur.line);
        const below = cm.getLine(cur.line + 1);
        cm.replaceRange(below + '\n' + line,
          {line: cur.line, ch: 0},
          {line: cur.line + 1, ch: cm.getLine(cur.line + 1).length});
        cm.setCursor({line: cur.line + 1, ch: cur.ch});
      }
    }
  });
  cm.setSize(null, null);  // auto height
  editors[cellId] = cm;
});

// ── LOAD PYODIDE ──
async function initPyodide() {
  try {
    pyodide = await loadPyodide();
    statusEl.textContent = '✅ Python Ready — Shift+Enter to run cell';
    statusEl.classList.add('ready');
    setTimeout(() => statusEl.classList.add('hidden'), 3000);
  } catch (e) {
    statusEl.textContent = '❌ Failed to load Python. Refresh page.';
  }
}
initPyodide();

// ── SCORE TRACKING ──
const successfulCells = new Set();
let totalCells = 0;

document.querySelectorAll('.code-cell').forEach(cell => {
  let prev = cell.previousElementSibling;
  // A cell counts towards the score if it directly follows a question or task
  if (prev && (prev.classList.contains('question') || prev.classList.contains('task') || prev.classList.contains('interview'))) {
    totalCells++;
    cell.classList.add('is-scored-question');
  }
});
if (totalCells === 0) totalCells = 1; // fallback prevent NaN

function updateScore() {
  const solvedEl = document.getElementById('scoreSolved');
  const totalEl = document.getElementById('scoreTotal');
  const progEl = document.getElementById('scoreProgress');
  
  if (solvedEl && totalEl) {
    let solved = successfulCells.size;
    solvedEl.textContent = solved;
    totalEl.textContent = totalCells;
    if (progEl) {
        let pct = (solved / totalCells) * 100;
        progEl.style.width = pct + '%';
        if (pct === 100) {
            progEl.style.boxShadow = '0 0 12px var(--cyan)';
        } else {
            progEl.style.boxShadow = 'none';
        }
    }
  }
}
// Init display
updateScore();

// ── RUN CELL ──
async function runCell(cellId) {
  if (!pyodide) { alert('Python is still loading...'); return; }
  const cell = document.getElementById(cellId);
  const cm = editors[cellId];
  const output = cell.querySelector('.cell-output');
  const btn = cell.querySelector('.run-btn');
  const label = cell.querySelector('.cell-label');
  const code = cm.getValue();

  cellCounter++;
  label.textContent = `In [${cellCounter}]:`;
  btn.disabled = true; btn.textContent = '⏳...';
  output.classList.remove('hidden','success','error');
  output.innerHTML = '';

  try {
    pyodide.runPython('import sys,io;_co=io.StringIO();sys.stdout=_co;sys.stderr=_co');
    let result = await pyodide.runPythonAsync(code);
    let captured = pyodide.runPython('_co.getvalue()');
    pyodide.runPython('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__');
    let text = '';
    if (captured && captured.trim()) text += captured;
    if (result !== undefined && result !== null && String(result) !== 'None') {
      if (text) text += '\n';
      text += String(result);
    }
    
    output.innerHTML = `<span class="out-label">Out [${cellCounter}]:</span>${esc(text.trim()||'(no output)')}`;
    output.classList.add('success');

    // ── SCORE VERIFICATION HEURISTIC ──
    // Ensure code is not just empty/comments and is actually related to the question
    let cleanCode = code.replace(/#.*/g, '').trim().toLowerCase();
    let isCorrectAndRelated = false;

    if (cleanCode.length > 0 && cleanCode !== 'pass') {
      isCorrectAndRelated = true; // Assume true if no question binds it
      
      let prev = cell.previousElementSibling;
      if (prev && prev.classList.contains('question')) {
        let questionText = prev.textContent.toLowerCase();
        isCorrectAndRelated = false; // Must prove relevance
        
        // 1. Check if output matches "Expected: <val>"
        let outText = (text || '').trim().toLowerCase();
        let expMatch = questionText.match(/expected:\s*([a-z0-9_.-]+)/);
        if (expMatch && expMatch[1] && outText && outText.includes(expMatch[1])) {
            isCorrectAndRelated = true;
        }
        
        // 2. Token overlap check (ignoring generics)
        if (!isCorrectAndRelated) {
            let codeTokens = cleanCode.match(/[a-z0-9_]+/g) || [];
            let ignore = ['print', 'type', 'len', 'def', 'class', 'import', 'list', 'dict', 'set', 'tuple', 'int', 'float', 'str', 'bool', 'true', 'false'];
            
            for (let token of codeTokens) {
                if (ignore.includes(token)) continue;
                // Must appear as a distinct word/number in the question
                let regex = new RegExp("\\b" + token + "\\b");
                if (regex.test(questionText)) {
                    isCorrectAndRelated = true;
                    break;
                }
            }
        }
        
        // 3. Fallback for purely symbolic math code
        if (!isCorrectAndRelated && /[+\-*/%<>=]/.test(cleanCode)) {
            if (questionText.includes('add ') || questionText.includes('divide') || questionText.includes('multiply') || questionText.includes('operator') || questionText.includes('arithmetic')) {
                isCorrectAndRelated = true;
            }
        }
      }
    }

    if (isCorrectAndRelated) {
      if (cell.classList.contains('is-scored-question')) {
        successfulCells.add(cellId);
      }
    } else {
      successfulCells.delete(cellId);
    }
    updateScore();
  } catch (err) {
    pyodide.runPython('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__');
    let msg = String(err.message||err);
    let lines = msg.split('\n').filter(l=>!l.includes('pyodide')&&!l.includes('wasm'));
    output.innerHTML = `<span class="out-label">Error:</span>${esc(lines.join('\n')||msg)}`;
    output.classList.add('error');
    
    successfulCells.delete(cellId);
    updateScore();
  }
  output.classList.remove('hidden');
  btn.disabled = false; btn.textContent = '▶ Run';
}

// ── CLEAR OUTPUT ──
function clearOutput(cellId) {
  const cell = document.getElementById(cellId);
  const output = cell.querySelector('.cell-output');
  const label = cell.querySelector('.cell-label');
  output.innerHTML = '';
  output.classList.add('hidden');
  output.classList.remove('success','error');
  label.textContent = 'In [ ]:';
}

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── SIDEBAR ACTIVE TRACKING ──
const tocLinks = document.querySelectorAll('.toc-link');
const sectionEls = [];
tocLinks.forEach(link => {
  const id = link.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) sectionEls.push({el,link});
});
function updateToc() {
  let current = null;
  for (const {el,link} of sectionEls) {
    if (el.getBoundingClientRect().top <= 120) current = link;
  }
  tocLinks.forEach(l=>l.classList.remove('active'));
  if (current) current.classList.add('active');
}
window.addEventListener('scroll', updateToc);
updateToc();

// ── DROPDOWN TOGGLE ──
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('dayDropdownBtn');
  const menu = document.getElementById('dayDropdownMenu');
  
  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
      btn.classList.toggle('open');
      
      // Auto-scroll to active item
      if (menu.classList.contains('show')) {
        const activeItem = menu.querySelector('.dropdown-item.active');
        if (activeItem) {
          setTimeout(() => {
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }
      }
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('show');
        btn.classList.remove('open');
      }
    });
  }
});

// ── SIDEBAR RESIZE ──
const sidebar = document.getElementById('sidebar');
const handle = document.getElementById('sidebarResize');
if (handle && sidebar) {
  let dragging = false;
  handle.addEventListener('mousedown', e=>{dragging=true;e.preventDefault()});
  document.addEventListener('mousemove', e=>{
    if (!dragging) return;
    const w = Math.max(180,Math.min(400,window.innerWidth-e.clientX-16));
    sidebar.style.width = w+'px';
    document.querySelector('.notebook').style.maxWidth = `calc(100% - ${w}px)`;
  });
  document.addEventListener('mouseup', ()=>{dragging=false});
}
