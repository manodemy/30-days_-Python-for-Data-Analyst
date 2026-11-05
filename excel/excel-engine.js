/**
 * Manodemy Excel Studio — Production Calculation Engine (excel-engine.js)
 * Standard: Pure Vanilla ES2022, Zero-Dependency, DOM-Free UMD Module
 * Conforms to: MISSION SPECIFICATION v3.2
 *
 * Capabilities:
 * - Tokenizer & Lexer (ranges, quotes, sheet qualifications, operators, scientific numbers)
 * - Pratt Recursive Descent Parser (operator precedence, unary minus tighter than ^)
 * - 45+ Production Business, Statistical, Lookup, Criteria, and Text Functions
 * - Iterative Topological Dependency Graph (DAG) with Dirty Propagation (handles 3,000+ depth without recursion overflow)
 * - Non-blocking Cycle Detection (#CIRCULAR!)
 * - Relative / Absolute ($) Reference Shifter for Fill Handle & Copy/Paste
 * - Serial Date Mathematics (1899-12-30 epoch) & 15-Digit Floating Point Precision
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExcelEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. CONSTANTS, ERRORS & EPSILON SMOOTHING
  // ═════════════════════════════════════════════════════════════════════════

  const ERRORS = {
    DIV0: '#DIV/0!',
    NA: '#N/A',
    NAME: '#NAME?',
    REF: '#REF!',
    VALUE: '#VALUE!',
    NUM: '#NUM!',
    CIRCULAR: '#CIRCULAR!',
    SPILL: '#SPILL!'
  };

  const EPSILON = 1e-12;

  function isError(val) {
    return typeof val === 'string' && (val.startsWith('#') && (val.endsWith('!') || val.endsWith('?') || val === '#N/A'));
  }

  function smoothFloat(n) {
    if (typeof n !== 'number' || isNaN(n) || !isFinite(n)) return n;
    const rounded = Math.round(n);
    if (Math.abs(n - rounded) < EPSILON) return rounded;
    // Format to 12 decimal places to eliminate IEEE 754 float artifacts (e.g. 0.1+0.2 -> 0.3)
    const str = n.toFixed(12);
    return parseFloat(str);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. COORDINATE & RANGE UTILITIES
  // ═════════════════════════════════════════════════════════════════════════

  function colIndexToName(col) {
    let name = '';
    col += 1;
    while (col > 0) {
      const rem = (col - 1) % 26;
      name = String.fromCharCode(65 + rem) + name;
      col = Math.floor((col - 1) / 26);
    }
    return name;
  }

  function colNameToIndex(name) {
    let index = 0;
    const upper = name.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      index = index * 26 + (upper.charCodeAt(i) - 64);
    }
    return index - 1;
  }

  function parseCellCoord(ref) {
    const regex = /^(?:(?:'([^']+)'|([A-Za-z0-9_]+))!)?(\$?)([A-Za-z]+)(\$?)([0-9]+)$/;
    const m = ref.trim().match(regex);
    if (!m) return null;
    const sheet = m[1] || m[2] || null;
    const absCol = m[3] === '$';
    const colStr = m[4].toUpperCase();
    const absRow = m[5] === '$';
    const rowNum = parseInt(m[6], 10);
    return {
      sheet,
      col: colNameToIndex(colStr),
      row: rowNum - 1, // 0-indexed
      absCol,
      absRow,
      rawCol: colStr,
      rawRow: rowNum
    };
  }

  function parseRangeCoord(rangeStr) {
    const parts = rangeStr.trim().split(':');
    if (parts.length === 1) {
      const single = parseCellCoord(parts[0]);
      if (!single) return null;
      return {
        sheet: single.sheet,
        startRow: single.row,
        startCol: single.col,
        endRow: single.row,
        endCol: single.col
      };
    }
    if (parts.length === 2) {
      let sheet = null;
      let p0 = parts[0];
      const sIdx = p0.indexOf('!');
      if (sIdx !== -1) {
        const sPart = p0.substring(0, sIdx);
        sheet = sPart.startsWith("'") && sPart.endsWith("'") ? sPart.slice(1, -1) : sPart;
        p0 = p0.substring(sIdx + 1);
      }
      const c1 = parseCellCoord(p0);
      const c2 = parseCellCoord(parts[1]);
      if (!c1 || !c2) return null;
      return {
        sheet: sheet || c1.sheet || c2.sheet || null,
        startRow: Math.min(c1.row, c2.row),
        startCol: Math.min(c1.col, c2.col),
        endRow: Math.max(c1.row, c2.row),
        endCol: Math.max(c1.col, c2.col)
      };
    }
    return null;
  }

  function formatCellCoord(sheet, col, row, absCol = false, absRow = false) {
    const colStr = (absCol ? '$' : '') + colIndexToName(col);
    const rowStr = (absRow ? '$' : '') + (row + 1);
    const cell = colStr + rowStr;
    if (!sheet) return cell;
    const safeSheet = sheet.includes(' ') ? `'${sheet}'` : sheet;
    return `${safeSheet}!${cell}`;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. TOKENIZER & LEXER
  // ═════════════════════════════════════════════════════════════════════════

  const TOKEN_TYPES = {
    NUMBER: 'NUM',
    STRING: 'STR',
    BOOL: 'BOOL',
    ERROR: 'ERR',
    IDENT: 'ID',
    OP: 'OP',
    COMMA: ',',
    LPAREN: '(',
    RPAREN: ')',
    COLON: ':',
    EOF: 'EOF'
  };

  class Lexer {
    constructor(src) {
      this.src = src.trim();
      if (this.src.startsWith('=')) {
        this.src = this.src.slice(1).trim();
      }
      this.pos = 0;
      this.len = this.src.length;
    }

    peek() {
      return this.pos < this.len ? this.src[this.pos] : '';
    }

    next() {
      return this.pos < this.len ? this.src[this.pos++] : '';
    }

    tokenize() {
      const tokens = [];
      while (this.pos < this.len) {
        const c = this.peek();

        // Whitespace
        if (/\s/.test(c)) {
          this.next();
          continue;
        }

        // Numbers (including decimals and scientific notation like 1E3)
        if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(this.src[this.pos + 1] || ''))) {
          let numStr = '';
          while (this.pos < this.len && /[0-9.]/.test(this.peek())) {
            numStr += this.next();
          }
          if (this.peek().toUpperCase() === 'E') {
            numStr += this.next();
            if (this.peek() === '+' || this.peek() === '-') {
              numStr += this.next();
            }
            while (this.pos < this.len && /[0-9]/.test(this.peek())) {
              numStr += this.next();
            }
          }
          tokens.push({ type: TOKEN_TYPES.NUMBER, val: parseFloat(numStr), raw: numStr });
          continue;
        }

        // String literals with escaped double quotes ""
        if (c === '"') {
          this.next();
          let str = '';
          while (this.pos < this.len) {
            if (this.peek() === '"') {
              this.next();
              if (this.peek() === '"') {
                str += '"';
                this.next();
              } else {
                break;
              }
            } else {
              str += this.next();
            }
          }
          tokens.push({ type: TOKEN_TYPES.STRING, val: str, raw: `"${str}"` });
          continue;
        }

        // Error literals: #DIV/0!, #N/A, #NAME?, #REF!, #VALUE!, #NUM!, #CIRCULAR!, #SPILL!
        if (c === '#') {
          let errId = '';
          while (this.pos < this.len && /[A-Za-z0-9_/?!#]/.test(this.peek())) {
            errId += this.next();
          }
          const upper = errId.toUpperCase();
          tokens.push({ type: TOKEN_TYPES.ERROR, val: upper, raw: errId });
          continue;
        }

        // Quoted Sheet Reference e.g. 'Sales Data'!A1
        if (c === "'") {
          let sheetRef = "'";
          this.next();
          while (this.pos < this.len) {
            const ch = this.next();
            sheetRef += ch;
            if (ch === "'") break;
          }
          if (this.peek() === '!') {
            sheetRef += this.next();
            while (this.pos < this.len && /[A-Za-z0-9_$.]/.test(this.peek())) {
              sheetRef += this.next();
            }
          }
          tokens.push({ type: TOKEN_TYPES.IDENT, val: sheetRef, raw: sheetRef });
          continue;
        }

        // Identifiers, Cell References, Function Names
        if (/[A-Za-z_$]/.test(c)) {
          let id = '';
          while (this.pos < this.len && /[A-Za-z0-9_$.!]/.test(this.peek())) {
            id += this.next();
          }
          const upper = id.toUpperCase();
          if (upper === 'TRUE') {
            tokens.push({ type: TOKEN_TYPES.BOOL, val: true, raw: id });
          } else if (upper === 'FALSE') {
            tokens.push({ type: TOKEN_TYPES.BOOL, val: false, raw: id });
          } else {
            tokens.push({ type: TOKEN_TYPES.IDENT, val: id, raw: id });
          }
          continue;
        }

        // Operators
        if (['+', '-', '*', '/', '^', '%', '&', '=', '<', '>'].includes(c)) {
          let op = this.next();
          const nextC = this.peek();
          if ((op === '<' || op === '>') && ['=', '>'].includes(nextC)) {
            op += this.next();
          }
          tokens.push({ type: TOKEN_TYPES.OP, val: op, raw: op });
          continue;
        }

        if (c === '(') { tokens.push({ type: TOKEN_TYPES.LPAREN, val: '(', raw: '(' }); this.next(); continue; }
        if (c === ')') { tokens.push({ type: TOKEN_TYPES.RPAREN, val: ')', raw: ')' }); this.next(); continue; }
        if (c === ',') { tokens.push({ type: TOKEN_TYPES.COMMA, val: ',', raw: ',' }); this.next(); continue; }
        if (c === ':') { tokens.push({ type: TOKEN_TYPES.COLON, val: ':', raw: ':' }); this.next(); continue; }

        this.next();
      }
      tokens.push({ type: TOKEN_TYPES.EOF, val: '', raw: '' });
      return tokens;
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. PRATT RECURSIVE DESCENT PARSER
  // ═════════════════════════════════════════════════════════════════════════

  const PRECEDENCE = {
    '=': 1, '<>': 1, '<': 1, '<=': 1, '>': 1, '>=': 1,
    '&': 2,
    '+': 3, '-': 3,
    '*': 4, '/': 4,
    '^': 5,
    '%': 6
  };

  class PrattParser {
    constructor(tokens) {
      this.tokens = tokens;
      this.pos = 0;
      this.nestingDepth = 0;
    }

    peek() {
      return this.tokens[this.pos] || { type: TOKEN_TYPES.EOF };
    }

    next() {
      return this.tokens[this.pos++];
    }

    parse() {
      if (this.peek().type === TOKEN_TYPES.EOF) {
        return { type: 'Literal', value: '' };
      }
      return this.parseExpression(0);
    }

    parseExpression(rbp = 0) {
      if (++this.nestingDepth > 64) {
        throw new Error(ERRORS.VALUE);
      }
      let token = this.next();
      let left = this.nud(token);

      while (rbp < this.getLedPrecedence(this.peek())) {
        token = this.next();
        left = this.led(token, left);
      }
      this.nestingDepth--;
      return left;
    }

    getLedPrecedence(token) {
      if (token.type === TOKEN_TYPES.OP) return PRECEDENCE[token.val] || 0;
      if (token.type === TOKEN_TYPES.COLON) return 8; // Highest binding for ranges
      return 0;
    }

    nud(token) {
      if (token.type === TOKEN_TYPES.NUMBER || token.type === TOKEN_TYPES.STRING || token.type === TOKEN_TYPES.BOOL) {
        return { type: 'Literal', value: token.val };
      }

      if (token.type === TOKEN_TYPES.ERROR) {
        return { type: 'Literal', value: token.val };
      }

      // Prefix Unary Operators (+, -)
      // Excel quirk: Unary minus binds tighter than ^ (e.g. -2^2 = 4)
      if (token.type === TOKEN_TYPES.OP && (token.val === '+' || token.val === '-')) {
        const arg = this.parseExpression(7);
        return { type: 'UnaryOp', op: token.val, arg };
      }

      // Grouping Parentheses
      if (token.type === TOKEN_TYPES.LPAREN) {
        const expr = this.parseExpression(0);
        if (this.peek().type === TOKEN_TYPES.RPAREN) {
          this.next();
        }
        return expr;
      }

      // Function Call or Cell Reference
      if (token.type === TOKEN_TYPES.IDENT) {
        if (this.peek().type === TOKEN_TYPES.LPAREN) {
          this.next();
          const args = [];
          if (this.peek().type !== TOKEN_TYPES.RPAREN) {
            while (true) {
              args.push(this.parseExpression(0));
              if (this.peek().type === TOKEN_TYPES.COMMA) {
                this.next();
              } else {
                break;
              }
            }
          }
          if (this.peek().type === TOKEN_TYPES.RPAREN) {
            this.next();
          }
          return { type: 'FunctionCall', name: token.val.toUpperCase(), args };
        }

        return { type: 'CellRef', ref: token.val };
      }

      throw new Error(ERRORS.VALUE);
    }

    led(token, left) {
      if (token.type === TOKEN_TYPES.COLON) {
        const right = this.parseExpression(8);
        return { type: 'RangeRef', start: left, end: right };
      }

      if (token.type === TOKEN_TYPES.OP && token.val === '%') {
        return { type: 'UnaryPostfix', op: '%', arg: left };
      }

      if (token.type === TOKEN_TYPES.OP) {
        const p = PRECEDENCE[token.val];
        const right = this.parseExpression(p);
        return { type: 'BinaryOp', op: token.val, left, right };
      }

      throw new Error(ERRORS.VALUE);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 5. SERIAL DATE MATHEMATICS & COMPARISONS
  // ═════════════════════════════════════════════════════════════════════════

  const MS_PER_DAY = 86400000;
  const EXCEL_EPOCH = Date.UTC(1899, 11, 30);

  function dateToSerial(year, month, day) {
    const utc = Date.UTC(year, month - 1, day);
    return Math.round((utc - EXCEL_EPOCH) / MS_PER_DAY);
  }

  function serialToDate(serial) {
    const utc = EXCEL_EPOCH + Math.round(serial) * MS_PER_DAY;
    const d = new Date(utc);
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate()
    };
  }

  function compareExcelValues(left, right, op) {
    function getType(v) {
      if (typeof v === 'boolean') return 3;
      if (typeof v === 'string') return 2;
      if (typeof v === 'number' && !isNaN(v)) return 1;
      return 0; // blank/null
    }

    let l = left;
    let r = right;

    if (l === null || l === undefined || l === '') {
      if (typeof r === 'number') l = 0;
      else if (typeof r === 'string') l = '';
      else if (typeof r === 'boolean') l = false;
      else l = 0;
    }
    if (r === null || r === undefined || r === '') {
      if (typeof l === 'number') r = 0;
      else if (typeof l === 'string') r = '';
      else if (typeof l === 'boolean') r = false;
      else r = 0;
    }

    const t1 = getType(l);
    const t2 = getType(r);

    let cmp = 0;
    if (t1 !== t2) {
      // Excel standard type ordering: Number < Text < Boolean
      cmp = t1 < t2 ? -1 : 1;
    } else if (t1 === 1) {
      cmp = l < r ? -1 : (l > r ? 1 : 0);
    } else if (t1 === 2) {
      const s1 = String(l).toLowerCase();
      const s2 = String(r).toLowerCase();
      cmp = s1 < s2 ? -1 : (s1 > s2 ? 1 : 0);
    } else if (t1 === 3) {
      const b1 = l ? 1 : 0;
      const b2 = r ? 1 : 0;
      cmp = b1 < b2 ? -1 : (b1 > b2 ? 1 : 0);
    }

    if (op === '=') return cmp === 0;
    if (op === '<>' || op === '!=') return cmp !== 0;
    if (op === '<') return cmp < 0;
    if (op === '<=') return cmp <= 0;
    if (op === '>') return cmp > 0;
    if (op === '>=') return cmp >= 0;
    return false;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 6. FUNCTION REGISTRY (45 EXACT CURRICULUM FUNCTIONS)
  // ═════════════════════════════════════════════════════════════════════════

  function flattenValues(args) {
    const result = [];
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const sub of arg) {
          if (Array.isArray(sub)) {
            result.push(...sub);
          } else {
            result.push(sub);
          }
        }
      } else {
        result.push(arg);
      }
    }
    return result;
  }

  function coerceNumber(val) {
    if (val === null || val === undefined || val === '') return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 1 : 0;
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/,/g, ''));
      if (!isNaN(parsed)) return parsed;
    }
    return NaN;
  }

  function matchCriteria(cellVal, criteria) {
    if (criteria === undefined || criteria === null) return false;
    const critStr = String(criteria).trim();

    const m = critStr.match(/^([<>=!]+)(.*)$/);
    if (m) {
      const op = m[1];
      const targetStr = m[2].trim();
      const numCell = coerceNumber(cellVal);
      const numTarget = parseFloat(targetStr);

      if (!isNaN(numCell) && !isNaN(numTarget)) {
        return compareExcelValues(numCell, numTarget, op);
      }
      return compareExcelValues(cellVal, targetStr, op);
    }

    if (critStr.includes('*') || critStr.includes('?')) {
      const pattern = '^' + critStr.replace(/([.+^$[\]\\(){}|])/g, '\\$1')
                                  .replace(/\*/g, '.*')
                                  .replace(/\?/g, '.') + '$';
      const reg = new RegExp(pattern, 'i');
      return reg.test(String(cellVal || ''));
    }

    return compareExcelValues(cellVal, criteria, '=');
  }

  const FUNCTION_REGISTRY = {
    // ── Math & Stat ──────────────────────────────────────────────────────────
    SUM: (args) => {
      const nums = flattenValues(args).map(coerceNumber).filter(n => !isNaN(n));
      return smoothFloat(nums.reduce((a, b) => a + b, 0));
    },

    AVERAGE: (args) => {
      // Excel standard: AVERAGE skips empty/null cells
      const nums = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v));
      if (nums.length === 0) return ERRORS.DIV0;
      return smoothFloat(nums.reduce((a, b) => a + b, 0) / nums.length);
    },

    MIN: (args) => {
      const nums = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v));
      if (nums.length === 0) return 0;
      return Math.min(...nums);
    },

    MAX: (args) => {
      const nums = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v));
      if (nums.length === 0) return 0;
      return Math.max(...nums);
    },

    COUNT: (args) => {
      const vals = flattenValues(args);
      return vals.filter(v => typeof v === 'number' && !isNaN(v)).length;
    },

    COUNTA: (args) => {
      const vals = flattenValues(args);
      return vals.filter(v => v !== null && v !== undefined && v !== '').length;
    },

    COUNTBLANK: (args) => {
      const vals = flattenValues(args);
      return vals.filter(v => v === null || v === undefined || v === '').length;
    },

    ROUND: ([val, digits]) => {
      const n = coerceNumber(val);
      const d = coerceNumber(digits) || 0;
      if (isNaN(n)) return ERRORS.VALUE;
      const factor = Math.pow(10, d);
      return smoothFloat(Math.round(n * factor) / factor);
    },

    ROUNDUP: ([val, digits]) => {
      const n = coerceNumber(val);
      const d = coerceNumber(digits) || 0;
      if (isNaN(n)) return ERRORS.VALUE;
      const factor = Math.pow(10, d);
      return smoothFloat(Math.ceil(n * factor) / factor);
    },

    ROUNDDOWN: ([val, digits]) => {
      const n = coerceNumber(val);
      const d = coerceNumber(digits) || 0;
      if (isNaN(n)) return ERRORS.VALUE;
      const factor = Math.pow(10, d);
      return smoothFloat(Math.floor(n * factor) / factor);
    },

    ABS: ([val]) => {
      const n = coerceNumber(val);
      return isNaN(n) ? ERRORS.VALUE : Math.abs(n);
    },

    INT: ([val]) => {
      const n = coerceNumber(val);
      return isNaN(n) ? ERRORS.VALUE : Math.floor(n);
    },

    MOD: ([num, divisor]) => {
      const n = coerceNumber(num);
      const d = coerceNumber(divisor);
      if (d === 0) return ERRORS.DIV0;
      return smoothFloat(((n % d) + d) % d);
    },

    LARGE: ([array, k]) => {
      const nums = flattenValues([array]).filter(v => typeof v === 'number' && !isNaN(v));
      const pos = Math.floor(coerceNumber(k));
      if (pos < 1 || pos > nums.length) return ERRORS.NUM;
      nums.sort((a, b) => b - a);
      return nums[pos - 1];
    },

    SMALL: ([array, k]) => {
      const nums = flattenValues([array]).filter(v => typeof v === 'number' && !isNaN(v));
      const pos = Math.floor(coerceNumber(k));
      if (pos < 1 || pos > nums.length) return ERRORS.NUM;
      nums.sort((a, b) => a - b);
      return nums[pos - 1];
    },

    SUMPRODUCT: (args) => {
      if (args.length === 0) return 0;
      const arrays = args.map(a => (Array.isArray(a) ? a.flat(Infinity) : [a]));
      const len = arrays[0].length;
      for (const arr of arrays) {
        if (arr.length !== len) return ERRORS.VALUE;
      }
      let total = 0;
      for (let i = 0; i < len; i++) {
        let prod = 1;
        for (let j = 0; j < arrays.length; j++) {
          prod *= (coerceNumber(arrays[j][i]) || 0);
        }
        total += prod;
      }
      return smoothFloat(total);
    },

    // ── Criteria Functions ───────────────────────────────────────────────────
    SUMIF: ([range, criteria, sumRange]) => {
      const rangeVals = Array.isArray(range) ? range.flat(Infinity) : [range];
      const sumVals = sumRange !== undefined ? (Array.isArray(sumRange) ? sumRange.flat(Infinity) : [sumRange]) : rangeVals;
      let sum = 0;
      const len = Math.min(rangeVals.length, sumVals.length);
      for (let i = 0; i < len; i++) {
        if (matchCriteria(rangeVals[i], criteria)) {
          sum += (coerceNumber(sumVals[i]) || 0);
        }
      }
      return smoothFloat(sum);
    },

    SUMIFS: ([sumRange, ...pairs]) => {
      const sumVals = Array.isArray(sumRange) ? sumRange.flat(Infinity) : [sumRange];
      const critRanges = [];
      const criteriaList = [];
      for (let p = 0; p < pairs.length; p += 2) {
        critRanges.push(Array.isArray(pairs[p]) ? pairs[p].flat(Infinity) : [pairs[p]]);
        criteriaList.push(pairs[p + 1]);
      }
      let sum = 0;
      const numPairs = critRanges.length;
      for (let i = 0; i < sumVals.length; i++) {
        let allMatch = true;
        for (let p = 0; p < numPairs; p++) {
          if (!matchCriteria(critRanges[p][i], criteriaList[p])) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) {
          sum += (coerceNumber(sumVals[i]) || 0);
        }
      }
      return smoothFloat(sum);
    },

    COUNTIF: ([range, criteria]) => {
      const rangeVals = Array.isArray(range) ? range.flat(Infinity) : [range];
      let count = 0;
      for (let i = 0; i < rangeVals.length; i++) {
        if (matchCriteria(rangeVals[i], criteria)) count++;
      }
      return count;
    },

    COUNTIFS: (pairs) => {
      if (pairs.length < 2) return 0;
      const critRanges = [];
      const criteriaList = [];
      for (let p = 0; p < pairs.length; p += 2) {
        critRanges.push(Array.isArray(pairs[p]) ? pairs[p].flat(Infinity) : [pairs[p]]);
        criteriaList.push(pairs[p + 1]);
      }
      let count = 0;
      const len = critRanges[0].length;
      const numPairs = critRanges.length;
      for (let i = 0; i < len; i++) {
        let allMatch = true;
        for (let p = 0; p < numPairs; p++) {
          if (!matchCriteria(critRanges[p][i], criteriaList[p])) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) count++;
      }
      return count;
    },

    AVERAGEIF: ([range, criteria, avgRange]) => {
      const rangeVals = Array.isArray(range) ? range.flat(Infinity) : [range];
      const avgVals = avgRange !== undefined ? (Array.isArray(avgRange) ? avgRange.flat(Infinity) : [avgRange]) : rangeVals;
      let sum = 0;
      let count = 0;
      const len = Math.min(rangeVals.length, avgVals.length);
      for (let i = 0; i < len; i++) {
        if (matchCriteria(rangeVals[i], criteria)) {
          sum += (coerceNumber(avgVals[i]) || 0);
          count++;
        }
      }
      if (count === 0) return ERRORS.DIV0;
      return smoothFloat(sum / count);
    },

    AVERAGEIFS: ([avgRange, ...pairs]) => {
      const avgVals = Array.isArray(avgRange) ? avgRange.flat(Infinity) : [avgRange];
      const critRanges = [];
      const criteriaList = [];
      for (let p = 0; p < pairs.length; p += 2) {
        critRanges.push(Array.isArray(pairs[p]) ? pairs[p].flat(Infinity) : [pairs[p]]);
        criteriaList.push(pairs[p + 1]);
      }
      let sum = 0;
      let count = 0;
      const numPairs = critRanges.length;
      for (let i = 0; i < avgVals.length; i++) {
        let allMatch = true;
        for (let p = 0; p < numPairs; p++) {
          if (!matchCriteria(critRanges[p][i], criteriaList[p])) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) {
          sum += (coerceNumber(avgVals[i]) || 0);
          count++;
        }
      }
      if (count === 0) return ERRORS.DIV0;
      return smoothFloat(sum / count);
    },

    // ── Logical ──────────────────────────────────────────────────────────────
    IF: ([condition, valIfTrue, valIfFalse]) => {
      const cond = Boolean(condition);
      if (cond) return valIfTrue !== undefined ? valIfTrue : true;
      return valIfFalse !== undefined ? valIfFalse : false;
    },

    IFS: (args) => {
      for (let i = 0; i < args.length; i += 2) {
        if (Boolean(args[i])) {
          return args[i + 1];
        }
      }
      return ERRORS.NA;
    },

    SWITCH: ([expr, ...cases]) => {
      for (let i = 0; i < cases.length - 1; i += 2) {
        if (expr === cases[i]) return cases[i + 1];
      }
      if (cases.length % 2 === 1) return cases[cases.length - 1];
      return ERRORS.NA;
    },

    AND: (args) => {
      const vals = flattenValues(args);
      if (vals.length === 0) return ERRORS.VALUE;
      return vals.every(v => Boolean(v));
    },

    OR: (args) => {
      const vals = flattenValues(args);
      if (vals.length === 0) return ERRORS.VALUE;
      return vals.some(v => Boolean(v));
    },

    NOT: ([arg]) => !Boolean(arg),

    IFERROR: ([val, fallback]) => {
      return isError(val) ? fallback : val;
    },

    TRUE: () => true,
    FALSE: () => false,

    // ── Lookup & References ──────────────────────────────────────────────────
    XLOOKUP: ([lookupVal, lookupArr, returnArr, ifNotFound, matchMode = 0]) => {
      const lookups = Array.isArray(lookupArr) ? lookupArr.flat(Infinity) : [lookupArr];
      const returns = Array.isArray(returnArr) ? returnArr.flat(Infinity) : [returnArr];

      const sLookup = String(lookupVal).trim().toLowerCase();
      const nLookup = parseFloat(lookupVal);

      for (let i = 0; i < lookups.length; i++) {
        const item = lookups[i];
        const sItem = String(item).trim().toLowerCase();
        const nItem = parseFloat(item);

        let matched = false;
        if (!isNaN(nLookup) && !isNaN(nItem)) {
          matched = nLookup === nItem;
        } else {
          matched = sLookup === sItem;
        }

        if (matched) {
          return returns[i] !== undefined ? returns[i] : null;
        }
      }
      return ifNotFound !== undefined ? ifNotFound : ERRORS.NA;
    },

    VLOOKUP: ([lookupVal, tableRange, colIdx, exactMatch = true]) => {
      if (!Array.isArray(tableRange) || tableRange.length === 0) return ERRORS.NA;
      const cIdx = Math.floor(coerceNumber(colIdx)) - 1;

      const sLookup = String(lookupVal).trim().toLowerCase();
      const nLookup = parseFloat(lookupVal);

      for (let r = 0; r < tableRange.length; r++) {
        const row = tableRange[r];
        const firstCell = Array.isArray(row) ? row[0] : row;
        const sFirst = String(firstCell).trim().toLowerCase();
        const nFirst = parseFloat(firstCell);

        let matched = false;
        if (!isNaN(nLookup) && !isNaN(nFirst)) {
          matched = nLookup === nFirst;
        } else {
          matched = sLookup === sFirst;
        }

        if (matched) {
          return (Array.isArray(row) && row[cIdx] !== undefined) ? row[cIdx] : ERRORS.REF;
        }
      }
      return ERRORS.NA;
    },

    HLOOKUP: ([lookupVal, tableRange, rowIdx, exactMatch = true]) => {
      if (!Array.isArray(tableRange) || tableRange.length === 0) return ERRORS.NA;
      const rIdx = Math.floor(coerceNumber(rowIdx)) - 1;
      if (rIdx < 0 || rIdx >= tableRange.length) return ERRORS.REF;

      const firstRow = tableRange[0];
      const sLookup = String(lookupVal).trim().toLowerCase();
      const nLookup = parseFloat(lookupVal);

      for (let c = 0; c < firstRow.length; c++) {
        const cell = firstRow[c];
        const sCell = String(cell).trim().toLowerCase();
        const nCell = parseFloat(cell);

        let matched = false;
        if (!isNaN(nLookup) && !isNaN(nCell)) {
          matched = nLookup === nCell;
        } else {
          matched = sLookup === sCell;
        }

        if (matched) {
          return tableRange[rIdx][c] !== undefined ? tableRange[rIdx][c] : ERRORS.REF;
        }
      }
      return ERRORS.NA;
    },

    INDEX: ([range, rowNum, colNum]) => {
      if (!Array.isArray(range)) return range;
      const r = Math.floor(coerceNumber(rowNum)) - 1;
      const c = colNum !== undefined ? Math.floor(coerceNumber(colNum)) - 1 : 0;

      if (!Array.isArray(range[0])) {
        return range[r] !== undefined ? range[r] : ERRORS.REF;
      }
      if (range[r] !== undefined && range[r][c] !== undefined) {
        return range[r][c];
      }
      return ERRORS.REF;
    },

    MATCH: ([lookupVal, lookupRange, matchType = 1]) => {
      const items = Array.isArray(lookupRange) ? lookupRange.flat(Infinity) : [lookupRange];
      const sLookup = String(lookupVal).trim().toLowerCase();
      const nLookup = parseFloat(lookupVal);

      for (let i = 0; i < items.length; i++) {
        const cell = items[i];
        const sCell = String(cell).trim().toLowerCase();
        const nCell = parseFloat(cell);

        let matched = false;
        if (!isNaN(nLookup) && !isNaN(nCell)) {
          matched = nLookup === nCell;
        } else {
          matched = sLookup === sCell;
        }
        if (matched) return i + 1;
      }
      return ERRORS.NA;
    },

    // ── Text Functions ───────────────────────────────────────────────────────
    LEFT: ([text, numChars = 1]) => {
      const s = String(text || '');
      const n = Math.floor(coerceNumber(numChars));
      return s.substring(0, Math.max(0, n));
    },

    RIGHT: ([text, numChars = 1]) => {
      const s = String(text || '');
      const n = Math.floor(coerceNumber(numChars));
      return s.substring(Math.max(0, s.length - n));
    },

    MID: ([text, startPos, numChars]) => {
      const s = String(text || '');
      const start = Math.floor(coerceNumber(startPos)) - 1;
      const len = Math.floor(coerceNumber(numChars));
      if (start < 0) return ERRORS.VALUE;
      return s.substring(start, start + len);
    },

    LEN: ([text]) => String(text || '').length,

    TRIM: ([text]) => String(text || '').trim().replace(/\s+/g, ' '),

    UPPER: ([text]) => String(text || '').toUpperCase(),

    LOWER: ([text]) => String(text || '').toLowerCase(),

    PROPER: ([text]) => {
      return String(text || '').split(/\s+/).map(w => {
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      }).join(' ');
    },

    CONCAT: (args) => flattenValues(args).join(''),
    CONCATENATE: (args) => flattenValues(args).join(''),

    TEXTJOIN: ([delimiter, ignoreEmpty, ...textArgs]) => {
      const delim = String(delimiter || '');
      const ign = Boolean(ignoreEmpty);
      const vals = flattenValues(textArgs);
      const filtered = ign ? vals.filter(v => v !== null && v !== undefined && v !== '') : vals;
      return filtered.join(delim);
    },

    SUBSTITUTE: ([text, oldText, newText, instanceNum]) => {
      const s = String(text || '');
      const target = String(oldText || '');
      const rep = String(newText || '');
      if (instanceNum === undefined) {
        return s.split(target).join(rep);
      }
      const inst = Math.floor(coerceNumber(instanceNum));
      let count = 0;
      return s.replace(new RegExp(target.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'), match => {
        count++;
        return count === inst ? rep : match;
      });
    },

    TEXT: ([val, formatStr]) => {
      const n = coerceNumber(val);
      const fmt = String(formatStr || '').toLowerCase();
      if (isNaN(n)) return String(val);
      if (fmt === '0') return Math.round(n).toString();
      if (fmt === '0.00') return n.toFixed(2);
      if (fmt === '#,##0') return Math.round(n).toLocaleString('en-US');
      if (fmt === '0%') return `${Math.round(n * 100)}%`;
      if (fmt === 'yyyy-mm-dd') {
        const d = serialToDate(n);
        return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
      }
      return n.toString();
    },

    // ── Date Functions ───────────────────────────────────────────────────────
    TODAY: () => {
      const now = new Date();
      return dateToSerial(now.getFullYear(), now.getMonth() + 1, now.getDate());
    },

    DATE: ([year, month, day]) => {
      const y = Math.floor(coerceNumber(year));
      const m = Math.floor(coerceNumber(month));
      const d = Math.floor(coerceNumber(day));
      return dateToSerial(y, m, d);
    },

    YEAR: ([serial]) => {
      const s = coerceNumber(serial);
      if (isNaN(s)) return ERRORS.VALUE;
      return serialToDate(s).year;
    },

    MONTH: ([serial]) => {
      const s = coerceNumber(serial);
      if (isNaN(s)) return ERRORS.VALUE;
      return serialToDate(s).month;
    },

    DAY: ([serial]) => {
      const s = coerceNumber(serial);
      if (isNaN(s)) return ERRORS.VALUE;
      return serialToDate(s).day;
    },

    // ── Tier 3 Dynamic Arrays ────────────────────────────────────────────────
    UNIQUE: ([range]) => {
      const arr = Array.isArray(range) ? range.flat(Infinity) : [range];
      const seen = new Set();
      const result = [];
      for (const item of arr) {
        if (!seen.has(item)) {
          seen.add(item);
          result.push([item]);
        }
      }
      return result;
    },

    SORT: ([range, sortCol = 1, sortOrder = 1]) => {
      if (!Array.isArray(range)) return [[range]];
      const rows = Array.isArray(range[0]) ? [...range] : range.map(r => [r]);
      const c = Math.floor(coerceNumber(sortCol)) - 1;
      const asc = coerceNumber(sortOrder) >= 0;
      rows.sort((a, b) => {
        const vA = a[c];
        const vB = b[c];
        if (typeof vA === 'number' && typeof vB === 'number') return asc ? vA - vB : vB - vA;
        return asc ? String(vA).localeCompare(String(vB)) : String(vB).localeCompare(String(vA));
      });
      return rows;
    },

    // ── Stage 0A Formula Extensions ──────────────────────────────────────────
    IFNA: ([val, fallback]) => {
      return val === ERRORS.NA ? fallback : val;
    },

    MAXIFS: ([maxRange, ...pairs]) => {
      const maxVals = Array.isArray(maxRange) ? maxRange.flat(Infinity) : [maxRange];
      const critRanges = [];
      const criteriaList = [];
      for (let p = 0; p < pairs.length; p += 2) {
        critRanges.push(Array.isArray(pairs[p]) ? pairs[p].flat(Infinity) : [pairs[p]]);
        criteriaList.push(pairs[p + 1]);
      }
      const nums = [];
      for (let i = 0; i < maxVals.length; i++) {
        let allMatch = true;
        for (let p = 0; p < critRanges.length; p++) {
          if (!matchCriteria(critRanges[p][i], criteriaList[p])) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) {
          const n = coerceNumber(maxVals[i]);
          if (!isNaN(n)) nums.push(n);
        }
      }
      return nums.length > 0 ? Math.max(...nums) : 0;
    },

    MINIFS: ([minRange, ...pairs]) => {
      const minVals = Array.isArray(minRange) ? minRange.flat(Infinity) : [minRange];
      const critRanges = [];
      const criteriaList = [];
      for (let p = 0; p < pairs.length; p += 2) {
        critRanges.push(Array.isArray(pairs[p]) ? pairs[p].flat(Infinity) : [pairs[p]]);
        criteriaList.push(pairs[p + 1]);
      }
      const nums = [];
      for (let i = 0; i < minVals.length; i++) {
        let allMatch = true;
        for (let p = 0; p < critRanges.length; p++) {
          if (!matchCriteria(critRanges[p][i], criteriaList[p])) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) {
          const n = coerceNumber(minVals[i]);
          if (!isNaN(n)) nums.push(n);
        }
      }
      return nums.length > 0 ? Math.min(...nums) : 0;
    },

    EDATE: ([startSerial, months]) => {
      const s = coerceNumber(startSerial);
      const m = Math.floor(coerceNumber(months));
      if (isNaN(s) || isNaN(m)) return ERRORS.VALUE;
      const d = serialToDate(s);
      const jsDate = new Date(Date.UTC(d.year, d.month - 1 + m, d.day));
      return dateToSerial(jsDate.getUTCFullYear(), jsDate.getUTCMonth() + 1, jsDate.getUTCDate());
    },

    EOMONTH: ([startSerial, months]) => {
      const s = coerceNumber(startSerial);
      const m = Math.floor(coerceNumber(months));
      if (isNaN(s) || isNaN(m)) return ERRORS.VALUE;
      const d = serialToDate(s);
      const jsDate = new Date(Date.UTC(d.year, d.month + m, 0));
      return dateToSerial(jsDate.getUTCFullYear(), jsDate.getUTCMonth() + 1, jsDate.getUTCDate());
    },

    WORKDAY: ([startSerial, daysToAdd, holidays]) => {
      const s = coerceNumber(startSerial);
      let days = Math.floor(coerceNumber(daysToAdd));
      if (isNaN(s) || isNaN(days)) return ERRORS.VALUE;
      const hSet = new Set(flattenValues([holidays]).map(coerceNumber).filter(n => !isNaN(n)));
      let curr = s;
      const step = days >= 0 ? 1 : -1;
      let remaining = Math.abs(days);
      while (remaining > 0) {
        curr += step;
        const d = serialToDate(curr);
        const dayOfWeek = new Date(Date.UTC(d.year, d.month - 1, d.day)).getUTCDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !hSet.has(curr)) {
          remaining--;
        }
      }
      return curr;
    },

    NETWORKDAYS: ([startSerial, endSerial, holidays]) => {
      let s1 = coerceNumber(startSerial);
      let s2 = coerceNumber(endSerial);
      if (isNaN(s1) || isNaN(s2)) return ERRORS.VALUE;
      const hSet = new Set(flattenValues([holidays]).map(coerceNumber).filter(n => !isNaN(n)));
      const sign = s2 >= s1 ? 1 : -1;
      const start = Math.min(s1, s2);
      const end = Math.max(s1, s2);
      let count = 0;
      for (let c = start; c <= end; c++) {
        const d = serialToDate(c);
        const dayOfWeek = new Date(Date.UTC(d.year, d.month - 1, d.day)).getUTCDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !hSet.has(c)) {
          count++;
        }
      }
      return count * sign;
    },

    'NETWORKDAYS.INTL': ([startSerial, endSerial, weekend = 1, holidays]) => {
      let s1 = coerceNumber(startSerial);
      let s2 = coerceNumber(endSerial);
      if (isNaN(s1) || isNaN(s2)) return ERRORS.VALUE;
      const hSet = new Set(flattenValues([holidays]).map(coerceNumber).filter(n => !isNaN(n)));
      const sign = s2 >= s1 ? 1 : -1;
      const start = Math.min(s1, s2);
      const end = Math.max(s1, s2);
      let isWeekendFn = (dow) => (dow === 0 || dow === 6);
      if (typeof weekend === 'string' && weekend.length === 7) {
        isWeekendFn = (dow) => {
          const idx = dow === 0 ? 6 : dow - 1;
          return weekend[idx] === '1';
        };
      } else if (typeof weekend === 'number') {
        if (weekend === 1) isWeekendFn = (dow) => (dow === 0 || dow === 6);
        else if (weekend === 2) isWeekendFn = (dow) => (dow === 0 || dow === 1);
        else if (weekend === 11) isWeekendFn = (dow) => (dow === 0);
      }
      let count = 0;
      for (let c = start; c <= end; c++) {
        const d = serialToDate(c);
        const dow = new Date(Date.UTC(d.year, d.month - 1, d.day)).getUTCDay();
        if (!isWeekendFn(dow) && !hSet.has(c)) {
          count++;
        }
      }
      return count * sign;
    },

    YEARFRAC: ([startSerial, endSerial, basis = 0]) => {
      const s1 = coerceNumber(startSerial);
      const s2 = coerceNumber(endSerial);
      if (isNaN(s1) || isNaN(s2)) return ERRORS.VALUE;
      const diff = Math.abs(s2 - s1);
      const b = Math.floor(coerceNumber(basis));
      if (b === 1 || b === 3) return smoothFloat(diff / 365);
      return smoothFloat(diff / 360);
    },

    TEXTSPLIT: ([text, colDelim, rowDelim]) => {
      const s = String(text || '');
      const cd = colDelim !== undefined ? String(colDelim) : ',';
      if (rowDelim !== undefined) {
        const rd = String(rowDelim);
        return s.split(rd).map(r => r.split(cd));
      }
      return [s.split(cd)];
    },

    CLEAN: ([text]) => String(text || '').replace(/[\x00-\x1F\x7F-\x9F]/g, ''),

    VALUE: ([text]) => {
      const n = parseFloat(String(text || '').replace(/[\$,]/g, '').trim());
      return isNaN(n) ? ERRORS.VALUE : n;
    },

    SUBTOTAL: ([fnNum, ...ranges]) => {
      const code = Math.floor(coerceNumber(fnNum));
      const vals = flattenValues(ranges).filter(v => typeof v === 'number' && !isNaN(v));
      if (code === 9 || code === 109) return smoothFloat(vals.reduce((a, b) => a + b, 0));
      if (code === 1 || code === 101) return vals.length ? smoothFloat(vals.reduce((a, b) => a + b, 0) / vals.length) : ERRORS.DIV0;
      if (code === 2 || code === 102) return vals.length;
      if (code === 4 || code === 104) return vals.length ? Math.max(...vals) : 0;
      if (code === 5 || code === 105) return vals.length ? Math.min(...vals) : 0;
      return ERRORS.VALUE;
    },

    PMT: ([rate, nper, pv, fv = 0, type = 0]) => {
      const r = coerceNumber(rate);
      const n = coerceNumber(nper);
      const p = coerceNumber(pv);
      const f = coerceNumber(fv);
      const t = Math.floor(coerceNumber(type));
      if (isNaN(r) || isNaN(n) || isNaN(p)) return ERRORS.VALUE;
      if (r === 0) return -(p + f) / n;
      const pvif = Math.pow(1 + r, n);
      let pmt = (r / (pvif - 1)) * -(p * pvif + f);
      if (t === 1) pmt /= (1 + r);
      return smoothFloat(pmt);
    },

    MEDIAN: (args) => {
      const vals = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
      if (vals.length === 0) return ERRORS.NUM;
      const mid = Math.floor(vals.length / 2);
      if (vals.length % 2 === 1) return vals[mid];
      return smoothFloat((vals[mid - 1] + vals[mid]) / 2);
    },

    MODE: (args) => {
      const vals = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v));
      if (vals.length === 0) return ERRORS.NA;
      const counts = new Map();
      let maxCount = 0;
      for (const v of vals) {
        const c = (counts.get(v) || 0) + 1;
        counts.set(v, c);
        if (c > maxCount) maxCount = c;
      }
      if (maxCount <= 1) return ERRORS.NA;
      for (const v of vals) {
        if (counts.get(v) === maxCount) return v;
      }
      return ERRORS.NA;
    },

    'MODE.SNGL': (args) => {
      return FUNCTION_REGISTRY.MODE(args);
    },

    STDEV: (args) => {
      return FUNCTION_REGISTRY['STDEV.S'](args);
    },

    PERCENTILE: ([array, k]) => {
      return FUNCTION_REGISTRY['PERCENTILE.INC']([array, k]);
    },

    'STDEV.S': (args) => {
      const vals = flattenValues(args).filter(v => typeof v === 'number' && !isNaN(v));
      if (vals.length <= 1) return ERRORS.DIV0;
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const variance = vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (vals.length - 1);
      return smoothFloat(Math.sqrt(variance));
    },

    'PERCENTILE.INC': ([array, k]) => {
      const vals = flattenValues([array]).filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
      const frac = coerceNumber(k);
      if (vals.length === 0 || isNaN(frac) || frac < 0 || frac > 1) return ERRORS.NUM;
      const idx = (vals.length - 1) * frac;
      const lo = Math.floor(idx);
      const hi = Math.ceil(idx);
      if (lo === hi) return vals[lo];
      return smoothFloat(vals[lo] + (vals[hi] - vals[lo]) * (idx - lo));
    },

    CORREL: ([arr1, arr2]) => {
      const v1 = flattenValues([arr1]).map(coerceNumber).filter(n => !isNaN(n));
      const v2 = flattenValues([arr2]).map(coerceNumber).filter(n => !isNaN(n));
      const len = Math.min(v1.length, v2.length);
      if (len <= 1) return ERRORS.DIV0;
      const m1 = v1.slice(0, len).reduce((a, b) => a + b, 0) / len;
      const m2 = v2.slice(0, len).reduce((a, b) => a + b, 0) / len;
      let cov = 0, var1 = 0, var2 = 0;
      for (let i = 0; i < len; i++) {
        const d1 = v1[i] - m1;
        const d2 = v2[i] - m2;
        cov += d1 * d2;
        var1 += d1 * d1;
        var2 += d2 * d2;
      }
      if (var1 === 0 || var2 === 0) return ERRORS.DIV0;
      return smoothFloat(cov / Math.sqrt(var1 * var2));
    },

    FILTER: ([range, condition]) => {
      if (!Array.isArray(range)) return range;
      const rows = Array.isArray(range[0]) ? range : range.map(r => [r]);
      const conds = Array.isArray(condition) ? condition.flat(Infinity) : [condition];
      const filtered = [];
      for (let i = 0; i < rows.length; i++) {
        if (Boolean(conds[i])) {
          filtered.push(rows[i]);
        }
      }
      return filtered.length > 0 ? filtered : ERRORS.NA;
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // 7. AST EVALUATOR WITH DIRECTED ACYCLIC GRAPH (DAG)
  // ═════════════════════════════════════════════════════════════════════════

  class SheetStore {
    constructor(name) {
      this.name = name;
      this.cells = new Map(); // key: "row:col" (0-indexed)
    }

    key(row, col) {
      return `${row}:${col}`;
    }

    getCell(row, col) {
      return this.cells.get(this.key(row, col)) || null;
    }

    setCell(row, col, cellObj) {
      this.cells.set(this.key(row, col), cellObj);
    }

    deleteCell(row, col) {
      this.cells.delete(this.key(row, col));
    }
  }

  class WorkbookStore {
    constructor() {
      this.sheets = new Map();
      this.dependencies = new Map(); // key: "Sheet!row:col" -> Set of dependent keys
      this.cellASTs = new Map();     // key: "Sheet!row:col" -> AST
      this.evaluatingStack = new Set();
    }

    getSheet(name) {
      return this.sheets.get(name) || null;
    }

    createSheet(name) {
      if (!this.sheets.has(name)) {
        this.sheets.set(name, new SheetStore(name));
      }
      return this.sheets.get(name);
    }

    getCell(sheetName, row, col) {
      const sheet = this.getSheet(sheetName);
      return sheet ? sheet.getCell(row, col) : null;
    }

    setCellValue(sheetName, row, col, rawVal, triggerRecalc = true) {
      const sheet = this.getSheet(sheetName) || this.createSheet(sheetName);
      let formula = null;
      let value = rawVal;

      if (typeof rawVal === 'string' && rawVal.startsWith('=')) {
        formula = rawVal;
        value = null; // Calculated dynamically
      }

      const cellObj = {
        raw: rawVal,
        formula,
        value,
        type: typeof rawVal,
        sheet: sheetName,
        row,
        col
      };

      sheet.setCell(row, col, cellObj);
      const cellKey = `${sheetName}!${row}:${col}`;

      if (formula) {
        try {
          const lexer = new Lexer(formula);
          const tokens = lexer.tokenize();
          const parser = new PrattParser(tokens);
          const ast = parser.parse();
          this.cellASTs.set(cellKey, ast);
          this.updateDependencies(cellKey, ast, sheetName);
        } catch (err) {
          cellObj.value = ERRORS.VALUE;
        }
      } else {
        this.cellASTs.delete(cellKey);
      }

      if (triggerRecalc) {
        this.recalculateDirty(cellKey);
      }
    }

    recalculateAll() {
      for (const cellKey of this.cellASTs.keys()) {
        const [sheetName] = cellKey.split('!');
        const ast = this.cellASTs.get(cellKey);
        if (ast) {
          try {
            const val = this.evaluateAST(ast, sheetName, cellKey);
            this.setEvaluatedValue(cellKey, val);
          } catch (err) {
            this.setEvaluatedValue(cellKey, err.message || ERRORS.VALUE);
          }
        }
      }
    }

    updateDependencies(dependentKey, ast, currentSheet) {
      const refs = this.extractRefs(ast, currentSheet);
      for (const ref of refs) {
        if (!this.dependencies.has(ref)) {
          this.dependencies.set(ref, new Set());
        }
        this.dependencies.get(ref).add(dependentKey);
      }
    }

    extractRefs(node, currentSheet) {
      const refs = new Set();
      const traverse = (n) => {
        if (!n) return;
        if (n.type === 'CellRef') {
          const p = parseCellCoord(n.ref);
          if (p) {
            const s = p.sheet || currentSheet;
            refs.add(`${s}!${p.row}:${p.col}`);
          }
        } else if (n.type === 'RangeRef') {
          const startP = parseCellCoord(n.start.ref);
          const endP = parseCellCoord(n.end.ref);
          if (startP && endP) {
            const s = startP.sheet || endP.sheet || currentSheet;
            const rMin = Math.min(startP.row, endP.row);
            const rMax = Math.max(startP.row, endP.row);
            const cMin = Math.min(startP.col, endP.col);
            const cMax = Math.max(startP.col, endP.col);
            for (let r = rMin; r <= rMax; r++) {
              for (let c = cMin; c <= cMax; c++) {
                refs.add(`${s}!${r}:${c}`);
              }
            }
          }
        } else if (n.type === 'FunctionCall') {
          for (const arg of n.args) traverse(arg);
        } else if (n.type === 'BinaryOp') {
          traverse(n.left);
          traverse(n.right);
        } else if (n.type === 'UnaryOp' || n.type === 'UnaryPostfix') {
          traverse(n.arg);
        }
      };
      traverse(node);
      return Array.from(refs);
    }

    // Iterative Topological Recalculation (Kahn's algorithm using explicit queue — no stack overflow)
    recalculateDirty(startKey) {
      const order = [];
      const visited = new Set();
      const inStack = new Set();
      const cycles = new Set();

      const dfsStack = [{ key: startKey, step: 0 }];
      while (dfsStack.length > 0) {
        const top = dfsStack[dfsStack.length - 1];
        const key = top.key;

        if (top.step === 0) {
          if (inStack.has(key)) {
            cycles.add(key);
            dfsStack.pop();
            continue;
          }
          if (visited.has(key)) {
            dfsStack.pop();
            continue;
          }
          visited.add(key);
          inStack.add(key);
          top.step = 1;

          const dependents = this.dependencies.get(key);
          if (dependents && dependents.size > 0) {
            for (const dep of dependents) {
              dfsStack.push({ key: dep, step: 0 });
            }
          }
        } else {
          inStack.delete(key);
          order.push(key);
          dfsStack.pop();
        }
      }

      order.reverse();

      for (const cellKey of order) {
        if (cycles.has(cellKey)) {
          this.setEvaluatedValue(cellKey, ERRORS.CIRCULAR);
          continue;
        }

        const ast = this.cellASTs.get(cellKey);
        if (ast) {
          const [sheetName] = cellKey.split('!');
          try {
            const val = this.evaluateAST(ast, sheetName, cellKey);
            this.setEvaluatedValue(cellKey, val);
          } catch (err) {
            this.setEvaluatedValue(cellKey, err.message || ERRORS.VALUE);
          }
        }
      }
    }

    setEvaluatedValue(cellKey, val) {
      const [sheetName, coord] = cellKey.split('!');
      const [rowStr, colStr] = coord.split(':');
      const r = parseInt(rowStr, 10);
      const c = parseInt(colStr, 10);
      const cell = this.getCell(sheetName, r, c);
      if (cell) {
        cell.value = val;
      }
    }

    evaluateAST(node, currentSheet, cellOriginKey = null) {
      if (!node) return null;

      if (cellOriginKey) {
        this.evaluatingStack.add(cellOriginKey);
      }

      try {
        if (node.type === 'Literal') {
          return node.value;
        }

        if (node.type === 'CellRef') {
          const p = parseCellCoord(node.ref);
          if (!p) return ERRORS.REF;
          const targetSheet = p.sheet || currentSheet;
          const targetKey = `${targetSheet}!${p.row}:${p.col}`;

          if (this.evaluatingStack.has(targetKey)) {
            return ERRORS.CIRCULAR;
          }

          const cell = this.getCell(targetSheet, p.row, p.col);
          if (cell && cell.formula && cell.value === null) {
            const ast = this.cellASTs.get(targetKey);
            if (ast) {
              return this.evaluateAST(ast, targetSheet, targetKey);
            }
          }
          return cell ? cell.value : null;
        }

        if (node.type === 'RangeRef') {
          const startP = parseCellCoord(node.start.ref);
          const endP = parseCellCoord(node.end.ref);
          if (!startP || !endP) return ERRORS.REF;
          const targetSheet = startP.sheet || endP.sheet || currentSheet;

          const rMin = Math.min(startP.row, endP.row);
          const rMax = Math.max(startP.row, endP.row);
          const cMin = Math.min(startP.col, endP.col);
          const cMax = Math.max(startP.col, endP.col);

          const matrix = [];
          for (let r = rMin; r <= rMax; r++) {
            const rowVals = [];
            for (let c = cMin; c <= cMax; c++) {
              const cell = this.getCell(targetSheet, r, c);
              rowVals.push(cell ? cell.value : null);
            }
            matrix.push(rowVals);
          }
          return matrix;
        }

        if (node.type === 'UnaryOp') {
          const arg = this.evaluateAST(node.arg, currentSheet);
          if (isError(arg)) return arg;
          const n = coerceNumber(arg);
          if (isNaN(n)) return ERRORS.VALUE;
          return node.op === '-' ? -n : n;
        }

        if (node.type === 'UnaryPostfix') {
          const arg = this.evaluateAST(node.arg, currentSheet);
          if (isError(arg)) return arg;
          const n = coerceNumber(arg);
          if (isNaN(n)) return ERRORS.VALUE;
          return node.op === '%' ? n / 100 : n;
        }

        if (node.type === 'BinaryOp') {
          const left = this.evaluateAST(node.left, currentSheet);
          if (isError(left)) return left;
          const right = this.evaluateAST(node.right, currentSheet);
          if (isError(right)) return right;

          // String Concatenation &
          if (node.op === '&') {
            const s1 = left === null || left === undefined ? '' : String(left);
            const s2 = right === null || right === undefined ? '' : String(right);
            return s1 + s2;
          }

          // Comparison Operators (=, <>, <, <=, >, >=)
          if (['=', '<>', '<', '<=', '>', '>='].includes(node.op)) {
            return compareExcelValues(left, right, node.op);
          }

          // Arithmetic Operators (+, -, *, /, ^)
          const n1 = coerceNumber(left);
          const n2 = coerceNumber(right);
          if (isNaN(n1) || isNaN(n2)) return ERRORS.VALUE;

          if (node.op === '+') return smoothFloat(n1 + n2);
          if (node.op === '-') return smoothFloat(n1 - n2);
          if (node.op === '*') return smoothFloat(n1 * n2);
          if (node.op === '/') return n2 === 0 ? ERRORS.DIV0 : smoothFloat(n1 / n2);
          if (node.op === '^') return smoothFloat(Math.pow(n1, n2));

          return ERRORS.VALUE;
        }

        if (node.type === 'FunctionCall') {
          const fn = FUNCTION_REGISTRY[node.name];
          if (!fn) return ERRORS.NAME;
          const evaluatedArgs = node.args.map(arg => this.evaluateAST(arg, currentSheet));
          for (const ea of evaluatedArgs) {
            if (isError(ea)) {
              if (node.name === 'IFERROR') continue;
              if (node.name === 'IFNA' && ea === ERRORS.NA) continue;
              return ea;
            }
          }
          return fn(evaluatedArgs);
        }

        return ERRORS.VALUE;
      } finally {
        if (cellOriginKey) {
          this.evaluatingStack.delete(cellOriginKey);
        }
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 8. RELATIVE & ABSOLUTE REFERENCE SHIFTER (FOR FILL & COPY/PASTE)
  // ═════════════════════════════════════════════════════════════════════════

  function shiftFormula(formula, rowDelta, colDelta) {
    if (!formula || !formula.startsWith('=')) return formula;
    const body = formula.slice(1);

    const refRegex = /((?:'[^']+'|[A-Za-z0-9_]+)!)?(\$?)([A-Za-z]+)(\$?)([0-9]+)/g;

    const shifted = body.replace(refRegex, (match, sheetPart, absCol, colLetters, absRow, rowDigits) => {
      let c = colNameToIndex(colLetters);
      let r = parseInt(rowDigits, 10) - 1;

      if (!absCol) {
        c += colDelta;
        if (c < 0) return (sheetPart || '') + ERRORS.REF;
      }
      if (!absRow) {
        r += rowDelta;
        if (r < 0) return (sheetPart || '') + ERRORS.REF;
      }

      const newCol = (absCol ? '$' : '') + colIndexToName(c);
      const newRow = (absRow ? '$' : '') + (r + 1);
      return (sheetPart || '') + newCol + newRow;
    });

    return '=' + shifted;
  }

  function parseFormula(formulaStr) {
    if (typeof formulaStr !== 'string') return null;
    const clean = formulaStr.trim().startsWith('=') ? formulaStr.trim().substring(1) : formulaStr.trim();
    const lexer = new Lexer(clean);
    const tokens = lexer.tokenize();
    const parser = new PrattParser(tokens);
    return parser.parse();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 9. PUBLIC ENGINE INTERFACE
  // ═════════════════════════════════════════════════════════════════════════

  return {
    ERRORS,
    isError,
    parseFormula,
    colIndexToName,
    colNameToIndex,
    parseCellCoord,
    parseRangeCoord,
    formatCellCoord,
    compareExcelValues,
    Lexer,
    PrattParser,
    WorkbookStore,
    SheetStore,
    shiftFormula,
    dateToSerial,
    serialToDate,
    FUNCTION_REGISTRY
  };
});
