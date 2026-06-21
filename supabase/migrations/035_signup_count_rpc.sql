-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — PUBLIC SIGN-UP COUNT RPC
-- Counts all registered users (anyone who created an account),
-- regardless of enrollment or payment status.
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.get_signup_count()
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Count all users who have ever signed up (auth.users is always up-to-date)
  SELECT COUNT(*)::INTEGER INTO v_count
  FROM auth.users;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant public execute access to anonymous visitors and logged-in users
GRANT EXECUTE ON FUNCTION public.get_signup_count() TO anon, authenticated, service_role;
