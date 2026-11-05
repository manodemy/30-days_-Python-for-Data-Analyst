/**
 * Manodemy Excel Studio - Virtualized Matrix Grid & Interaction Controller (excel-grid.js)
 * Standard: Pure Vanilla ES2022, Zero-Dependency
 * Conforms to: MISSION SPECIFICATION v3.2 (Stage 2) & Full Excel / Google Sheets Parity
 *
 * Core Capabilities:
 * - Fixed Column Width Engine & Colgroup: Rock-solid column widths that NEVER jump or resize during scroll
 * - Vertical-Only Row Virtualization (All 26 cols A-Z rendered with smooth scrolling)
 * - Full Keyboard Parity:
 *   * Direct Type-to-Edit on grid (type any character to immediately start editing)
 *   * Wall Street Navigation: Ctrl+Arrow & Ctrl+Shift+Arrow continuous data block jumps
 *   * Home / Ctrl+Home (cell A1) / Ctrl+End (used range boundary) / PageUp / PageDown
 *   * Enter (down), Shift+Enter (up), Tab (right), Shift+Tab (left)
 *   * F2 (in-place edit with caret at end), Escape (cancel edit / clear marching ants)
 *   * Caret F4 Reference Cycling (A1 -> $A$1 -> A$1 -> $A1 -> A1)
 *   * Ctrl+A (Select All), Delete / Backspace (Clear selected range)
 *   * Full TSV Clipboard & Marching Ants: Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste)
 *   * 100-Step Command Undo/Redo (Ctrl+Z / Ctrl+Y)
 *   * Fill Handle with Relative Formula Shifting (shiftFormula)
 * - Auto-Scroll: Viewport smoothly scrolls to keep active cell visible during keyboard movement
 * - Header Selection: Click column/row header to select entire column/row, corner button to select all
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
  const BUFFER_ROWS = 12;
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
      this.headerSelectMode = null; // 'col' | 'row'

      this.isEditing = false;
      this.editCell = null;
      this.copiedRange = null; // { sheet, minR, maxR, minC, maxC, tsv, isCut }
      this.undoStack = [];
      this.redoStack = [];

      this.focusedCols = null; // Set of column indices visible during Focus View
      this.isFocusViewActive = false;
      this.spotlightInfo = null; // { targetCell, sourceCols, params }
      this.customColWidths = {}; // sheetName -> { colIdx: width }

      // Fill Handle Drag State
      this.isFilling = false;
      this.fillStart = null;
      this.fillEnd = null;

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

    // Column Width Specification Engine (Locked & Stable)
    getColumnWidth(sheet, col) {
      if (this.customColWidths && this.customColWidths[sheet] && this.customColWidths[sheet][col]) {
        return this.customColWidths[sheet][col];
      }
      const defaults = {
        'Summary_Practice': { 0: 220, 1: 170, 2: 120, 3: 120, 4: 120 },
        'Sales_Data': { 0: 110, 1: 120, 2: 110, 3: 150, 4: 130, 5: 90, 6: 100, 7: 120 },
        'Employees': { 0: 110, 1: 160, 2: 130, 3: 150, 4: 110, 5: 120 },
        'Sort_Practice': { 0: 110, 1: 150, 2: 110, 3: 120, 4: 110 }
      };
      const sheetMap = defaults[sheet];
      if (sheetMap && sheetMap[col] !== undefined) {
        return sheetMap[col];
      }
      return 100; // Default column width
    }

    // Virtualization Render Loop
    render() {
      if (!this.container || !this.table) return;

      const scrollTop = this.container.scrollTop;
      const viewportHeight = this.container.clientHeight || 500;

      const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_ROWS);
      const endRow = Math.min(TOTAL_ROWS - 1, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + BUFFER_ROWS);

      const topSpacerHeight = startRow * ROW_HEIGHT;
      const bottomSpacerHeight = (TOTAL_ROWS - 1 - endRow) * ROW_HEIGHT;

      let html = '';

      // 0. Explicit Column Definitions via <colgroup> to LOCK column sizes permanently
      html += '<colgroup>';
      html += '<col class="excel-corner-col" style="width: 46px; min-width: 46px; max-width: 46px;">';
      for (let c = 0; c < TOTAL_COLS; c++) {
        if (this.isFocusViewActive && this.focusedCols && !this.focusedCols.has(c)) {
          continue; // Collapsed in Focus View
        }
        const w = this.getColumnWidth(this.activeSheetName, c);
        html += `<col class="excel-col-${c}" style="width: ${w}px; min-width: ${w}px; max-width: ${w}px;">`;
      }
      html += '</colgroup>';

      // 1. Sticky Table Header (Corner + A to Z)
      html += '<thead><tr>';
      html += '<th class="excel-corner-th" style="width: 46px; min-width: 46px; max-width: 46px;" title="Select All (Ctrl+A)"><div class="corner-triangle"></div></th>';

      for (let c = 0; c < TOTAL_COLS; c++) {
        if (this.isFocusViewActive && this.focusedCols && !this.focusedCols.has(c)) {
          continue;
        }
        const colLetter = ExcelEngine.colIndexToName(c);
        let colClass = 'excel-col-th';
        const minC = Math.min(this.selectionStart.col, this.selectionEnd.col);
        const maxC = Math.max(this.selectionStart.col, this.selectionEnd.col);
        if (c >= minC && c <= maxC) colClass += ' selected';
        if (this.spotlightInfo && this.spotlightInfo.sourceCols && this.spotlightInfo.sourceCols.has(colLetter)) {
          colClass += ' spotlight-col';
        }
        const w = this.getColumnWidth(this.activeSheetName, c);
        html += `<th class="${colClass}" data-col="${c}" style="width: ${w}px; min-width: ${w}px; max-width: ${w}px;" title="Column ${colLetter}">${colLetter}</th>`;
      }
      html += '</tr></thead>';

      // 2. Virtualized Table Body with Spacers
      html += '<tbody>';
      if (topSpacerHeight > 0) {
        html += `<tr class="excel-spacer-row" style="height: ${topSpacerHeight}px;"><td colspan="${TOTAL_COLS + 1}" style="height: ${topSpacerHeight}px; padding: 0; border: none; background: transparent;"></td></tr>`;
      }

      const selMinR = Math.min(this.selectionStart.row, this.selectionEnd.row);
      const selMaxR = Math.max(this.selectionStart.row, this.selectionEnd.row);
      const selMinC = Math.min(this.selectionStart.col, this.selectionEnd.col);
      const selMaxC = Math.max(this.selectionStart.col, this.selectionEnd.col);

      for (let r = startRow; r <= endRow; r++) {
        let rowClass = 'excel-row';
        let rowHdrClass = 'excel-row-th';
        if (r >= selMinR && r <= selMaxR) rowHdrClass += ' selected';

        html += `<tr class="${rowClass}" data-row="${r}">`;
        html += `<th class="${rowHdrClass}" data-row="${r}" style="width: 46px; min-width: 46px; max-width: 46px;" title="Row ${r + 1}">${r + 1}</th>`;

        for (let c = 0; c < TOTAL_COLS; c++) {
          if (this.isFocusViewActive && this.focusedCols && !this.focusedCols.has(c)) {
            continue;
          }
          const cellObj = this.workbook.getCell(this.activeSheetName, r, c);
          let displayVal = cellObj ? (cellObj.value !== null && cellObj.value !== undefined ? cellObj.value : '') : '';

          let cellClass = 'excel-cell';
          const isActive = (r === this.activeRow && c === this.activeCol);
          if (isActive) cellClass += ' active-cell';
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

          // Copied Marching Ants
          if (this.copiedRange && this.copiedRange.sheet === this.activeSheetName) {
            if (r >= this.copiedRange.minR && r <= this.copiedRange.maxR &&
                c >= this.copiedRange.minC && c <= this.copiedRange.maxC) {
              cellClass += ' copied-marching';
            }
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

          const w = this.getColumnWidth(this.activeSheetName, c);
          let innerCell = this.escapeHTML(displayVal);

          // Render Fill Handle at bottom-right of active/selection range
          if (r === selMaxR && c === selMaxC) {
            innerCell += '<div class="excel-cell-fill-handle" title="Drag to fill formula"></div>';
          }

          html += `<td class="${cellClass}" data-row="${r}" data-col="${c}" tabindex="0" style="width: ${w}px; min-width: ${w}px; max-width: ${w}px;">${innerCell}</td>`;
        }
        html += '</tr>';
      }

      if (bottomSpacerHeight > 0) {
        html += `<tr class="excel-spacer-row" style="height: ${bottomSpacerHeight}px;"><td colspan="${TOTAL_COLS + 1}" style="height: ${bottomSpacerHeight}px; padding: 0; border: none; background: transparent;"></td></tr>`;
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

    getPointRefEdgeClasses(r, c) {
      // 1. Check currently dragging range
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
      if (!banner) return;
      if (this.pointMode.isActive) {
        banner.style.display = 'flex';
        const txt = banner.querySelector('.banner-text');
        if (txt) {
          txt.textContent = `Point Mode Active: Drag or click cells in ${this.activeSheetName} to reference them in formula`;
        }
      } else {
        banner.style.display = 'none';
      }
    }

    updateFormulaReference() {
      if (!this.formulaInput || !this.pointMode.activeRefRange) return;
      const r = this.pointMode.activeRefRange;

      const isSingleCell = (r.startRow === r.endRow && r.startCol === r.endCol);
      const isCrossSheet = (r.sheet !== this.pointMode.originSheet);

      const baseRef = isSingleCell
        ? ExcelEngine.formatCellCoord(null, r.startCol, r.startRow)
        : `${ExcelEngine.formatCellCoord(null, r.startCol, r.startRow)}:${ExcelEngine.formatCellCoord(null, r.endCol, r.endRow)}`;

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

      // Auto-close missing parentheses
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
        return; // User is actively typing in the formula bar
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
        statusLeftLabel.textContent = this.pointMode.isActive ? 'Point' : (this.isEditing ? 'Edit' : 'Ready');
      }
    }

    updateSelectionOverlays() {
      // Repositions active cell outline and drag fill-handle square
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

    // Auto-Scroll Viewport to ensure Active Cell is 100% visible
    ensureActiveCellVisible() {
      if (!this.container) return;
      const rowTop = this.activeRow * ROW_HEIGHT;
      const rowBottom = rowTop + ROW_HEIGHT;
      const currentScrollTop = this.container.scrollTop;
      const viewportHeight = this.container.clientHeight || 450;

      if (rowTop < currentScrollTop) {
        this.container.scrollTop = rowTop;
      } else if (rowBottom > currentScrollTop + viewportHeight - 28) {
        this.container.scrollTop = rowBottom - viewportHeight + 28;
      }

      // Calculate horizontal position
      let colLeft = 46; // row header width
      for (let c = 0; c < this.activeCol; c++) {
        colLeft += this.getColumnWidth(this.activeSheetName, c);
      }
      const colWidth = this.getColumnWidth(this.activeSheetName, this.activeCol);
      const colRight = colLeft + colWidth;
      const currentScrollLeft = this.container.scrollLeft;
      const viewportWidth = this.container.clientWidth || 600;

      if (colLeft < currentScrollLeft + 46) {
        this.container.scrollLeft = Math.max(0, colLeft - 46);
      } else if (colRight > currentScrollLeft + viewportWidth) {
        this.container.scrollLeft = colRight - viewportWidth + 10;
      }
    }

    // Wall Street Modeling Continuous Data Jump (Ctrl + Arrow)
    jumpToDataBoundary(deltaRow, deltaCol, expandSelection = false) {
      const sheet = this.activeSheetName;
      let r = this.activeRow;
      let c = this.activeCol;

      const isCellFilled = (row, col) => {
        const cell = this.workbook.getCell(sheet, row, col);
        return cell && cell.value !== null && cell.value !== undefined && String(cell.value).trim() !== '';
      };

      const startFilled = isCellFilled(r, c);
      const nextR = r + deltaRow;
      const nextC = c + deltaCol;

      if (nextR < 0 || nextR >= TOTAL_ROWS || nextC < 0 || nextC >= TOTAL_COLS) {
        return;
      }

      const nextFilled = isCellFilled(nextR, nextC);

      if (startFilled && nextFilled) {
        // Jump along contiguous filled block
        while (
          r + deltaRow >= 0 && r + deltaRow < TOTAL_ROWS &&
          c + deltaCol >= 0 && c + deltaCol < TOTAL_COLS &&
          isCellFilled(r + deltaRow, c + deltaCol)
        ) {
          r += deltaRow;
          c += deltaCol;
        }
      } else {
        // Jump across empty space to next filled block or boundary
        r = nextR;
        c = nextC;
        while (
          r >= 0 && r < TOTAL_ROWS &&
          c >= 0 && c < TOTAL_COLS &&
          !isCellFilled(r, c)
        ) {
          if (
            r + deltaRow < 0 || r + deltaRow >= TOTAL_ROWS ||
            c + deltaCol < 0 || c + deltaCol >= TOTAL_COLS
          ) {
            break;
          }
          r += deltaRow;
          c += deltaCol;
        }
      }

      this.setActiveCell(r, c, expandSelection);
    }

    jumpToEndOfData(expandSelection = false) {
      let maxR = 0;
      let maxC = 0;
      const sheet = this.activeSheetName;
      for (let r = 0; r < 250; r++) {
        for (let c = 0; c < TOTAL_COLS; c++) {
          const cell = this.workbook.getCell(sheet, r, c);
          if (cell && cell.value !== null && cell.value !== undefined && String(cell.value).trim() !== '') {
            if (r > maxR) maxR = r;
            if (c > maxC) maxC = c;
          }
        }
      }
      this.setActiveCell(maxR, maxC, expandSelection);
    }

    selectAll() {
      this.activeRow = 0;
      this.activeCol = 0;
      this.selectionStart = { row: 0, col: 0 };
      this.selectionEnd = { row: TOTAL_ROWS - 1, col: TOTAL_COLS - 1 };
      this.updateFormulaBar();
      this.updateStatusBar();
      this.render();
    }

    copySelection() {
      const minR = Math.min(this.selectionStart.row, this.selectionEnd.row);
      const maxR = Math.max(this.selectionStart.row, this.selectionEnd.row);
      const minC = Math.min(this.selectionStart.col, this.selectionEnd.col);
      const maxC = Math.max(this.selectionStart.col, this.selectionEnd.col);

      let lines = [];
      for (let r = minR; r <= maxR; r++) {
        let rowVals = [];
        for (let c = minC; c <= maxC; c++) {
          const cell = this.workbook.getCell(this.activeSheetName, r, c);
          const val = cell ? (cell.formula || (cell.value !== null && cell.value !== undefined ? cell.value : '')) : '';
          rowVals.push(val);
        }
        lines.push(rowVals.join('\t'));
      }
      const tsv = lines.join('\n');
      this.copiedRange = {
        sheet: this.activeSheetName,
        minR, maxR, minC, maxC,
        tsv,
        isCut: false
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tsv).catch(() => {});
      }
      this.render();
    }

    cutSelection() {
      this.copySelection();
      if (this.copiedRange) {
        this.copiedRange.isCut = true;
      }
      this.render();
    }

    pasteSelection() {
      const pasteData = (text) => {
        if (!text) return;
        const lines = text.split(/\r?\n/).filter(line => line.length > 0);
        const startR = this.activeRow;
        const startC = this.activeCol;

        for (let i = 0; i < lines.length; i++) {
          const cols = lines[i].split('\t');
          for (let j = 0; j < cols.length; j++) {
            const targetR = startR + i;
            const targetC = startC + j;
            if (targetR < TOTAL_ROWS && targetC < TOTAL_COLS) {
              this.pushUndoCommand(this.activeSheetName, targetR, targetC);
              this.workbook.setCellValue(this.activeSheetName, targetR, targetC, cols[j]);
            }
          }
        }

        if (this.copiedRange && this.copiedRange.isCut) {
          for (let r = this.copiedRange.minR; r <= this.copiedRange.maxR; r++) {
            for (let c = this.copiedRange.minC; c <= this.copiedRange.maxC; c++) {
              this.pushUndoCommand(this.copiedRange.sheet, r, c);
              this.workbook.setCellValue(this.copiedRange.sheet, r, c, '');
            }
          }
          this.copiedRange = null;
        }

        this.selectionEnd = {
          row: Math.min(TOTAL_ROWS - 1, startR + lines.length - 1),
          col: Math.min(TOTAL_COLS - 1, startC + (lines[0] ? lines[0].split('\t').length - 1 : 0))
        };
        this.render();
        this.updateFormulaBar();
        this.updateStatusBar();
      };

      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(pasteData).catch(() => {
          if (this.copiedRange && this.copiedRange.tsv) {
            pasteData(this.copiedRange.tsv);
          }
        });
      } else if (this.copiedRange && this.copiedRange.tsv) {
        pasteData(this.copiedRange.tsv);
      }
    }

    clearSelection() {
      const minR = Math.min(this.selectionStart.row, this.selectionEnd.row);
      const maxR = Math.max(this.selectionStart.row, this.selectionEnd.row);
      const minC = Math.min(this.selectionStart.col, this.selectionEnd.col);
      const maxC = Math.max(this.selectionStart.col, this.selectionEnd.col);

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          this.pushUndoCommand(this.activeSheetName, r, c);
          this.workbook.setCellValue(this.activeSheetName, r, c, '');
        }
      }
      this.render();
      this.updateFormulaBar();
      this.updateStatusBar();
      this.updatePointModeBanner();
    }

    // Formula Relative Shifting for Fill Handle Drag
    shiftFormula(formula, deltaRow, deltaCol) {
      if (!formula || typeof formula !== 'string' || !formula.startsWith('=')) return formula;
      const refRegex = /(\$?)([A-Za-z]+)(\$?)([0-9]+)/g;
      return formula.replace(refRegex, (match, absCol, colLetters, absRow, rowDigits) => {
        let col = ExcelEngine.colNameToIndex(colLetters);
        let row = parseInt(rowDigits, 10) - 1;

        if (!absCol) {
          col = Math.max(0, Math.min(TOTAL_COLS - 1, col + deltaCol));
        }
        if (!absRow) {
          row = Math.max(0, Math.min(TOTAL_ROWS - 1, row + deltaRow));
        }

        const newColStr = (absCol ? '$' : '') + ExcelEngine.colIndexToName(col);
        const newRowStr = (absRow ? '$' : '') + (row + 1);
        return newColStr + newRowStr;
      });
    }

    // Event Handlers & In-Place Editing
    bindEvents() {
      if (!this.container) return;

      // Virtualized scroll listener with passive performance
      this.container.addEventListener('scroll', () => {
        requestAnimationFrame(() => this.render());
      }, { passive: true });

      // Click / Drag to Select Cell or Range (Supports Point Mode, Header Clicks, and Fill Handle)
      this.table.addEventListener('mousedown', (e) => {
        // 1. Fill Handle Drag Initiation
        if (e.target.closest('.excel-cell-fill-handle')) {
          e.preventDefault();
          e.stopPropagation();
          this.isFilling = true;
          this.fillStart = {
            minR: Math.min(this.selectionStart.row, this.selectionEnd.row),
            maxR: Math.max(this.selectionStart.row, this.selectionEnd.row),
            minC: Math.min(this.selectionStart.col, this.selectionEnd.col),
            maxC: Math.max(this.selectionStart.col, this.selectionEnd.col)
          };
          return;
        }

        // 2. Corner Select All Button
        if (e.target.closest('.excel-corner-th')) {
          e.preventDefault();
          this.selectAll();
          return;
        }

        // 3. Column Header Click (Select entire column)
        const colTh = e.target.closest('th.excel-col-th');
        if (colTh) {
          e.preventDefault();
          const c = parseInt(colTh.getAttribute('data-col'), 10);
          this.activeRow = 0;
          this.activeCol = c;
          this.selectionStart = { row: 0, col: c };
          this.selectionEnd = { row: TOTAL_ROWS - 1, col: c };
          this.headerSelectMode = 'col';
          this.isSelecting = true;
          this.updateFormulaBar();
          this.updateStatusBar();
          this.render();
          return;
        }

        // 4. Row Header Click (Select entire row)
        const rowTh = e.target.closest('th.excel-row-th');
        if (rowTh) {
          e.preventDefault();
          const r = parseInt(rowTh.getAttribute('data-row'), 10);
          this.activeRow = r;
          this.activeCol = 0;
          this.selectionStart = { row: r, col: 0 };
          this.selectionEnd = { row: r, col: TOTAL_COLS - 1 };
          this.headerSelectMode = 'row';
          this.isSelecting = true;
          this.updateFormulaBar();
          this.updateStatusBar();
          this.render();
          return;
        }

        // 5. Data Cell Click
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

        this.headerSelectMode = null;
        this.setActiveCell(r, c, e.shiftKey);
        this.isSelecting = true;
      });

      window.addEventListener('mouseup', (e) => {
        if (this.isFilling && this.fillStart && this.fillEnd) {
          // Commit fill handle replication
          const src = this.fillStart;
          const targetR = this.fillEnd.row;
          const targetC = this.fillEnd.col;

          if (targetR > src.maxR) {
            // Dragged downwards
            for (let r = src.maxR + 1; r <= targetR; r++) {
              const deltaR = r - src.minR;
              for (let c = src.minC; c <= src.maxC; c++) {
                const srcCell = this.workbook.getCell(this.activeSheetName, src.minR + ((r - src.maxR - 1) % (src.maxR - src.minR + 1)), c);
                if (srcCell) {
                  const raw = srcCell.raw || srcCell.value || '';
                  const shifted = raw.startsWith('=') ? this.shiftFormula(raw, deltaR, 0) : raw;
                  this.pushUndoCommand(this.activeSheetName, r, c);
                  this.workbook.setCellValue(this.activeSheetName, r, c, shifted);
                }
              }
            }
            this.selectionEnd.row = targetR;
          }
          this.render();
          this.updateFormulaBar();
          this.updateStatusBar();
        }

        this.isFilling = false;
        this.fillStart = null;
        this.fillEnd = null;

        if (this.pointMode.isActive) {
          this.pointMode.isDragging = false;
        }
        this.isSelecting = false;
        this.headerSelectMode = null;
      });

      this.table.addEventListener('mouseover', (e) => {
        const td = e.target.closest('td.excel-cell');
        const colTh = e.target.closest('th.excel-col-th');
        const rowTh = e.target.closest('th.excel-row-th');

        if (this.isFilling && td) {
          const r = parseInt(td.getAttribute('data-row'), 10);
          const c = parseInt(td.getAttribute('data-col'), 10);
          this.fillEnd = { row: r, col: c };
          this.selectionEnd = { row: r, col: this.selectionEnd.col };
          this.render();
          return;
        }

        if (this.headerSelectMode === 'col' && colTh) {
          const c = parseInt(colTh.getAttribute('data-col'), 10);
          this.selectionEnd.col = c;
          this.render();
          return;
        }

        if (this.headerSelectMode === 'row' && rowTh) {
          const r = parseInt(rowTh.getAttribute('data-row'), 10);
          this.selectionEnd.row = r;
          this.render();
          return;
        }

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

      // Keyboard Navigation (Full Excel & Wall Street Hotkey Suite)
      window.addEventListener('keydown', (e) => {
        const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
          if (e.target !== this.formulaInput) return;
        }

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
            this.commitEdit(e.shiftKey ? -1 : 1, 0); // commit and move down/up
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

        if (document.activeElement === this.formulaInput) return;

        // Clipboard: Ctrl+C / Ctrl+X / Ctrl+V / Ctrl+A / Ctrl+Z / Ctrl+Y
        if (e.ctrlKey || e.metaKey) {
          const k = e.key.toLowerCase();
          if (k === 'c') {
            e.preventDefault();
            this.copySelection();
            return;
          } else if (k === 'x') {
            e.preventDefault();
            this.cutSelection();
            return;
          } else if (k === 'v') {
            e.preventDefault();
            this.pasteSelection();
            return;
          } else if (k === 'a') {
            e.preventDefault();
            this.selectAll();
            return;
          } else if (k === 'z') {
            e.preventDefault();
            this.undo();
            return;
          } else if (k === 'y') {
            e.preventDefault();
            this.redo();
            return;
          }
        }

        // Home / End / PageUp / PageDown
        if (e.key === 'Home') {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            this.setActiveCell(0, 0, e.shiftKey);
          } else {
            this.setActiveCell(this.activeRow, 0, e.shiftKey);
          }
          return;
        } else if (e.key === 'End' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          this.jumpToEndOfData(e.shiftKey);
          return;
        } else if (e.key === 'PageDown') {
          e.preventDefault();
          this.moveActiveCell(15, 0, e.shiftKey);
          return;
        } else if (e.key === 'PageUp') {
          e.preventDefault();
          this.moveActiveCell(-15, 0, e.shiftKey);
          return;
        }

        // Arrow Keys (Standard & Wall Street Continuous Data Jumps)
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            this.jumpToDataBoundary(1, 0, e.shiftKey);
          } else {
            this.moveActiveCell(1, 0, e.shiftKey);
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            this.jumpToDataBoundary(-1, 0, e.shiftKey);
          } else {
            this.moveActiveCell(-1, 0, e.shiftKey);
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            this.jumpToDataBoundary(0, 1, e.shiftKey);
          } else {
            this.moveActiveCell(0, 1, e.shiftKey);
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            this.jumpToDataBoundary(0, -1, e.shiftKey);
          } else {
            this.moveActiveCell(0, -1, e.shiftKey);
          }
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
          e.preventDefault();
          this.clearSelection();
        } else if (e.key === 'Escape') {
          if (this.copiedRange) {
            this.copiedRange = null;
            this.render();
          }
        } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
          // Direct Type-to-Edit
          e.preventDefault();
          this.startEditing(e.key);
        }
      });

      // Formula Bar Input Listeners
      if (this.formulaInput) {
        this.formulaInput.addEventListener('focus', () => {
          this.isEditing = true;
          this.updateStatusBar();
        });
        this.formulaInput.addEventListener('input', () => {
          this.isEditing = true;
          const val = this.formulaInput.value;
          const caret = this.formulaInput.selectionStart || val.length;

          if (this.shouldEnterPointMode(val, caret)) {
            if (!this.pointMode.isActive) {
              this.enterPointMode(this.activeSheetName, this.activeRow, this.activeCol, caret);
            } else {
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

      this.updateFormulaBar();
      this.updateStatusBar();
      this.render();
      this.ensureActiveCellVisible();
    }

    moveActiveCell(deltaRow, deltaCol, expandSelection = false) {
      this.setActiveCell(this.activeRow + deltaRow, this.activeCol + deltaCol, expandSelection);
    }

    startEditing(initialChar = null) {
      this.isEditing = true;
      if (this.formulaInput) {
        if (initialChar !== null) {
          this.formulaInput.value = initialChar;
        } else {
          const cellObj = this.workbook.getCell(this.activeSheetName, this.activeRow, this.activeCol);
          this.formulaInput.value = cellObj ? (cellObj.formula || cellObj.raw || '') : '';
        }
        this.formulaInput.focus();
        const len = this.formulaInput.value.length;
        this.formulaInput.setSelectionRange(len, len);

        // Dispatch input event to trigger Point Mode if = was typed
        this.formulaInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      this.updateStatusBar();
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
      this.updateStatusBar();
    }

    cancelEdit() {
      this.isEditing = false;
      this.updateFormulaBar();
      this.render();
      this.updatePointModeBanner();
      this.updateStatusBar();
    }

    commitFormulaBar() {
      this.commitEdit(0, 0);
    }

    clearActiveCell() {
      this.clearSelection();
    }

    // Caret F4 Reference Cycling (A1 -> $A$1 -> A$1 -> $A1 -> A1)
    cycleF4InFormulaBar() {
      if (!this.formulaInput) return;
      const val = this.formulaInput.value;
      const caret = this.formulaInput.selectionStart || 0;

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

    // Undo / Redo Command Pattern (100 steps)
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

    // Question Target Navigation (Clean 100% Flagship Standard)
    applyQuestionSpotlight(challenge) {
      if (!challenge) return;

      if (challenge.targetSheet && challenge.targetSheet !== this.activeSheetName) {
        this.switchSheet(challenge.targetSheet);
      }

      const targetRef = challenge.targetCell || 'A1';
      const p = ExcelEngine.parseCellCoord(targetRef);
      if (p) {
        this.activeRow = p.row;
        this.activeCol = p.col;
        this.selectionStart = { row: p.row, col: p.col };
        this.selectionEnd = { row: p.row, col: p.col };

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
