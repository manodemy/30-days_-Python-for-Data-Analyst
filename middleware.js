import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  
  // Target redirect location
  const redirectUrl = new URL('/landing_v2/index.html#pricing?locked=true', request.url);

  // Extract Supabase access token (JWT) from cookies
  const jwtCookie = request.cookies.get('sb-access-token');
  const jwt = jwtCookie?.value || (typeof jwtCookie === 'string' ? jwtCookie : null);

  if (!jwt) {
    console.warn(`[Middleware] No sb-access-token cookie found for: ${path}. Redirecting to pricing page.`);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // Initialize Supabase Client with the user's JWT to verify signature and execute query in user context
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    });

    // 1. Verify the JWT by retrieving the user details from Supabase Auth
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    if (userError || !user) {
      console.warn('[Middleware] Invalid or expired Supabase JWT token. Redirecting:', userError?.message);
      return NextResponse.redirect(redirectUrl);
    }

    // 2. Call database RPC 'check_enrollment' for the course 'python-30day' using user's context
    const { data: enrolled, error: rpcError } = await supabase.rpc('check_enrollment', {
      p_course_id: 'python-30day'
    });

    if (rpcError || !enrolled) {
      console.warn(`[Middleware] User ${user.email} is not enrolled or check_enrollment failed. Redirecting.`, rpcError?.message);
      return NextResponse.redirect(redirectUrl);
    }

    // Authorized user - let the request pass through to static page
    return NextResponse.next();

  } catch (err) {
    console.error('[Middleware] Server-side exception during verification:', err);
    return NextResponse.redirect(redirectUrl);
  }
}

// Apply middleware configuration exclusively to protected pages (day03.html to day30.html)
export const config = {
  matcher: [
    '/day03.html', '/day04.html', '/day05.html', '/day06.html', '/day07.html', '/day08.html', '/day09.html',
    '/day10.html', '/day11.html', '/day12.html', '/day13.html', '/day14.html', '/day15.html', '/day16.html',
    '/day17.html', '/day18.html', '/day19.html', '/day20.html', '/day21.html', '/day22.html', '/day23.html',
    '/day24.html', '/day25.html', '/day26.html', '/day27.html', '/day28.html', '/day29.html', '/day30.html'
  ]
};
