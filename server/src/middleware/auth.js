import { getSupabaseAnon } from '../config/supabaseAnon.js';
import { getSupabaseAdmin } from '../config/supabaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function extractBearer(req) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return null;
  return h.slice(7).trim() || null;
}

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = extractBearer(req);
  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  const supabase = getSupabaseAnon();
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new ApiError(401, 'Invalid or expired session');
  }

  req.user = user;
  req.accessToken = token;
  next();
});

export const requireAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user?.id) {
    throw new ApiError(401, 'Authentication required');
  }

  const admin = getSupabaseAdmin();
  const { data: profile, error } = await admin
    .from('profiles')
    .select('id, role, email, full_name')
    .eq('id', req.user.id)
    .single();

  if (error || !profile) {
    throw new ApiError(403, 'Profile not found');
  }

  if (profile.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  req.profile = profile;
  next();
});
