-- ═══════════════════════════════════════════════════════════════
-- Migration 049: Instructor Profiles & Dynamic Batches
-- Transforms hardcoded Live Class batches into a dynamic,
-- instructor-driven system with full profile management.
-- ═══════════════════════════════════════════════════════════════

-- 1. INSTRUCTOR PROFILES
-- Extends a user with instructor-specific data (photo, bio, etc.)
CREATE TABLE IF NOT EXISTS public.instructor_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  specialization TEXT DEFAULT 'Data Analytics',
  social_links JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.instructor_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read public instructor profiles (landing page needs this)
CREATE POLICY "Anyone can read public instructors"
  ON public.instructor_profiles FOR SELECT
  USING (is_public = true);

-- Instructors can read their own profile (even if private)
CREATE POLICY "Instructors can read own profile"
  ON public.instructor_profiles FOR SELECT
  USING (auth.uid() = id);

-- Instructors can insert their own profile
CREATE POLICY "Instructors can insert own profile"
  ON public.instructor_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('instructor', 'admin')
    )
  );

-- Instructors can update their own profile
CREATE POLICY "Instructors can update own profile"
  ON public.instructor_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role + admins can do everything
CREATE POLICY "Service role full access on instructor_profiles"
  ON public.instructor_profiles FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access on instructor_profiles"
  ON public.instructor_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 2. BATCHES
-- Each batch is created by an instructor with a schedule, meet link, etc.
CREATE TABLE IF NOT EXISTS public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES public.instructor_profiles(id) ON DELETE CASCADE,
  batch_name TEXT NOT NULL,
  batch_slug TEXT UNIQUE NOT NULL,
  description TEXT,
  schedule_type TEXT NOT NULL DEFAULT 'daily'
    CHECK (schedule_type IN ('daily', 'weekdays', 'weekends', 'custom')),
  schedule_days INTEGER[] DEFAULT '{0,1,2,3,4,5,6}',
  start_time TIME NOT NULL DEFAULT '19:30:00',
  end_time TIME NOT NULL DEFAULT '20:30:00',
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  meet_link TEXT,
  max_students INTEGER,
  current_students INTEGER DEFAULT 0,
  batch_type TEXT NOT NULL DEFAULT 'paid'
    CHECK (batch_type IN ('paid', 'free_demo')),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'upcoming', 'archived')),
  start_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Anyone can read active/upcoming batches (landing page)
CREATE POLICY "Anyone can read active batches"
  ON public.batches FOR SELECT
  USING (status IN ('active', 'upcoming'));

-- Instructors can manage their own batches
CREATE POLICY "Instructors can insert own batches"
  ON public.batches FOR INSERT
  WITH CHECK (
    auth.uid() = instructor_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update own batches"
  ON public.batches FOR UPDATE
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- Service role + admins full access
CREATE POLICY "Service role full access on batches"
  ON public.batches FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access on batches"
  ON public.batches FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 3. ADD 'instructor' TO PROFILES ROLE
-- The existing role column accepts any TEXT. We just need to ensure
-- the is_admin() and future is_instructor() functions recognize it.

CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('instructor', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 4. RPC: get_public_batches()
-- Returns all active/upcoming batches with instructor profile data joined.
-- Used by the landing page to dynamically render batch cards.
CREATE OR REPLACE FUNCTION public.get_public_batches()
RETURNS TABLE (
  batch_id UUID,
  batch_name TEXT,
  batch_slug TEXT,
  description TEXT,
  schedule_type TEXT,
  schedule_days INTEGER[],
  start_time TIME,
  end_time TIME,
  timezone TEXT,
  meet_link TEXT,
  max_students INTEGER,
  current_students INTEGER,
  batch_type TEXT,
  status TEXT,
  start_date DATE,
  batch_created_at TIMESTAMPTZ,
  instructor_id UUID,
  instructor_name TEXT,
  instructor_bio TEXT,
  instructor_avatar TEXT,
  instructor_specialization TEXT,
  instructor_social JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id AS batch_id,
    b.batch_name,
    b.batch_slug,
    b.description,
    b.schedule_type,
    b.schedule_days,
    b.start_time,
    b.end_time,
    b.timezone,
    b.meet_link,
    b.max_students,
    b.current_students,
    b.batch_type,
    b.status,
    b.start_date,
    b.created_at AS batch_created_at,
    ip.id AS instructor_id,
    ip.display_name AS instructor_name,
    ip.bio AS instructor_bio,
    ip.avatar_url AS instructor_avatar,
    ip.specialization AS instructor_specialization,
    ip.social_links AS instructor_social
  FROM public.batches b
  INNER JOIN public.instructor_profiles ip ON b.instructor_id = ip.id
  WHERE b.status IN ('active', 'upcoming')
    AND ip.is_public = true
  ORDER BY
    CASE b.batch_type WHEN 'free_demo' THEN 0 ELSE 1 END,
    b.start_time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 5. RPC: get_instructor_batches()
-- Returns all batches for the currently authenticated instructor.
CREATE OR REPLACE FUNCTION public.get_instructor_batches()
RETURNS TABLE (
  batch_id UUID,
  batch_name TEXT,
  batch_slug TEXT,
  description TEXT,
  schedule_type TEXT,
  schedule_days INTEGER[],
  start_time TIME,
  end_time TIME,
  timezone TEXT,
  meet_link TEXT,
  max_students INTEGER,
  current_students INTEGER,
  batch_type TEXT,
  status TEXT,
  start_date DATE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id AS batch_id,
    b.batch_name,
    b.batch_slug,
    b.description,
    b.schedule_type,
    b.schedule_days,
    b.start_time,
    b.end_time,
    b.timezone,
    b.meet_link,
    b.max_students,
    b.current_students,
    b.batch_type,
    b.status,
    b.start_date,
    b.created_at,
    b.updated_at
  FROM public.batches b
  WHERE b.instructor_id = auth.uid()
  ORDER BY
    CASE b.status WHEN 'active' THEN 0 WHEN 'upcoming' THEN 1 ELSE 2 END,
    b.start_time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 6. INDEXES
CREATE INDEX IF NOT EXISTS idx_batches_instructor ON public.batches(instructor_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON public.batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_slug ON public.batches(batch_slug);
CREATE INDEX IF NOT EXISTS idx_instructor_profiles_public ON public.instructor_profiles(is_public);


-- 7. UPDATED_AT TRIGGER
-- Auto-update the updated_at column on row modification
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_instructor_profiles ON public.instructor_profiles;
CREATE TRIGGER set_updated_at_instructor_profiles
  BEFORE UPDATE ON public.instructor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_batches ON public.batches;
CREATE TRIGGER set_updated_at_batches
  BEFORE UPDATE ON public.batches
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();


-- 8. STORAGE BUCKET FOR INSTRUCTOR AVATARS
-- Note: This must also be created from Supabase Dashboard → Storage → New Bucket
-- Name: instructor-avatars, Public: Yes
-- The insert policy below allows instructors to upload their own avatars.
-- (Storage policies are managed via Dashboard, but documented here for reference.)


-- 8.5 BATCH STUDENT COUNT SYNC TRIGGER
-- Auto-update batches.current_students count on enrollment insert, update or delete
CREATE OR REPLACE FUNCTION public.sync_batch_student_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle old batch decrement
  IF (TG_OP = 'UPDATE' OR TG_OP = 'DELETE') THEN
    IF OLD.batch_id IS NOT NULL AND (OLD.batch_id::text) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
      UPDATE public.batches
      SET current_students = COALESCE((
        SELECT COUNT(*)::INTEGER 
        FROM public.enrollments 
        WHERE batch_id = OLD.batch_id
      ), 0)
      WHERE id = OLD.batch_id::UUID;
    END IF;
  END IF;

  -- Handle new batch increment
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    IF NEW.batch_id IS NOT NULL AND (NEW.batch_id::text) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
      UPDATE public.batches
      SET current_students = COALESCE((
        SELECT COUNT(*)::INTEGER 
        FROM public.enrollments 
        WHERE batch_id = NEW.batch_id
      ), 0)
      WHERE id = NEW.batch_id::UUID;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_enrollment_batch_change ON public.enrollments;
CREATE TRIGGER on_enrollment_batch_change
  AFTER INSERT OR UPDATE OR DELETE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.sync_batch_student_count();


-- 9. Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';

