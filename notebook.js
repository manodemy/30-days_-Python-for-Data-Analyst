// ═══════ MANODEMY — CODEMIRROR + PYODIDE ENGINE (shared across all days) ═══════



// --- StateManagement & Profile Avatar Constants ---

const SAVE_DEBOUNCE_MS = 400;

const TOTAL_QUESTIONS = 1540; // total across 30 days

const AVATAR_COLORS = ['--avatar-bg-1', '--avatar-bg-2', '--avatar-bg-3'];

const TOAST_DURATION_MS = 6000;



// Supabase client initialize (assumes loaded in head)

let sbClient = null;

if (typeof window.supabase !== 'undefined') {

  const SUPA_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';

  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

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



// ── CHALLENGE STATE HELPER ──────────────────────────────────────────────────
// Returns true only if a 24-hour grading window is currently open.
function isChallengeActive() {

  const dayId = getDayId();

  if (!dayId) return true; // Non-day pages: don't restrict

  const startTimeStr = safeStorageGet(`manodemy_${dayId}_start_time`);

  if (!startTimeStr) return false; // Never started — practice mode

  const startTime = parseInt(startTimeStr, 10);

  const elapsedMs = Date.now() - startTime;

  const total24HoursMs = 24 * 3600 * 1000;

  return elapsedMs < total24HoursMs; // Active only if within 24h

}

// ── CHALLENGE EVALUATION & RESOLUTION HELPER ─────────────────────────────────
// Checks if a challenge has expired, calculates final score, updates high scores if exceeded,
// and gracefully clears active challenge session state.
function checkAndResolveExpiredChallenge(dayId) {
  if (!dayId) return;

  const startTimeStr = safeStorageGet(`manodemy_${dayId}_start_time`);
  if (!startTimeStr) return;

  const startTime = parseInt(startTimeStr, 10);
  const elapsedMs = Date.now() - startTime;
  const total24HoursMs = 24 * 3600 * 1000;

  if (elapsedMs >= total24HoursMs) {
    console.log(`[Grading] 24h Challenge expired for ${dayId}. Evaluating...`);

    const currentSessionXP = parseFloat(safeStorageGet(`manodemy_${dayId}_xp_earned`) || '0');
    const currentSessionSolved = parseInt(safeStorageGet(`manodemy_${dayId}_solved_count`) || '0', 10);

    const bestScoreKey = `manodemy_${dayId}_best_score`;
    const bestSolvedKey = `manodemy_${dayId}_best_solved`;

    const previousBestScore = parseFloat(safeStorageGet(bestScoreKey) || '0');

    if (currentSessionXP > previousBestScore) {
      safeStorageSet(bestScoreKey, currentSessionXP.toFixed(2));
      safeStorageSet(bestSolvedKey, currentSessionSolved.toString());
      console.log(`[Grading] 🎉 New high score achieved! Score: ${currentSessionXP.toFixed(2)}, Solved: ${currentSessionSolved}`);
    } else {
      console.log(`[Grading] High score kept: ${previousBestScore.toFixed(2)}`);
    }

    // Clean up current active session keys so this evaluation only runs once
    try {
      localStorage.removeItem(`manodemy_${dayId}_start_time`);
      localStorage.removeItem(`manodemy_${dayId}_xp_earned`);
      localStorage.removeItem(`manodemy_${dayId}_solved_count`);
      sessionStorage.removeItem(`manodemy_${dayId}_start_time`);
      sessionStorage.removeItem(`manodemy_${dayId}_xp_earned`);
      sessionStorage.removeItem(`manodemy_${dayId}_solved_count`);
      
      // Clean up all _graded_solved keys to reset challenge progress for next start
      Object.keys(editors).forEach(cellId => {
        localStorage.removeItem(`manodemy_${dayId}_${cellId}_graded_solved`);
        sessionStorage.removeItem(`manodemy_${dayId}_${cellId}_graded_solved`);
      });
    } catch (e) {}

    successfulCells.clear();
  }
}

// Editors are ALWAYS unlocked — grading state does not lock the UI
const _dayStarted = true;



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

    readOnly: false, // Editors always unlocked — practice or active

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

  cm.on('focus', function(instance) {
    if (window.innerWidth <= 768) {
      showSymbolHelperBar(instance);
    }
  });

  cm.on('blur', function(instance) {
    setTimeout(hideSymbolHelperBar, 200);
  });



  // Editors are always interactive — no locked-state intercepts

  

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
    // 1. Resolve expired challenge state first
    checkAndResolveExpiredChallenge(dayId);

    // Restore cell contents

    Object.keys(editors).forEach(cellId => {

      const savedCode = safeStorageGet(`manodemy_${dayId}_${cellId}_code`);

      if (savedCode) {

        editors[cellId].setValue(savedCode);

      }

      const isSolved = safeStorageGet(`manodemy_${dayId}_${cellId}_solved`) === 'true';
      const isGradedSolved = safeStorageGet(`manodemy_${dayId}_${cellId}_graded_solved`) === 'true';

      if (isSolved) {
        document.getElementById(cellId).classList.add('is-solved');
      }

      if (isGradedSolved) {
        successfulCells.add(cellId);
      }

    });

  }

  updateScore(); // Initial score update

  setupGamifiedMarkingSystem(); // Initialize overlay locks, start buttons, modals and timer lifecycle



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

      // Also read best_solved count from localStorage
      const bestSolvedKey = `manodemy_${dayId}_best_solved`;
      const bestSolved = parseInt(safeStorageGet(bestSolvedKey) || '0', 10);

      // Use the higher of the three counts (score counter vs individual cells vs best solved)

      const finalSolved = Math.max(solvedCount, cellSolvedCount, bestSolved);



      // Skip sync if nothing meaningful to report

      if (secs < 5 && finalSolved === 0) return;



      // Read best_score and improve_clicks for this day
      const bestScoreKey = `manodemy_${dayId}_best_score`;
      const improveClicksKey = `manodemy_${dayId}_improve_clicks`;
      const bestScore = parseFloat(safeStorageGet(bestScoreKey) || '0');
      const improveClicks = parseInt(safeStorageGet(improveClicksKey) || '0', 10);

      // Also read current_score (XP earned in active challenge)
      const currentScoreKey = `manodemy_${dayId}_xp_earned`;
      const currentScore = parseFloat(safeStorageGet(currentScoreKey) || '0');
      const finalBestScore = Math.max(bestScore, currentScore);

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

          best_score:       finalBestScore,

          improve_clicks:   improveClicks,

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



// ── GAMIFIED TIMER & SCORING ENGINE ──

let countdownInterval = null;



function calculateDayXP() {

  const dayId = getDayId();

  if (!dayId) return 0;

  // Pure accuracy-based marks — no time decay multiplier

  // Formula: 1000 * (questions_solved / 1540)

  const solved = successfulCells.size;

  if (TOTAL_QUESTIONS === 0) return 0;

  const dayXP = 1000 * (solved / TOTAL_QUESTIONS);

  return dayXP;

}



function startCountdownTicker() {

  if (countdownInterval) clearInterval(countdownInterval);



  let _hasExpired = false; // Guard: only fire expiration logic once



  const updateTicker = () => {

    const dayId = getDayId();

    if (!dayId) return;



    const startTime = parseInt(safeStorageGet(`manodemy_${dayId}_start_time`) || '0', 10);

    if (!startTime) return;



    const elapsedMs = Date.now() - startTime;

    const total24HoursMs = 24 * 3600 * 1000;

    const remainingMs = Math.max(0, total24HoursMs - elapsedMs);



    // Format countdown

    const hours = Math.floor(remainingMs / (3600 * 1000));

    const minutes = Math.floor((remainingMs % (3600 * 1000)) / (60 * 1000));

    const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;



    const countdownVal = document.getElementById('countdownVal');

    if (countdownVal) {

      if (remainingMs === 0) {

        countdownVal.innerHTML = `00:00:00 <span style="color: #f43f5e; font-weight:900; margin-left:4px;">EXPIRED</span>`;

        // ── EXPIRATION: transition back to Practice Mode ─────────────────────

        if (!_hasExpired) {

          _hasExpired = true;

          clearInterval(countdownInterval);

          countdownInterval = null;

          // Show toast notification

          if (window.showUpgradeToast) {

            window.showUpgradeToast('24-hour grading session ended');

          }

          // Evaluate final challenge session score before resetting
          checkAndResolveExpiredChallenge(dayId);

          // Rebuild navbar: replace timer with "Improve score" button

          setTimeout(() => setupGamifiedMarkingSystem(), 1500);

        }

      } else {

        countdownVal.textContent = timeStr;

      }

    }



    // Only update scoreboard XP display during active challenge

    if (isChallengeActive()) {

      const dayXP = calculateDayXP();

      safeStorageSet(`manodemy_${dayId}_xp_earned`, dayXP.toFixed(2));
      safeStorageSet(`manodemy_${dayId}_solved_count`, successfulCells.size.toString());

      const xpEarnedEl = document.getElementById('scoreXPEarned');

      const maxBarXPEl = document.getElementById('scoreMaxXP');

      const maxDayXP = 1000 * (totalCells / TOTAL_QUESTIONS);

      if (xpEarnedEl) xpEarnedEl.textContent = dayXP.toFixed(1);

      if (maxBarXPEl) maxBarXPEl.textContent = maxDayXP.toFixed(1);

    }

  };



  updateTicker();

  countdownInterval = setInterval(updateTicker, 1000);

}



function setupGamifiedMarkingSystem() {

  const dayId = getDayId();

  if (!dayId) return;

  

  const maxDayMarks = (1000 * (totalCells / TOTAL_QUESTIONS)).toFixed(1);

  const marksPerQuestion = (1000 / TOTAL_QUESTIONS).toFixed(3);



  // 1. Inject custom warning modal if not present

  if (!document.getElementById('startCodingModal')) {

    const modalDiv = document.createElement('div');

    modalDiv.id = 'startCodingModal';

    modalDiv.className = 'custom-warning-modal';

    modalDiv.innerHTML = `

      <div class="workbook-locked-card">

         <div class="lock-icon-circle">

           <svg class="lock-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">

             <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>

             <path d="M7 11V7a5 5 0 0 1 10 0v4"/>

           </svg>

         </div>

         <h3 class="lock-title">Workbook Graded Challenge</h3>

         <p class="lock-desc" style="color: #94a3b8; font-size: 0.9rem; margin-top: -0.25rem;">
           Activate <span class="highlight-cyan">Graded Challenge Mode</span> to unlock and earn official Marks toward your Certificate of Mastery.
         </p>

         <!-- 2x2 marking system grid explanation -->
         <div class="marking-system-grid">
           
           <!-- Card 1: Scored Challenges -->
           <div class="marking-card">
             <div class="marking-card-header">
               <span class="marking-card-icon">📝</span>
               <span class="marking-card-title">Scored Challenges</span>
             </div>
             <div class="marking-card-body">
               Today's workbook has <span class="marking-card-highlight">${totalCells} interactive questions</span>. Each task contains automated tests to instantly evaluate your logic.
             </div>
           </div>

           <!-- Card 2: Marks Allocation -->
           <div class="marking-card">
             <div class="marking-card-header">
               <span class="marking-card-icon">🏆</span>
               <span class="marking-card-title">Marking Mechanics</span>
             </div>
             <div class="marking-card-body">
               Earn exactly <span class="marking-card-highlight">${marksPerQuestion} Marks</span> per correct solution, up to a maximum of <span class="marking-card-highlight">${maxDayMarks} Marks</span> for this workbook.
             </div>
           </div>

           <!-- Card 3: 24h Graded Window -->
           <div class="marking-card">
             <div class="marking-card-header">
               <span class="marking-card-icon">⏱️</span>
               <span class="marking-card-title">24-Hour Active Timer</span>
             </div>
             <div class="marking-card-body">
               Once started, a <span class="marking-card-highlight-gold">24-hour countdown timer</span> begins. Only your <span class="marking-card-highlight-green">highest-ever score</span> is synced—so your score never decreases.
             </div>
           </div>

           <!-- Card 4: Workspace Reset -->
           <div class="marking-card">
             <div class="marking-card-header">
               <span class="marking-card-icon">⚡</span>
               <span class="marking-card-title">Workspace Reset</span>
             </div>
             <div class="marking-card-body">
               To ensure academic integrity, starting resets all code cells in today's workbook. You can re-run and re-submit as many times as you like.
             </div>
           </div>

         </div>

         <div class="warning-text-container">

           <p class="warning-alert-text">⚠️ RESET WARNING: Resets all the code cells. Your profile's global high score will NOT be overwritten unless you achieve a new record!</p>

         </div>

         <div class="modal-actions">

           <button class="improve-score-grad-btn" id="confirmStartBtn">

             <svg class="play-icon-svg" viewBox="0 0 24 24" fill="currentColor">

               <polygon points="5 3 19 12 5 21 5 3"/>

             </svg>

             START GRADED CHALLENGE

           </button>

           <button class="modal-close-cancel-btn" id="cancelStartBtn">

             Cancel

           </button>

         </div>

      </div>

    `;

    document.body.appendChild(modalDiv);

    

    // Bind click outside

    modalDiv.onclick = (e) => {

      if (e.target === modalDiv) {

        modalDiv.classList.remove('show');

        document.body.classList.remove('modal-open');

      }

    };

    

    // Bind buttons

    document.getElementById('confirmStartBtn').onclick = () => {

      // ── TRACK IMPROVE SCORE CLICKS ──
      const clicksKey = `manodemy_${dayId}_improve_clicks`;
      const prevClicks = parseInt(safeStorageGet(clicksKey) || '0', 10);
      safeStorageSet(clicksKey, (prevClicks + 1).toString());

      // ── COMPLETE WIPE — code cells, solved flags, visual ticks ──

      Object.keys(editors).forEach(cellId => {

        // 1. Clear editor contents

        editors[cellId].setValue('');

        // 2. Remove saved code from storage

        try {
          localStorage.removeItem(`manodemy_${dayId}_${cellId}_code`);
          sessionStorage.removeItem(`manodemy_${dayId}_${cellId}_code`);
        } catch(e) {}

        // 3. Remove solved flag and graded solved flag from storage

        try {
          localStorage.removeItem(`manodemy_${dayId}_${cellId}_solved`);
          localStorage.removeItem(`manodemy_${dayId}_${cellId}_graded_solved`);
          sessionStorage.removeItem(`manodemy_${dayId}_${cellId}_solved`);
          sessionStorage.removeItem(`manodemy_${dayId}_${cellId}_graded_solved`);
        } catch(e) {}

        // 4. Remove green solved styling from cell

        const cellEl = document.getElementById(cellId);
        if (cellEl) cellEl.classList.remove('is-solved');

      });

      // 5. Clear all solved question box styling and TOC ticks

      document.querySelectorAll('.question, .task, .interview').forEach(q => {

        q.classList.remove('is-solved-box');

        if (q.id) {
          const tocLink = document.querySelector(`.toc-list a[href="#${q.id}"]`);
          if (tocLink) {
            const tick = tocLink.querySelector('.toc-tick');
            if (tick) tick.remove();
          }
        }

      });

      // 6. Reset the in-memory solved set and session score

      successfulCells.clear();

      // 7. Clear stored solved count and completion time

      try {
        localStorage.removeItem(`manodemy_${dayId}_solved_count`);
        localStorage.removeItem(`manodemy_${dayId}_completion_time`);
        localStorage.removeItem(`manodemy_${dayId}_xp_earned`);
        sessionStorage.removeItem(`manodemy_${dayId}_solved_count`);
        sessionStorage.removeItem(`manodemy_${dayId}_completion_time`);
        sessionStorage.removeItem(`manodemy_${dayId}_xp_earned`);
      } catch(e) {}

      // 8. Reset navbar scoreboard display to 0

      const solvedEl = document.getElementById('scoreSolved');
      const totalEl  = document.getElementById('scoreTotal');
      const xpEl     = document.getElementById('scoreXPEarned');
      const maxXpEl  = document.getElementById('scoreMaxXP');
      const progEl   = document.getElementById('scoreProgress');
      if (solvedEl) solvedEl.textContent = '0';
      if (totalEl)  totalEl.textContent  = totalCells;
      if (xpEl)     xpEl.textContent     = '0.0';
      if (maxXpEl)  maxXpEl.textContent  = (1000 * (totalCells / TOTAL_QUESTIONS)).toFixed(1);
      if (progEl)   progEl.style.width   = '0%';

      // 9. Set new start time (opens fresh 24-hour grading window)

      safeStorageSet(`manodemy_${dayId}_start_time`, Date.now().toString());

      // 10. Close modal

      document.getElementById('startCodingModal').classList.remove('show');
      document.body.classList.remove('modal-open');

      // 11. Rebuild navbar (show countdown timer)

      setupGamifiedMarkingSystem();

      // 12. Telemetry

      _notebookWriteActivity('challenge_started', {
        day_id:         dayId,
        improve_clicks: prevClicks + 1,
        page_url:       window.location.pathname
      });

    };

    

    document.getElementById('cancelStartBtn').onclick = () => {

      document.getElementById('startCodingModal').classList.remove('show');

      document.body.classList.remove('modal-open');

    };

  }

  

  // 2. Redesign .nav-score-card into a clean side-by-side horizontal grid

  const scoreCard = document.querySelector('.nav-score-card');

  if (scoreCard && !scoreCard.querySelector('.score-grid')) {

    scoreCard.innerHTML = `

      <div class="score-grid">

        <div class="score-col">

          <span class="score-label">Solved</span>

          <span class="score-val"><span id="scoreSolved" class="score-highlight">0</span><span class="score-slash">/</span><span id="scoreTotal">0</span></span>

        </div>

        <div class="score-divider"></div>

        <div class="score-col">

          <span class="score-label">Marks</span>

          <span class="score-val"><span id="scoreXPEarned" class="score-highlight">0.0</span><span class="score-slash">/</span><span id="scoreMaxXP">0.0</span></span>

        </div>

      </div>

      <div class="score-track"><div class="score-fill" id="scoreProgress" style="width:0%"></div></div>

    `;

    updateScore();

  }

  

  // 3. Determine current challenge state

  const active = isChallengeActive();

  // Editors are always unlocked in both modes

  Object.values(editors).forEach(cm => cm.setOption('readOnly', false));

  // Remove 'notebook-locked' class entirely — we no longer lock the notebook

  document.body.classList.remove('notebook-locked');

  if (!active) {

    // ── PRACTICE MODE: Show "Improve score" button ───────────────────────────

    // Remove countdown timer if it exists

    const existingTimer = document.getElementById('navCountdownTimer');

    if (existingTimer) existingTimer.remove();

    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }

    const navControls = document.querySelector('.nav-controls');

    if (navControls && !document.getElementById('navStartCodingBtn')) {

      const startBtn = document.createElement('button');

      startBtn.id = 'navStartCodingBtn';

      startBtn.className = 'start-coding-btn';

      startBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l6-6M22 2l-6 6M13.5 10.5L18 6M11.5 12.5L16 8M10 14l-4 4"/></svg>
        Improve score
      `;

      navControls.insertBefore(startBtn, navControls.firstChild);

    }

    const showWarningModal = () => {

      const modal = document.getElementById('startCodingModal');

      if (modal) { modal.classList.add('show'); document.body.classList.add('modal-open'); }

    };

    const navBtn = document.getElementById('navStartCodingBtn');

    if (navBtn) navBtn.onclick = showWarningModal;

  } else {

    // ── ACTIVE CHALLENGE MODE: Show countdown timer ──────────────────────────

    // Remove "Improve score" button if present

    const navBtn = document.getElementById('navStartCodingBtn');

    if (navBtn) navBtn.remove();

    const navControls = document.querySelector('.nav-controls');

    if (navControls && !document.getElementById('navCountdownTimer')) {

      const timerPill = document.createElement('div');

      timerPill.id = 'navCountdownTimer';

      timerPill.style.display = 'inline-flex';

      timerPill.style.alignItems = 'center';

      timerPill.style.gap = '8px';

      timerPill.style.padding = '6px 14px';

      timerPill.style.borderRadius = '50px';

      timerPill.style.background = 'rgba(11, 15, 25, 0.6)';

      timerPill.style.border = '1px solid rgba(244, 63, 94, 0.3)';

      timerPill.style.boxShadow = '0 0 15px rgba(244, 63, 94, 0.1)';

      timerPill.style.fontFamily = "'JetBrains Mono', monospace";

      timerPill.style.fontSize = '0.8rem';

      timerPill.style.fontWeight = '700';

      timerPill.style.color = '#fff';

      timerPill.style.marginRight = '8px';

      timerPill.innerHTML = `

        <span class="timer-dot" style="width: 8px; height: 8px; background: #f43f5e; border-radius: 50%; box-shadow: 0 0 8px #f43f5e; display: inline-block; animation: pulse 1.5s infinite;"></span>

        <span class="timer-label" style="font-size: 0.75rem; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.05em;">Timer:</span>

        <span class="timer-val" id="countdownVal">48:00:00</span>

      `;

      navControls.insertBefore(timerPill, navControls.firstChild);

    }

    

    startCountdownTicker();

  }

}



function updateScore() {
  const solvedEl = document.getElementById('scoreSolved');
  const totalEl = document.getElementById('scoreTotal');
  const progEl = document.getElementById('scoreProgress');

  const dayId = getDayId();
  const active = isChallengeActive();

  let solvedToShow = 0;
  let scoreToShow = 0.0;

  if (active) {
    solvedToShow = successfulCells.size;
    scoreToShow = calculateDayXP();

    if (dayId) {
      safeStorageSet(`manodemy_${dayId}_solved_count`, solvedToShow.toString());
      safeStorageSet(`manodemy_${dayId}_xp_earned`, scoreToShow.toFixed(2));

      // Completion freeze
      if (solvedToShow === totalCells && totalCells > 0) {
        if (!safeStorageGet(`manodemy_${dayId}_completion_time`)) {
          safeStorageSet(`manodemy_${dayId}_completion_time`, Date.now().toString());
        }
      } else {
        try {
          localStorage.removeItem(`manodemy_${dayId}_completion_time`);
          sessionStorage.removeItem(`manodemy_${dayId}_completion_time`);
        } catch(e) {}
      }
    }
  } else {
    // In Practice Mode, load and show best stats
    if (dayId) {
      scoreToShow = parseFloat(safeStorageGet(`manodemy_${dayId}_best_score`) || '0');
      solvedToShow = parseInt(safeStorageGet(`manodemy_${dayId}_best_solved`) || '0', 10);
    }
  }

  if (solvedEl && totalEl) {
    solvedEl.textContent = solvedToShow;
    totalEl.textContent = totalCells;

    if (progEl) {
      let pct = totalCells > 0 ? (solvedToShow / totalCells) * 100 : 0;
      progEl.style.width = pct + '%';
      if (pct === 100) {
        progEl.style.boxShadow = '0 0 12px var(--cyan)';
      } else {
        progEl.style.boxShadow = 'none';
      }
    }
  }

  if (dayId) {
    const xpEarnedEl = document.getElementById('scoreXPEarned');
    const maxBarXPEl = document.getElementById('scoreMaxXP');
    const maxDayXP = 1000 * (totalCells / TOTAL_QUESTIONS);

    if (xpEarnedEl) xpEarnedEl.textContent = scoreToShow.toFixed(1);
    if (maxBarXPEl) maxBarXPEl.textContent = maxDayXP.toFixed(1);
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

  if (document.body.classList.contains('notebook-locked')) {

    const modal = document.getElementById('startCodingModal');

    if (modal) {

      modal.classList.add('show');

      document.body.classList.add('modal-open');

    }

    return;

  }

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

        // ── VISUAL TICK: always applied in both Practice and Active modes ──

        cell.classList.add('is-solved');

        const dayId = getDayId();

        if (dayId) safeStorageSet(`manodemy_${dayId}_${cellId}_solved`, 'true');

        if (isChallengeActive()) {

          // ── ACTIVE CHALLENGE: update successfulCells set and scoreboard ──

          successfulCells.add(cellId);
          if (dayId) safeStorageSet(`manodemy_${dayId}_${cellId}_graded_solved`, 'true');

          // Sync to Supabase

          _notebookWriteActivity('question_solved', {

            question_id: cellId,

            page_url:    window.location.pathname

          });

          updateScore(); // Live scoreboard update

        } else {
          updateScore();
        }

      }

    } else {

      // Wrong/partial: always remove visual tick

      cell.classList.remove('is-solved');

      const dayId = getDayId();

      if (dayId) {
        safeStorageSet(`manodemy_${dayId}_${cellId}_solved`, 'false');
        safeStorageSet(`manodemy_${dayId}_${cellId}_graded_solved`, 'false');
      }

      if (isChallengeActive()) {

        // Only update scoreboard during active challenge

        successfulCells.delete(cellId);

        updateScore();

      } else {
        updateScore();
      }

    }



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

    cell.classList.remove('is-solved');
    const dayId = getDayId();
    if (dayId) {
      safeStorageSet(`manodemy_${dayId}_${cellId}_solved`, 'false');
      safeStorageSet(`manodemy_${dayId}_${cellId}_graded_solved`, 'false');
    }

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

// ══════════════════════════════════════════════════════════════════
// MOBILE VIEW HANDLERS (TOC DRAWER & SYMBOL HELPER BAR)
// ══════════════════════════════════════════════════════════════════

let activeEditorInstance = null;
let symbolHelperBarEl = null;

function initSymbolHelperBar() {
  if (symbolHelperBarEl) return;
  
  symbolHelperBarEl = document.createElement('div');
  symbolHelperBarEl.className = 'symbol-helper-bar';
  
  const symbols = ['[ ]', '{ }', '( )', '=', ':', '#', '.', '_', '→', '**', 'print', 'input', 'len', 'type'];
  
  symbols.forEach(sym => {
    const pill = document.createElement('button');
    pill.className = 'symbol-pill';
    pill.type = 'button';
    pill.textContent = sym;
    pill.addEventListener('mousedown', function(e) {
      e.preventDefault();
      if (activeEditorInstance) {
        let insertText = sym;
        if (sym === '[ ]') insertText = '[]';
        else if (sym === '{ }') insertText = '{}';
        else if (sym === '( )') insertText = '()';
        else if (sym === '→') insertText = '->';
        
        const doc = activeEditorInstance.getDoc();
        const cursor = doc.getCursor();
        doc.replaceRange(insertText, cursor);
        activeEditorInstance.focus();
        
        if (['[]', '{}', '()'].includes(insertText)) {
          activeEditorInstance.setCursor({line: cursor.line, ch: cursor.ch + 1});
        } else {
          activeEditorInstance.setCursor({line: cursor.line, ch: cursor.ch + insertText.length});
        }
      }
    });
    symbolHelperBarEl.appendChild(pill);
  });
  
  document.body.appendChild(symbolHelperBarEl);
}

function showSymbolHelperBar(cmInstance) {
  activeEditorInstance = cmInstance;
  initSymbolHelperBar();
  if (symbolHelperBarEl) {
    symbolHelperBarEl.classList.add('visible');
    symbolHelperBarEl.style.position = 'fixed';
    symbolHelperBarEl.style.bottom = '0';
    symbolHelperBarEl.style.left = '0';
    symbolHelperBarEl.style.right = '0';
  }
}

function hideSymbolHelperBar() {
  if (symbolHelperBarEl) {
    symbolHelperBarEl.classList.remove('visible');
  }
  activeEditorInstance = null;
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // --- TOC DRAWER BACKDROP ---
  const backdrop = document.createElement('div');
  backdrop.className = 'toc-backdrop';
  document.body.appendChild(backdrop);

  const toggleDrawer = () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('active');
  };

  backdrop.addEventListener('click', toggleDrawer);

  sidebar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  });

  // --- INJECT BOTTOM TAB BAR (TIER 1 & 2) ---
  const bottomBar = document.createElement('div');
  bottomBar.className = 'mobile-bottom-bar';
  bottomBar.innerHTML = `
    <button class="mobile-tab-btn active" id="mobileTabRead">
      <span class="tab-icon">📖</span>
      <span class="tab-label">Read</span>
    </button>
    <button class="mobile-tab-btn" id="mobileTabPractice">
      <span class="tab-icon">💻</span>
      <span class="tab-label">Practice</span>
    </button>
    <button class="mobile-tab-btn" id="mobileTabToc">
      <span class="tab-icon">📑</span>
      <span class="tab-label">Content</span>
    </button>
  `;
  document.body.appendChild(bottomBar);

  const readTab = document.getElementById('mobileTabRead');
  const practiceTab = document.getElementById('mobileTabPractice');
  const tocTab = document.getElementById('mobileTabToc');

  // Trigger practice mode click programmatically
  readTab.addEventListener('click', () => {
    const desktopReadBtn = document.querySelector('.segment-read');
    if (desktopReadBtn) {
      desktopReadBtn.click();
    } else {
      // Fallback
      document.body.classList.remove('practice-mode-active');
      readTab.classList.add('active');
      practiceTab.classList.remove('active');
    }
  });

  practiceTab.addEventListener('click', () => {
    const desktopPracticeBtn = document.querySelector('.segment-practice');
    if (desktopPracticeBtn) {
      desktopPracticeBtn.click();
    } else {
      // Fallback
      document.body.classList.add('practice-mode-active');
      readTab.classList.remove('active');
      practiceTab.classList.add('active');
    }
  });

  tocTab.addEventListener('click', toggleDrawer);

  // Sync Bottom Tab Bar active states when desktop segmented toggle is clicked
  document.addEventListener('click', (e) => {
    const segmentRead = e.target.closest('.segment-read');
    const segmentPractice = e.target.closest('.segment-practice');
    if (segmentRead) {
      readTab.classList.add('active');
      practiceTab.classList.remove('active');
    } else if (segmentPractice) {
      readTab.classList.remove('active');
      practiceTab.classList.add('active');
    }
  });

  // Sync initial tab states
  setTimeout(() => {
    const isPractice = document.body.classList.contains('practice-mode-active');
    if (isPractice) {
      readTab.classList.remove('active');
      practiceTab.classList.add('active');
    } else {
      readTab.classList.add('active');
      practiceTab.classList.remove('active');
    }
  }, 100);


  // ══════════════════════════════════════════════════════════════════
  // ⭐ COMPONENT 7: FOCUS MODE IMPLEMENTATION
  // ══════════════════════════════════════════════════════════════════

  let focusPairs = [];
  let currentIndex = -1;
  let focusOverlayEl = null;
  let focusContentEl = null;
  let focusCounterEl = null;
  let focusPrevBtn = null;
  let focusNextBtn = null;

  // Placeholder storage
  let currentPlaceholderQ = null;
  let currentPlaceholderC = null;

  function collectFocusPairs() {
    focusPairs = [];
    document.querySelectorAll('.question').forEach(q => {
      // Find the adjacent code-cell sibling (skip text nodes/comments)
      let cell = q.nextElementSibling;
      while (cell && !cell.classList.contains('code-cell') && !cell.classList.contains('question')) {
        cell = cell.nextElementSibling;
      }
      if (cell && cell.classList.contains('code-cell')) {
        focusPairs.push({ question: q, cell: cell });
      }
    });
  }

  function injectFocusButtons() {
    focusPairs.forEach((pair, idx) => {
      if (pair.question.querySelector('.focus-btn')) return;
      
      const btn = document.createElement('button');
      btn.className = 'focus-btn';
      btn.type = 'button';
      btn.innerHTML = '⛶ Focus';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openFocusMode(idx);
      });
      
      // Ensure question has relative positioning
      if (getComputedStyle(pair.question).position === 'static') {
        pair.question.style.position = 'relative';
      }
      pair.question.appendChild(btn);
    });
  }

  function initFocusOverlay() {
    if (focusOverlayEl) return;

    focusOverlayEl = document.createElement('div');
    focusOverlayEl.className = 'focus-overlay';
    focusOverlayEl.id = 'focusOverlay';
    focusOverlayEl.innerHTML = `
      <div class="focus-header">
        <button class="focus-exit-btn" id="focusExitBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Exit Focus
        </button>
        <div class="focus-counter" id="focusCounter">Question 0 of 0</div>
      </div>
      <div class="focus-content" id="focusContent"></div>
      <div class="focus-action-bar">
        <button class="focus-nav-btn" id="focusPrevBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Prev
        </button>
        <button class="focus-run-btn" id="focusRunBtn">▶ Run</button>
        <button class="focus-clear-btn" id="focusClearBtn">✕ Clear</button>
        <button class="focus-hint-btn" id="focusHintBtn">💡 Hint</button>
        <button class="focus-nav-btn" id="focusNextBtn">
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(focusOverlayEl);

    focusContentEl = document.getElementById('focusContent');
    focusCounterEl = document.getElementById('focusCounter');
    focusPrevBtn = document.getElementById('focusPrevBtn');
    focusNextBtn = document.getElementById('focusNextBtn');

    // Bind event listeners
    document.getElementById('focusExitBtn').addEventListener('click', closeFocusMode);
    focusPrevBtn.addEventListener('click', () => navigateFocus(-1));
    focusNextBtn.addEventListener('click', () => navigateFocus(1));

    document.getElementById('focusRunBtn').addEventListener('click', () => {
      if (currentIndex !== -1 && focusPairs[currentIndex]) {
        const cellId = focusPairs[currentIndex].cell.id;
        runCell(cellId);
      }
    });

    document.getElementById('focusClearBtn').addEventListener('click', () => {
      if (currentIndex !== -1 && focusPairs[currentIndex]) {
        const cellId = focusPairs[currentIndex].cell.id;
        clearOutput(cellId);
      }
    });

    document.getElementById('focusHintBtn').addEventListener('click', () => {
      if (currentIndex !== -1 && focusPairs[currentIndex]) {
        const cellId = focusPairs[currentIndex].cell.id;
        if (typeof showHint === 'function') {
          showHint(cellId);
        }
      }
    });
  }

  function openFocusMode(index) {
    if (index < 0 || index >= focusPairs.length) return;

    initFocusOverlay();

    // If already in Focus Mode, put current pair back first
    if (currentIndex !== -1) {
      restoreCurrentPair();
    }

    currentIndex = index;
    const pair = focusPairs[currentIndex];

    // Create placeholders at original position
    currentPlaceholderQ = document.createElement('div');
    currentPlaceholderQ.className = 'focus-placeholder-q';
    pair.question.parentNode.insertBefore(currentPlaceholderQ, pair.question);

    currentPlaceholderC = document.createElement('div');
    currentPlaceholderC.className = 'focus-placeholder-c';
    pair.cell.parentNode.insertBefore(currentPlaceholderC, pair.cell);

    // Move to overlay
    focusContentEl.appendChild(pair.question);
    focusContentEl.appendChild(pair.cell);

    // Show overlay
    document.body.classList.add('focus-mode-active');
    focusOverlayEl.classList.add('active');

    // Update Counter
    focusCounterEl.textContent = `Question ${currentIndex + 1} of ${focusPairs.length}`;

    // Update navigation button states
    focusPrevBtn.classList.toggle('disabled', currentIndex === 0);
    focusNextBtn.classList.toggle('disabled', currentIndex === focusPairs.length - 1);

    // Refresh CodeMirror layout to recalculate bounds inside the new overlay
    setTimeout(() => {
      const cellId = pair.cell.id;
      if (editors[cellId]) {
        editors[cellId].refresh();
        editors[cellId].focus();
      }
    }, 100);
  }

  function restoreCurrentPair() {
    if (currentIndex === -1) return;

    const pair = focusPairs[currentIndex];

    // Close any open hints for this cell to avoid floating popup issues
    if (typeof closeHint === 'function') {
      closeHint(pair.cell.id);
    }

    // Move back to placeholders
    if (currentPlaceholderQ && currentPlaceholderQ.parentNode) {
      currentPlaceholderQ.parentNode.insertBefore(pair.question, currentPlaceholderQ);
      currentPlaceholderQ.remove();
    }
    if (currentPlaceholderC && currentPlaceholderC.parentNode) {
      currentPlaceholderC.parentNode.insertBefore(pair.cell, currentPlaceholderC);
      currentPlaceholderC.remove();
    }

    currentPlaceholderQ = null;
    currentPlaceholderC = null;
  }

  function closeFocusMode() {
    if (currentIndex === -1) return;

    const pair = focusPairs[currentIndex];
    restoreCurrentPair();

    // Hide overlay
    document.body.classList.remove('focus-mode-active');
    if (focusOverlayEl) {
      focusOverlayEl.classList.remove('active');
    }

    // Scroll back to question
    setTimeout(() => {
      pair.question.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const cellId = pair.cell.id;
      if (editors[cellId]) {
        editors[cellId].refresh();
      }
    }, 100);

    currentIndex = -1;
  }

  function navigateFocus(direction) {
    const nextIdx = currentIndex + direction;
    if (nextIdx >= 0 && nextIdx < focusPairs.length) {
      openFocusMode(nextIdx);
    }
  }

  // --- INITIALIZE FOCUS MODE ---
  collectFocusPairs();
  injectFocusButtons();

  // Watch for dynamic elements if the page re-renders questions (defensive)
  const observer = new MutationObserver(() => {
    collectFocusPairs();
    injectFocusButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

