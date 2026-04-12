/** Curated mock pieces for homepage — aligns with API product shape for easy swap later. */

import { homeNewDrops, localCategoryHeroImages } from './localCatalogProducts.js';

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=80`;

export const featuredCategories = [
  {
    key: 'jerseys',
    label: 'Jerseys',
    tagline: 'Retro kits & matchwear',
    to: '/shop?category=jerseys',
    image: localCategoryHeroImages.jerseys,
  },
  {
    key: 't-shirts',
    label: 'T-Shirts',
    tagline: 'Graphics & oversized',
    to: '/shop?category=t-shirts',
    image: localCategoryHeroImages.tShirts,
  },
  {
    key: 'jackets',
    label: 'Jackets',
    tagline: 'Shells & track tops',
    to: '/shop?category=jackets',
    image: localCategoryHeroImages.jackets,
  },
  {
    key: 'vintage',
    label: 'Vintage',
    tagline: 'One-of-one finds',
    to: '/shop?category=vintage',
    image: localCategoryHeroImages.vintage,
  },
];

/** All eight in-store photos (see `localCatalogProducts.js`). Trending uses live API in `TrendingSection.jsx`. */
export const newDrops = homeNewDrops;

export const whyUsItems = [
  {
    title: '100% Original',
    body: 'Authenticated pieces — no mystery batches. What you see is what you get.',
    icon: 'shield',
  },
  {
    title: 'Curated Selection',
    body: 'Small drops, tight edit. Streetwear and vintage sportswear picked for the culture.',
    icon: 'sparkles',
  },
  {
    title: 'Trusted Payment',
    body: 'Checkout supports bank transfer, mobile wallets, and card follow-up where offered — transparent steps after you place your order.',
    icon: 'wallet',
  },
  {
    title: 'Fast Shipping',
    body: 'Dispatched with care. Most orders ship within 4–5 business days nationwide.',
    icon: 'truck',
  },
];

export const testimonials = [
  {
    quote: 'Jersey was deadstock quality. Packaging felt premium — not your usual resale-app roulette.',
    name: 'Hassan R.',
    city: 'Austin',
    rating: 5,
  },
  {
    quote: 'Finally a store that looks legit. Tracking comms were clear and the fit is exactly as described.',
    name: 'Ayesha M.',
    city: 'Denver',
    rating: 5,
  },
  {
    quote: 'Copped a windbreaker I had been hunting for months. This shop is now my first stop.',
    name: 'Bilal K.',
    city: 'Portland',
    rating: 5,
  },
];

export const lookbookTiles = [
  u('photo-1523381210434-271e8be1f52b', 600),
  u('photo-1503341504253-dff4815485f1', 600),
  u('photo-1441986300917-64674bd600d8', 600),
  u('photo-1434389677669-e08b4cac3105', 600),
  u('photo-1483985988355-763728e1935b', 600),
  u('photo-1496747611176-843222e1e57c', 600),
];
