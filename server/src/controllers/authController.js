import { getSupabaseAdmin } from '../config/supabaseAdmin.js';
import { getSupabaseAnon } from '../config/supabaseAnon.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function extractBearer(req) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return null;
  return h.slice(7).trim() || null;
}

export const verify = asyncHandler(async (req, res) => {
  const token = extractBearer(req);
  if (!token) {
    throw new ApiError(401, 'Bearer token required');
  }

  const anon = getSupabaseAnon();
  const { data: { user }, error: userErr } = await anon.auth.getUser(token);

  if (userErr || !user) {
    throw new ApiError(401, 'Invalid or expired session');
  }

  const admin = getSupabaseAdmin();
  const { data: profile, error: profErr } = await admin
    .from('profiles')
    .select('id, email, full_name, role, created_at')
    .eq('id', user.id)
    .maybeSingle();

  if (profErr) {
    throw new ApiError(500, 'Failed to load profile', profErr.message);
  }

  res.json({ user, profile: profile || null });
});
