import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  
  // Redirect legacy dayXX.html requests to new Next.js dynamic routes
  const dayMatch = path.match(/^\/day(\d{2})\.html$/);
  if (dayMatch) {
    const dayId = `day${dayMatch[1]}`;
    const targetUrl = new URL(`/notebook/${dayId}`, request.url);
    console.log(`[Middleware] Redirecting legacy path ${path} to ${targetUrl.pathname}`);
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.next();
}

// Apply middleware configuration to all legacy day pages (day01.html to day30.html)
export const config = {
  matcher: [
    '/day01.html', '/day02.html', '/day03.html', '/day04.html', '/day05.html',
    '/day06.html', '/day07.html', '/day08.html', '/day09.html', '/day10.html',
    '/day11.html', '/day12.html', '/day13.html', '/day14.html', '/day15.html',
    '/day16.html', '/day17.html', '/day18.html', '/day19.html', '/day20.html',
    '/day21.html', '/day22.html', '/day23.html', '/day24.html', '/day25.html',
    '/day26.html', '/day27.html', '/day28.html', '/day29.html', '/day30.html'
  ]
};
