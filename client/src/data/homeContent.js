/** Curated mock pieces for homepage — aligns with API product shape for easy swap later. */

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=80`;

export const featuredCategories = [
  {
    key: 'jerseys',
    label: 'Jerseys',
    tagline: 'Retro kits & matchwear',
    to: '/shop?category=jerseys',
    image: u('photo-1579952363873-27f3bade9f55'),
  },
  {
    key: 't-shirts',
    label: 'T-Shirts',
    tagline: 'Graphics & oversized',
    to: '/shop?category=t-shirts',
    image: u('photo-1521572163474-6864f9cf17ab'),
  },
  {
    key: 'jackets',
    label: 'Jackets',
    tagline: 'Shells & track tops',
    to: '/shop?category=jackets',
    image: u('photo-1551028719-00167b16eac5'),
  },
  {
    key: 'vintage',
    label: 'Vintage',
    tagline: 'One-of-one finds',
    to: '/shop?category=vintage',
    image: u('photo-1445205170230-053b83016050'),
  },
];

export const newDrops = [
  {
    id: 'nd-1',
    title: 'Retro Football Jersey — Navy',
    slug: 'retro-football-jersey-navy',
    category: 'Jerseys',
    price: 8490,
    badge: 'new',
    status: 'available',
    image_url: u('photo-1579952363873-27f3bade9f55', 800),
  },
  {
    id: 'nd-2',
    title: 'Vintage Nike Windbreaker',
    slug: 'vintage-nike-windbreaker',
    category: 'Jackets',
    price: 11200,
    badge: 'limited',
    status: 'available',
    image_url: u('photo-1544022613-e87ca75a784a', 800),
  },
  {
    id: 'nd-3',
    title: 'Oversized Graphic Tee',
    slug: 'oversized-graphic-tee',
    category: 'T-Shirts',
    price: 4250,
    badge: 'new',
    status: 'available',
    image_url: u('photo-1576566588028-4147f3842f27', 800),
  },
  {
    id: 'nd-4',
    title: 'Classic Track Jacket',
    slug: 'classic-track-jacket',
    category: 'Jackets',
    price: 9650,
    badge: 'sold_out',
    status: 'sold',
    image_url: u('photo-1591047139829-d91aecb6caea', 800),
  },
];

export const trendingProducts = [
  {
    id: 'tr-1',
    title: 'Stüssy-Style Hoodie',
    slug: 'stussy-style-hoodie',
    category: 'T-Shirts',
    price: 7890,
    badge: 'limited',
    status: 'available',
    image_url: u('photo-1556821840-3a63f95609a7', 800),
  },
  {
    id: 'tr-2',
    title: 'Carpenter Denim Pants',
    slug: 'carpenter-denim-pants',
    category: 'Vintage',
    price: 6750,
    badge: null,
    status: 'available',
    image_url: u('photo-1542272604-787c3835535d', 800),
  },
  {
    id: 'tr-3',
    title: '90s Sports Jersey',
    slug: '90s-sports-jersey',
    category: 'Jerseys',
    price: 9200,
    badge: 'new',
    status: 'available',
    image_url: u('photo-1461896836934-ffe607ba8211', 800),
  },
  {
    id: 'tr-4',
    title: 'Vintage Leather Jacket',
    slug: 'vintage-leather-jacket',
    category: 'Jackets',
    price: 18500,
    badge: 'limited',
    status: 'available',
    image_url: u('photo-1551028719-00167b16eac5', 800),
  },
];

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
    body: 'NayaPay, bank transfer, and vetted local rails — checkout built for Pakistan.',
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
    quote: 'Jersey was deadstock quality. Packaging felt premium — not your usual IG seller vibe.',
    name: 'Hassan R.',
    city: 'Karachi',
    rating: 5,
  },
  {
    quote: 'Finally a store that looks legit. Tracking comms were clear and the fit is exactly as described.',
    name: 'Ayesha M.',
    city: 'Lahore',
    rating: 5,
  },
  {
    quote: 'Copped a windbreaker I had been hunting for months. ThriftVerse is now my first stop.',
    name: 'Bilal K.',
    city: 'Islamabad',
    rating: 5,
  },
];

export const instagramTiles = [
  u('photo-1523381210434-271e8be1f52b', 600),
  u('photo-1503341504253-dff4815485f1', 600),
  u('photo-1441986300917-64674bd600d8', 600),
  u('photo-1434389677669-e08b4cac3105', 600),
  u('photo-1483985988355-763728e1935b', 600),
  u('photo-1496747611176-843222e1e57c', 600),
];
