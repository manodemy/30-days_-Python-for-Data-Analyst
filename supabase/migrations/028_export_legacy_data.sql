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

-- 2. GENERATE PURCHASES INSERTS (Main Analytics Table)
SELECT 'INSERT INTO public.purchases (id, user_id, course_id, amount_inr, amount_original, currency, coupon_used, payment_gateway, status, refunded_at, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(course_id) || ', ' || 
  quote_nullable(amount_inr) || ', ' || 
  quote_nullable(amount_original) || ', ' || 
  quote_nullable(currency) || ', ' || 
  quote_nullable(coupon_used) || ', ' || 
  quote_nullable(payment_gateway) || ', ' || 
  quote_nullable(status) || ', ' || 
  quote_nullable(refunded_at) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS purchases_sql
FROM public.purchases;

-- 3. GENERATE ORDERS INSERTS (Optional checkout history)
SELECT 'INSERT INTO public.orders (id, user_id, course_id, amount, currency, gateway, gateway_order_id, status, created_at, updated_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(course_id) || ', ' || 
  quote_nullable(amount) || ', ' || 
  quote_nullable(currency) || ', ' || 
  quote_nullable(gateway) || ', ' || 
  quote_nullable(gateway_order_id) || ', ' || 
  quote_nullable(status) || ', ' || 
  quote_nullable(created_at) || ', ' || 
  quote_nullable(updated_at) || ') ON CONFLICT (id) DO NOTHING;' AS orders_sql
FROM public.orders;

-- 4. GENERATE PAYMENTS INSERTS (Optional checkout history)
SELECT 'INSERT INTO public.payments (id, order_id, gateway_payment_id, gateway_signature, amount, currency, method, status, raw_response, verified_at, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(order_id) || ', ' || 
  quote_nullable(gateway_payment_id) || ', ' || 
  quote_nullable(gateway_signature) || ', ' || 
  quote_nullable(amount) || ', ' || 
  quote_nullable(currency) || ', ' || 
  quote_nullable(method) || ', ' || 
  quote_nullable(status) || ', ' || 
  quote_nullable(raw_response) || ', ' || 
  quote_nullable(verified_at) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS payments_sql
FROM public.payments;

-- 5. GENERATE ENROLLMENTS INSERTS
SELECT 'INSERT INTO public.enrollments (id, user_id, course_id, enrolled_at, expires_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(course_id) || ', ' || 
  quote_nullable(enrolled_at) || ', ' || 
  quote_nullable(expires_at) || ') ON CONFLICT (id) DO NOTHING;' AS enrollments_sql
FROM public.enrollments;

-- 6. GENERATE PAGE VIEWS INSERTS
SELECT 'INSERT INTO public.page_views (id, session_id, page_url, referrer, country, user_id, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(session_id) || ', ' || 
  quote_nullable(page_url) || ', ' || 
  quote_nullable(referrer) || ', ' || 
  quote_nullable(country) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS pageviews_sql
FROM public.page_views;

-- 7. GENERATE ACTIVITY LOGS INSERTS
SELECT 'INSERT INTO public.activity_logs (id, user_id, event_type, page_url, metadata, created_at) VALUES (' || 
  quote_nullable(id) || ', ' || 
  quote_nullable(user_id) || ', ' || 
  quote_nullable(event_type) || ', ' || 
  quote_nullable(page_url) || ', ' || 
  quote_nullable(metadata) || ', ' || 
  quote_nullable(created_at) || ') ON CONFLICT (id) DO NOTHING;' AS activity_sql
FROM public.activity_logs;
