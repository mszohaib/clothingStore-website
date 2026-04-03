import {
  getLocalCatalogApiSlugCandidates,
  mergeLocalCatalogIntoProduct,
  mergeShopCatalogWithLocalProducts,
  sortMergedShopProducts,
  tryLocalCatalogProductBySlug,
} from '../data/localCatalogProducts.js';
import { apiGet } from './api.js';

/** Must match server `productService` cap (`Math.min(100, …)`). */
const SHOP_FETCH_LIMIT = 100;

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
 * Shop list: fetch a wide page from the API (same filters/sort as the server), merge in the 8
 * canonical local SKUs (injecting any missing slug that passes filters), re-sort like the server,
 * then paginate in the client so locals are never dropped from the grid.
 *
 * Catalogs with more than {@link SHOP_FETCH_LIMIT} rows may omit tail products until the server
 * raises the limit.
 *
 * @param {Record<string, string | number | boolean | undefined | null>} params
 * @returns {Promise<{ data: object[], meta: { page, limit, total, totalPages } }>}
 */
export async function fetchProducts(params = {}) {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(SHOP_FETCH_LIMIT, Number(params.limit) || 48));

  const fetchParams = {
    ...params,
    page: 1,
    limit: SHOP_FETCH_LIMIT,
  };

  const data = await apiGet(`/products${toQuery(fetchParams)}`);
  let combined = mergeShopCatalogWithLocalProducts(data.data, params);
  combined = sortMergedShopProducts(combined, params.sort);

  const total = combined.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = (page - 1) * limit;
  const slice = combined.slice(from, from + limit);

  return {
    data: slice,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/**
 * @param {string} slug
 * @returns {Promise<object>}
 */
export async function fetchProductBySlug(slug) {
  const s = slug?.trim();
  if (!s) {
    const err = new Error('Missing product slug');
    err.status = 400;
    throw err;
  }

  let lastErr;
  for (const candidate of getLocalCatalogApiSlugCandidates(s)) {
    try {
      const product = await apiGet(`/products/${encodeURIComponent(candidate)}`);
      return mergeLocalCatalogIntoProduct(product);
    } catch (e) {
      lastErr = e;
      if (e.status !== 404) throw e;
    }
  }

  const localOnly = tryLocalCatalogProductBySlug(s);
  if (localOnly) return localOnly;

  const err = new Error(lastErr?.message || 'Product not found');
  err.status = 404;
  throw err;
}
