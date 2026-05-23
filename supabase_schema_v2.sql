-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — UNIFIED DATABASE SCHEMA SETUP
-- Run this in the V2 Supabase Dashboard SQL Editor (New Query)
-- ═══════════════════════════════════════════════════════════════

-- Enable pgcrypto for generating random UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ═══════════════════════════════════════════════════════════════
-- 1. PROFILES & ROLES (extends auth.users)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  country TEXT DEFAULT 'US',
  role TEXT DEFAULT 'student',
  plan_type TEXT DEFAULT 'free',
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can select all profiles" ON public.profiles;
CREATE POLICY "Admins can select all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR auth.role() = 'service_role');
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR auth.role() = 'service_role');

-- Trigger to automatically create a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ═══════════════════════════════════════════════════════════════
-- 2. ORDERS & PAYMENTS (Razorpary / Stripe History)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL DEFAULT 'python-30day',
  amount INTEGER NOT NULL,            -- in smallest unit (paise/cents)
  currency TEXT NOT NULL DEFAULT 'INR',
  gateway TEXT NOT NULL CHECK (gateway IN ('razorpay','stripe','paypal')),
  gateway_order_id TEXT,              -- razorpay order_id / stripe session_id
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;
CREATE POLICY "Users can read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Service role full access on orders" ON public.orders;
CREATE POLICY "Service role full access on orders" ON public.orders FOR ALL USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  gateway_payment_id TEXT,
  gateway_signature TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  method TEXT,                         -- upi, card, netbanking, wallet, paypal
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','captured','failed','refunded')),
  raw_response JSONB,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own payments" ON public.payments;
CREATE POLICY "Users can read own payments" ON public.payments FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = payments.order_id AND orders.user_id = auth.uid()));
DROP POLICY IF EXISTS "Service role full access on payments" ON public.payments;
CREATE POLICY "Service role full access on payments" ON public.payments FOR ALL USING (auth.role() = 'service_role');


-- ═══════════════════════════════════════════════════════════════
-- 3. COURSE ENROLLMENTS (Access bypass trigger)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL DEFAULT 'python-30day',
  payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,             -- NULL = lifetime access
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own enrollments" ON public.enrollments;
CREATE POLICY "Users can read own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Service role full access on enrollments" ON public.enrollments;
CREATE POLICY "Service role full access on enrollments" ON public.enrollments FOR ALL USING (auth.role() = 'service_role');

-- Helper function to check if active session has purchased course
CREATE OR REPLACE FUNCTION public.check_enrollment(p_course_id TEXT DEFAULT 'python-30day')
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE user_id = auth.uid()
      AND course_id = p_course_id
      AND (expires_at IS NULL OR expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ═══════════════════════════════════════════════════════════════
-- 4. COUPONS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT DEFAULT 'percentage' CHECK (discount_type IN ('percentage','fixed')),
  discount_value NUMERIC DEFAULT 0,
  applies_to TEXT DEFAULT 'both' CHECK (applies_to IN ('INR','USD','both')),
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read active coupons" ON public.coupons;
CREATE POLICY "Anyone can read active coupons" ON public.coupons FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));
DROP POLICY IF EXISTS "Service role full access on coupons" ON public.coupons;
CREATE POLICY "Service role full access on coupons" ON public.coupons FOR ALL USING (auth.role() = 'service_role');


-- ═══════════════════════════════════════════════════════════════
-- 5. ADMIN AUDIT, SETTINGS, & NOTIFICATIONS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  target_type TEXT,
  target_id TEXT,
  old_value JSONB,
  new_value JSONB,
  changed_data JSONB,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.admin_audit_log;
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin'));
DROP POLICY IF EXISTS "Service role full access on audit" ON public.admin_audit_log;
CREATE POLICY "Service role full access on audit" ON public.admin_audit_log FOR ALL USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read settings" ON public.settings;
CREATE POLICY "Anyone can read settings" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can write settings" ON public.settings;
CREATE POLICY "Service role can write settings" ON public.settings FOR ALL USING (auth.role() = 'service_role');

-- Insert standard settings configuration
INSERT INTO public.settings (key, value) VALUES (
  'pricing',
  '{"inr": 149900, "usd": 1900, "original_inr": 499900, "original_usd": 6900, "discount_label": "70% OFF", "flash_sale": null}'::jsonb
) ON CONFLICT (key) DO NOTHING;

INSERT INTO public.settings (key, value) VALUES (
  'gateways',
  '{"razorpay": true, "stripe": false, "paypal": false}'::jsonb
) ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  metadata JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on notifications" ON public.notifications;
CREATE POLICY "Service role full access on notifications" ON public.notifications FOR ALL USING (auth.role() = 'service_role');

-- Helper to verify admin privileges
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ═══════════════════════════════════════════════════════════════
-- 6. PUBLIC REVIEWS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  reviewer_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  pros TEXT[] DEFAULT '{}'::TEXT[],
  cons TEXT[] DEFAULT '{}'::TEXT[],
  recommend BOOLEAN DEFAULT true,
  cohort_date TEXT,
  media_urls TEXT[] DEFAULT '{}'::TEXT[],
  helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved' OR auth.role() = 'service_role');
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update reviews" ON public.reviews;
CREATE POLICY "Anyone can update reviews" ON public.reviews FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Service role full access on reviews" ON public.reviews;
CREATE POLICY "Service role full access on reviews" ON public.reviews FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Admins can full access on reviews" ON public.reviews;
CREATE POLICY "Admins can full access on reviews" ON public.reviews FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  client_uuid TEXT NOT NULL, -- fingerprint to avoid double clicks
  vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful', 'report')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, client_uuid, vote_type)
);

ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read and write votes" ON public.review_votes;
CREATE POLICY "Anyone can read and write votes" ON public.review_votes FOR ALL USING (true);

-- reviewer verification trigger on submit
CREATE OR REPLACE FUNCTION public.check_reviewer_verification()
RETURNS TRIGGER AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments e
    JOIN public.profiles p ON e.user_id = p.id
    WHERE LOWER(p.email) = LOWER(NEW.reviewer_email)
  ) INTO v_exists;

  IF NOT v_exists AND NEW.user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE user_id = NEW.user_id
    ) INTO v_exists;
  END IF;

  IF v_exists THEN
    NEW.is_verified := true;
  END IF;

  IF NEW.status IS NULL THEN
    NEW.status := 'approved';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_verify_reviewer_on_submit ON public.reviews;
CREATE TRIGGER tr_verify_reviewer_on_submit
  BEFORE INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.check_reviewer_verification();


-- ═══════════════════════════════════════════════════════════════
-- 7. ANALYTICS TELEMETRY (Page views & focus sessions)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.page_views TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  page_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.activity_logs TO authenticated;


-- ═══════════════════════════════════════════════════════════════
-- 8. INDEXES FOR ULTRAPREP PERFORMANCE
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_gateway_id ON public.orders(gateway_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_audit_admin ON public.admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_votes_match ON public.review_votes(review_id, client_uuid, vote_type);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_user_created ON public.activity_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_date ON public.activity_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_event_date ON public.activity_logs(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON public.profiles(plan_type);

-- Notify schema reload to reload PostgREST cache immediately
NOTIFY pgrst, 'reload schema';
