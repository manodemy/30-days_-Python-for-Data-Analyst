import React from 'react';
import { Metadata } from 'next';
import { getSupabaseServerClient, getSupabaseAdminClient } from '../../../lib/supabaseServer';
import { redirect } from 'next/navigation';
import NotebookInitializer from '../../../components/NotebookInitializer';

export const dynamic = 'force-dynamic';

interface Section {
  anchor: string;
  title: string;
}

// Generate dynamic metadata for SEO including canonical tags and index blocks
export async function generateMetadata({ params }: { params: { dayId: string } }): Promise<Metadata> {
  const cleanDayId = params.dayId.endsWith('.html') ? params.dayId.replace('.html', '') : params.dayId;
  
  let courseType = 'python';
  let dayNum = 1;
  let courseTitle = "30-Day Python for Data Analyst";
  
  if (cleanDayId.startsWith('sql-')) {
    courseType = 'sql';
    dayNum = parseInt(cleanDayId.replace('sql-day', ''), 10);
    courseTitle = "SQL for Data Analyst";
  } else if (cleanDayId.startsWith('excel-')) {
    courseType = 'excel';
    dayNum = parseInt(cleanDayId.replace('excel-day', ''), 10);
    courseTitle = "Excel for Data Analyst";
  } else {
    courseType = 'python';
    dayNum = parseInt(cleanDayId.replace('day', ''), 10);
    courseTitle = "30-Day Python for Data Analyst";
  }
  
  const formattedDay = dayNum.toString().padStart(2, '0');
  const title = `Day ${formattedDay} Notebook — ${courseTitle} — Manodemy`;

  return {
    title,
    description: `Day ${formattedDay}: Interactive workbook. Part of Manodemy's ${courseTitle} course.`,
    alternates: {
      canonical: `https://www.manodemy.com/notebook/${cleanDayId}`,
    },
    robots: dayNum >= 3 ? 'noindex, nofollow' : 'index, follow',
  };
}

export default async function NotebookPage({ params }: { params: { dayId: string } }) {
  const cleanDayId = params.dayId.endsWith('.html') ? params.dayId.replace('.html', '') : params.dayId;

  // ── Input Validation: block path traversal & invalid dayId formats ──────────
  const dayIdPattern = /^(day(0[1-9]|[12][0-9]|30)|sql-day(0[1-9]|1[0-8])|excel-day(0[1-9]|1[0-2]))$/;
  if (!dayIdPattern.test(cleanDayId)) {
    redirect('/landing_v2/index.html');
  }

  let courseType = 'python';
  let dayNum = 1;
  let courseTitle = "30-Day Python for Data Analyst";
  let maxDays = 30;
  let courseId = 'python-30day';

  if (cleanDayId.startsWith('sql-')) {
    courseType = 'sql';
    dayNum = parseInt(cleanDayId.replace('sql-day', ''), 10);
    courseTitle = "SQL for Data Analyst";
    maxDays = 18;
    courseId = 'sql-20day';
  } else if (cleanDayId.startsWith('excel-')) {
    courseType = 'excel';
    dayNum = parseInt(cleanDayId.replace('excel-day', ''), 10);
    courseTitle = "Excel for Data Analyst";
    maxDays = 12;
    courseId = 'excel-12day';
  } else {
    courseType = 'python';
    dayNum = parseInt(cleanDayId.replace('day', ''), 10);
    courseTitle = "30-Day Python for Data Analyst";
    maxDays = 30;
    courseId = 'python-30day';
  }

  const formattedDay = dayNum.toString().padStart(2, '0');

  // ── Server-Side Auth & Enrollment Guard for Protected Days (3+) ───────────
  if (dayNum >= 3 && dayNum <= maxDays) {
    const supabase = getSupabaseServerClient();
    // Use admin client for profile fetch so RLS never blocks reading plan/plan_type
    const adminClient = getSupabaseAdminClient();

    // getUser() validates JWT with Supabase Auth servers
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect(`/landing_v2/index.html?redirect=${encodeURIComponent(`/notebook/${cleanDayId}`)}`);
    }

    // Fetch profile via admin client to always get real plan/plan_type values (bypasses RLS)
    const { data: profile } = await adminClient
      .from('profiles')
      .select('role, plan, plan_type')
      .eq('id', user!.id)
      .single();

    const isAdmin = profile?.role === 'admin';
    // Check all possible paid-user signals: JWT metadata, profile.plan, or profile.plan_type
    const isPro =
      user?.user_metadata?.plan === 'pro' ||
      profile?.plan === 'pro' ||
      profile?.plan_type === 'premium' ||
      profile?.plan_type === 'pro';

    // If user is admin or paid, grant access immediately — no need for check_enrollment
    if (!isAdmin && !isPro) {
      // Fall back to enrollment check only for free users
      const { data: enrolled } = await supabase.rpc('check_enrollment', { p_course_id: courseId });
      if (!enrolled) {
        redirect('/landing_v2/index.html#pricing?locked=true');
      }
    }
  }

  // 2. Fetch Notebook Content (HTML + Metadata)
  const adminSupabase = getSupabaseAdminClient();
  


  const { data: notebook, error } = await adminSupabase
    .from('notebook_content')
    .select('*')
    .eq('day_id', cleanDayId)
    .single();

  if (error || !notebook) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#080810', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Notebook Not Found</h2>
        <p>Could not load content for day "{cleanDayId}". Please verify the seeding migration was successfully executed.</p>
        <a href="/home.html" style={{ color: '#00E6F6', textDecoration: 'underline' }}>Back to Dashboard</a>
      </div>
    );
  }

  const sections = (notebook.sections || []) as Section[];

  // Dynamically rewrite static day links (e.g. day03.html or /day03.html) to Next.js routes (/notebook/day03)
  const cleanHtmlBody = notebook.html_body
    ? notebook.html_body.replace(/href=(["'])\/?day(\d+)\.html/g, 'href=$1/notebook/day$2')
    : '';

  // Curriculum maps for all courses
  const PYTHON_DAYS = [
    ['Day01_Data_Types_Blank.ipynb',      'Data Types and Memory',     '🔢'],
    ['Day02_Operators_Blank.ipynb',       'Operators and Expressions', '➕'],
    ['Day03_Strings_Blank.ipynb',         'Strings',                   '📝'],
    ['Day04_Lists_Blank.ipynb',           'Lists',                     '📋'],
    ['Day05_Tuples_Blank.ipynb',          'Tuples',                    '📦'],
    ['Day06_Sets_Blank.ipynb',            'Sets',                      '⭕'],
    ['Day07_Dictionaries_Blank.ipynb',    'Dictionaries',              '🗂️'],
    ['Day08_Conditionals_Blank.ipynb',    'Conditionals',              '🔀'],
    ['Day09_Loops_Blank.ipynb',           'Loops',                     '🔄'],
    ['Day10_Functions_Blank.ipynb',       'Functions',                 '⚙️'],
    ['Day11_Modules_Blank.ipynb',         'Modules',                   '📦'],
    ['Day12_Comprehensions_Blank.ipynb',  'Comprehensions',            '🧮'],
    ['Day13_Lambda_Blank.ipynb',          'Lambda Functions',          'λ'],
    ['Day14_Exceptions_Blank.ipynb',      'Exceptions',                '⚠️'],
    ['Day15_FileHandling_Blank.ipynb',    'File Handling',             '📂'],
    ['Day16_OOP_Basics_Blank.ipynb',      'OOP Basics',                '🧩'],
    ['Day17_OOP_Advanced_Blank.ipynb',    'OOP Advanced',              '🏗️'],
    ['Day18_Regex_Blank.ipynb',           'Regex',                     '🔍'],
    ['Day19_Generators_Blank.ipynb',      'Generators and Iterators',  '⚡'],
    ['Day20_Capstone_Blank.ipynb',        'Capstone Project',          '🏆'],
    ['Day21_NumPy_Blank.ipynb',           'NumPy Fundamentals',        '📊'],
    ['Day22_NumPy_Advanced_Blank.ipynb',  'NumPy Advanced',            '📈'],
    ['Day23_Pandas_Intro_Blank.ipynb',    'Pandas Introduction',       '🐼'],
    ['Day24_Pandas_Selection_Blank.ipynb','Pandas Selection',          '🎯'],
    ['Day25_Pandas_Cleaning_Blank.ipynb', 'Pandas Cleaning',           '🧹'],
    ['Day26_Pandas_GroupBy_Blank.ipynb',  'Pandas GroupBy',             '🗃️'],
    ['Day27_Pandas_Merging_Blank.ipynb',  'Pandas Merging',            '🔗'],
    ['Day28_Pandas_Series_Blank.ipynb',   'Pandas Time Series',        '📉'],
    ['Day29_Data_Seaborn_Blank.ipynb',    'Data Visualization',        '🎨'],
    ['Day30_Phase_Analysis_Blank.ipynb',  'Phase Analysis & Review',   '🔬'],
  ];

  const SQL_DAYS = [
    ['Day01_SQL_Blank.ipynb', 'Introduction to SQL & Databases', '🗄️'],
    ['Day02_SQL_Blank.ipynb', 'Filtering Data with WHERE', '🔍'],
    ['Day03_SQL_Blank.ipynb', 'Pattern Matching & NULL Handling', '📝'],
    ['Day04_SQL_Blank.ipynb', 'Sorting & Limiting Results', '📈'],
    ['Day05_SQL_Blank.ipynb', 'Aggregate Functions', '📊'],
    ['Day06_SQL_Blank.ipynb', 'GROUP BY & HAVING', '🗃️'],
    ['Day07_SQL_Blank.ipynb', 'Data Types, Casting & Expressions', '➕'],
    ['Day08_SQL_Blank.ipynb', 'CASE WHEN (Conditional Logic)', '🔀'],
    ['Day09_SQL_Blank.ipynb', 'Understanding Relationships & INNER JOIN', '🔗'],
    ['Day10_SQL_Blank.ipynb', 'LEFT, RIGHT & FULL OUTER JOIN', '🔄'],
    ['Day11_SQL_Blank.ipynb', 'SELF JOIN & Multi-Table Queries', '👥'],
    ['Day12_SQL_Blank.ipynb', 'Subqueries', '🧠'],
    ['Day13_SQL_Blank.ipynb', 'CTEs (Common Table Expressions)', '🏗️'],
    ['Day14_SQL_Blank.ipynb', 'Window Functions Part 1 (Ranking)', '🔢'],
    ['Day15_SQL_Blank.ipynb', 'Window Functions Part 2 (Analytic)', '📈'],
    ['Day16_SQL_Blank.ipynb', 'String Functions', '🧹'],
    ['Day17_SQL_Blank.ipynb', 'Date & Time Functions', '📅'],
    ['Day18_SQL_Blank.ipynb', 'UNION, INTERSECT & EXCEPT (SET Operations)', '🥞']
  ];

  const EXCEL_DAYS = [
    ['Day01_Excel_Blank.ipynb', 'Excel Orientation & Essential Formulas', '📊'],
    ['Day02_Excel_Blank.ipynb', 'Formatting, Sorting & Filtering', '🎨'],
    ['Day03_Excel_Blank.ipynb', 'Data Cleaning Essentials', '🧹'],
    ['Day04_Excel_Blank.ipynb', 'Excel Tables', '📋'],
    ['Day05_Excel_Blank.ipynb', 'Lookup & Reference Functions', '🔍'],
    ['Day06_Excel_Blank.ipynb', 'Logic Functions', '🔀'],
    ['Day07_Excel_Blank.ipynb', 'Text Functions', '📝'],
    ['Day08_Excel_Blank.ipynb', 'Date & Time Functions', '📅'],
    ['Day09_Excel_Blank.ipynb', 'Conditional Aggregation', '🧮'],
    ['Day10_Excel_Blank.ipynb', 'PivotTables Core Mechanics', '⚙️'],
    ['Day11_Excel_Blank.ipynb', 'PivotTables Advanced & Charts', '📈'],
    ['Day12_Excel_Blank.ipynb', 'Data Validation, What-If & Capstone', '🏆']
  ];

  const currentCourseDays = courseType === 'sql' ? SQL_DAYS : (courseType === 'excel' ? EXCEL_DAYS : PYTHON_DAYS);

  const getDayUrl = (num: number) => {
    if (courseType === 'python') return `/notebook/day${num.toString().padStart(2, '0')}`;
    return `/notebook/${courseType}-day${num.toString().padStart(2, '0')}`;
  };

  // Dynamic JSON-LD structured schema for search engines
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": "https://www.manodemy.com/landing_v2/#course",
        "name": courseTitle,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Manodemy",
          "sameAs": "https://www.manodemy.com/"
        }
      },
      {
        "@type": "TechArticle",
        "headline": `Day ${formattedDay}: ${notebook.title}`,
        "description": `Interactive notebook for Day ${formattedDay}.`,
        "url": `https://www.manodemy.com/notebook/${cleanDayId}`,
        "isPartOf": {
          "@id": "https://www.manodemy.com/landing_v2/#course"
        }
      }
    ]
  };

  // Define client engine assets
  let engineStatus = '⏳ Loading Python Engine...';
  let engineScript = <script defer src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>;

  if (courseType === 'sql') {
    engineStatus = '🔌 Connected to SQL Server Database';
    engineScript = null;
  } else if (courseType === 'excel') {
    engineStatus = '📊 Loading Excel Formula Engine...';
    engineScript = <script defer src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>;
  }

  return (
    <>
      <NotebookInitializer dayId={cleanDayId} kernelType={courseType} />
      {/* Inject styling and resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css" />
      <link rel="stylesheet" href="/notebook.css?v=30" />

      {/* Render SEO structured metadata */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />

      {/* Loading overlay spinner */}
      <div id="paywall-preload-screen" className="paywall-preload" aria-hidden="true">
        <div className="paywall-preload__spinner"></div>
      </div>

      {/* Main navigation top-bar */}
      <nav className="top-bar nav-container" id="topBar">
        <div className="nav-zone--left">
          {/* Avatar menu */}
          <div className="avatar-wrapper" id="profileAvatar" 
               role="button" 
               tabIndex={0} 
               aria-label="Open profile card"
               aria-expanded="false"
               aria-haspopup="true">
            <div className="avatar-circle" id="avatarCircle"></div>
            <div className="avatar-status-dot" aria-hidden="true"></div>
          </div>

          {/* User score tracking progress */}
          <div className="nav-score-card">
            <div className="score-grid">
              <div className="score-col">
                <span className="score-label">Solved</span>
                <span className="score-val">
                  <span id="scoreSolved" className="score-highlight">0</span>
                  <span className="score-slash">/</span>
                  <span id="scoreTotal">0</span>
                </span>
              </div>
              <div className="score-divider"></div>
              <div className="score-col">
                <span className="score-label">Marks</span>
                <span className="score-val">
                  <span id="scoreXPEarned" className="score-highlight">0.0</span>
                  <span className="score-slash">/</span>
                  <span id="scoreMaxXP">0.0</span>
                </span>
              </div>
            </div>
            <div className="score-track">
              <div className="score-fill" id="scoreProgress" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        {/* Day navigation dropdown */}
        <div className="nav-center has-dropdown">
          <div className="nav-center-flex">
            {dayNum > 1 ? (
              <a href={getDayUrl(dayNum - 1)} className="nav-icon-btn prev-btn" aria-label="Previous Day" title="Previous Day">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </a>
            ) : (
              <span className="nav-icon-btn prev-btn disabled" aria-hidden="true" style={{ opacity: 0.3, pointerEvents: 'none' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </span>
            )}

            <button className="nav-dropdown-btn" id="dayDropdownBtn">
              <span className="day-badge">Day {formattedDay}</span>
              <span className="day-title">{notebook.title.replace(/^[^\s]+\s+/, '').replace(/^Day\s+\d+\s*:\s*/, '').replace(/^SQL\s+Day\s+\d+\s*:\s*/i, '').replace(/^Excel\s+Day\s+\d+\s*:\s*/i, '')}</span>
              <svg className="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {dayNum < maxDays ? (
              <a href={getDayUrl(dayNum + 1)} className="nav-icon-btn next-btn" aria-label="Next Day" title="Next Day">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            ) : (
              <span className="nav-icon-btn next-btn disabled" aria-hidden="true" style={{ opacity: 0.3, pointerEvents: 'none' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            )}
          </div>
          <div className="nav-dropdown-menu" id="dayDropdownMenu">
            <div className="dropdown-header">Jump to another day</div>
            <div className="dropdown-scroll">
              {currentCourseDays.map(([f, t, e], index) => {
                const i = index + 1;
                const active = i === dayNum ? 'active' : '';
                return (
                  <a key={i} href={getDayUrl(i)} className={`dropdown-item ${active}`}>
                    <span className="day-num">Day {i.toString().padStart(2, '0')}</span>{' '}
                    <span className="day-em">{e}</span> {t}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dashboard scorecard link */}
        <div className="nav-zone--right">
          <div className="nav-controls">
            <a href="/home.html" className="nav-icon-btn scorecard-btn" title="Back to Dashboard" aria-label="Score Card">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              Score Card
            </a>
          </div>
        </div>
      </nav>

      {/* Floating profile details modal */}
      <div className="profile-card" id="profileCard" role="dialog" aria-label="User profile summary" aria-modal="false">
        <div className="profile-card__header">
          <div className="profile-card__info">
            <h2 className="profile-card__name" id="profileName">Loading...</h2>
            <p className="profile-card__email" id="profileEmail">loading@... </p>
          </div>
          <span className="profile-card__badge" id="profileBadge">Free</span>
        </div>
        
        <div className="profile-card__progress-section">
          <div className="profile-card__progress-labels">
            <span className="profile-card__progress-text">Overall Progress</span>
            <span className="profile-card__progress-pct" id="profileProgressPct">0%</span>
          </div>
        </div>

        <div className="profile-card__links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginBottom: '14px' }}>
          <a href="/home.html" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}>
            <span>🏠</span> Back to Dashboard
          </a>

        </div>
        
        <button className="profile-card__signout" id="signOutBtn">Sign Out</button>
      </div>

      {/* Pyodide/SQL/Excel loader status */}
      <div className="pyodide-status" id="pyStatus">{engineStatus}</div>

      <div className="layout">
        {/* Core notebook content injected */}
        <main className="notebook" id="notebook">
          <div className="nb-title">
            <h1>📊 Day {formattedDay} : {notebook.title.replace(/^[^\s]+\s+/, '').replace(/^Day\s+\d+\s*:\s*/, '').replace(/^SQL\s+Day\s+\d+\s*:\s*/i, '').replace(/^Excel\s+Day\s+\d+\s*:\s*/i, '')}</h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: cleanHtmlBody }} />
        </main>
        
        {/* Dynamic table of contents (TOC) sidebar */}
        <nav className="sidebar" id="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-header"><span className="icon">📄</span> CONTENTS</div>
          </div>
          <ul className="toc-list">
            {sections.map((sec, i) => (
              <li key={i}>
                <a href={`#${sec.anchor}`} className="toc-link">{sec.title}</a>
              </li>
            ))}
          </ul>
          <div className="sidebar-resize" id="sidebarResize"></div>
        </nav>
      </div>

      {/* CodeMirror configuration scripts (deferred, loaded from CDN) */}
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/comment/comment.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldcode.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/indent-fold.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.js"></script>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/anyword-hint.min.js"></script>
      
      {/* Compiled compiler runtime */}
      {engineScript}
      
      {/* Telemetry and interactive behaviors (served from public/) */}
      <script src="/manodemy-telemetry.js" defer></script>
      <script src="/voice.js" defer></script>
      <script src="/hints.js?v=30" defer></script>
      <script src="/notebook.js?v=30" defer></script>
    </>
  );
}
