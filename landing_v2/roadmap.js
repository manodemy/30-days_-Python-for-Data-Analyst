/**
 * Manodemy 60-Day Interactive Roadmap Animation
 * Renders an interactive, vector-based learning highway with a progress orb,
 * dynamic glassmorphic card updates, ripple effects, and responsive mobile scroll-tracking.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Curriculum Database
  const CURRICULUM = [
    // SQL Phase (Days 01-18)
    { day: 1, title: "Intro to SQL & Databases", obj: "Learn relational databases and SQL query structures.", status: "FREE", phase: "sql" },
    { day: 2, title: "SELECT & Filtering", obj: "Filter table data using SELECT and WHERE clauses.", status: "FREE", phase: "sql" },
    { day: 3, title: "Sorting, Patterns & CASE", obj: "Use ORDER BY, LIKE wildcards, and conditional statements.", status: "PREMIUM", phase: "sql" },
    { day: 4, title: "Aggregate Functions & GROUP BY", obj: "Summarize data using SUM, AVG, COUNT, and groups.", status: "PREMIUM", phase: "sql" },
    { day: 5, title: "Joins & Relationships", obj: "Combine multiple tables with INNER and OUTER Joins.", status: "PREMIUM", phase: "sql" },
    { day: 6, title: "Subqueries", obj: "Nest queries within queries for advanced filtering.", status: "PREMIUM", phase: "sql" },
    { day: 7, title: "Common Table Expressions", obj: "Simplify complex query blocks using WITH syntax (CTEs).", status: "PREMIUM", phase: "sql" },
    { day: 8, title: "Window Functions I: Ranking", obj: "Apply ROW_NUMBER, RANK, and DENSE_RANK partitions.", status: "PREMIUM", phase: "sql" },
    { day: 9, title: "Window Functions II: Analytics", obj: "Compute running totals, moving averages, and LEAD/LAG values.", status: "PREMIUM", phase: "sql" },
    { day: 10, title: "Date & Time Functions", obj: "Extract, parse, and manipulate temporal data fields.", status: "PREMIUM", phase: "sql" },
    { day: 11, title: "String & Type Functions", obj: "Clean, trim, split, and cast text data columns.", status: "PREMIUM", phase: "sql" },
    { day: 12, title: "Data Cleaning & Wrangling", obj: "Clean dirty records and resolve NULL values in SQL.", status: "PREMIUM", phase: "sql" },
    { day: 13, title: "Set Operations & Joins", obj: "Combine results with UNION, INTERSECT, and EXCEPT.", status: "PREMIUM", phase: "sql" },
    { day: 14, title: "Query Optimisation", obj: "Improve query speed using indexes and execution plans.", status: "PREMIUM", phase: "sql" },
    { day: 15, title: "Views & Reusable Objects", obj: "Build reusable virtual tables using CREATE VIEW.", status: "PREMIUM", phase: "sql" },
    { day: 16, title: "Advanced Analytics Patterns", obj: "Solve complex SQL case studies and business problems.", status: "PREMIUM", phase: "sql" },
    { day: 17, title: "Data Modelling & dbt", obj: "Structure schemas and build basic data models in dbt.", status: "PREMIUM", phase: "sql" },
    { day: 18, title: "BI Capstone & Interview Prep", obj: "Build a portfolio database and practice interview questions.", status: "PREMIUM", phase: "sql" },

    // Excel Phase (Days 19-30)
    { day: 19, title: "Excel Orientation & Formulas", obj: "Navigate worksheets and apply basic cell arithmetic.", status: "PREMIUM", phase: "excel" },
    { day: 20, title: "Formatting, Sorting & Filtering", obj: "Apply conditional colors, sorting rules, and filter rows.", status: "PREMIUM", phase: "excel" },
    { day: 21, title: "Data Cleaning Essentials", obj: "Remove duplicates, trim whitespace, and split text columns.", status: "PREMIUM", phase: "excel" },
    { day: 22, title: "Excel Tables", obj: "Create dynamic data ranges and structured references.", status: "PREMIUM", phase: "excel" },
    { day: 23, title: "Lookup & Reference Functions", obj: "Use VLOOKUP, HLOOKUP, and XLOOKUP to retrieve data.", status: "PREMIUM", phase: "excel" },
    { day: 24, title: "Logic Functions", obj: "Run multi-criteria evaluations using IF, AND, OR, and IFS.", status: "PREMIUM", phase: "excel" },
    { day: 25, title: "Text Functions", obj: "Extract and concatenate strings using LEFT, RIGHT, and MID.", status: "PREMIUM", phase: "excel" },
    { day: 26, title: "Date & Time Functions", obj: "Manage date intervals and compute workdays automatically.", status: "PREMIUM", phase: "excel" },
    { day: 27, title: "Conditional Aggregation", obj: "Aggregate data with SUMIFS, COUNTIFS, and AVERAGEIFS.", status: "PREMIUM", phase: "excel" },
    { day: 28, title: "PivotTables Core Mechanics", obj: "Group records and build dynamic summary tables.", status: "PREMIUM", phase: "excel" },
    { day: 29, title: "PivotTables Advanced & Charts", obj: "Design visual dashboards with dynamic charts and slicers.", status: "PREMIUM", phase: "excel" },
    { day: 30, title: "Validation, What-If & Capstone", obj: "Set up data validation, what-if analyses, and project.", status: "PREMIUM", phase: "excel" },

    // Python Phase (Days 31-60)
    { day: 31, title: "Data Types and Memory", obj: "Understand variables, primitive types, and memory.", status: "PREMIUM", phase: "python" },
    { day: 32, title: "Operators and Expressions", obj: "Perform math, comparison, and logic evaluations.", status: "PREMIUM", phase: "python" },
    { day: 33, title: "Strings", obj: "Slices, format, and execute advanced string manipulations.", status: "PREMIUM", phase: "python" },
    { day: 34, title: "Lists", obj: "Create, slice, and perform operations on list collections.", status: "PREMIUM", phase: "python" },
    { day: 35, title: "Tuples", obj: "Work with immutable lists and tuple unpacking.", status: "PREMIUM", phase: "python" },
    { day: 36, title: "Sets", obj: "Run set operations like union and intersections on unique items.", status: "PREMIUM", phase: "python" },
    { day: 37, title: "Dictionaries", obj: "Structure custom data using key-value pair dictionaries.", status: "PREMIUM", phase: "python" },
    { day: 38, title: "Conditionals", obj: "Control logic branching with if-elif-else statements.", status: "PREMIUM", phase: "python" },
    { day: 39, title: "Loops", obj: "Write loops to repeat operations with for and while statements.", status: "PREMIUM", phase: "python" },
    { day: 40, title: "Functions", obj: "Design modular and reusable blocks of code with arguments.", status: "PREMIUM", phase: "python" },
    { day: 41, title: "Modules", obj: "Import external packages and build custom modules.", status: "PREMIUM", phase: "python" },
    { day: 42, title: "Comprehensions", obj: "Generate lists, sets, and dicts using compact single-line syntax.", status: "PREMIUM", phase: "python" },
    { day: 43, title: "Lambda Functions", obj: "Create anonymous single-expression functions.", status: "PREMIUM", phase: "python" },
    { day: 44, title: "Exceptions", obj: "Catch runtime errors using try-except syntax.", status: "PREMIUM", phase: "python" },
    { day: 45, title: "File Handling", obj: "Read and write text, CSV, and JSON files on local disk.", status: "PREMIUM", phase: "python" },
    { day: 46, title: "OOP Basics", obj: "Instantiate class objects and define attributes.", status: "PREMIUM", phase: "python" },
    { day: 47, title: "OOP Advanced", obj: "Implement inheritance, encapsulation, and polymorphism.", status: "PREMIUM", phase: "python" },
    { day: 48, title: "Regex", obj: "Filter and search text datasets using regular expressions.", status: "PREMIUM", phase: "python" },
    { day: 49, title: "Generators and Iterators", obj: "Build custom iterators and yield expressions.", status: "PREMIUM", phase: "python" },
    { day: 50, title: "Capstone Project", obj: "Write a pure-Python file analyzer and data processor.", status: "PREMIUM", phase: "python" },
    { day: 51, title: "NumPy Fundamentals", obj: "Create multi-dimensional arrays and vector operations.", status: "PREMIUM", phase: "python" },
    { day: 52, title: "NumPy Advanced", obj: "Slice arrays, execute mathematical operations, and reshape.", status: "PREMIUM", phase: "python" },
    { day: 53, title: "Pandas Introduction", obj: "Load data tables and explore basic DataFrame structures.", status: "PREMIUM", phase: "python" },
    { day: 54, title: "Pandas Selection", obj: "Query specific rows and columns using loc/iloc indices.", status: "PREMIUM", phase: "python" },
    { day: 55, title: "Pandas Cleaning", obj: "Resolve null fields, map rows, and clean tabular data.", status: "PREMIUM", phase: "python" },
    { day: 56, title: "Pandas GroupBy", obj: "Aggregate data subsets based on grouped categories.", status: "PREMIUM", phase: "python" },
    { day: 57, title: "Pandas Merging", obj: "Align and combine disparate DataFrames using Joins.", status: "PREMIUM", phase: "python" },
    { day: 58, title: "Pandas Time Series", obj: "Handle datetime indexing and resample temporal intervals.", status: "PREMIUM", phase: "python" },
    { day: 59, title: "Data Visualization", obj: "Create presentation-ready charts using Seaborn.", status: "PREMIUM", phase: "python" },
    { day: 60, title: "Phase Analysis & Review", obj: "Conduct a full end-to-end analysis case study and earn your certificate.", status: "PREMIUM", phase: "python" }
  ];

  // 2. Initialize elements
  const svg = document.getElementById('roadmapSvg');
  const path = document.getElementById('road-path');
  const nodesGroup = document.getElementById('roadmap-nodes');
  const monumentsGroup = document.getElementById('roadmap-monuments');
  const decorationsGroup = document.getElementById('roadmap-decorations');
  const orb = document.getElementById('progress-orb');
  const ripple = document.getElementById('pulse-ripple');
  const card = document.getElementById('roadmapDayCard');

  if (!svg || !path || !nodesGroup || !orb || !ripple || !card) {
    console.warn("Roadmap elements missing from DOM. Interactive roadmap cannot start.");
    return;
  }

  // Pre-calculate 60 points along the path
  const pathLength = path.getTotalLength();
  const nodePoints = [];
  
  for (let i = 0; i < 60; i++) {
    const ratio = i / 59;
    const len = ratio * pathLength;
    const pt = path.getPointAtLength(len);
    nodePoints.push({ x: pt.x, y: pt.y });
  }

  // Render 60 circular nodes and setup colors
  nodePoints.forEach((pt, index) => {
    const day = index + 1;
    const info = CURRICULUM[index];
    let fill = '#10B981'; // SQL Emerald
    if (day > 18 && day <= 30) fill = '#FFB020'; // Excel Gold
    else if (day > 30) fill = '#00E6F6'; // Python Cyan

    // Create SVG Node Circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', pt.x);
    circle.setAttribute('cy', pt.y);
    circle.setAttribute('r', '5.5');
    circle.setAttribute('fill', fill);
    circle.setAttribute('opacity', '0.25'); // default dimmed
    circle.setAttribute('class', `roadmap-node node-day-${day}`);
    circle.setAttribute('data-index', index);
    circle.style.cursor = 'pointer';
    circle.style.transition = 'r 0.2s, opacity 0.2s, filter 0.2s';
    
    // Add Click listener to jump to node
    circle.addEventListener('click', () => {
      jumpToNode(index);
    });

    nodesGroup.appendChild(circle);
  });

  // Helper to calculate normal coordinate offset at any index
  function getRoadNormal(index, offsetDistance) {
    const pt = nodePoints[index];
    let nextPt = nodePoints[Math.min(index + 1, 59)];
    let prevPt = nodePoints[Math.max(index - 1, 0)];
    
    let dx = nextPt.x - prevPt.x;
    let dy = nextPt.y - prevPt.y;
    
    if (index === 0) {
      nextPt = nodePoints[1];
      dx = nextPt.x - pt.x;
      dy = nextPt.y - pt.y;
    } else if (index === 59) {
      prevPt = nodePoints[58];
      dx = pt.x - prevPt.x;
      dy = pt.y - prevPt.y;
    }
    
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return { x: pt.x, y: pt.y - offsetDistance };
    
    const tx = dx / len;
    const ty = dy / len;
    
    // Normal vector pointing "up/left" relative to road direction
    const nx = ty;
    const ny = -tx;
    
    return {
      x: pt.x + nx * offsetDistance,
      y: pt.y + ny * offsetDistance
    };
  }

  // Helper to create waving flags similar to design image (offset to roadside curb)
  function createWavingFlag(index, label, durationText = null, isStart = false) {
    // Offset flags by 39px to place them exactly on the far curb (curb edge is 37px)
    const pt = getRoadNormal(index, 39);
    const x = pt.x;
    const y = pt.y;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Ellipse base on the curb
    if (isStart) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      el.setAttribute('cx', x);
      el.setAttribute('cy', y);
      el.setAttribute('rx', '14');
      el.setAttribute('ry', '5');
      el.setAttribute('fill', '#00E6F6');
      el.setAttribute('opacity', '0.85');
      g.appendChild(el);
    } else {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      el.setAttribute('cx', x);
      el.setAttribute('cy', y);
      el.setAttribute('rx', '10');
      el.setAttribute('ry', '3.5');
      el.setAttribute('fill', '#1e293b');
      el.setAttribute('stroke', '#cbd5e1');
      el.setAttribute('stroke-width', '1.5');
      g.appendChild(el);
    }
    
    // Flagpole
    const pole = document.createElementNS("http://www.w3.org/2000/svg", "line");
    pole.setAttribute('x1', x);
    pole.setAttribute('y1', y - 6); // start at curb top
    pole.setAttribute('x2', x);
    pole.setAttribute('y2', y - 86);
    pole.setAttribute('stroke', '#cbd5e1');
    pole.setAttribute('stroke-width', '2.2');
    g.appendChild(pole);
    
    const cap = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cap.setAttribute('cx', x);
    cap.setAttribute('cy', y - 86);
    cap.setAttribute('r', '2');
    cap.setAttribute('fill', '#f1f5f9');
    g.appendChild(cap);
    
    // Flag cloth waviness shape (Scaled 1.5x)
    const cloth = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const flagPath = `M ${x} ${y - 82} 
                      C ${x + 18} ${y - 86}, ${x + 36} ${y - 78}, ${x + 54} ${y - 82} 
                      L ${x + 54} ${y - 46} 
                      C ${x + 36} ${y - 42}, ${x + 18} ${y - 50}, ${x} ${y - 46} 
                      Z`;
    cloth.setAttribute('d', flagPath);
    cloth.setAttribute('fill', '#ffffff');
    cloth.setAttribute('stroke', '#cbd5e1');
    cloth.setAttribute('stroke-width', '0.6');
    g.appendChild(cloth);
    
    // Text label on flag cloth (Georgia, italic, serif style, larger)
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute('x', x + 27);
    txt.setAttribute('y', y - 60);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', '#0f172a');
    txt.setAttribute('font-family', "Georgia, serif");
    txt.setAttribute('font-style', "italic");
    txt.setAttribute('font-weight', "bold");
    txt.setAttribute('font-size', "11.5");
    txt.textContent = label;
    g.appendChild(txt);
    
    // Duration text below base (with a premium dark capsule badge for contrast)
    if (durationText) {
      // Dark capsule background
      const badge = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      badge.setAttribute('x', x - 32);
      badge.setAttribute('y', y + 10);
      badge.setAttribute('width', '64');
      badge.setAttribute('height', '18');
      badge.setAttribute('rx', '9');
      badge.setAttribute('fill', '#090d16');
      badge.setAttribute('stroke', 'rgba(255, 176, 32, 0.35)');
      badge.setAttribute('stroke-width', '1');
      g.appendChild(badge);

      const dur = document.createElementNS("http://www.w3.org/2000/svg", "text");
      dur.setAttribute('x', x);
      dur.setAttribute('y', y + 22);
      dur.setAttribute('text-anchor', 'middle');
      dur.setAttribute('fill', '#FFB020');
      dur.setAttribute('font-family', "Georgia, serif");
      dur.setAttribute('font-style', "italic");
      dur.setAttribute('font-weight', "700");
      dur.setAttribute('font-size', "10.5");
      dur.textContent = durationText;
      g.appendChild(dur);
    }
    
    return g;
  }

  // A. START point flag
  const startFlag = createWavingFlag(0, "Start", null, true);
  monumentsGroup.appendChild(startFlag);

  // B. SQL Milestone Flag (Day 18)
  const sqlFlag = createWavingFlag(17, "SQL", "18 days");
  monumentsGroup.appendChild(sqlFlag);

  // C. Excel Milestone Flag (Day 30)
  const excelFlag = createWavingFlag(29, "EXCEL", "12 days");
  monumentsGroup.appendChild(excelFlag);

  // D. Python Milestone Flag (Day 60)
  const pythonFlag = createWavingFlag(59, "Python", "30 days");
  monumentsGroup.appendChild(pythonFlag);

  // E. Dynamically generate guardrail posts along the highway curves
  for (let i = 0; i < 60; i += 3) {
    // Far side posts (at offset 37px, connecting curb at -6 to rail at -14)
    const farPt = getRoadNormal(i, 37);
    const farPost = document.createElementNS("http://www.w3.org/2000/svg", "line");
    farPost.setAttribute('x1', farPt.x);
    farPost.setAttribute('y1', farPt.y - 6);
    farPost.setAttribute('x2', farPt.x);
    farPost.setAttribute('y2', farPt.y - 14);
    farPost.setAttribute('stroke', '#475569');
    farPost.setAttribute('stroke-width', '1.5');
    decorationsGroup.appendChild(farPost);

    // Near side posts (at offset -37px, connecting curb at -6 to rail at -14)
    const nearPt = getRoadNormal(i, -37);
    const nearPost = document.createElementNS("http://www.w3.org/2000/svg", "line");
    nearPost.setAttribute('x1', nearPt.x);
    nearPost.setAttribute('y1', nearPt.y - 6);
    nearPost.setAttribute('x2', nearPt.x);
    nearPost.setAttribute('y2', nearPt.y - 14);
    nearPost.setAttribute('stroke', '#334155');
    nearPost.setAttribute('stroke-width', '1.5');
    decorationsGroup.appendChild(nearPost);
  }

  // 3. Animation State Management
  let currentNodeIndex = 0;
  let isJumping = false;
  let timerId = null;

  // Initialize first position
  const pFirst = nodePoints[0];
  orb.setAttribute('cx', pFirst.x);
  orb.setAttribute('cy', pFirst.y);
  updateNodeHighlight(0);
  updateDayCard(1);

  // Start automatic animation loop
  startAnimationLoop();

  function startAnimationLoop() {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(nextStep, 1500); // initial wait of 1.5s at start
  }

  function nextStep() {
    if (isJumping) return;
    const prevIndex = currentNodeIndex;
    const nextIndex = (currentNodeIndex + 1) % 60;
    
    triggerTransition(prevIndex, nextIndex);
  }

  function jumpToNode(index) {
    if (index === currentNodeIndex) return;
    isJumping = true;
    if (timerId) clearTimeout(timerId);
    
    const prevIndex = currentNodeIndex;
    triggerTransition(prevIndex, index, 300, () => {
      isJumping = false;
      timerId = setTimeout(nextStep, 1500); // pause longer at clicked node before resuming
    });
  }

  function triggerTransition(prevIndex, nextIndex, speed = 150, callback = null) {
    const startPt = nodePoints[prevIndex];
    const endPt = nodePoints[nextIndex];
    currentNodeIndex = nextIndex;

    animateOrb(startPt, endPt, speed, () => {
      // On Arrival
      triggerRipple(endPt);
      updateDayCard(nextIndex + 1);
      updateNodeHighlight(nextIndex);
      updateLinkLine();
      updateMobileScroll(endPt);

      if (callback) {
        callback();
      } else {
        // Continue auto loop
        timerId = setTimeout(nextStep, 750); // Pause for 0.75s at each node
      }
    });
  }

  // Orb animator using cubic-bezier easing
  function animateOrb(from, to, duration, callback) {
    const startTime = performance.now();
    const day = currentNodeIndex + 1;
    let phaseColor = '#10B981'; // SQL
    let glowFilter = 'url(#glow-emerald)';
    
    if (day > 18 && day <= 30) {
      phaseColor = '#FFB020'; // Excel
      glowFilter = 'url(#glow-gold)';
    } else if (day > 30) {
      phaseColor = '#00E6F6'; // Python
      glowFilter = 'url(#glow-cyan)';
    }

    orb.setAttribute('fill', phaseColor);
    orb.setAttribute('filter', glowFilter);
    ripple.setAttribute('stroke', phaseColor);

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: Cubic-bezier equivalent for natural accel/decel
      const eased = progress * progress * (3 - 2 * progress);
      
      const currentX = from.x + (to.x - from.x) * eased;
      const currentY = from.y + (to.y - from.y) * eased;
      
      orb.setAttribute('cx', currentX);
      orb.setAttribute('cy', currentY);
      updateLinkLine();
      
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        callback();
      }
    }
    requestAnimationFrame(tick);
  }

  // Ripple effect on node arrival
  function triggerRipple(pt) {
    ripple.setAttribute('cx', pt.x);
    ripple.setAttribute('cy', pt.y);
    ripple.setAttribute('r', '8');
    ripple.setAttribute('opacity', '0.8');
    
    const startTime = performance.now();
    const duration = 250; // runs during the 250ms node pause
    
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentR = 8 + progress * 20; // expand from radius 8 to 28
      const currentOpacity = 0.8 * (1 - progress); // fade out
      
      ripple.setAttribute('r', currentR);
      ripple.setAttribute('opacity', currentOpacity);
      
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  // Update illuminated/dimmed nodes
  function updateNodeHighlight(activeIndex) {
    const nodes = nodesGroup.querySelectorAll('circle');
    nodes.forEach((node, idx) => {
      if (idx === activeIndex) {
        // Active Node
        node.setAttribute('r', '10');
        node.setAttribute('opacity', '1');
        node.style.filter = 'drop-shadow(0 0 4px currentColor)';
      } else if (idx < activeIndex) {
        // Completed Nodes (remain lit, original size)
        node.setAttribute('r', '5.5');
        node.setAttribute('opacity', '0.8');
        node.style.filter = 'none';
      } else {
        // Future Nodes (dimmed)
        node.setAttribute('r', '5.5');
        node.setAttribute('opacity', '0.25');
        node.style.filter = 'none';
      }
    });
  }

  // Update card content with 0.4s slide-fade-blur transition
  function updateDayCard(day) {
    const topic = CURRICULUM[day - 1];
    
    // Add updating transition class to trigger slide/fade/blur
    card.classList.add('updating');
    
    setTimeout(() => {
      // Update DOM values
      document.getElementById('cardDay').textContent = `Day ${String(day).padStart(2, '0')}`;
      document.getElementById('cardTitle').textContent = topic.title;
      document.getElementById('cardObjective').textContent = topic.obj;
      
      const progressPercent = ((day / 60) * 100).toFixed(1);
      document.getElementById('cardProgressFill').style.width = `${progressPercent}%`;
      document.getElementById('cardProgressText').textContent = `${progressPercent}% Complete`;

      // Status Badge
      const badge = document.getElementById('cardStatusBadge');
      if (topic.status === 'FREE') {
        badge.textContent = 'FREE';
        badge.className = 'card-status-badge free';
      } else {
        badge.textContent = '🔒 PREMIUM';
        badge.className = 'card-status-badge premium';
      }

      // Dynamic Card Icon based on course phase
      const iconWrapper = document.getElementById('cardIconWrapper');
      if (iconWrapper) {
        let iconHtml = '';
        if (topic.phase === 'sql') {
          iconHtml = `
            <div class="card-phase-icon" style="background: rgba(167, 139, 250, 0.15); border: 1px solid rgba(167, 139, 250, 0.35); border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; box-shadow: 0 0 12px rgba(167, 139, 250, 0.1);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-2.239 10-5V7c0-2.761-4.477-5-10-5S2 4.239 2 7v10c0 2.761 4.477 5 10 5z"/>
                <path d="M2 7c0 2.761 4.477 5 10 5s10-2.239 10-5"/>
                <path d="M2 12c0 2.761 4.477 5 10 5s10-2.239 10-5"/>
              </svg>
            </div>`;
        } else if (topic.phase === 'excel') {
          iconHtml = `
            <div class="card-phase-icon" style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.35); border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; box-shadow: 0 0 12px rgba(251, 191, 36, 0.1);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="17" y1="3" x2="17" y2="21"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
              </svg>
            </div>`;
        } else {
          iconHtml = `
            <div class="card-phase-icon" style="background: rgba(34, 211, 238, 0.15); border: 1px solid rgba(34, 211, 238, 0.35); border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; box-shadow: 0 0 12px rgba(34, 211, 238, 0.1);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>`;
        }
        iconWrapper.innerHTML = iconHtml;
      }

      // Dynamic glow matching phase
      let glowColor = 'rgba(16, 185, 129, 0.25)'; // SQL
      if (day > 18 && day <= 30) glowColor = 'rgba(255, 176, 32, 0.25)'; // Excel
      else if (day > 30) glowColor = 'rgba(0, 230, 246, 0.25)'; // Python

      card.style.boxShadow = `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${glowColor}`;

      // Remove updating class to transition new content in
      card.classList.remove('updating');
    }, 150); // halfway point of the card transition
  }

  // Mobile viewport centering scroll mechanism
  function updateMobileScroll(pt) {
    if (window.innerWidth > 768) return; // Only trigger scroll follow on mobile layout
    const container = document.getElementById('interactiveRoadmap');
    if (!container) return;

    // Center coordinates
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // SVG coordinates are 800x650
    const svgWidth = 800;
    const svgHeight = 650;
    
    const ratioX = containerWidth / svgWidth;
    const ratioY = containerHeight / svgHeight;
    const scale = Math.min(ratioX, ratioY);
    
    const nodeX = pt.x * scale;
    const nodeY = pt.y * scale;

    container.scrollTo({
      left: nodeX - containerWidth / 2,
      top: nodeY - containerHeight / 2,
      behavior: 'smooth'
    });
  }

  // Dynamic Link Line update function
  function updateLinkLine() {
    const linkLine = document.getElementById('link-line');
    const arrowPath = document.querySelector('#arrow path');
    if (!linkLine) return;

    const orbRect = orb.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const container = document.getElementById('heroRoadmapContainer');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    if (orbRect.width === 0 || cardRect.width === 0) {
      linkLine.style.opacity = '0';
      return;
    } else {
      linkLine.style.opacity = '0.8';
    }

    // Orb center relative to container
    const x1 = (orbRect.left + orbRect.width / 2) - containerRect.left;
    const y1 = (orbRect.top + orbRect.height / 2) - containerRect.top;

    // Day card left middle relative to container
    const x2 = cardRect.left - containerRect.left;
    const y2 = (cardRect.top + cardRect.height / 2) - containerRect.top;

    linkLine.setAttribute('x1', x1);
    linkLine.setAttribute('y1', y1);
    linkLine.setAttribute('x2', x2);
    linkLine.setAttribute('y2', y2);

    // Set line color based on phase
    const day = currentNodeIndex + 1;
    let phaseColor = '#10B981'; // SQL Emerald
    if (day > 18 && day <= 30) {
      phaseColor = '#FFB020'; // Excel Gold
    } else if (day > 30) {
      phaseColor = '#00E6F6'; // Python Cyan
    }

    linkLine.setAttribute('stroke', phaseColor);
    if (arrowPath) {
      arrowPath.setAttribute('fill', phaseColor);
    }
  }

  // Setup link line update listeners
  window.addEventListener('resize', updateLinkLine, { passive: true });
  const roadmapContainer = document.getElementById('interactiveRoadmap');
  if (roadmapContainer) {
    roadmapContainer.addEventListener('scroll', updateLinkLine, { passive: true });
  }

  // Initial update after DOM loads and layout stabilizes
  setTimeout(updateLinkLine, 200);
});
