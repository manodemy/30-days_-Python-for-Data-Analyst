-- Migration: 047_check_enrollment_pro_plan.sql
-- Description: Update check_enrollment function to also grant access if user is marked as 'pro' in profiles or auth metadata.

CREATE OR REPLACE FUNCTION public.check_enrollment(p_course_id TEXT DEFAULT 'python-30day')
RETURNS BOOLEAN AS $$
BEGIN
  -- 1. Check if user is explicit admin
  IF EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RETURN TRUE;
  END IF;

  -- 2. Check if user has active enrollment (either course-specific or bundle)
  IF EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE user_id = auth.uid()
      AND (
        course_id = p_course_id 
        OR product_type = 'bundle'
        OR course_id = 'bundle-data-analytics'
      )
      AND (expires_at IS NULL OR expires_at > now())
  ) THEN
    RETURN TRUE;
  END IF;

  -- 3. Check if user has pro plan in profiles table
  IF EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND (plan = 'pro' OR plan_type = 'premium')
  ) THEN
    RETURN TRUE;
  END IF;

  -- 4. Check if user has plan 'pro' in their JWT user metadata
  IF coalesce(auth.jwt() -> 'user_metadata' ->> 'plan', '') = 'pro' THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
