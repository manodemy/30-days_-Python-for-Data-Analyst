import './init';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const SUPABASE_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

// Premium days: 3–30 require authentication + enrollment
const PREMIUM_DAY_MIN = 3;
const PREMIUM_DAY_MAX = 30;

/**
 * Extracts the day number from a /notebook/dayXX path.
 * Returns null if the path is not a notebook day path.
 */
function extractNotebookDayNum(pathname: string): number | null {
  const match = pathname.match(/^\/notebook\/(?:sql-day|excel-day|day)(\d{1,2})(?:\/|$)/i);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  return isNaN(num) ? null : num;
}

async function trackEdgeCampaignClick(campaign: string, source: string, visitorId: string, userAgent?: string) {
  if (!campaign || campaign === 'organic_untracked') return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/campaign_clicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        campaign_name: campaign.toLowerCase().trim(),
        visitor_id: visitorId,
        source: source || 'direct',
        user_agent: userAgent || null
      })
    });
  } catch (e) {}
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const lowerPath = path.toLowerCase();

  // ── LOCALHOST DEV BYPASS: Skip all auth/redirect on local development ──
  const host = request.headers.get('host') || '';
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  let visitorId = request.cookies.get('manodemy_visitor_id')?.value;
  if (!visitorId) {
    visitorId = 'vis_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  }
  const userAgent = request.headers.get('user-agent') || undefined;

  // ── Layer 0: Short URL Campaign Redirection (e.g. /q1, /q2, /go/reel1, /r/bio) ──
  const shortMap: Record<string, string> = {
    '/q1': '/Version-3/index.html?day=4&challenge=SQL-01-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q1_high_performer',
    '/go/q1': '/Version-3/index.html?day=4&challenge=SQL-01-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q1_high_performer',
    '/q2': '/Version-3/index.html?day=4&challenge=SQL-01-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q2_salary_analytic',
    '/go/q2': '/Version-3/index.html?day=4&challenge=SQL-01-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q2_salary_analytic',
    '/q3': '/Version-3/index.html?day=5&challenge=SQL-02-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q3_dept_ranking',
    '/go/q3': '/Version-3/index.html?day=5&challenge=SQL-02-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q3_dept_ranking',
    '/q4': '/Version-3/index.html?day=5&challenge=SQL-02-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q4_sales_growth',
    '/go/q4': '/Version-3/index.html?day=5&challenge=SQL-02-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q4_sales_growth',
    '/q5': '/Version-3/index.html?day=4&challenge=SQL-03-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q5_count_null',
    '/go/q5': '/Version-3/index.html?day=4&challenge=SQL-03-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q5_count_null',
    '/q6': '/Version-3/index.html?day=4&challenge=SQL-03-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q6_precedence',
    '/go/q6': '/Version-3/index.html?day=4&challenge=SQL-03-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q6_precedence',
    '/q7': '/Version-3/index.html?day=5&challenge=SQL-04-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q7_where_having',
    '/go/q7': '/Version-3/index.html?day=5&challenge=SQL-04-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q7_where_having',
    '/q8': '/Version-3/index.html?day=4&challenge=SQL-04-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q8_date_range',
    '/go/q8': '/Version-3/index.html?day=4&challenge=SQL-04-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q8_date_range',
    '/q9': '/Version-3/index.html?day=5&challenge=SQL-05-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q9_left_join',
    '/go/q9': '/Version-3/index.html?day=5&challenge=SQL-05-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q9_left_join',
    '/q10': '/Version-3/index.html?day=5&challenge=SQL-05-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q10_conditional_count',
    '/go/q10': '/Version-3/index.html?day=5&challenge=SQL-05-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q10_conditional_count',
    '/q11': '/Version-3/index.html?day=6&challenge=SQL-06-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day06_q11_ceo_hierarchy',
    '/go/q11': '/Version-3/index.html?day=6&challenge=SQL-06-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day06_q11_ceo_hierarchy',
    '/q12': '/Version-3/index.html?day=7&challenge=SQL-07-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q12_not_in_null',
    '/go/q12': '/Version-3/index.html?day=7&challenge=SQL-07-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q12_not_in_null',
    '/q13': '/Version-3/index.html?day=7&challenge=SQL-07-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q13_salary_dense_rank',
    '/go/q13': '/Version-3/index.html?day=7&challenge=SQL-07-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q13_salary_dense_rank',
    '/q14': '/Version-3/index.html?day=8&challenge=SQL-08-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q14_like_wildcard',
    '/go/q14': '/Version-3/index.html?day=8&challenge=SQL-08-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q14_like_wildcard',
    '/q15': '/Version-3/index.html?day=8&challenge=SQL-08-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q15_union_dedup',
    '/go/q15': '/Version-3/index.html?day=8&challenge=SQL-08-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q15_union_dedup',
    '/q16': '/Version-3/index.html?day=9&challenge=SQL-09-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day09_q16_latest_record',
    '/go/q16': '/Version-3/index.html?day=9&challenge=SQL-09-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day09_q16_latest_record',
    '/q17': '/Version-3/index.html?day=10&challenge=SQL-10-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day10_q17_gaps_islands',
    '/go/q17': '/Version-3/index.html?day=10&challenge=SQL-10-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day10_q17_gaps_islands',
    '/q18': '/Version-3/index.html?day=11&challenge=SQL-11-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day11_q18_manager_salary',
    '/go/q18': '/Version-3/index.html?day=11&challenge=SQL-11-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day11_q18_manager_salary',
    '/q19': '/Version-3/index.html?day=12&challenge=SQL-12-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day12_q19_ghost_employee',
    '/go/q19': '/Version-3/index.html?day=12&challenge=SQL-12-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day12_q19_ghost_employee',
    '/go/fb_ads_1': '/?utm_source=meta&utm_medium=cpc&utm_campaign=fb_ads_1',
    '/fb_ads_1': '/?utm_source=meta&utm_medium=cpc&utm_campaign=fb_ads_1',
    '/go/bio': '/?utm_source=meta&utm_medium=cpc&utm_campaign=insta_bio_link',
    '/bio': '/?utm_source=meta&utm_medium=cpc&utm_campaign=insta_bio_link',
    '/insta': '/?utm_source=meta&utm_medium=cpc&utm_campaign=insta_bio_link'
  };

  // Track any inbound campaign click query param ONLY if not from a shortlink redirect
  const isEdgeTrackedCookie = request.cookies.get('manodemy_edge_tracked')?.value;
  const inboundCamp = url.searchParams.get('utm_campaign') || url.searchParams.get('campaign') || url.searchParams.get('c');
  if (inboundCamp && !isEdgeTrackedCookie && !path.startsWith('/go/') && !path.startsWith('/r/') && !shortMap[lowerPath]) {
    const inboundSource = url.searchParams.get('utm_source') || 'direct';
    await trackEdgeCampaignClick(inboundCamp, inboundSource, visitorId, userAgent);
  }

  if (shortMap[lowerPath]) {
    const targetPath = shortMap[lowerPath];
    const dest = new URL(targetPath, request.url);
    url.searchParams.forEach((val, key) => {
      if (!dest.searchParams.has(key)) dest.searchParams.set(key, val);
    });

    const targetCamp = dest.searchParams.get('utm_campaign');
    if (targetCamp) {
      await trackEdgeCampaignClick(targetCamp, 'instagram', visitorId, userAgent);
    }

    const response = NextResponse.redirect(dest, { status: 302 });
    if (targetCamp) {
      response.cookies.set('manodemy_last_campaign', targetCamp, { path: '/', maxAge: 2592000, sameSite: 'lax' });
    }
    response.cookies.set('manodemy_edge_tracked', '1', { path: '/', maxAge: 20, sameSite: 'lax' });
    response.cookies.set('manodemy_visitor_id', visitorId, { path: '/', maxAge: 2592000, sameSite: 'lax' });
    return response;
  }

  // Dynamic /go/[campaign_slug] or /r/[campaign_slug]
  const goMatch = path.match(/^\/(?:go|r)\/([a-zA-Z0-9_.-]+)$/);
  if (goMatch) {
    const slug = goMatch[1].toLowerCase();
    await trackEdgeCampaignClick(slug, 'meta', visitorId, userAgent);

    // 1. Check if campaign has a custom target_url saved in Supabase ad_campaigns
    try {
      const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: () => {},
        }
      });
      const { data: camp } = await supabase
        .from('ad_campaigns')
        .select('target_url, platform')
        .ilike('campaign_name', slug)
        .maybeSingle();

      if (camp && camp.target_url) {
        const rawDest = camp.target_url.trim();
        let targetFullUrl: string;
        if (rawDest.startsWith('http://') || rawDest.startsWith('https://')) {
          targetFullUrl = rawDest;
        } else if (rawDest.startsWith('/')) {
          targetFullUrl = `https://www.manodemy.com${rawDest}`;
        } else {
          targetFullUrl = `https://www.manodemy.com/${rawDest}`;
        }

        const dest = new URL(targetFullUrl);
        // Forward any extra query parameters from the request URL
        url.searchParams.forEach((val, key) => {
          if (!dest.searchParams.has(key)) dest.searchParams.set(key, val);
        });

        const response = NextResponse.redirect(dest, { status: 302 });
        response.cookies.set('manodemy_last_campaign', slug, { path: '/', maxAge: 2592000, sameSite: 'lax' });
        response.cookies.set('manodemy_visitor_id', visitorId, { path: '/', maxAge: 2592000, sameSite: 'lax' });
        return response;
      }
    } catch (e) {
      console.warn('[Middleware] Dynamic campaign lookup notice:', e);
    }

    // 2. Default fallback to main landing page with campaign tag
    const dest = new URL('/landing_v2/index.html', request.url);
    dest.searchParams.set('utm_source', 'meta');
    dest.searchParams.set('utm_medium', 'reels');
    dest.searchParams.set('utm_campaign', slug);
    url.searchParams.forEach((val, key) => {
      if (!dest.searchParams.has(key)) dest.searchParams.set(key, val);
    });

    const response = NextResponse.redirect(dest, { status: 302 });
    response.cookies.set('manodemy_last_campaign', slug, { path: '/', maxAge: 2592000, sameSite: 'lax' });
    response.cookies.set('manodemy_visitor_id', visitorId, { path: '/', maxAge: 2592000, sameSite: 'lax' });
    return response;
  }

  // ── Layer A: Redirect legacy dayXX.html → /notebook/dayXX ──────────────────
  const legacyMatch = path.match(/^\/day(\d{2})\.html$/);
  if (legacyMatch) {
    const dayNum = parseInt(legacyMatch[1], 10);
    if (dayNum >= 3) {
      const dayId = `day${legacyMatch[1]}`;
      const targetUrl = new URL(`/notebook/${dayId}${url.search}`, request.url);
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
  }

  const legacySqlMatch = path.match(/^\/sql\/day(\d{2})\.html$/);
  if (legacySqlMatch) {
    const dayNum = parseInt(legacySqlMatch[1], 10);
    if (dayNum >= 3) {
      const dayId = `sql-day${legacySqlMatch[1]}`;
      const targetUrl = new URL(`/notebook/${dayId}${url.search}`, request.url);
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
  }

  const legacyExcelMatch = path.match(/^\/excel\/day(\d{2})\.html$/);
  if (legacyExcelMatch) {
    const dayNum = parseInt(legacyExcelMatch[1], 10);
    if (dayNum >= 3) {
      const dayId = `excel-day${legacyExcelMatch[1]}`;
      const targetUrl = new URL(`/notebook/${dayId}${url.search}`, request.url);
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
  }

  // ── Layer B: Edge Auth Guard for notebook routes ────────────────────────────
  const dayNum = extractNotebookDayNum(path);
  const isSqlNotebook = path.includes('sql-day');

  // SQL Days 01 & 02 are universally free for everyone
  if (isSqlNotebook && dayNum !== null && dayNum <= 2) {
    return NextResponse.next();
  }

  // Check if request is an authorized Reel Guest Challenge Pass (STRICTLY for SQL routes)
  const isGuestReel = (isSqlNotebook || path.startsWith('/sql-practice') || path.startsWith('/try')) &&
    (url.searchParams.get('guest') === 'true' || url.searchParams.has('q') || url.searchParams.has('question'));

  if (dayNum !== null && dayNum >= 1 && dayNum <= PREMIUM_DAY_MAX) {
    // If coming from an Instagram Reel Guest Pass for SQL, allow through to the sandboxed SQL engine
    if (isGuestReel) {
      return NextResponse.next({ request });
    }

    // Free Python days: Day 01 & Day 02 were legacy free, but universally only SQL Day 01 & 02 are free
    // Require auth for all premium notebook days
    if (dayNum >= 1) {
      // Build a response object so @supabase/ssr can refresh cookies if needed
      const response = NextResponse.next({ request });

      const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Propagate any refreshed auth cookies back to the browser
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      });

      // getUser() validates the JWT with Supabase Auth servers — not just cookie presence.
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        // Not authenticated → redirect to landing with the intended destination
        const redirectUrl = new URL('/landing_v2/index.html', request.url);
        redirectUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(redirectUrl, { status: 302 });
      }

      // User IS authenticated. Enrollment check happens server-side in page.tsx
      return response;
    }
  }

  return NextResponse.next();
}

// Apply middleware to:
// 1. Legacy dayXX.html paths (for redirect)
// 2. /notebook/day* paths (for auth guard)
export const config = {
  matcher: [
    // Legacy HTML redirects (days 01–30)
    '/day01.html', '/day02.html', '/day03.html', '/day04.html', '/day05.html',
    '/day06.html', '/day07.html', '/day08.html', '/day09.html', '/day10.html',
    '/day11.html', '/day12.html', '/day13.html', '/day14.html', '/day15.html',
    '/day16.html', '/day17.html', '/day18.html', '/day19.html', '/day20.html',
    '/day21.html', '/day22.html', '/day23.html', '/day24.html', '/day25.html',
    '/day26.html', '/day27.html', '/day28.html', '/day29.html', '/day30.html',
    // Legacy SQL HTML redirects (days 01–18)
    '/sql/day01.html', '/sql/day02.html', '/sql/day03.html', '/sql/day04.html', '/sql/day05.html',
    '/sql/day06.html', '/sql/day07.html', '/sql/day08.html', '/sql/day09.html', '/sql/day10.html',
    '/sql/day11.html', '/sql/day12.html', '/sql/day13.html', '/sql/day14.html', '/sql/day15.html',
    '/sql/day16.html', '/sql/day17.html', '/sql/day18.html',
    // Legacy Excel HTML redirects (days 01–12)
    '/excel/day01.html', '/excel/day02.html', '/excel/day03.html', '/excel/day04.html', '/excel/day05.html',
    '/excel/day06.html', '/excel/day07.html', '/excel/day08.html', '/excel/day09.html', '/excel/day10.html',
    '/excel/day11.html', '/excel/day12.html',
    // Secure notebook routes (days 03–30 are premium)
    '/notebook/:path*',
    // Ultra-short campaign links & redirection triggers
    '/bio', '/insta',
    '/q:path*',
    '/go/:path*', '/r/:path*',
  ],
};
