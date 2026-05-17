-- ============================================================================
-- 021_engagement_all_users.sql  (v3 — reads notebook_state_sync for questions)
--
-- DATA SOURCES:
--   Visits:    page_views table (session counts)
--   Time:      activity_logs session_heartbeat + session_end + notebook_state_sync
--   Questions: activity_logs notebook_state_sync (solved_count from localStorage)
--              + individual question_solved events as fallback
--
-- All column references fully qualified to avoid PL/pgSQL variable ambiguity.
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
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  WITH

  -- 1. Normalize page_url → bare filename (day01.html, index.html)
  norm_views AS (
    SELECT
      pv.user_id                              AS uid,
      pv.session_id,
      REGEXP_REPLACE(pv.page_url, '^.+/', '') AS page_key,
      pv.created_at
    FROM public.page_views pv
    WHERE pv.created_at BETWEEN start_ts AND end_ts
      AND pv.user_id IS NOT NULL
      AND pv.page_url IS NOT NULL
  ),

  norm_logs AS (
    SELECT
      al.user_id                              AS uid,
      al.event_type,
      REGEXP_REPLACE(
        COALESCE(
          NULLIF(al.metadata->>'page_url', ''),
          NULLIF(al.page_url, ''),
          ''
        ), '^.+/', ''
      )                                       AS page_key,
      al.metadata,
      al.created_at
    FROM public.activity_logs al
    WHERE al.created_at BETWEEN start_ts AND end_ts
      AND al.user_id IS NOT NULL
  ),

  -- 2. Visits = distinct sessions per user per page
  visits_agg AS (
    SELECT
      nv.uid,
      nv.page_key,
      COUNT(DISTINCT nv.session_id) AS visits
    FROM norm_views nv
    WHERE nv.page_key IS NOT NULL AND nv.page_key <> ''
    GROUP BY nv.uid, nv.page_key
  ),

  -- 3. Time spent: take MAX per session (heartbeats are cumulative), then SUM across sessions
  time_agg AS (
    SELECT
      ps.uid,
      ps.page_key,
      SUM(ps.max_secs) AS time_spent_seconds
    FROM (
      SELECT
        nl.uid,
        nl.page_key,
        COALESCE(nl.metadata->>'session_id', nl.uid::text || '_' || nl.page_key) AS sess_id,
        -- MAX per session because heartbeats report cumulative active_seconds
        -- (30, 60, 90... not incremental). We want only the highest value per session.
        MAX(
          GREATEST(
            COALESCE(NULLIF(nl.metadata->>'active_seconds',   '')::NUMERIC, 0),
            COALESCE(NULLIF(nl.metadata->>'duration_seconds', '')::NUMERIC, 0)
          )
        ) AS max_secs
      FROM norm_logs nl
      WHERE nl.event_type IN ('session_heartbeat', 'session_end', 'notebook_state_sync')
        AND nl.page_key IS NOT NULL AND nl.page_key <> ''
        AND (
          nl.metadata->>'active_seconds'   IS NOT NULL OR
          nl.metadata->>'duration_seconds' IS NOT NULL
        )
      GROUP BY nl.uid, nl.page_key, COALESCE(nl.metadata->>'session_id', nl.uid::text || '_' || nl.page_key)
    ) ps
    GROUP BY ps.uid, ps.page_key
  ),

  -- 4a. Questions from notebook_state_sync (bulk sync from localStorage)
  --     Take the MAX solved_count per user per page (latest sync is most accurate)
  sync_questions AS (
    SELECT
      nl.uid,
      nl.page_key,
      MAX(COALESCE(NULLIF(nl.metadata->>'solved_count', '')::INTEGER, 0)) AS solved
    FROM norm_logs nl
    WHERE nl.event_type = 'notebook_state_sync'
      AND nl.page_key IS NOT NULL AND nl.page_key <> ''
      AND nl.metadata->>'solved_count' IS NOT NULL
    GROUP BY nl.uid, nl.page_key
  ),

  -- 4b. Questions from individual question_solved events (real-time, per-solve)
  individual_questions AS (
    SELECT
      nl.uid,
      nl.page_key,
      COUNT(DISTINCT COALESCE(nl.metadata->>'question_id', nl.metadata->>'cell_id', gen_random_uuid()::text)) AS solved
    FROM norm_logs nl
    WHERE nl.event_type IN ('question_solved', 'exercise_completed', 'answer_submitted', 'quiz_completed')
      AND nl.page_key IS NOT NULL AND nl.page_key <> ''
    GROUP BY nl.uid, nl.page_key
  ),

  -- 4c. Merge: take the GREATEST of bulk sync vs individual count
  questions_agg AS (
    SELECT
      COALESCE(sq.uid, iq.uid)         AS uid,
      COALESCE(sq.page_key, iq.page_key) AS page_key,
      GREATEST(
        COALESCE(sq.solved, 0),
        COALESCE(iq.solved, 0)
      ) AS questions_solved
    FROM sync_questions sq
    FULL OUTER JOIN individual_questions iq
      ON iq.uid = sq.uid AND iq.page_key = sq.page_key
  ),

  -- 5. Union all page keys
  all_pages AS (
    SELECT va.uid, va.page_key FROM visits_agg va
    UNION
    SELECT ta.uid, ta.page_key FROM time_agg ta
    UNION
    SELECT qa.uid, qa.page_key FROM questions_agg qa
  ),

  -- 6. Merge metrics
  user_pages AS (
    SELECT
      ap.uid,
      ap.page_key,
      COALESCE(va.visits, 0)                  AS visits,
      COALESCE(ta.time_spent_seconds, 0)      AS time_spent,
      COALESCE(qa.questions_solved, 0)        AS questions_solved
    FROM all_pages ap
    LEFT JOIN visits_agg    va ON va.uid = ap.uid AND va.page_key = ap.page_key
    LEFT JOIN time_agg      ta ON ta.uid = ap.uid AND ta.page_key = ap.page_key
    LEFT JOIN questions_agg qa ON qa.uid = ap.uid AND qa.page_key = ap.page_key
  ),

  -- 7. Roll up into JSONB per user
  aggregated_metrics AS (
    SELECT
      up.uid,
      jsonb_object_agg(
        up.page_key,
        jsonb_build_object(
          'visits',             up.visits,
          'time_spent_seconds', up.time_spent,
          'questions_solved',   up.questions_solved
        )
      ) AS metrics
    FROM user_pages up
    GROUP BY up.uid
  ),

  -- 8. All profiles (never filtered)
  user_profiles AS (
    SELECT
      p.id           AS uid,
      p.full_name    AS p_name,
      p.email        AS p_email,
      p.country      AS p_country,
      p.created_at   AS p_signed_up,
      GREATEST(
        (SELECT MAX(al2.created_at) FROM public.activity_logs al2 WHERE al2.user_id = p.id),
        (SELECT MAX(pv2.created_at) FROM public.page_views    pv2 WHERE pv2.user_id = p.id)
      )              AS p_last_seen,
      COALESCE((
        SELECT CASE WHEN pu.status = 'completed' THEN 'paid' ELSE pu.status END
        FROM public.purchases pu
        WHERE pu.user_id = p.id
        ORDER BY pu.created_at DESC
        LIMIT 1
      ), 'free')     AS p_plan
    FROM public.profiles p
    WHERE p.email IS NOT NULL
  )

  -- 9. Final: ALL users LEFT JOIN metrics
  SELECT
    prf.uid                                AS user_id,
    COALESCE(prf.p_name, '')               AS full_name,
    COALESCE(prf.p_email, '')              AS email,
    prf.p_country                          AS country,
    prf.p_plan                             AS plan,
    prf.p_signed_up                        AS signed_up_at,
    prf.p_last_seen                        AS last_seen_at,
    COALESCE(am.metrics, '{}'::JSONB)      AS page_metrics
  FROM user_profiles prf
  LEFT JOIN aggregated_metrics am ON am.uid = prf.uid
  ORDER BY prf.p_last_seen DESC NULLS LAST,
           prf.p_signed_up  DESC NULLS LAST;

END;
$$;

REVOKE ALL ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_user_page_engagement(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
