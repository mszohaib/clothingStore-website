/**
 * ThriftVerse — local product photography (explicit mapping)
 *
 * Every JPEG in `client/src/assets/products/` is imported below by exact filename.
 * DB rows: `supabase/migrations/20260403140000_eight_store_products_local_images.sql` (insert/update by slug)
 * + optional demo restore: `20260404120000_restore_demo_catalog_products.sql`.
 *
 * Also updated for homepage mock rows: `client/src/data/homeContent.js`
 * Runtime image override for API rows: `client/src/services/productsApi.js` → applyLocalProductMedia()
 *
 * | # | File (client/src/assets/products/)                         | Product slug                      |
 * |---|-------------------------------------------------------------|-----------------------------------|
 * | 1 | WhatsApp Image 2026-04-03 at 00.14.28.jpeg                  | blue-racing-jacket                |
 * | 2 | WhatsApp Image 2026-04-03 at 00.14.28 (1).jpeg              | yellow-check-overshirt            |
 * | 3 | WhatsApp Image 2026-04-03 at 00.14.29.jpeg                  | japan-football-jersey             |
 * | 4 | WhatsApp Image 2026-04-03 at 00.14.29 (1).jpeg              | nike-training-shorts              |
 * | 5 | WhatsApp Image 2026-04-03 at 00.14.29 (2).jpeg              | barcelona-home-jersey             |
 * | 6 | WhatsApp Image 2026-04-03 at 00.14.29 (3).jpeg              | nike-football-boots-pink          |
 * | 7 | WhatsApp Image 2026-04-03 at 00.14.30.jpeg                  | england-home-jersey-pink          |
 * | 8 | WhatsApp Image 2026-04-03 at 00.14.30 (1).jpeg              | england-home-jersey-pink-womens   |
 */

import productImg_00_14_28 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.28.jpeg';
import productImg_00_14_28_1 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.28 (1).jpeg';
import productImg_00_14_29 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.29.jpeg';
import productImg_00_14_29_1 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.29 (1).jpeg';
import productImg_00_14_29_2 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.29 (2).jpeg';
import productImg_00_14_29_3 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.29 (3).jpeg';
import productImg_00_14_30 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.30.jpeg';
import productImg_00_14_30_1 from '../assets/products/WhatsApp Image 2026-04-03 at 00.14.30 (1).jpeg';

/**
 * Canonical list: one entry per file in the folder (all 8). `imageUrl` is the Vite-resolved module URL.
 */
export const LOCAL_STORE_PRODUCTS = [
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.28.jpeg',
    slug: 'blue-racing-jacket',
    title: 'Blue Racing Track Jacket',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 14500,
    badge: 'limited',
    status: 'available',
    imageUrl: productImg_00_14_28,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.28 (1).jpeg',
    slug: 'yellow-check-overshirt',
    title: 'Yellow Windowpane Overshirt',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 11800,
    badge: 'new',
    status: 'available',
    imageUrl: productImg_00_14_28_1,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.29.jpeg',
    slug: 'japan-football-jersey',
    title: 'Japan National Team Jersey — Away',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 13800,
    badge: 'new',
    status: 'available',
    imageUrl: productImg_00_14_29,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.29 (1).jpeg',
    slug: 'nike-training-shorts',
    title: 'Nike Dri-FIT Training Shorts — Navy',
    category: 'shorts',
    categoryLabel: 'Shorts',
    price: 5600,
    badge: null,
    status: 'available',
    imageUrl: productImg_00_14_29_1,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.29 (2).jpeg',
    slug: 'barcelona-home-jersey',
    title: 'FC Barcelona Home Jersey',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 12900,
    badge: 'limited',
    status: 'available',
    imageUrl: productImg_00_14_29_2,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.29 (3).jpeg',
    slug: 'nike-football-boots-pink',
    title: 'Nike Phantom GX — Pink FG',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 19800,
    badge: 'limited',
    status: 'available',
    imageUrl: productImg_00_14_29_3,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.30.jpeg',
    slug: 'england-home-jersey-pink',
    title: 'England Home Jersey — Pink',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 11200,
    badge: null,
    status: 'available',
    imageUrl: productImg_00_14_30,
  },
  {
    sourceFile: 'WhatsApp Image 2026-04-03 at 00.14.30 (1).jpeg',
    slug: 'england-home-jersey-pink-womens',
    title: 'England Home Jersey — Women’s Pink',
    category: 'jerseys',
    categoryLabel: 'Jerseys',
    price: 10800,
    badge: 'new',
    status: 'available',
    imageUrl: productImg_00_14_30_1,
  },
];

/** Slug → bundled asset URL (used by productsApi applyLocalProductMedia). */
const IMAGE_URL_BY_SLUG = Object.fromEntries(
  LOCAL_STORE_PRODUCTS.map((p) => [p.slug, p.imageUrl]),
);

export const LOCAL_PRODUCT_SLUGS = LOCAL_STORE_PRODUCTS.map((p) => p.slug);

export const localProductImageUrls = { ...IMAGE_URL_BY_SLUG };

/** Category showcase tiles — picks from the same 8 files (explicit). */
export const localCategoryHeroImages = {
  jerseys: productImg_00_14_29,
  jackets: productImg_00_14_28,
  tShirts: productImg_00_14_28_1,
  vintage: productImg_00_14_30_1,
};

/**
 * @param {object | null | undefined} product
 * @returns {object | null | undefined}
 */
export function applyLocalProductMedia(product) {
  if (!product?.slug) return product;
  const url = IMAGE_URL_BY_SLUG[product.slug];
  if (!url) return product;
  return { ...product, image_url: url };
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

/** All eight in-store photos — New Drops section (same grid/scroll layout, more cards). */
export const homeNewDrops = LOCAL_STORE_PRODUCTS.map((p) => toHomeProductRow(p, 'nd'));
