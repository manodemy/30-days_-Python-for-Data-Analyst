-- ═══════════════════════════════════════════════════════════════
-- Migration: 037_cryptographic_grading.sql
-- Description: Creates the grading_rubrics table, seeds Day 03 questions,
--              activates pgcrypto, configures a default secret setting,
--              and secures activity_logs inserts with an HMAC signature check.
-- ═══════════════════════════════════════════════════════════════

-- 1. Create the grading_rubrics table
CREATE TABLE IF NOT EXISTS public.grading_rubrics (
    day_id TEXT NOT NULL,
    cell_id TEXT NOT NULL,
    question_text TEXT,
    expected_output TEXT,
    regex_pattern TEXT,
    marks INTEGER DEFAULT 10,
    ignore_tokens TEXT[] DEFAULT '{}',
    required_patterns TEXT[] DEFAULT '{}',
    penalty_rules JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (day_id, cell_id)
);

-- 2. Enable Row Level Security (RLS) on grading_rubrics
-- Note: We do not add any SELECT policies for authenticated or anon roles.
-- This keeps the grading criteria strictly private to Deno Edge Functions (running with service_role bypass).
ALTER TABLE public.grading_rubrics ENABLE ROW LEVEL SECURITY;

-- 3. Seed Day 03 questions into the rubrics table
INSERT INTO public.grading_rubrics (day_id, cell_id, question_text, expected_output, regex_pattern, marks, ignore_tokens)
VALUES 
('day03', 'cell-1', 'Create strings using all 4 methods: single quotes, double quotes, triple quotes, and raw string. Print each with its type() and len().', '<class ''str''>', NULL, 10, '{}'),
('day03', 'cell-2', 'Write a string containing: a newline, a tab, and a backslash. Print it and then print its repr() to see the escape characters.', 'repr', NULL, 10, '{}'),
('day03', 'cell-3', 'Prove string immutability: create s = "hello", save id(s), then do s += " world". Compare the IDs. What does this prove?', 'id', NULL, 10, '{}'),
('day03', 'cell-4', 'Create a raw string for the Windows path C:\Users\Admin\Documents\data.csv. Then create the same path using escape characters. Verify they are equal.', 'true', NULL, 10, '{}'),
('day03', 'cell-5', 'Write a multi-line SQL query using triple quotes: SELECT name, age FROM users WHERE age > 18 ORDER BY name. Print it.', 'select', NULL, 10, '{}')
ON CONFLICT (day_id, cell_id) DO UPDATE 
SET question_text = EXCLUDED.question_text,
    expected_output = EXCLUDED.expected_output;

-- 4. Enable cryptographic extension pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 5. Configure private table and SECURITY DEFINER function to store HMAC secret securely without ALTER DATABASE privileges
CREATE SCHEMA IF NOT EXISTS private;

CREATE TABLE IF NOT EXISTS private.grading_secrets (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Insert fallback development secret (In production, replace this string value)
INSERT INTO private.grading_secrets (key, value)
VALUES ('hmac_secret', 'fallback_development_secret_only_for_testing_purposes')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enable RLS on secrets
ALTER TABLE private.grading_secrets ENABLE ROW LEVEL SECURITY;

-- Create get_hmac_secret SECURITY DEFINER function
CREATE OR REPLACE FUNCTION public.get_hmac_secret()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    secret_val TEXT;
BEGIN
    SELECT value INTO secret_val FROM private.grading_secrets WHERE key = 'hmac_secret';
    RETURN COALESCE(secret_val, 'fallback_development_secret_only_for_testing_purposes');
END;
$$;

-- 6. Re-create the public_insert_activity_logs policy to enforce HMAC checks on score updates
DROP POLICY IF EXISTS public_insert_activity_logs ON public.activity_logs;

CREATE POLICY public_insert_activity_logs ON public.activity_logs
  FOR INSERT WITH CHECK (
    -- Allow normal logs to pass without signature verification
    (event_type != 'question_solved') OR 
    (
      -- Restrict 'question_solved' events to authenticated users inserting their own user ID
      auth.uid() = user_id AND
      (metadata->>'signature') IS NOT NULL AND
      (metadata->>'timestamp') IS NOT NULL AND
      (metadata->>'day_id') IS NOT NULL AND
      (metadata->>'question_id') IS NOT NULL AND
      -- Calculate & verify the HMAC signature matches the server-generated token
      (metadata->>'signature') = encode(
        hmac(
          user_id::text || ':' || (metadata->>'day_id') || ':' || (metadata->>'question_id') || ':' || (metadata->>'timestamp'),
          public.get_hmac_secret(),
          'sha256'
        ),
        'hex'
      ) AND
      -- Mitigate replay attacks by ensuring the payload's timestamp is fresh (within 5 minutes of server time)
      to_timestamp((metadata->>'timestamp')::double precision / 1000.0) >= now() - interval '5 minutes' AND
      to_timestamp((metadata->>'timestamp')::double precision / 1000.0) <= now() + interval '5 minutes'
    )
  );
