/**
 * ThriftVerse — single source of truth for the 8 in-store SKUs (bundled photos + copy).
 *
 * Assets: `client/src/assets/products/*.jpg`
 * API merge: `client/src/services/productsApi.js` → mergeLocalCatalogIntoProduct()
 *
 * | # | File                                  | slug                              |
 * |---|---------------------------------------|-----------------------------------|
 * | 1 | blue-racing-jacket.jpg               | blue-racing-jacket                |
 * | 2 | yellow-check-overshirt.jpg           | yellow-check-overshirt            |
 * | 3 | japan-football-jersey.jpg            | japan-football-jersey             |
 * | 4 | nike-training-shorts.jpg             | nike-training-shorts              |
 * | 5 | barcelona-home-jersey.jpg            | barcelona-home-jersey             |
 * | 6 | pink-football-boots.jpg              | pink-football-boots               |
 * | 7 | england-home-jersey-pink.jpg         | england-home-jersey-pink          |
 * | 8 | england-home-jersey-pink-womens.jpg  | england-home-jersey-pink-womens   |
 */

import imgBlueRacingJacket from '../assets/products/blue-racing-jacket.jpg';
import imgYellowCheckOvershirt from '../assets/products/yellow-check-overshirt.jpg';
import imgJapanFootballJersey from '../assets/products/japan-football-jersey.jpg';
import imgNikeTrainingShorts from '../assets/products/nike-training-shorts.jpg';
import imgBarcelonaHomeJersey from '../assets/products/barcelona-home-jersey.jpg';
import imgPinkFootballBoots from '../assets/products/pink-football-boots.jpg';
import imgEnglandHomeJerseyPink from '../assets/products/england-home-jersey-pink.jpg';
import imgEnglandHomeJerseyPinkWomens from '../assets/products/england-home-jersey-pink-womens.jpg';

/** Bundled URL if a legacy alias ever lacks a canonical asset (should not happen). */
export const LOCAL_PRODUCT_IMAGE_FALLBACK = imgBlueRacingJacket;

/**
 * Canonical rows: align copy with `20260403140000_eight_store_products_local_images.sql` (slug `pink-football-boots` for boots).
 * @typedef {object} LocalCatalogRow
 * @property {string} sourceFile
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} categoryLabel
 * @property {number} price
 * @property {string|null} badge
 * @property {string} status
 * @property {string} imageUrl
 * @property {string} brand
 * @property {string} size
 * @property {string} condition
 * @property {string} description
 * @property {boolean} featured
 * @property {string} createdAt ISO timestamp for shop sort parity with API `created_at`
 */
export const LOCAL_STORE_PRODUCTS = [
  {
    sourceFile: 'blue-racing-jacket.jpg',
    slug: 'blue-racing-jacket',
    title: 'Blue Racing Track Jacket',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 14500,
    badge: 'limited',
    status: 'available',
    imageUrl: imgBlueRacingJacket,
    brand: 'Umbro',
    size: 'L',
    condition: 'excellent',
    description:
      'Bold cobalt shell with contrast piping — trackside or city layering. Lightweight synthetic with a clean 90s motorsport silhouette.',
    featured: false,
    createdAt: '2026-04-03T12:00:00.000Z',
  },
  {
    sourceFile: 'yellow-check-overshirt.jpg',
    slug: 'yellow-check-overshirt',
    title: 'Yellow Windowpane Overshirt',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 11800,
    badge: 'new',
    status: 'available',
    imageUrl: imgYellowCheckOvershirt,
    brand: 'Vintage',
    size: 'M',
    condition: 'excellent',
    description:
      'Heavy cotton overshirt in a vintage windowpane check. Drop-shoulder cut — ideal over hoodies or tees.',
    featured: false,
    createdAt: '2026-04-03T12:01:00.000Z',
  },
  {
    sourceFile: 'japan-football-jersey.jpg',
    slug: 'japan-football-jersey',
    title: 'Japan National Team Jersey — Away',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 13800,
    badge: 'new',
    status: 'available',
    imageUrl: imgJapanFootballJersey,
    brand: 'Adidas',
    size: 'M',
    condition: 'excellent',
    description:
      'Japan national away look in deep blue with crest detail. Fan jersey fabric — rotation-ready for match days.',
    featured: true,
    createdAt: '2026-04-03T12:02:00.000Z',
  },
  {
    sourceFile: 'nike-training-shorts.jpg',
    slug: 'nike-training-shorts',
    title: 'Nike Dri-FIT Training Shorts — Navy',
    category: 'shorts',
    categoryLabel: 'Shorts',
    price: 5600,
    badge: null,
    status: 'available',
    imageUrl: imgNikeTrainingShorts,
    brand: 'Nike',
    size: 'M',
    condition: 'good',
    description:
      'Nike training shorts in navy with classic swoosh. Elastic waist — gym sessions or summer street rotation.',
    featured: false,
    createdAt: '2026-04-03T12:03:00.000Z',
  },
  {
    sourceFile: 'barcelona-home-jersey.jpg',
    slug: 'barcelona-home-jersey',
    title: 'FC Barcelona Home Jersey',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 12900,
    badge: 'limited',
    status: 'available',
    imageUrl: imgBarcelonaHomeJersey,
    brand: 'Nike',
    size: 'L',
    condition: 'excellent',
    description:
      'Blaugrana home energy — moisture-wicking fan jersey. Deep stripes and crest for match-day or casual fits.',
    featured: true,
    createdAt: '2026-04-03T12:04:00.000Z',
  },
  {
    sourceFile: 'pink-football-boots.jpg',
    slug: 'pink-football-boots',
    title: 'Nike Phantom GX — Pink FG',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 19800,
    badge: 'limited',
    status: 'available',
    imageUrl: imgPinkFootballBoots,
    brand: 'Nike',
    size: 'UK 8',
    condition: 'excellent',
    description:
      'Statement pink firm-ground boots. Phantom-line traction plate — pitch-ready or display as a grail accessory.',
    featured: false,
    createdAt: '2026-04-03T12:05:00.000Z',
  },
  {
    sourceFile: 'england-home-jersey-pink.jpg',
    slug: 'england-home-jersey-pink',
    title: 'England Home Jersey — Pink',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 11200,
    badge: null,
    status: 'available',
    imageUrl: imgEnglandHomeJerseyPink,
    brand: 'Nike',
    size: 'L',
    condition: 'excellent',
    description:
      'England crest on a rare pink colourway. Standard men’s cut — collector-friendly national team piece.',
    featured: false,
    createdAt: '2026-04-03T12:06:00.000Z',
  },
  {
    sourceFile: 'england-home-jersey-pink-womens.jpg',
    slug: 'england-home-jersey-pink-womens',
    title: 'England Home Jersey — Women’s Pink',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 10800,
    badge: 'new',
    status: 'available',
    imageUrl: imgEnglandHomeJerseyPinkWomens,
    brand: 'Nike',
    size: 'M',
    condition: 'excellent',
    description:
      'Women’s-cut England home jersey in pink. Streamlined fit with full crest — pairs with denim or shorts.',
    featured: false,
    createdAt: '2026-04-03T12:07:00.000Z',
  },
];

const LOCAL_BY_CANONICAL_SLUG = Object.fromEntries(LOCAL_STORE_PRODUCTS.map((p) => [p.slug, p]));

/** @param {string | undefined} slug */
export function isLocalCatalogCanonicalSlug(slug) {
  return Boolean(slug && LOCAL_BY_CANONICAL_SLUG[slug]);
}

/** DB rows may still use this legacy slug; client normalizes to `pink-football-boots` after merge. */
const LEGACY_SLUG_TO_CANONICAL_SLUG = {
  'nike-football-boots-pink': 'pink-football-boots',
};

const CANONICAL_TO_LEGACY_SLUG = Object.fromEntries(
  Object.entries(LEGACY_SLUG_TO_CANONICAL_SLUG).map(([legacy, canonical]) => [canonical, legacy]),
);

/**
 * Resolve local row by API slug (canonical or legacy).
 * @param {string} slug
 * @returns {LocalCatalogRow | null}
 */
export function getLocalCatalogDefinitionByAnySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const direct = LOCAL_BY_CANONICAL_SLUG[slug];
  if (direct) return direct;
  const canonical = LEGACY_SLUG_TO_CANONICAL_SLUG[slug];
  if (canonical) return LOCAL_BY_CANONICAL_SLUG[canonical] ?? null;
  return null;
}

/** Try API in this order when the first slug 404s (boots rename). */
export function getLocalCatalogApiSlugCandidates(requestedSlug) {
  if (!requestedSlug || typeof requestedSlug !== 'string') return [];
  const s = requestedSlug.trim();
  const out = [s];
  const toLegacy = CANONICAL_TO_LEGACY_SLUG[s];
  const toCanonical = LEGACY_SLUG_TO_CANONICAL_SLUG[s];
  if (toLegacy && !out.includes(toLegacy)) out.push(toLegacy);
  if (toCanonical && !out.includes(toCanonical)) out.push(toCanonical);
  return out;
}

const CANONICAL_IMAGE_BY_SLUG = Object.fromEntries(
  LOCAL_STORE_PRODUCTS.map((p) => [p.slug, p.imageUrl]),
);

const IMAGE_URL_BY_SLUG = { ...CANONICAL_IMAGE_BY_SLUG };
for (const [legacySlug, canonicalSlug] of Object.entries(LEGACY_SLUG_TO_CANONICAL_SLUG)) {
  const resolved = CANONICAL_IMAGE_BY_SLUG[canonicalSlug];
  IMAGE_URL_BY_SLUG[legacySlug] = resolved ?? LOCAL_PRODUCT_IMAGE_FALLBACK;
}

export const LOCAL_PRODUCT_SLUGS = [
  ...LOCAL_STORE_PRODUCTS.map((p) => p.slug),
  ...Object.keys(LEGACY_SLUG_TO_CANONICAL_SLUG),
];

export const localProductImageUrls = { ...IMAGE_URL_BY_SLUG };

export const localCategoryHeroImages = {
  jerseys: imgJapanFootballJersey,
  jackets: imgBlueRacingJacket,
  tShirts: imgYellowCheckOvershirt,
  vintage: imgEnglandHomeJerseyPinkWomens,
};

/**
 * Full API-shaped product from a local row (checkout/cart need stable `slug` + `image_url` string).
 * @param {LocalCatalogRow} local
 */
export function localCatalogRowAsProduct(local) {
  return {
    id: `local-${local.slug}`,
    slug: local.slug,
    title: local.title,
    category: local.category,
    brand: local.brand,
    price: local.price,
    size: local.size,
    condition: local.condition,
    description: local.description,
    badge: local.badge,
    status: local.status,
    image_url: String(local.imageUrl),
    featured: local.featured,
    created_at: local.createdAt,
  };
}

/**
 * Overlay canonical in-store data onto an API product. Preserves `id` and API `featured` when set.
 * @param {object | null | undefined} product
 */
export function mergeLocalCatalogIntoProduct(product) {
  if (!product?.slug) return product;
  const local = getLocalCatalogDefinitionByAnySlug(product.slug);
  if (!local) return product;
  const imageUrl = String(local.imageUrl || LOCAL_PRODUCT_IMAGE_FALLBACK);
  return {
    ...product,
    slug: local.slug,
    title: local.title,
    category: local.category,
    brand: local.brand,
    price: local.price,
    size: local.size,
    condition: local.condition,
    description: local.description,
    badge: local.badge,
    status: local.status,
    image_url: imageUrl,
    featured: product.featured != null ? product.featured : local.featured,
    created_at: product.created_at ?? local.createdAt,
  };
}

/**
 * Mirrors server `productService` filters so injected locals obey the same Shop rules.
 * @param {LocalCatalogRow} local
 * @param {Record<string, string | number | boolean | undefined | null>} params
 */
export function localStoreRowMatchesShopParams(local, params) {
  const search = params.search != null && String(params.search).trim() ? String(params.search).trim() : '';
  if (search) {
    const q = search.toLowerCase();
    const hay = `${local.title} ${local.brand} ${local.description} ${local.slug}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (params.category && String(params.category) !== local.category) return false;
  const brandQ = params.brand != null && String(params.brand).trim() ? String(params.brand).trim().toLowerCase() : '';
  if (brandQ && !String(local.brand).toLowerCase().includes(brandQ)) return false;
  if (params.size && String(params.size) !== local.size) return false;
  if (params.condition && String(params.condition) !== local.condition) return false;
  if (params.status && String(params.status) !== local.status) return false;
  if (params.badge != null && String(params.badge) !== '') {
    if (String(params.badge) !== String(local.badge ?? '')) return false;
  }
  const featuredOnly =
    params.featured === 'true' || params.featured === true || params.featured === 1 || params.featured === '1';
  if (featuredOnly && !local.featured) return false;
  const minP = params.minPrice != null && params.minPrice !== '' ? Number(params.minPrice) : null;
  const maxP = params.maxPrice != null && params.maxPrice !== '' ? Number(params.maxPrice) : null;
  if (minP != null && !Number.isNaN(minP) && local.price < minP) return false;
  if (maxP != null && !Number.isNaN(maxP) && local.price > maxP) return false;
  return true;
}

function parseCreatedAt(iso) {
  if (!iso) return 0;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Same keys as `server/src/services/productService.js` SORT_MAP */
const SHOP_SORT_COMPARATORS = {
  newest: (a, b) => parseCreatedAt(b.created_at) - parseCreatedAt(a.created_at),
  oldest: (a, b) => parseCreatedAt(a.created_at) - parseCreatedAt(b.created_at),
  price_asc: (a, b) => Number(a.price) - Number(b.price),
  price_desc: (a, b) => Number(b.price) - Number(a.price),
  title_asc: (a, b) =>
    String(a.title || '').localeCompare(String(b.title || ''), undefined, { sensitivity: 'base' }),
};

/**
 * @param {object[]} rows
 * @param {string | undefined} sortParam
 * @returns {object[]}
 */
export function sortMergedShopProducts(rows, sortParam) {
  const key = sortParam && SHOP_SORT_COMPARATORS[sortParam] ? sortParam : 'newest';
  return [...rows].sort(SHOP_SORT_COMPARATORS[key]);
}

/**
 * After per-row merge/dedupe: split demo vs canonical locals, inject any missing local SKU that passes filters.
 * @param {object[]} apiRows
 * @param {Record<string, string | number | boolean | undefined | null>} params
 */
export function mergeShopCatalogWithLocalProducts(apiRows, params) {
  const rows = dedupeProductsBySlug((apiRows || []).map((p) => mergeLocalCatalogIntoProduct(p)));
  const nonLocal = [];
  const localBySlug = new Map();
  for (const p of rows) {
    if (!p?.slug) continue;
    if (isLocalCatalogCanonicalSlug(p.slug)) {
      if (!localBySlug.has(p.slug)) localBySlug.set(p.slug, p);
    } else {
      nonLocal.push(p);
    }
  }
  for (const local of LOCAL_STORE_PRODUCTS) {
    if (!localStoreRowMatchesShopParams(local, params)) continue;
    if (!localBySlug.has(local.slug)) {
      localBySlug.set(local.slug, localCatalogRowAsProduct(local));
    }
  }
  return dedupeProductsBySlug([...nonLocal, ...localBySlug.values()]);
}

/**
 * Drop duplicate rows after legacy→canonical slug normalization.
 * @param {object[]} rows
 */
export function dedupeProductsBySlug(rows) {
  const seen = new Set();
  return rows.filter((r) => {
    const s = r?.slug;
    if (!s || typeof s !== 'string') return true;
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });
}

/**
 * @param {string} slug
 * @returns {object | null}
 */
export function tryLocalCatalogProductBySlug(slug) {
  const local = getLocalCatalogDefinitionByAnySlug(slug);
  return local ? localCatalogRowAsProduct(local) : null;
}

function toHomeProductRow(p, idPrefix) {
  return {
    id: `${idPrefix}-${p.slug}`,
    title: p.title,
    slug: p.slug,
    category: p.categoryLabel,
    price: p.price,
    badge: p.badge,
    status: p.status,
    image_url: p.imageUrl,
  };
}

export const homeNewDrops = LOCAL_STORE_PRODUCTS.map((p) => toHomeProductRow(p, 'nd'));
