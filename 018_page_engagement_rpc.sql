-- ============================================================================
-- 018_page_engagement_rpc.sql
-- RPC to fetch user-level page engagement
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_user_page_engagement(
  start_ts TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ DEFAULT '2099-01-01'::TIMESTAMPTZ
)
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  email TEXT,
  country TEXT,
  plan TEXT,
  signed_up_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  page_url TEXT,
  visits BIGINT,
  time_spent_seconds NUMERIC
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
  WITH user_pages AS (
    SELECT 
      COALESCE(pv.user_id, al.user_id) AS uid,
      COALESCE(pv.page_url, al.page_url) AS page_url,
      pv.visits,
      al.time_spent
    FROM (
      -- visits
      SELECT pv_inner.user_id, pv_inner.page_url, COUNT(DISTINCT pv_inner.session_id) AS visits
      FROM public.page_views pv_inner
      WHERE pv_inner.created_at BETWEEN start_ts AND end_ts
        AND pv_inner.user_id IS NOT NULL
      GROUP BY pv_inner.user_id, pv_inner.page_url
    ) pv
    FULL OUTER JOIN (
      -- time spent
      SELECT sess_times.user_id, sess_times.page_url, SUM(sess_times.time_s) AS time_spent
      FROM (
        SELECT al_inner.user_id, al_inner.page_url, al_inner.metadata->>'session_id' as sess, MAX((al_inner.metadata->>'active_seconds')::numeric) as time_s
        FROM public.activity_logs al_inner
        WHERE al_inner.event_type IN ('session_heartbeat', 'session_end')
          AND al_inner.created_at BETWEEN start_ts AND end_ts
          AND al_inner.user_id IS NOT NULL
          AND al_inner.metadata->>'active_seconds' IS NOT NULL
        GROUP BY al_inner.user_id, al_inner.page_url, al_inner.metadata->>'session_id'
      ) sess_times
      GROUP BY sess_times.user_id, sess_times.page_url
    ) al
    ON pv.user_id = al.user_id AND pv.page_url = al.page_url
  ),
  user_profiles AS (
    SELECT 
      p.id as uid,
      p.full_name,
      p.email,
      p.country,
      p.created_at as signed_up_at,
      (SELECT MAX(created_at) FROM public.activity_logs WHERE user_id = p.id) as last_seen_at,
      COALESCE((
        SELECT CASE WHEN status = 'completed' THEN 'paid' ELSE status END
        FROM public.purchases
        WHERE user_id = p.id
        ORDER BY created_at DESC LIMIT 1
      ), 'free') as plan
    FROM public.profiles p
  )
  SELECT 
    up.uid,
    COALESCE(prf.full_name, ''),
    COALESCE(prf.email, ''),
    prf.country,
    prf.plan,
    prf.signed_up_at,
    prf.last_seen_at,
    up.page_url,
    COALESCE(up.visits, 0),
    COALESCE(up.time_spent, 0)
  FROM user_pages up
  JOIN user_profiles prf ON up.uid = prf.uid
  ORDER BY prf.last_seen_at DESC NULLS LAST, up.page_url ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
