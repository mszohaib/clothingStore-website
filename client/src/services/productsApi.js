import { apiGet } from './api.js';

function toQuery(params) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    sp.set(key, String(value));
  });
  const q = sp.toString();
  return q ? `?${q}` : '';
}

/**
 * @param {Record<string, string | number | boolean | undefined | null>} params
 * @returns {Promise<{ data: object[], meta: { page, limit, total, totalPages } }>}
 */
export function fetchProducts(params = {}) {
  return apiGet(`/products${toQuery(params)}`);
}

/**
 * @param {string} slug
 * @returns {Promise<object>}
 */
export function fetchProductBySlug(slug) {
  return apiGet(`/products/${encodeURIComponent(slug)}`);
}
