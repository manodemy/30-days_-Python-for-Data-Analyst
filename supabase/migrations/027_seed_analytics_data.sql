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
TRUNCATE public.purchases CASCADE;
DELETE FROM public.profiles WHERE role = 'student';

-- Clean mock users from auth.users to prevent foreign key violations on re-run
DELETE FROM auth.users WHERE id IN (
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e',
  'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  'e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
  'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
  '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
  '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
  '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
  '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f'
);

-- 2. PRE-SEED AUTH.USERS TO SATISFY FOREIGN KEY CONSTRAINTS
-- Inserts 15 shell auth records matching the student profiles
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role, created_at) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'aarav.sharma@gmail.com', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Aarav Sharma"}', 'authenticated', 'authenticated', now() - interval '28 days'),
('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'sarah.j@techcorp.com', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sarah Jenkins"}', 'authenticated', 'authenticated', now() - interval '25 days'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'rohan.verma@outlook.com', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Rohan Verma"}', 'authenticated', 'authenticated', now() - interval '22 days'),
('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'elena.rostova@datawave.io', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Elena Rostova"}', 'authenticated', 'authenticated', now() - interval '20 days'),
('e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'd.kim@yonsei.ac.kr', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"David Kim"}', 'authenticated', 'authenticated', now() - interval '18 days'),
('f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'chloe.dupont@sorbonne.fr', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Chloe Dupont"}', 'authenticated', 'authenticated', now() - interval '15 days'),
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'james.oc@dublin.ie', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"James O''Connor"}', 'authenticated', 'authenticated', now() - interval '12 days'),
('8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'ananya.iyer@yahoo.com', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Ananya Iyer"}', 'authenticated', 'authenticated', now() - interval '10 days'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'h.tanaka@tokyo.tech', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Hiroshi Tanaka"}', 'authenticated', 'authenticated', now() - interval '8 days'),
('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'sophia.m@mexicotech.mx', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sophia Martinez"}', 'authenticated', 'authenticated', now() - interval '7 days'),
('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'liam.wilson@sydney.edu.au', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Liam Wilson"}', 'authenticated', 'authenticated', now() - interval '5 days'),
('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'fatima.s@kuwait.edu', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Fatima Al-Sayed"}', 'authenticated', 'authenticated', now() - interval '4 days'),
('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', 'mateo.k@zg.hr', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Mateo Kovacic"}', 'authenticated', 'authenticated', now() - interval '3 days'),
('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'emily.b@oxford.ac.uk', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Emily Brown"}', 'authenticated', 'authenticated', now() - interval '2 days'),
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'wei.zhang@tsinghua.edu.cn', '$2a$10$7Z/l8l4tY/WbJ2w7sR2Zveo0F3e4e9e4e4e4e4e4e4e4e4e4e4e4e', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Wei Zhang"}', 'authenticated', 'authenticated', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- 3. INSERT REALISTIC USER PROFILES
-- Matches columns from public.profiles schema
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
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'Wei Zhang', 'wei.zhang@tsinghua.edu.cn', 'CN', 'student', 'pro', 'premium', now() - interval '1 day', now() - interval '1 hour')
ON CONFLICT (id) DO NOTHING;

-- 4. INSERT REALISTIC COUPONS
-- Matches columns from public.coupons schema
INSERT INTO public.coupons (code, discount_type, discount_value, applies_to, max_uses, current_uses, is_active, created_at) VALUES
('LAUNCH30', 'percentage', 30, 'both', 100, 3, true, now() - interval '30 days'),
('PYTHON50', 'percentage', 50, 'both', 100, 2, true, now() - interval '20 days')
ON CONFLICT (code) DO NOTHING;

-- 5. INSERT REALISTIC PURCHASES (Main Analytics engine source)
-- Matches columns from public.purchases schema in 026_admin_analytics_rpcs.sql
INSERT INTO public.purchases (id, user_id, course_id, amount_inr, amount_original, currency, coupon_used, payment_gateway, status, refunded_at, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', NULL, 3499.30, 41.99, 'USD', 'LAUNCH30', 'stripe', 'completed', NULL, now() - interval '28 days'),
('22222222-2222-2222-2222-222222222222', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', NULL, 4999.00, 59.99, 'USD', NULL, 'stripe', 'completed', NULL, now() - interval '25 days'),
('33333333-3333-3333-3333-333333333333', 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', NULL, 3499.30, 3499.30, 'INR', 'LAUNCH30', 'razorpay', 'completed', NULL, now() - interval '22 days'),
('44444444-4444-4444-4444-444444444444', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', NULL, 4999.00, 59.99, 'USD', NULL, 'stripe', 'completed', NULL, now() - interval '20 days'),
('55555555-5555-5555-5555-555555555555', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', NULL, 2499.50, 29.99, 'USD', 'PYTHON50', 'stripe', 'completed', NULL, now() - interval '15 days'),
('66666666-6666-6666-6666-666666666666', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', NULL, 4999.00, 4999.00, 'INR', NULL, 'razorpay', 'completed', NULL, now() - interval '12 days'),
('77777777-7777-7777-7777-777777777777', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', NULL, 3499.30, 41.99, 'USD', 'LAUNCH30', 'stripe', 'completed', NULL, now() - interval '8 days'),
('88888888-8888-8888-8888-888888888888', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', NULL, 4999.00, 59.99, 'USD', NULL, 'stripe', 'completed', NULL, now() - interval '7 days'),
('99999999-9999-9999-9999-999999999999', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', NULL, 2499.50, 2499.50, 'INR', 'PYTHON50', 'razorpay', 'completed', NULL, now() - interval '4 days'),
('00000000-0000-0000-0000-000000000000', '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', NULL, 4999.00, 59.99, 'USD', NULL, 'stripe', 'completed', NULL, now() - interval '2 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', NULL, 4999.00, 59.99, 'USD', NULL, 'stripe', 'completed', NULL, now() - interval '1 day');

-- 6. INSERT REALISTIC ORDERS & PAYMENTS (Optional checkout tables, matching schemas)
-- Matches public.orders and public.payments schemas in supabase_schema_v2.sql
INSERT INTO public.orders (id, user_id, course_id, amount, currency, gateway, gateway_order_id, status, created_at, updated_at) VALUES
('ord_11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'python-30day', 349930, 'USD', 'stripe', 'ch_1111', 'paid', now() - interval '28 days', now() - interval '28 days'),
('ord_22222222-2222-2222-2222-222222222222', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'python-30day', 499900, 'USD', 'stripe', 'ch_2222', 'paid', now() - interval '25 days', now() - interval '25 days'),
('ord_33333333-3333-3333-3333-333333333333', 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'python-30day', 349930, 'INR', 'razorpay', 'pay_3333', 'paid', now() - interval '22 days', now() - interval '22 days'),
('ord_44444444-4444-4444-4444-444444444444', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'python-30day', 499900, 'USD', 'stripe', 'ch_4444', 'paid', now() - interval '20 days', now() - interval '20 days'),
('ord_55555555-5555-5555-5555-555555555555', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'python-30day', 249950, 'USD', 'stripe', 'ch_5555', 'paid', now() - interval '15 days', now() - interval '15 days'),
('ord_66666666-6666-6666-6666-666666666666', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'python-30day', 499900, 'INR', 'razorpay', 'pay_6666', 'paid', now() - interval '12 days', now() - interval '12 days'),
('ord_77777777-7777-7777-7777-777777777777', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'python-30day', 349930, 'USD', 'stripe', 'ch_7777', 'paid', now() - interval '8 days', now() - interval '8 days'),
('ord_88888888-8888-8888-8888-888888888888', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'python-30day', 499900, 'USD', 'stripe', 'ch_8888', 'paid', now() - interval '7 days', now() - interval '7 days'),
('ord_99999999-9999-9999-9999-999999999999', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'python-30day', 249950, 'INR', 'razorpay', 'pay_9999', 'paid', now() - interval '4 days', now() - interval '4 days'),
('ord_00000000-0000-0000-0000-000000000000', '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'python-30day', 499900, 'USD', 'stripe', 'ch_0000', 'paid', now() - interval '2 days', now() - interval '2 days'),
('ord_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'python-30day', 499900, 'USD', 'stripe', 'ch_aaaa', 'paid', now() - interval '1 day', now() - interval '1 day');

INSERT INTO public.payments (id, order_id, gateway_payment_id, gateway_signature, amount, currency, method, status, raw_response, verified_at, created_at) VALUES
('pay_11111111-1111-1111-1111-111111111111', 'ord_11111111-1111-1111-1111-111111111111', 'ch_1111', NULL, 349930, 'USD', 'card', 'captured', NULL, now() - interval '28 days', now() - interval '28 days'),
('pay_22222222-2222-2222-2222-222222222222', 'ord_22222222-2222-2222-2222-222222222222', 'ch_2222', NULL, 499900, 'USD', 'card', 'captured', NULL, now() - interval '25 days', now() - interval '25 days'),
('pay_33333333-3333-3333-3333-333333333333', 'ord_33333333-3333-3333-3333-333333333333', 'pay_3333', NULL, 349930, 'INR', 'upi', 'captured', NULL, now() - interval '22 days', now() - interval '22 days'),
('pay_44444444-4444-4444-4444-444444444444', 'ord_44444444-4444-4444-4444-444444444444', 'ch_4444', NULL, 499900, 'USD', 'card', 'captured', NULL, now() - interval '20 days', now() - interval '20 days'),
('pay_55555555-5555-5555-5555-555555555555', 'ord_55555555-5555-5555-5555-555555555555', 'ch_5555', NULL, 249950, 'USD', 'card', 'captured', NULL, now() - interval '15 days', now() - interval '15 days'),
('pay_66666666-6666-6666-6666-666666666666', 'ord_66666666-6666-6666-6666-666666666666', 'pay_6666', NULL, 499900, 'INR', 'upi', 'captured', NULL, now() - interval '12 days', now() - interval '12 days'),
('pay_77777777-7777-7777-7777-777777777777', 'ord_77777777-7777-7777-7777-777777777777', 'ch_7777', NULL, 349930, 'USD', 'card', 'captured', NULL, now() - interval '8 days', now() - interval '8 days'),
('pay_88888888-8888-8888-8888-888888888888', 'ord_88888888-8888-8888-8888-888888888888', 'ch_8888', NULL, 499900, 'USD', 'card', 'captured', NULL, now() - interval '7 days', now() - interval '7 days'),
('pay_99999999-9999-9999-9999-999999999999', 'ord_99999999-9999-9999-9999-999999999999', 'pay_9999', NULL, 249950, 'INR', 'upi', 'captured', NULL, now() - interval '4 days', now() - interval '4 days'),
('pay_00000000-0000-0000-0000-000000000000', 'ord_00000000-0000-0000-0000-000000000000', 'ch_0000', NULL, 499900, 'USD', 'card', 'captured', NULL, now() - interval '2 days', now() - interval '2 days'),
('pay_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ord_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ch_aaaa', NULL, 499900, 'USD', 'card', 'captured', NULL, now() - interval '1 day', now() - interval '1 day');

-- 7. INSERT ENROLLMENTS
-- Matches columns from public.enrollments schema (no is_active column)
INSERT INTO public.enrollments (user_id, course_id, enrolled_at) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'python-30day', now() - interval '28 days'),
('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'python-30day', now() - interval '25 days'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'python-30day', now() - interval '22 days'),
('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'python-30day', now() - interval '20 days'),
('f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'python-30day', now() - interval '15 days'),
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'python-30day', now() - interval '12 days'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'python-30day', now() - interval '8 days'),
('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'python-30day', now() - interval '7 days'),
('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'python-30day', now() - interval '4 days'),
('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'python-30day', now() - interval '2 days'),
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'python-30day', now() - interval '1 day')
ON CONFLICT (user_id, course_id) DO NOTHING;

-- 8. INSERT TELEMETRY DATA (PAGE VIEWS & ACTIVITY LOGS)
-- Drives the Funnel chart, DAU/MAU analytics, and cohort retention calculations
-- Matches public.page_views and public.activity_logs schemas in supabase_schema_v2.sql
INSERT INTO public.page_views (id, session_id, page_url, referrer, country, user_id, created_at) VALUES
-- Aarav Sharma (Converted)
(gen_random_uuid(), 'sess_aarav', '/landing', 'google.com', 'IN', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', now() - interval '28 days' - interval '1 hour'),
(gen_random_uuid(), 'sess_aarav', '/pricing', NULL, 'IN', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', now() - interval '28 days' - interval '45 minutes'),
(gen_random_uuid(), 'sess_aarav', '/checkout', NULL, 'IN', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', now() - interval '28 days' - interval '30 minutes'),
(gen_random_uuid(), 'sess_aarav', '/payment-success', NULL, 'IN', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', now() - interval '28 days'),

-- Sarah Jenkins (Converted)
(gen_random_uuid(), 'sess_sarah', '/landing', 'linkedin.com', 'US', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', now() - interval '25 days' - interval '30 minutes'),
(gen_random_uuid(), 'sess_sarah', '/pricing', NULL, 'US', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', now() - interval '25 days' - interval '20 minutes'),
(gen_random_uuid(), 'sess_sarah', '/checkout', NULL, 'US', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', now() - interval '25 days' - interval '10 minutes'),
(gen_random_uuid(), 'sess_sarah', '/payment-success', NULL, 'US', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', now() - interval '25 days'),

-- Chloe Dupont (Converted)
(gen_random_uuid(), 'sess_chloe', '/landing', 'github.com', 'FR', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', now() - interval '15 days' - interval '2 hours'),
(gen_random_uuid(), 'sess_chloe', '/pricing', NULL, 'FR', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', now() - interval '15 days' - interval '1 hour'),
(gen_random_uuid(), 'sess_chloe', '/checkout', NULL, 'FR', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', now() - interval '15 days' - interval '45 minutes'),
(gen_random_uuid(), 'sess_chloe', '/payment-success', NULL, 'FR', 'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', now() - interval '15 days'),

-- Dropouts (Only viewed Landing) - 10 Sessions
(gen_random_uuid(), 'sess_drop1', '/landing', 'google.com', 'US', NULL, now() - interval '14 days'),
(gen_random_uuid(), 'sess_drop2', '/landing', 'google.com', 'IN', NULL, now() - interval '13 days'),
(gen_random_uuid(), 'sess_drop3', '/landing', 'facebook.com', 'GB', NULL, now() - interval '12 days'),
(gen_random_uuid(), 'sess_drop4', '/landing', 'google.com', 'US', NULL, now() - interval '10 days'),
(gen_random_uuid(), 'sess_drop5', '/landing', 'twitter.com', 'IN', NULL, now() - interval '8 days'),
(gen_random_uuid(), 'sess_drop6', '/landing', 'google.com', 'DE', NULL, now() - interval '6 days'),
(gen_random_uuid(), 'sess_drop7', '/landing', 'linkedin.com', 'CA', NULL, now() - interval '5 days'),
(gen_random_uuid(), 'sess_drop8', '/landing', 'google.com', 'AU', NULL, now() - interval '4 days'),
(gen_random_uuid(), 'sess_drop9', '/landing', 'github.com', 'SG', NULL, now() - interval '2 days'),
(gen_random_uuid(), 'sess_drop0', '/landing', 'google.com', 'NZ', NULL, now() - interval '1 day'),

-- Dropouts (Viewed Pricing too) - 6 Sessions
(gen_random_uuid(), 'sess_drop_p1', '/landing', 'google.com', 'IN', NULL, now() - interval '20 days'),
(gen_random_uuid(), 'sess_drop_p1', '/pricing', NULL, 'IN', NULL, now() - interval '20 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_p2', '/landing', 'google.com', 'US', NULL, now() - interval '18 days'),
(gen_random_uuid(), 'sess_drop_p2', '/pricing', NULL, 'US', NULL, now() - interval '18 days' + interval '10 minutes'),
(gen_random_uuid(), 'sess_drop_p3', '/landing', 'linkedin.com', 'GB', NULL, now() - interval '12 days'),
(gen_random_uuid(), 'sess_drop_p3', '/pricing', NULL, 'GB', NULL, now() - interval '12 days' + interval '2 minutes'),
(gen_random_uuid(), 'sess_drop_p4', '/landing', 'google.com', 'AE', NULL, now() - interval '9 days'),
(gen_random_uuid(), 'sess_drop_p4', '/pricing', NULL, 'AE', NULL, now() - interval '9 days' + interval '4 minutes'),
(gen_random_uuid(), 'sess_drop_p5', '/landing', 'facebook.com', 'ZA', NULL, now() - interval '4 days'),
(gen_random_uuid(), 'sess_drop_p5', '/pricing', NULL, 'ZA', NULL, now() - interval '4 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_p6', '/landing', 'google.com', 'NL', NULL, now() - interval '1 day'),
(gen_random_uuid(), 'sess_drop_p6', '/pricing', NULL, 'NL', NULL, now() - interval '1 day' + interval '3 minutes'),

-- Dropouts (Viewed Checkout too) - 3 Sessions
(gen_random_uuid(), 'sess_drop_c1', '/landing', 'google.com', 'BR', NULL, now() - interval '22 days'),
(gen_random_uuid(), 'sess_drop_c1', '/pricing', NULL, 'BR', NULL, now() - interval '22 days' + interval '5 minutes'),
(gen_random_uuid(), 'sess_drop_c1', '/checkout', NULL, 'BR', NULL, now() - interval '22 days' + interval '15 minutes'),
(gen_random_uuid(), 'sess_drop_c2', '/landing', 'google.com', 'MX', NULL, now() - interval '11 days'),
(gen_random_uuid(), 'sess_drop_c2', '/pricing', NULL, 'MX', NULL, now() - interval '11 days' + interval '2 minutes'),
(gen_random_uuid(), 'sess_drop_c2', '/checkout', NULL, 'MX', NULL, now() - interval '11 days' + interval '8 minutes'),
(gen_random_uuid(), 'sess_drop_c3', '/landing', 'github.com', 'HK', NULL, now() - interval '5 days'),
(gen_random_uuid(), 'sess_drop_c3', '/pricing', NULL, 'HK', NULL, now() - interval '5 days' + interval '4 minutes'),
(gen_random_uuid(), 'sess_drop_c3', '/checkout', NULL, 'HK', NULL, now() - interval '5 days' + interval '9 minutes');

-- B. Active Learning Session Tracking (Activity Logs)
-- Drives Retention analysis (Active User definitions) & time spent counters
INSERT INTO public.activity_logs (id, user_id, event_type, page_url, metadata, created_at) VALUES
-- Week 1 retention entries
('e1111111-1111-1111-1111-1111111111a1', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '/home', '{"session_id":"sess_aarav_w1"}', now() - interval '21 days'),
('e1111111-1111-1111-1111-1111111111a2', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '/home', '{"session_id":"sess_aarav_w1", "duration_seconds":"1800"}', now() - interval '21 days' + interval '30 minutes'),
('e2222222-2222-2222-2222-2222222222a1', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '/home', '{"session_id":"sess_sarah_w1"}', now() - interval '18 days'),
('e2222222-2222-2222-2222-2222222222a2', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '/home', '{"session_id":"sess_sarah_w1", "duration_seconds":"2400"}', now() - interval '18 days' + interval '40 minutes'),

-- Week 2 retention entries
('e1111111-1111-1111-1111-1111111111a3', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '/home', '{"session_id":"sess_aarav_w2"}', now() - interval '14 days'),
('e1111111-1111-1111-1111-1111111111a4', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '/home', '{"session_id":"sess_aarav_w2", "duration_seconds":"1200"}', now() - interval '14 days' + interval '20 minutes'),
('e2222222-2222-2222-2222-2222222222a3', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '/home', '{"session_id":"sess_sarah_w2"}', now() - interval '11 days'),
('e2222222-2222-2222-2222-2222222222a4', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '/home', '{"session_id":"sess_sarah_w2", "duration_seconds":"3000"}', now() - interval '11 days' + interval '50 minutes'),

-- Week 3 retention entries
('e1111111-1111-1111-1111-1111111111a5', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '/home', '{"session_id":"sess_aarav_w3"}', now() - interval '7 days'),
('e1111111-1111-1111-1111-1111111111a6', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '/home', '{"session_id":"sess_aarav_w3", "duration_seconds":"900"}', now() - interval '7 days' + interval '15 minutes'),
('e2222222-2222-2222-2222-2222222222a5', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '/home', '{"session_id":"sess_sarah_w3"}', now() - interval '4 days'),
('e2222222-2222-2222-2222-2222222222a6', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '/home', '{"session_id":"sess_sarah_w3", "duration_seconds":"1800"}', now() - interval '4 days' + interval '30 minutes'),

-- Week 4 retention entries
('e1111111-1111-1111-1111-1111111111a7', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_start', '/home', '{"session_id":"sess_aarav_w4"}', now() - interval '1 day'),
('e1111111-1111-1111-1111-1111111111a8', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'session_end', '/home', '{"session_id":"sess_aarav_w4", "duration_seconds":"2700"}', now() - interval '1 day' + interval '45 minutes'),
('e2222222-2222-2222-2222-2222222222a7', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_start', '/home', '{"session_id":"sess_sarah_w4"}', now() - interval '2 hours'),
('e2222222-2222-2222-2222-2222222222a8', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'session_end', '/home', '{"session_id":"sess_sarah_w4", "duration_seconds":"3600"}', now() - interval '2 hours' + interval '1 hour');

-- 9. RE-DEPLOY ADMIN ANALYTICS TRIGGER FOR LIVE UPDATES (Optional / Helper)
-- Force Schema Cache reload
NOTIFY pgrst, 'reload schema';
