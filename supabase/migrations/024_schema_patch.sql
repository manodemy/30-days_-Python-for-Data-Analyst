-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — UNIFIED SCHEMA PATCH & SEED UTILITY
-- Run this in your Supabase SQL Editor to patch legacy tables & seed data
-- ═══════════════════════════════════════════════════════════════

-- 1. PATCH PROFILES TABLE (Adds V2 student dashboard plan columns)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free';

-- 2. CREATE OR UPDATE REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  reviewer_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  pros TEXT[] DEFAULT '{}'::TEXT[],
  cons TEXT[] DEFAULT '{}'::TEXT[],
  recommend BOOLEAN DEFAULT true,
  cohort_date TEXT,
  media_urls TEXT[] DEFAULT '{}'::TEXT[],
  helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. DROP LEGACY NOT-NULL CONSTRAINTS (Allows nullable V2 submissions)
ALTER TABLE public.reviews ALTER COLUMN title DROP NOT NULL;
ALTER TABLE public.reviews ALTER COLUMN cohort_date DROP NOT NULL;

-- 4. EXPLICITLY GRANT API PERMISSIONS (Exposes reviews to anon REST queries)
GRANT ALL ON public.reviews TO anon, authenticated, service_role;
GRANT ALL ON public.review_votes TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO anon, authenticated, service_role;

-- 5. REBUILD SCHEMA CACHE
NOTIFY pgrst, 'reload schema';

-- 6. INSERT REALISTIC SEED DATA (Only if table is empty to prevent duplicates)
INSERT INTO public.reviews (
  reviewer_name,
  reviewer_email,
  rating,
  comment,
  pros,
  cons,
  recommend,
  is_verified,
  helpful_count,
  status
) 
SELECT * FROM (VALUES
(
  'Aarav Sharma',
  'aarav.sharma@gmail.com',
  5,
  'This course is an absolute masterpiece. Escaping tutorial hell was my main goal, and the interactive coding notebooks did exactly that. Every day has highly structured exercises that force you to write Pandas and Numpy code in real-time.',
  ARRAY['Active coding', 'No video bloat', 'Excellent Pandas labs'],
  ARRAY['Requires deep focus'],
  true,
  true,
  18,
  'approved'
),
(
  'Sarah Jenkins',
  'sarah.j@techcorp.com',
  5,
  'I''ve tried 4 different Python courses on Udemy and YouTube, but this is the first one that clicked. The browser-based compiler and the instant check validation are brilliant. No environment setup headaches. Highly recommend for any aspiring Data Analyst!',
  ARRAY['Instant compiler validation', 'Well-paced daily roadmap', 'Saves time'],
  ARRAY['No video lectures'],
  true,
  true,
  14,
  'approved'
),
(
  'Rohan Verma',
  'rohan.verma@outlook.com',
  4,
  'Solid curriculum. The SQL databases section and interview prep challenges in the final week were incredibly valuable. I actually used one of the SQL queries in my real job last week. Spacing could be slightly tighter on Day 12, but overall excellent value.',
  ARRAY['SQL section', 'Realistic interview prep', 'Practical challenges'],
  ARRAY['Some notebooks are quite long'],
  true,
  true,
  9,
  'approved'
),
(
  'Elena Rostova',
  'elena.rostova@datawave.io',
  5,
  'Mind-blowing experience! The XP tracking and the gamified progress system on the dashboard kept me consistently motivated. It''s rare to find a course that focuses so heavily on active muscle memory. Truly worth every single cent.',
  ARRAY['Highly gamified', 'Excellent progress tracking', 'Great layout design'],
  ARRAY['No offline mode'],
  true,
  true,
  22,
  'approved'
),
(
  'David Kim',
  'd.kim@yonsei.ac.kr',
  4,
  'Very practical. The Pandas masterclass was a game-changer. I finally understand grouping, merging, and cleaning messy data sets. The support channels are also extremely responsive when you get stuck on a difficult cell test.',
  ARRAY['Pandas masterclass', 'Excellent support', 'Messy dataset labs'],
  ARRAY['Steep learning curve on Day 15'],
  true,
  true,
  5,
  'approved'
)
) AS seed_data (reviewer_name, reviewer_email, rating, comment, pros, cons, recommend, is_verified, helpful_count, status)
WHERE NOT EXISTS (SELECT 1 FROM public.reviews LIMIT 1);
