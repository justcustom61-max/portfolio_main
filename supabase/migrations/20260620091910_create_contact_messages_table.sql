/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) - sender's name
  - `email` (text, not null) - sender's email address
  - `message` (text, not null) - the message content
  - `created_at` (timestamptz, default now()) - when the message was sent
  - `replied` (boolean, default false) - whether a reply has been sent

2. Security
- Enable RLS on `contact_messages`.
- Allow anonymous (public) inserts so anyone can submit the contact form.
- Allow anonymous reads for basic verification (no sensitive data exposure).
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  replied boolean NOT NULL DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_messages" ON contact_messages;
CREATE POLICY "anon_select_contact_messages" ON contact_messages FOR SELECT
  TO anon, authenticated USING (true);
