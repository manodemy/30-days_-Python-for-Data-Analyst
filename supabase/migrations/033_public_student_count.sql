-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — PUBLIC ENROLLED USERS COUNT RPC
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.get_enrolled_users_count()
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Count total entries in public.enrollments for course 'python-30day'
  SELECT COUNT(*)::INTEGER INTO v_count
  FROM public.enrollments
  WHERE course_id = 'python-30day';
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant public execute access to anonymous visitors
GRANT EXECUTE ON FUNCTION public.get_enrolled_users_count() TO anon, authenticated, service_role;
