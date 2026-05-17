-- ============================================================================
-- 021_engagement_all_users.sql  (v4 — all bugs fixed from deep audit)
--
-- BUGS FIXED in v4:
--   1. Time double-counting: notebook_sync (cumulative) was being summed with
--      per-visit telemetry sessions. Now uses GREATEST(sync, sum-of-sessions).
--   2. gen_random_uuid() in COUNT DISTINCT inflated question counts for
--      malformed events. Replaced with deterministic fallback.
--   3. Added notebook_state_sync to time sources with proper isolation.
--
-- DATA FLOW:
--   Visits:    page_views.session_id  → COUNT(DISTINCT)
--   Time:      GREATEST(notebook_state_sync cumulative, SUM of telemetry sessions)
--   Questions: GREATEST(notebook_state_sync.solved_count, COUNT of individual events)
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

  -- ═══ NORMALIZATION ═══════════════════════════════════════════════════════
  -- Strip page_url to bare filename: /any/path/day01.html → day01.html
  norm_views AS (
    SELECT
      pv.user_id                              AS uid,
      pv.session_id,
      REGEXP_REPLACE(pv.page_url, '^.+/', '') AS page_key
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
      al.metadata
    FROM public.activity_logs al
    WHERE al.created_at BETWEEN start_ts AND end_ts
      AND al.user_id IS NOT NULL
  ),

  -- ═══ VISITS ══════════════════════════════════════════════════════════════
  -- One visit = one distinct session_id in page_views
  visits_agg AS (
    SELECT
      nv.uid,
      nv.page_key,
      COUNT(DISTINCT nv.session_id) AS visits
    FROM norm_views nv
    WHERE nv.page_key IS NOT NULL AND nv.page_key <> ''
    GROUP BY nv.uid, nv.page_key
  ),

  -- ═══ TIME SPENT ══════════════════════════════════════════════════════════
  -- Strategy A: notebook_state_sync carries the cumulative localStorage timer.
  --             This is the GROUND TRUTH — it's what the user sees on their page.
  --             Take MAX (latest sync has the highest cumulative value).
  sync_time AS (
    SELECT
      nl.uid,
      nl.page_key,
      MAX(COALESCE(NULLIF(nl.metadata->>'active_seconds', '')::NUMERIC, 0)) AS total_secs
    FROM norm_logs nl
    WHERE nl.event_type = 'notebook_state_sync'
      AND nl.page_key IS NOT NULL AND nl.page_key <> ''
      AND nl.metadata->>'active_seconds' IS NOT NULL
    GROUP BY nl.uid, nl.page_key
  ),

  -- Strategy B: Telemetry sessions (heartbeats + session_end).
  --             Each unique session_id has cumulative heartbeats (30, 60, 90...),
  --             so take MAX per session, then SUM across distinct sessions.
  --             EXCLUDE notebook_sync sessions to avoid double-counting with Strategy A.
  session_time AS (
    SELECT
      ps.uid,
      ps.page_key,
      SUM(ps.max_secs) AS total_secs
    FROM (
      SELECT
        nl.uid,
        nl.page_key,
        COALESCE(nl.metadata->>'session_id', nl.uid::text || '_' || nl.page_key) AS sess_id,
        MAX(
          GREATEST(
            COALESCE(NULLIF(nl.metadata->>'active_seconds',   '')::NUMERIC, 0),
            COALESCE(NULLIF(nl.metadata->>'duration_seconds', '')::NUMERIC, 0)
          )
        ) AS max_secs
      FROM norm_logs nl
      WHERE nl.event_type IN ('session_heartbeat', 'session_end')
        AND nl.page_key IS NOT NULL AND nl.page_key <> ''
        AND (
          nl.metadata->>'active_seconds'   IS NOT NULL OR
          nl.metadata->>'duration_seconds' IS NOT NULL
        )
        -- CRITICAL: exclude notebook sync heartbeats (they carry cumulative totals)
        AND COALESCE(nl.metadata->>'session_id', '') NOT LIKE 'notebook_sync_%'
      GROUP BY nl.uid, nl.page_key, COALESCE(nl.metadata->>'session_id', nl.uid::text || '_' || nl.page_key)
    ) ps
    GROUP BY ps.uid, ps.page_key
  ),

  -- Final time: GREATEST of the two strategies (never double-count)
  time_agg AS (
    SELECT
      COALESCE(st.uid, tt.uid)             AS uid,
      COALESCE(st.page_key, tt.page_key)   AS page_key,
      GREATEST(
        COALESCE(st.total_secs, 0),
        COALESCE(tt.total_secs, 0)
      ) AS time_spent_seconds
    FROM sync_time st
    FULL OUTER JOIN session_time tt
      ON tt.uid = st.uid AND tt.page_key = st.page_key
  ),

  -- ═══ QUESTIONS SOLVED ════════════════════════════════════════════════════
  -- Source A: notebook_state_sync.solved_count (bulk from localStorage — ground truth)
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

  -- Source B: Individual question_solved events (real-time, per cell solve)
  individual_questions AS (
    SELECT
      nl.uid,
      nl.page_key,
      -- Use question_id or cell_id for distinct counting; skip rows without either
      COUNT(DISTINCT COALESCE(nl.metadata->>'question_id', nl.metadata->>'cell_id')) AS solved
    FROM norm_logs nl
    WHERE nl.event_type IN ('question_solved', 'exercise_completed', 'answer_submitted', 'quiz_completed')
      AND nl.page_key IS NOT NULL AND nl.page_key <> ''
      AND (nl.metadata->>'question_id' IS NOT NULL OR nl.metadata->>'cell_id' IS NOT NULL)
    GROUP BY nl.uid, nl.page_key
  ),

  -- Final questions: GREATEST of both sources
  questions_agg AS (
    SELECT
      COALESCE(sq.uid, iq.uid)             AS uid,
      COALESCE(sq.page_key, iq.page_key)   AS page_key,
      GREATEST(
        COALESCE(sq.solved, 0),
        COALESCE(iq.solved, 0)
      ) AS questions_solved
    FROM sync_questions sq
    FULL OUTER JOIN individual_questions iq
      ON iq.uid = sq.uid AND iq.page_key = sq.page_key
  ),

  -- ═══ MERGE ═══════════════════════════════════════════════════════════════
  all_pages AS (
    SELECT va.uid, va.page_key FROM visits_agg va
    UNION
    SELECT ta.uid, ta.page_key FROM time_agg ta
    UNION
    SELECT qa.uid, qa.page_key FROM questions_agg qa
  ),

  user_pages AS (
    SELECT
      ap.uid,
      ap.page_key,
      COALESCE(va.visits, 0)             AS visits,
      COALESCE(ta.time_spent_seconds, 0) AS time_spent,
      COALESCE(qa.questions_solved, 0)   AS questions_solved
    FROM all_pages ap
    LEFT JOIN visits_agg    va ON va.uid = ap.uid AND va.page_key = ap.page_key
    LEFT JOIN time_agg      ta ON ta.uid = ap.uid AND ta.page_key = ap.page_key
    LEFT JOIN questions_agg qa ON qa.uid = ap.uid AND qa.page_key = ap.page_key
  ),

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

  -- ═══ PROFILES ════════════════════════════════════════════════════════════
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

  -- ═══ OUTPUT ══════════════════════════════════════════════════════════════
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
