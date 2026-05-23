-- ═══════════════════════════════════════════════════════════════
-- MANODEMY V2 — DUMMY SEED DATA CLEANUP UTILITY
-- Run this in your V2 Supabase Dashboard SQL Editor (New Query)
-- to completely erase all dummy student mock records, page views, and
-- transactional tables before running the actual V1-to-V2 migration.
-- Keeps your dummy reviews seeding safely untouched!
-- ═══════════════════════════════════════════════════════════════

-- 1. DELETE MOCK ACTIVITY LOGS
DELETE FROM public.activity_logs WHERE id IN (
  'e1111111-1111-1111-1111-1111111111a1',
  'e1111111-1111-1111-1111-1111111111a2',
  'e2222222-2222-2222-2222-2222222222a1',
  'e2222222-2222-2222-2222-2222222222a2',
  'e1111111-1111-1111-1111-1111111111a3',
  'e1111111-1111-1111-1111-1111111111a4',
  'e2222222-2222-2222-2222-2222222222a3',
  'e2222222-2222-2222-2222-2222222222a4',
  'e1111111-1111-1111-1111-1111111111a5',
  'e1111111-1111-1111-1111-1111111111a6',
  'e2222222-2222-2222-2222-2222222222a5',
  'e2222222-2222-2222-2222-2222222222a6',
  'e1111111-1111-1111-1111-1111111111a7',
  'e1111111-1111-1111-1111-1111111111a8',
  'e2222222-2222-2222-2222-2222222222a7',
  'e2222222-2222-2222-2222-2222222222a8'
);

-- 2. DELETE MOCK PAGE VIEWS
DELETE FROM public.page_views WHERE session_id IN (
  'sess_aarav', 'sess_sarah', 'sess_chloe', 
  'sess_drop1', 'sess_drop2', 'sess_drop3', 'sess_drop4', 'sess_drop5', 
  'sess_drop6', 'sess_drop7', 'sess_drop8', 'sess_drop9', 'sess_drop0',
  'sess_drop_p1', 'sess_drop_p2', 'sess_drop_p3', 'sess_drop_p4', 'sess_drop_p5', 'sess_drop_p6',
  'sess_drop_c1', 'sess_drop_c2', 'sess_drop_c3'
);

-- 3. DELETE MOCK ENROLLMENTS
DELETE FROM public.enrollments WHERE user_id IN (
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e',
  'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  'f67a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
  '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f'
);

-- 4. DELETE MOCK PAYMENTS
DELETE FROM public.payments WHERE id IN (
  'e0111111-1111-1111-1111-111111111111',
  'e0222222-2222-2222-2222-222222222222',
  'e0333333-3333-3333-3333-333333333333',
  'e0444444-4444-4444-4444-444444444444',
  'e0555555-5555-5555-5555-555555555555',
  'e0666666-6666-6666-6666-666666666666',
  'e0777777-7777-7777-7777-777777777777',
  'e0888888-8888-8888-8888-888888888888',
  'e0999999-9999-9999-9999-999999999999',
  'e0000000-0000-0000-0000-000000000000',
  'e0aaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
);

-- 5. DELETE MOCK ORDERS
DELETE FROM public.orders WHERE id IN (
  'd0111111-1111-1111-1111-111111111111',
  'd0222222-2222-2222-2222-222222222222',
  'd0333333-3333-3333-3333-333333333333',
  'd0444444-4444-4444-4444-444444444444',
  'd0555555-5555-5555-5555-555555555555',
  'd0666666-6666-6666-6666-666666666666',
  'd0777777-7777-7777-7777-777777777777',
  'd0888888-8888-8888-8888-888888888888',
  'd0999999-9999-9999-9999-999999999999',
  'd0000000-0000-0000-0000-000000000000',
  'd0aaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
);

-- 6. DELETE MOCK PURCHASES
DELETE FROM public.purchases WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
  '88888888-8888-8888-8888-888888888888',
  '99999999-9999-9999-9999-999999999999',
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
);

-- 7. DELETE MOCK PROFILES
DELETE FROM public.profiles WHERE id IN (
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

-- 8. DELETE MOCK USERS FROM AUTH SYSTEM
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

-- Force schema reload to commit cache instantly
NOTIFY pgrst, 'reload schema';
