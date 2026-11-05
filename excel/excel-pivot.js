// public/excel/excel-pivot.js
// Manodemy Excel Studio — Interactive PivotTable Engine (Zero-Dependency)
// Cross-tabulates multi-dimensional tabular data with dynamic sum/count aggregations.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExcelPivot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function buildPivotTable(records, config = {}) {
    const rowField = config.rowField || 'region';
    const colField = config.colField || 'cat';
    const valField = config.valField || 'revenue';
    const agg = config.agg || 'sum';

    const rowKeys = Array.from(new Set(records.map(r => r[rowField]))).sort();
    const colKeys = Array.from(new Set(records.map(r => r[colField]))).sort();

    const matrix = {};
    rowKeys.forEach(rk => {
      matrix[rk] = {};
      colKeys.forEach(ck => { matrix[rk][ck] = 0; });
    });

    const colTotals = {};
    colKeys.forEach(ck => { colTotals[ck] = 0; });
    let grandTotal = 0;

    records.forEach(r => {
      const rk = r[rowField];
      const ck = r[colField];
      const v = Number(r[valField]) || 0;
      if (matrix[rk] && matrix[rk][ck] !== undefined) {
        matrix[rk][ck] += v;
        colTotals[ck] += v;
        grandTotal += v;
      }
    });

    return {
      rowKeys,
      colKeys,
      matrix,
      colTotals,
      grandTotal
    };
  }

  function renderPivotHTML(pivotResult, rowLabel = "Region", colLabel = "Category") {
    let html = `<thead><tr>`;
    html += `<th>${rowLabel} \\ ${colLabel}</th>`;
    pivotResult.colKeys.forEach(ck => {
      html += `<th>${ck}</th>`;
    });
    html += `<th>Grand Total</th></tr></thead><tbody>`;

    pivotResult.rowKeys.forEach(rk => {
      html += `<tr><td><strong>${rk}</strong></td>`;
      let rowTotal = 0;
      pivotResult.colKeys.forEach(ck => {
        const val = pivotResult.matrix[rk][ck];
        rowTotal += val;
        html += `<td>${val > 0 ? val.toLocaleString() : '-'}</td>`;
      });
      html += `<td><strong>${rowTotal.toLocaleString()}</strong></td></tr>`;
    });

    // Grand Total Row
    html += `<tr style="background: rgba(16, 124, 65, 0.12); font-weight: 700;">`;
    html += `<td>Grand Total</td>`;
    pivotResult.colKeys.forEach(ck => {
      html += `<td>${pivotResult.colTotals[ck].toLocaleString()}</td>`;
    });
    html += `<td>${pivotResult.grandTotal.toLocaleString()}</td></tr></tbody>`;

    return html;
  }

  return {
    buildPivotTable,
    renderPivotHTML
  };
}));

