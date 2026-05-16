-- fix_coupons_schema.sql
-- Make legacy columns nullable and fix constraints to allow new coupon system to work

DO $$ 
BEGIN
  -- 1. Drop the check constraint if it exists
  ALTER TABLE public.coupons DROP CONSTRAINT IF EXISTS coupons_discount_percent_check;
  
  -- 2. Make discount_percent nullable
  ALTER TABLE public.coupons ALTER COLUMN discount_percent DROP NOT NULL;
  
  -- 3. Ensure other modern columns exist (redundant but safe)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coupons' AND column_name='discount_type') THEN
    ALTER TABLE public.coupons ADD COLUMN discount_type TEXT DEFAULT 'percentage';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coupons' AND column_name='discount_value') THEN
    ALTER TABLE public.coupons ADD COLUMN discount_value NUMERIC DEFAULT 0;
  END IF;

END $$;

-- Force Schema Cache reload
NOTIFY pgrst, 'reload schema';
