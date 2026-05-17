-- ============================================================================
-- 020_fix_engagement_rpc.sql
-- FIXES:
--   1. Captures BOTH active_seconds (heartbeat) AND duration_seconds (session_end)
--      by using COALESCE so neither source is silently dropped.
--   2. Normalizes page_url by stripping the path prefix (e.g. /manodemy_web/day01.html
--      becomes day01.html) so it matches the JS key lookup.
--   3. Time format is now pure seconds (integer) — formatting is handled in the UI.
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_user_page_engagement(
  start_ts TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ DEFAULT '2099-01-01'::TIMESTAMPTZ
)
RETURNS TABLE (
  user_id      UUID,
  full_name    TEXT,
  email        TEXT,
  country      TEXT,
  plan         TEXT,
  signed_up_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  page_metrics JSONB
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

  -- ── 1. Normalize page URLs to just the filename (e.g. "day01.html", "index.html")
  --       Supabase stores full path like /manodemy_web/day01.html
  --       JS keys are just day01.html / index.html
  norm_views AS (
    SELECT
      user_id,
      session_id,
      -- strip everything up to the last '/' to get just the filename
      REGEXP_REPLACE(page_url, '^.+/', '') AS page_key,
      created_at
    FROM public.page_views
    WHERE created_at BETWEEN start_ts AND end_ts
      AND user_id IS NOT NULL
  ),

  norm_logs AS (
    SELECT
      user_id,
      event_type,
      REGEXP_REPLACE(
        COALESCE(metadata->>'page_url', page_url, ''),
        '^.+/', ''
      )                                AS page_key,
      metadata,
      created_at
    FROM public.activity_logs
    WHERE created_at BETWEEN start_ts AND end_ts
      AND user_id IS NOT NULL
  ),

  -- ── 2. Visits per user per normalized page ────────────────────────────────
  visits_agg AS (
    SELECT
      user_id,
      page_key,
      COUNT(DISTINCT session_id) AS visits
    FROM norm_views
    GROUP BY user_id, page_key
  ),

  -- ── 3. Time spent per user per page ──────────────────────────────────────
  --       session_heartbeat stores active_seconds (cumulative)
  --       session_end stores duration_seconds (total for the session)
  --       Strategy: take the MAX of either per session, then SUM across sessions
  time_agg AS (
    SELECT
      sess_times.user_id,
      sess_times.page_key,
      SUM(sess_times.best_secs) AS time_spent_seconds
    FROM (
      SELECT
        user_id,
        page_key,
        COALESCE(metadata->>'session_id', '') AS sess_id,
        MAX(
          COALESCE(
            NULLIF(metadata->>'active_seconds', '')::numeric,
            NULLIF(metadata->>'duration_seconds', '')::numeric,
            0
          )
        ) AS best_secs
      FROM norm_logs
      WHERE event_type IN ('session_heartbeat', 'session_end')
        AND (
          metadata->>'active_seconds'   IS NOT NULL OR
          metadata->>'duration_seconds' IS NOT NULL
        )
      GROUP BY user_id, page_key, COALESCE(metadata->>'session_id', '')
    ) sess_times
    GROUP BY sess_times.user_id, sess_times.page_key
  ),

  -- ── 4. Questions solved: count distinct solved cell IDs per page ──────────
  questions_agg AS (
    SELECT
      user_id,
      page_key,
      COUNT(DISTINCT COALESCE(
        metadata->>'question_id',
        metadata->>'exercise_id',
        metadata->>'cell_id',
        gen_random_uuid()::text
      )) AS questions_solved
    FROM norm_logs
    WHERE event_type IN ('question_solved', 'exercise_completed', 'answer_submitted', 'quiz_completed')
    GROUP BY user_id, page_key
  ),

  -- ── 5. Union all pages per user ──────────────────────────────────────────
  all_pages AS (
    SELECT user_id, page_key FROM visits_agg
    UNION
    SELECT user_id, page_key FROM time_agg
    UNION
    SELECT user_id, page_key FROM questions_agg
  ),

  -- ── 6. Merge all metrics per user/page ───────────────────────────────────
  user_pages AS (
    SELECT
      ap.user_id                                AS uid,
      ap.page_key,
      COALESCE(va.visits, 0)                    AS visits,
      COALESCE(ta.time_spent_seconds, 0)        AS time_spent,
      COALESCE(qa.questions_solved, 0)          AS questions_solved
    FROM all_pages ap
    LEFT JOIN visits_agg    va ON va.user_id = ap.user_id AND va.page_key = ap.page_key
    LEFT JOIN time_agg      ta ON ta.user_id = ap.user_id AND ta.page_key = ap.page_key
    LEFT JOIN questions_agg qa ON qa.user_id = ap.user_id AND qa.page_key = ap.page_key
    WHERE ap.page_key IS NOT NULL AND ap.page_key != ''
  ),

  -- ── 7. Aggregate metrics into JSONB per user ──────────────────────────────
  aggregated_metrics AS (
    SELECT
      uid,
      jsonb_object_agg(
        page_key,
        jsonb_build_object(
          'visits',             visits,
          'time_spent_seconds', time_spent,
          'questions_solved',   questions_solved
        )
      ) AS page_metrics
    FROM user_pages
    GROUP BY uid
  ),

  -- ── 8. User profiles with last seen from BOTH activity_logs & page_views ─
  user_profiles AS (
    SELECT
      p.id                                                   AS uid,
      p.full_name,
      p.email,
      p.country,
      p.created_at                                           AS signed_up_at,
      GREATEST(
        (SELECT MAX(created_at) FROM public.activity_logs WHERE user_id = p.id),
        (SELECT MAX(created_at) FROM public.page_views     WHERE user_id = p.id)
      )                                                      AS last_seen_at,
      COALESCE((
        SELECT CASE WHEN status = 'completed' THEN 'paid' ELSE status END
        FROM public.purchases
        WHERE user_id = p.id
        ORDER BY created_at DESC LIMIT 1
      ), 'free')                                             AS plan
    FROM public.profiles p
  )

  SELECT
    prf.uid,
    COALESCE(prf.full_name, ''),
    COALESCE(prf.email, ''),
    prf.country,
    prf.plan,
    prf.signed_up_at,
    prf.last_seen_at,
    COALESCE(am.page_metrics, '{}'::jsonb) AS page_metrics
  FROM user_profiles prf
  LEFT JOIN aggregated_metrics am ON am.uid = prf.uid
  ORDER BY prf.last_seen_at DESC NULLS LAST;
END;
$$;

REVOKE ALL ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
