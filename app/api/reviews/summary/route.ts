import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Fetch all approved reviews
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('status', 'approved');

    if (error) {
      throw error;
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json({
        averageRating: 0,
        reviewCount: 0,
        distribution: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
      });
    }

    const reviewCount = reviews.length;
    let sum = 0;
    const counts = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };

    reviews.forEach((r: { rating: number }) => {
      sum += r.rating;
      const key = String(r.rating) as '1' | '2' | '3' | '4' | '5';
      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });

    const averageRating = parseFloat((sum / reviewCount).toFixed(1));

    const distribution = {
      "5": parseFloat((counts["5"] / reviewCount).toFixed(2)),
      "4": parseFloat((counts["4"] / reviewCount).toFixed(2)),
      "3": parseFloat((counts["3"] / reviewCount).toFixed(2)),
      "2": parseFloat((counts["2"] / reviewCount).toFixed(2)),
      "1": parseFloat((counts["1"] / reviewCount).toFixed(2))
    };

    return NextResponse.json({
      averageRating,
      reviewCount,
      distribution
    });
  } catch (error: any) {
    console.error('Error in GET /api/reviews/summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews summary' },
      { status: 500 }
    );
  }
}
