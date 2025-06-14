
-- Create table to store CRM profiles for leads
CREATE TABLE public.crm_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid, -- For linking to authenticated users in the future
  name text,
  email text,
  business_name text,
  industry text,
  pain_points text[],
  current_tools text[],
  desired_outcomes text[],
  workflow_stage text,
  ai_stack text[],
  keywords text[],
  last_session timestamp with time zone,
  report_generated boolean DEFAULT false,
  newsletter_opt_in boolean DEFAULT false,
  tags text[],
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add a unique constraint on email to avoid duplicate profiles
CREATE UNIQUE INDEX IF NOT EXISTS crm_profiles_email_key ON public.crm_profiles (lower(email)) WHERE email IS NOT NULL AND email <> '';

-- Enable Row Level Security on the table
ALTER TABLE public.crm_profiles ENABLE ROW LEVEL SECURITY;

-- Note: No data access policies are being created.
-- Data will be inserted via a secure edge function using a privileged key,
-- which is a standard practice for handling public form submissions securely.

-- Add comments for database clarity
COMMENT ON TABLE public.crm_profiles IS 'Stores CRM profiles for new leads, captured from contact forms or agent chats.';
COMMENT ON COLUMN public.crm_profiles.user_id IS 'Link to the auth.users table if the lead is a registered user.';
COMMENT ON COLUMN public.crm_profiles.pain_points IS 'Business challenges reported by the lead (comma-separated).';
COMMENT ON COLUMN public.crm_profiles.current_tools IS 'Software/tools the lead currently uses (comma-separated).';
COMMENT ON COLUMN public.crm_profiles.desired_outcomes IS 'What the lead wants to achieve (comma-separated).';
COMMENT ON COLUMN public.crm_profiles.workflow_stage IS 'Lead''s current stage in their business process (e.g., Idea, MVP, Scaling).';
COMMENT ON COLUMN public.crm_profiles.keywords IS 'Keywords automatically extracted from chat sessions.';
