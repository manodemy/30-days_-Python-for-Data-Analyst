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

// Narration/Playback State
let isCombinedPlaying = false;
let combinedTrackIndex = 0;
let combinedTracks = [];
let combinedTrackDurations = [];
let totalCombinedDuration = 0;
let currentCombinedTime = 0;
let currentPlaybackRate = 1.0;
let currentPlaybackVolume = 1.0;
let ttsUtterance = null;
let playbackTimerInterval = null;
let isMuted = false;

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

  // Initialize premium custom dropdown overlays
  initCustomDropdowns();
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
    `<option value="${d.id}">${d.emoji || '🐍'} Day ${String(d.day).padStart(2,'0')}: ${d.title}</option>`
  ).join('');
  sel.addEventListener('change', () => loadDay(sel.value));
}

// Custom dropdown initializer to replace native select inputs with a premium dropdown menu
function initCustomDropdowns() {
  const selects = document.querySelectorAll('.day-picker-pill select');
  selects.forEach(select => {
    select.style.display = 'none';
    const wrapper = select.parentElement;
    
    let trigger = wrapper.querySelector('.custom-select-trigger');
    let optionsMenu = wrapper.querySelector('.custom-select-options');
    
    function updateTriggerText() {
      const textSpan = trigger.querySelector('.selected-text');
      if (textSpan) {
        const option = select.options[select.selectedIndex];
        if (select.id === 'topicSelect' && option) {
          const slideIdx = parseInt(option.value);
          const duration = getSlideDurationString(slideIdx);
          const slide = currentDayData && currentDayData.slides && currentDayData.slides[slideIdx];
          const cleanedTitle = slide ? slide.title.replace(/^\d+\.\s*/, '') : option.text;
          textSpan.innerHTML = `
            <span class="trigger-title">Topic 0${slideIdx + 1}: ${cleanedTitle}</span>
            <span class="trigger-duration-badge">${duration}</span>
          `;
        } else if (option) {
          if (select.id === 'daySelect') {
            const dayMeta = window.COURSE_MANIFEST.find(d => d.id === option.value);
            const dayNum = dayMeta ? String(dayMeta.day).padStart(2, '0') : '01';
            textSpan.textContent = `Day ${dayNum}`;
          } else {
            textSpan.textContent = option.text;
          }
        } else {
          textSpan.textContent = '';
        }
      }
    }

    function populateOptions() {
      optionsMenu.innerHTML = '';
      Array.from(select.options).forEach((opt) => {
        const optionItem = document.createElement('div');
        optionItem.className = `custom-select-option${opt.selected ? ' selected' : ''}`;
        
        if (select.id === 'topicSelect') {
          const slideIdx = parseInt(opt.value);
          const duration = getSlideDurationString(slideIdx);
          const slide = currentDayData && currentDayData.slides && currentDayData.slides[slideIdx];
          const cleanedTitle = slide ? slide.title.replace(/^\d+\.\s*/, '') : opt.text;
          optionItem.innerHTML = `
            <span class="option-title">Topic 0${slideIdx + 1}: ${cleanedTitle}</span>
            <span class="option-duration">${duration}</span>
          `;
        } else {
          optionItem.textContent = opt.text;
        }
        
        optionItem.dataset.value = opt.value;
        optionItem.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          select.dispatchEvent(new Event('change'));
          optionsMenu.classList.remove('open');
          wrapper.classList.remove('open');
          trigger.classList.remove('open');
        });
        optionsMenu.appendChild(optionItem);
      });
      updateTriggerText();
    }
    
    if (trigger && optionsMenu) {
      populateOptions();
      return;
    }
    
    // Remove old native chevron
    wrapper.querySelector('.day-picker-chevron')?.remove();
    
    if (!trigger) {
      trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      wrapper.appendChild(trigger);
    }
    
    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    }
    
    trigger.innerHTML = `
      <span class="selected-text"></span>
      <span class="day-picker-chevron">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1.5L5 5L9 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;
    
    populateOptions();
    
    wrapper.onclick = (e) => {
      e.stopPropagation();
      const isOpen = optionsMenu.classList.contains('open');
      document.querySelectorAll('.custom-select-options').forEach(menu => {
        menu.classList.remove('open');
        menu.parentElement.classList.remove('open');
        menu.previousElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        optionsMenu.classList.add('open');
        wrapper.classList.add('open');
        trigger.classList.add('open');
      }
    };
    
    select.addEventListener('change', () => {
      updateTriggerText();
      optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
        if (el.dataset.value === select.value) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    });
    
    const observer = new MutationObserver(() => {
      populateOptions();
    });
    observer.observe(select, { childList: true });
    
    const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(select, 'value', {
      get() {
        return descriptor.get.call(this);
      },
      set(val) {
        descriptor.set.call(this, val);
        updateTriggerText();
        optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
          if (el.dataset.value === String(val)) {
            el.classList.add('selected');
          } else {
            el.classList.remove('selected');
          }
        });
      }
    });
  });
  
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options').forEach(menu => {
      menu.classList.remove('open');
      menu.parentElement.classList.remove('open');
      menu.previousElementSibling.classList.remove('open');
    });
  });
}

function getSlideDurationString(slideIdx) {
  if (currentDayData && currentDayData.slides && currentDayData.slides[slideIdx]) {
    return currentDayData.slides[slideIdx].duration || '5:00';
  }
  return '5:00';
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

  // Re-build slide narration track segments
  buildNarrationTracksForSlide();
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
    let cls = '';
    if (state) {
      cls = state.passed ? 'correct' : 'incorrect';
    }
    if (i === currentTestQuestionIndex) {
      cls += ' current';
    }
    return `<button class="test-q-btn ${cls}" onclick="loadTestQuestion(${i})" id="testSidebarBtn-${i}"><span class="q-prefix">Q</span>${i + 1}</button>`;
  }).join('');
}

function loadTestQuestion(index) {
  const qs = currentDayData.testQuestions;
  if (index < 0 || index >= qs.length) return;
  currentTestQuestionIndex = index;
  const q = qs[index];

  // Update current classes in sidebar
  document.querySelectorAll('#testSidebar .test-q-btn').forEach((btn, i) => {
    if (i === index) {
      btn.classList.add('current');
    } else {
      btn.classList.remove('current');
    }
  });

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
  btn.className = `test-q-btn current ${passed ? 'correct' : 'incorrect'}`;
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

// ── Playback Controls & Narration System ──────────────────────

function buildNarrationTracksForSlide() {
  pauseCombinedPlayback();
  
  const slideContainer = document.getElementById('slideContent');
  if (!slideContainer) return;
  
  // Find all slide sections
  const sections = Array.from(slideContainer.querySelectorAll('.slide-section'));
  if (sections.length === 0) {
    sections.push(slideContainer);
  }
  
  combinedTracks = sections.map((sect) => {
    // Extract text, strip code block elements for clean reading
    const clone = sect.cloneNode(true);
    // Remove pre and code blocks
    clone.querySelectorAll('pre, code, svg, .db-table-mock').forEach(el => el.remove());
    
    let text = clone.innerText || clone.textContent || "";
    // Clean text: normalize spaces
    text = text.replace(/\s+/g, ' ').trim();
    
    // Fallback if empty text
    if (!text) {
      text = "This section displays illustrations of the concept.";
    }
    
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    const duration = Math.max(3.5, wordCount / 2.2);
    
    return {
      element: sect,
      text: text,
      duration: duration
    };
  });
  
  combinedTrackDurations = combinedTracks.map(t => t.duration);
  totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
  combinedTrackIndex = 0;
  currentCombinedTime = 0;
  
  // Show play buttons and progress bar
  const navBtn = document.getElementById('navPlayBtn');
  if (navBtn) navBtn.style.display = 'inline-flex';
  document.getElementById('playbackBar')?.classList.add('visible');
  
  updatePlayButtonStates(false);
  updateProgressUI();
}

function toggleCombinedPlayback() {
  if (isCombinedPlaying) {
    pauseCombinedPlayback();
  } else {
    playCombinedPlayback();
  }
}

function playCombinedPlayback() {
  isCombinedPlaying = true;
  updatePlayButtonStates(true);
  
  // Start timer interval to update progress UI
  if (playbackTimerInterval) clearInterval(playbackTimerInterval);
  playbackTimerInterval = setInterval(() => {
    if (isCombinedPlaying) {
      currentCombinedTime = Math.min(totalCombinedDuration, currentCombinedTime + 0.1);
      updateProgressUI();
      
      if (currentCombinedTime >= totalCombinedDuration) {
        onCombinedPlaybackEnded();
      }
    }
  }, 100);
  
  speakTrackSegment(combinedTrackIndex);
}

function pauseCombinedPlayback() {
  isCombinedPlaying = false;
  updatePlayButtonStates(false);
  
  if (playbackTimerInterval) {
    clearInterval(playbackTimerInterval);
    playbackTimerInterval = null;
  }
  
  window.speechSynthesis.cancel();
}

function speakTrackSegment(trackIdx) {
  if (!isCombinedPlaying) return;
  if (trackIdx < 0 || trackIdx >= combinedTracks.length) {
    onCombinedPlaybackEnded();
    return;
  }
  
  combinedTrackIndex = trackIdx;
  const track = combinedTracks[trackIdx];
  
  // Highlight active section visually
  combinedTracks.forEach((t, i) => {
    if (i === trackIdx) {
      t.element.classList.add('active-narration');
      t.element.classList.remove('inactive-narration');
      t.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      t.element.classList.remove('active-narration');
      t.element.classList.add('inactive-narration');
    }
  });

  // Highlight caption box
  const captionBox = document.getElementById('workspaceVpCaption');
  if (captionBox) {
    captionBox.style.display = 'block';
    captionBox.textContent = `📢 Narrator: "${track.text.substring(0, 100)}${track.text.length > 100 ? '...' : ''}"`;
  }
  
  // Calculate elapsed time up to the start of this segment
  let startOffset = 0;
  for (let i = 0; i < trackIdx; i++) {
    startOffset += combinedTrackDurations[i];
  }
  currentCombinedTime = startOffset;
  
  // Cancel previous speech synthesis
  window.speechSynthesis.cancel();
  
  // Create SpeechSynthesisUtterance
  ttsUtterance = new SpeechSynthesisUtterance(track.text);
  ttsUtterance.rate = currentPlaybackRate;
  ttsUtterance.volume = isMuted ? 0 : currentPlaybackVolume;
  
  ttsUtterance.onend = () => {
    if (isCombinedPlaying && combinedTrackIndex === trackIdx) {
      speakTrackSegment(trackIdx + 1);
    }
  };
  
  ttsUtterance.onerror = (e) => {
    console.log("TTS Error:", e);
  };
  
  window.speechSynthesis.speak(ttsUtterance);
}

function seekCombinedPlayback(val) {
  const targetTime = parseFloat(val);
  
  // Find which track segment targetTime belongs to
  let elapsed = 0;
  let trackIdx = 0;
  
  for (let i = 0; i < combinedTrackDurations.length; i++) {
    const dur = combinedTrackDurations[i];
    if (targetTime < elapsed + dur) {
      trackIdx = i;
      break;
    }
    elapsed += dur;
    if (i === combinedTrackDurations.length - 1) {
      trackIdx = i;
    }
  }
  
  currentCombinedTime = targetTime;
  combinedTrackIndex = trackIdx;
  
  updateProgressUI();
  
  if (isCombinedPlaying) {
    speakTrackSegment(trackIdx);
  }
}

function onCombinedPlaybackEnded() {
  pauseCombinedPlayback();
  combinedTrackIndex = 0;
  currentCombinedTime = 0;
  
  // Reset visual highlights
  combinedTracks.forEach(t => {
    t.element.classList.remove('active-narration');
    t.element.classList.remove('inactive-narration');
  });
  
  const captionBox = document.getElementById('workspaceVpCaption');
  if (captionBox) captionBox.style.display = 'none';
  
  updateProgressUI();
}

function updateProgressUI() {
  const seekBar = document.getElementById('seekBar');
  const playbackTime = document.getElementById('playbackTime');
  if (seekBar) {
    seekBar.max = totalCombinedDuration || 100;
    seekBar.value = currentCombinedTime;
  }
  if (playbackTime) {
    playbackTime.textContent = `${formatTime(currentCombinedTime)} / ${formatTime(totalCombinedDuration)}`;
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function updatePlayButtonStates(isPlaying) {
  const navBtn = document.getElementById('navPlayBtn');
  const barBtn = document.getElementById('playPauseBtn');
  
  if (navBtn) {
    navBtn.innerHTML = isPlaying 
      ? `<span class="btn-icon">⏸</span> <span class="btn-text">Pause Lesson</span>`
      : `<span class="btn-icon">▶</span> <span class="btn-text">Play Lesson</span>`;
  }
  if (barBtn) {
    barBtn.textContent = isPlaying ? '⏸' : '▶';
  }
}

// Popover control functions
function toggleVolumePopover(event) {
  event.stopPropagation();
  const volBtn = document.getElementById('volumeBtn');
  const popover = document.getElementById('volumePopover');
  const speedPopover = document.getElementById('speedPopover');
  const speedBtn = document.getElementById('speedControlBtn');
  
  if (speedPopover) {
    speedPopover.classList.remove('open');
    speedBtn?.classList.remove('active');
  }
  
  popover?.classList.toggle('open');
  volBtn?.classList.toggle('active');
}

function toggleSpeedPopover(event) {
  event.stopPropagation();
  const speedBtn = document.getElementById('speedControlBtn');
  const popover = document.getElementById('speedPopover');
  const volPopover = document.getElementById('volumePopover');
  const volBtn = document.getElementById('volumeBtn');
  
  if (volPopover) {
    volPopover.classList.remove('open');
    volBtn?.classList.remove('active');
  }
  
  popover?.classList.toggle('open');
  speedBtn?.classList.toggle('active');
}

function setPlaybackVolume(value) {
  const vol = parseFloat(value) / 100;
  currentPlaybackVolume = vol;
  isMuted = (vol === 0);
  
  if (ttsUtterance) {
    ttsUtterance.volume = vol;
  }
  
  const valLabel = document.getElementById('volumeValue');
  if (valLabel) valLabel.textContent = `${value}%`;
  
  const volBtn = document.getElementById('volumeBtn');
  if (volBtn) {
    if (value == 0) {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      `;
    } else if (value < 50) {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
        </svg>
      `;
    } else {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      `;
    }
  }
}

function selectSpeedOption(speed, labelText) {
  const btn = document.getElementById('speedControlBtn');
  currentPlaybackRate = parseFloat(speed);
  
  if (ttsUtterance) {
    ttsUtterance.rate = currentPlaybackRate;
  }
  
  if (isCombinedPlaying) {
    speakTrackSegment(combinedTrackIndex);
  }
  
  const valLabel = document.getElementById('speedValueLabel');
  if (valLabel) valLabel.textContent = labelText;
  
  document.querySelectorAll('.speed-option').forEach(opt => {
    const optSpeed = parseFloat(opt.textContent);
    if (optSpeed === speed) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
  
  document.getElementById('speedPopover')?.classList.remove('open');
  btn?.classList.remove('active');
}

// Global click handler to close popovers when clicking outside
document.addEventListener('click', () => {
  document.getElementById('volumePopover')?.classList.remove('open');
  document.getElementById('volumeBtn')?.classList.remove('active');
  document.getElementById('speedPopover')?.classList.remove('open');
  document.getElementById('speedControlBtn')?.classList.remove('active');
});

// ── Bootstrap ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
