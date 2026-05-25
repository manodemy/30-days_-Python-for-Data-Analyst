-- ═══════════════════════════════════════════════════════════════
-- MANODEMY — Fix reviews.title nullable constraint
-- Early migration 022_reviews_schema.sql created title TEXT NOT NULL,
-- but the JS submit payload does not include a title field.
-- This makes the column nullable to match the current app code.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.reviews ALTER COLUMN title DROP NOT NULL;
