-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — CROSS-DATABASE DATA EXPORT UTILITY
-- Run this in your LEGACY Supabase SQL Editor (gvhnwmuyrwissgkumeif)
-- to instantly generate the INSERT statements for all your historical data.
-- ═══════════════════════════════════════════════════════════════

-- 1. GENERATE PROFILES INSERTS
SELECT 'INSERT INTO public.profiles (id, full_name, email, country, role, plan, plan_type, created_at, last_sign_in_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(full_name) || ', ' || 
  quote_nullable(email) || ', ' || 
  quote_nullable(country) || ', ' || 
  quote_nullable(role) || ', ' || 
  quote_nullable(plan) || ', ' || 
  quote_nullable(plan_type) || ', ' || 
  quote_nullable(created_at) || ', ' || 
  quote_nullable(last_sign_in_at) || ') ON CONFLICT (id) DO NOTHING;' AS profiles_sql
FROM public.profiles;

-- 2. GENERATE ORDERS INSERTS
SELECT 'INSERT INTO public.orders (id, user_id, amount_inr, amount_usd, coupon_used, status, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(amount_inr) || ', ' || 
  quote_nullable(amount_usd) || ', ' || 
  quote_nullable(coupon_used) || ', ' || 
  quote_nullable(status) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS orders_sql
FROM public.orders;

-- 3. GENERATE PAYMENTS INSERTS
SELECT 'INSERT INTO public.payments (id, order_id, gateway, gateway_payment_id, status, amount_inr, amount_usd, error_log, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(order_id) || ', ' || 
  quote_nullable(gateway) || ', ' || 
  quote_nullable(gateway_payment_id) || ', ' || 
  quote_nullable(status) || ', ' || 
  quote_nullable(amount_inr) || ', ' || 
  quote_nullable(amount_usd) || ', ' || 
  quote_nullable(error_log) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS payments_sql
FROM public.payments;

-- 4. GENERATE ENROLLMENTS INSERTS
SELECT 'INSERT INTO public.enrollments (id, user_id, course_id, is_active, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(course_id) || ', ' || 
  quote_nullable(is_active) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS enrollments_sql
FROM public.enrollments;

-- 5. GENERATE PAGE VIEWS INSERTS
SELECT 'INSERT INTO public.page_views (id, session_id, user_id, page_path, referrer, user_agent, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(session_id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(page_path) || ', ' || 
  quote_nullable(referrer) || ', ' || 
  quote_nullable(user_agent) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS pageviews_sql
FROM public.page_views;

-- 6. GENERATE ACTIVITY LOGS INSERTS
SELECT 'INSERT INTO public.activity_logs (id, user_id, event_type, metadata, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(event_type) || ', ' || 
  quote_nullable(metadata) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS activity_sql
FROM public.activity_logs;
