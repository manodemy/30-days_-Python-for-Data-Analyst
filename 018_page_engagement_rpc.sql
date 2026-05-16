-- ============================================================================
-- 018_page_engagement_rpc.sql
-- RPC to fetch page visits and time spent
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_page_engagement(
  start_ts TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ DEFAULT '2099-01-01'::TIMESTAMPTZ
)
RETURNS TABLE (
  page_url TEXT,
  total_visits BIGINT,
  avg_time_seconds NUMERIC,
  total_time_seconds NUMERIC
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
  WITH page_visits AS (
    SELECT 
      pv.page_url,
      COUNT(DISTINCT pv.session_id) AS total_visits
    FROM public.page_views pv
    WHERE pv.created_at BETWEEN start_ts AND end_ts
    GROUP BY pv.page_url
  ),
  page_time AS (
    SELECT 
      al.page_url,
      al.metadata->>'session_id' AS session_id,
      MAX((al.metadata->>'active_seconds')::numeric) AS time_spent
    FROM public.activity_logs al
    WHERE al.event_type IN ('session_heartbeat', 'session_end')
      AND al.created_at BETWEEN start_ts AND end_ts
      AND al.metadata->>'active_seconds' IS NOT NULL
      AND al.metadata->>'session_id' IS NOT NULL
    GROUP BY al.page_url, al.metadata->>'session_id'
  ),
  avg_time AS (
    SELECT 
      pt.page_url,
      AVG(pt.time_spent) AS avg_time_seconds,
      SUM(pt.time_spent) AS total_time_seconds
    FROM page_time pt
    GROUP BY pt.page_url
  )
  SELECT 
    v.page_url,
    v.total_visits,
    ROUND(COALESCE(t.avg_time_seconds, 0), 1) AS avg_time_seconds,
    COALESCE(t.total_time_seconds, 0) AS total_time_seconds
  FROM page_visits v
  LEFT JOIN avg_time t ON v.page_url = t.page_url
  ORDER BY v.total_visits DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
