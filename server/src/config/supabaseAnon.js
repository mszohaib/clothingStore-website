import { createClient } from '@supabase/supabase-js';
import { env, assertSupabaseConfig } from './env.js';

let _anon;

/** Supabase client with anon key — used to verify JWTs (getUser). */
export function getSupabaseAnon() {
  if (!_anon) {
    assertSupabaseConfig();
    _anon = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _anon;
}
