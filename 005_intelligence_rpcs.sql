-- 005_intelligence_rpcs.sql

-- ==============================================================================
-- 1A. Supporting Tables & Indexes
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure activity_logs has the correct schema (in case it was created previously with an older schema)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  event_type TEXT NOT NULL,
  page_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Safely add missing columns to profiles table to support Intelligence Suite
DO $$ 
BEGIN
  -- Add role column if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;

  -- Add plan_type column if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'plan_type') THEN
    ALTER TABLE public.profiles ADD COLUMN plan_type TEXT DEFAULT 'free';
  END IF;

  -- Add last_sign_in_at column if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'last_sign_in_at') THEN
    ALTER TABLE public.profiles ADD COLUMN last_sign_in_at TIMESTAMPTZ;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_activity_user_created ON public.activity_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON public.profiles(plan_type);

DO $$ 
BEGIN
  -- Safely add columns if they don't exist
  BEGIN
    ALTER TABLE public.activity_logs ADD COLUMN event_type TEXT;
  EXCEPTION
    WHEN duplicate_column THEN NULL;
  END;
  BEGIN
    ALTER TABLE public.activity_logs ADD COLUMN page_url TEXT;
  EXCEPTION
    WHEN duplicate_column THEN NULL;
  END;
  BEGIN
    ALTER TABLE public.activity_logs ADD COLUMN metadata JSONB;
  EXCEPTION
    WHEN duplicate_column THEN NULL;
  END;
END $$;

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_date ON activity_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_event_date ON activity_logs(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(created_at DESC);

-- ==============================================================================
-- 1B. Revenue Intelligence RPCs
-- ==============================================================================

CREATE OR REPLACE FUNCTION get_revenue_intelligence(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
  active_users_count INTEGER;
BEGIN
  -- Admin Authorization Check
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Active Users count: users who either had activity or made a purchase in this period
  SELECT COUNT(DISTINCT user_id) INTO active_users_count
  FROM (
    SELECT user_id FROM activity_logs WHERE created_at >= start_ts AND created_at <= end_ts
    UNION
    SELECT user_id FROM purchases WHERE created_at >= start_ts AND created_at <= end_ts
  ) AS active_pool;

  WITH agg AS (
    SELECT
      -- Gross Revenue = ALL money collected (including amounts later refunded)
      -- This is the standard financial definition: money IN before deductions
      SUM(amount_inr) FILTER (WHERE status IN ('completed', 'paid', 'captured', 'successful', 'refunded')) AS gross_revenue,
      SUM(amount_inr) FILTER (WHERE status = 'refunded') AS refund_amount,
      COUNT(*) FILTER (WHERE status IN ('completed', 'paid', 'captured', 'successful', 'refunded')) AS transaction_count,
      COUNT(*) FILTER (WHERE status = 'refunded') AS refund_count
    FROM purchases
    WHERE created_at >= start_ts AND created_at <= end_ts
  ),
  daily AS (
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      -- Daily gross includes refunded rows (money was collected that day)
      COALESCE(SUM(amount_inr) FILTER (WHERE status IN ('completed', 'paid', 'captured', 'successful', 'refunded')), 0) AS gross,
      COALESCE(SUM(amount_inr) FILTER (WHERE status = 'refunded'), 0) AS refunds
    FROM purchases
    WHERE created_at >= start_ts AND created_at <= end_ts
    GROUP BY date_trunc('day', created_at)
    ORDER BY date_trunc('day', created_at)
  ),
  curr_split AS (
    SELECT
      currency,
      SUM(amount_inr) AS amount,
      COUNT(*) AS count
    FROM purchases
    WHERE created_at >= start_ts AND created_at <= end_ts
      AND status IN ('completed', 'paid', 'captured', 'successful', 'refunded')
    GROUP BY currency
  )
  SELECT json_build_object(
    'gross_revenue', COALESCE(agg.gross_revenue, 0),
    'net_revenue', COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0),
    'refund_amount', COALESCE(agg.refund_amount, 0),
    'transaction_count', COALESCE(agg.transaction_count, 0),
    'refund_count', COALESCE(agg.refund_count, 0),
    'refund_rate_pct', CASE WHEN agg.transaction_count > 0 THEN (agg.refund_count::NUMERIC / agg.transaction_count) * 100 ELSE 0 END,
    'aov', CASE WHEN agg.transaction_count > 0 THEN (COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0)) / agg.transaction_count ELSE 0 END,
    'arpu', CASE WHEN active_users_count > 0 THEN (COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0)) / active_users_count ELSE 0 END,
    'currency_split', COALESCE((SELECT json_agg(json_build_object('currency', currency, 'amount', amount, 'count', count)) FROM curr_split), '[]'::json),
    'daily_revenue', COALESCE((SELECT json_agg(json_build_object('day', day, 'gross', gross, 'net', gross - refunds, 'refunds', refunds)) FROM daily), '[]'::json)
  ) INTO res
  FROM agg;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_revenue_intelligence FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_revenue_intelligence TO authenticated;

-- Previous period version
CREATE OR REPLACE FUNCTION get_revenue_intelligence_prev(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
  active_users_count INTEGER;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Active Users count: anyone who had activity or a purchase in this period
  SELECT COUNT(DISTINCT user_id) INTO active_users_count
  FROM (
    SELECT user_id FROM activity_logs WHERE created_at >= start_ts AND created_at <= end_ts
    UNION
    SELECT user_id FROM purchases WHERE created_at >= start_ts AND created_at <= end_ts
  ) AS active_pool;

  WITH agg AS (
    SELECT
      -- Gross Revenue = ALL money collected (including amounts later refunded)
      SUM(amount_inr) FILTER (WHERE status IN ('completed', 'paid', 'captured', 'successful', 'refunded')) AS gross_revenue,
      SUM(amount_inr) FILTER (WHERE status = 'refunded') AS refund_amount,
      COUNT(*) FILTER (WHERE status IN ('completed', 'paid', 'captured', 'successful', 'refunded')) AS transaction_count,
      COUNT(*) FILTER (WHERE status = 'refunded') AS refund_count
    FROM purchases
    WHERE created_at >= start_ts AND created_at <= end_ts
  )
  SELECT json_build_object(
    'gross_revenue', COALESCE(agg.gross_revenue, 0),
    'net_revenue', COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0),
    'refund_amount', COALESCE(agg.refund_amount, 0),
    'transaction_count', COALESCE(agg.transaction_count, 0),
    'refund_count', COALESCE(agg.refund_count, 0),
    'refund_rate_pct', CASE WHEN agg.transaction_count > 0 THEN (agg.refund_count::NUMERIC / agg.transaction_count) * 100 ELSE 0 END,
    'aov', CASE WHEN agg.transaction_count > 0 THEN (COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0)) / agg.transaction_count ELSE 0 END,
    'arpu', CASE WHEN active_users_count > 0 THEN (COALESCE(agg.gross_revenue, 0) - COALESCE(agg.refund_amount, 0)) / active_users_count ELSE 0 END,
    'currency_split', '[]'::json,
    'daily_revenue', '[]'::json
  ) INTO res
  FROM agg;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_revenue_intelligence_prev FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_revenue_intelligence_prev TO authenticated;

-- ==============================================================================
-- 1C. Growth Intelligence RPCs
-- ==============================================================================

CREATE OR REPLACE FUNCTION get_growth_intelligence(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  WITH su AS (
    SELECT COUNT(*) AS new_signups
    FROM profiles
    WHERE created_at >= start_ts AND created_at <= end_ts
  ),
  pu AS (
    SELECT COUNT(DISTINCT user_id) AS new_paying_users
    FROM purchases p1
    WHERE p1.status IN ('completed', 'paid', 'captured', 'successful')
      AND p1.created_at >= start_ts AND p1.created_at <= end_ts
      AND p1.user_id NOT IN (
        SELECT user_id FROM purchases p2 WHERE p2.status IN ('completed', 'paid', 'captured', 'successful') AND p2.created_at < start_ts
      )
  ),
  pv AS (
    -- Market-standard: count UNIQUE sessions.
    -- page_views is the primary source (new engine with user attribution).
    -- activity_logs session_start is the legacy fallback for pre-existing users.
    -- UNION (not UNION ALL) ensures no double-counting if a session_id appears in both.
    SELECT COUNT(DISTINCT sid) AS page_views
    FROM (
      SELECT session_id AS sid, created_at FROM public.page_views
      UNION
      SELECT metadata->>'session_id' AS sid, created_at
      FROM public.activity_logs
      WHERE event_type = 'session_start'
        AND metadata->>'session_id' IS NOT NULL
    ) AS all_sessions
    WHERE created_at >= start_ts AND created_at <= end_ts
  ),
  chk AS (
    SELECT COUNT(*) AS checkout_initiated
    FROM activity_logs
    WHERE event_type = 'checkout_initiated'
      AND created_at >= start_ts AND created_at <= end_ts
  ),
  countries AS (
    SELECT COALESCE(country, 'Unknown') as country, COUNT(*) as count
    FROM profiles
    WHERE created_at >= start_ts AND created_at <= end_ts
    GROUP BY country
    ORDER BY count DESC
    LIMIT 10
  ),
  daily AS (
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      COUNT(*) AS signups
    FROM profiles
    WHERE created_at >= start_ts AND created_at <= end_ts
    GROUP BY date_trunc('day', created_at)
  ),
  daily_paying AS (
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      COUNT(DISTINCT user_id) AS paying
    FROM purchases p1
    WHERE p1.status IN ('completed', 'paid', 'captured', 'successful')
      AND p1.created_at >= start_ts AND p1.created_at <= end_ts
      AND p1.user_id NOT IN (
        SELECT user_id FROM purchases p2 WHERE p2.status IN ('completed', 'paid', 'captured', 'successful') AND p2.created_at < start_ts
      )
    GROUP BY date_trunc('day', created_at)
  ),
  daily_merged AS (
    SELECT
      COALESCE(d.day, dp.day) AS day,
      COALESCE(d.signups, 0) AS signups,
      COALESCE(dp.paying, 0) AS paying
    FROM daily d
    FULL OUTER JOIN daily_paying dp ON d.day = dp.day
    ORDER BY COALESCE(d.day, dp.day)
  )
  SELECT json_build_object(
    'new_signups', (SELECT new_signups FROM su),
    'new_paying_users', (SELECT new_paying_users FROM pu),
    'conversion_rate_pct', CASE WHEN (SELECT new_signups FROM su) > 0 THEN ((SELECT new_paying_users FROM pu)::NUMERIC / (SELECT new_signups FROM su)) * 100 ELSE 0 END,
    'funnel', json_build_object(
      'page_views', (SELECT page_views FROM pv),
      'signups', (SELECT new_signups FROM su),
      'checkout_initiated', (SELECT checkout_initiated FROM chk),
      'purchased', (SELECT new_paying_users FROM pu)
    ),
    'country_distribution', COALESCE((SELECT json_agg(json_build_object('country', country, 'count', count)) FROM countries), '[]'::json),
    'daily_signups', COALESCE((SELECT json_agg(json_build_object('day', day, 'signups', signups, 'paying', paying)) FROM daily_merged), '[]'::json)
  ) INTO res;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_growth_intelligence FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_growth_intelligence TO authenticated;

-- Previous period version
CREATE OR REPLACE FUNCTION get_growth_intelligence_prev(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  WITH su AS (
    SELECT COUNT(*) AS new_signups
    FROM profiles
    WHERE created_at >= start_ts AND created_at <= end_ts
  ),
  pu AS (
    SELECT COUNT(DISTINCT user_id) AS new_paying_users
    FROM purchases p1
    WHERE p1.status IN ('completed', 'paid', 'captured', 'successful')
      AND p1.created_at >= start_ts AND p1.created_at <= end_ts
      AND p1.user_id NOT IN (
        SELECT user_id FROM purchases p2 WHERE p2.status IN ('completed', 'paid', 'captured', 'successful') AND p2.created_at < start_ts
      )
  )
  SELECT json_build_object(
    'new_signups', (SELECT new_signups FROM su),
    'new_paying_users', (SELECT new_paying_users FROM pu),
    'conversion_rate_pct', CASE WHEN (SELECT new_signups FROM su) > 0 THEN ((SELECT new_paying_users FROM pu)::NUMERIC / (SELECT new_signups FROM su)) * 100 ELSE 0 END,
    'funnel', json_build_object('page_views', 0, 'signups', 0, 'checkout_initiated', 0, 'purchased', 0),
    'country_distribution', '[]'::json,
    'daily_signups', '[]'::json
  ) INTO res;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_growth_intelligence_prev FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_growth_intelligence_prev TO authenticated;

-- ==============================================================================
-- 1D. Retention Intelligence RPCs
-- ==============================================================================

CREATE OR REPLACE FUNCTION get_retention_intelligence(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
  prev_start_ts TIMESTAMPTZ := start_ts - (end_ts - start_ts);
  prev_end_ts TIMESTAMPTZ := start_ts;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  WITH curr_active AS (
    SELECT DISTINCT user_id
    FROM activity_logs
    WHERE created_at >= start_ts AND created_at <= end_ts
  ),
  prev_active AS (
    SELECT DISTINCT user_id
    FROM activity_logs
    WHERE created_at >= prev_start_ts AND created_at < prev_end_ts
  ),
  churned AS (
    SELECT COUNT(*) AS cnt
    FROM prev_active p
    LEFT JOIN curr_active c ON p.user_id = c.user_id
    WHERE c.user_id IS NULL
  ),
  retained AS (
    SELECT COUNT(*) AS cnt
    FROM prev_active p
    JOIN curr_active c ON p.user_id = c.user_id
  ),
  plan_dist AS (
    SELECT
      COUNT(*) FILTER (WHERE plan_type = 'free' OR plan_type IS NULL) AS free_count,
      COUNT(*) FILTER (WHERE plan_type = 'premium') AS premium_count
    FROM profiles
  )
  SELECT json_build_object(
    'active_users', (SELECT COUNT(*) FROM curr_active),
    'prev_active_users', (SELECT COUNT(*) FROM prev_active),
    'churned_users', (SELECT cnt FROM churned),
    'retained_users', (SELECT cnt FROM retained),
    'retention_rate_pct', CASE WHEN (SELECT COUNT(*) FROM prev_active) > 0 THEN ((SELECT cnt FROM retained)::NUMERIC / (SELECT COUNT(*) FROM prev_active)) * 100 ELSE 0 END,
    'plan_distribution', json_build_object(
      'free', (SELECT free_count FROM plan_dist),
      'premium', (SELECT premium_count FROM plan_dist)
    )
  ) INTO res;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_retention_intelligence FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_retention_intelligence TO authenticated;

CREATE OR REPLACE FUNCTION get_dau_mau_series(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
  curr_dau NUMERIC;
  curr_mau NUMERIC;
  curr_ratio NUMERIC;
  bench_label TEXT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Calculate current DAU (most recent day)
  SELECT COUNT(DISTINCT user_id) INTO curr_dau
  FROM activity_logs
  WHERE created_at >= (end_ts - INTERVAL '1 day') AND created_at <= end_ts;

  -- Calculate current MAU (last 30 days)
  SELECT COUNT(DISTINCT user_id) INTO curr_mau
  FROM activity_logs
  WHERE created_at >= (end_ts - INTERVAL '30 days') AND created_at <= end_ts;

  curr_ratio := CASE WHEN curr_mau > 0 THEN curr_dau / curr_mau ELSE 0 END;
  
  IF curr_ratio < 0.1 THEN
    bench_label := 'Low';
  ELSIF curr_ratio <= 0.2 THEN
    bench_label := 'Fair';
  ELSE
    bench_label := 'Healthy';
  END IF;

  WITH RECURSIVE weeks AS (
    SELECT date_trunc('week', start_ts) AS week_start,
           date_trunc('week', start_ts) + INTERVAL '6 days 23:59:59' AS week_end
    UNION ALL
    SELECT week_start + INTERVAL '1 week',
           week_end + INTERVAL '1 week'
    FROM weeks
    WHERE week_start + INTERVAL '1 week' <= end_ts
  ),
  weekly_stats AS (
    SELECT
      to_char(w.week_start, 'IYYY-IW') AS week,
      (
        SELECT COUNT(DISTINCT user_id)::NUMERIC / 7.0
        FROM activity_logs a
        WHERE a.created_at >= w.week_start AND a.created_at <= w.week_end
      ) AS dau_avg,
      (
        SELECT COUNT(DISTINCT user_id)::NUMERIC
        FROM activity_logs a
        WHERE a.created_at >= (w.week_end - INTERVAL '30 days') AND a.created_at <= w.week_end
      ) AS mau
    FROM weeks w
  )
  SELECT json_build_object(
    'current_ratio', curr_ratio,
    'benchmark_label', bench_label,
    'weekly_series', COALESCE((
      SELECT json_agg(json_build_object(
        'week', week,
        'dau_mau_ratio', CASE WHEN mau > 0 THEN dau_avg / mau ELSE 0 END
      ))
      FROM weekly_stats
    ), '[]'::json)
  ) INTO res;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_dau_mau_series FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_dau_mau_series TO authenticated;


CREATE OR REPLACE FUNCTION get_cohort_retention()
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  WITH cohorts AS (
    SELECT 
      date_trunc('month', created_at) AS cohort_month,
      COUNT(id) AS cohort_size
    FROM profiles
    GROUP BY date_trunc('month', created_at)
  ),
  months AS (
    SELECT 0 AS m UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
  ),
  cohort_months AS (
    SELECT 
      c.cohort_month,
      c.cohort_size,
      m.m AS month_offset,
      (c.cohort_month + (m.m || ' month')::interval) AS active_month_start,
      (c.cohort_month + ((m.m + 1) || ' month')::interval) AS active_month_end
    FROM cohorts c
    CROSS JOIN months m
  ),
  active_counts AS (
    SELECT 
      cm.cohort_month,
      cm.month_offset,
      cm.cohort_size,
      cm.active_month_start,
      (
        SELECT COUNT(DISTINCT user_id)
        FROM activity_logs al
        WHERE al.created_at >= cm.active_month_start 
          AND al.created_at < cm.active_month_end
          AND al.user_id IN (SELECT id FROM profiles WHERE date_trunc('month', created_at) = cm.cohort_month)
      ) AS active_count
    FROM cohort_months cm
  ),
  aggregated AS (
    SELECT
      to_char(cohort_month, 'Mon YYYY') AS cohort_label,
      to_char(cohort_month, 'YYYY-MM-DD') AS cohort_month_str,
      cohort_size,
      json_agg(
        json_build_object(
          'month_offset', month_offset,
          'active_count', active_count,
          'retention_pct', CASE 
            WHEN active_month_start > now() THEN NULL
            WHEN month_offset = 0 THEN 100.0
            WHEN cohort_size > 0 THEN (active_count::NUMERIC / cohort_size) * 100 
            ELSE 0 
          END
        ) ORDER BY month_offset
      ) AS months
    FROM active_counts
    GROUP BY cohort_month, cohort_size
    ORDER BY cohort_month DESC
    LIMIT 12
  )
  SELECT COALESCE(json_agg(
    json_build_object(
      'cohort_label', cohort_label,
      'cohort_month', cohort_month_str,
      'cohort_size', cohort_size,
      'months', months
    ) ORDER BY cohort_month_str DESC
  ), '[]'::json) INTO res
  FROM aggregated;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_cohort_retention FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_cohort_retention TO authenticated;

-- ==============================================================================
-- 1E. Coupon Performance RPC
-- ==============================================================================

CREATE OR REPLACE FUNCTION get_coupon_performance(
  start_ts TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  res JSON;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  WITH agg AS (
    SELECT
      c.code,
      c.discount_type,
      c.discount_value,
      c.is_active,
      c.max_uses,
      c.expires_at,
      COUNT(p.id) AS uses_in_period,
      SUM(COALESCE(p.amount_inr, 0)) AS revenue_generated,
      CASE WHEN COUNT(p.id) > 0 THEN SUM(COALESCE(p.amount_inr, 0)) / COUNT(p.id) ELSE 0 END AS aov_with_coupon
    FROM coupons c
    LEFT JOIN purchases p ON c.code = p.coupon_used AND p.created_at >= start_ts AND p.created_at <= end_ts AND p.status IN ('completed', 'paid', 'captured', 'successful')
    GROUP BY c.id, c.code, c.discount_type, c.discount_value, c.is_active, c.max_uses, c.expires_at
  )
  SELECT COALESCE(json_agg(row_to_json(agg)), '[]'::json) INTO res
  FROM agg;

  RETURN res;
END;
$$;
REVOKE ALL ON FUNCTION get_coupon_performance FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_coupon_performance TO authenticated;
