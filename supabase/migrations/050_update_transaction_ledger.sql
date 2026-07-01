-- Migration: 050_update_transaction_ledger.sql
-- Description: Update get_transaction_ledger RPC to include product_type and batch_name.

DROP FUNCTION IF EXISTS public.get_transaction_ledger(TIMESTAMPTZ, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_transaction_ledger(
  start_ts TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ,
  end_ts   TIMESTAMPTZ DEFAULT '2099-01-01'::TIMESTAMPTZ
)
RETURNS TABLE (
  id                  UUID,
  user_id             UUID,
  amount_inr          NUMERIC,
  currency            TEXT,
  coupon_used         TEXT,
  coupon_discount_inr NUMERIC,
  payment_gateway     TEXT,
  status              TEXT,
  created_at          TIMESTAMPTZ,
  user_email          TEXT,
  user_name           TEXT,
  user_country        TEXT,
  phone               TEXT,
  product_type        TEXT,
  batch_name          TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.user_id,
    p.amount_inr,
    p.currency,
    p.coupon_used,
    COALESCE(p.coupon_discount_inr, 0),
    p.payment_gateway,
    p.status,
    p.created_at,
    pr.email,
    pr.full_name,
    pr.country,
    pr.phone,
    CASE WHEN e.product_type = 'live' THEN 'live' ELSE 'selfpaced' END AS product_type,
    COALESCE(b.batch_name, '—') AS batch_name
  FROM purchases p
  LEFT JOIN profiles pr ON p.user_id = pr.id
  LEFT JOIN enrollments e ON (p.id = e.payment_id OR p.id = e.id)
  LEFT JOIN batches b ON e.batch_id = b.id
  WHERE p.status IN ('completed', 'paid', 'captured', 'successful', 'refunded')
    AND p.created_at >= start_ts
    AND p.created_at <= end_ts
  ORDER BY p.created_at DESC;
END;
$$;

-- Re-grant execute permission
GRANT EXECUTE ON FUNCTION public.get_transaction_ledger(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
