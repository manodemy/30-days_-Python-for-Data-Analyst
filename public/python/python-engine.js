// ═══════════════════════════════════════════════════════════════
// MANODEMY — PYTHON SLIDE PLAYER ENGINE
// Pyodide-powered equivalent of scrimba-engine.js for SQL.
// Handles: slide rendering, topic navigation, CodeMirror editors,
//          practice questions, test portal, score card, persistence.
// ═══════════════════════════════════════════════════════════════

'use strict';

// ── Global State ──────────────────────────────────────────────
let pyodide = null;
let pyodideReady = false;

let currentDayId   = null;
let currentDayData = null;
let currentSlideIndex  = 0;
let currentQuestionIndex = 0;

// Test portal state
let testEditor = null;
let testTimerInterval = null;
let testSecondsLeft = 7200;
let testAnswers = {};  // { questionId: { code, passed } }
let currentTestQuestionIndex = 0;

// Main editor
let mainEditor = null;

// Persistence
const STORAGE_KEY = 'manodemy_python_progress';

// ── Initialisation ────────────────────────────────────────────

async function init() {
  // Load Python engine
  try {
    updateLoadingProgress(20);
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    });
    updateLoadingProgress(70);

    // Pre-warm stdlib imports used by test questions
    await pyodide.runPythonAsync(`
import sys, io, math, time, functools, copy
from collections import defaultdict, Counter, namedtuple
from enum import Enum
print("Python engine ready.")
`);
    updateLoadingProgress(100);
    pyodideReady = true;

    // Enable run buttons
    document.getElementById('runBtn').disabled = false;
    document.getElementById('runBtn').textContent = '▶ Run';
    document.getElementById('testRunBtn').disabled = false;
    document.getElementById('testRunBtn').textContent = '▶ Run';

    const initMsg = document.getElementById('outputInitMsg');
    if (initMsg) initMsg.textContent = '✅ Python 3.11 ready. Write code and click Run.';

  } catch (err) {
    console.error('Pyodide failed to load:', err);
    document.getElementById('outputInitMsg').textContent = '❌ Python engine failed to load. Check your internet connection.';
  }

  setTimeout(() => {
    const overlay = document.getElementById('pyLoadingOverlay');
    if (overlay) overlay.style.display = 'none';
  }, 800);

  // Populate day selector
  buildDaySelector();

  // Load day based on search query parameter (?day=1 or ?day=2) or default to manifest[0]
  const urlParams = new URLSearchParams(window.location.search);
  const requestedDay = parseInt(urlParams.get('day'), 10);
  let initialDay = window.COURSE_MANIFEST && window.COURSE_MANIFEST[0];
  if (requestedDay && window.COURSE_MANIFEST) {
    const found = window.COURSE_MANIFEST.find(d => d.day === requestedDay);
    if (found) initialDay = found;
  }
  if (initialDay) {
    loadDay(initialDay.id);
  }

  // Init main CodeMirror editor
  initMainEditor();

  // Init divider drag
  initDivider();
}

function updateLoadingProgress(pct) {
  const bar = document.getElementById('pyLoadingBar');
  if (bar) bar.style.width = pct + '%';
}

// ── Day Selector ──────────────────────────────────────────────

function buildDaySelector() {
  const sel = document.getElementById('daySelect');
  if (!sel || !window.COURSE_MANIFEST) return;
  sel.innerHTML = window.COURSE_MANIFEST.map(d =>
    `<option value="${d.id}">Day ${String(d.day).padStart(2,'0')}</option>`
  ).join('');
  sel.addEventListener('change', () => loadDay(sel.value));
}

function loadDay(dayId) {
  const data = window.COURSE_CONTENT && window.COURSE_CONTENT[dayId];
  if (!data) { console.warn('No content for', dayId); return; }

  currentDayId   = dayId;
  currentDayData = data;
  currentSlideIndex = 0;
  currentQuestionIndex = 0;

  // Sync day selector
  const sel = document.getElementById('daySelect');
  if (sel) sel.value = dayId;

  // Build topic selector
  buildTopicSelector(data);

  // Load slide 0
  renderSlide(0);

  // Load first practice question
  loadPracticeQuestion(0);

  // Update header stats
  updateStatsCard();

  // Update test title
  const tt = document.getElementById('testTitle');
  if (tt) tt.textContent = `🐍 Python Day ${data.day} — Interview Test`;
}

// ── Topic Selector ────────────────────────────────────────────

function buildTopicSelector(data) {
  const sel = document.getElementById('topicSelect');
  if (!sel || !data.slides) return;
  sel.innerHTML = data.slides.map((s, i) =>
    `<option value="${i}">${s.title}</option>`
  ).join('');
}

function onTopicSelectChange(val) {
  const idx = parseInt(val, 10);
  if (!isNaN(idx)) renderSlide(idx);
}

// ── Slide Rendering ───────────────────────────────────────────

function renderSlide(index) {
  if (!currentDayData || !currentDayData.slides) return;
  const slides = currentDayData.slides;
  if (index < 0 || index >= slides.length) return;

  currentSlideIndex = index;

  const slide = slides[index];

  // Update topic selector
  const topicSel = document.getElementById('topicSelect');
  if (topicSel) topicSel.value = index;

  // Slide header
  const header = document.getElementById('slideHeader');
  if (header) {
    header.innerHTML = `
      <span class="slide-topic-tag">${slide.title}</span>
      <span class="slide-duration" style="font-size:0.75rem;color:#64748b;margin-left:auto;">${slide.duration || ''}</span>
    `;
  }

  // Slide body
  const body = document.getElementById('slideBodyText');
  if (body) {
    body.innerHTML = slide.html || '';
    // Scroll to top
    const sc = document.getElementById('slideContent');
    if (sc) sc.scrollTop = 0;
  }

  // Update present mode if open
  const presentSlide = document.getElementById('presentSlideContent');
  if (presentSlide) presentSlide.innerHTML = slide.html || '';

  // Update counters
  updateSlideCounter();
}

function updateSlideCounter() {
  const slides = currentDayData ? (currentDayData.slides || []) : [];
  const total = slides.length;
  const cur = currentSlideIndex + 1;
  const barEl = document.getElementById('slideCounterBar');
  const presEl = document.getElementById('presentCounter');
  if (barEl) barEl.textContent = `${cur} / ${total}`;
  if (presEl) presEl.textContent = `${cur} / ${total}`;
}

function prevSlide() {
  renderSlide(currentSlideIndex - 1);
}

function nextSlide() {
  renderSlide(currentSlideIndex + 1);
}

// ── Practice Questions ────────────────────────────────────────

function loadPracticeQuestion(index) {
  if (!currentDayData || !currentDayData.practiceQuestions) return;
  const qs = currentDayData.practiceQuestions;
  if (index < 0 || index >= qs.length) return;

  currentQuestionIndex = index;
  const q = qs[index];

  const promptEl = document.getElementById('questionPrompt');
  if (promptEl) promptEl.innerHTML = `Q${index + 1}. ${q.prompt}`;

  const counterEl = document.getElementById('qCounter');
  if (counterEl) counterEl.textContent = `Question-${String(index + 1).padStart(2,'0')}`;

  // Set starter code
  if (mainEditor) {
    mainEditor.setValue(q.starterCode || '# Write your answer here\n');
    mainEditor.clearHistory();
  }

  // Clear output
  clearOutput();
}

function prevQuestion() {
  loadPracticeQuestion(currentQuestionIndex - 1);
}

function nextQuestion() {
  loadPracticeQuestion(currentQuestionIndex + 1);
}

function updateStatsCard() {
  const qs = currentDayData ? (currentDayData.practiceQuestions || []) : [];
  const total = qs.length;
  const solved = 0; // could track per-session
  document.getElementById('solvedCount').textContent = solved;
  document.getElementById('totalQuestions').textContent = total;
  document.getElementById('marksCount').textContent = solved.toFixed(1);
  document.getElementById('totalMarks').textContent = total.toFixed(1);
  const pct = total > 0 ? (solved / total) * 100 : 0;
  document.getElementById('statsProgressFill').style.width = pct + '%';
}

// ── Main Editor (CodeMirror) ──────────────────────────────────

function initMainEditor() {
  const wrap = document.getElementById('mainEditorWrap');
  if (!wrap || mainEditor) return;

  mainEditor = CodeMirror(wrap, {
    value: '# Write your answer here\n',
    mode: 'python',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    extraKeys: {
      Tab: cm => cm.execCommand('indentMore'),
      'Shift-Tab': cm => cm.execCommand('indentLess'),
      'Ctrl-Enter': () => runCurrentCode(),
      'Cmd-Enter': () => runCurrentCode(),
    },
    lineWrapping: true,
  });

  // Resize observer to fix CodeMirror height
  const ro = new ResizeObserver(() => mainEditor && mainEditor.refresh());
  ro.observe(wrap);
}

// ── Code Execution ────────────────────────────────────────────

async function runCurrentCode() {
  if (!pyodideReady) {
    showOutput([{ type: 'error', text: '⏳ Python engine still loading. Please wait.' }]);
    return;
  }
  const code = mainEditor ? mainEditor.getValue() : '';
  const out = await executePython(code);
  renderOutput(out, document.getElementById('mainOutput'));
}

function resetCode() {
  const q = currentDayData &&
    currentDayData.practiceQuestions &&
    currentDayData.practiceQuestions[currentQuestionIndex];
  if (mainEditor) {
    mainEditor.setValue(q ? (q.starterCode || '# Write your answer here\n') : '# Write your answer here\n');
  }
  clearOutput();
}

function clearEditor() {
  if (mainEditor) mainEditor.setValue('');
}

function clearOutput() {
  const out = document.getElementById('mainOutput');
  if (out) {
    out.innerHTML = '<div class="output-label">Python Output</div><span class="output-success">Ready…</span>';
  }
}

// ── Core Pyodide Execution ────────────────────────────────────

async function executePython(code) {
  if (!pyodide) return [{ type: 'error', text: 'Python engine not ready.' }];

  try {
    // Reset stdout
    await pyodide.runPythonAsync(`
import sys, io as _io
sys.stdout = _io.StringIO()
sys.stderr = sys.stdout
`);
    await pyodide.runPythonAsync(code);
    const stdout = String(await pyodide.runPythonAsync(`sys.stdout.getvalue()`));
    return [{ type: 'success', text: stdout || '(no output)' }];
  } catch (err) {
    return [{ type: 'error', text: err.message || String(err) }];
  }
}

function renderOutput(lines, container) {
  if (!container) return;
  let html = '<div class="output-label">Python Output</div>';
  for (const line of lines) {
    if (line.type === 'error') {
      html += `<span class="output-error" style="color:#f87171;white-space:pre-wrap;">${escHtml(line.text)}</span>`;
    } else {
      html += `<span class="output-success" style="white-space:pre-wrap;">${escHtml(line.text)}</span>`;
    }
  }
  container.innerHTML = html;
}

function showOutput(lines) {
  renderOutput(lines, document.getElementById('mainOutput'));
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Test Portal ───────────────────────────────────────────────

function openTestPortal() {
  if (!currentDayData || !currentDayData.testQuestions) {
    alert('No test questions available for this day.');
    return;
  }

  document.getElementById('testOverlay').style.display = 'flex';
  buildTestSidebar();
  loadTestQuestion(0);
  startTestTimer();
}

function closeTestPortal() {
  document.getElementById('testOverlay').style.display = 'none';
  clearInterval(testTimerInterval);
}

function buildTestSidebar() {
  const sidebar = document.getElementById('testSidebar');
  const qs = currentDayData.testQuestions;
  sidebar.innerHTML = qs.map((q, i) => {
    const state = testAnswers[q.id];
    const cls = state ? (state.passed ? 'sidebar-btn--passed' : 'sidebar-btn--attempted') : '';
    return `<button class="sidebar-btn ${cls}" onclick="loadTestQuestion(${i})" id="testSidebarBtn-${i}">${i + 1}</button>`;
  }).join('');
}

function loadTestQuestion(index) {
  const qs = currentDayData.testQuestions;
  if (index < 0 || index >= qs.length) return;
  currentTestQuestionIndex = index;
  const q = qs[index];

  const prompt = document.getElementById('testQuestionPrompt');
  if (prompt) prompt.innerHTML = `
    <div style="font-size:0.78rem;color:#64748b;margin-bottom:6px;">Q${index + 1} of ${qs.length}</div>
    <div style="font-weight:600;line-height:1.6;">${q.prompt}</div>
    ${q.validation && q.validation.checkVars ?
      `<div style="margin-top:8px;padding:6px 10px;background:rgba(59,130,246,0.08);border-left:3px solid #3b82f6;border-radius:4px;font-size:0.78rem;color:#93c5fd;">
        📌 Store your answer in: ${q.validation.checkVars.map(v => `<code>${v.name}</code>`).join(', ')}
      </div>` : ''}
  `;

  const counter = document.getElementById('testQCounter');
  if (counter) counter.textContent = `Q${index + 1} / ${qs.length}`;

  // Set/restore editor content
  const saved = testAnswers[q.id];
  const code = saved ? saved.code : (q.starterCode || '# Write your answer here\n');

  if (!testEditor) {
    const wrap = document.getElementById('testEditorWrap');
    testEditor = CodeMirror(wrap, {
      value: code,
      mode: 'python',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      extraKeys: {
        Tab: cm => cm.execCommand('indentMore'),
        'Shift-Tab': cm => cm.execCommand('indentLess'),
        'Ctrl-Enter': () => runTestCode(),
        'Cmd-Enter': () => runTestCode(),
      },
      lineWrapping: true,
    });
  } else {
    testEditor.setValue(code);
    testEditor.clearHistory();
  }

  // Clear output and banner
  const out = document.getElementById('testOutput');
  if (out) out.innerHTML = '<div class="output-label">Python Output</div><span class="output-success">Ready…</span>';
  hideBanner();
}

async function runTestCode() {
  if (!pyodideReady) return;
  const qs = currentDayData.testQuestions;
  const q = qs[currentTestQuestionIndex];
  const code = testEditor ? testEditor.getValue() : '';

  // Save code
  if (!testAnswers[q.id]) testAnswers[q.id] = {};
  testAnswers[q.id].code = code;

  // Execute
  const out = await executePython(code);
  renderOutput(out, document.getElementById('testOutput'));

  // Grade
  if (typeof window.pyGradeSubmission === 'function') {
    const result = await window.pyGradeSubmission(code, q, pyodide);

    testAnswers[q.id].passed = result.passed;
    testAnswers[q.id].message = result.message;
    testAnswers[q.id].stdout = result.stdout;

    showBanner(result.passed, result.message);
    updateSidebarButton(currentTestQuestionIndex, result.passed);
    updateTestProgress();
  }
}

function clearTestEditor() {
  if (testEditor) testEditor.setValue('');
}

function showBanner(passed, message) {
  const banner = document.getElementById('testValidationBanner');
  if (!banner) return;
  banner.style.display = 'block';
  banner.style.background = passed ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
  banner.style.borderLeft = `3px solid ${passed ? '#22c55e' : '#ef4444'}`;
  banner.style.color = passed ? '#86efac' : '#fca5a5';
  banner.innerHTML = message;
}

function hideBanner() {
  const banner = document.getElementById('testValidationBanner');
  if (banner) banner.style.display = 'none';
}

function updateSidebarButton(index, passed) {
  const btn = document.getElementById(`testSidebarBtn-${index}`);
  if (!btn) return;
  btn.className = `sidebar-btn ${passed ? 'sidebar-btn--passed' : 'sidebar-btn--attempted'}`;
}

function updateTestProgress() {
  const attempted = Object.keys(testAnswers).length;
  const passed = Object.values(testAnswers).filter(a => a.passed).length;
  const total = currentDayData.testQuestions.length;

  document.getElementById('testAttemptedCount').textContent = attempted;
  document.getElementById('testBestScoreCount').textContent = passed;
  document.getElementById('testProgress').textContent = `Attempted: ${attempted} / ${total}`;
  document.getElementById('testProgressFill').style.width = `${(attempted / total) * 100}%`;
}

function submitTest() {
  closeTestPortal();
  openScoreCard();
}

// ── Score Card ────────────────────────────────────────────────

function openScoreCard() {
  if (!currentDayData) return;
  const qs = currentDayData.testQuestions || [];
  const passed = Object.values(testAnswers).filter(a => a.passed).length;

  document.getElementById('scoreBig').textContent = `${passed} / ${qs.length}`;

  const tbody = document.getElementById('scorecardBody');
  tbody.innerHTML = qs.map((q, i) => {
    const ans = testAnswers[q.id];
    const status = ans ? (ans.passed ? '✅' : '❌') : '—';
    const codePreview = ans && ans.code ? escHtml(ans.code.slice(0, 80)) + (ans.code.length > 80 ? '…' : '') : '—';
    return `<tr>
      <td>${i + 1}</td>
      <td>${status}</td>
      <td><code style="font-size:0.72rem;">${codePreview}</code></td>
    </tr>`;
  }).join('');

  document.getElementById('scorecardOverlay').style.display = 'flex';
}

function openTestScoreCard() {
  openScoreCard();
}

function closeScorecard() {
  document.getElementById('scorecardOverlay').style.display = 'none';
}

// ── Timer ─────────────────────────────────────────────────────

function startTestTimer() {
  testSecondsLeft = 7200;
  clearInterval(testTimerInterval);
  testTimerInterval = setInterval(() => {
    testSecondsLeft--;
    const m = Math.floor(testSecondsLeft / 60);
    const s = testSecondsLeft % 60;
    const el = document.getElementById('testTimer');
    if (el) el.textContent = `${String(m).padStart(3,'0')}:${String(s).padStart(2,'0')}`;
    if (testSecondsLeft <= 0) {
      clearInterval(testTimerInterval);
      submitTest();
    }
  }, 1000);
}

// ── Present Mode ──────────────────────────────────────────────

function closePresentMode() {
  document.getElementById('presentOverlay').style.display = 'none';
}

let penMode = false;
function togglePen() {
  penMode = !penMode;
  document.getElementById('penBtn').textContent = penMode ? '✏️ Stop Drawing' : '✏️ Draw';
}

// ── Divider Resize ────────────────────────────────────────────

function initDivider() {
  const divider = document.getElementById('divider');
  const container = document.getElementById('workspaceContainer');
  const left = document.getElementById('panelLeft');
  const right = document.getElementById('panelRight');
  if (!divider || !container || !left || !right) return;

  let dragging = false;
  divider.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON') return;
    dragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    let pct = ((e.clientX - rect.left) / rect.width) * 100;
    pct = Math.max(20, Math.min(80, pct));
    left.style.flex = `0 0 ${pct}%`;
    right.style.flex = `0 0 ${100 - pct}%`;
    if (mainEditor) mainEditor.refresh();
  });
  document.addEventListener('mouseup', () => {
    dragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

function toggleLeftPanel(e) {
  e.stopPropagation();
  const left = document.getElementById('panelLeft');
  const right = document.getElementById('panelRight');
  const hidden = left.style.display === 'none';
  left.style.display = hidden ? '' : 'none';
  right.style.flex = hidden ? '' : '1';
}

function toggleRightPanel(e) {
  e.stopPropagation();
  const right = document.getElementById('panelRight');
  const left = document.getElementById('panelLeft');
  const hidden = right.style.display === 'none';
  right.style.display = hidden ? '' : 'none';
  left.style.flex = hidden ? '' : '1';
}

function resetSplitScreen(e) {
  e.stopPropagation();
  const left = document.getElementById('panelLeft');
  const right = document.getElementById('panelRight');
  left.style.flex = '';
  left.style.display = '';
  right.style.flex = '';
  right.style.display = '';
  if (mainEditor) mainEditor.refresh();
}

// ── Mobile Tabs ───────────────────────────────────────────────

function setMobileTab(tab) {
  const ws = document.getElementById('workspaceContainer');
  const btnT = document.getElementById('tabBtnTheory');
  const btnP = document.getElementById('tabBtnPractice');
  if (tab === 'theory') {
    ws.classList.add('mobile-show-theory');
    ws.classList.remove('mobile-show-practice');
    btnT.classList.add('active');
    btnP.classList.remove('active');
  } else {
    ws.classList.add('mobile-show-practice');
    ws.classList.remove('mobile-show-theory');
    btnP.classList.add('active');
    btnT.classList.remove('active');
  }
}

// ── Bootstrap ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
