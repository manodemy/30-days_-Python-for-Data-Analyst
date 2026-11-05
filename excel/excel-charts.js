// public/excel/excel-charts.js
// Manodemy Excel Studio — Zero-Dependency SVG Chart Engine (Stage 4)
// Renders dynamic, responsive Column, Line, and Pie charts directly from spreadsheet ranges.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExcelCharts = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function renderColumnChart(data, options = {}) {
    const width = options.width || 460;
    const height = options.height || 260;
    const padding = 40;
    const title = options.title || "Sales Performance by Category";

    const labels = data.map(d => d.label);
    const values = data.map(d => Number(d.value) || 0);
    const maxVal = Math.max(...values, 1);

    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const barWidth = Math.max(16, (chartW / values.length) * 0.6);
    const step = chartW / values.length;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="excel-svg-chart">`;
    svg += `<style>
      .chart-title { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; fill: currentColor; }
      .chart-axis { stroke: rgba(120, 140, 160, 0.4); stroke-width: 1; }
      .chart-grid { stroke: rgba(120, 140, 160, 0.15); stroke-dasharray: 3,3; }
      .chart-label { font-family: 'Inter', sans-serif; font-size: 10.5px; fill: currentColor; opacity: 0.75; text-anchor: middle; }
      .chart-val { font-family: 'JetBrains Mono', monospace; font-size: 10px; fill: #107C41; font-weight: 600; text-anchor: middle; }
      .chart-bar { fill: url(#colGrad); rx: 3; transition: transform 0.2s; }
      .chart-bar:hover { fill: #21A366; }
    </style>`;

    svg += `<defs>
      <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#107C41"/>
        <stop offset="100%" stop-color="#0b5c30"/>
      </linearGradient>
    </defs>`;

    svg += `<text x="${width / 2}" y="24" text-anchor="middle" class="chart-title">${title}</text>`;

    // Gridlines (4 levels)
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="chart-grid"/>`;
    }

    // Bars
    values.forEach((v, i) => {
      const h = (v / maxVal) * chartH;
      const x = padding + i * step + (step - barWidth) / 2;
      const y = padding + chartH - h;

      svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" class="chart-bar"><title>${labels[i]}: ${v.toLocaleString()}</title></rect>`;
      svg += `<text x="${x + barWidth / 2}" y="${y - 6}" class="chart-val">${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}</text>`;
      svg += `<text x="${x + barWidth / 2}" y="${padding + chartH + 18}" class="chart-label">${labels[i]}</text>`;
    });

    // Axis line
    svg += `<line x1="${padding}" y1="${padding + chartH}" x2="${width - padding}" y2="${padding + chartH}" class="chart-axis"/>`;
    svg += `</svg>`;

    return svg;
  }

  function renderPieChart(data, options = {}) {
    const width = options.width || 460;
    const height = options.height || 260;
    const radius = Math.min(width, height) / 2 - 40;
    const cx = width / 2;
    const cy = height / 2 + 10;
    const title = options.title || "Regional Sales Distribution";

    const total = data.reduce((s, d) => s + (Number(d.value) || 0), 0) || 1;
    const colors = ['#107C41', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="excel-svg-chart">`;
    svg += `<text x="${width / 2}" y="24" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" fill="currentColor">${title}</text>`;

    let currentAngle = 0;
    data.forEach((d, i) => {
      const sliceAngle = (d.value / total) * 2 * Math.PI;
      const x1 = cx + radius * Math.cos(currentAngle);
      const y1 = cy + radius * Math.sin(currentAngle);
      const x2 = cx + radius * Math.cos(currentAngle + sliceAngle);
      const y2 = cy + radius * Math.sin(currentAngle + sliceAngle);

      const largeArc = sliceAngle > Math.PI ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      svg += `<path d="${pathData}" fill="${colors[i % colors.length]}" opacity="0.9" stroke="var(--bg-main, #ffffff)" stroke-width="2"><title>${d.label}: ${d.value} (${Math.round((d.value/total)*100)}%)</title></path>`;
      currentAngle += sliceAngle;
    });

    svg += `</svg>`;
    return svg;
  }

  return {
    renderColumnChart,
    renderPieChart
  };
}));

