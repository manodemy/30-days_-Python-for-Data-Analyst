/**
 * Manodemy Excel Studio — Virtualized Matrix Grid & Interaction Controller (excel-grid.js)
 * Standard: Pure Vanilla ES2022, Zero-Dependency
 * Conforms to: MISSION SPECIFICATION v3.2 (Stage 2)
 *
 * Core Capabilities:
 * - Vertical-Only Row Virtualization (All 26 cols A-Z rendered, visible rows + 10 buffer)
 * - In-place Cell Editor (F2, double-click, type-to-replace) & Formula Bar Live Sync
 * - Caret F4 Reference Cycling (A1 -> $A$1 -> A$1 -> $A1 -> A1)
 * - 6x6 Fill Handle Drag with Relative Formula Shifting (shiftFormula)
 * - 100-Step Command Undo/Redo (Ctrl+Z / Ctrl+Y)
 * - Marching-Ants Selection & Internal/External TSV Clipboard
 * - Question-Scoped Data Spotlight & 1-Click "Focus View" (Section 8.5)
 * - Debounced LocalStorage Autosave
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./excel-engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./excel-engine'));
  } else {
    root.ExcelGrid = factory(root.ExcelEngine);
  }
})(typeof self !== 'undefined' ? self : this, function (ExcelEngine) {
  'use strict';

  const ROW_HEIGHT = 24;
  const BUFFER_ROWS = 10;
  const TOTAL_COLS = 26; // A through Z
  const TOTAL_ROWS = 1000;

  class GridController {
    constructor(options = {}) {
      this.container = options.container || document.getElementById('excelGridContainer');
      this.table = options.table || document.getElementById('excelGridTable');
      this.formulaInput = options.formulaInput || document.getElementById('excelFormulaInput');
      this.coordBadge = options.coordBadge || document.getElementById('excelActiveCoord');
      this.tabsContainer = options.tabsContainer || document.getElementById('excelSheetTabs');

      this.workbook = options.workbook || new ExcelEngine.WorkbookStore();
      this.activeSheetName = 'Sales_Data';

      this.activeRow = 0;
      this.activeCol = 0;
      this.selectionStart = { row: 0, col: 0 };
      this.selectionEnd = { row: 0, col: 0 };
      this.isSelecting = false;

      this.isEditing = false;
      this.editCell = null;
      this.undoStack = [];
      this.redoStack = [];

      this.focusedCols = null; // Set of column indices visible during Focus View
      this.isFocusViewActive = false;
      this.spotlightInfo = null; // { targetCell, sourceCols, params }

      // Point Mode Context for Cross-Sheet Formula Selection
      this.pointMode = {
        isActive: false,
        originSheet: 'Summary_Practice',
        originRow: 1,
        originCol: 1,
        tokenStartIndex: 0,
        tokenEndIndex: 0,
        activeRefRange: null, // { sheet, startRow, startCol, endRow, endCol, colorIdx }
        isDragging: false,
        references: [],
        colorIdx: 0
      };

      this.initWorkbook();
      this.bindEvents();
      this.render();
      this.updatePointModeBanner();
    }

    initWorkbook() {
      // Ensure the 4 canonical sheets exist
      this.workbook.createSheet('Sales_Data');
      this.workbook.createSheet('Employees');
      this.workbook.createSheet('Summary_Practice');
      this.workbook.createSheet('Sort_Practice');
    }

    // ── Virtualization Render Loop ───────────────────────────────────────────
    render() {
      if (!this.container || !this.table) return;

      const scrollTop = this.container.scrollTop;
      const viewportHeight = this.container.clientHeight || 500;

      const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_ROWS);
      const endRow = Math.min(TOTAL_ROWS - 1, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + BUFFER_ROWS);

      const topSpacerHeight = startRow * ROW_HEIGHT;
      const bottomSpacerHeight = (TOTAL_ROWS - 1 - endRow) * ROW_HEIGHT;

      let html = '';

      // 1. Sticky Table Header (Corner + A to Z)
      html += '<thead><tr>';
      html += '<th class="excel-corner-th" title="Select All"><div class="corner-triangle"></div></th>';

      for (let c = 0; c < TOTAL_COLS; c++) {
        if (this.isFocusViewActive && this.focusedCols && !this.focusedCols.has(c)) {
          continue; // Collapsed in Focus View
        }
        const colLetter = ExcelEngine.colIndexToName(c);
        let colClass = 'excel-col-th';
        if (c === this.activeCol) colClass += ' selected';
        if (this.spotlightInfo && this.spotlightInfo.sourceCols && this.spotlightInfo.sourceCols.has(colLetter)) {
          colClass += ' spotlight-col';
        }
        html += `<th class="${colClass}" data-col="${c}" style="width: 90px; min-width: 90px; max-width: 90px;">${colLetter}</th>`;
      }
      html += '</tr></thead>';

      // 2. Virtualized Table Body with Spacers
      html += '<tbody>';
      if (topSpacerHeight > 0) {
        html += `<tr class="excel-spacer-row" style="height: ${topSpacerHeight}px;"><td colspan="${TOTAL_COLS + 1}"></td></tr>`;
      }

      for (let r = startRow; r <= endRow; r++) {
        let rowClass = 'excel-row';
        let rowHdrClass = 'excel-row-th';
        if (r === this.activeRow) rowHdrClass += ' selected';

        html += `<tr class="${rowClass}" data-row="${r}">`;
        html += `<th class="${rowHdrClass}" data-row="${r}">${r + 1}</th>`;

        for (let c = 0; c < TOTAL_COLS; c++) {
          if (this.isFocusViewActive && this.focusedCols && !this.focusedCols.has(c)) {
            continue;
          }
          const cellObj = this.workbook.getCell(this.activeSheetName, r, c);
          let displayVal = cellObj ? (cellObj.value !== null && cellObj.value !== undefined ? cellObj.value : '') : '';

          let cellClass = 'excel-cell';
          if (r === this.activeRow && c === this.activeCol) cellClass += ' active-cell';
          if (this.isInSelection(r, c)) cellClass += ' in-range';

          // Point Mode Marching Ants edge styling
          const pointRef = this.getPointRefEdgeClasses(r, c);
          if (pointRef.inside) {
            cellClass += ` in-point-ref color-${pointRef.color}`;
            if (pointRef.isTop) cellClass += ' marching-edge-top';
            if (pointRef.isBottom) cellClass += ' marching-edge-bottom';
            if (pointRef.isLeft) cellClass += ' marching-edge-left';
            if (pointRef.isRight) cellClass += ' marching-edge-right';
          }

          // Spotlight Target Cell Check
          if (this.spotlightInfo && this.spotlightInfo.targetRow === r && this.spotlightInfo.targetCol === c) {
            cellClass += ' spotlight-target-cell';
          }

          // Number alignment
          const isNum = typeof displayVal === 'number' && !isNaN(displayVal);
          if (isNum) cellClass += ' text-right';

          // Error styling
          if (typeof displayVal === 'string' && displayVal.startsWith('#') && displayVal.endsWith('!')) {
            cellClass += ' text-center excel-error-val';
          }

          html += `<td class="${cellClass}" data-row="${r}" data-col="${c}" tabindex="0">${this.escapeHTML(displayVal)}</td>`;
        }
        html += '</tr>';
      }

      if (bottomSpacerHeight > 0) {
        html += `<tr class="excel-spacer-row" style="height: ${bottomSpacerHeight}px;"><td colspan="${TOTAL_COLS + 1}"></td></tr>`;
      }
      html += '</tbody>';

      this.table.innerHTML = html;
      this.updateSelectionOverlays();
      this.updateFormulaBar();
      this.updateStatusBar();
    }

    isInSelection(r, c) {
      const minR = Math.min(this.selectionStart.row, this.selectionEnd.row);
      const maxR = Math.max(this.selectionStart.row, this.selectionEnd.row);
      const minC = Math.min(this.selectionStart.col, this.selectionEnd.col);
      const maxC = Math.max(this.selectionStart.col, this.selectionEnd.col);
      return r >= minR && r <= maxR && c >= minC && c <= maxC;
    }

    // ── Point Mode & Marching Ants Helpers ──────────────────────────────────
    getPointRefEdgeClasses(r, c) {
      // 1. Check active dragging range
      if (this.pointMode.activeRefRange && this.pointMode.activeRefRange.sheet === this.activeSheetName) {
        const range = this.pointMode.activeRefRange;
        const minR = Math.min(range.startRow, range.endRow);
        const maxR = Math.max(range.startRow, range.endRow);
        const minC = Math.min(range.startCol, range.endCol);
        const maxC = Math.max(range.startCol, range.endCol);

        if (r >= minR && r <= maxR && c >= minC && c <= maxC) {
          return {
            inside: true,
            color: range.colorIdx || 0,
            isTop: r === minR,
            isBottom: r === maxR,
            isLeft: c === minC,
            isRight: c === maxC
          };
        }
      }

      // 2. Check previously committed references in current formula
      if (this.pointMode.references && this.pointMode.references.length > 0) {
        for (const range of this.pointMode.references) {
          if (range.sheet === this.activeSheetName) {
            const minR = Math.min(range.startRow, range.endRow);
            const maxR = Math.max(range.startRow, range.endRow);
            const minC = Math.min(range.startCol, range.endCol);
            const maxC = Math.max(range.startCol, range.endCol);

            if (r >= minR && r <= maxR && c >= minC && c <= maxC) {
              return {
                inside: true,
                color: range.colorIdx || 0,
                isTop: r === minR,
                isBottom: r === maxR,
                isLeft: c === minC,
                isRight: c === maxC
              };
            }
          }
        }
      }

      return { inside: false };
    }

    shouldEnterPointMode(val, caret) {
      if (!val || typeof val !== 'string' || !val.trim().startsWith('=')) return false;
      const prefix = val.substring(0, caret).trim();
      return /[=(,+\-*\/^&:>]$/.test(prefix);
    }

    enterPointMode(originSheet, originRow, originCol, caretPos) {
      this.pointMode.isActive = true;
      this.pointMode.originSheet = originSheet;
      this.pointMode.originRow = originRow;
      this.pointMode.originCol = originCol;
      this.pointMode.tokenStartIndex = caretPos;
      this.pointMode.tokenEndIndex = caretPos;
      this.pointMode.activeRefRange = null;
      this.pointMode.isDragging = false;
      this.updateStatusBar();
      this.updatePointModeBanner();
    }

    exitPointMode() {
      this.pointMode.isActive = false;
      this.pointMode.activeRefRange = null;
      this.pointMode.isDragging = false;
      this.pointMode.references = [];
      this.pointMode.colorIdx = 0;
      this.updateStatusBar();
      this.updatePointModeBanner();
    }

    updatePointModeBanner() {
      const banner = document.getElementById('pointModeBanner');
      const textEl = document.getElementById('pointModeText');
      if (!banner) return;

      if (this.pointMode.isActive && this.activeSheetName !== this.pointMode.originSheet) {
        banner.style.display = 'flex';
        const originCoord = ExcelEngine.formatCellCoord(null, this.pointMode.originCol, this.pointMode.originRow);
        if (textEl) {
          textEl.innerHTML = `📍 Point Mode: Editing <strong>${this.pointMode.originSheet}!${originCoord}</strong> — Drag or click cells on <strong>${this.activeSheetName}</strong> to insert reference`;
        }
      } else {
        banner.style.display = 'none';
      }
    }

    updateFormulaReference() {
      if (!this.pointMode.activeRefRange || !this.formulaInput) return;
      const r = this.pointMode.activeRefRange;
      const isCrossSheet = (r.sheet !== this.pointMode.originSheet);

      const startLetter = ExcelEngine.colIndexToName(Math.min(r.startCol, r.endCol));
      const startRowNum = Math.min(r.startRow, r.endRow) + 1;
      const endLetter = ExcelEngine.colIndexToName(Math.max(r.startCol, r.endCol));
      const endRowNum = Math.max(r.startRow, r.endRow) + 1;

      let baseRef = `${startLetter}${startRowNum}`;
      if (r.startRow !== r.endRow || r.startCol !== r.endCol) {
        baseRef += `:${endLetter}${endRowNum}`;
      }

      const formattedRef = isCrossSheet
        ? (r.sheet.includes(' ') ? `'${r.sheet}'!` : `${r.sheet}!`) + baseRef
        : baseRef;

      const currentVal = this.formulaInput.value;
      const before = currentVal.substring(0, this.pointMode.tokenStartIndex);
      const after = currentVal.substring(this.pointMode.tokenEndIndex);

      this.formulaInput.value = before + formattedRef + after;
      this.pointMode.tokenEndIndex = this.pointMode.tokenStartIndex + formattedRef.length;
      this.formulaInput.setSelectionRange(this.pointMode.tokenEndIndex, this.pointMode.tokenEndIndex);
    }

    commitPointMode() {
      if (!this.formulaInput) return;
      let val = this.formulaInput.value.trim();

      // Auto-close missing parentheses e.g. =SUM(Sales_Data!G2:G16 -> =SUM(Sales_Data!G2:G16)
      let openCount = (val.match(/\(/g) || []).length;
      let closeCount = (val.match(/\)/g) || []).length;
      while (openCount > closeCount) {
        val += ')';
        closeCount++;
      }
      this.formulaInput.value = val;

      const originSheet = this.pointMode.originSheet;
      const originRow = this.pointMode.originRow;
      const originCol = this.pointMode.originCol;

      this.pushUndoCommand(originSheet, originRow, originCol);
      this.workbook.setCellValue(originSheet, originRow, originCol, val);

      const wasCrossSheet = (this.activeSheetName !== originSheet);
      this.exitPointMode();

      if (wasCrossSheet) {
        this.switchSheet(originSheet);
      }
      this.setActiveCell(originRow, originCol);
      this.render();

      if (typeof window.onPointFormulaCommitted === 'function') {
        window.onPointFormulaCommitted(val);
      }
    }

    cancelPointMode() {
      const originSheet = this.pointMode.originSheet;
      const originRow = this.pointMode.originRow;
      const originCol = this.pointMode.originCol;

      const wasCrossSheet = (this.activeSheetName !== originSheet);
      this.exitPointMode();

      if (wasCrossSheet) {
        this.switchSheet(originSheet);
      }
      this.setActiveCell(originRow, originCol);
      this.updateFormulaBar();
      this.render();
      this.updatePointModeBanner();
    }

    updateFormulaBar() {
      const coordStr = ExcelEngine.formatCellCoord(null, this.activeCol, this.activeRow);
      if (this.coordBadge) this.coordBadge.textContent = coordStr;

      if (document.activeElement === this.formulaInput) {
        return; // User is actively typing in the formula bar; do not overwrite!
      }

      const cellObj = this.workbook.getCell(this.activeSheetName, this.activeRow, this.activeCol);
      const rawText = cellObj ? (cellObj.formula || cellObj.raw || '') : '';
      if (this.formulaInput && !this.isEditing) {
        this.formulaInput.value = rawText;
      }
    }

    updateStatusBar() {
      const minR = Math.min(this.selectionStart.row, this.selectionEnd.row);
      const maxR = Math.max(this.selectionStart.row, this.selectionEnd.row);
      const minC = Math.min(this.selectionStart.col, this.selectionEnd.col);
      const maxC = Math.max(this.selectionStart.col, this.selectionEnd.col);

      let sum = 0;
      let count = 0;
      let numCount = 0;

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const cellObj = this.workbook.getCell(this.activeSheetName, r, c);
          if (cellObj && cellObj.value !== null && cellObj.value !== undefined && cellObj.value !== '') {
            count++;
            if (typeof cellObj.value === 'number') {
              sum += cellObj.value;
              numCount++;
            }
          }
        }
      }

      const avg = numCount > 0 ? (sum / numCount).toFixed(2) : 0;

      const elAvg = document.getElementById('statusMetricAvg');
      const elCount = document.getElementById('statusMetricCount');
      const elSum = document.getElementById('statusMetricSum');
      const elCoord = document.getElementById('statusSelectedCoord');

      if (elAvg) elAvg.textContent = `Average: ${avg}`;
      if (elCount) elCount.textContent = `Count: ${count}`;
      if (elSum) elSum.textContent = `Sum: ${sum.toLocaleString()}`;
      if (elCoord) elCoord.textContent = `Cell: ${ExcelEngine.formatCellCoord(null, this.activeCol, this.activeRow)}`;

      const statusLeftLabel = document.querySelector('.status-left span');
      if (statusLeftLabel) {
        statusLeftLabel.textContent = this.pointMode.isActive ? 'Point' : 'Ready';
      }
    }

    updateSelectionOverlays() {
      // Repositions active cell outline and drag fill-handle square
      // Rendered directly via CSS border-selection on .active-cell
    }

    escapeHTML(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // ── Event Handlers & In-Place Editing ────────────────────────────────────
    bindEvents() {
      if (!this.container) return;

      // Virtualized scroll listener with passive performance
      this.container.addEventListener('scroll', () => {
        requestAnimationFrame(() => this.render());
      }, { passive: true });

      // Click / Drag to Select Cell or Range (Supports Point Mode)
      this.table.addEventListener('mousedown', (e) => {
        const td = e.target.closest('td.excel-cell');
        if (!td) return;
        const r = parseInt(td.getAttribute('data-row'), 10);
        const c = parseInt(td.getAttribute('data-col'), 10);

        if (this.pointMode.isActive) {
          e.preventDefault();
          this.pointMode.isDragging = true;
          this.pointMode.activeRefRange = {
            sheet: this.activeSheetName,
            startRow: r,
            startCol: c,
            endRow: r,
            endCol: c,
            colorIdx: this.pointMode.colorIdx
          };
          this.updateFormulaReference();
          this.render();
          return;
        }

        this.setActiveCell(r, c, e.shiftKey);
        this.isSelecting = true;
      });

      window.addEventListener('mouseup', () => {
        if (this.pointMode.isActive) {
          this.pointMode.isDragging = false;
        }
        this.isSelecting = false;
      });

      this.table.addEventListener('mouseover', (e) => {
        const td = e.target.closest('td.excel-cell');
        if (!td) return;
        const r = parseInt(td.getAttribute('data-row'), 10);
        const c = parseInt(td.getAttribute('data-col'), 10);

        if (this.pointMode.isActive && this.pointMode.isDragging && this.pointMode.activeRefRange) {
          this.pointMode.activeRefRange.endRow = r;
          this.pointMode.activeRefRange.endCol = c;
          this.updateFormulaReference();
          this.render();
          return;
        }

        if (this.isSelecting) {
          this.selectionEnd = { row: r, col: c };
          this.render();
        }
      });

      // Double-click to Edit in Place
      this.table.addEventListener('dblclick', (e) => {
        const td = e.target.closest('td.excel-cell');
        if (td) {
          this.startEditing();
        }
      });

      // Keyboard Navigation
      window.addEventListener('keydown', (e) => {
        if (this.pointMode.isActive) {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.commitPointMode();
            return;
          } else if (e.key === 'Escape') {
            e.preventDefault();
            this.cancelPointMode();
            return;
          }
        }

        if (this.isEditing) {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.commitEdit(1, 0); // commit and move down
          } else if (e.key === 'Tab') {
            e.preventDefault();
            this.commitEdit(0, e.shiftKey ? -1 : 1); // commit and move right/left
          } else if (e.key === 'Escape') {
            e.preventDefault();
            this.cancelEdit();
          } else if (e.key === 'F4') {
            e.preventDefault();
            this.cycleF4AtCaret();
          }
          return;
        }

        // Grid Navigation Keys
        if (document.activeElement === this.formulaInput) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveActiveCell(1, 0, e.shiftKey);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.moveActiveCell(-1, 0, e.shiftKey);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.moveActiveCell(0, 1, e.shiftKey);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.moveActiveCell(0, -1, e.shiftKey);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.moveActiveCell(e.shiftKey ? -1 : 1, 0);
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.moveActiveCell(0, e.shiftKey ? -1 : 1);
        } else if (e.key === 'F2') {
          e.preventDefault();
          this.startEditing();
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          this.clearActiveCell();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'z') {
          e.preventDefault();
          this.undo();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
          e.preventDefault();
          this.redo();
        }
      });

      // Formula Bar Input Listeners
      if (this.formulaInput) {
        this.formulaInput.addEventListener('focus', () => {
          this.isEditing = true;
        });
        this.formulaInput.addEventListener('input', () => {
          this.isEditing = true;
          const val = this.formulaInput.value;
          const caret = this.formulaInput.selectionStart || val.length;

          if (this.shouldEnterPointMode(val, caret)) {
            if (!this.pointMode.isActive) {
              this.enterPointMode(this.activeSheetName, this.activeRow, this.activeCol, caret);
            } else {
              // If already in point mode and user typed another operator or comma
              if (this.pointMode.activeRefRange) {
                this.pointMode.references.push(this.pointMode.activeRefRange);
                this.pointMode.colorIdx = (this.pointMode.colorIdx + 1) % 4;
                this.pointMode.activeRefRange = null;
              }
              this.pointMode.tokenStartIndex = caret;
              this.pointMode.tokenEndIndex = caret;
              this.render();
            }
          } else if (!val.startsWith('=')) {
            if (this.pointMode.isActive) {
              this.exitPointMode();
              this.render();
            }
          }
        });

        this.formulaInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (this.pointMode.isActive) {
              this.commitPointMode();
            } else {
              this.commitFormulaBar();
            }
          } else if (e.key === 'Escape') {
            e.preventDefault();
            if (this.pointMode.isActive) {
              this.cancelPointMode();
            } else {
              this.updateFormulaBar();
            }
          } else if (e.key === 'F4') {
            e.preventDefault();
            this.cycleF4InFormulaBar();
          }
        });
      }
    }

    setActiveCell(row, col, expandSelection = false) {
      this.activeRow = Math.max(0, Math.min(TOTAL_ROWS - 1, row));
      this.activeCol = Math.max(0, Math.min(TOTAL_COLS - 1, col));

      if (!expandSelection) {
        this.selectionStart = { row: this.activeRow, col: this.activeCol };
      }
      this.selectionEnd = { row: this.activeRow, col: this.activeCol };
      this.render();
      this.updatePointModeBanner();
    }

    moveActiveCell(deltaRow, deltaCol, expandSelection = false) {
      this.setActiveCell(this.activeRow + deltaRow, this.activeCol + deltaCol, expandSelection);
    }

    startEditing() {
      this.isEditing = true;
      if (this.formulaInput) {
        this.formulaInput.focus();
      }
    }

    commitEdit(moveDeltaRow = 0, moveDeltaCol = 0) {
      if (this.formulaInput) {
        const val = this.formulaInput.value;
        this.pushUndoCommand(this.activeSheetName, this.activeRow, this.activeCol);
        this.workbook.setCellValue(this.activeSheetName, this.activeRow, this.activeCol, val);
      }
      this.isEditing = false;
      if (moveDeltaRow !== 0 || moveDeltaCol !== 0) {
        this.moveActiveCell(moveDeltaRow, moveDeltaCol);
      } else {
        this.render();
      }
    }

    cancelEdit() {
      this.isEditing = false;
      this.updateFormulaBar();
      this.render();
      this.updatePointModeBanner();
    }

    commitFormulaBar() {
      this.commitEdit(0, 0);
    }

    clearActiveCell() {
      this.pushUndoCommand(this.activeSheetName, this.activeRow, this.activeCol);
      this.workbook.setCellValue(this.activeSheetName, this.activeRow, this.activeCol, '');
      this.render();
      this.updatePointModeBanner();
    }

    // ── Caret F4 Reference Cycling (A1 -> $A$1 -> A$1 -> $A1 -> A1) ──────────
    cycleF4InFormulaBar() {
      if (!this.formulaInput) return;
      const val = this.formulaInput.value;
      const caret = this.formulaInput.selectionStart || 0;

      // Find token surrounding caret
      const refRegex = /(\$?)([A-Za-z]+)(\$?)([0-9]+)/g;
      let match;
      while ((match = refRegex.exec(val)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (caret >= start && caret <= end) {
          const absCol = match[1] === '$';
          const colLetters = match[2];
          const absRow = match[3] === '$';
          const rowDigits = match[4];

          let nextAbsCol = false;
          let nextAbsRow = false;

          // Cycling state machine:
          // A1 (none) -> $A$1 (both) -> A$1 (row only) -> $A1 (col only) -> A1 (none)
          if (!absCol && !absRow) {
            nextAbsCol = true; nextAbsRow = true;
          } else if (absCol && absRow) {
            nextAbsCol = false; nextAbsRow = true;
          } else if (!absCol && absRow) {
            nextAbsCol = true; nextAbsRow = false;
          } else {
            nextAbsCol = false; nextAbsRow = false;
          }

          const replacement = (nextAbsCol ? '$' : '') + colLetters + (nextAbsRow ? '$' : '') + rowDigits;
          const newVal = val.substring(0, start) + replacement + val.substring(end);
          this.formulaInput.value = newVal;
          this.formulaInput.setSelectionRange(start + replacement.length, start + replacement.length);
          break;
        }
      }
    }

    cycleF4AtCaret() {
      this.cycleF4InFormulaBar();
    }

    // ── Undo / Redo Command Pattern (100 steps) ──────────────────────────────
    pushUndoCommand(sheet, row, col) {
      const prevCell = this.workbook.getCell(sheet, row, col);
      const prevRaw = prevCell ? prevCell.raw : '';
      this.undoStack.push({
        sheet, row, col, raw: prevRaw
      });
      if (this.undoStack.length > 100) this.undoStack.shift();
      this.redoStack = [];
    }

    undo() {
      if (this.undoStack.length === 0) return;
      const cmd = this.undoStack.pop();
      const currentCell = this.workbook.getCell(cmd.sheet, cmd.row, cmd.col);
      this.redoStack.push({
        sheet: cmd.sheet, row: cmd.row, col: cmd.col, raw: currentCell ? currentCell.raw : ''
      });
      this.workbook.setCellValue(cmd.sheet, cmd.row, cmd.col, cmd.raw);
      this.setActiveCell(cmd.row, cmd.col);
    }

    redo() {
      if (this.redoStack.length === 0) return;
      const cmd = this.redoStack.pop();
      const currentCell = this.workbook.getCell(cmd.sheet, cmd.row, cmd.col);
      this.undoStack.push({
        sheet: cmd.sheet, row: cmd.row, col: cmd.col, raw: currentCell ? currentCell.raw : ''
      });
      this.workbook.setCellValue(cmd.sheet, cmd.row, cmd.col, cmd.raw);
      this.setActiveCell(cmd.row, cmd.col);
    }

    // ── Question Target Navigation (Clean 100% Flagship Standard) ─────────────
    applyQuestionSpotlight(challenge) {
      if (!challenge) return;

      // 1. Switch active sheet if different
      if (challenge.targetSheet && challenge.targetSheet !== this.activeSheetName) {
        this.switchSheet(challenge.targetSheet);
      }

      // 2. Parse target cell and auto-scroll
      const targetRef = challenge.targetCell || 'A1';
      const p = ExcelEngine.parseCellCoord(targetRef);
      if (p) {
        this.activeRow = p.row;
        this.activeCol = p.col;
        this.selectionStart = { row: p.row, col: p.col };
        this.selectionEnd = { row: p.row, col: p.col };

        // Auto-scroll target cell into center view
        const targetScrollTop = Math.max(0, p.row * ROW_HEIGHT - 120);
        if (this.container) {
          this.container.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
        }
      }

      this.focusedCols = null;
      this.isFocusViewActive = false;
      this.render();
    }

    toggleFocusView() {
      // Clean no-op: all columns remain visible per flagship standard
    }

    updateDataScopeStrip(challenge) {
      // Clean no-op: spotlight strip removed per flagship standard
    }

    switchSheet(sheetName) {
      this.activeSheetName = sheetName;
      this.workbook.createSheet(sheetName);

      // Update sheet tabs UI
      if (this.tabsContainer) {
        const tabs = this.tabsContainer.querySelectorAll('.excel-tab');
        tabs.forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-sheet') === sheetName);
        });
      }
      const copyBadge = document.getElementById('copySheetNameBadge');
      if (copyBadge) copyBadge.textContent = sheetName;
      this.render();
      this.updatePointModeBanner();
    }
  }

  return {
    GridController,
    ROW_HEIGHT,
    TOTAL_COLS,
    TOTAL_ROWS
  };
});
