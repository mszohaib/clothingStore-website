import { applyLocalProductMedia } from '../data/localCatalogProducts.js';
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
export async function fetchProducts(params = {}) {
  const data = await apiGet(`/products${toQuery(params)}`);
  return {
    ...data,
    data: (data.data || []).map(applyLocalProductMedia),
  };
}

/**
 * @param {string} slug
 * @returns {Promise<object>}
 */
export async function fetchProductBySlug(slug) {
  const product = await apiGet(`/products/${encodeURIComponent(slug)}`);
  return applyLocalProductMedia(product);
}
