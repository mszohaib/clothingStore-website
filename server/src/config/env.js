function required(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

const DEV_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];

/** Comma-separated list, e.g. https://app.vercel.app,http://localhost:5173 */
export function getAllowedOrigins() {
  const raw = process.env.FRONTEND_URL || 'http://localhost:5173';
  const fromEnv = raw.split(',').map((s) => s.trim()).filter(Boolean);
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    return fromEnv.length ? fromEnv : ['http://localhost:5173'];
  }
  return [...new Set([...fromEnv, ...DEV_ORIGINS])];
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
