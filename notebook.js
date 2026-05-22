// ═══════ MANODEMY — CODEMIRROR + PYODIDE ENGINE (shared across all days) ═══════

// --- StateManagement & Profile Avatar Constants ---
const SAVE_DEBOUNCE_MS = 400;
const TOTAL_QUESTIONS = 640; // total across 30 days
const AVATAR_COLORS = ['--avatar-bg-1', '--avatar-bg-2', '--avatar-bg-3'];
const TOAST_DURATION_MS = 6000;

// Supabase client initialize (assumes loaded in head)
let sbClient = null;
if (typeof window.supabase !== 'undefined') {
  const SUPA_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
  const SUPA_KEY = 'sb_publishable_ZWfeHvv41ErWTcx2BtfdIQ_jw1EO4_0';
  sbClient = window.supabase.createClient(SUPA_URL, SUPA_KEY);
}

// ── SUPABASE ACTIVITY SYNC HELPER ──────────────────────────────────────────
// Writes a single event to activity_logs. Fire-and-forget (non-blocking).
async function _notebookWriteActivity(eventType, metadata) {
  try {
    if (!sbClient) return;
    const { data: { user } } = await sbClient.auth.getUser();
    if (!user) return; // Anonymous users not tracked
    await sbClient.from('activity_logs').insert([{
      user_id:    user.id,
      event_type: eventType,
      page_url:   window.location.pathname,
      metadata:   metadata
    }]);
  } catch (e) { /* silent — never block UI */ }
}

// Helper functions for state
const safeStorageSet = (key, value) => {
  try { localStorage.setItem(key, value); return true; }
  catch(e) { 
    try { sessionStorage.setItem(key, value); return true; } catch(e2) { return false; }
  }
};
const safeStorageGet = (key) => {
  try { return localStorage.getItem(key) || sessionStorage.getItem(key) || ''; }
  catch(e) { return ''; }
};

// Auto-save logic hooks
const getDayId = () => {
  const m = window.location.pathname.match(/day(\d{2})/);
  return m ? `day${m[1]}` : null;
};
const _currentDayId = getDayId();
if (_currentDayId) {
  safeStorageSet('mano_last_day', _currentDayId.replace('day', 'Day '));
}
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
  
  // Attach debounced auto-save to CodeMirror
  const dayId = getDayId();
  if (dayId) {
    let timeout;
    cm.on('change', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        safeStorageSet(`manodemy_${dayId}_${cellId}_code`, cm.getValue());
      }, SAVE_DEBOUNCE_MS);
    });
  }
});

// ── RESTORE STATE ──
document.addEventListener('DOMContentLoaded', () => {
  const dayId = getDayId();
  if (dayId) {
    // Restore cell contents
    Object.keys(editors).forEach(cellId => {
      const savedCode = safeStorageGet(`manodemy_${dayId}_${cellId}_code`);
      if (savedCode) {
        editors[cellId].setValue(savedCode);
      }
      const isSolved = safeStorageGet(`manodemy_${dayId}_${cellId}_solved`) === 'true';
      if (isSolved) {
        successfulCells.add(cellId);
        document.getElementById(cellId).classList.add('is-solved');
      }
    });
  }
  updateScore(); // Initial score update

  // ── COMPREHENSIVE SYNC: TIME + QUESTIONS TO SUPABASE ON PAGE LOAD ──────
  // Pushes BOTH the Active Focus timer AND the solved questions count from
  // localStorage to Supabase as a single 'notebook_state_sync' event.
  // This ensures:
  //   1. Historical solved counts (already in localStorage) get pushed to DB
  //   2. Time spent is always up-to-date
  //   3. Admin panel engagement table shows real, accurate numbers
  const _syncNotebookState = async () => {
    try {
      if (!sbClient) return;
      const { data: { user } } = await sbClient.auth.getUser();
      if (!user) return;
      const dayId = getDayId();
      if (!dayId) return;
      const match = dayId.match(/(\d{2})/);
      if (!match) return;
      const dayNum = match[1];

      // Read time spent from localStorage
      const timeLsKey = `manodemy_day${dayNum}_time_spent`;
      const secs = parseInt(localStorage.getItem(timeLsKey) || '0', 10);

      // Read solved count from localStorage
      const solvedLsKey = `manodemy_${dayId}_solved_count`;
      const solvedCount = parseInt(localStorage.getItem(solvedLsKey) || '0', 10);

      // Also count individual solved cells as a cross-check
      let cellSolvedCount = 0;
      const solvedCellIds = [];
      Object.keys(editors).forEach(cellId => {
        if (safeStorageGet(`manodemy_${dayId}_${cellId}_solved`) === 'true') {
          cellSolvedCount++;
          solvedCellIds.push(cellId);
        }
      });
      // Use the higher of the two counts (score counter vs individual cells)
      const finalSolved = Math.max(solvedCount, cellSolvedCount);

      // Skip sync if nothing meaningful to report
      if (secs < 5 && finalSolved === 0) return;

      // Write a single comprehensive sync event
      await sbClient.from('activity_logs').insert([{
        user_id:    user.id,
        event_type: 'notebook_state_sync',
        page_url:   window.location.pathname,
        metadata: {
          session_id:       'notebook_sync_' + dayId,
          active_seconds:   secs,
          solved_count:     finalSolved,
          solved_cells:     solvedCellIds,
          total_cells:      totalCells,
          page_url:         window.location.pathname,
          synced_at:        new Date().toISOString()
        }
      }]);

      // Also write a heartbeat for backward compatibility with time tracking
      if (secs >= 10) {
        await sbClient.from('activity_logs').insert([{
          user_id:    user.id,
          event_type: 'session_heartbeat',
          page_url:   window.location.pathname,
          metadata: {
            session_id:     'notebook_sync_' + dayId,
            active_seconds: secs,
            page_url:       window.location.pathname
          }
        }]);
      }

      console.log(`[Notebook] ✅ Synced to Supabase: ${dayId} | Time: ${secs}s | Solved: ${finalSolved}/${totalCells}`);
    } catch(e) { console.warn('[Notebook] Sync error:', e.message); }
  };
  // Delay by 3s to let Supabase auth session stabilise after page load
  setTimeout(_syncNotebookState, 3000);
});

// ── LOAD PYODIDE (LAZY — first Run click only) ──
let pyodideLoading = false;
async function initPyodide() {
  if (pyodide || pyodideLoading) return;
  pyodideLoading = true;
  if (statusEl) {
    statusEl.textContent = '⏳ Loading Python engine... (first run only)';
    statusEl.classList.remove('hidden');
  }
  try {
    pyodide = await loadPyodide();
    if (statusEl) {
      statusEl.textContent = '✅ Python Ready — Shift+Enter to run cell';
      statusEl.classList.add('ready');
      setTimeout(() => statusEl.classList.add('hidden'), 3000);
    }
  } catch (e) {
    if (statusEl) statusEl.textContent = '❌ Failed to load Python. Refresh page.';
    pyodideLoading = false;
  }
}
// Show hint instead of auto-loading 40MB WASM
if (statusEl) {
  statusEl.textContent = '💡 Click ▶ Run on any cell to start Python';
  statusEl.classList.add('ready');
  // Hide hint quickly so it doesn't clutter the screen
  setTimeout(() => {
    statusEl.classList.add('hidden');
  }, 3000);
}

// ── SCORE TRACKING ──
const successfulCells = new Set();
let totalCells = 0;

document.querySelectorAll('.question, .task, .interview').forEach(q => {
  let next = q.nextElementSibling;
  while (next) {
    if (next.classList.contains('code-cell')) {
      if (!next.classList.contains('is-scored-question')) {
        totalCells++;
        next.classList.add('is-scored-question');
      }
      break;
    }
    if (next.classList.contains('question') || next.classList.contains('task') || next.classList.contains('interview')) {
      break; // Another question started without a code cell
    }
    next = next.nextElementSibling;
  }
});
if (totalCells === 0) totalCells = 1; // fallback prevent NaN

function updateScore() {
  const solvedEl = document.getElementById('scoreSolved');
  const totalEl = document.getElementById('scoreTotal');
  const progEl = document.getElementById('scoreProgress'); // Note: we removed this from the prompt's layout, but keeping JS safe
  
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
  
  const dayId = getDayId();
  if (dayId) {
    safeStorageSet(`manodemy_${dayId}_solved_count`, successfulCells.size.toString());
  }

  // Sync Green Tick UI for Question Boxes
  document.querySelectorAll('.question, .task, .interview').forEach(q => {
    let next = q.nextElementSibling;
    let isSolved = false;
    while (next) {
      if (next.classList.contains('code-cell')) {
        if (next.classList.contains('is-solved')) {
          isSolved = true;
        }
        break;
      }
      if (next.classList.contains('question') || next.classList.contains('task') || next.classList.contains('interview')) {
        break;
      }
      next = next.nextElementSibling;
    }
    if (isSolved) {
      q.classList.add('is-solved-box');
      if (q.id) {
          const tocLink = document.querySelector(`.toc-list a[href="#${q.id}"]`);
          if (tocLink && !tocLink.querySelector('.toc-tick')) {
              tocLink.innerHTML += '<span class="toc-tick" style="float:right; color:var(--emerald, #10B981); font-weight:900; filter: drop-shadow(0 0 4px rgba(16,185,129,0.6));">✓</span>';
          }
      }
    } else {
      q.classList.remove('is-solved-box');
      if (q.id) {
          const tocLink = document.querySelector(`.toc-list a[href="#${q.id}"]`);
          if (tocLink) {
              const tick = tocLink.querySelector('.toc-tick');
              if (tick) tick.remove();
          }
      }
    }
  });
}
// Init display
// updateScore() is now called inside DOMContentLoaded state restoration

// ── RUN CELL ──
async function runCell(cellId) {
  if (!pyodide) { await initPyodide(); if (!pyodide) return; }
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

  // Track run start time for speed praise
  if (typeof ManoVoice !== 'undefined' && ManoVoice.trackRunStart) ManoVoice.trackRunStart(cellId);

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

    // ── SCORE VERIFICATION HEURISTIC (Smart Validation) ──
    let rawCode = code.trim();
    let cleanCode = rawCode.replace(/#.*/g, '').trim().toLowerCase();
    let outText = (text || '').trim().toLowerCase();
    let isCorrectAndRelated = false;
    let isPartialMatch = false;

    if (cleanCode.length > 0 && cleanCode !== 'pass') {
      isCorrectAndRelated = true; // Assume true if no question binds it
      
      let prev = cell.previousElementSibling;
      if (prev && (prev.classList.contains('question') || prev.classList.contains('interview'))) {
        let questionText = prev.textContent.toLowerCase();
        isCorrectAndRelated = false; // Must prove relevance
        
        // 1. Check if output matches "Expected: <val>"
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
                let regex = new RegExp("\\b" + token + "\\b");
                if (regex.test(questionText)) {
                    isCorrectAndRelated = true;
                    break;
                }
            }
        }
        
        // 3. Fallback for purely symbolic math code
        if (!isCorrectAndRelated && /[+\-*/%<>=]/.test(cleanCode)) {
            if (questionText.includes('add ') || questionText.includes('divide') || questionText.includes('multiply') || questionText.includes('operator') || questionText.includes('arithmetic') || questionText.includes('compute')) {
                isCorrectAndRelated = true;
            }
        }

        // ── SMART PENALTY CHECKS (Downgrade to Partial if incomplete) ──
        if (isCorrectAndRelated) {
            let outLines = outText.split('\n').filter(l => l.trim().length > 0);
            let penalties = 0;
            
            // Requirement A: "types" -> Output must have <class or code must have type(
            if ((questionText.includes('type') || questionText.includes('types')) && questionText.includes('print')) {
                if (!outText.includes('<class') && !cleanCode.includes('type(')) penalties++;
            }
            
            // Requirement B: "explain" or "why" -> Code must contain a comment
            if (questionText.includes('explain') || questionText.includes('describe') || questionText.includes('why is')) {
                if (!rawCode.includes('#')) penalties++;
            }
            
            // Requirement C: "both" or multiple outputs requested -> Output must have multiple lines
            if (questionText.includes('both results') || questionText.includes('print both') || questionText.includes('compute both')) {
                if (outLines.length < 2) penalties++;
            }

            // Requirement D: Question provides multiple distinct numbers to compute
            let qNumbers = questionText.match(/\b\d+\b/g) || [];
            let uniqueQNums = [...new Set(qNumbers)];
            if (uniqueQNums.length >= 2) {
                let codeNums = cleanCode.match(/\b\d+\b/g) || [];
                let usedQNums = uniqueQNums.filter(n => codeNums.includes(n));
                // If it only uses 1 of the numbers, and output is only 1 line, it's definitely partial
                if (usedQNums.length < uniqueQNums.length && outLines.length < 2) {
                    penalties++;
                }
            }

            // Apply penalty
            if (penalties > 0) {
                isCorrectAndRelated = false;
                isPartialMatch = true; // Signal that it was on the right track but incomplete
            }
        }
      }
    }

    if (isCorrectAndRelated) {
      if (cell.classList.contains('is-scored-question')) {
        successfulCells.add(cellId);
        cell.classList.add('is-solved');
        const dayId = getDayId();
        if (dayId) safeStorageSet(`manodemy_${dayId}_${cellId}_solved`, 'true');

        // ── SYNC TO SUPABASE: fire question_solved event (non-blocking) ──
        _notebookWriteActivity('question_solved', {
          question_id:  cellId,
          page_url:     window.location.pathname
        });
      }
    } else {
      successfulCells.delete(cellId);
      cell.classList.remove('is-solved');
      const dayId = getDayId();
      if (dayId) safeStorageSet(`manodemy_${dayId}_${cellId}_solved`, 'false');
    }
    updateScore();

    // ── MANO VOICE ASSISTANT HOOK ──
    if (typeof ManoVoice !== 'undefined' && cell.classList.contains('is-scored-question')) {
      const outputText = (text || '').trim();
      if (outputText === '' || outputText === '(no output)') {
        ManoVoice.onPartial(cellId, 'no_output');
      } else if (isCorrectAndRelated) {
        ManoVoice.onCorrect(cellId);
        if (ManoVoice.onCodeQuality) ManoVoice.onCodeQuality(cellId, code);
      } else {
        // Measure keyword overlap for partial vs wrong
        let overlapCount = 0;
        let prevEl = cell.previousElementSibling;
        if (prevEl && (prevEl.classList.contains('question') || prevEl.classList.contains('interview'))) {
          let qText = prevEl.textContent.toLowerCase();
          let tokens = cleanCode.match(/[a-z_]\w*/g) || [];
          let ignore = ['print','type','len','def','class','import','for','in','if','else','return','and','or','not','the','is','a','to','pass','true','false'];
          tokens.forEach(t => { if (!ignore.includes(t) && qText.includes(t)) overlapCount++; });
        }
        
        if (isPartialMatch || overlapCount >= 1) {
          ManoVoice.onPartial(cellId, 'close');
        } else {
          ManoVoice.onWrong(cellId);
        }
      }
      // ManoVoice.checkMilestone removed
    }
  } catch (err) {
    try { pyodide.runPython('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__'); } catch(e) {}
    let msg = String(err.message||err);
    let lines = msg.split('\n').filter(l=>!l.includes('pyodide')&&!l.includes('wasm'));
    output.innerHTML = `<span class="out-label">Error:</span>${esc(lines.join('\n')||msg)}`;
    output.classList.add('error');
    
    successfulCells.delete(cellId);
    updateScore();

    // ── MANO VOICE ERROR HOOK ──
    if (typeof ManoVoice !== 'undefined' && cell.classList.contains('is-scored-question')) {
      ManoVoice.onError(cellId, msg);
    }
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

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// ── SIDEBAR ACTIVE TRACKING ──
let sectionEls = [];
window.refreshTocTracking = function() {
  sectionEls = [];
  document.querySelectorAll('.toc-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) sectionEls.push({el, link});
    }
  });
  updateToc();
};
function updateToc() {
  let current = null;
  for (const {el, link} of sectionEls) {
    if (el.getBoundingClientRect().top <= 140) current = link;
  }
  document.querySelectorAll('.toc-link').forEach(l=>l.classList.remove('active'));
  if (current) current.classList.add('active');
}
window.addEventListener('scroll', updateToc);
window.refreshTocTracking();

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

// ── SIDEBAR RESIZE (Mouse + Touch) ──
const sidebar = document.getElementById('sidebar');
const handle = document.getElementById('sidebarResize');
if (handle && sidebar) {
  let dragging = false;
  const onMove = (clientX) => {
    if (!dragging) return;
    const w = Math.max(180,Math.min(400,window.innerWidth-clientX-16));
    sidebar.style.width = w+'px';
    document.querySelector('.notebook').style.maxWidth = `calc(100% - ${w}px)`;
  };
  handle.addEventListener('mousedown', e=>{dragging=true;e.preventDefault()});
  handle.addEventListener('touchstart', e=>{dragging=true;e.preventDefault()},{passive:false});
  document.addEventListener('mousemove', e=>onMove(e.clientX));
  document.addEventListener('touchmove', e=>{if(dragging)onMove(e.touches[0].clientX);},{passive:true});
  document.addEventListener('mouseup', ()=>{dragging=false});
  document.addEventListener('touchend', ()=>{dragging=false});
}

// ── PROFILE AVATAR & AGGREGATE PROGRESS ──
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.split(/[\s.@]+/);
  return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase();
};

const updateProfileProgress = () => {
  let globalCount = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.match(/^manodemy_day\d{2}_solved_count$/)) {
      globalCount += parseInt(localStorage.getItem(key) || '0', 10);
    }
  }
  const pct = Math.min(100, Math.round((globalCount / TOTAL_QUESTIONS) * 100));
  const pctEl = document.getElementById('profileProgressPct');
  if (pctEl) pctEl.textContent = `${pct}%`;
};

document.addEventListener('DOMContentLoaded', async () => {
  const avatar = document.getElementById('profileAvatar');
  const card = document.getElementById('profileCard');
  const avatarCircle = document.getElementById('avatarCircle');
  
  if (!avatar || !card || !sbClient) return;

  // Fetch User Auth
  const { data: { session } } = await sbClient.auth.getSession();
  if (session) {
    const user = session.user;
    const metadata = user.user_metadata || {};
    
    if (metadata.avatar_url) {
      avatarCircle.innerHTML = `<img src="${metadata.avatar_url}" alt="${metadata.full_name || 'User'}">`;
    } else {
      const nameToUse = metadata.full_name || user.email;
      const initials = getInitials(nameToUse);
      const colorVar = AVATAR_COLORS[hashString(user.email) % AVATAR_COLORS.length];
      const span = document.createElement('span');
      span.textContent = initials;
      avatarCircle.style.backgroundColor = `var(${colorVar})`;
      avatarCircle.appendChild(span);
    }
    
    document.getElementById('profileName').textContent = metadata.full_name || 'Developer';
    document.getElementById('profileEmail').textContent = user.email;
    const plan = metadata.plan === 'pro' ? 'pro' : 'free';
    const badgeEl = document.getElementById('profileBadge');
    badgeEl.textContent = plan === 'pro' ? 'Pro' : 'Free';
    badgeEl.setAttribute('data-plan', plan);
  }

  // Toggle card
  const toggleCard = () => {
    const isOpen = card.classList.contains('is-open');
    if (!isOpen) {
      updateProfileProgress();
      card.classList.add('is-open');
      avatar.setAttribute('aria-expanded', 'true');
    } else {
      card.classList.remove('is-open');
      avatar.setAttribute('aria-expanded', 'false');
    }
  };

  avatar.addEventListener('click', toggleCard);
  
  document.addEventListener('focusout', (e) => {
    if (card.classList.contains('is-open') && 
        !card.contains(e.relatedTarget) && 
        !avatar.contains(e.relatedTarget)) {
      toggleCard();
    }
  });

  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', async () => {
      await sbClient.auth.signOut();
      localStorage.removeItem('manodemy_auth');
      window.location.href = 'index.html';
    });
  }
});

// ── TOAST NOTIFICATION FOR LOCKED DAYS ──
let toastTimeout;
window.showUpgradeToast = (dayTitle) => {
  let toast = document.querySelector('.upgrade-toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'upgrade-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.innerHTML = `
      <div class="upgrade-toast__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div class="upgrade-toast__body">
        <p class="upgrade-toast__headline">"<span id="toastDayTitle"></span>" is a Pro feature</p>
        <p class="upgrade-toast__sub">Unlock all 30 days of structured coding challenges.</p>
      </div>
      <a href="index.html#pricing" class="upgrade-toast__cta">Upgrade Now →</a>
      <button class="upgrade-toast__dismiss" aria-label="Dismiss">×</button>
    `;
    document.body.appendChild(toast);
    
    toast.querySelector('.upgrade-toast__dismiss').addEventListener('click', () => {
      toast.classList.remove('is-visible');
      clearTimeout(toastTimeout);
    });
  }
  
  document.getElementById('toastDayTitle').textContent = dayTitle;
  void toast.offsetWidth; 
  toast.classList.add('is-visible');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), TOAST_DURATION_MS);
};

// ── ENGAGEMENT TIMER (UI) ──
document.addEventListener('DOMContentLoaded', () => {
  const displayEl = document.getElementById('pageTimerDisplay');
  const ringEl = document.querySelector('.timer-pulse-ring');
  if (!displayEl) return;
  
  const dayId = getDayId();
  if (!dayId) return;

  const storageKey = `manodemy_${dayId}_time_spent`;
  let activeSeconds = parseInt(safeStorageGet(storageKey) || '0', 10);
  
  let isTimerRunning = false;
  let timerInterval = null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const updateDisplay = () => {
    displayEl.textContent = formatTime(activeSeconds);
  };

  const startTimer = () => {
    if (isTimerRunning) return;
    isTimerRunning = true;
    if (ringEl) ringEl.classList.add('active');
    timerInterval = setInterval(() => {
      activeSeconds++;
      updateDisplay();
      // Save to storage every 5 seconds to reduce I/O overhead
      if (activeSeconds % 5 === 0) {
        safeStorageSet(storageKey, activeSeconds.toString());
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (!isTimerRunning) return;
    isTimerRunning = false;
    if (ringEl) ringEl.classList.remove('active');
    clearInterval(timerInterval);
    safeStorageSet(storageKey, activeSeconds.toString());
  };

  // Initial render
  updateDisplay();

  // Start timer if window is visible
  if (document.visibilityState === 'visible') {
    startTimer();
  }

  // Handle visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      startTimer();
    } else {
      pauseTimer();
    }
  });
  
  window.addEventListener('beforeunload', pauseTimer);
});

// ── PRACTICE MODE (THEORY HIDER) ──
document.addEventListener('DOMContentLoaded', () => {
  const pageName = window.location.pathname.split('/').pop() || 'day01.html';
  const storageKey = 'manodemy_practice_mode_' + pageName;
  const isPracticeMode = localStorage.getItem(storageKey) === 'true';
  
  if (isPracticeMode) {
    document.body.classList.add('practice-mode-active');
  }

  function updateTOC(isActive) {
    const tocList = document.querySelector('.toc-list');
    if (!tocList) return;
    
    if (!window.originalTOCHTML) {
        window.originalTOCHTML = tocList.innerHTML;
    }
    
    tocList.innerHTML = '';
    const sections = document.querySelectorAll('.nb-section');
    sections.forEach((sec, sIdx) => {
        const h2 = sec.querySelector('.nb-rich > h2, h2');
        if (h2 && !sec.id.includes('checks')) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + sec.id;
            a.className = 'toc-link';
            a.textContent = h2.textContent.replace(/🎯|💻|📊|✅|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|9\.|10\./g, '').trim().split(':')[0];
            li.appendChild(a);
            tocList.appendChild(li);
        }
        
        const questions = sec.querySelectorAll('.question');
        questions.forEach((q, qIdx) => {
            if (!q.id) {
                q.id = (sec.id || 'sec-' + sIdx) + '-q' + qIdx;
            }
            
            let fullText = q.textContent.trim();
            let match = fullText.match(/^(Q\d+|Task \d+)/i);
            if (match) {
                fullText = match[0];
            } else if (fullText.length > 35) {
                fullText = fullText.substring(0, 35) + '...';
            }
            
            const li = document.createElement('li');
            li.style.paddingLeft = '12px';
            li.style.fontSize = '0.9em';
            li.style.opacity = '0.85';
            
            const a = document.createElement('a');
            a.href = '#' + q.id;
            a.className = 'toc-link';
            if (q.classList.contains('is-solved-box')) {
                a.innerHTML = fullText + '<span class="toc-tick" style="float:right; color:var(--emerald, #10B981); font-weight:900; filter: drop-shadow(0 0 4px rgba(16,185,129,0.6));">✓</span>';
            } else {
                a.textContent = fullText;
            }
            li.appendChild(a);
            tocList.appendChild(li);
        });
    });
    
    if (typeof window.refreshTocTracking === 'function') {
        window.refreshTocTracking();
    }
  }

  updateTOC(isPracticeMode);

  // Inject Segmented Control above CONTENTS in sidebar
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'mode-toggle-segmented';
  
  const readBtn = document.createElement('button');
  readBtn.className = 'mode-segment-btn segment-read' + (!isPracticeMode ? ' active' : '');
  readBtn.innerHTML = '📖 Read';
  
  const practiceBtn = document.createElement('button');
  practiceBtn.className = 'mode-segment-btn segment-practice' + (isPracticeMode ? ' active' : '');
  practiceBtn.innerHTML = '💻 Practice';
  
  toggleContainer.appendChild(readBtn);
  toggleContainer.appendChild(practiceBtn);
  
  const sidebarTop = document.querySelector('.sidebar-top');
  const sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarTop && sidebarHeader) {
      sidebarTop.insertBefore(toggleContainer, sidebarHeader);
  } else {
      document.body.appendChild(toggleContainer);
  }

  function setMode(toPractice) {
    const isCurrentlyPractice = document.body.classList.contains('practice-mode-active');
    if (toPractice === isCurrentlyPractice) return;
    
    if (toPractice) {
      document.body.classList.add('practice-mode-active');
      localStorage.setItem(storageKey, 'true');
      readBtn.classList.remove('active');
      practiceBtn.classList.add('active');
    } else {
      document.body.classList.remove('practice-mode-active');
      localStorage.setItem(storageKey, 'false');
      practiceBtn.classList.remove('active');
      readBtn.classList.add('active');
    }
    updateTOC(toPractice);
  }

  readBtn.addEventListener('click', () => setMode(false));
  practiceBtn.addEventListener('click', () => setMode(true));
});
