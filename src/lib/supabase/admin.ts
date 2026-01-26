import { createClient } from '@supabase/supabase-js';

// IMPORTANT: This client is for server-side use only.
// It uses the Supabase service role key and should never be exposed to the client.

// Ensure that the environment variables are set.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and service role key are required.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
