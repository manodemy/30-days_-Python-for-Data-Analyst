-- Migration: 048_add_batch_id_to_orders_and_enrollments.sql
-- Description: Add batch_id to orders and enrollments tables to track student cohort preferences.

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES public.batches(id);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES public.batches(id);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
