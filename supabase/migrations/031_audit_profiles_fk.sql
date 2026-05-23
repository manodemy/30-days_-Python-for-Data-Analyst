-- ============================================================================
-- 031_audit_profiles_fk.sql
--
-- Adds a foreign key constraint between public.admin_audit_log and public.profiles.
-- This allows PostgREST (Supabase JS client) to perform joins like:
--   sb.from('admin_audit_log').select('..., profiles(email)')
--
-- ============================================================================

-- 1. Set any orphaned admin_id (which doesn't exist in public.profiles) to NULL
--    to prevent foreign key constraint violations on legacy logs.
UPDATE public.admin_audit_log
SET admin_id = NULL
WHERE admin_id IS NOT NULL
  AND admin_id NOT IN (SELECT id FROM public.profiles);

-- 2. Drop existing constraint if it exists, and recreate it referencing public.profiles
ALTER TABLE public.admin_audit_log
  DROP CONSTRAINT IF EXISTS fk_admin_audit_log_profiles;

ALTER TABLE public.admin_audit_log
  ADD CONSTRAINT fk_admin_audit_log_profiles
  FOREIGN KEY (admin_id)
  REFERENCES public.profiles(id)
  ON DELETE SET NULL;
