import { getSupabaseAnon } from '../config/supabaseAnon.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function extractBearer(req) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return null;
  return h.slice(7).trim() || null;
}

/** Sets req.user when a valid Bearer token is sent; otherwise continues without user. */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = extractBearer(req);
  if (!token) {
    return next();
  }

  const supabase = getSupabaseAnon();
  const { data: { user } } = await supabase.auth.getUser(token);

  if (user) {
    req.user = user;
    req.accessToken = token;
  }

  next();
});
