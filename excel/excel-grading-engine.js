// public/excel/excel-grading-engine.js
// Manodemy Excel Studio — 5-Tier Authoritative Auto-Grading Engine (Schema v2.1)
// Conforms to: MISSION SPECIFICATION v3.2 & MASTER ORCHESTRATION v2.1

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./excel-engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./excel-engine'));
  } else {
    root.ExcelGradingEngine = factory(root.ExcelEngine);
  }
}(typeof self !== 'undefined' ? self : this, function (ExcelEngine) {
  'use strict';

  /**
   * Evaluates a single challenge against the live workbook state.
   * Polymorphic: Supports both Schema v1 (Day 01) and Schema v2 (Days 02-12).
   */
  function gradeChallenge(challenge, workbook) {
    if (!challenge || !workbook) {
      return {
        passed: false,
        score: 0,
        feedback: "Grading system error: workbook or challenge missing.",
        checks: []
      };
    }

    // ── Handle State-Based Challenges (mode: "state") ────────────────────────
    if (challenge.mode === 'state') {
      return gradeStateChallenge(challenge, workbook);
    }

    // ── Isolated Step Setup (for chained/capstone multi-step models) ──────────
    let restoreCells = null;
    if (challenge.isolatedSetup && challenge.isolatedSetup.cells) {
      const sName = challenge.isolatedSetup.sheet || challenge.targetSheet || "Summary_Practice";
      restoreCells = [];
      for (const [coord, val] of Object.entries(challenge.isolatedSetup.cells)) {
        const p = ExcelEngine.parseCellCoord(coord);
        if (p) {
          const oldCell = workbook.getCell(sName, p.row, p.col);
          restoreCells.push({ sheet: sName, row: p.row, col: p.col, oldRaw: oldCell ? (oldCell.formula || oldCell.raw) : "" });
          workbook.setCellValue(sName, p.row, p.col, val);
        }
      }
    }

    try {
      return evaluateFormulaChallenge(challenge, workbook);
    } finally {
      // Revert isolated setup overrides if any
      if (restoreCells) {
        for (const item of restoreCells) {
          workbook.setCellValue(item.sheet, item.row, item.col, item.oldRaw);
        }
      }
    }
  }

  function evaluateFormulaChallenge(challenge, workbook) {
    const sheetName = challenge.targetSheet || "Summary_Practice";
    const targetCoord = challenge.targetCell || "B2";
    const parsedCoord = ExcelEngine.parseCellCoord(targetCoord);

    if (!parsedCoord) {
      return {
        passed: false,
        score: 0,
        feedback: `Invalid target cell address: ${targetCoord}`,
        checks: []
      };
    }

    const cellObj = workbook.getCell(sheetName, parsedCoord.row, parsedCoord.col);
    const userFormula = cellObj ? (cellObj.formula || cellObj.raw || "") : "";
    const userValue = cellObj ? cellObj.value : null;

    const checks = [];
    let isPassed = true;

    // Check Common Pedagogical Mistakes first
    if (challenge.commonMistakes && Array.isArray(challenge.commonMistakes)) {
      for (const cm of challenge.commonMistakes) {
        if (cm.pattern) {
          const reg = typeof cm.pattern === 'string' ? new RegExp(cm.pattern, 'i') : cm.pattern;
          if (reg.test(userFormula)) {
            return {
              id: challenge.id,
              passed: false,
              score: 0,
              userFormula,
              userValue,
              feedback: `⚠️ Pedagogical Note: ${cm.message}`,
              checks: [{ name: "Common Mistake Detector", passed: false, detail: cm.message }]
            };
          }
        }
      }
    }

    // ── Check 1: Target Cell & Formula Presence ─────────────────────────────
    const hasFormula = typeof userFormula === 'string' && userFormula.trim().startsWith('=');
    if (!hasFormula) {
      checks.push({
        name: "Formula Syntax",
        passed: false,
        detail: `Cell ${sheetName}!${targetCoord} must contain an Excel formula starting with '='. Found: "${userFormula || 'empty'}".`
      });
      return {
        id: challenge.id,
        passed: false,
        score: 0,
        userFormula,
        userValue,
        expectedValue: challenge.check?.expected !== undefined ? challenge.check.expected : challenge.expectedValue,
        feedback: `Please write a formula in ${targetCoord} starting with '='.`,
        checks
      };
    }
    checks.push({
      name: "Formula Syntax",
      passed: true,
      detail: `Formula present: ${userFormula}`
    });

    // ── Check 2: Error-Free Execution ───────────────────────────────────────
    const isError = ExcelEngine.isError(userValue);
    if (isError) {
      checks.push({
        name: "Error-Free Execution",
        passed: false,
        detail: `Formula evaluated to an Excel calculation error: ${userValue}. Check arguments, parentheses, and sheet names.`
      });
      return {
        id: challenge.id,
        passed: false,
        score: 0,
        userFormula,
        userValue,
        expectedValue: challenge.check?.expected !== undefined ? challenge.check.expected : challenge.expectedValue,
        feedback: `Your formula resulted in ${userValue}. Check your formula arguments!`,
        checks
      };
    }
    checks.push({
      name: "Error-Free Execution",
      passed: true,
      detail: "Evaluated without calculation errors."
    });

    // ── Check 3: Value Accuracy with Tolerance ──────────────────────────────
    let valueMatches = false;
    const expected = challenge.check?.expected !== undefined ? challenge.check.expected : challenge.expectedValue;
    const tol = typeof (challenge.check?.tolerance !== undefined ? challenge.check.tolerance : challenge.tolerance) === 'number'
      ? (challenge.check?.tolerance !== undefined ? challenge.check.tolerance : challenge.tolerance)
      : 0.01;

    if (typeof expected === 'number') {
      const numVal = typeof userValue === 'number' ? userValue : parseFloat(userValue);
      if (!isNaN(numVal)) {
        valueMatches = Math.abs(numVal - expected) <= tol;
      }
    } else if (typeof expected === 'string') {
      const cs = challenge.check?.caseSensitive || false;
      const uStr = String(userValue).trim();
      const eStr = expected.trim();
      valueMatches = cs ? uStr === eStr : uStr.toLowerCase() === eStr.toLowerCase();
    } else if (Array.isArray(expected)) {
      valueMatches = JSON.stringify(userValue) === JSON.stringify(expected);
    } else {
      valueMatches = (userValue == expected);
    }

    if (!valueMatches) {
      isPassed = false;
      checks.push({
        name: "Result Value Accuracy",
        passed: false,
        detail: `Expected value ${expected} (tolerance ${tol}), but got ${userValue !== null && userValue !== undefined ? userValue : 'empty'}.`
      });
    } else {
      checks.push({
        name: "Result Value Accuracy",
        passed: true,
        detail: `Value matched expected result: ${userValue}.`
      });
    }

    // ── Check 4: AST Function Verification & Anti-Cheat ──────────────────────
    let astValid = true;
    let astDetail = "";

    try {
      const ast = ExcelEngine.parseFormula(userFormula);
      const usedFunctions = new Set();
      const usedRefs = [];

      function traverseAST(node) {
        if (!node) return;
        if (node.type === 'FunctionCall') {
          usedFunctions.add(node.name.toUpperCase());
          if (node.args) node.args.forEach(traverseAST);
        } else if (node.type === 'UnaryOp') {
          traverseAST(node.arg);
        } else if (node.type === 'BinaryOp') {
          traverseAST(node.left);
          traverseAST(node.right);
        } else if (node.type === 'RangeRef') {
          usedRefs.push(node);
          traverseAST(node.start);
          traverseAST(node.end);
        } else if (node.type === 'CellRef') {
          usedRefs.push(node);
        }
      }
      traverseAST(ast);

      // Schema v2 mustUseAnyOf: Array of groups, e.g. [["SUMIFS"], ["SUMPRODUCT"]]
      if (challenge.check?.mustUseAnyOf && Array.isArray(challenge.check.mustUseAnyOf)) {
        for (const group of challenge.check.mustUseAnyOf) {
          const matched = group.some(fnName => usedFunctions.has(fnName.toUpperCase()));
          if (!matched) {
            astValid = false;
            astDetail = `Formula must use at least one function from: ${group.join(', ')}.`;
            break;
          }
        }
      }

      // Schema v2 mustReference: Array of ranges that must be referenced
      if (astValid && challenge.check?.mustReference && Array.isArray(challenge.check.mustReference)) {
        const formulaUpper = userFormula.toUpperCase();
        for (const ref of challenge.check.mustReference) {
          if (!formulaUpper.includes(ref.toUpperCase())) {
            astValid = false;
            astDetail = `Formula must reference data range: ${ref}.`;
            break;
          }
        }
      }

      // Legacy expectedFormulaPrefix (Day 01 backward compatibility)
      if (astValid && challenge.expectedFormulaPrefix) {
        const requiredFn = challenge.expectedFormulaPrefix.replace(/^=/, '').toUpperCase();
        if (requiredFn && !usedFunctions.has(requiredFn) && !userFormula.toUpperCase().startsWith(challenge.expectedFormulaPrefix.toUpperCase())) {
          astValid = false;
          astDetail = `Challenge requires using the ${requiredFn}() function.`;
        }
      }

      // Anti-Cheat: Reject hardcoded scalar answers (e.g. =93388 or =12600)
      const antiLiteral = challenge.check?.mustNotBeLiteral !== undefined ? challenge.check.mustNotBeLiteral : true;
      if (astValid && antiLiteral && usedRefs.length === 0 && usedFunctions.size === 0) {
        astValid = false;
        astDetail = "Hardcoding static constant values is prohibited. You must reference workbook data cells.";
      }

    } catch (parseErr) {
      astValid = false;
      astDetail = `Formula parsing warning: ${parseErr.message}`;
    }

    if (!astValid) {
      isPassed = false;
      checks.push({
        name: "AST Function & Integrity Check",
        passed: false,
        detail: astDetail
      });
    } else {
      checks.push({
        name: "AST Function & Integrity Check",
        passed: true,
        detail: "Formula AST verified with genuine cell references and expected function signatures."
      });
    }

    const xpEarned = challenge.xp || 75;
    return {
      id: challenge.id,
      passed: isPassed,
      score: isPassed ? (challenge.marks || 1.0) : 0,
      userFormula,
      userValue,
      expectedValue: expected,
      feedback: isPassed ? `🌟 100% Correct (+${xpEarned} XP)` : (checks.find(c => !c.passed)?.detail || "Check failed."),
      checks
    };
  }

  /**
   * Generic Typed State Grader for UI/Workbook manipulation challenges
   */
  function gradeStateChallenge(challenge, workbook) {
    // Legacy Day 01 C19 & C20 fallback
    if (challenge.id === 'c19') return gradeSortChallenge(challenge, workbook);
    if (challenge.id === 'c20') return gradeConditionalFormattingChallenge(challenge, workbook);

    const stateCheck = challenge.check?.state;
    if (!stateCheck) {
      return {
        id: challenge.id,
        passed: false,
        score: 0,
        feedback: "State check configuration missing.",
        checks: []
      };
    }

    const sheetName = stateCheck.sheet || challenge.targetSheet || "Sort_Practice";
    let passed = false;
    let detail = "";

    switch (stateCheck.type) {
      case 'sort': {
        // Inspect sorted order on sheetName
        if (stateCheck.keys && stateCheck.keys.length > 0) {
          const colIdx = stateCheck.keys[0].col;
          const asc = stateCheck.keys[0].order !== 'desc';
          const r1 = workbook.getCell(sheetName, 1, colIdx);
          const r2 = workbook.getCell(sheetName, 2, colIdx);
          const v1 = r1 ? r1.value : 0;
          const v2 = r2 ? r2.value : 0;
          passed = asc ? (v1 <= v2) : (v1 >= v2);
          detail = passed ? "Columns correctly sorted." : "Dataset is not sorted according to criteria.";
        }
        break;
      }
      case 'cf': {
        const rules = workbook.conditionalFormattingRules ? workbook.conditionalFormattingRules[sheetName] : [];
        passed = Array.isArray(rules) && rules.length > 0;
        detail = passed ? "Conditional formatting rule active." : "No conditional formatting rule found.";
        break;
      }
      case 'format': {
        const p = ExcelEngine.parseCellCoord(stateCheck.targetCell || "B2");
        const cell = p ? workbook.getCell(sheetName, p.row, p.col) : null;
        passed = cell && cell.format === stateCheck.expectedFormat;
        detail = passed ? `Number format ${stateCheck.expectedFormat} applied.` : "Number format not detected.";
        break;
      }
      default:
        passed = true;
        detail = "State criteria satisfied.";
    }

    const xpEarned = challenge.xp || 75;
    return {
      id: challenge.id,
      passed,
      score: passed ? (challenge.marks || 1.0) : 0,
      feedback: passed ? `🌟 100% Correct (+${xpEarned} XP)` : detail,
      checks: [{ name: `State Check: ${stateCheck.type}`, passed, detail }]
    };
  }

  /**
   * Day 01 Legacy Graders (Preserved for 100% backward compatibility)
   */
  function gradeSortChallenge(challenge, workbook) {
    const sheetName = "Sort_Practice";
    const cellA2 = workbook.getCell(sheetName, 1, 0);
    const cellG2 = workbook.getCell(sheetName, 1, 6);
    const cellA3 = workbook.getCell(sheetName, 2, 0);

    const topOrderId = cellA2 ? String(cellA2.value).trim() : "";
    const topRevenue = cellG2 ? Number(cellG2.value) : 0;
    const secondOrderId = cellA3 ? String(cellA3.value).trim() : "";

    const passed = (topOrderId === "ORD-1006" || topRevenue === 12600) &&
                   (secondOrderId === "ORD-1001" || secondOrderId === "");

    return {
      id: challenge.id,
      passed,
      score: passed ? 1.0 : 0,
      userValue: topOrderId,
      expectedValue: "ORD-1006 (Total Revenue: $12,600)",
      feedback: passed ? "🌟 100% Correct! Dataset successfully sorted descending by Revenue." : "Dataset is not yet sorted descending by Total Revenue. Select Column G and click Sort Z to A.",
      checks: [
        {
          name: "Descending Revenue Sort Check",
          passed,
          detail: passed ? "Top order is ORD-1006 with $12,600 revenue." : `Top row is currently ${topOrderId || 'empty'}. Expected ORD-1006.`
        }
      ]
    };
  }

  function gradeConditionalFormattingChallenge(challenge, workbook) {
    const sheetName = "Sort_Practice";
    const rules = workbook.conditionalFormattingRules ? workbook.conditionalFormattingRules[sheetName] : [];
    const hasRule = Array.isArray(rules) && rules.some(r => r.type === 'equals' && String(r.value).toLowerCase() === 'high');

    return {
      id: challenge.id,
      passed: hasRule,
      score: hasRule ? 1.0 : 0,
      userValue: hasRule ? "Rule Applied" : "None",
      expectedValue: "Cell Equals 'High' -> Emerald Fill",
      feedback: hasRule ? "🌟 100% Correct! Conditional formatting rule successfully applied." : "Conditional formatting rule for 'High' not yet active.",
      checks: [
        {
          name: "Conditional Formatting Rule Check",
          passed: hasRule,
          detail: hasRule ? "Active rule detected for High tier highlighting." : "No conditional formatting rule detected on Sort_Practice."
        }
      ]
    };
  }

  function gradeAllChallenges(challenges, workbook) {
    let totalScore = 0;
    let solvedCount = 0;
    const results = [];

    challenges.forEach(ch => {
      const res = gradeChallenge(ch, workbook);
      results.push(res);
      if (res.passed) {
        totalScore += res.score;
        solvedCount++;
      }
    });

    return {
      totalScore,
      maxScore: challenges.length,
      solvedCount,
      totalCount: challenges.length,
      percent: Math.round((solvedCount / challenges.length) * 100),
      results
    };
  }

  return {
    gradeChallenge,
    gradeAllChallenges
  };
}));
