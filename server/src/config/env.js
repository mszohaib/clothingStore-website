function required(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

/** Comma-separated list, e.g. https://app.vercel.app,http://localhost:5173 */
export function getAllowedOrigins() {
  const raw = process.env.FRONTEND_URL || 'http://localhost:5173';
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '5000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};

export function assertSupabaseConfig() {
  required('SUPABASE_URL');
  required('SUPABASE_SERVICE_ROLE_KEY');
  required('SUPABASE_ANON_KEY');
}
