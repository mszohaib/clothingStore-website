import { apiPost } from './api.js';

/**
 * @param {object} payload — matches server orderService.createOrder body
 * @param {string | null} accessToken — optional Supabase access token for user_id on order
 */
export function createOrder(payload, accessToken = null) {
  const headers = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  return apiPost('/orders', payload, { headers });
}
