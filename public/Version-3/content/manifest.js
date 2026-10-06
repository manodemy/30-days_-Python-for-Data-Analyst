// Complete 60-Day Course Content Manifest across SQL, Excel, and Python
(function() {
  'use strict';

  const SVG_ICONS = {
    sql: `<span class="track-logo-badge track-logo-sql" title="SQL Track"><svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg></span>`,
    excel: `<span class="track-logo-badge track-logo-excel" title="Excel Track"><svg viewBox="0 0 23 23" fill="none" style="width:14px;height:14px;"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg></span>`,
    python: `<span class="track-logo-badge track-logo-python" title="Python Track"><svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;"><path d="M11.927 2.1c-4.225 0-3.957 1.83-3.957 1.83l.004 1.895h4.033v.57H6.33S3.5 6.064 3.5 10.284c0 4.22 2.47 4.07 2.47 4.07h1.474v-2.07s-.08-2.47 2.43-2.47h4.167s2.35.038 2.35-2.312V4.012S16.85 2.1 11.927 2.1zm-2.22 1.342a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z" fill="#3b82f6"/><path d="M12.073 21.9c4.225 0 3.957-1.83 3.957-1.83l-.004-1.895h-4.033v-.57h5.677s2.83.33 2.83-3.89c0-4.22-2.47-4.07-2.47-4.07h-1.474v2.07s.08 2.47-2.43 2.47h-4.167s-2.35-.038-2.35 2.312v3.488s-.458 1.912 4.464 1.912zm2.22-1.342a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z" fill="#eab308"/></svg></span>`
  };

  const MANIFEST_60 = [
    // 🗄️ SQL Track (Days 01–18) — Days 01–17 Free & Active; Day 18 Capstone
    { globalDay: 1, track: 'sql', id: 'day01', trackDay: 1, title: 'Introduction to SQL & Databases', emoji: '🗄️', url: '/sql/day01.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 2, track: 'sql', id: 'day02', trackDay: 2, title: 'Basic Retrieval: SELECT, DISTINCT, ORDER BY & LIMIT', emoji: '💾', url: '/sql/day02.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 3, track: 'sql', id: 'day03', trackDay: 3, title: 'Filtering Data (WHERE, LIKE, IN, BETWEEN)', emoji: '🔍', url: '/sql/day03.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 4, track: 'sql', id: 'day04', trackDay: 4, title: 'Operators & Expressions', emoji: '⚙️', url: '/sql/day04.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 5, track: 'sql', id: 'day05', trackDay: 5, title: 'Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)', emoji: '📊', url: '/sql/day05.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 6, track: 'sql', id: 'day06', trackDay: 6, title: 'GROUP BY & HAVING Clauses', emoji: '🗃️', url: '/sql/day06.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 7, track: 'sql', id: 'day07', trackDay: 7, title: 'Single-Row & Scalar Functions', emoji: '🧵', url: '/sql/day07.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 8, track: 'sql', id: 'day08', trackDay: 8, title: 'Date & Time Manipulation Functions', emoji: '📅', url: '/sql/day08.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 9, track: 'sql', id: 'day09', trackDay: 9, title: 'CASE Expressions & Conditional Logic', emoji: '🔀', url: '/sql/day09.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 10, track: 'sql', id: 'day10', trackDay: 10, title: 'Joins Fundamentals (INNER, LEFT, RIGHT)', emoji: '🔗', url: '/sql/day10.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 11, track: 'sql', id: 'day11', trackDay: 11, title: 'Advanced Joins, Self-Joins & CROSS JOINs', emoji: '🔄', url: '/sql/day11.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 12, track: 'sql', id: 'day12', trackDay: 12, title: 'Set Operations (UNION, UNION ALL, INTERSECT)', emoji: '⛔', url: '/sql/day12.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 13, track: 'sql', id: 'day13', trackDay: 13, title: 'Subqueries & Correlated Subqueries', emoji: '🧠', url: '/sql/day13.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 14, track: 'sql', id: 'day14', trackDay: 14, title: 'Common Table Expressions (CTEs) & Recursive CTEs', emoji: '🏗️', url: '/sql/day14.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 15, track: 'sql', id: 'day15', trackDay: 15, title: 'Window Functions I — Ranking (ROW_NUMBER, RANK)', emoji: '🔢', url: '/sql/day15.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 16, track: 'sql', id: 'day16', trackDay: 16, title: 'Window Functions II — Analytic (LAG, LEAD)', emoji: '📈', url: '/sql/day16.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 17, track: 'sql', id: 'day17', trackDay: 17, title: 'DDL, DML, Indexes & Constraints', emoji: '🛠️', url: '/sql/day17.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 18, track: 'sql', id: 'day18', trackDay: 18, title: 'Query Optimization & SQL Capstone Project', emoji: '🚀', url: '/sql/day18.html', free: false, prepared: false, comingSoon: true },

    // 📊 Excel Track (Days 19–30 / Excel Days 01–12) — Coming Soon in Active Preparation
    { globalDay: 19, track: 'excel', id: 'excel-day01', trackDay: 1, title: 'Excel Orientation & Essential Mathematical Formulas', emoji: '📊', url: '/excel/day01.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 20, track: 'excel', id: 'excel-day02', trackDay: 2, title: 'Cell Formatting, Sorting & Filtering', emoji: '🎨', url: '/excel/day02.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 21, track: 'excel', id: 'excel-day03', trackDay: 3, title: 'Data Cleaning Essentials & Deduplication', emoji: '🧹', url: '/excel/day03.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 22, track: 'excel', id: 'excel-day04', trackDay: 4, title: 'Excel Tables & Structured Table References', emoji: '📋', url: '/excel/day04.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 23, track: 'excel', id: 'excel-day05', trackDay: 5, title: 'Lookup & Reference: Modern XLOOKUP & INDEX/MATCH', emoji: '🔍', url: '/excel/day05.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 24, track: 'excel', id: 'excel-day06', trackDay: 6, title: 'Logical Functions: Nested IF, IFS, AND, OR, XOR', emoji: '🔀', url: '/excel/day06.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 25, track: 'excel', id: 'excel-day07', trackDay: 7, title: 'Text Functions: TEXTSPLIT, TEXTJOIN, CONCAT, MID', emoji: '📝', url: '/excel/day07.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 26, track: 'excel', id: 'excel-day08', trackDay: 8, title: 'Date & Time Functions: NETWORKDAYS, WORKDAY, EDATE', emoji: '📅', url: '/excel/day08.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 27, track: 'excel', id: 'excel-day09', trackDay: 9, title: 'Multi-Condition Aggregation: SUMIFS, COUNTIFS', emoji: '🧮', url: '/excel/day09.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 28, track: 'excel', id: 'excel-day10', trackDay: 10, title: 'PivotTables Core Mechanics, Grouping & Slicers', emoji: '⚙️', url: '/excel/day10.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 29, track: 'excel', id: 'excel-day11', trackDay: 11, title: 'Advanced PivotTables, Calculated Fields & Charts', emoji: '📈', url: '/excel/day11.html', free: false, prepared: false, comingSoon: true },
    { globalDay: 30, track: 'excel', id: 'excel-day12', trackDay: 12, title: 'Data Validation, What-If Analysis & Capstone', emoji: '🏆', url: '/excel/day12.html', free: false, prepared: false, comingSoon: true },

    // 🐍 Python Track (Days 31–60 / Python Days 01–30) — Days 31 & 32 Live & Ready
    { globalDay: 31, track: 'python', id: 'pyDay01', trackDay: 1, title: 'Python Data Types, Dynamic Typing & Memory Allocation', emoji: '🔢', url: '/python/day01.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 32, track: 'python', id: 'pyDay02', trackDay: 2, title: 'Operators, Expressions & Precedence', emoji: '➕', url: '/python/day02.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 33, track: 'python', id: 'pyDay03', trackDay: 3, title: 'Strings: Operations, Slicing & Methods', emoji: '🔤', url: '/python/day03.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 34, track: 'python', id: 'pyDay04', trackDay: 4, title: 'Lists: Operations, Slicing, Methods & Comprehensions', emoji: '📋', url: '/python/index.html?day=pyDay04', free: false, prepared: false, comingSoon: true },
    { globalDay: 35, track: 'python', id: 'pyDay05', trackDay: 5, title: 'Custom Functions, Parameters, Return Values & Scope', emoji: '📦', url: '/python/index.html?day=pyDay05', free: false, prepared: false, comingSoon: true },
    { globalDay: 36, track: 'python', id: 'pyDay06', trackDay: 6, title: 'Lists & Tuples: Sequence Operations & Mutability', emoji: '📋', url: '/python/index.html?day=pyDay06', free: false, prepared: false, comingSoon: true },
    { globalDay: 37, track: 'python', id: 'pyDay07', trackDay: 7, title: 'Dictionaries & Sets: Key-Value Hash Maps & Set Theory', emoji: '📚', url: '/python/index.html?day=pyDay07', free: false, prepared: false, comingSoon: true },
    { globalDay: 38, track: 'python', id: 'pyDay08', trackDay: 8, title: 'String Manipulation & Regular Expressions (Regex)', emoji: '📝', url: '/python/index.html?day=pyDay08', free: false, prepared: false, comingSoon: true },
    { globalDay: 39, track: 'python', id: 'pyDay09', trackDay: 9, title: 'Exception Handling: try, except, finally & Custom Errors', emoji: '⚠️', url: '/python/index.html?day=pyDay09', free: false, prepared: false, comingSoon: true },
    { globalDay: 40, track: 'python', id: 'pyDay10', trackDay: 10, title: 'File I/O: Reading & Writing CSV, JSON, Parquet & Excel', emoji: '📂', url: '/python/index.html?day=pyDay10', free: false, prepared: false, comingSoon: true },
    { globalDay: 41, track: 'python', id: 'pyDay11', trackDay: 11, title: 'NumPy Arrays: Creation, Data Types & Vectorization', emoji: '🧮', url: '/python/index.html?day=pyDay11', free: false, prepared: false, comingSoon: true },
    { globalDay: 42, track: 'python', id: 'pyDay12', trackDay: 12, title: 'NumPy Indexing, Slicing & Array Broadcasting', emoji: '📊', url: '/python/index.html?day=pyDay12', free: false, prepared: false, comingSoon: true },
    { globalDay: 43, track: 'python', id: 'pyDay13', trackDay: 13, title: 'Pandas Series & DataFrame Core Data Structures', emoji: '🐼', url: '/python/index.html?day=pyDay13', free: false, prepared: false, comingSoon: true },
    { globalDay: 44, track: 'python', id: 'pyDay14', trackDay: 14, title: 'Pandas Indexing: loc, iloc & Boolean Filtering', emoji: '🔍', url: '/python/index.html?day=pyDay14', free: false, prepared: false, comingSoon: true },
    { globalDay: 45, track: 'python', id: 'pyDay15', trackDay: 15, title: 'Data Cleaning: Handling Missing Data & Outliers', emoji: '🧹', url: '/python/index.html?day=pyDay15', free: false, prepared: false, comingSoon: true },
    { globalDay: 46, track: 'python', id: 'pyDay16', trackDay: 16, title: 'Data Transformation: map, apply, applymap & vector ops', emoji: '🔄', url: '/python/index.html?day=pyDay16', free: false, prepared: false, comingSoon: true },
    { globalDay: 47, track: 'python', id: 'pyDay17', trackDay: 17, title: 'Grouping & Aggregations: groupby & agg pipelines', emoji: '🗃️', url: '/python/index.html?day=pyDay17', free: false, prepared: false, comingSoon: true },
    { globalDay: 48, track: 'python', id: 'pyDay18', trackDay: 18, title: 'Merging, Joining & Concatenating DataFrames', emoji: '🔗', url: '/python/index.html?day=pyDay18', free: false, prepared: false, comingSoon: true },
    { globalDay: 49, track: 'python', id: 'pyDay19', trackDay: 19, title: 'Reshaping Data: melt, pivot & pivot_table', emoji: '📐', url: '/python/index.html?day=pyDay19', free: false, prepared: false, comingSoon: true },
    { globalDay: 50, track: 'python', id: 'pyDay20', trackDay: 20, title: 'Time Series Analysis & Datetime Indexing', emoji: '📅', url: '/python/index.html?day=pyDay20', free: false, prepared: false, comingSoon: true },
    { globalDay: 51, track: 'python', id: 'pyDay21', trackDay: 21, title: 'Matplotlib Fundamentals: Line, Bar, Scatter & Styling', emoji: '📈', url: '/python/index.html?day=pyDay21', free: false, prepared: false, comingSoon: true },
    { globalDay: 52, track: 'python', id: 'pyDay22', trackDay: 22, title: 'Seaborn Statistical Visualizations: Distributions & Heatmaps', emoji: '📊', url: '/python/index.html?day=pyDay22', free: false, prepared: false, comingSoon: true },
    { globalDay: 53, track: 'python', id: 'pyDay23', trackDay: 23, title: 'Exploratory Data Analysis (EDA) Production Blueprint', emoji: '🔍', url: '/python/index.html?day=pyDay23', free: false, prepared: false, comingSoon: true },
    { globalDay: 54, track: 'python', id: 'pyDay24', trackDay: 24, title: 'Web Scraping & REST APIs for Automated Data Collection', emoji: '🌐', url: '/python/index.html?day=pyDay24', free: false, prepared: false, comingSoon: true },
    { globalDay: 55, track: 'python', id: 'pyDay25', trackDay: 25, title: 'Database Integration with SQLAlchemy & SQLite', emoji: '🗄️', url: '/python/index.html?day=pyDay25', free: false, prepared: false, comingSoon: true },
    { globalDay: 56, track: 'python', id: 'pyDay26', trackDay: 26, title: 'Performance Optimization & Memory Profiling in Pandas', emoji: '⚡', url: '/python/index.html?day=pyDay26', free: false, prepared: false, comingSoon: true },
    { globalDay: 57, track: 'python', id: 'pyDay27', trackDay: 27, title: 'Statistical Testing & Hypothesis Formulation', emoji: '🧪', url: '/python/index.html?day=pyDay27', free: false, prepared: false, comingSoon: true },
    { globalDay: 58, track: 'python', id: 'pyDay28', trackDay: 28, title: 'Scikit-Learn Introduction: Preprocessing & Regression', emoji: '🤖', url: '/python/index.html?day=pyDay28', free: false, prepared: false, comingSoon: true },
    { globalDay: 59, track: 'python', id: 'pyDay29', trackDay: 29, title: 'Classification Trees & Clustering Fundamentals', emoji: '🌲', url: '/python/index.html?day=pyDay29', free: false, prepared: false, comingSoon: true },
    { globalDay: 60, track: 'python', id: 'pyDay30', trackDay: 30, title: 'Production Analytics Capstone & End-to-End Portfolio', emoji: '🏆', url: '/python/index.html?day=pyDay30', free: false, prepared: false, comingSoon: true }
  ];

  window.COURSE_MANIFEST_60 = MANIFEST_60;
  window.SVG_TRACK_ICONS = SVG_ICONS;

  // Show a sleek Coming Soon notification
  window.showComingSoonToast = function(dayTitle, dayNum) {
    let toast = document.getElementById('comingSoonToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'comingSoonToast';
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:rgba(15,23,42,0.95);border:1px solid rgba(56,189,248,0.4);border-radius:12px;padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 10px 35px rgba(0,0,0,0.6),0 0 20px rgba(56,189,248,0.2);z-index:99999;transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);font-family:sans-serif;color:#f8fafc;font-size:0.86rem;backdrop-filter:blur(10px);pointer-events:none;max-width:90vw;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span style="font-size:1.2rem;">⏳</span>
      <div>
        <strong style="color:#38bdf8;display:block;">Day ${String(dayNum).padStart(2,'0')} is Coming Soon!</strong>
        <span style="color:#94a3b8;font-size:0.78rem;">${dayTitle} is in active production and releasing shortly.</span>
      </div>
    `;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(window.__comingSoonTimeout);
    window.__comingSoonTimeout = setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3500);
  };

  // Keep legacy COURSE_MANIFEST for SQL module backwards compatibility
  window.COURSE_MANIFEST = MANIFEST_60.filter(d => d.track === 'sql');
})();
