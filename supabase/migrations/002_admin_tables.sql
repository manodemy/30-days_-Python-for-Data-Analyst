-- ═══════════════════════════════════════════════════════
-- Manodemy Admin Dashboard — Database Migration
-- Run this in Supabase SQL Editor AFTER 001_payment_tables.sql
-- ═══════════════════════════════════════════════════════

-- 1. Add role column to existing profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';

-- 2. Admin audit log
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  old_value JSONB,
  new_value JSONB,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access on audit" ON public.admin_audit_log FOR ALL USING (auth.role() = 'service_role');

-- 3. Platform settings
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Service role can write settings" ON public.settings FOR ALL USING (auth.role() = 'service_role');

INSERT INTO public.settings (key, value) VALUES (
  'pricing',
  '{"inr": 149900, "usd": 1900, "original_inr": 499900, "original_usd": 6900, "discount_label": "70% OFF", "flash_sale": null}'::jsonb
) ON CONFLICT (key) DO NOTHING;

INSERT INTO public.settings (key, value) VALUES (
  'gateways',
  '{"razorpay": true, "stripe": false, "paypal": false}'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- 4. Notifications
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
CREATE POLICY "Service role full access on notifications" ON public.notifications FOR ALL USING (auth.role() = 'service_role');

-- 5. Admin verification function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Indexes
CREATE INDEX IF NOT EXISTS idx_audit_admin ON public.admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_type ON public.admin_audit_log(target_type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read, created_at DESC);
