/**
 * Builder script to generate Day 02 with full visual parity to Day 01 & SQL Day 02.
 * 100% class-driven CSS (0 inline styles), full dual-box headings, superpower showcase,
 * dual-panel mutability comparison, 5 production trap cards, precedence pyramid,
 * RBAC bitmask grid, master tables, and top 25 interview questions.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'public', 'python', 'content', 'py-day-02.js'));
const day02 = global.window.COURSE_CONTENT.pyDay02;

// Load Day 01 CSS to use the exact same classes and tokens
require(path.join(ROOT, 'public', 'python', 'content', 'py-day-01.js'));
const day01Html = global.window.COURSE_CONTENT.pyDay01.slides[0].html;
const day01CssMatch = day01Html.match(/<style>([\s\S]*?)<\/style>/);
const baseCss = day01CssMatch ? day01CssMatch[1] : '';

// Extra Day 02 specific styles: Precedence Pyramid, Bitmask Grid, Arity Grid, Table Headers
const extraCss = `
  /* ═════════════════════════════════════════════════════════════════════
     UNIFORM VERTICAL RHYTHM & SPACING SYSTEM (100% Consistent Across Day 02)
     ═════════════════════════════════════════════════════════════════════ */
  .slide-section {
    margin-top: 36px !important;
    margin-bottom: 0 !important;
  }
  .slide-section:first-child {
    margin-top: 8px !important;
  }
  .slide-section-title.heading-box-wrap {
    margin: 0 0 14px 0 !important;
  }
  .section-intro-text {
    margin: 0 0 14px 0 !important;
    font-size: 0.92rem !important;
    line-height: 1.6 !important;
  }
  .topic-subcard {
    margin: 14px 0 0 0 !important;
    position: relative !important;
  }
  .topic-subcard + .topic-subcard {
    margin-top: 16px !important;
  }
  .subcard-header-with-audio {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin: 0 0 10px 0 !important;
    padding: 0 !important;
  }
  .subcard-header-title {
    margin: 0 !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    color: #38bdf8 !important;
    letter-spacing: -0.01em !important;
  }
  [data-theme="light"] .subcard-header-title {
    color: #0284c7 !important;
  }
  .code-block-container {
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }
  .code-subblock {
    margin: 0 !important;
  }
  .interview-box {
    margin-top: 14px !important;
    margin-bottom: 0 !important;
  }

  /* Table Card Header: Clean non-floating header that stays attached to its card */
  .table-header-wrap {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    z-index: 1 !important;
    background-color: #0d1527 !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 10px 14px !important;
    margin: 0 !important;
    border-radius: 8px 8px 0 0 !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  }
  /* Explicitly prevent any vertical floating or sticking for headers during scroll */
  .table-header-wrap,
  .arith-sticky-table thead,
  .arith-sticky-table th,
  .precedence-table thead,
  .precedence-table th,
  .anti-pattern-table thead,
  .anti-pattern-table th {
    top: auto !important;
  }
  .table-header-title {
    margin: 0 !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    color: #f8fafc !important;
    letter-spacing: -0.01em !important;
  }
  [data-theme="light"] .table-header-wrap {
    background-color: #ffffff !important;
    border-color: #e2e8f0 !important;
  }
  [data-theme="light"] .table-header-title {
    color: #0f172a !important;
  }
  .db-mock-table-wrap {
    margin-top: 0 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    position: relative !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .db-table-mock.arith-sticky-table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    min-width: 680px !important;
    width: 100% !important;
    overflow: visible !important;
    margin: 0 !important;
  }
  .arith-sticky-table,
  .arith-sticky-table th,
  .arith-sticky-table td {
    box-sizing: border-box !important;
  }
  /* Column 1: Operator - Frozen Horizontally ONLY (NO vertical float) */
  .arith-sticky-table th:nth-child(1),
  .arith-sticky-table td:nth-child(1) {
    position: sticky !important;
    left: 0 !important;
    top: auto !important;
    z-index: 10 !important;
    width: 80px !important;
    min-width: 80px !important;
    max-width: 80px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
    text-align: center !important;
    padding: 8px 6px !important;
  }
  .arith-sticky-table th:nth-child(1) {
    background-color: #131d35 !important;
    z-index: 11 !important;
  }
  .arith-sticky-table td:nth-child(1) code {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 28px;
    padding: 0 8px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 0.85rem;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 6px;
    color: #38bdf8;
  }
  /* Column 2: Name - Frozen Horizontally ONLY (NO vertical float) */
  .arith-sticky-table th:nth-child(2),
  .arith-sticky-table td:nth-child(2) {
    position: sticky !important;
    left: 80px !important;
    top: auto !important;
    z-index: 10 !important;
    width: 140px !important;
    min-width: 140px !important;
    max-width: 140px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;
    font-weight: 600 !important;
    padding: 8px 12px !important;
  }
  .arith-sticky-table th:nth-child(2) {
    background-color: #131d35 !important;
    z-index: 11 !important;
  }
  .arith-sticky-table tbody tr:hover td:nth-child(1),
  .arith-sticky-table tbody tr:hover td:nth-child(2) {
    background-color: #162038 !important;
  }
  /* Light mode for sticky table */
  [data-theme="light"] .arith-sticky-table th:nth-child(1),
  [data-theme="light"] .arith-sticky-table th:nth-child(2) {
    background-color: #f1f5f9 !important;
    border-right-color: #cbd5e1 !important;
  }
  [data-theme="light"] .arith-sticky-table td:nth-child(1),
  [data-theme="light"] .arith-sticky-table td:nth-child(2) {
    background-color: #ffffff !important;
    border-right-color: #e2e8f0 !important;
  }
  [data-theme="light"] .arith-sticky-table td:nth-child(1) code {
    background: #e0f2fe;
    border-color: #7dd3fc;
    color: #0284c7;
  }
  [data-theme="light"] .arith-sticky-table td:nth-child(2) {
    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;
  }
  [data-theme="light"] .arith-sticky-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .arith-sticky-table tbody tr:hover td:nth-child(2) {
    background-color: #f8fafc !important;
  }

  /* ═════════════════════════════════════════════════════════════════════
     SECTION 08: OPERATOR PRECEDENCE HIERARCHY TABLE (Frozen Col 1 & 2 - Zero Overlap)
     ═════════════════════════════════════════════════════════════════════ */
  .db-table-mock.arith-sticky-table.precedence-table,
  .db-mock-table-wrap .db-table-mock.precedence-table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    min-width: 920px !important;
    width: 100% !important;
    overflow: visible !important;
    margin: 0 !important;
  }
  .precedence-table,
  .precedence-table th,
  .precedence-table td {
    box-sizing: border-box !important;
  }
  .precedence-table th,
  .precedence-table td {
    padding: 10px 14px !important;
    vertical-align: middle !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
    font-size: 0.84rem !important;
    line-height: 1.45 !important;
    box-sizing: border-box !important;
  }
  .precedence-table th {
    background-color: #131d35 !important;
    color: #94a3b8 !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    font-size: 0.74rem !important;
    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;
    white-space: nowrap !important;
  }
  /* Precedence Column 1: Precedence Level - Frozen horizontally at left 0 */
  .precedence-table th:nth-child(1),
  .precedence-table td:nth-child(1),
  .arith-sticky-table.precedence-table th:nth-child(1),
  .arith-sticky-table.precedence-table td:nth-child(1) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 0 !important;
    top: auto !important;
    z-index: 10 !important;
    width: 160px !important;
    min-width: 160px !important;
    max-width: 160px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
    text-align: left !important;
    padding: 10px 14px !important;
  }
  .precedence-table th:nth-child(1),
  .arith-sticky-table.precedence-table th:nth-child(1) {
    background-color: #131d35 !important;
    z-index: 12 !important;
  }
  /* Precedence Column 2: Operators - Frozen horizontally at left 160px */
  .precedence-table th:nth-child(2),
  .precedence-table td:nth-child(2),
  .arith-sticky-table.precedence-table th:nth-child(2),
  .arith-sticky-table.precedence-table td:nth-child(2) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 160px !important;
    top: auto !important;
    z-index: 10 !important;
    width: 200px !important;
    min-width: 200px !important;
    max-width: 200px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;
    padding: 10px 14px !important;
  }
  .precedence-table th:nth-child(2),
  .arith-sticky-table.precedence-table th:nth-child(2) {
    background-color: #131d35 !important;
    z-index: 12 !important;
  }
  .precedence-table th:nth-child(3),
  .precedence-table td:nth-child(3),
  .arith-sticky-table.precedence-table th:nth-child(3),
  .arith-sticky-table.precedence-table td:nth-child(3) {
    width: 150px !important;
    min-width: 140px !important;
    text-align: center !important;
    position: relative !important;
    z-index: 1 !important;
  }
  .precedence-table th:nth-child(4),
  .precedence-table td:nth-child(4),
  .arith-sticky-table.precedence-table th:nth-child(4),
  .arith-sticky-table.precedence-table td:nth-child(4) {
    min-width: 320px !important;
    position: relative !important;
    z-index: 1 !important;
  }
  .precedence-table tbody tr:hover td,
  .arith-sticky-table.precedence-table tbody tr:hover td {
    background-color: rgba(56, 189, 248, 0.05) !important;
  }
  .precedence-table tbody tr:hover td:nth-child(1),
  .precedence-table tbody tr:hover td:nth-child(2),
  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),
  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {
    background-color: #162038 !important;
  }
  .prec-tier-badge {
    display: inline-block;
    padding: 3px 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f1f5f9;
    white-space: nowrap;
  }
  .prec-tier-1 {
    background: rgba(244, 63, 94, 0.15);
    border-color: rgba(244, 63, 94, 0.35);
    color: #fb7185;
  }
  .prec-tier-2 {
    background: rgba(245, 158, 11, 0.18);
    border-color: rgba(245, 158, 11, 0.4);
    color: #fbbf24;
  }
  .prec-tier-15 {
    background: rgba(148, 163, 184, 0.12);
    border-color: rgba(148, 163, 184, 0.3);
    color: #94a3b8;
  }
  .prec-ops-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }
  .prec-ops-wrap code {
    display: inline-flex;
    align-items: center;
    padding: 2px 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 4px;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.25);
    color: #38bdf8;
  }
  .prec-op-highlight {
    background: rgba(245, 158, 11, 0.2) !important;
    border-color: rgba(245, 158, 11, 0.45) !important;
    color: #fcd34d !important;
    font-weight: 800 !important;
  }
  .prec-assoc-tag {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 5px;
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .prec-assoc-ltr {
    background: rgba(56, 189, 248, 0.1);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.25);
  }
  .prec-assoc-rtl {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.35);
  }

  /* Light mode for Precedence Table */
  [data-theme="light"] .precedence-table th,
  [data-theme="light"] .arith-sticky-table.precedence-table th {
    background-color: #f1f5f9 !important;
    color: #475569 !important;
    border-bottom-color: #cbd5e1 !important;
  }
  [data-theme="light"] .precedence-table td,
  [data-theme="light"] .arith-sticky-table.precedence-table td {
    border-bottom-color: #f1f5f9 !important;
    color: #1e293b !important;
  }
  [data-theme="light"] .precedence-table tbody tr:hover td,
  [data-theme="light"] .arith-sticky-table.precedence-table tbody tr:hover td {
    background-color: #f8fafc !important;
  }
  [data-theme="light"] .precedence-table th:nth-child(1),
  [data-theme="light"] .precedence-table th:nth-child(2),
  [data-theme="light"] .arith-sticky-table.precedence-table th:nth-child(1),
  [data-theme="light"] .arith-sticky-table.precedence-table th:nth-child(2) {
    background-color: #f1f5f9 !important;
    border-right-color: #cbd5e1 !important;
  }
  [data-theme="light"] .precedence-table td:nth-child(1),
  [data-theme="light"] .precedence-table td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.precedence-table td:nth-child(1),
  [data-theme="light"] .arith-sticky-table.precedence-table td:nth-child(2) {
    background-color: #ffffff !important;
    border-right-color: #e2e8f0 !important;
  }
  [data-theme="light"] .precedence-table td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.precedence-table td:nth-child(2) {
    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;
  }
  [data-theme="light"] .precedence-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .precedence-table tbody tr:hover td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {
    background-color: #f8fafc !important;
  }
  [data-theme="light"] .prec-tier-badge {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #0f172a;
  }
  [data-theme="light"] .prec-tier-1 {
    background: #ffe4e6;
    border-color: #fecdd3;
    color: #e11d48;
  }
  [data-theme="light"] .prec-tier-2 {
    background: #fef3c7;
    border-color: #fde68a;
    color: #d97706;
  }
  [data-theme="light"] .prec-ops-wrap code {
    background: #e0f2fe;
    border-color: #bae6fd;
    color: #0284c7;
  }
  [data-theme="light"] .prec-assoc-ltr {
    background: #f0fdf4;
    color: #16a34a;
    border-color: #bbf7d0;
  }
  [data-theme="light"] .prec-assoc-rtl {
    background: #fffbeb;
    color: #b45309;
    border-color: #fde68a;
  }

  /* ═════════════════════════════════════════════════════════════════════
     SECTION 09: MASTER ANTI-PATTERN REVIEW TABLE (Frozen Col 1 & 2 - Zero Overlap)
     ═════════════════════════════════════════════════════════════════════ */
  .db-table-mock.arith-sticky-table.anti-pattern-table,
  .db-mock-table-wrap .db-table-mock.anti-pattern-table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    min-width: 960px !important;
    width: 100% !important;
    overflow: visible !important;
    margin: 0 !important;
  }
  .anti-pattern-table,
  .anti-pattern-table th,
  .anti-pattern-table td {
    box-sizing: border-box !important;
  }
  .anti-pattern-table th,
  .anti-pattern-table td {
    padding: 10px 14px !important;
    vertical-align: middle !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
    font-size: 0.84rem !important;
    line-height: 1.45 !important;
    box-sizing: border-box !important;
  }
  .anti-pattern-table th {
    background-color: #131d35 !important;
    color: #94a3b8 !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    font-size: 0.74rem !important;
    border-bottom: 2px solid rgba(244, 63, 94, 0.35) !important;
    white-space: nowrap !important;
  }
  /* Anti-Pattern Column 1: Buggy Code Pattern - Frozen horizontally at left 0 */
  .anti-pattern-table th:nth-child(1),
  .anti-pattern-table td:nth-child(1),
  .arith-sticky-table.anti-pattern-table th:nth-child(1),
  .arith-sticky-table.anti-pattern-table td:nth-child(1) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 0 !important;
    top: auto !important;
    z-index: 10 !important;
    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
    text-align: left !important;
    padding: 10px 14px !important;
  }
  .anti-pattern-table th:nth-child(1),
  .arith-sticky-table.anti-pattern-table th:nth-child(1) {
    background-color: #131d35 !important;
    z-index: 12 !important;
  }
  /* Override code block styling inside column 1 */
  .anti-pattern-table td:nth-child(1) code,
  .arith-sticky-table.anti-pattern-table td:nth-child(1) code {
    display: inline-block !important;
    min-width: 0 !important;
    height: auto !important;
    padding: 3px 8px !important;
    background: rgba(244, 63, 94, 0.12) !important;
    border: 1px solid rgba(244, 63, 94, 0.3) !important;
    color: #fca5a5 !important;
    white-space: normal !important;
  }
  /* Anti-Pattern Column 2: Runtime Result - Frozen horizontally at left 220px */
  .anti-pattern-table th:nth-child(2),
  .anti-pattern-table td:nth-child(2),
  .arith-sticky-table.anti-pattern-table th:nth-child(2),
  .arith-sticky-table.anti-pattern-table td:nth-child(2) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 220px !important;
    top: auto !important;
    z-index: 10 !important;
    width: 190px !important;
    min-width: 190px !important;
    max-width: 190px !important;
    box-sizing: border-box !important;
    background-color: #0d1527 !important;
    border-right: 2px solid rgba(244, 63, 94, 0.35) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;
    padding: 10px 14px !important;
  }
  .anti-pattern-table th:nth-child(2),
  .arith-sticky-table.anti-pattern-table th:nth-child(2) {
    background-color: #131d35 !important;
    z-index: 12 !important;
  }
  .anti-pattern-table th:nth-child(3),
  .anti-pattern-table td:nth-child(3),
  .arith-sticky-table.anti-pattern-table th:nth-child(3),
  .arith-sticky-table.anti-pattern-table td:nth-child(3) {
    min-width: 260px !important;
    position: relative !important;
    z-index: 1 !important;
  }
  .anti-pattern-table th:nth-child(4),
  .anti-pattern-table td:nth-child(4),
  .arith-sticky-table.anti-pattern-table th:nth-child(4),
  .arith-sticky-table.anti-pattern-table td:nth-child(4) {
    width: 230px !important;
    min-width: 210px !important;
    position: relative !important;
    z-index: 1 !important;
  }
  .anti-pattern-table tbody tr:hover td,
  .arith-sticky-table.anti-pattern-table tbody tr:hover td {
    background-color: rgba(244, 63, 94, 0.04) !important;
  }
  .anti-pattern-table tbody tr:hover td:nth-child(1),
  .anti-pattern-table tbody tr:hover td:nth-child(2),
  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1),
  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(2) {
    background-color: #162038 !important;
  }
  .ap-code-bug {
    display: inline-block;
    padding: 3px 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 5px;
    background: rgba(244, 63, 94, 0.12);
    border: 1px solid rgba(244, 63, 94, 0.3);
    color: #fca5a5;
    word-break: break-word;
  }
  .ap-result-bad {
    color: #f87171;
    font-weight: 600;
  }
  .ap-code-fix {
    display: inline-block;
    padding: 3px 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 5px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.32);
    color: #6ee7b7;
    word-break: break-word;
  }

  /* Light mode for Anti-Pattern Table */
  [data-theme="light"] .anti-pattern-table th,
  [data-theme="light"] .arith-sticky-table.anti-pattern-table th {
    background-color: #f1f5f9 !important;
    color: #475569 !important;
    border-bottom-color: #cbd5e1 !important;
  }
  [data-theme="light"] .anti-pattern-table td,
  [data-theme="light"] .arith-sticky-table.anti-pattern-table td {
    border-bottom-color: #f1f5f9 !important;
    color: #1e293b !important;
  }
  [data-theme="light"] .anti-pattern-table tbody tr:hover td,
  [data-theme="light"] .arith-sticky-table.anti-pattern-table tbody tr:hover td {
    background-color: #fef2f2 !important;
  }
  [data-theme="light"] .anti-pattern-table th:nth-child(1),
  [data-theme="light"] .anti-pattern-table th:nth-child(2),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table th:nth-child(1),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table th:nth-child(2) {
    background-color: #f1f5f9 !important;
    border-right-color: #cbd5e1 !important;
  }
  [data-theme="light"] .anti-pattern-table td:nth-child(1),
  [data-theme="light"] .anti-pattern-table td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table td:nth-child(1),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {
    background-color: #ffffff !important;
    border-right-color: #e2e8f0 !important;
  }
  [data-theme="light"] .anti-pattern-table td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {
    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;
  }
  [data-theme="light"] .anti-pattern-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .anti-pattern-table tbody tr:hover td:nth-child(2),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(2) {
    background-color: #fef2f2 !important;
  }
  [data-theme="light"] .anti-pattern-table td:nth-child(1) code,
  [data-theme="light"] .arith-sticky-table.anti-pattern-table td:nth-child(1) code {
    background: #fee2e2 !important;
    border-color: #fca5a5 !important;
    color: #b91c1c !important;
  }

  /* ═════════════════════════════════════════════════════════════════════
     STUNNING KEY NOTES CARD DESIGN SYSTEM (Inherited Body Font + Glassmorphism)
     ═════════════════════════════════════════════════════════════════════ */
  .py-keynotes-card {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.28) !important;
    border-left: 4px solid #38bdf8 !important;
    border-radius: 12px !important;
    padding: 16px 20px !important;
    margin: 18px 0 10px 0 !important;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
    font-family: inherit !important;
  }
  .py-keynotes-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
  }
  .py-keynotes-body {
    flex: 1;
    min-width: 0;
  }
  .py-keynotes-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .py-keynotes-title {
    font-size: 0.76rem !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #38bdf8 !important;
    font-family: inherit !important;
  }
  .py-keynotes-tag {
    font-size: 0.66rem !important;
    padding: 2px 8px !important;
    border-radius: 12px !important;
    background: rgba(56, 189, 248, 0.14) !important;
    border: 1px solid rgba(56, 189, 248, 0.28) !important;
    color: #7dd3fc !important;
    font-weight: 700 !important;
    font-family: inherit !important;
  }
  .py-keynotes-list {
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    font-family: inherit !important;
  }
  .py-keynotes-list li {
    position: relative !important;
    padding-left: 22px !important;
    margin-bottom: 10px !important;
    font-size: 0.85rem !important;
    line-height: 1.65 !important;
    color: #e2e8f0 !important;
    font-family: inherit !important;
  }
  .py-keynotes-list li:last-child {
    margin-bottom: 0 !important;
  }
  .py-keynotes-list li::before {
    content: "" !important;
    position: absolute !important;
    left: 1px !important;
    top: 10px !important;
    width: 6px !important;
    height: 6px !important;
    border-radius: 50% !important;
    background: #38bdf8 !important;
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.8) !important;
  }
  .py-keynotes-list li strong {
    color: #f8fafc !important;
    font-weight: 700 !important;
  }
  .py-keynotes-list li code {
    font-family: 'JetBrains Mono', monospace !important;
    background: rgba(56, 189, 248, 0.12) !important;
    border: 1px solid rgba(56, 189, 248, 0.25) !important;
    padding: 2px 6px !important;
    border-radius: 5px !important;
    color: #38bdf8 !important;
    font-size: 0.8rem !important;
    font-weight: 600 !important;
  }
  /* Light Theme for Keynotes */
  [data-theme="light"] .py-keynotes-card {
    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;
    border: 1px solid rgba(14, 165, 233, 0.3) !important;
    border-left: 4px solid #0284c7 !important;
    box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.12), inset 0 1px 0 #ffffff !important;
  }
  [data-theme="light"] .py-keynotes-icon-wrap {
    background: #e0f2fe !important;
    border-color: #bae6fd !important;
    box-shadow: 0 0 12px rgba(14, 165, 233, 0.18) !important;
  }
  [data-theme="light"] .py-keynotes-title {
    color: #0284c7 !important;
  }
  [data-theme="light"] .py-keynotes-tag {
    background: #e0f2fe !important;
    border-color: #bae6fd !important;
    color: #0369a1 !important;
  }
  [data-theme="light"] .py-keynotes-list li {
    color: #334155 !important;
  }
  [data-theme="light"] .py-keynotes-list li::before {
    background: #0284c7 !important;
    box-shadow: 0 0 6px rgba(2, 132, 199, 0.5) !important;
  }
  [data-theme="light"] .py-keynotes-list li strong {
    color: #0f172a !important;
  }
  [data-theme="light"] .py-keynotes-list li code {
    background: #e0f2fe !important;
    border-color: #7dd3fc !important;
    color: #0369a1 !important;
  }

  /* ═════════════════════════════════════════════════════════════════════
     COGNITIVE LEARNING & SCIENTIFIC VISUAL MODELS DESIGN SYSTEM
     ═════════════════════════════════════════════════════════════════════ */

  /* 🧠 10-Second Recall Hook (Mnemonic / Interview Anchor) */
  .py-recall-hook {
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
    border: 1px solid rgba(56, 189, 248, 0.25);
    border-left: 4px solid #38bdf8;
    border-radius: 10px;
    padding: 14px 18px;
    margin: 20px 0 10px 0;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }
  .py-recall-icon {
    font-size: 1.4rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .py-recall-body {
    flex: 1;
  }
  .py-recall-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  .py-recall-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #38bdf8;
  }
  .py-recall-tag {
    font-size: 0.65rem;
    padding: 1px 6px;
    border-radius: 4px;
    background: rgba(56, 189, 248, 0.15);
    color: #bae6fd;
    font-weight: 600;
  }
  .py-recall-list {
    margin: 0;
    padding-left: 1.5rem;
    list-style-type: disc;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: #e2e8f0;
    line-height: 1.6;
  }
  .py-recall-list li {
    margin-bottom: 6px;
  }
  [data-theme="light"] .py-recall-list { color: #334155; }
  .py-recall-text {
    font-size: 0.82rem;
    line-height: 1.55;
    color: #e2e8f0;
    margin: 0;
  }
  .py-recall-text code {
    font-family: 'JetBrains Mono', monospace;
    background: rgba(0, 0, 0, 0.35);
    padding: 2px 5px;
    border-radius: 4px;
    color: #38bdf8;
    font-size: 0.78rem;
  }

  /* 💡 Visual Cognitive Model Container */
  .cog-model-card {
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 18px;
    margin: 18px 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  .cog-model-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .cog-model-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cog-model-badge {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 5px;
    text-transform: uppercase;
  }
  .cog-model-title {
    font-size: 0.92rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0;
  }
  .cog-model-subtitle {
    font-size: 0.72rem;
    color: #94a3b8;
  }

  /* Diagram 1: Number Line Euclidean Floor Division */
  .numline-wrap {
    position: relative;
    padding: 30px 14px 16px 14px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .numline-axis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 30px 10px 10px 10px;
    height: 4px;
    background: linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #22c55e 100%);
    border-radius: 2px;
  }
  .numline-tick {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .numline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0f172a;
    border: 2px solid #94a3b8;
    z-index: 2;
  }
  .numline-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 6px;
  }
  .numline-pointer-left {
    position: absolute;
    top: -46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%);
  }
  .numline-pill {
    padding: 3px 8px;
    border-radius: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.70rem;
    font-weight: 800;
    white-space: nowrap;
  }
  .pill-danger {
    background: rgba(244, 63, 94, 0.25);
    border: 1px solid #f43f5e;
    color: #fca5a5;
  }
  .pill-success {
    background: rgba(34, 197, 94, 0.25);
    border: 1px solid #22c55e;
    color: #86efac;
  }
  .pill-info {
    background: rgba(56, 189, 248, 0.25);
    border: 1px solid #38bdf8;
    color: #bae6fd;
  }
  .numline-arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #38bdf8;
  }
  .arrow-rose { border-top-color: #f43f5e; }
  .arrow-green { border-top-color: #22c55e; }
  .numline-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed rgba(255, 255, 255, 0.08);
    font-size: 0.74rem;
    color: #cbd5e1;
  }
  .numline-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Diagram 2: RAM Memory Pointer Architecture */
  .ram-schematic-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 768px) {
    .ram-schematic-grid { grid-template-columns: 1fr; }
  }
  .ram-schematic-box {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
  }
  .ram-schematic-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .ram-head-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    font-weight: 800;
  }
  .ram-node-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
  }
  .ram-var-tag {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 700;
    width: 60px;
    text-align: center;
  }
  .ram-arrow-connector {
    color: #64748b;
    font-weight: 700;
  }
  .ram-address-block {
    flex: 1;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ram-addr-label {
    font-size: 0.65rem;
    color: #94a3b8;
  }
  .ram-addr-val {
    color: #fbbf24;
    font-weight: 700;
  }
  .ram-content-val {
    color: #f8fafc;
    font-weight: 700;
  }

  /* Diagram 3: Circuit Breaker Flowchart */
  .circuit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 768px) {
    .circuit-grid { grid-template-columns: 1fr; }
  }
  .circuit-box {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
  }
  .circuit-step-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  .circuit-step-node {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.74rem;
  }
  .circuit-badge {
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  .circuit-badge--halt {
    background: rgba(244, 63, 94, 0.2);
    color: #f43f5e;
    border: 1px solid rgba(244, 63, 94, 0.4);
  }
  .circuit-badge--pass {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.4);
  }

  /* Diagram 4: Twin House Identity vs Equality */
  .twin-house-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 10px;
  }
  @media (max-width: 640px) {
    .twin-house-grid { grid-template-columns: 1fr; }
  }
  .twin-card {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
    text-align: center;
  }
  .twin-house-icon {
    font-size: 2rem;
    margin-bottom: 4px;
  }
  .twin-house-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.84rem;
    font-weight: 800;
    color: #f8fafc;
  }
  .twin-house-addr {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.70rem;
    color: #fbbf24;
    margin-bottom: 8px;
  }
  .twin-furniture-box {
    background: rgba(255, 255, 255, 0.04);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    color: #38bdf8;
    margin-bottom: 8px;
  }
  .twin-verdict-row {
    display: flex;
    justify-content: space-around;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.74rem;
  }

  /* Diagram 5: 8-Bit Hardware Register & RBAC Switchboard */
  .dip-register-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
    margin: 12px 0;
  }
  @media (max-width: 640px) {
    .dip-register-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .dip-cell {
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 8px 4px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
  }
  .dip-bit-idx {
    font-size: 0.62rem;
    color: #64748b;
    margin-bottom: 2px;
  }
  .dip-bit-power {
    font-size: 0.72rem;
    font-weight: 800;
    color: #94a3b8;
  }
  .dip-bit-flag {
    font-size: 0.62rem;
    font-weight: 700;
    margin: 4px 0;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dip-switch-indicator {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 4px auto 0 auto;
    border: 2px solid #64748b;
  }
  .switch-on {
    background: #22c55e;
    border-color: #4ade80;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  }
  .switch-off {
    background: #1e293b;
    border-color: #475569;
  }

  /* Diagram 6: Walrus Stream Pipeline */
  .walrus-flow-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
    margin-top: 10px;
    overflow-x: auto;
  }
  .walrus-flow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 120px;
  }
  .walrus-step-badge {
    background: rgba(168, 85, 247, 0.15);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: #c084fc;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
  }
  .walrus-step-desc {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #cbd5e1;
  }

  /* Diagram 7: PEUMASCILA Mnemonic Ladder */
  .ladder-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 14px 0;
  }
  .ladder-rung {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    font-family: 'JetBrains Mono', monospace;
    transition: transform 0.2s ease;
  }
  .ladder-rung:hover {
    transform: translateX(4px);
  }
  .ladder-letter {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.82rem;
    font-weight: 900;
  }
  .rung-rose { background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }
  .rung-gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
  .rung-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
  .rung-blue { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
  .rung-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
  .rung-muted { background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1); }
  .ladder-title {
    font-size: 0.80rem;
    font-weight: 800;
    color: #f8fafc;
    width: 140px;
  }
  .ladder-ops {
    flex: 1;
    font-size: 0.74rem;
    color: #94a3b8;
  }
  .ladder-priority {
    font-size: 0.65rem;
    padding: 2px 7px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
  }

  /* Light mode adaptations for all cognitive learning components */
  [data-theme="light"] .py-recall-hook {
    background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%);
    border-color: rgba(2, 132, 199, 0.3);
    border-left-color: #0284c7;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
  [data-theme="light"] .py-recall-title { color: #0284c7; }
  [data-theme="light"] .py-recall-text { color: #1e293b; }
  [data-theme="light"] .py-recall-text code {
    background: #f1f5f9;
    color: #0369a1;
    border: 1px solid #cbd5e1;
  }
  [data-theme="light"] .cog-model-card {
    background: #ffffff;
    border-color: #e2e8f0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  /* Bitmask RBAC Card */
  .bitmask-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 12px;
  }
  @media (max-width: 768px) {
    .bitmask-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .bitmask-grid { grid-template-columns: 1fr; }
  }
  .bitmask-cell {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }
  .bitmask-cell-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    font-weight: 800;
  }
  .bitmask-cell-title--blue { color: #38bdf8; }
  .bitmask-cell-title--green { color: #34d399; }
  .bitmask-cell-title--amber { color: #fbbf24; }
  .bitmask-cell-title--purple { color: #c084fc; }

  .bitmask-cell-sub {
    font-size: 0.68rem;
    color: #94a3b8;
    margin-top: 4px;
  }
  .bitmask-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #cbd5e1;
  }

  /* Arity Grid */
  .arity-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 16px 0;
  }
  @media (max-width: 640px) {
    .arity-grid { grid-template-columns: 1fr; }
  }
  .arity-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .arity-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .arity-badge {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 800;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arity-name {
    font-weight: 700;
    font-size: 0.88rem;
    color: #f8fafc;
  }
  .arity-desc {
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.4;
  }
  .arity-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .arity-chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 2px 7px;
    color: #e2e8f0;
  }


  /* Operator Classification Grid */
  .op-matrix-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 14px;
  }
  .op-family-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
  }
  .op-family-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  @media (max-width: 640px) {
    .op-family-header { flex-direction: column; align-items: flex-start; gap: 6px; }
  }
  .op-family-desc {
    font-size: 0.75rem;
    color: #94a3b8;
    line-height: 1.4;
  }
  .op-symbols-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .op-symbol-box {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    transition: all 0.2s ease;
  }
  .op-symbol-box:hover {
    background: rgba(56, 189, 248, 0.1);
    border-color: rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    transform: translateY(-2px);
  }
  [data-theme="light"] .op-family-card {
    background: #f8fafc;
    border-color: #e2e8f0;
  }
  [data-theme="light"] .op-family-desc {
    color: #475569;
  }
  [data-theme="light"] .op-symbol-box {
    background: #ffffff;
    border-color: #cbd5e1;
    color: #0f172a;
  }
  [data-theme="light"] .op-symbol-box:hover {
    background: #f0f9ff;
    border-color: #38bdf8;
    color: #0284c7;
  }

  /* Category pills */
  .fam-chip {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: 'Outfit', sans-serif;
  }
  .fam-chip--arith { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
  .fam-chip--assign { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
  .fam-chip--compare { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
  .fam-chip--logic { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
  .fam-chip--ident { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }
  .fam-chip--member { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }
  .fam-chip--bitwise { background: rgba(234, 88, 12, 0.15); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.3); }
  .fam-chip--cond { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }

  /* Subcards with divider */
  .topic-subcard {
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
  }

  /* Table and Section Header Utilities (100% Class-Driven, 0 Inline Styles) */
  .table-header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    padding: 0 4px;
  }
  .table-header-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    flex: 1;
  }
  .subcard-header-with-audio {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .subcard-header-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 800;
    flex: 1;
  }
  .pipeline-flow-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    margin-top: 6px;
    overflow-x: auto;
  }
  .pipeline-flow-tip {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-top: 8px;
    line-height: 1.5;
  }
  .tok-blue { color: #38bdf8; }
  .tok-green { color: #34d399; }
  .tok-amber { color: #fbbf24; }
  .tok-purple { color: #a855f7; }
  .tok-rose { color: #f43f5e; }
  .tok-muted { color: #64748b; }

  /* 3-Column Complexity Grid */
  .complexity-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 6px;
  }
  @media (max-width: 640px) {
    .complexity-grid { grid-template-columns: 1fr; }
  }
  .complexity-cell {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }
  .complexity-expr {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.70rem;
    color: #94a3b8;
  }
  .complexity-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    font-weight: 800;
    margin: 6px 0;
  }
  .complexity-desc {
    font-size: 0.70rem;
    color: #64748b;
  }

  /* Dual Short-Circuit Rule Grid */
  .dual-rule-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 6px;
  }
  @media (max-width: 640px) {
    .dual-rule-grid { grid-template-columns: 1fr; }
  }
  .dual-rule-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px;
  }
  .dual-rule-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .dual-rule-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #cbd5e1;
    line-height: 1.6;
  }

  /* Interview Q&A Layout */
  .interview-header-title {
    color: #38bdf8;
    font-size: 1rem;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .interview-divider {
    border: none;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    margin: 12px 0;
  }
`;

// Combine into single clean stylesheet
const fullCss = `<style>\n${baseCss}\n${extraCss}\n</style>`;

// Build the HTML content for Slide 0
const slideHtml = `${fullCss}

<!-- ═══ SECTION 01: Operator Superpowers & Architecture ═══ -->
<div class="slide-section" id="day02FundamentalsSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFundamentals">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🧱</span> Python Operators: Foundation &amp; Core Architecture</span>
    </span>
  </h2>

  <!-- Master Classification Table -->
  <div class="db-mock-table-wrap">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Complete Python Operator Classification Matrix</h4>
    </div>
    <div class="op-matrix-list">
      
      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--arith">Arithmetic</span>
          <span class="op-family-desc">Executes mathematical calculations to transform numeric values.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>+</code></div>
          <div class="op-symbol-box"><code>-</code></div>
          <div class="op-symbol-box"><code>*</code></div>
          <div class="op-symbol-box"><code>/</code></div>
          <div class="op-symbol-box"><code>//</code></div>
          <div class="op-symbol-box"><code>%</code></div>
          <div class="op-symbol-box"><code>**</code></div>
          <div class="op-symbol-box"><code>@</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--assign">Augmented Assignment</span>
          <span class="op-family-desc">Performs an operation and updates the variable's value simultaneously.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>=</code></div>
          <div class="op-symbol-box"><code>+=</code></div>
          <div class="op-symbol-box"><code>-=</code></div>
          <div class="op-symbol-box"><code>*=</code></div>
          <div class="op-symbol-box"><code>/=</code></div>
          <div class="op-symbol-box"><code>//=</code></div>
          <div class="op-symbol-box"><code>%=</code></div>
          <div class="op-symbol-box"><code>**=</code></div>
          <div class="op-symbol-box"><code>:=</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--compare">Relational Comparison</span>
          <span class="op-family-desc">Evaluates the relationship between values to return a True or False verdict.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>==</code></div>
          <div class="op-symbol-box"><code>!=</code></div>
          <div class="op-symbol-box"><code>&lt;</code></div>
          <div class="op-symbol-box"><code>&lt;=</code></div>
          <div class="op-symbol-box"><code>&gt;</code></div>
          <div class="op-symbol-box"><code>&gt;=</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--logic">Boolean Logic</span>
          <span class="op-family-desc">Combines multiple truth conditions using intelligent short-circuit evaluation.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>and</code></div>
          <div class="op-symbol-box"><code>or</code></div>
          <div class="op-symbol-box"><code>not</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--ident">Object Identity</span>
          <span class="op-family-desc">Verifies if two variables point to the exact same physical RAM address.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>is</code></div>
          <div class="op-symbol-box"><code>is not</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--member">Collection Membership</span>
          <span class="op-family-desc">Checks whether a specific item exists inside a given data container.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>in</code></div>
          <div class="op-symbol-box"><code>not in</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--bitwise">Bitwise Systems</span>
          <span class="op-family-desc">Manipulates data at the lowest level by altering individual binary bits.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>&amp;</code></div>
          <div class="op-symbol-box"><code>|</code></div>
          <div class="op-symbol-box"><code>^</code></div>
          <div class="op-symbol-box"><code>~</code></div>
          <div class="op-symbol-box"><code>&lt;&lt;</code></div>
          <div class="op-symbol-box"><code>&gt;&gt;</code></div>
        </div>
      </div>

      <div class="op-family-card">
        <div class="op-family-header">
          <span class="fam-chip fam-chip--cond">Conditional Ternary</span>
          <span class="op-family-desc">Evaluates a quick if/else decision on a single line of code.</span>
        </div>
        <div class="op-symbols-grid">
          <div class="op-symbol-box"><code>x if c else y</code></div>
        </div>
      </div>

    </div>
  </div>
</div>




</div>


<!-- ═══ SECTION 02: Arithmetic Operators ═══ -->
<div class="slide-section" id="day02ArithSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingArith">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">➗</span> Arithmetic Operators</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio01.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Python provides a powerful suite of arithmetic operators designed to perform standard mathematical calculations effortlessly. These core operators form the bedrock of numerical processing, scientific computing, and financial modeling, allowing you to manipulate numeric values intuitively and elegantly within your code.</p>

  <!-- Arithmetic Table Subcard -->
  <div class="topic-subcard" id="day02ArithTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Arithmetic &amp; Division Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio02.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 5 &rarr; 15</code></td><td>Adds numeric values together; cleanly concatenates sequences</td></tr>
          <tr><td><code>-</code></td><td>Subtraction</td><td><code>10 - 5 &rarr; 5</code></td><td>Subtracts the right operand from the left operand</td></tr>
          <tr><td><code>*</code></td><td>Multiplication</td><td><code>10 * 5 &rarr; 50</code></td><td>Multiplies values; can also be used to repeat sequences</td></tr>
          <tr><td><code>/</code></td><td>True Division</td><td><code>7 / 2 &rarr; 3.5</code></td><td>Always returns a <code>float</code>, even if dividing evenly (<code>4 / 2 &rarr; 2.0</code>)</td></tr>
          <tr><td><code>//</code></td><td>Floor Division</td><td><code>7 // 2 &rarr; 3</code> vs <code>-7 // 2 &rarr; -4</code></td><td>Floors towards -&infin;; returns an int if both operands are ints</td></tr>
          <tr><td><code>%</code></td><td>Modulo</td><td><code>17 % 5 &rarr; 2</code></td><td>Returns the remainder of a division preserving the sign of divisor</td></tr>
          <tr><td><code>**</code></td><td>Exponentiation</td><td><code>2 ** 3 &rarr; 8</code></td><td><strong>Right-associative</strong> power operator (e.g. 2 to the power of 3)</td></tr>
          <tr><td><code>@</code></td><td>Matrix Multiply</td><td><code>A @ B</code></td><td>Invokes <code>__matmul__</code>; standard across NumPy, Pandas, PyTorch</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Code Container Subcard -->
  <div class="topic-subcard" id="day02ArithCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Arithmetic Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio03.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Fundamental Arithmetic Operations</span>
print(f"Addition:       10 + 3  = {10 + 3}")      <span class="code-comment"># Output: 13</span>
print(f"Subtraction:    10 - 3  = {10 - 3}")      <span class="code-comment"># Output: 7</span>
print(f"Multiplication: 10 * 3  = {10 * 3}")      <span class="code-comment"># Output: 30</span>

<span class="code-comment"># Division Mechanics (Note the float vs int outcomes)</span>
print(f"True Division:  10 / 3  = {10 / 3:.2f}")  <span class="code-comment"># Output: 3.33 (float)</span>
print(f"Floor Division: 10 // 3 = {10 // 3}")     <span class="code-comment"># Output: 3    (truncated int)</span>

<span class="code-comment"># Modulo and Exponents</span>
print(f"Modulo:         10 % 3  = {10 % 3}")      <span class="code-comment"># Output: 1    (remainder)</span>
print(f"Exponentiation: 10 ** 3 = {10 ** 3}")     <span class="code-comment"># Output: 1000 (10^3)</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Arithmetic Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>True division</strong> (<code>/</code>) ALWAYS returns a float, even if the division is perfect (e.g., <code>4 / 2 == 2.0</code>).</li>
        <li><strong>Floor division</strong> (<code>//</code>) rounds DOWN towards negative infinity (e.g., <code>-7 // 2 == -4</code>, NOT <code>-3</code>).</li>
        <li><strong>Modulo</strong> (<code>%</code>) in Python ALWAYS takes the SAME SIGN as the divisor.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 03: Relational Comparisons & Chained Evaluation ═══ -->
<div class="slide-section" id="day02CompSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingComp">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">⚖️</span> Comparison (Relational) Operators</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio04.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Comparison operators evaluate relationships between two values and return a boolean result (<code>True</code> or <code>False</code>). Python uniquely optimizes <strong>chained comparisons</strong> (e.g. <code>18 &lt;= age &lt; 65</code>), evaluating operands with mathematical continuity and evaluating intermediate expressions exactly once.</p>

  <!-- Comparison Table Subcard -->
  <div class="topic-subcard" id="day02CompTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Comparison &amp; Relational Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio05.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>==</code></td><td>Equal To</td><td><code>10 == 10 &rarr; True</code></td><td>Compares value equality by invoking <code>__eq__()</code></td></tr>
          <tr><td><code>!=</code></td><td>Not Equal To</td><td><code>10 != 5 &rarr; True</code></td><td>Returns <code>True</code> if values are not equal (<code>__ne__()</code>)</td></tr>
          <tr><td><code>&lt;</code></td><td>Less Than</td><td><code>5 &lt; 10 &rarr; True</code></td><td>Checks if left operand is strictly less than right (<code>__lt__()</code>)</td></tr>
          <tr><td><code>&lt;=</code></td><td>Less Than or Equal</td><td><code>10 &lt;= 10 &rarr; True</code></td><td>Checks if left operand is less than or equal to right (<code>__le__()</code>)</td></tr>
          <tr><td><code>&gt;</code></td><td>Greater Than</td><td><code>15 &gt; 10 &rarr; True</code></td><td>Checks if left operand is strictly greater than right (<code>__gt__()</code>)</td></tr>
          <tr><td><code>&gt;=</code></td><td>Greater Than or Equal</td><td><code>10 &gt;= 10 &rarr; True</code></td><td>Checks if left operand is greater than or equal to right (<code>__ge__()</code>)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Comparison Code Subcard -->
  <div class="topic-subcard" id="day02CompCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Comparison &amp; Chaining Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio06.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Standard Comparison Operations</span>
score = 85
print(f"Passing Grade: {score &gt;= 60}")         <span class="code-comment"># Output: True</span>
print(f"Perfect Score: {score == 100}")        <span class="code-comment"># Output: False</span>
print(f"Needs Retest:  {score != 100}")        <span class="code-comment"># Output: True</span>

<span class="code-comment"># Python Chained Comparisons (Evaluates middle operand once)</span>
age = 28
is_working_age = 18 &lt;= age &lt; 65               <span class="code-comment"># (18 &lt;= age) and (age &lt; 65)</span>
print(f"Working Age Window: {is_working_age}") <span class="code-comment"># Output: True</span>

<span class="code-comment"># Lexicographical String Comparisons</span>
print(f"Alphabetical:  'apple' &lt; 'banana'")    <span class="code-comment"># Output: True (Unicode order)</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Comparison Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Chained comparisons</strong> (<code>a &lt; b &lt; c</code>) evaluate mathematically as <code>(a &lt; b) and (b &lt; c)</code>, executing the middle expression <code>b</code> <strong>exactly once</strong>.</li>
        <li><strong>Value equality</strong> (<code>==</code>) checks whether contents match by invoking <code>__eq__()</code>, whereas <code>is</code> tests physical RAM address.</li>
        <li><strong>Lexicographical order</strong>: Strings are compared character-by-character based on their underlying Unicode code points.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 04: Logical & Short-Circuit Evaluation ═══ -->
<div class="slide-section" id="day02LogSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingLog">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🔀</span> Logical Operators &amp; Short-Circuit Evaluation</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio07.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Logical operators combine boolean expressions and determine execution paths using short-circuit evaluation. Rather than converting values strictly to booleans, Python's <code>and</code> and <code>or</code> operators return the actual operand that determined the outcome, enabling powerful fallback and gating patterns.</p>

  <!-- Logical Table Subcard -->
  <div class="topic-subcard" id="day02LogTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Logical Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio08.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>and</code></td><td>Logical AND</td><td><code>True and False &rarr; False</code></td><td>Returns first falsy operand, or the last operand if all are truthy</td></tr>
          <tr><td><code>or</code></td><td>Logical OR</td><td><code>False or True &rarr; True</code></td><td>Returns first truthy operand, or the last operand if all are falsy</td></tr>
          <tr><td><code>not</code></td><td>Logical NOT</td><td><code>not True &rarr; False</code></td><td>Inverts boolean truth value; always returns a strict <code>bool</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Logical Code Subcard -->
  <div class="topic-subcard" id="day02LogCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Logical &amp; Short-Circuit Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio09.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Short-Circuit Fallback with 'or'</span>
username = ""
display_name = username <span class="kw">or</span> "Anonymous User"
print(f"Active User:  {display_name}")          <span class="code-comment"># Output: 'Anonymous User'</span>

<span class="code-comment"># Short-Circuit Guard with 'and'</span>
user_config = {"tier": "pro"}
tier = user_config <span class="kw">and</span> user_config["tier"]
print(f"User Tier:    {tier}")                  <span class="code-comment"># Output: 'pro'</span>

<span class="code-comment"># Logical Inversion with 'not'</span>
is_locked = False
print(f"Can Access:   {not is_locked}")         <span class="code-comment"># Output: True</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Logical Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Short-circuiting</strong> terminates evaluation the instant the outcome is guaranteed (<code>or</code> stops at first truthy; <code>and</code> stops at first falsy).</li>
        <li><strong>Operand return</strong>: <code>and</code> and <code>or</code> return the <strong>actual operand object</strong>, not a converted boolean.</li>
        <li><strong>Precedence hierarchy</strong>: <code>not</code> has higher precedence than <code>and</code>, which in turn has higher precedence than <code>or</code>.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 05: Identity vs Equality & Membership Testing ═══ -->
<div class="slide-section" id="day02IdSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingId">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🔍</span> Identity &amp; Membership Operators</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio10.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Identity operators check whether two variables point to the exact same object in physical RAM, while membership operators test whether a specified element exists inside a collection. Understanding the distinction between identity and equality is critical for preventing memory alias bugs and performance bottlenecks.</p>

  <!-- Identity Table Subcard -->
  <div class="topic-subcard" id="day02IdTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Identity &amp; Membership Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio11.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>is</code></td><td>Identity Test</td><td><code>a is b &rarr; True/False</code></td><td><code>True</code> if operands share the identical RAM memory address (<code>id(a) == id(b)</code>)</td></tr>
          <tr><td><code>is not</code></td><td>Negated Identity</td><td><code>a is not None &rarr; True</code></td><td><code>True</code> if operands reference different memory locations</td></tr>
          <tr><td><code>in</code></td><td>Membership Test</td><td><code>'py' in 'python' &rarr; True</code></td><td><code>True</code> if element is found in sequence or collection</td></tr>
          <tr><td><code>not in</code></td><td>Negated Membership</td><td><code>10 not in [1, 2] &rarr; True</code></td><td><code>True</code> if element is not present in collection</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Identity Code Subcard -->
  <div class="topic-subcard" id="day02IdCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Identity &amp; Membership Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio12.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Value Equality (==) vs Memory Identity (is)</span>
list_a = [1, 2, 3]
list_b = [1, 2, 3]
list_c = list_a  <span class="code-comment"># Memory alias referencing same object</span>

print(f"Value Equality:  {list_a == list_b}")    <span class="code-comment"># Output: True (same values)</span>
print(f"RAM Identity:    {list_a is list_b}")    <span class="code-comment"># Output: False (different memory buffers)</span>
print(f"Shared Alias:    {list_a is list_c}")    <span class="code-comment"># Output: True (exact same address)</span>

<span class="code-comment"># PEP 8 Standard: Singleton Check</span>
payload = None
print(f"Is Unset:        {payload is None}")     <span class="code-comment"># Output: True (always use 'is None')</span>

<span class="code-comment"># Fast Membership Testing (O(1) Hash Set vs O(N) List)</span>
valid_roles = {"admin", "editor", "moderator"}
print(f"Has Access:      {'editor' in valid_roles}") <span class="code-comment"># Output: True (Instant O(1))</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Identity &amp; Membership</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Always use <code>is None</code></strong>: PEP 8 mandates <code>is None</code> instead of <code>== None</code> because classes can overload <code>__eq__()</code>.</li>
        <li><strong>Identity vs Equality</strong>: <code>is</code> tests memory identity (<code>id(a) == id(b)</code>), while <code>==</code> evaluates value content.</li>
        <li><strong>Membership speed</strong>: <code>x in set</code> is <strong>$O(1)$ constant time</strong>, whereas <code>x in list</code> is <strong>$O(N)$ linear time</strong>.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 06: Bitwise Operators & Binary Masking ═══ -->
<div class="slide-section" id="day02BitSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBit">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🧮</span> Bitwise Operators &amp; Binary Masking</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio13.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Bitwise operators perform atomic operations directly on the individual binary bits of integer data. In database internals, systems programming, and high-throughput data pipelines, bitmasking provides ultra-compact, high-speed representations for permission flags, feature toggles, and state machines.</p>

  <!-- Bitwise Table Subcard -->
  <div class="topic-subcard" id="day02BitTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Bitwise Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio14.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>&amp;</code></td><td>Bitwise AND</td><td><code>5 &amp; 3 &rarr; 1</code></td><td>Sets bit to 1 if both corresponding bits are 1 (<code>0101 &amp; 0011 = 0001</code>)</td></tr>
          <tr><td><code>|</code></td><td>Bitwise OR</td><td><code>5 | 3 &rarr; 7</code></td><td>Sets bit to 1 if at least one corresponding bit is 1 (<code>0101 | 0011 = 0111</code>)</td></tr>
          <tr><td><code>^</code></td><td>Bitwise XOR</td><td><code>5 ^ 3 &rarr; 6</code></td><td>Sets bit to 1 if bits are different (<code>0101 ^ 0011 = 0110</code>)</td></tr>
          <tr><td><code>~</code></td><td>Bitwise NOT</td><td><code>~5 &rarr; -6</code></td><td>Inverts all bits using two's complement formula: <code>-(x + 1)</code></td></tr>
          <tr><td><code>&lt;&lt;</code></td><td>Left Shift</td><td><code>3 &lt;&lt; 2 &rarr; 12</code></td><td>Shifts bits left, multiplying integer by $2^n$ (<code>0011 &lt;&lt; 2 = 1100</code>)</td></tr>
          <tr><td><code>&gt;&gt;</code></td><td>Right Shift</td><td><code>16 &gt;&gt; 2 &rarr; 4</code></td><td>Shifts bits right, floor-dividing integer by $2^n$ (<code>10000 &gt;&gt; 2 = 00100</code>)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Bitwise Code Subcard -->
  <div class="topic-subcard" id="day02BitCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Bitwise Masking Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio15.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Permission Bitmasking (RBAC Pattern)</span>
READ    = 0b001  <span class="code-comment"># 1</span>
WRITE   = 0b010  <span class="code-comment"># 2</span>
EXECUTE = 0b100  <span class="code-comment"># 4</span>

<span class="code-comment"># Combine Permissions with Bitwise OR (|)</span>
user_perms = READ | WRITE  <span class="code-comment"># 0b011 (3)</span>

<span class="code-comment"># Inspect Permissions with Bitwise AND (&amp;)</span>
can_read = bool(user_perms &amp; READ)
can_exec = bool(user_perms &amp; EXECUTE)
print(f"Can Read:    {can_read}")                 <span class="code-comment"># Output: True</span>
print(f"Can Execute: {can_exec}")                 <span class="code-comment"># Output: False</span>

<span class="code-comment"># Fast Parity Check (Parentheses Required!)</span>
num = 14
is_even = (num &amp; 1) == 0
print(f"Is Even:     {is_even}")                  <span class="code-comment"># Output: True</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Bitwise Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Precedence trap</strong>: Comparisons (<code>==</code>) bind tighter than bitwise operators (<code>&amp;</code>, <code>|</code>, <code>^</code>) — always parenthesize: <code>(x &amp; 1) == 0</code>.</li>
        <li><strong>Two's complement</strong>: Bitwise NOT (<code>~x</code>) inverts bits, yielding mathematically <code>-(x + 1)</code> (e.g. <code>~0 == -1</code> and <code>~5 == -6</code>).</li>
        <li><strong>Hardware speed</strong>: Left shift (<code>&lt;&lt;</code>) and right shift (<code>&gt;&gt;</code>) multiply and divide by powers of 2 at single-cycle CPU speed.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 07: Walrus & Augmented Assignment Operators ═══ -->
<div class="slide-section" id="day02WalrusSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingWalrus">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🦭</span> Assignment &amp; Walrus (:=) Operators</span>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio16.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p class="section-intro-text">Assignment operators store values into variables, with augmented variants (<code>+=</code>, <code>-=</code>, etc.) combining computation and storage in one step. Introduced in Python 3.8 (PEP 572), the Walrus operator (<code>:=</code>) enables assignment expressions directly within conditional checks and comprehensions.</p>

  <!-- Walrus Table Subcard -->
  <div class="topic-subcard" id="day02WalrusTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Assignment &amp; Walrus Operator Reference</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio17.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table">
        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>
        <tbody>
          <tr><td><code>=</code></td><td>Simple Assignment</td><td><code>x = 10</code></td><td>Binds a value or object to a variable name</td></tr>
          <tr><td><code>+=</code></td><td>Add &amp; Assign</td><td><code>x += 5 &rarr; 15</code></td><td>Adds and rebinds; in-place buffer mutation on lists</td></tr>
          <tr><td><code>-=</code></td><td>Subtract &amp; Assign</td><td><code>x -= 3 &rarr; 12</code></td><td>Subtracts right operand from left and assigns</td></tr>
          <tr><td><code>*=</code></td><td>Multiply &amp; Assign</td><td><code>x *= 2 &rarr; 24</code></td><td>Multiplies and assigns result</td></tr>
          <tr><td><code>/=</code></td><td>True Divide &amp; Assign</td><td><code>x /= 4 &rarr; 6.0</code></td><td>Divides and assigns floating-point result</td></tr>
          <tr><td><code>//=</code></td><td>Floor Divide &amp; Assign</td><td><code>x //= 2 &rarr; 3.0</code></td><td>Floor divides and assigns integer/float result</td></tr>
          <tr><td><code>%=</code></td><td>Modulo &amp; Assign</td><td><code>x %= 2 &rarr; 1.0</code></td><td>Calculates modulo and assigns remainder</td></tr>
          <tr><td><code>**=</code></td><td>Exponent &amp; Assign</td><td><code>x **= 3 &rarr; 1.0</code></td><td>Raises to power and assigns result</td></tr>
          <tr><td><code>:=</code></td><td>Walrus Assignment</td><td><code>(n := len(s)) &gt; 0</code></td><td>Assigns and returns value inside an expression</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Walrus Code Subcard -->
  <div class="topic-subcard" id="day02WalrusCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Walrus &amp; Assignment Operations in Python</h4>
      <button class="audio-play-btn" onclick="playAudio('Day02/New_PyDay02Audio18.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># Augmented Assignment</span>
total = 100
total += 25
total -= 10
print(f"Running Total: {total}")                  <span class="code-comment"># Output: 115</span>

<span class="code-comment"># Walrus Operator (:=) in List Comprehension</span>
data_stream = ["  alpha ", "   ", "BETA", "  gamma  "]
filtered = [clean <span class="kw">for</span> item <span class="kw">in</span> data_stream <span class="kw">if</span> (clean := item.strip().lower())]
print(f"Cleaned Stream: {filtered}")              <span class="code-comment"># Output: ['alpha', 'beta', 'gamma']</span>

<span class="code-comment"># Inline Ternary Conditional Expression</span>
status = "Active" <span class="kw">if</span> len(filtered) &gt; 0 <span class="kw">else</span> "Inactive"
print(f"System Status:  {status}")                <span class="code-comment"># Output: 'Active'</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Assignment Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Walrus expression</strong>: <code>:=</code> assigns and immediately returns the value, avoiding redundant evaluations in loops and comprehensions.</li>
        <li><strong>Parentheses required</strong>: Walrus has the lowest binding precedence; always wrap in parentheses <code>(val := expr)</code> inside conditions.</li>
        <li><strong>Ternary execution</strong>: Python ternary <code>x if cond else y</code> evaluates lazily, evaluating only the branch that matches the condition.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 08: Operator Precedence Hierarchy Table & Examples ═══ -->
<div class="slide-section" id="day02PrecedenceSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingPrecedence">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🔺</span> Operator Precedence Hierarchy Table &amp; Rules</span>
    </span>
  </h2>
  <p class="section-intro-text">When an expression contains multiple operators, Python applies strict precedence rules to determine which operations are evaluated first. Operators at higher levels bind tighter than those below them. When in doubt, defensive parentheses eliminate ambiguity and make code immediately understandable.</p>

  <!-- Precedence Hierarchy Table Subcard -->
  <div class="topic-subcard" id="day02PrecedenceTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Operator Precedence Hierarchy Table</h4>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table precedence-table">
        <thead>
          <tr>
            <th>Precedence Level</th>
            <th>Operators</th>
            <th>Associativity</th>
            <th>Description &amp; Behavior Rules</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="prec-tier-badge prec-tier-1">Level 1 (Highest)</span></td>
            <td><div class="prec-ops-wrap"><code>()</code> <code>[]</code> <code>{}</code> <code>f()</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Grouping parentheses, list/dict/set literals, slicing &amp; indexing, function calls</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-2">Level 2</span></td>
            <td><div class="prec-ops-wrap"><code class="prec-op-highlight">**</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-rtl">Right-to-Left ⚠️</span></td>
            <td>Exponentiation (evaluated right-to-left: <code>2 ** 3 ** 2 = 512</code>, not 64)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-3">Level 3</span></td>
            <td><div class="prec-ops-wrap"><code>+x</code> <code>-x</code> <code>~x</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-rtl">Right-to-Left</span></td>
            <td>Unary plus, unary minus (negation), bitwise inversion (NOT)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-4">Level 4</span></td>
            <td><div class="prec-ops-wrap"><code>*</code> <code>/</code> <code>//</code> <code>%</code> <code>@</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Multiplication, true float division, floor division, modulo, matrix multiplication</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-5">Level 5</span></td>
            <td><div class="prec-ops-wrap"><code>+</code> <code>-</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Addition and subtraction</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-6">Level 6</span></td>
            <td><div class="prec-ops-wrap"><code>&lt;&lt;</code> <code>&gt;&gt;</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Bitwise left shift and right shift</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-7">Level 7</span></td>
            <td><div class="prec-ops-wrap"><code>&amp;</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Bitwise AND</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-8">Level 8</span></td>
            <td><div class="prec-ops-wrap"><code>^</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Bitwise XOR (exclusive OR)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-9">Level 9</span></td>
            <td><div class="prec-ops-wrap"><code>|</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Bitwise OR</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-10">Level 10</span></td>
            <td><div class="prec-ops-wrap"><code>==</code> <code>!=</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code> <code>is</code> <code>in</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right (Chained)</span></td>
            <td>Comparisons, equality, identity tests, membership tests (evaluated with short-circuit chaining)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-11">Level 11</span></td>
            <td><div class="prec-ops-wrap"><code>not</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-rtl">Right-to-Left</span></td>
            <td>Boolean logical NOT (inverts truth value)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-12">Level 12</span></td>
            <td><div class="prec-ops-wrap"><code>and</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Boolean logical AND (short-circuits at first falsy value)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-13">Level 13</span></td>
            <td><div class="prec-ops-wrap"><code>or</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-ltr">Left-to-Right</span></td>
            <td>Boolean logical OR (short-circuits at first truthy value)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-14">Level 14</span></td>
            <td><div class="prec-ops-wrap"><code>if - else</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-rtl">Right-to-Left</span></td>
            <td>Conditional expression (ternary operator: <code>x if c else y</code>)</td>
          </tr>
          <tr>
            <td><span class="prec-tier-badge prec-tier-15">Level 15 (Lowest)</span></td>
            <td><div class="prec-ops-wrap"><code>:=</code> <code>=</code> <code>+=</code> <code>-=</code> <code>*=</code></div></td>
            <td><span class="prec-assoc-tag prec-assoc-rtl">Right-to-Left</span></td>
            <td>Walrus assignment expression (<code>:=</code>) and assignment operators</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Precedence Code Examples Subcard -->
  <div class="topic-subcard" id="day02PrecedenceCodeSection">
    <div class="subcard-header-with-audio">
      <h4 class="subcard-header-title">Operator Precedence in Action: Key Examples</h4>
    </div>
    <div class="code-block-container">
      <div class="code-subblock">
        <pre><code><span class="code-comment"># 1. Arithmetic Precedence: Multiplication before Addition</span>
calc = 10 + 5 * 2 ** 2          <span class="code-comment"># 2**2=4 -&gt; 5*4=20 -&gt; 10+20=30</span>
print(f"Arithmetic Order:    {calc}")              <span class="code-comment"># Output: 30</span>

<span class="code-comment"># 2. Exponentiation Right-Associativity</span>
exp = 2 ** 3 ** 2               <span class="code-comment"># 3**2=9 -&gt; 2**9=512 (NOT 64!)</span>
print(f"Right-Associative:   {exp}")               <span class="code-comment"># Output: 512</span>

<span class="code-comment"># 3. Bitwise vs Comparison Precedence Trap</span>
<span class="code-comment"># '==' binds higher than '&': (val & 1) == 0 requires parentheses!</span>
val = 8
correct_even = (val &amp; 1) == 0
print(f"Safe Bitwise Check:  {correct_even}")      <span class="code-comment"># Output: True</span>

<span class="code-comment"># 4. Logical Precedence: 'not' &gt; 'and' &gt; 'or'</span>
# Evaluates as: (True and False) or True -&gt; False or True -&gt; True
logic_eval = True <span class="kw">and</span> False <span class="kw">or</span> True
print(f"Logical Evaluation:  {logic_eval}")        <span class="code-comment"># Output: True</span></code></pre>
      </div>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Precedence Rules</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Defensive parentheses</strong>: Explicit parentheses cost 0 nanoseconds of runtime and completely eliminate bugs between bitwise, comparison, and boolean operations.</li>
        <li><strong>Right-associativity</strong>: Exponentiation (<code>**</code>), unary operations (<code>~</code>, <code>-</code>), and assignments (<code>=</code>, <code>:=</code>) evaluate from right to left.</li>
        <li><strong>Precedence tiers</strong>: Parentheses &gt; Exponents &gt; Unary &gt; Multiplicative &gt; Additive &gt; Bitwise &gt; Comparisons &gt; Logical &gt; Assignment.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 09: 14 Critical Production Operator Anti-Patterns ═══ -->
<div class="slide-section" id="day02MistakesSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMistakes">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">⚠️</span> 14 Critical Operator Anti-Patterns in Production</span>
    </span>
  </h2>
  
  <div class="topic-subcard" id="day02MistakesTableSection">
    <div class="table-header-wrap">
      <h4 class="table-header-title">Master Anti-Pattern Review Table</h4>
    </div>
    <div class="db-mock-table-wrap">
      <table class="db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table">
        <thead>
          <tr>
            <th>Buggy Code Pattern</th>
            <th>Runtime Result</th>
            <th>Root Cause / Python Mechanism</th>
            <th>Recommended Production Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="ap-code-bug">2 ** 3 ** 2</code></td>
            <td><span class="ap-result-bad">512</span> (expected 64)</td>
            <td><code>**</code> associates right-to-left: evaluated as <code>2 ** (3 ** 2)</code></td>
            <td><code class="ap-code-fix">(2 ** 3) ** 2</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">not False == False</code></td>
            <td><span class="ap-result-bad">False</span></td>
            <td><code>==</code> has higher precedence than <code>not</code>: <code>not (False == False)</code></td>
            <td><code class="ap-code-fix">(not False) == False</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">-7 // 2</code></td>
            <td><span class="ap-result-bad">-4</span> (not -3)</td>
            <td>Floor division rounds down toward $-\infty$, not toward zero</td>
            <td><code class="ap-code-fix">int(-7 / 2)</code> or <code>math.trunc()</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">-17 % 5</code></td>
            <td><span class="ap-result-bad">3</span> (not -2)</td>
            <td>Python modulo takes the sign of divisor: $-17 = (-4 \times 5) + 3$</td>
            <td><code class="ap-code-fix">math.fmod(-17, 5)</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">x &amp; 1 == 0</code></td>
            <td><span class="ap-result-bad">x &amp; False &rarr; 0</span></td>
            <td>Comparison <code>==</code> binds tighter than bitwise <code>&amp;</code></td>
            <td><code class="ap-code-fix">(x &amp; 1) == 0</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">df[18 &lt;= df.age &lt;= 65]</code></td>
            <td><span class="ap-result-bad">ValueError: ambiguous truth</span></td>
            <td>Chained comparison expands to scalar boolean <code>and</code>, incompatible with Series</td>
            <td><code class="ap-code-fix">df.age.between(18, 65)</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">a = a + [1]</code></td>
            <td><span class="ap-result-bad">Aliases do not update</span></td>
            <td><code>+</code> allocates a new list object; <code>+=</code> mutates existing list in-place</td>
            <td><code class="ap-code-fix">a += [1]</code> or <code>a.append(1)</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">x is y (when x=1000)</code></td>
            <td><span class="ap-result-bad">False</span></td>
            <td>Python only caches small integer singletons from -5 to 256 in memory</td>
            <td><code class="ap-code-fix">x == y</code> (for value equality)</td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">val == None</code></td>
            <td><span class="ap-result-bad">Breaks on NumPy/Pandas</span></td>
            <td><code>__eq__</code> can be overloaded to return array of booleans instead of bool</td>
            <td><code class="ap-code-fix">val is None</code> (PEP 8 standard)</td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">discount = val or 0.10</code></td>
            <td><span class="ap-result-bad">0 overwritten to 0.10</span></td>
            <td><code>0</code> is falsy; <code>or</code> falls back to default even for valid 0% discount</td>
            <td><code class="ap-code-fix">val if val is not None else 0.10</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">x in large_list</code></td>
            <td><span class="ap-result-bad">Slow $O(N)$ linear time</span></td>
            <td>Lists require linear scan through every element</td>
            <td><code class="ap-code-fix">x in set(large_list)</code> ($O(1)$)</td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">True in [1, 2]</code></td>
            <td><span class="ap-result-bad">Returns True</span></td>
            <td>In Python, <code>bool</code> is a subclass of <code>int</code> and <code>True == 1</code></td>
            <td><code class="ap-code-fix">type(x) is bool and x in [...]</code></td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">~5</code></td>
            <td><span class="ap-result-bad">-6</span> (not -5)</td>
            <td>Two's complement bitwise NOT computes $-(x + 1)$</td>
            <td>Understand two's complement inversion</td>
          </tr>
          <tr>
            <td><code class="ap-code-bug">a = b; b = a + b</code></td>
            <td><span class="ap-result-bad">Overwrites a prematurely</span></td>
            <td>Sequential statements mutate <code>a</code> before <code>b</code> calculates the sum</td>
            <td><code class="ap-code-fix">a, b = b, a + b</code> (atomic tuple unpack)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 💡 Key Notes -->
  <div class="py-recall-hook py-keynotes-card">
    <div class="py-keynotes-icon-wrap">💡</div>
    <div class="py-recall-body py-keynotes-body">
      <div class="py-recall-header py-keynotes-header">
        <span class="py-recall-title py-keynotes-title">Key Notes</span>
        <span class="py-recall-tag py-keynotes-tag">Production Best Practices</span>
      </div>
      <ul class="py-keynotes-list">
        <li><strong>Singletons</strong>: Always compare <code>is None</code> rather than <code>== None</code>.</li>
        <li><strong>Falsy defaults</strong>: Avoid <code>val or default</code> if <code>0</code> or <code>False</code> are valid values; use <code>val if val is not None else default</code>.</li>
        <li><strong>Fast lookups</strong>: Always use hash sets or dictionaries for large collection membership testing.</li>
      </ul>
    </div>
  </div>
</div>


<!-- ═══ SECTION 10: Top 25 FAANG Interview Questions ═══ -->
<div class="slide-section" id="day02InterviewSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingInterview">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🎯</span> Top 25 FAANG Interview Questions: Python Operators &amp; Precedence</span>
    </span>
  </h2>

  <div class="interview-box">
    <h4 class="interview-header-title">
      <span>🎯</span> Python Operators, Precedence &amp; Memory Mechanics
    </h4>

    <div id="pyDay02IQ1">
      <p><strong>Q1: Why does <code>2 ** 3 ** 2</code> evaluate to 512 instead of 64?</strong></p>
      <p><em>A: The exponentiation operator (<code>**</code>) is <strong>right-associative</strong>. The rightmost exponent is computed first: <code>3 ** 2 = 9</code>, then <code>2 ** 9 = 512</code>. To compute <code>(2**3)**2 = 64</code>, explicit parentheses must be used.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ2">
      <p><strong>Q2: Why does <code>not False == False</code> evaluate to <code>False</code>?</strong></p>
      <p><em>A: Comparison operators (<code>==</code>) have higher precedence than <code>not</code>. Thus, Python parses the expression as <code>not (False == False)</code> &rarr; <code>not True</code> &rarr; <code>False</code>. If you intend <code>(not False) == False</code>, you must use parentheses.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ3">
      <p><strong>Q3: How does short-circuit evaluation work with <code>and</code> and <code>or</code>?</strong></p>
      <p><em>A: <code>a and b</code> evaluates <code>a</code>; if falsy, it immediately returns <code>a</code> without evaluating <code>b</code>. If truthy, it returns <code>b</code>. <code>a or b</code> evaluates <code>a</code>; if truthy, it immediately returns <code>a</code>. If falsy, it returns <code>b</code>. Neither operator coerces the result to a strict boolean.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ4">
      <p><strong>Q4: How do chained comparisons like <code>10 &lt; x &lt; 20</code> work under the hood?</strong></p>
      <p><em>A: Python translates <code>10 &lt; x &lt; 20</code> to <code>10 &lt; x and x &lt; 20</code>, but evaluates the middle operand <code>x</code> only once. If <code>x</code> is an expensive function call, chained comparison ensures optimal single execution.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ5">
      <p><strong>Q5: What is the Walrus operator (<code>:=</code>), and where is it most useful?</strong></p>
      <p><em>A: Introduced in Python 3.8 (PEP 572), <code>:=</code> assigns a value to a variable within an expression while returning the value. It prevents duplicate computation in <code>while ((chunk := file.read(1024))):</code> and avoids duplicate filtering in list comprehensions.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ6">
      <p><strong>Q6: Why is <code>x &amp; 1 == 0</code> a syntax / precedence trap?</strong></p>
      <p><em>A: Comparison operators (<code>==</code>) have higher precedence than bitwise AND (<code>&amp;</code>). Python parses this as <code>x &amp; (1 == 0)</code> &rarr; <code>x &amp; False</code> &rarr; <code>0</code>. You must write <code>(x &amp; 1) == 0</code> with parentheses.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ7">
      <p><strong>Q7: What is the difference between <code>a = a + [1]</code> and <code>a += [1]</code> on a list?</strong></p>
      <p><em>A: <code>a = a + [1]</code> creates a brand new list in memory and rebinds the variable <code>a</code>. <code>a += [1]</code> calls <code>list.__iadd__()</code>, which extends the existing list in-place without creating a new object.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ8">
      <p><strong>Q8: What does <code>~x</code> (bitwise NOT) do in Python?</strong></p>
      <p><em>A: Python integers use two's complement representation. Bitwise NOT flips all bits, which is mathematically equivalent to <code>-(x + 1)</code>. E.g., <code>~5 == -6</code> and <code>~0 == -1</code>. In sequences, <code>~i</code> is conveniently used to index from the end: <code>a[~i] == a[-1 - i]</code>.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ9">
      <p><strong>Q9: How do you swap two variables without a temporary variable in Python?</strong></p>
      <p><em>A: Use tuple packing and unpacking: <code>a, b = b, a</code>. Python creates a 2-tuple <code>(b, a)</code> on the right-hand side and unpacks it into <code>a</code> and <code>b</code> safely without collision.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ10">
      <p><strong>Q10: What is the difference between <code>and</code> / <code>or</code> and <code>&amp;</code> / <code>|</code>?</strong></p>
      <p><em>A: <code>and</code> and <code>or</code> are logical operators that evaluate truthiness and support short-circuiting. <code>&amp;</code> and <code>|</code> are bitwise operators that operate on integer bits eagerly without short-circuiting.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ11">
      <p><strong>Q11: Why does <code>True in [1, 2]</code> return <code>True</code>?</strong></p>
      <p><em>A: Because <code>bool</code> is a subclass of <code>int</code>, and <code>True == 1</code> is <code>True</code>. The <code>in</code> operator tests equality across elements, and since <code>1 == True</code>, Python matches the first element.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ12">
      <p><strong>Q12: How do you test if a number is a power of 2 using bitwise operators?</strong></p>
      <p><em>A: Use <code>(n &gt; 0) and ((n &amp; (n - 1)) == 0)</code>. A power of 2 has exactly one binary bit set (e.g. <code>8 = 1000_2</code>), and <code>n - 1</code> flips all bits below it (<code>7 = 0111_2</code>). Their bitwise AND is always 0.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ13">
      <p><strong>Q13: What does the ternary operator look like in Python?</strong></p>
      <p><em>A: <code>result = true_value if condition else false_value</code>. Unlike C's <code>cond ? a : b</code>, Python places the truth value first. It also short-circuits: only the branch corresponding to the condition is evaluated.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ14">
      <p><strong>Q14: Why does <code>-7 // 2</code> evaluate to <code>-4</code> instead of <code>-3</code>?</strong></p>
      <p><em>A: Python's floor division rounds down toward negative infinity (<code>-&infin;</code>), not toward zero. <code>-7 / 2 = -3.5</code>, and the floor of <code>-3.5</code> is <code>-4</code>. In C or Java, integer division truncates towards zero, yielding <code>-3</code>.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ15">
      <p><strong>Q15: What is the matrix multiplication operator in Python?</strong></p>
      <p><em>A: The <code>@</code> operator (PEP 465, introduced in Python 3.5). It invokes the <code>__matmul__</code> magic method, heavily utilized by NumPy, SciPy, and PyTorch for tensor and matrix operations.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ16">
      <p><strong>Q16: Why is <code>is</code> not recommended for comparing numbers or strings?</strong></p>
      <p><em>A: <code>is</code> checks object identity (memory address), not value equality. While Python caches small integers (-5 to 256) and interned strings, larger numbers or dynamic strings allocate separate objects, making <code>x is y</code> unreliable for value comparisons.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ17">
      <p><strong>Q17: What is the result of <code>bool([] or () or {} or 0 or "hello")</code>?</strong></p>
      <p><em>A: <code>True</code>. The <code>or</code> chain short-circuits at the first truthy value, which is <code>"hello"</code>. <code>bool("hello")</code> is <code>True</code>.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ18">
      <p><strong>Q18: What is operator overloading, and how is it implemented?</strong></p>
      <p><em>A: Operator overloading allows custom classes to define how built-in operators behave by implementing "dunder" (magic) methods, such as <code>__add__</code> for <code>+</code>, <code>__eq__</code> for <code>==</code>, and <code>__getitem__</code> for <code>[]</code>.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ19">
      <p><strong>Q19: How do left shift (<code>&lt;&lt;</code>) and right shift (<code>&gt;&gt;</code>) relate to arithmetic?</strong></p>
      <p><em>A: <code>x &lt;&lt; n</code> multiplies <code>x</code> by $2^n$ (e.g. <code>3 &lt;&lt; 2 = 12</code>). <code>x &gt;&gt; n</code> performs floor division of <code>x</code> by $2^n$ (e.g. <code>16 &gt;&gt; 2 = 4</code>). Shifts are extremely fast at the hardware CPU level.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ20">
      <p><strong>Q20: What is the difference between <code>==</code> and <code>is</code> when comparing <code>[1, 2]</code> and <code>[1, 2]</code>?</strong></p>
      <p><em>A: <code>[1, 2] == [1, 2]</code> is <code>True</code> because their contents are equal. <code>[1, 2] is [1, 2]</code> is <code>False</code> because list literals allocate two distinct list objects at different RAM addresses.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ21">
      <p><strong>Q21: Why does <code>[0] * 3</code> produce <code>[0, 0, 0]</code>, but <code>[[0]] * 3</code> creates a trap?</strong></p>
      <p><em>A: <code>*</code> creates shallow copies of references. <code>[0] * 3</code> copies immutable integers. But <code>[[0]] * 3</code> duplicates the outer reference to the SAME inner list. Modifying <code>m[0][0] = 99</code> modifies all 3 sublists simultaneously.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ22">
      <p><strong>Q22: Can the Walrus operator be used in an arbitrary statement like <code>x := 5</code>?</strong></p>
      <p><em>A: No. <code>:=</code> cannot be used as a standalone statement; it must be an expression, typically wrapped in parentheses or nested inside a condition/comprehension. Standalone assignment uses standard <code>=</code>.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ23">
      <p><strong>Q23: How do bitwise XOR (<code>^</code>) operations help find a non-duplicated element?</strong></p>
      <p><em>A: Because <code>x ^ x = 0</code> and <code>x ^ 0 = x</code>, XOR is commutative and associative. If an array has every element duplicated except one, XORing all elements cancels all pairs, leaving exactly the unique single element in $O(N)$ time and $O(1)$ space.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ24">
      <p><strong>Q24: What is the time complexity of the <code>in</code> operator across different data structures?</strong></p>
      <p><em>A: $O(N)$ for <code>list</code>, <code>tuple</code>, and <code>str</code> (requires linear scanning). Average $O(1)$ for <code>set</code> and <code>dict</code> (uses hash-table lookup). In large collections, testing membership in a set is orders of magnitude faster.</em></p>
    </div>
    <hr class="interview-divider" />

    <div id="pyDay02IQ25">
      <p><strong>Q25: Why does <code>0.1 + 0.2 == 0.3</code> evaluate to <code>False</code> in Python?</strong></p>
      <p><em>A: Python uses IEEE-754 double-precision floating-point format. In base 2, fractions like 0.1 and 0.2 cannot be represented with finite binary digits, leading to tiny rounding errors: <code>0.1 + 0.2 = 0.30000000000000004</code>. To compare floats safely, use <code>math.isclose(a, b)</code> or the <code>decimal.Decimal</code> module.</em></p>
    </div>
  
  <!-- 🧠 10-Second Recall Hook 10 -->
  <div class="py-recall-hook">
    <div class="py-recall-icon">🧠</div>
    <div class="py-recall-body">
      <div class="py-recall-header">
        <span class="py-recall-title">10-Second Recall Hook</span>
        <span class="py-recall-tag">Interview Mastery</span>
      </div>
      <p class="py-recall-text">
        FAANG interviewers test operator internals to distinguish prompt engineers from foundational systems thinkers. Master the memory pointers behind <code>is</code> vs <code>==</code>, in-place list mutation vs rebinding, and short-circuit operand passthrough.
      </p>
    </div>
  </div>
</div>
</div>
</div>
`;

// Re-assemble the complete py-day-02 object
const updatedDay02 = {
  ...day02,
  slides: [
    {
      id: "slide-1",
      title: "Python Operators, Expressions & Precedence",
      html: slideHtml
    }
  ]
};

// Serialize to JS file
const fileContent = `window.COURSE_CONTENT = window.COURSE_CONTENT || {};
window.COURSE_CONTENT.pyDay02 = ${JSON.stringify(updatedDay02, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, 'public', 'python', 'content', 'py-day-02.js'), fileContent, 'utf8');
fs.writeFileSync(path.join(ROOT, 'python', 'content', 'py-day-02.js'), fileContent, 'utf8');

console.log('Successfully generated public/python/content/py-day-02.js and mirrored to python/content/py-day-02.js');
