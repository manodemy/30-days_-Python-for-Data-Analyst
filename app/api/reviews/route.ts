import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Fetch approved reviews, sorted by creation date descending
    const { data: dbReviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit); // Select limit + 1 items to determine hasMore

    if (error) {
      throw error;
    }

    const reviews = (dbReviews || []).slice(0, limit).map((r: any) => ({
      id: r.id,
      name: r.reviewer_name,
      avatarUrl: r.reviewer_avatar,
      role: r.reviewer_role || 'Data Analyst Student',
      rating: r.rating,
      text: r.comment,
      recommend: r.recommend,
      helpfulCount: r.helpful_count || 0,
      pros: r.pros || [],
      cons: r.cons || [],
      createdAt: r.created_at
    }));

    const hasMore = (dbReviews || []).length > limit;

    return NextResponse.json({
      reviews,
      hasMore
    });
  } catch (error: any) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews list' },
      { status: 500 }
    );
  }
}
