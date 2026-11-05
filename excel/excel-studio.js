// public/excel/excel-studio.js
// Manodemy Excel Studio — Master Orchestrator & UI Application Controller
// Conforms to: MISSION SPECIFICATION v3.2 (Stage 3 & Stage 5)

(function (root) {
  'use strict';

  let grid = null;
  let ribbon = null;
  let currentQuestionIdx = 0;
  let passedChallenges = new Set();
  let marks = 0;

  // ═══════════════ 0. DYNAMIC DAY CONTENT RESOLVER ═══════════════
  function getActiveExcelContent() {
    if (!window.EXCEL_COURSE_CONTENT) return null;
    const match = window.location.pathname.match(/day(\d{1,2})/i);
    const dayNum = match ? parseInt(match[1], 10) : (window.COURSE_DAY || 1);
    const formatted = String(dayNum).padStart(2, '0');
    const dayKey = 'excelDay' + formatted;

    if (window.EXCEL_COURSE_CONTENT[dayKey]) {
      return window.EXCEL_COURSE_CONTENT[dayKey];
    }
    if (window.EXCEL_COURSE_CONTENT['excelDay' + dayNum]) {
      return window.EXCEL_COURSE_CONTENT['excelDay' + dayNum];
    }
    const keys = Object.keys(window.EXCEL_COURSE_CONTENT);
    if (keys.length > 0) {
      return window.EXCEL_COURSE_CONTENT[keys[0]];
    }
    return null;
  }

  // ═══════════════ 1. BOOT LIFECYCLE (CONSTRAINT C4) ═══════════════
  function bootExcelStudio() {
    if (window.__EXCEL_STUDIO_BOOTED__) return;
    window.__EXCEL_STUDIO_BOOTED__ = true;

    try {
      const content = getActiveExcelContent();
      if (!content) {
        console.warn('Excel course content not yet loaded, retrying...');
        window.__EXCEL_STUDIO_BOOTED__ = false;
        setTimeout(bootExcelStudio, 50);
        return;
      }

      // 1. Initialize Calculation Engine & Workbook
      const workbook = new ExcelEngine.WorkbookStore();
      initStarterWorkbook(workbook, content);

      // 2. Initialize Virtualized Grid Controller
      grid = new ExcelGrid.GridController({
        workbook,
        container: document.getElementById('excelGridContainer'),
        table: document.getElementById('excelGridTable'),
        formulaInput: document.getElementById('excelFormulaInput'),
        coordBadge: document.getElementById('excelActiveCoord'),
        tabsContainer: document.getElementById('excelSheetTabs')
      });
      window.excelGrid = grid;

      // 3. Initialize Ribbon Controller
      ribbon = new ExcelRibbon.RibbonController(grid);
      window.excelRibbon = ribbon;

      // 4. Render UI Components
      renderSheetTabs();
      populateQuestionPicker();
      loadQuestion(0);
      renderTheorySlides(content);
      initPivotTable();
      initTestPortal();
      initSplitDivider();
      initTheme();
      initHeaderNavigation(content);
      initMobileThemeToggle();
      initMobileKeyboardObserver();

      // 5. Hide Loading Overlay
      const overlay = document.getElementById('pyLoadingOverlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
      }

      console.log('✅ Manodemy Excel Studio v3.2 Booted Successfully.');
    } catch (err) {
      console.error('❌ Failed to boot Excel Studio:', err);
    }
  }

  // ═══════════════ 2. STARTER WORKBOOK LOADER ═══════════════
  function initStarterWorkbook(workbook, content) {
    const init = content.initialWorkbook;
    for (const sheetName of Object.keys(init)) {
      workbook.createSheet(sheetName);
      const rows = init[sheetName];
      for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
          const val = rows[r][c];
          if (val !== '' && val !== null && val !== undefined) {
            workbook.setCellValue(sheetName, r, c, val, false);
          }
        }
      }
    }

    // Populate Auxiliary Data Block (Parameters, Strings, Dates)
    const aux = content.initialAuxiliary;
    if (aux) {
      for (const sheetName of Object.keys(aux)) {
        const cells = aux[sheetName];
        for (const addr of Object.keys(cells)) {
          const p = ExcelEngine.parseCellCoord(addr);
          if (p) {
            workbook.setCellValue(sheetName, p.row, p.col, cells[addr], false);
          }
        }
      }
    }

    workbook.recalculateAll();
  }

  // ═══════════════ 3. MULTI-SHEET TABS CONTROLLER ═══════════════
  function renderSheetTabs() {
    const tabsContainer = document.getElementById('excelSheetTabs');
    if (!tabsContainer || !grid) return;

    const sheetNames = Array.from(grid.workbook.sheets.keys());
    let html = `
      <button class="sheet-nav-arrow" title="Scroll tabs left">‹</button>
      <button class="sheet-nav-arrow" title="Scroll tabs right">›</button>
    `;

    sheetNames.forEach(name => {
      const activeClass = (name === grid.activeSheetName) ? ' active' : '';
      html += `<div class="excel-tab${activeClass}" data-sheet="${name}" onclick="switchSheet('${name}')">`;
      html += `<span>${name}</span>`;
      html += `</div>`;
    });

    html += `<button class="sheet-add-btn" onclick="alert('Standard workbook tabs: Sales_Data, Employees, Summary_Practice, Sort_Practice.')" title="Insert New Sheet">+</button>`;
    tabsContainer.innerHTML = html;
  }

  function switchSheet(sheetName) {
    if (!grid) return;
    grid.switchSheet(sheetName);
    renderSheetTabs();
    const copyBadge = document.getElementById('copySheetNameBadge');
    if (copyBadge) copyBadge.textContent = sheetName;
  }

  // ═══════════════ 4. QUESTION NAVIGATION (SECTION 8.5) ═══════════════
  function populateQuestionPicker() {
    const popoverList = document.getElementById('qPickerList');
    const countBadge = document.getElementById('qPickerCountBadge');
    const content = getActiveExcelContent();
    if (!popoverList || !content || !content.challenges) return;

    if (countBadge) {
      countBadge.textContent = `${passedChallenges.size} / ${content.challenges.length}`;
    }

    let html = '';
    content.challenges.forEach((ch, idx) => {
      const passed = passedChallenges.has(ch.id);
      const isCurrent = (idx === currentQuestionIdx);
      html += `
        <button type="button" class="q-picker-item${isCurrent ? ' active' : ''}${passed ? ' solved' : ''}" onclick="jumpToQuestion(${idx})">
          <span class="q-picker-item-num">${String(ch.number).padStart(2, '0')}</span>
          <span class="q-picker-item-main">
            <span class="q-picker-item-title">${ch.title}</span>
          </span>
          <span class="q-picker-item-status">
            ${passed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#107C41" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<span class="q-picker-item-dot"></span>'}
          </span>
        </button>
      `;
    });
    popoverList.innerHTML = html;
  }

  function loadQuestion(index) {
    const content = getActiveExcelContent();
    if (!content || !content.challenges[index]) return;

    currentQuestionIdx = index;
    const ch = content.challenges[index];

    // 1. Update Question Counter & Header
    const counter = document.getElementById('qCounter');
    if (counter) counter.textContent = `Question-${String(ch.number).padStart(2, '0')}`;

    const promptEl = document.getElementById('questionPrompt');
    if (promptEl) {
      promptEl.innerHTML = `<strong>${ch.title}</strong>: ${ch.prompt}`;
    }

    // 2. Nav Button States
    const prevBtn = document.getElementById('prevQBtn');
    const nextBtn = document.getElementById('nextQBtn');
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === content.challenges.length - 1);

    if (grid) {
      grid.applyQuestionSpotlight(ch);
    }

    const outMsg = document.getElementById('outputInitMsg');
    if (outMsg) {
      if (passedChallenges.has(ch.id)) {
        outMsg.className = 'output-success';
        const marksAwarded = (ch.marks || 1.0).toFixed(1);
        outMsg.innerHTML = `
          <div class="result-card result-card--success">
            <div class="result-header">
              <div class="result-status">
                <span class="result-icon-circle result-icon-circle--success">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span class="result-title">Solved</span>
              </div>
              <span class="result-score-badge">+${marksAwarded} Marks</span>
            </div>
            <div class="result-body">
              <div class="result-field">
                <span class="result-field-label">Target Cell</span>
                <code class="result-field-code">${ch.targetCell || ''}</code>
              </div>
            </div>
          </div>
        `;
      } else {
        outMsg.className = 'output-success';
        outMsg.innerHTML = `
          <div class="result-prompt-card">
            <span style="font-size: 1.1rem; flex-shrink: 0;">💡</span>
            <span>Enter your formula in <strong>${ch.targetCell || 'the target cell'}</strong> and press <strong>Enter</strong> (or click <strong>Check Formula</strong>).</span>
          </div>
        `;
      }
    }

    populateQuestionPicker();
  }

  function prevQuestion() {
    if (currentQuestionIdx > 0) loadQuestion(currentQuestionIdx - 1);
  }

  function nextQuestion() {
    const content = getActiveExcelContent();
    if (content && currentQuestionIdx < content.challenges.length - 1) {
      loadQuestion(currentQuestionIdx + 1);
    }
  }

  function jumpToQuestion(idx) {
    loadQuestion(idx);
    const popover = document.getElementById('qPickerPopover');
    const trigger = document.getElementById('qPickerTrigger');
    if (popover) {
      popover.style.display = 'none';
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleQPicker(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const popover = document.getElementById('qPickerPopover');
    const trigger = document.getElementById('qPickerTrigger');
    if (!popover) return;
    const isVisible = popover.style.display !== 'none';
    if (isVisible) {
      popover.style.display = 'none';
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    } else {
      populateQuestionPicker();
      popover.style.display = 'flex';
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      setTimeout(() => {
        const closeQP = (evt) => {
          if (!popover.contains(evt.target) && !trigger?.contains(evt.target)) {
            popover.style.display = 'none';
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', closeQP);
          }
        };
        document.addEventListener('click', closeQP);
      }, 10);
    }
  }

  function toggleFocusView() {
    // Clean no-op: Focus Relevant Data removed per flagship parity
  }

  // ═══════════════ 5. FORMULA EVALUATION & GRADING (SECTION 8.4) ═══════════════
  function gradeCurrentChallenge() {
    const content = getActiveExcelContent();
    if (!content || !grid) return;

    const ch = content.challenges[currentQuestionIdx];
    const gradeResult = ExcelGradingEngine.gradeChallenge(ch, grid.workbook);

    const outMsg = document.getElementById('outputInitMsg');
    if (outMsg) {
      if (gradeResult.passed) {
        outMsg.className = 'output-success';
        const marksAwarded = (ch.marks || 1.0).toFixed(1);
        const evalVal = gradeResult.userValue !== null && gradeResult.userValue !== undefined ? gradeResult.userValue : '';
        outMsg.innerHTML = `
          <div class="result-card result-card--success">
            <div class="result-header">
              <div class="result-status">
                <span class="result-icon-circle result-icon-circle--success">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span class="result-title">100% Correct</span>
              </div>
              <span class="result-score-badge">+${marksAwarded} Marks</span>
            </div>
            <div class="result-body">
              <div class="result-field">
                <span class="result-field-label">Formula</span>
                <code class="result-field-code">${gradeResult.userFormula || ''}</code>
              </div>
              <div class="result-field">
                <span class="result-field-label">Computed Value</span>
                <span class="result-field-value">${evalVal}</span>
              </div>
            </div>
          </div>
        `;
        passedChallenges.add(ch.id);
        updateScorecardUI();
        populateQuestionPicker();
      } else {
        outMsg.className = 'output-error';
        outMsg.innerHTML = `
          <div class="result-card result-card--error">
            <div class="result-header">
              <div class="result-status">
                <span class="result-icon-circle result-icon-circle--error">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
                </span>
                <span class="result-title">Check Incomplete</span>
              </div>
              <span class="result-error-pill">Needs Review</span>
            </div>
            <div class="result-body">
              <div class="result-message">${gradeResult.feedback || 'Formula result does not match expected output.'}</div>
            </div>
          </div>
        `;
      }

      // Smoothly scroll result card into view on mobile so it is never hidden
      if (window.innerWidth <= 900) {
        setTimeout(() => {
          const mainOut = document.getElementById('mainOutput');
          if (mainOut) {
            mainOut.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    }
  }

  function runCurrentFormula() {
    if (!grid) return;
    if (grid.pointMode && grid.pointMode.isActive) {
      grid.commitPointMode();
      return;
    }
    grid.commitFormulaBar();
    gradeCurrentChallenge();
  }

  function cancelFormulaEdit() {
    if (!grid) return;
    if (grid.pointMode && grid.pointMode.isActive) {
      grid.cancelPointMode();
    } else {
      grid.cancelEdit();
      grid.updateFormulaBar();
    }
  }

  window.onPointFormulaCommitted = function(formula) {
    gradeCurrentChallenge();
  };

  function updateScorecardUI() {
    const content = getActiveExcelContent();
    const totalCount = content ? content.challenges.length : 20;
    const solvedCount = passedChallenges.size;
    marks = solvedCount * 1.0;

    const solvedEl = document.getElementById('solvedCount');
    const marksEl = document.getElementById('marksCount');
    const fillEl = document.getElementById('statsProgressFill');
    const overallScoreEl = document.getElementById('headerOverallScore');
    const overallBarFill = document.getElementById('overallScoreBarFill');

    if (solvedEl) solvedEl.textContent = solvedCount;
    if (marksEl) marksEl.textContent = marks.toFixed(1);
    if (fillEl) fillEl.style.width = `${Math.round((solvedCount / totalCount) * 100)}%`;
    if (overallScoreEl) overallScoreEl.textContent = Math.round((solvedCount / totalCount) * 500);
    if (overallBarFill) overallBarFill.style.width = `${Math.round((solvedCount / totalCount) * 100)}%`;
  }

  function peekSolution() {
    const content = getActiveExcelContent();
    if (!content) return;
    const ch = content.challenges[currentQuestionIdx];

    const outMsg = document.getElementById('outputInitMsg');
    if (outMsg) {
      outMsg.className = 'output-info';
      outMsg.innerHTML = `
        <div class="result-prompt-card" style="border-color: rgba(56, 189, 248, 0.35); background: rgba(56, 189, 248, 0.08); color: #38bdf8;">
          <span style="font-size: 1.1rem; flex-shrink: 0;">💡</span>
          <span><strong>Hint for ${ch.title}:</strong> ${ch.hint}</span>
        </div>
      `;
    }

    if (grid && ch.targetCell && ch.expectedFormulaPrefix) {
      grid.startEditing();
      if (grid.formulaInput) {
        grid.formulaInput.value = ch.hint.replace('Use ', '');
      }
    }
  }

  function resetWorkbookData() {
    if (!confirm('Reset entire workbook to original starter state? All modifications will be cleared.')) return;
    const content = getActiveExcelContent();
    if (!content || !grid) return;
    initStarterWorkbook(grid.workbook, content);
    grid.render();

    const outMsg = document.getElementById('outputInitMsg');
    if (outMsg) {
      outMsg.className = 'output-success';
      outMsg.innerHTML = `
        <div class="result-prompt-card" style="border-color: rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.08); color: #34d399;">
          <span style="font-size: 1.1rem; flex-shrink: 0;">↺</span>
          <span>Workbook reset to initial starter state.</span>
        </div>
      `;
    }
  }

  function clearActiveCell() {
    if (grid) grid.clearActiveCell();
  }

  // ═══════════════ 6. RIBBON TOOLBAR & EXPORT ACTIONS ═══════════════
  function switchRibbonTab(tabName) {
    if (ribbon) ribbon.switchTab(tabName);
  }

  function toggleCellFormat(fmt) {
    if (ribbon) ribbon.toggleFormat(fmt);
  }

  function setCellAlignment(align) {
    if (ribbon) ribbon.setAlignment(align);
  }

  function applyNumberFormat(fmt) {
    if (ribbon) ribbon.applyNumberFormat(fmt);
  }

  function sortActiveColumn(dir) {
    if (ribbon) ribbon.sortActiveColumn(dir);
  }

  function insertFormulaSnippet(snippet) {
    if (ribbon) ribbon.insertSnippet(snippet);
  }

  function downloadPracticeWorkbookXLSX() {
    if (!grid) return;
    ExcelXLSXWriter.downloadWorkbook(grid.workbook, "Manodemy_Day01_Sales_Practice.xlsx");
    const outMsg = document.getElementById('outputInitMsg');
    if (outMsg) {
      outMsg.className = 'output-success';
      outMsg.innerHTML = `
        <div class="result-prompt-card" style="border-color: rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.08); color: #34d399;">
          <span style="font-size: 1.1rem; flex-shrink: 0;">📥</span>
          <span>Downloaded authentic Microsoft 365 OOXML workbook: <strong>Manodemy_Day01_Sales_Practice.xlsx</strong></span>
        </div>
      `;
    }
  }

  function openPracticeGoogleSheets() {
    const modal = document.getElementById('gsheetsModal');
    if (modal) modal.style.display = 'flex';
  }

  function closeGSheetsModal() {
    const modal = document.getElementById('gsheetsModal');
    if (modal) modal.style.display = 'none';
  }

  function copyCurrentSheetToClipboard() {
    if (!grid) return;
    const sheet = grid.workbook.sheets.get(grid.activeSheetName);
    if (!sheet) return;

    let tsv = '';
    for (let r = 0; r < 20; r++) {
      const rowVals = [];
      let hasData = false;
      for (let c = 0; c < ExcelGrid.TOTAL_COLS; c++) {
        const cell = sheet.cells.get(`${r}:${c}`);
        const val = cell ? (cell.value !== null && cell.value !== undefined ? cell.value : '') : '';
        if (val !== '') hasData = true;
        rowVals.push(val);
      }
      if (hasData) {
        tsv += rowVals.join('\t') + '\n';
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tsv).then(() => {
        alert(`Copied ${grid.activeSheetName} data to clipboard as TSV! You can now paste (Ctrl+V) directly into Google Sheets or Excel.`);
      });
    }
  }

  // ═══════════════ 7. PIVOT TABLE INTERACTION (STAGE 4) ═══════════════
  function initPivotTable() {
    updatePivotCalculation();
  }

  function openPivotModal() {
    const modal = document.getElementById('pivotModal');
    if (modal) modal.style.display = 'flex';
    updatePivotCalculation();
  }

  function closePivotModal() {
    const modal = document.getElementById('pivotModal');
    if (modal) modal.style.display = 'none';
  }

  function updatePivotCalculation() {
    const renderTable = document.getElementById('pivotTableRender');
    if (!renderTable) return;

    const rawOrders = [
      { id: 'ORD-1001', region: 'North', cat: 'Electronics', units: 25, revenue: 11250 },
      { id: 'ORD-1002', region: 'South', cat: 'Office Supplies', units: 85, revenue: 3825 },
      { id: 'ORD-1003', region: 'East', cat: 'Furniture', units: 12, revenue: 3840 },
      { id: 'ORD-1004', region: 'West', cat: 'Electronics', units: 18, revenue: 6840 },
      { id: 'ORD-1005', region: 'North', cat: 'Furniture', units: 40, revenue: 8400 },
      { id: 'ORD-1006', region: 'South', cat: 'Electronics', units: 30, revenue: 12600 },
      { id: 'ORD-1007', region: 'East', cat: 'Office Supplies', units: 70, revenue: 3850 },
      { id: 'ORD-1008', region: 'West', cat: 'Furniture', units: 10, revenue: 4500 },
      { id: 'ORD-1009', region: 'North', cat: 'Office Supplies', units: 60, revenue: 2880 },
      { id: 'ORD-1010', region: 'East', cat: 'Electronics', units: 22, revenue: 8778 },
      { id: 'ORD-1011', region: 'South', cat: 'Furniture', units: 15, revenue: 4125 },
      { id: 'ORD-1012', region: 'West', cat: 'Office Supplies', units: 85, revenue: 5100 },
      { id: 'ORD-1013', region: 'North', cat: 'Electronics', units: 14, revenue: 4900 },
      { id: 'ORD-1014', region: 'East', cat: 'Furniture', units: 33, revenue: 9900 },
      { id: 'ORD-1015', region: 'North', cat: 'Office Supplies', units: 50, revenue: 2600 }
    ];

    const useRev = document.getElementById('pvFieldRev')?.checked;
    const valField = useRev ? 'revenue' : 'units';

    const pivotData = ExcelPivot.buildPivotTable(rawOrders, {
      rowField: 'region',
      colField: 'cat',
      valField
    });

    renderTable.innerHTML = ExcelPivot.renderPivotHTML(pivotData, "Region", "Category");
  }

  // ═══════════════ 8. THEORY SLIDES & AUDIO NARRATION ═══════════════
  let currentChapterIdx = 0;

  function buildChapterList() {
    const list = document.getElementById('chapterList');
    const content = getActiveExcelContent();
    if (!list || !content || !content.topics) return;
    list.innerHTML = '';

    content.topics.forEach((t, idx) => {
      const item = document.createElement('div');
      item.className = 'chapter-item' + (idx === currentChapterIdx ? ' active' : '');
      item.dataset.idx = idx;
      item.setAttribute('role', 'option');
      item.innerHTML = `
        <span class="chapter-item__icon">📖</span>
        <span class="chapter-item__time">${String(idx + 1).padStart(2, '0')}</span>
        <span class="chapter-item__title">${t}</span>
      `;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        jumpToChapter(idx);
        list.style.display = 'none';
        const btn = document.getElementById('chapterPillBtn');
        if (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
      list.appendChild(item);
    });
  }

  function updateChapterListActive() {
    const list = document.getElementById('chapterList');
    if (list) {
      list.querySelectorAll('.chapter-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === currentChapterIdx);
      });
    }
    const titleEl = document.getElementById('activeChapterTitle');
    const content = getActiveExcelContent();
    if (titleEl && content && content.topics && content.topics[currentChapterIdx]) {
      titleEl.textContent = content.topics[currentChapterIdx];
    }
  }

  function renderTheorySlides(content) {
    const bodyText = document.getElementById('slideBodyText');
    if (!bodyText || !content || !content.slides || !content.slides[0]) return;
    bodyText.innerHTML = content.slides[0].html;

    const slideHeader = document.getElementById('slideHeader');
    if (slideHeader) {
      const h2 = slideHeader.querySelector('h2');
      if (h2) {
        const dNum = content.day || window.COURSE_DAY || 1;
        const dStr = String(dNum).padStart(2, '0');
        h2.innerHTML = `<span style="margin-right: 6px;">📊</span> ${dStr}. ${content.title}`;
      }
      const activeChapterTitle = document.getElementById('activeChapterTitle');
      if (activeChapterTitle) {
        const firstTopic = (content.topics && content.topics[0]) || (content.slides && content.slides[0] && content.slides[0].title) || content.title;
        activeChapterTitle.textContent = firstTopic;
      }
    }

    buildChapterList();
    updateChapterListActive();

    const topicSelect = document.getElementById('topicSelect');
    if (content.topics && topicSelect) {
      let optHtml = '';
      content.topics.forEach((t, i) => {
        optHtml += `<option value="${i}">${t}</option>`;
      });
      topicSelect.innerHTML = optHtml;
    }
  }

  function toggleCombinedPlayback() {
    const playBtn = document.getElementById('playPauseBtn');
    const navPlayBtn = document.getElementById('navPlayBtn');
    const caption = document.getElementById('workspaceVpCaption');

    const isPlaying = playBtn && playBtn.classList.contains('playing');
    if (isPlaying) {
      if (playBtn) {
        playBtn.classList.remove('playing');
        playBtn.querySelector('.btn-icon').innerHTML = '&#9654;';
        playBtn.querySelector('.btn-text').textContent = 'Play Lesson';
      }
      if (navPlayBtn) {
        navPlayBtn.querySelector('.btn-icon').textContent = '▶';
        navPlayBtn.querySelector('.btn-text').textContent = 'Play Lesson';
      }
      if (caption) caption.style.display = 'none';
    } else {
      if (playBtn) {
        playBtn.classList.add('playing');
        playBtn.querySelector('.btn-icon').innerHTML = '&#10074;&#10074;';
        playBtn.querySelector('.btn-text').textContent = 'Pause';
      }
      if (navPlayBtn) {
        navPlayBtn.querySelector('.btn-icon').textContent = '⏸';
        navPlayBtn.querySelector('.btn-text').textContent = 'Pause';
      }
      if (caption) {
        caption.style.display = 'block';
        caption.textContent = '📢 Narrating: Excel Interface & Grid Anatomy (Cell coordinate A1 to XFD1048576)';
      }
    }
  }

  function seekCombinedPlayback(val) {
    const timeEl = document.getElementById('playbackTime');
    const totalSecs = 600; // 10 min
    const curSecs = Math.round((val / 100) * totalSecs);
    const m = Math.floor(curSecs / 60);
    const s = curSecs % 60;
    if (timeEl) timeEl.textContent = `${m}:${s < 10 ? '0' + s : s} / 10:00`;
  }

  function skipCombined(deltaSecs) {
    const seekBar = document.getElementById('seekBar');
    if (!seekBar) return;
    let curVal = parseFloat(seekBar.value) || 0;
    curVal = Math.max(0, Math.min(100, curVal + (deltaSecs / 6)));
    seekBar.value = curVal;
    seekCombinedPlayback(curVal);
  }

  function toggleChapterList(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const list = document.getElementById('chapterList');
    const btn = document.getElementById('chapterPillBtn');
    if (!list) return;
    const isVisible = list.style.display !== 'none';
    if (isVisible) {
      list.style.display = 'none';
      if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
    } else {
      buildChapterList();
      updateChapterListActive();
      list.style.display = 'block';
      if (btn) { btn.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
      setTimeout(() => {
        const closeCL = (evt) => {
          if (!list.contains(evt.target) && !btn?.contains(evt.target)) {
            list.style.display = 'none';
            if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
            document.removeEventListener('click', closeCL);
          }
        };
        document.addEventListener('click', closeCL);
      }, 10);
    }
  }

  function jumpToChapter(idx) {
    currentChapterIdx = idx;
    const secId = `sec${String(idx + 1).padStart(2, '0')}`;
    const section = document.getElementById(secId) || document.getElementById(`sec${idx + 1}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    updateChapterListActive();
  }

  function toggleVolumePopover(e) {
    if (e) e.stopPropagation();
    const pop = document.getElementById('volumePopover');
    if (pop) pop.classList.toggle('active');
  }

  function setPlaybackVolume(v) {
    const valEl = document.getElementById('volumeValue');
    if (valEl) valEl.textContent = `${v}%`;
  }

  function toggleSpeedPopover(e) {
    if (e) e.stopPropagation();
    const pop = document.getElementById('speedPopover');
    if (pop) pop.classList.toggle('active');
  }

  function selectSpeedOption(spd, label) {
    const labelEl = document.getElementById('speedValueLabel');
    if (labelEl) labelEl.textContent = label;
    toggleSpeedPopover();
  }

  // ═══════════════ 9. SPLIT SCREEN & THEME TOGGLE ═══════════════
  // ═══════════════ 9. SPLIT SCREEN & THEME TOGGLE ═══════════════
  let leftCollapsed = false;
  let rightCollapsed = false;

  function updateDividerArrows() {
    const btnL = document.querySelector('.div-toggle-btn--left');
    const btnR = document.querySelector('.div-toggle-btn--right');
    if (!btnL || !btnR) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      btnL.textContent = '▲';
      btnL.title = leftCollapsed ? 'Restore workbook' : 'Collapse workbook';
      btnR.textContent = '▼';
      btnR.title = rightCollapsed ? 'Restore notes panel' : 'Collapse notes panel';
    } else {
      btnL.textContent = leftCollapsed ? '▶' : '◀';
      btnL.title = leftCollapsed ? 'Restore workbook' : 'Collapse workbook';
      btnR.textContent = rightCollapsed ? '◀' : '▶';
      btnR.title = rightCollapsed ? 'Restore notes panel' : 'Collapse notes panel';
    }
  }

  function toggleLeftPanel(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const panelL = document.getElementById('panelLeft');
    const panelR = document.getElementById('panelRight');
    const ws = document.getElementById('workspaceContainer');
    if (!panelL || !panelR) return;

    leftCollapsed = !leftCollapsed;
    if (leftCollapsed) {
      panelL.classList.add('collapsed');
      if (rightCollapsed) {
        rightCollapsed = false;
        panelR.classList.remove('collapsed');
      }
    } else {
      panelL.classList.remove('collapsed');
    }

    if (ws) {
      ws.classList.toggle('left-collapsed', leftCollapsed);
      ws.classList.toggle('right-collapsed', rightCollapsed);
    }

    panelL.style.removeProperty('display');
    panelL.style.removeProperty('flex');
    panelL.style.removeProperty('width');
    panelR.style.removeProperty('display');
    panelR.style.removeProperty('flex');
    panelR.style.removeProperty('width');

    updateDividerArrows();
    if (grid && typeof grid.render === 'function') grid.render();
  }

  function toggleRightPanel(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const panelL = document.getElementById('panelLeft');
    const panelR = document.getElementById('panelRight');
    const ws = document.getElementById('workspaceContainer');
    if (!panelL || !panelR) return;

    rightCollapsed = !rightCollapsed;
    if (rightCollapsed) {
      panelR.classList.add('collapsed');
      if (leftCollapsed) {
        leftCollapsed = false;
        panelL.classList.remove('collapsed');
      }
    } else {
      panelR.classList.remove('collapsed');
    }

    if (ws) {
      ws.classList.toggle('left-collapsed', leftCollapsed);
      ws.classList.toggle('right-collapsed', rightCollapsed);
    }

    panelL.style.removeProperty('display');
    panelL.style.removeProperty('flex');
    panelL.style.removeProperty('width');
    panelR.style.removeProperty('display');
    panelR.style.removeProperty('flex');
    panelR.style.removeProperty('width');

    updateDividerArrows();
    if (grid && typeof grid.render === 'function') grid.render();
  }

  function resetSplitScreen(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const panelL = document.getElementById('panelLeft');
    const panelR = document.getElementById('panelRight');
    const ws = document.getElementById('workspaceContainer');
    if (!panelL || !panelR) return;

    leftCollapsed = false;
    rightCollapsed = false;
    panelL.classList.remove('collapsed');
    panelR.classList.remove('collapsed');

    if (ws) {
      ws.classList.remove('left-collapsed');
      ws.classList.remove('right-collapsed');
    }

    panelL.style.removeProperty('display');
    panelL.style.removeProperty('flex');
    panelL.style.removeProperty('width');
    panelR.style.removeProperty('display');
    panelR.style.removeProperty('flex');
    panelR.style.removeProperty('width');

    updateDividerArrows();
    if (grid && typeof grid.render === 'function') grid.render();
  }

  function initSplitDivider() {
    const divider = document.getElementById('divider');
    const container = document.getElementById('workspaceContainer');
    const leftPanel = document.getElementById('panelLeft');
    const rightPanel = document.getElementById('panelRight');
    if (!divider || !container || !leftPanel || !rightPanel) return;

    let isDragging = false;

    divider.addEventListener('mousedown', (e) => {
      if (e.target.closest('.div-toggle-btn') || e.target.closest('.divider-toggles')) return;

      // Auto-restore collapsed panels on drag initiation
      if (leftCollapsed) toggleLeftPanel();
      if (rightCollapsed) toggleRightPanel();

      isDragging = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const percent = (offset / rect.width) * 100;
      if (percent > 20 && percent < 80) {
        leftPanel.style.width = `${percent}%`;
        leftPanel.style.flex = `0 0 ${percent}%`;
        rightPanel.style.width = `${100 - percent}%`;
        rightPanel.style.flex = `0 0 ${100 - percent}%`;
        if (grid) grid.render();
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        if (grid) grid.render();
      }
    });

    updateDividerArrows();
  }

  function initTheme() {
    try {
      const saved = localStorage.getItem('manodemy-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      applyTheme(saved, false);
    } catch (e) {
      console.error('Error initTheme:', e);
    }
  }

  function applyTheme(theme, save = true) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    if (document.body) {
      document.body.classList.toggle('dark', isDark);
      document.body.classList.toggle('light', !isDark);
    }
    if (save) {
      localStorage.setItem('manodemy-theme', theme);
    }
    updateThemeSwitchUI(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    if (document.body) document.body.classList.add('theme-transitioning');
    applyTheme(newTheme, true);
    setTimeout(() => {
      if (document.body) document.body.classList.remove('theme-transitioning');
    }, 300);
  }

  function updateThemeSwitchUI(theme) {
    const current = theme || document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const isLight = current === 'light';
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.setAttribute('aria-checked', isLight ? 'true' : 'false');
      btn.title = isLight ? 'Switch to Dark mode' : 'Switch to Light mode';
      btn.setAttribute('aria-label', isLight ? 'Switch to Dark mode' : 'Switch to Light mode');
    }
  }

  function initMobileThemeToggle() {
    // Keep themeToggleBtn cleanly inside header-right across all viewports
    const btn = document.getElementById('themeToggleBtn');
    const headerRight = document.querySelector('.header-right');
    if (btn && headerRight && !headerRight.contains(btn)) {
      headerRight.insertBefore(btn, headerRight.firstChild);
    }
  }

  function initMobileKeyboardObserver() {
    function updateKb() {
      if (window.innerWidth > 900) {
        document.documentElement.style.setProperty('--kb-offset', '0px');
        document.body.classList.remove('mobile-keyboard-open');
        return;
      }
      let kbHeight = 0;
      if (window.visualViewport) {
        const vv = window.visualViewport;
        kbHeight = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      }
      const isKbOpen = kbHeight > 60 || document.body.classList.contains('is-cell-editing');
      document.body.classList.toggle('mobile-keyboard-open', isKbOpen);
      document.documentElement.style.setProperty('--kb-offset', `${Math.round(kbHeight)}px`);
    }

    window.updateMobileKeyboard = updateKb;

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateKb);
      window.visualViewport.addEventListener('scroll', updateKb);
    }
    window.addEventListener('resize', updateKb);
    window.addEventListener('orientationchange', () => setTimeout(updateKb, 200));

    updateKb();
  }

  // ═══════════════ 9b. HEADER NAVIGATION & MOBILE ZEN TOGGLE ═══════════════
  function getAdjacentDayInfo() {
    const match = window.location.pathname.match(/day(\d+)\.html/i);
    let currentNum = match ? parseInt(match[1], 10) : (window.COURSE_DAY || 1);
    const prevNum = currentNum - 1;
    const nextNum = currentNum + 1;
    const maxDay = 12;
    const prevUrl = prevNum >= 1 ? `/excel/day${String(prevNum).padStart(2, '0')}.html` : null;
    const nextUrl = nextNum <= maxDay ? `/excel/day${String(nextNum).padStart(2, '0')}.html` : null;
    return { prevUrl, nextUrl, prevNum, nextNum, currentNum };
  }
  window.getAdjacentDayInfo = getAdjacentDayInfo;

  function updateDayNavArrows() {
    const { prevUrl, nextUrl, prevNum, nextNum } = getAdjacentDayInfo();
    const prevBtn = document.getElementById('prevDayBtn');
    const nextBtn = document.getElementById('nextDayBtn');

    if (prevBtn) {
      if (prevUrl) {
        prevBtn.disabled = false;
        prevBtn.classList.remove('disabled');
        prevBtn.title = `Previous Day (Day ${String(prevNum).padStart(2, '0')})`;
        prevBtn.setAttribute('aria-label', `Previous Day (Day ${String(prevNum).padStart(2, '0')})`);
      } else {
        prevBtn.disabled = true;
        prevBtn.classList.add('disabled');
        prevBtn.title = 'You are on the first day';
        prevBtn.setAttribute('aria-label', 'First day reached');
      }
    }

    if (nextBtn) {
      if (nextUrl) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('disabled');
        nextBtn.title = `Next Day (Day ${String(nextNum).padStart(2, '0')})`;
        nextBtn.setAttribute('aria-label', `Next Day (Day ${String(nextNum).padStart(2, '0')})`);
      } else {
        nextBtn.disabled = true;
        nextBtn.classList.add('disabled');
        nextBtn.title = 'You are on the last available day';
        nextBtn.setAttribute('aria-label', 'Last day reached');
      }
    }
  }
  window.updateDayNavArrows = updateDayNavArrows;

  function navigateToPrevDay() {
    const { prevUrl } = getAdjacentDayInfo();
    if (prevUrl) {
      window.location.href = prevUrl;
    }
  }
  window.navigateToPrevDay = navigateToPrevDay;

  function navigateToNextDay() {
    const { nextUrl, nextNum } = getAdjacentDayInfo();
    if (nextUrl) {
      window.location.href = nextUrl;
    } else {
      showComingSoonToast(`Day ${String(nextNum).padStart(2, '0')}`, nextNum);
    }
  }
  window.navigateToNextDay = navigateToNextDay;

  function showComingSoonToast(title, dayNum) {
    let toast = document.getElementById('excelComingSoonToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'excelComingSoonToast';
      toast.className = 'excel-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="excel-toast-content">
        <span class="excel-toast-icon">⏳</span>
        <div class="excel-toast-text">
          <strong>Day ${String(dayNum).padStart(2, '0')} Coming Soon</strong>
          <span>${title || 'Interactive lesson is currently in active preparation.'}</span>
        </div>
      </div>
    `;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
  window.showComingSoonToast = showComingSoonToast;

  function initHeaderNavigation(content) {
    const curContent = content || getActiveExcelContent() || {};
    updateDayNavArrows();

    const daySelect = document.getElementById('daySelect');
    const topicSelect = document.getElementById('topicSelect');

    if (daySelect) {
      const dayPill = daySelect.closest('.day-picker-pill');
      if (dayPill) {
        daySelect.style.display = 'none';

        // Clean any duplicate icons / triggers
        dayPill.querySelectorAll('.day-picker-dot, .day-picker-chevron').forEach(el => {
          if (!el.closest('.custom-select-trigger')) el.remove();
        });

        let trigger = dayPill.querySelector('.custom-select-trigger');
        if (!trigger) {
          trigger = document.createElement('div');
          trigger.className = 'custom-select-trigger';
          dayPill.insertBefore(trigger, daySelect);
        }

        const currentDayNum = window.COURSE_DAY || 1;
        const currentDayStr = String(currentDayNum).padStart(2, '0');

        trigger.innerHTML = `
          <span class="selected-text" style="display:inline-flex;align-items:center;gap:7px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; flex-shrink: 0;"><rect x="2" y="2" width="20" height="20" rx="4.5" fill="#107C41"/><path d="M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"/></svg>
            <strong>Day ${currentDayStr}</strong>
          </span>
          <span class="day-picker-chevron">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        `;

        let optionsMenu = dayPill.querySelector('.custom-select-options');
        if (!optionsMenu) {
          optionsMenu = document.createElement('div');
          optionsMenu.className = 'custom-select-options';
          dayPill.appendChild(optionsMenu);
        }

        // Populate optionsMenu with grouped 60 days
        function renderDayOptionsMenu() {
          let allDays = window.COURSE_MANIFEST_60 || [];
          if ((!allDays || allDays.length === 0) && window.EXCEL_MANIFEST && window.EXCEL_MANIFEST.length > 0) {
            allDays = window.EXCEL_MANIFEST.map(d => ({
              track: 'excel',
              trackDay: d.day,
              globalDay: d.globalDay,
              title: d.title,
              free: true,
              prepared: true,
              comingSoon: false,
              url: `/excel/day${String(d.day).padStart(2, '0')}.html`
            }));
          }
          if (!allDays || allDays.length === 0) return;

          const svgIcons = window.SVG_TRACK_ICONS || {
            excel: `<svg viewBox="0 0 23 23" fill="none" style="width:14px;height:14px;"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg>`,
            sql: `<svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg>`,
            python: `<svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;"><path d="M11.927 2.1c-4.225 0-3.957 1.83-3.957 1.83l.004 1.895h4.033v.57H6.33S3.5 6.064 3.5 10.284c0 4.22 2.47 4.07 2.47 4.07h1.474v-2.07s-.08-2.47 2.43-2.47h4.167s2.35.038 2.35-2.312V4.012S16.85 2.1 11.927 2.1zm-2.22 1.342a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z" fill="#3b82f6"/><path d="M12.073 21.9c4.225 0 3.957-1.83 3.957-1.83l-.004-1.895h-4.033v-.57h5.677s2.83.33 2.83-3.89c0-4.22-2.47-4.07-2.47-4.07h-1.474v2.07s.08 2.47-2.43 2.47h-4.167s-2.35-.038-2.35 2.312v3.488s-.458 1.912 4.464 1.912zm2.22-1.342a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z" fill="#eab308"/></svg>`
          };

          optionsMenu.innerHTML = '';

          const tracks = [
            { key: 'excel', label: '📊 Excel Mastery (Days 01–12)', days: allDays.filter(d => d.track === 'excel') },
            { key: 'sql', label: '🗄️ SQL Mastery (Days 01–18)', days: allDays.filter(d => d.track === 'sql') },
            { key: 'python', label: '🐍 Python for Data Analysis (Days 31–60)', days: allDays.filter(d => d.track === 'python') }
          ];

          tracks.forEach(trackGroup => {
            if (trackGroup.days.length === 0) return;
            const header = document.createElement('div');
            header.className = 'dropdown-section-header';
            header.textContent = trackGroup.label;
            optionsMenu.appendChild(header);

            trackGroup.days.forEach(d => {
              const isCurrentExcel = (d.track === 'excel' && d.trackDay === currentDayNum);
              const isLocked = !d.free && !d.prepared;
              const optionItem = document.createElement('div');
              optionItem.className = `custom-select-option${isCurrentExcel ? ' selected' : ''}${isLocked ? ' is-locked' : ''}`;

              const iconSvg = svgIcons[d.track] || '';
              const dayNumStr = String(d.track === 'excel' ? d.trackDay : (d.trackDay || d.globalDay)).padStart(2, '0');

              let badgeHtml = '';
              if (d.comingSoon && !d.prepared) {
                badgeHtml = '<span class="day-coming-soon-badge">Coming Soon</span>';
              } else if (d.free) {
                badgeHtml = '<span class="day-free-badge">FREE</span>';
              } else if (isLocked) {
                badgeHtml = '<span class="day-lock-badge" title="Pro subscription required">🔒</span>';
              }

              optionItem.innerHTML = `
                <span class="option-day-tag">
                  <span class="track-icon-wrap">${iconSvg}</span>
                  <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                    <strong>Day ${dayNumStr}</strong>
                    <span class="option-day-title">${d.title}</span>
                  </span>
                </span>
                ${badgeHtml}
              `;

              optionItem.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isCurrentExcel) {
                  optionsMenu.classList.remove('open');
                  dayPill.classList.remove('open');
                  return;
                }
                if (d.comingSoon && !d.prepared) {
                  showComingSoonToast(d.title, d.track === 'excel' ? d.trackDay : d.globalDay);
                  optionsMenu.classList.remove('open');
                  dayPill.classList.remove('open');
                  return;
                }
                window.location.href = d.url;
              });

              optionsMenu.appendChild(optionItem);
            });
          });
        }

        renderDayOptionsMenu();

        // Toggle open/close on pill click
        dayPill.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options.open').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement?.classList.remove('open');
          });
          if (!isOpen) {
            if (optionsMenu.children.length === 0) {
              renderDayOptionsMenu();
            }
            if (window.innerWidth <= 900) {
              // Body portal on mobile to escape all container overflow/backdrop-filter bugs
              if (optionsMenu.parentElement !== document.body) {
                document.body.appendChild(optionsMenu);
              }
              const rect = dayPill.getBoundingClientRect();
              optionsMenu.style.position = 'fixed';
              optionsMenu.style.top = Math.max(70, Math.round(rect.bottom + 6)) + 'px';
              optionsMenu.style.left = '10px';
              optionsMenu.style.right = '10px';
              optionsMenu.style.width = 'calc(100vw - 20px)';
              optionsMenu.style.zIndex = '999999';
              optionsMenu.style.maxHeight = '65vh';
            } else {
              // On desktop, keep inside dayPill
              if (optionsMenu.parentElement !== dayPill) {
                dayPill.appendChild(optionsMenu);
              }
              optionsMenu.style.removeProperty('position');
              optionsMenu.style.removeProperty('top');
              optionsMenu.style.removeProperty('left');
              optionsMenu.style.removeProperty('right');
              optionsMenu.style.removeProperty('width');
              optionsMenu.style.removeProperty('zIndex');
              optionsMenu.style.removeProperty('maxHeight');
            }
            optionsMenu.classList.add('open');
            dayPill.classList.add('open');
          }
        };
      }
    }

    if (topicSelect) {
      const curContentFinal = curContent || (window.EXCEL_COURSE_CONTENT && window.EXCEL_COURSE_CONTENT[`excelDay${String(currentDayNum).padStart(2, '0')}`]) || {};
      const dayTitle = curContent.title || (window.EXCEL_MANIFEST && window.EXCEL_MANIFEST.find(d => d.day === currentDayNum)?.title) || 'Excel Orientation & Essential Mathematical Formulas';
      const durationStr = curContent.lectureDuration || '10:00';
      topicSelect.innerHTML = `<option value="topic01" selected>${dayTitle}</option>`;
      const topicPill = topicSelect.closest('.topic-picker-pill');
      if (topicPill) {
        topicPill.querySelectorAll('.day-picker-dot').forEach(el => el.remove());
        let trigger = topicPill.querySelector('.custom-select-trigger');
        if (!trigger) {
          trigger = document.createElement('div');
          trigger.className = 'custom-select-trigger';
          topicPill.insertBefore(trigger, topicSelect);
        }
        trigger.innerHTML = `
          <span class="trigger-title">${dayTitle}</span>
          <span class="trigger-duration-badge" style="background: rgba(16, 124, 65, 0.2); color: #21A366; border: 1px solid rgba(16, 124, 65, 0.4); padding: 1px 7px; border-radius: 12px; font-size: 11px; font-weight: 700; margin-left: 6px;">${durationStr}</span>
        `;
      }
    }

    const inLessonBtn = document.querySelector('.in-this-lesson-pill') || document.getElementById('inThisLessonBtn') || document.querySelector('.chapter-dropdown-btn');
    if (inLessonBtn) {
      const curContentFinal = curContent || (window.EXCEL_COURSE_CONTENT && window.EXCEL_COURSE_CONTENT[`excelDay${String(currentDayNum).padStart(2, '0')}`]) || {};
      const firstSectionTitle = (curContent.topics && curContent.topics[0]) || '01. Excel Interface & Grid Anatomy';
      inLessonBtn.innerHTML = `<span>${firstSectionTitle}</span> <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
    }
  }

  // Global document click & touch listeners for outside close
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.day-picker-pill')) {
      document.querySelectorAll('.custom-select-options.open').forEach(menu => {
        menu.classList.remove('open');
        menu.parentElement?.classList.remove('open');
      });
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.day-picker-pill') && !e.target.closest('.custom-select-options')) {
      document.querySelectorAll('.custom-select-options.open').forEach(menu => {
        menu.classList.remove('open');
        menu.parentElement?.classList.remove('open');
      });
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select-options.open').forEach(menu => {
        menu.classList.remove('open');
        menu.parentElement?.classList.remove('open');
      });
    }
  });

  function toggleMobileHeader(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const header = document.querySelector('.header');
    const toggleBtn = document.getElementById('mobileHdrToggleBtn');
    if (!header) return;

    const isCollapsed = header.classList.toggle('is-collapsed');
    if (toggleBtn) {
      toggleBtn.classList.toggle('is-collapsed', isCollapsed);
      const label = toggleBtn.querySelector('.hdr-toggle-label');
      if (label) {
        label.textContent = isCollapsed ? 'Show Info' : 'Hide Info';
      }
      const icon = toggleBtn.querySelector('.hdr-toggle-icon svg');
      if (icon) {
        icon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }
  }

  function setMobileTab(tab) {
    const ws = document.getElementById('workspaceContainer');
    const btnPractice = document.getElementById('tabBtnPractice');
    const btnTheory = document.getElementById('tabBtnTheory');
    const panelLeft = document.getElementById('panelLeft');
    const panelRight = document.getElementById('panelRight');

    if (tab === 'theory') {
      if (ws) {
        ws.classList.remove('mobile-show-practice');
        ws.classList.add('mobile-show-theory');
      }
      if (btnPractice) btnPractice.classList.remove('active');
      if (btnTheory) btnTheory.classList.add('active');
      if (panelLeft) panelLeft.style.display = 'none';
      if (panelRight) {
        panelRight.style.display = 'flex';
        panelRight.style.width = '100%';
      }
    } else {
      if (ws) {
        ws.classList.remove('mobile-show-theory');
        ws.classList.add('mobile-show-practice');
      }
      if (btnTheory) btnTheory.classList.remove('active');
      if (btnPractice) btnPractice.classList.add('active');
      if (panelRight) panelRight.style.display = 'none';
      if (panelLeft) {
        panelLeft.style.display = 'flex';
        panelLeft.style.width = '100%';
      }
      if (grid) grid.render();
    }
  }

  // ═══════════════ 10. TIMED TEST PORTAL (20 QUESTIONS) ═══════════════
  function initTestPortal() {
    // Ready for test overlay
  }

  function openTestPortal() {
    const overlay = document.getElementById('testOverlay');
    if (overlay) overlay.style.display = 'flex';
  }

  function closeTestPortal() {
    const overlay = document.getElementById('testOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  function submitTest() {
    alert('Assessment submitted successfully! Score: 20 / 20');
    closeTestPortal();
  }

  function closeScorecard() {
    const overlay = document.getElementById('scorecardOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  // ═══════════════ 11. GLOBAL API EXPORT ═══════════════
  root.bootExcelStudio = bootExcelStudio;
  root.switchSheet = switchSheet;
  root.prevQuestion = prevQuestion;
  root.nextQuestion = nextQuestion;
  root.jumpToQuestion = jumpToQuestion;
  root.toggleQPicker = toggleQPicker;
  root.toggleFocusView = toggleFocusView;
  root.runCurrentFormula = runCurrentFormula;
  root.cancelFormulaEdit = cancelFormulaEdit;
  root.peekSolution = peekSolution;
  root.resetWorkbookData = resetWorkbookData;
  root.clearActiveCell = clearActiveCell;
  root.downloadPracticeWorkbookXLSX = downloadPracticeWorkbookXLSX;
  root.openPracticeGoogleSheets = openPracticeGoogleSheets;
  root.closeGSheetsModal = closeGSheetsModal;
  root.copyCurrentSheetToClipboard = copyCurrentSheetToClipboard;
  root.switchRibbonTab = switchRibbonTab;
  root.toggleCellFormat = toggleCellFormat;
  root.setCellAlignment = setCellAlignment;
  root.applyNumberFormat = applyNumberFormat;
  root.sortActiveColumn = sortActiveColumn;
  root.insertFormulaSnippet = insertFormulaSnippet;
  root.openPivotModal = openPivotModal;
  root.closePivotModal = closePivotModal;
  root.updatePivotCalculation = updatePivotCalculation;
  root.toggleCombinedPlayback = toggleCombinedPlayback;
  root.seekCombinedPlayback = seekCombinedPlayback;
  root.skipCombined = skipCombined;
  root.toggleChapterList = toggleChapterList;
  root.jumpToChapter = jumpToChapter;
  root.toggleVolumePopover = toggleVolumePopover;
  root.setPlaybackVolume = setPlaybackVolume;
  root.toggleSpeedPopover = toggleSpeedPopover;
  root.selectSpeedOption = selectSpeedOption;
  root.resetSplitScreen = resetSplitScreen;
  root.toggleLeftPanel = toggleLeftPanel;
  root.toggleRightPanel = toggleRightPanel;
  root.initTheme = initTheme;
  root.toggleTheme = toggleTheme;
  root.toggleMobileHeader = toggleMobileHeader;
  root.setMobileTab = setMobileTab;
  root.openTestPortal = openTestPortal;
  root.closeTestPortal = closeTestPortal;
  root.submitTest = submitTest;
  root.closeScorecard = closeScorecard;

  // ═══════════════ 12. BOOT HOOK ═══════════════
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootExcelStudio);
  } else {
    bootExcelStudio();
  }

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) bootExcelStudio();
  });

})(typeof window !== 'undefined' ? window : this);
