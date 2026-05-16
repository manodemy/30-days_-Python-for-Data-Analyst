-- 019_enable_audit_triggers.sql
-- Enable audit triggers for settings and coupons to populate the Admin Dashboard audit logs.

-- 1. Ensure the audit trigger function is up to date and uses auth.uid()
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO admin_audit_log (admin_id, action, table_name, changed_data, created_at)
    VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, jsonb_build_object('new', row_to_json(NEW)), now());
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO admin_audit_log (admin_id, action, table_name, changed_data, created_at)
    VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)), now());
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO admin_audit_log (admin_id, action, table_name, changed_data, created_at)
    VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, jsonb_build_object('old', row_to_json(OLD)), now());
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Attach audit triggers to coupons
DROP TRIGGER IF EXISTS audit_coupons ON public.coupons;
CREATE TRIGGER audit_coupons
AFTER INSERT OR UPDATE OR DELETE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- 3. Attach audit triggers to settings (Crucial for Pricing Change Log)
DROP TRIGGER IF EXISTS audit_settings ON public.settings;
CREATE TRIGGER audit_settings
AFTER INSERT OR UPDATE OR DELETE ON public.settings
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- 4. Reload schema cache
NOTIFY pgrst, 'reload schema';
