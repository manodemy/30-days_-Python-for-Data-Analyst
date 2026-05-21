-- ═══════════════════════════════════════════════════════════════
-- MANODEMY — Customer Reviews & Ratings System Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  reviewer_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews" 
  ON public.reviews FOR SELECT 
  USING (status = 'approved' OR auth.role() = 'service_role');

-- 2. Anyone can insert reviews
CREATE POLICY "Anyone can insert reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (true);

-- 3. Users or guests can increment helpful / report counter (requires security policies to be flexible)
CREATE POLICY "Anyone can update reviews" 
  ON public.reviews FOR UPDATE 
  USING (true);

-- 4. Full permissions for service role
CREATE POLICY "Service role full access on reviews"
  ON public.reviews FOR ALL
  USING (auth.role() = 'service_role');

-- 5. Admins can select all reviews
CREATE POLICY "Admins can select all reviews"
  ON public.reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Admins can update reviews
CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );



-- ═══════════════════════════════════════════════════════════════
-- VOTES TRACKING TABLE (Helpful / Reports to prevent double-clicks)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  client_uuid TEXT NOT NULL, -- Browser fingerprint UUID to prevent double votes
  vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful', 'report')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, client_uuid, vote_type)
);

-- Enable RLS
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read and write votes" 
  ON public.review_votes FOR ALL 
  USING (true);


-- ═══════════════════════════════════════════════════════════════
-- AUTOMATED VERIFICATION TRIGGER
-- ═══════════════════════════════════════════════════════════════
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

CREATE OR REPLACE TRIGGER tr_verify_reviewer_on_submit
  BEFORE INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.check_reviewer_verification();


-- ═══════════════════════════════════════════════════════════════
-- INDEXES FOR MAXIMUM SCAN SPEED
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_votes_match ON public.review_votes(review_id, client_uuid, vote_type);
