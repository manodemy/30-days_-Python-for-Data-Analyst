-- ═══════════════════════════════════════════════════════════════
-- DYNAMIC SEED DATA: REDESIGNED PREMIUM REVIEWS
-- Run this in your Supabase SQL Editor AFTER running supabase_schema_v2.sql
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.reviews (
  reviewer_name,
  reviewer_email,
  rating,
  comment,
  pros,
  cons,
  recommend,
  is_verified,
  helpful_count,
  status
) VALUES 
(
  'Aarav Sharma',
  'aarav.sharma@gmail.com',
  5,
  'This course is an absolute masterpiece. Escaping tutorial hell was my main goal, and the interactive coding notebooks did exactly that. Every day has highly structured exercises that force you to write Pandas and Numpy code in real-time.',
  ARRAY['Active coding', 'No video bloat', 'Excellent Pandas labs'],
  ARRAY['Requires deep focus'],
  true,
  true,
  18,
  'approved'
),
(
  'Sarah Jenkins',
  'sarah.j@techcorp.com',
  5,
  'I''ve tried 4 different Python courses on Udemy and YouTube, but this is the first one that clicked. The browser-based compiler and the instant check validation are brilliant. No environment setup headaches. Highly recommend for any aspiring Data Analyst!',
  ARRAY['Instant compiler validation', 'Well-paced daily roadmap', 'Saves time'],
  ARRAY['No video lectures'],
  true,
  true,
  14,
  'approved'
),
(
  'Rohan Verma',
  'rohan.verma@outlook.com',
  4,
  'Solid curriculum. The SQL databases section and interview prep challenges in the final week were incredibly valuable. I actually used one of the SQL queries in my real job last week. Spacing could be slightly tighter on Day 12, but overall excellent value.',
  ARRAY['SQL section', 'Realistic interview prep', 'Practical challenges'],
  ARRAY['Some notebooks are quite long'],
  true,
  true,
  9,
  'approved'
),
(
  'Elena Rostova',
  'elena.rostova@datawave.io',
  5,
  'Mind-blowing experience! The XP tracking and the gamified progress system on the dashboard kept me consistently motivated. It''s rare to find a course that focuses so heavily on active muscle memory. Truly worth every single cent.',
  ARRAY['Highly gamified', 'Excellent progress tracking', 'Great layout design'],
  ARRAY['No offline mode'],
  true,
  true,
  22,
  'approved'
),
(
  'David Kim',
  'd.kim@yonsei.ac.kr',
  4,
  'Very practical. The Pandas masterclass was a game-changer. I finally understand grouping, merging, and cleaning messy data sets. The support channels are also extremely responsive when you get stuck on a difficult cell test.',
  ARRAY['Pandas masterclass', 'Excellent support', 'Messy dataset labs'],
  ARRAY['Steep learning curve on Day 15'],
  true,
  true,
  5,
  'approved'
);
