-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — ANALYTICS telemetry & SALES HISTORICAL SEED
-- Run this in your Supabase SQL Editor to instantly populate your V2 
-- database with rich, realistic transaction records, student enrollments,
-- cohort signups, and page-view telemetries for the last 30 days.
-- ═══════════════════════════════════════════════════════════════

-- 1. CLEAN EXISTING ANALYTICS DATA (Optional, starts fresh)
TRUNCATE public.activity_logs CASCADE;
TRUNCATE public.page_views CASCADE;
TRUNCATE public.enrollments CASCADE;
TRUNCATE public.payments CASCADE;
TRUNCATE public.orders CASCADE;
DELETE FROM public.profiles WHERE role = 'student';

-- 2. INSERT REALISTIC USER PROFILES
-- Creates 15 student profiles spanning the last 30 days with a clean distribution of countries
INSERT INTO public.profiles (id, full_name, email, country, role, plan, plan_type, created_at, last_sign_in_at) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Aarav Sharma', 'aarav.sharma@gmail.com', 'IN', 'student', 'pro', 'premium', now() - interval '28 days', now() - interval '1 day'),
('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'Sarah Jenkins', 'sarah.j@techcorp.com', 'US', 'student', 'pro', 'premium', now() - interval '25 days', now() - interval '2 hours'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Rohan Verma', 'rohan.verma@outlook.com', 'IN', 'student', 'pro', 'premium', now() - interval '22 days', now() - interval '3 days'),
('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Elena Rostova', 'elena.rostova@datawave.io', 'RU', 'student', 'pro', 'premium', now() - interval '20 days', now() - interval '12 hours'),
('e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'David Kim', 'd.kim@yonsei.ac.kr', 'KR', 'student', 'free', 'free', now() - interval '18 days', now() - interval '5 days'),
('f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'Chloe Dupont', 'chloe.dupont@sorbonne.fr', 'FR', 'student', 'pro', 'premium', now() - interval '15 days', now() - interval '1 day'),
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'James O-Connor', 'james.oc@dublin.ie', 'IE', 'student', 'pro', 'premium', now() - interval '12 days', now() - interval '4 hours'),
('8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Ananya Iyer', 'ananya.iyer@yahoo.com', 'IN', 'student', 'free', 'free', now() - interval '10 days', now() - interval '6 days'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Hiroshi Tanaka', 'h.tanaka@tokyo.tech', 'JP', 'student', 'pro', 'premium', now() - interval '8 days', now() - interval '1 day'),
('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Sophia Martinez', 'sophia.m@mexicotech.mx', 'MX', 'student', 'pro', 'premium', now() - interval '7 days', now() - interval '3 hours'),
('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Liam Wilson', 'liam.wilson@sydney.edu.au', 'AU', 'student', 'free', 'free', now() - interval '5 days', now() - interval '2 days'),
('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'Fatima Al-Sayed', 'fatima.s@kuwait.edu', 'KW', 'student', 'pro', 'premium', now() - interval '4 days', now() - interval '10 hours'),
('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', 'Mateo Kovacic', 'mateo.k@zg.hr', 'HR', 'student', 'free', 'free', now() - interval '3 days', now() - interval '1 day'),
('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'Emily Brown', 'emily.b@oxford.ac.uk', 'GB', 'student', 'pro', 'premium', now() - interval '2 days', now() - interval '5 hours'),
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'Wei Zhang', 'wei.zhang@tsinghua.edu.cn', 'CN', 'student', 'pro', 'premium', now() - interval '1 day', now() - interval '1 hour');

-- 3. INSERT REALISTIC COUPONS
INSERT INTO public.coupons (code, discount_pct, active, is_active, created_at) VALUES
('LAUNCH30', 30, true, true, now() - interval '30 days'),
('PYTHON50', 50, true, true, now() - interval '20 days')
ON CONFLICT (code) DO NOTHING;

-- 4. INSERT REALISTIC ORDERS & PAYMENTS (SALES DATA)
-- Creates transactions in INR/USD to drive the Gross/Net Revenue graphs and average order values
INSERT INTO public.orders (id, user_id, amount_inr, amount_usd, coupon_used, status, created_at) VALUES
('ord_1111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 499900, 5999, 'LAUNCH30', 'completed', now() - interval '28 days'),
('ord_2222', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 499900, 5999, NULL, 'completed', now() - interval '25 days'),
('ord_3333', 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 499900, 5999, 'LAUNCH30', 'completed', now() - interval '22 days'),
('ord_4444', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 499900, 5999, NULL, 'completed', now() - interval '20 days'),
('ord_5555', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 499900, 5999, 'PYTHON50', 'completed', now() - interval '15 days'),
('ord_6666', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 499900, 5999, NULL, 'completed', now() - interval '12 days'),
('ord_7777', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 499900, 5999, 'LAUNCH30', 'completed', now() - interval '8 days'),
('ord_8888', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 499900, 5999, NULL, 'completed', now() - interval '7 days'),
('ord_9999', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 499900, 5999, 'PYTHON50', 'completed', now() - interval '4 days'),
('ord_0000', '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 499900, 5999, NULL, 'completed', now() - interval '2 days'),
('ord_aaaa', '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 499900, 5999, NULL, 'completed', now() - interval '1 day');

INSERT INTO public.payments (id, order_id, gateway, gateway_payment_id, status, amount_inr, amount_usd, error_log, created_at) VALUES
('pay_1111', 'ord_1111', 'stripe', 'ch_1111', 'captured', 349930, 4199, NULL, now() - interval '28 days'), -- Launch30 discount
('pay_2222', 'ord_2222', 'stripe', 'ch_2222', 'captured', 499900, 5999, NULL, now() - interval '25 days'),
('pay_3333', 'ord_3333', 'razorpay', 'pay_3333', 'captured', 349930, 4199, NULL, now() - interval '22 days'),
('pay_4444', 'ord_4444', 'stripe', 'ch_4444', 'captured', 499900, 5999, NULL, now() - interval '20 days'),
('pay_5555', 'ord_5555', 'stripe', 'ch_5555', 'captured', 249950, 2999, NULL, now() - interval '15 days'), -- Python50 discount
('pay_6666', 'ord_6666', 'razorpay', 'pay_6666', 'captured', 499900, 5999, NULL, now() - interval '12 days'),
('pay_7777', 'ord_7777', 'stripe', 'ch_7777', 'captured', 349930, 4199, NULL, now() - interval '8 days'),
('pay_8888', 'ord_8888', 'stripe', 'ch_8888', 'captured', 499900, 5999, NULL, now() - interval '7 days'),
('pay_9999', 'ord_9999', 'razorpay', 'pay_9999', 'captured', 249950, 2999, NULL, now() - interval '4 days'),
('pay_0000', 'ord_0000', 'stripe', 'ch_0000', 'captured', 499900, 5999, NULL, now() - interval '2 days'),
('pay_aaaa', 'ord_aaaa', 'stripe', 'ch_aaaa', 'captured', 499900, 5999, NULL, now() - interval '1 day');

-- 5. INSERT ENROLLMENTS
INSERT INTO public.enrollments (user_id, course_id, is_active, created_at) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'python-30day', true, now() - interval '28 days'),
('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'python-30day', true, now() - interval '25 days'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'python-30day', true, now() - interval '22 days'),
('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'python-30day', true, now() - interval '20 days'),
('f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'python-30day', true, now() - interval '15 days'),
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'python-30day', true, now() - interval '12 days'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'python-30day', true, now() - interval '8 days'),
('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'python-30day', true, now() - interval '7 days'),
('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'python-30day', true, now() - interval '4 days'),
('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'python-30day', true, now() - interval '2 days'),
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'python-30day', true, now() - interval '1 day');

-- 6. INSERT TELEMETRY DATA (PAGE VIEWS & ACTIVITY LOGS)
-- Drives the Funnel chart, DAU/MAU analytics, and cohort retention calculations
-- A. Funnel conversion entries (Landing -> Pricing -> Checkout -> Purchased)
INSERT INTO public.page_views (id, session_id, user_id, page_path, referrer, user_agent, created_at) VALUES
-- Aarav Sharma (Converted)
(gen_random_uuid(), 'sess_aarav', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '/landing', 'google.com', 'Mozilla', now() - interval '28 days' - interval '1 hour'),
(gen_random_uuid(), 'sess_aarav', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '/pricing', NULL, 'Mozilla', now() - interval '28 days' - interval '45 minutes'),
(gen_random_uuid(), 'sess_aarav', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '/checkout', NULL, 'Mozilla', now() - interval '28 days' - interval '30 minutes'),
(gen_random_uuid(), 'sess_aarav', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '/payment-success', NULL, 'Mozilla', now() - interval '28 days'),

-- Sarah Jenkins (Converted)
(gen_random_uuid(), 'sess_sarah', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', '/landing', 'linkedin.com', 'Mozilla', now() - interval '25 days' - interval '30 minutes'),
(gen_random_uuid(), 'sess_sarah', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', '/pricing', NULL, 'Mozilla', now() - interval '25 days' - interval '20 minutes'),
(gen_random_uuid(), 'sess_sarah', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', '/checkout', NULL, 'Mozilla', now() - interval '25 days' - interval '10 minutes'),
(gen_random_uuid(), 'sess_sarah', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', '/payment-success', NULL, 'Mozilla', now() - interval '25 days'),

-- Chloe Dupont (Converted)
(gen_random_uuid(), 'sess_chloe', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', '/landing', 'github.com', 'Mozilla', now() - interval '15 days' - interval '2 hours'),
(gen_random_uuid(), 'sess_chloe', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', '/pricing', NULL, 'Mozilla', now() - interval '15 days' - interval '1 hour'),
(gen_random_uuid(), 'sess_chloe', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', '/checkout', NULL, 'Mozilla', now() - interval '15 days' - interval '45 minutes'),
(gen_random_uuid(), 'sess_chloe', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', '/payment-success', NULL, 'Mozilla', now() - interval '15 days'),

-- Dropouts (Only viewed Landing) - 10 Sessions
(gen_random_uuid(), 'sess_drop1', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '14 days'),
(gen_random_uuid(), 'sess_drop2', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '13 days'),
(gen_random_uuid(), 'sess_drop3', NULL, '/landing', 'facebook.com', 'Mozilla', now() - interval '12 days'),
(gen_random_uuid(), 'sess_drop4', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '10 days'),
(gen_random_uuid(), 'sess_drop5', NULL, '/landing', 'twitter.com', 'Mozilla', now() - interval '8 days'),
(gen_random_uuid(), 'sess_drop6', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '6 days'),
(gen_random_uuid(), 'sess_drop7', NULL, '/landing', 'linkedin.com', 'Mozilla', now() - interval '5 days'),
(gen_random_uuid(), 'sess_drop8', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '4 days'),
(gen_random_uuid(), 'sess_drop9', NULL, '/landing', 'github.com', 'Mozilla', now() - interval '2 days'),
(gen_random_uuid(), 'sess_drop0', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '1 day'),

-- Dropouts (Viewed Pricing too) - 6 Sessions
(gen_random_uuid(), 'sess_drop_p1', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '20 days'),
(gen_random_uuid(), 'sess_drop_p1', NULL, '/pricing', NULL, 'Mozilla', now() - interval '20 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_p2', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '18 days'),
(gen_random_uuid(), 'sess_drop_p2', NULL, '/pricing', NULL, 'Mozilla', now() - interval '18 days' + interval '10 minutes'),
(gen_random_uuid(), 'sess_drop_p3', NULL, '/landing', 'linkedin.com', 'Mozilla', now() - interval '12 days'),
(gen_random_uuid(), 'sess_drop_p3', NULL, '/pricing', NULL, 'Mozilla', now() - interval '12 days' + interval '2 minutes'),
(gen_random_uuid(), 'sess_drop_p4', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '9 days'),
(gen_random_uuid(), 'sess_drop_p4', NULL, '/pricing', NULL, 'Mozilla', now() - interval '9 days' + interval '4 minutes'),
(gen_random_uuid(), 'sess_drop_p5', NULL, '/landing', 'facebook.com', 'Mozilla', now() - interval '4 days'),
(gen_random_uuid(), 'sess_drop_p5', NULL, '/pricing', NULL, 'Mozilla', now() - interval '4 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_p6', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '1 day'),
(gen_random_uuid(), 'sess_drop_p6', NULL, '/pricing', NULL, 'Mozilla', now() - interval '1 day' + interval '3 minutes'),

-- Dropouts (Viewed Checkout too) - 3 Sessions
(gen_random_uuid(), 'sess_drop_c1', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '22 days'),
(gen_random_uuid(), 'sess_drop_c1', NULL, '/pricing', NULL, 'Mozilla', now() - interval '22 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_c1', NULL, '/checkout', NULL, 'Mozilla', now() - interval '22 days' + interval '15 minutes'),
(gen_random_uuid(), 'sess_drop_c2', NULL, '/landing', 'google.com', 'Mozilla', now() - interval '11 days'),
(gen_random_uuid(), 'sess_drop_c2', NULL, '/pricing', NULL, 'Mozilla', now() - interval '11 days' + interval '2 minutes'),
(gen_random_uuid(), 'sess_drop_c2', NULL, '/checkout', NULL, 'Mozilla', now() - interval '11 days' + interval '8 minutes'),
(gen_random_uuid(), 'sess_drop_c3', NULL, '/landing', 'github.com', 'Mozilla', now() - interval '5 days'),
(gen_random_uuid(), 'sess_drop_c3', NULL, '/pricing', NULL, 'Mozilla', now() - interval '5 days' + interval '4 minutes'),
(gen_random_uuid(), 'sess_drop_c3', NULL, '/checkout', NULL, 'Mozilla', now() - interval '5 days' + interval '9 minutes');

-- B. Active Learning Session Tracking (Activity Logs)
-- Drives Retention analysis (Active User definitions) & time spent counters
INSERT INTO public.activity_logs (id, user_id, event_type, metadata, created_at) VALUES
-- Week 1 retention entries
('act_11', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '{"session_id":"sess_aarav_w1"}', now() - interval '21 days'),
('act_12', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '{"session_id":"sess_aarav_w1", "duration_seconds":"1800"}', now() - interval '21 days' + interval '30 minutes'),
('act_21', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '{"session_id":"sess_sarah_w1"}', now() - interval '18 days'),
('act_22', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '{"session_id":"sess_sarah_w1", "duration_seconds":"2400"}', now() - interval '18 days' + interval '40 minutes'),

-- Week 2 retention entries
('act_13', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '{"session_id":"sess_aarav_w2"}', now() - interval '14 days'),
('act_14', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '{"session_id":"sess_aarav_w2", "duration_seconds":"1200"}', now() - interval '14 days' + interval '20 minutes'),
('act_23', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '{"session_id":"sess_sarah_w2"}', now() - interval '11 days'),
('act_24', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '{"session_id":"sess_sarah_w2", "duration_seconds":"3000"}', now() - interval '11 days' + interval '50 minutes'),

-- Week 3 retention entries
('act_15', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '{"session_id":"sess_aarav_w3"}', now() - interval '7 days'),
('act_16', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '{"session_id":"sess_aarav_w3", "duration_seconds":"900"}', now() - interval '7 days' + interval '15 minutes'),
('act_25', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '{"session_id":"sess_sarah_w3"}', now() - interval '4 days'),
('act_26', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '{"session_id":"sess_sarah_w3", "duration_seconds":"1800"}', now() - interval '4 days' + interval '30 minutes'),

-- Week 4 retention entries
('act_17', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '{"session_id":"sess_aarav_w4"}', now() - interval '1 day'),
('act_18', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '{"session_id":"sess_aarav_w4", "duration_seconds":"2700"}', now() - interval '1 day' + interval '45 minutes'),
('act_27', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '{"session_id":"sess_sarah_w4"}', now() - interval '2 hours'),
('act_28', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '{"session_id":"sess_sarah_w4", "duration_seconds":"3600"}', now() - interval '2 hours' + interval '1 hour');

-- 7. RE-DEPLOY ADMIN ANALYTICS TRIGGER FOR LIVE UPDATES (Optional / Helper)
-- Force Schema Cache reload
NOTIFY pgrst, 'reload schema';
