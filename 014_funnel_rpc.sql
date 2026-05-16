-- ============================================================================
-- 014_funnel_rpc.sql
-- Funnel analytics for Conversion Funnel page
-- Run this in Supabase SQL Editor
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_conversion_funnel(TIMESTAMPTZ, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_conversion_funnel(
  start_ts TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ DEFAULT '2099-01-01'::TIMESTAMPTZ
)
RETURNS TABLE (
  step1_visits BIGINT,
  step2_logged_in BIGINT,
  step3_buy_clicks BIGINT,
  step4_success BIGINT,
  step5_failed BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Admin gate
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  WITH 
  s1 AS (
    SELECT COUNT(DISTINCT session_id) AS visits 
    FROM public.page_views 
    WHERE created_at BETWEEN start_ts AND end_ts
  ),
  s2 AS (
    SELECT COUNT(DISTINCT user_id) AS logged_in 
    FROM public.page_views 
    WHERE user_id IS NOT NULL 
      AND created_at BETWEEN start_ts AND end_ts
  ),
  s3 AS (
    SELECT COUNT(DISTINCT user_id) AS buy_clicks 
    FROM public.activity_logs 
    WHERE event_type = 'checkout_initiated' 
      AND created_at BETWEEN start_ts AND end_ts
  ),
  s4 AS (
    SELECT COUNT(DISTINCT user_id) AS success 
    FROM public.purchases 
    WHERE status IN ('completed', 'paid', 'captured', 'successful') 
      AND created_at BETWEEN start_ts AND end_ts
  ),
  s5 AS (
    SELECT COUNT(DISTINCT user_id) AS failed 
    FROM public.purchases 
    WHERE status IN ('refunded', 'disputed', 'failed') 
      AND created_at BETWEEN start_ts AND end_ts
  )
  SELECT 
    COALESCE((SELECT visits FROM s1), 0) AS step1_visits,
    COALESCE((SELECT logged_in FROM s2), 0) AS step2_logged_in,
    COALESCE((SELECT buy_clicks FROM s3), 0) AS step3_buy_clicks,
    COALESCE((SELECT success FROM s4), 0) AS step4_success,
    COALESCE((SELECT failed FROM s5), 0) AS step5_failed;
END;
$$;

REVOKE ALL ON FUNCTION public.get_conversion_funnel(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_conversion_funnel(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
