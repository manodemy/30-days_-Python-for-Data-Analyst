-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — COMPLETE RESET & UNIFIED SCHEMA DEPLOYMENT
-- Run this in your Supabase SQL Editor to wipe manual table drafts,
-- create clean reviews system, and grant proper API permissions.
-- Includes a SECURITY DEFINER helper to prevent infinite RLS recursion.
-- ═══════════════════════════════════════════════════════════════

-- 1. DROP EXISTING TABLE DRAFTS TO START FRESH
DROP TRIGGER IF EXISTS tr_verify_reviewer_on_submit ON public.reviews;
DROP TABLE IF EXISTS public.review_votes CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;

-- 2. PATCH PROFILES TABLE (Adds V2 student dashboard plan columns)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free';

-- 3. CREATE REVIEWS TABLE WITH PROPER SCHEMAS
CREATE TABLE public.reviews (
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

-- 4. CREATE VOTES TRACKING TABLE (Helpful / Reports)
CREATE TABLE public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  client_uuid TEXT NOT NULL, -- Browser fingerprint UUID to prevent double votes
  vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful', 'report')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, client_uuid, vote_type)
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

-- 6. CREATE HELPER FUNCTION TO PREVENT INFINITE RECURSION IN RLS POLICIES
-- Runs as SECURITY DEFINER to bypass RLS checks on profiles table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RE-DEPLOY PROFILES POLICIES TO PREVENT RECURSION
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can select all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin() OR auth.role() = 'service_role');

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin() OR auth.role() = 'service_role');

-- 8. DEFINE ALL REVIEWS & VOTES ACCESS CONTROL POLICIES
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Service role full access on reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can select all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read and write votes" ON public.review_votes;

-- Read: Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews" 
  ON public.reviews FOR SELECT 
  USING (status = 'approved' OR auth.role() = 'service_role');

-- Insert: Anyone can submit new reviews (essential for guest reviews)
CREATE POLICY "Anyone can insert reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (true);

-- Update: Anyone can update reviews (needed for helpful / report counters)
CREATE POLICY "Anyone can update reviews" 
  ON public.reviews FOR UPDATE 
  USING (true);

-- Delete & Admin capabilities:
CREATE POLICY "Admins can select all reviews" ON public.reviews
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update reviews" ON public.reviews
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete reviews" ON public.reviews
  FOR DELETE USING (public.is_admin());

-- Votes: Allow anyone to read/write votes to track helpful actions
CREATE POLICY "Anyone can read and write votes" 
  ON public.review_votes FOR ALL 
  USING (true);

-- 9. AUTOMATED VERIFICATION TRIGGER
-- Automatically flags a review as "Verified Buyer" if the email or user ID has an active paid enrollment in public.enrollments
CREATE OR REPLACE FUNCTION public.check_reviewer_verification()
RETURNS TRIGGER AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  -- Check if active paid enrollment exists for this email
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments e
    JOIN public.profiles p ON e.user_id = p.id
    WHERE LOWER(p.email) = LOWER(NEW.reviewer_email)
  ) INTO v_exists;

  -- Also check if user_id is passed and matches enrollments
  IF NOT v_exists AND NEW.user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE user_id = NEW.user_id
    ) INTO v_exists;
  END IF;

  -- Update verified state
  IF v_exists THEN
    NEW.is_verified := true;
  END IF;

  -- Default to 'approved' for onboarding fluidness, but allow admin moderation
  IF NEW.status IS NULL THEN
    NEW.status := 'approved';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger on insert
CREATE TRIGGER tr_verify_reviewer_on_submit
  BEFORE INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.check_reviewer_verification();

-- 10. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_votes_match ON public.review_votes(review_id, client_uuid, vote_type);

-- 11. EXPLICITLY GRANT API PERMISSIONS (Exposes reviews to anon REST queries)
GRANT ALL ON public.reviews TO anon, authenticated, service_role;
GRANT ALL ON public.review_votes TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO anon, authenticated, service_role;

-- 12. REBUILD SCHEMA CACHE
NOTIFY pgrst, 'reload schema';

-- 13. INSERT PREMIUM SEED DATA
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
) VALUES 
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
);
