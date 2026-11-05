// public/excel/excel-ribbon.js
// Manodemy Excel Studio — Microsoft 365 Ribbon Toolbar & Format Controller
// Conforms to: MISSION SPECIFICATION v3.2 (Stage 4)

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./excel-engine', './excel-grid'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./excel-engine'), require('./excel-grid'));
  } else {
    root.ExcelRibbon = factory(root.ExcelEngine, root.ExcelGrid);
  }
}(typeof self !== 'undefined' ? self : this, function (ExcelEngine, ExcelGrid) {
  'use strict';

  class RibbonController {
    constructor(gridController) {
      this.grid = gridController;
      this.activeTab = 'home';
      this.bindTabButtons();
    }

    bindTabButtons() {
      const tabBtns = document.querySelectorAll('.ribbon-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tabName = btn.id.replace('tab', '').toLowerCase();
          this.switchTab(tabName);
        });
      });
    }

    switchTab(tabName) {
      this.activeTab = tabName;
      document.querySelectorAll('.ribbon-tab-btn').forEach(b => {
        b.classList.toggle('active', b.id.toLowerCase() === `tab${tabName}`);
      });
      document.querySelectorAll('.ribbon-panel').forEach(p => {
        p.classList.toggle('active', p.id.toLowerCase() === `panelribbon${tabName}`);
      });
    }

    // ── Font & Formatting Tools ──────────────────────────────────────────────
    toggleFormat(formatType) {
      if (!this.grid) return;
      const sheet = this.grid.activeSheetName;
      const r = this.grid.activeRow;
      const c = this.grid.activeCol;
      const cellObj = this.grid.workbook.getCell(sheet, r, c);
      if (!cellObj) return;

      if (!cellObj.format) cellObj.format = {};
      cellObj.format[formatType] = !cellObj.format[formatType];
      this.grid.render();
    }

    setAlignment(align) {
      if (!this.grid) return;
      const sheet = this.grid.activeSheetName;
      const r = this.grid.activeRow;
      const c = this.grid.activeCol;
      const cellObj = this.grid.workbook.getCell(sheet, r, c);
      if (!cellObj) return;

      if (!cellObj.format) cellObj.format = {};
      cellObj.format.align = align;
      this.grid.render();
    }

    applyNumberFormat(fmt) {
      if (!this.grid) return;
      const sheet = this.grid.activeSheetName;
      const r = this.grid.activeRow;
      const c = this.grid.activeCol;
      const cellObj = this.grid.workbook.getCell(sheet, r, c);
      if (!cellObj) return;

      if (!cellObj.format) cellObj.format = {};
      cellObj.format.numFmt = fmt;
      this.grid.render();
    }

    // ── Data Sorting Engine (Activates C19) ──────────────────────────────────
    sortActiveColumn(direction = 'asc') {
      if (!this.grid) return;
      const sheet = this.grid.activeSheetName;
      const colIdx = this.grid.activeCol;
      const wb = this.grid.workbook;
      const sheetData = wb.sheets.get(sheet);
      if (!sheetData) return;

      // Extract rows 1 to 15 (skip header row 0)
      const dataRows = [];
      let maxRow = 0;

      sheetData.cells.forEach((val, key) => {
        const [rStr] = key.split(':');
        const r = parseInt(rStr, 10);
        if (r > maxRow) maxRow = r;
      });

      if (maxRow < 1) return;

      for (let r = 1; r <= maxRow; r++) {
        const rowCells = [];
        for (let c = 0; c < ExcelGrid.TOTAL_COLS; c++) {
          const cell = wb.getCell(sheet, r, c);
          rowCells.push(cell ? { raw: cell.raw, value: cell.value, formula: cell.formula } : null);
        }
        dataRows.push({ rowIdx: r, cells: rowCells });
      }

      // Sort rows based on active column value
      dataRows.sort((a, b) => {
        const valA = a.cells[colIdx] ? a.cells[colIdx].value : null;
        const valB = b.cells[colIdx] ? b.cells[colIdx].value : null;

        const numA = typeof valA === 'number' ? valA : parseFloat(valA);
        const numB = typeof valB === 'number' ? valB : parseFloat(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
          return direction === 'asc' ? numA - numB : numB - numA;
        }

        const strA = String(valA || '').toLowerCase();
        const strB = String(valB || '').toLowerCase();
        if (direction === 'asc') {
          return strA.localeCompare(strB);
        } else {
          return strB.localeCompare(strA);
        }
      });

      // Write back sorted rows into workbook
      dataRows.forEach((item, i) => {
        const targetRow = i + 1;
        for (let c = 0; c < ExcelGrid.TOTAL_COLS; c++) {
          const cellData = item.cells[c];
          if (cellData) {
            wb.setCellValue(sheet, targetRow, c, cellData.formula || cellData.raw, false);
          } else {
            wb.setCellValue(sheet, targetRow, c, '', false);
          }
        }
      });

      wb.recalculateDirty();
      this.grid.render();
      
      const outMsg = document.getElementById('outputInitMsg');
      if (outMsg) {
        outMsg.className = 'output-success';
        outMsg.textContent = `⚡ Sorted ${sheet} by Column ${ExcelEngine.colIndexToName(colIdx)} (${direction.toUpperCase()}).`;
      }
    }

    // ── Conditional Formatting Engine (Activates C20) ────────────────────────
    applyConditionalFormatting(ruleType, value, style) {
      if (!this.grid) return;
      const sheet = this.grid.activeSheetName;
      const wb = this.grid.workbook;
      if (!wb.conditionalFormattingRules) {
        wb.conditionalFormattingRules = {};
      }
      if (!wb.conditionalFormattingRules[sheet]) {
        wb.conditionalFormattingRules[sheet] = [];
      }

      wb.conditionalFormattingRules[sheet].push({
        type: ruleType,
        value,
        style: style || { background: '#107C41', color: '#ffffff' }
      });

      this.grid.render();

      const outMsg = document.getElementById('outputInitMsg');
      if (outMsg) {
        outMsg.className = 'output-success';
        outMsg.textContent = `⚡ Applied Conditional Formatting: Cells equal to '${value}' styled in Emerald Green.`;
      }
    }

    // ── Quick Formula Snippet Inserter ───────────────────────────────────────
    insertSnippet(snippet) {
      if (!this.grid || !this.grid.formulaInput) return;
      const input = this.grid.formulaInput;
      input.value = snippet;
      input.focus();
      input.setSelectionRange(snippet.length, snippet.length);
    }
  }

  return {
    RibbonController
  };
}));

