-- ═══════════════════════════════════════════════════════════════
-- Migration: 034_sync_payments_trigger.sql
-- Automatically syncs successful live payments into the purchases table
-- to ensure new sales reflect in the Admin Intelligence Suite instantly!
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.sync_payment_to_purchases()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_course_id TEXT;
  v_gateway TEXT;
  v_amount_inr NUMERIC;
  v_amount_original NUMERIC;
  v_coupon_used TEXT;
  v_purchase_status TEXT;
  v_refunded_at TIMESTAMPTZ := NULL;
  v_inr_usd_rate NUMERIC := 83.5; -- standard INR/USD conversion rate
BEGIN
  -- 1. Fetch order details from orders table
  SELECT user_id, course_id, gateway
  INTO v_user_id, v_course_id, v_gateway
  FROM public.orders
  WHERE id = NEW.order_id;

  -- 2. Only sync if a valid order exists
  IF v_user_id IS NOT NULL THEN
    -- Convert paise/cents to decimal (e.g. 149900 -> 1499.00)
    v_amount_original := NEW.amount / 100.0;

    -- Calculate INR value for unified analytics Gross/Net charts
    IF NEW.currency = 'INR' THEN
      v_amount_inr := v_amount_original;
    ELSE
      v_amount_inr := v_amount_original * v_inr_usd_rate;
    END IF;

    -- Map payment status to purchases status
    IF NEW.status = 'captured' THEN
      v_purchase_status := 'completed';
    ELSIF NEW.status = 'refunded' THEN
      v_purchase_status := 'refunded';
      v_refunded_at := now();
    ELSE
      -- Ignore pending, failed, or processing states for analytics
      RETURN NEW;
    END IF;

    -- 3. Upsert into public.purchases (using NEW.id to keep it 1:1 and handle updates cleanly)
    INSERT INTO public.purchases (
      id,
      user_id,
      course_id,
      amount_inr,
      amount_original,
      currency,
      coupon_used,
      payment_gateway,
      status,
      refunded_at,
      created_at
    ) VALUES (
      NEW.id,
      v_user_id,
      NULL, -- course_id in purchases table expects UUID (can be NULL or bypassed safely)
      v_amount_inr,
      v_amount_original,
      NEW.currency,
      NULL, -- coupon code references can be matched optionally
      v_gateway,
      v_purchase_status,
      v_refunded_at,
      NEW.created_at
    )
    ON CONFLICT (id) DO UPDATE SET
      status = EXCLUDED.status,
      refunded_at = EXCLUDED.refunded_at;

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to public.payments
DROP TRIGGER IF EXISTS tr_sync_payment_to_purchases ON public.payments;
CREATE TRIGGER tr_sync_payment_to_purchases
  AFTER INSERT OR UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_payment_to_purchases();

-- Force Schema Cache reload
NOTIFY pgrst, 'reload schema';
