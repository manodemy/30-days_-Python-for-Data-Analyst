// Complete 60-Day Course Content Manifest across SQL, Excel, and Python
(function() {
  'use strict';

  const SVG_ICONS = {
    sql: `<span class="track-logo-badge track-logo-sql" title="SQL Track"><svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg></span>`,
    excel: `<span class="track-logo-badge track-logo-excel" title="Excel Track"><svg viewBox="0 0 23 23" fill="none" style="width:14px;height:14px;"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg></span>`,
    python: `<span class="track-logo-badge track-logo-python" title="Python Track"><svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;"><path d="M11.927 2.1c-4.225 0-3.957 1.83-3.957 1.83l.004 1.895h4.033v.57H6.33S3.5 6.064 3.5 10.284c0 4.22 2.47 4.07 2.47 4.07h1.474v-2.07s-.08-2.47 2.43-2.47h4.167s2.35.038 2.35-2.312V4.012S16.85 2.1 11.927 2.1zm-2.22 1.342a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z" fill="#3b82f6"/><path d="M12.073 21.9c4.225 0 3.957-1.83 3.957-1.83l-.004-1.895h-4.033v-.57h5.677s2.83.33 2.83-3.89c0-4.22-2.47-4.07-2.47-4.07h-1.474v2.07s.08 2.47-2.43 2.47h-4.167s-2.35-.038-2.35 2.312v3.488s-.458 1.912 4.464 1.912zm2.22-1.342a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z" fill="#eab308"/></svg></span>`
  };

  const MANIFEST_60 = [
    // 🗄️ SQL Track (Days 01–18)
    { globalDay: 1, track: 'sql', id: 'day01', trackDay: 1, title: 'Introduction to SQL & Databases', emoji: '🗄️', url: '/sql/day01.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 2, track: 'sql', id: 'day02', trackDay: 2, title: 'SELECT, DISTINCT & ORDER BY', emoji: '💾', url: '/sql/day02.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 3, track: 'sql', id: 'day03', trackDay: 3, title: 'Filtering Data: WHERE & LIKE', emoji: '🔍', url: '/sql/day03.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 4, track: 'sql', id: 'day04', trackDay: 4, title: 'Operators, Expressions & Math', emoji: '⚙️', url: '/sql/day04.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 5, track: 'sql', id: 'day05', trackDay: 5, title: 'Aggregate Functions: COUNT & SUM', emoji: '📊', url: '/sql/day05.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 6, track: 'sql', id: 'day06', trackDay: 6, title: 'GROUP BY & HAVING Clauses', emoji: '🗃️', url: '/sql/day06.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 7, track: 'sql', id: 'day07', trackDay: 7, title: 'Scalar & String Functions', emoji: '🧵', url: '/sql/day07.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 8, track: 'sql', id: 'day08', trackDay: 8, title: 'Date & Time Functions', emoji: '📅', url: '/sql/day08.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 9, track: 'sql', id: 'day09', trackDay: 9, title: 'CASE Expressions & Logic', emoji: '🔀', url: '/sql/day09.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 10, track: 'sql', id: 'day10', trackDay: 10, title: 'Joins Fundamentals: INNER & LEFT', emoji: '🔗', url: '/sql/day10.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 11, track: 'sql', id: 'day11', trackDay: 11, title: 'Advanced Joins & Self-Joins', emoji: '🔄', url: '/sql/day11.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 12, track: 'sql', id: 'day12', trackDay: 12, title: 'Set Operations: UNION & INTERSECT', emoji: '⛔', url: '/sql/day12.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 13, track: 'sql', id: 'day13', trackDay: 13, title: 'Subqueries & Correlated Queries', emoji: '🧠', url: '/sql/day13.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 14, track: 'sql', id: 'day14', trackDay: 14, title: 'Common Table Expressions (CTEs)', emoji: '🏗️', url: '/sql/day14.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 15, track: 'sql', id: 'day15', trackDay: 15, title: 'Window Functions: ROW_NUMBER & RANK', emoji: '🔢', url: '/sql/day15.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 16, track: 'sql', id: 'day16', trackDay: 16, title: 'Analytic Functions: LAG & LEAD', emoji: '📈', url: '/sql/day16.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 17, track: 'sql', id: 'day17', trackDay: 17, title: 'DDL, DML & Schema Design', emoji: '🛠️', url: '/sql/day17.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 18, track: 'sql', id: 'day18', trackDay: 18, title: 'Query Optimization & Capstone', emoji: '🏆', url: '/sql/day18.html', free: true, prepared: true, comingSoon: false },

    // 📊 Excel Track (Days 19–30 / Excel Days 01–12)
    { globalDay: 19, track: 'excel', id: 'excel-day01', trackDay: 1, title: 'Spreadsheet Basics & Formulas', emoji: '📊', url: '/excel/day01.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 20, track: 'excel', id: 'excel-day02', trackDay: 2, title: 'Formatting, Sorting & Filtering', emoji: '🎨', url: '/excel/day02.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 21, track: 'excel', id: 'excel-day03', trackDay: 3, title: 'Data Cleaning & Validation', emoji: '🧹', url: '/excel/day03.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 22, track: 'excel', id: 'excel-day04', trackDay: 4, title: 'Excel Tables & Structured References', emoji: '📋', url: '/excel/day04.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 23, track: 'excel', id: 'excel-day05', trackDay: 5, title: 'Logic Functions: IF, AND & OR', emoji: '🔀', url: '/excel/day05.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 24, track: 'excel', id: 'excel-day06', trackDay: 6, title: 'Lookup Functions: XLOOKUP & INDEX', emoji: '🔍', url: '/excel/day06.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 25, track: 'excel', id: 'excel-day07', trackDay: 7, title: 'Text Functions & Dynamic Arrays', emoji: '🔤', url: '/excel/day07.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 26, track: 'excel', id: 'excel-day08', trackDay: 8, title: 'Date & Time Analytics', emoji: '📅', url: '/excel/day08.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 27, track: 'excel', id: 'excel-day09', trackDay: 9, title: 'Conditional Aggregations: SUMIFS', emoji: '📈', url: '/excel/day09.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 28, track: 'excel', id: 'excel-day10', trackDay: 10, title: 'PivotTables: Grouping & Slicers', emoji: '🗂️', url: '/excel/day10.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 29, track: 'excel', id: 'excel-day11', trackDay: 11, title: 'Advanced PivotTables & Pivot Charts', emoji: '📊', url: '/excel/day11.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 30, track: 'excel', id: 'excel-day12', trackDay: 12, title: 'What-If Analysis & Corporate Capstone', emoji: '🏆', url: '/excel/day12.html', free: true, prepared: true, comingSoon: false },

    // 🐍 Python Track (Days 31–60 / Python Days 01–30)
    { globalDay: 31, track: 'python', id: 'pyDay01', trackDay: 1, title: 'Data Types & Memory', emoji: '🔢', url: '/python/day01.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 32, track: 'python', id: 'pyDay02', trackDay: 2, title: 'Operators & Expressions', emoji: '⚙️', url: '/python/day02.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 33, track: 'python', id: 'pyDay03', trackDay: 3, title: 'Strings & Text Processing', emoji: '🔤', url: '/python/day03.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 34, track: 'python', id: 'pyDay04', trackDay: 4, title: 'Lists & Sequence Operations', emoji: '📋', url: '/python/day04.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 35, track: 'python', id: 'pyDay05', trackDay: 5, title: 'Tuples & Immutability', emoji: '🔒', url: '/python/day05.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 36, track: 'python', id: 'pyDay06', trackDay: 6, title: 'Sets & Mathematical Operations', emoji: '⭕', url: '/python/day06.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 37, track: 'python', id: 'pyDay07', trackDay: 7, title: 'Dictionaries & Hash Tables', emoji: '📖', url: '/python/day07.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 38, track: 'python', id: 'pyDay08', trackDay: 8, title: 'Conditionals & Branching Logic', emoji: '🔀', url: '/python/day08.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 39, track: 'python', id: 'pyDay09', trackDay: 9, title: 'Loops & Iteration Mechanics', emoji: '🔁', url: '/python/day09.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 40, track: 'python', id: 'pyDay10', trackDay: 10, title: 'Functions, Scope & Lambdas', emoji: '📦', url: '/python/day10.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 41, track: 'python', id: 'pyDay11', trackDay: 11, title: 'List & Dict Comprehensions', emoji: '⚡', url: '/python/day11.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 42, track: 'python', id: 'pyDay12', trackDay: 12, title: 'Regular Expressions (Regex)', emoji: '🔍', url: '/python/day12.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 43, track: 'python', id: 'pyDay13', trackDay: 13, title: 'Error & Exception Handling', emoji: '🛡️', url: '/python/day13.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 44, track: 'python', id: 'pyDay14', trackDay: 14, title: 'File I/O: CSV & JSON Data', emoji: '📁', url: '/python/day14.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 45, track: 'python', id: 'pyDay15', trackDay: 15, title: 'Collections & Complexity', emoji: '⏱️', url: '/python/day15.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 46, track: 'python', id: 'pyDay16', trackDay: 16, title: 'NumPy Arrays & Vectorization', emoji: '🔢', url: '/python/day16.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 47, track: 'python', id: 'pyDay17', trackDay: 17, title: 'NumPy Indexing & Slicing', emoji: '📐', url: '/python/day17.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 48, track: 'python', id: 'pyDay18', trackDay: 18, title: 'Pandas Series & DataFrames', emoji: '🐼', url: '/python/day18.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 49, track: 'python', id: 'pyDay19', trackDay: 19, title: 'Pandas Filtering: loc & iloc', emoji: '🎯', url: '/python/day19.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 50, track: 'python', id: 'pyDay20', trackDay: 20, title: 'Data Cleaning & Missing Values', emoji: '🧹', url: '/python/day20.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 51, track: 'python', id: 'pyDay21', trackDay: 21, title: 'Data Transformation & Casting', emoji: '🔄', url: '/python/day21.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 52, track: 'python', id: 'pyDay22', trackDay: 22, title: 'Pandas GroupBy & Aggregations', emoji: '📊', url: '/python/day22.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 53, track: 'python', id: 'pyDay23', trackDay: 23, title: 'Merging & Joining DataFrames', emoji: '🔗', url: '/python/day23.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 54, track: 'python', id: 'pyDay24', trackDay: 24, title: 'Reshaping: Pivot & Melt', emoji: '🧱', url: '/python/day24.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 55, track: 'python', id: 'pyDay25', trackDay: 25, title: 'Time Series & Datetime Analytics', emoji: '⏰', url: '/python/day25.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 56, track: 'python', id: 'pyDay26', trackDay: 26, title: 'Data Viz with Matplotlib', emoji: '📈', url: '/python/day26.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 57, track: 'python', id: 'pyDay27', trackDay: 27, title: 'Statistical Charts with Seaborn', emoji: '🎨', url: '/python/day27.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 58, track: 'python', id: 'pyDay28', trackDay: 28, title: 'Scikit-Learn Preprocessing', emoji: '🤖', url: '/python/day28.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 59, track: 'python', id: 'pyDay29', trackDay: 29, title: 'Classification & Clustering', emoji: '🌲', url: '/python/day29.html', free: true, prepared: true, comingSoon: false },
    { globalDay: 60, track: 'python', id: 'pyDay30', trackDay: 30, title: 'End-to-End Analytics Capstone', emoji: '🏆', url: '/python/day30.html', free: true, prepared: true, comingSoon: false },
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
