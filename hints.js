// ═══════════════════════════════════════════════════════════════════════
// MANO AI TUTOR SYSTEM — Gemini Socratic Assistant (Direct-Clipboard Flow)
// Instantly copies contextual prompts and launches Gemini side-by-side.
// ═══════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── Get code from editor ──
  function getCode(cellId) {
    if (typeof editors !== 'undefined' && editors[cellId]) {
      return editors[cellId].getValue();
    }
    var ta = document.querySelector('#' + cellId + ' textarea');
    return ta ? (ta.value || '') : '';
  }

  // ── Socratic Prompt Builder ──
  function buildPrompt(cellId) {
    var cell = document.getElementById(cellId);
    var prev = cell ? cell.previousElementSibling : null;
    var questionText = prev ? (prev.innerText || prev.textContent || '').trim() : '';
    var userCode = getCode(cellId);
    
    var outEl = cell ? cell.querySelector('.cell-output') : null;
    var errorText = outEl ? (outEl.textContent || '').trim() : '';

    var errorContext = '';
    if (errorText) {
      errorContext = '\nMy code currently throws this error/output:\n' + errorText + '\n';
    }

    return 'I am learning Python and working on this exercise:\n' +
      '"' + questionText + '"\n\n' +
      'Here is my current code:\n' +
      '```python\n' +
      (userCode || '# No code written yet') +
      '\n```\n' +
      errorContext + '\n' +
      'Please act as a Socratic Python tutor. Guide me to solve this step-by-step. Do not provide the full solution code. If I am stuck, you may provide at most one line of code showing the next step.';
  }

  // Robust clipboard copy function
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
    document.body.removeChild(textArea);
    return Promise.resolve();
  }

  // ── Handle Hint click trigger ──
  function showHint(cellId) {
    // 1. Find the hint button inside the cell actions
    var btn = document.querySelector('button[data-cell="' + cellId + '"]');
    
    // 2. Build Socratic prompt
    var prompt = buildPrompt(cellId);

    // 3. Copy prompt to clipboard
    copyToClipboard(prompt).then(function() {
      // 4. Visual feedback on button
      if (btn) {
        btn.classList.add('copied');
        btn.innerHTML = '✓ Prompt Copied! Opening Gemini...';
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.innerHTML = '<svg style="width:14px;height:14px;display:inline-block;vertical-align:-2px;margin-right:6px;fill:currentColor;" viewBox="0 0 24 24"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>Ask Gemini';
        }, 3000);
      }

      // 5. Open Gemini side-by-side or new tab
      window.open('https://gemini.google.com/', 'GeminiTutor', 'width=450,height=750,resizable=yes,scrollbars=yes');
    });
  }

  // ── Inject hint action triggers ──
  function injectHintButtons() {
    // Hide hints entirely if Graded Challenge Mode ("Improve score") is active
    if (typeof isChallengeActive === 'function' && isChallengeActive()) {
      console.log('ManoHint: Graded Challenge Mode active, skipping hint injection');
      return;
    }

    var cells = document.querySelectorAll('.code-cell');
    var count = 0;
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var prev = cell.previousElementSibling;
      if (!prev) continue;
      if (!prev.classList.contains('question') && !prev.classList.contains('interview')) continue;

      var actions = cell.querySelector('.cell-actions');
      if (!actions) continue;
      if (actions.querySelector('.hint-btn')) continue;

      var btn = document.createElement('button');
      btn.className = 'hint-btn';
      btn.type = 'button';
      btn.innerHTML = '<svg style="width:14px;height:14px;display:inline-block;vertical-align:-2px;margin-right:6px;fill:currentColor;" viewBox="0 0 24 24"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>Ask Gemini';
      btn.setAttribute('data-cell', cell.id);
      btn.setAttribute('onclick', "showHint('" + cell.id + "')");
      actions.insertBefore(btn, actions.firstChild);
      count++;
    }
    console.log('ManoHint: ' + count + ' hint buttons injected');
  }

  // ── Watch challenge state transitions dynamically ──
  function watchChallengeState() {
    var interval = setInterval(function() {
      if (typeof isChallengeActive === 'function' && isChallengeActive()) {
        var buttons = document.querySelectorAll('.hint-btn');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].remove();
        }
        console.log('ManoHint: Graded Challenge Mode active, removed hint buttons');
        clearInterval(interval);
      }
    }, 1000);
  }

  // ── Inject Custom CSS Styles for Copy State ──
  function injectStyles() {
    var styleId = 'mano-socratic-styles';
    if (document.getElementById(styleId)) return;
    var style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .hint-btn.copied {
        background: rgba(16, 185, 129, 0.12) !important;
        color: #10B981 !important;
        border-color: rgba(16, 185, 129, 0.3) !important;
        box-shadow: 0 2px 12px rgba(16, 185, 129, 0.2) !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Expose triggers globally for static onclick mappings
  window.showHint = showHint;

  injectStyles();
  watchChallengeState();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHintButtons);
  } else {
    injectHintButtons();
  }
})();
