import { createClient } from '@supabase/supabase-js';
import { env, assertSupabaseConfig } from './env.js';

let _admin;

export function getSupabaseAdmin() {
  if (!_admin) {
    assertSupabaseConfig();
    _admin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
}
