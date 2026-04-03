-- Eight in-store photo SKUs (additive). Uses INSERT … ON CONFLICT so demo rows are NOT replaced.
-- Client maps these slugs to bundled assets in `client/src/data/localCatalogProducts.js`.
-- Static files: `client/public/products/*.jpeg` (optional fallback when API returns /products/… URLs).

insert into public.products (
  title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured
)
values
  (
    'Blue Racing Track Jacket',
    'blue-racing-jacket',
    'jackets',
    'Umbro',
    14500,
    'L',
    'excellent',
    'Bold cobalt shell with contrast piping — trackside or city layering. Lightweight synthetic with a clean 90s motorsport silhouette.',
    '/products/blue-racing-jacket.jpeg',
    'available',
    'limited',
    false
  ),
  (
    'Yellow Windowpane Overshirt',
    'yellow-check-overshirt',
    'jackets',
    'Vintage',
    11800,
    'M',
    'excellent',
    'Heavy cotton overshirt in a vintage windowpane check. Drop-shoulder cut — ideal over hoodies or tees.',
    '/products/yellow-check-overshirt.jpeg',
    'available',
    'new',
    false
  ),
  (
    'Japan National Team Jersey — Away',
    'japan-football-jersey',
    'jerseys',
    'Adidas',
    13800,
    'M',
    'excellent',
    'Japan national away look in deep blue with crest detail. Fan jersey fabric — rotation-ready for match days.',
    '/products/japan-football-jersey.jpeg',
    'available',
    'new',
    true
  ),
  (
    'Nike Dri-FIT Training Shorts — Navy',
    'nike-training-shorts',
    'shorts',
    'Nike',
    5600,
    'M',
    'good',
    'Nike training shorts in navy with classic swoosh. Elastic waist — gym sessions or summer street rotation.',
    '/products/nike-training-shorts.jpeg',
    'available',
    null,
    false
  ),
  (
    'FC Barcelona Home Jersey',
    'barcelona-home-jersey',
    'jerseys',
    'Nike',
    12900,
    'L',
    'excellent',
    'Blaugrana home energy — moisture-wicking fan jersey. Deep stripes and crest for match-day or casual fits.',
    '/products/barcelona-home-jersey.jpeg',
    'available',
    'limited',
    true
  ),
  (
    'Nike Phantom GX — Pink FG',
    'nike-football-boots-pink',
    'accessories',
    'Nike',
    19800,
    'UK 8',
    'excellent',
    'Statement pink firm-ground boots. Phantom-line traction plate — pitch-ready or display as a grail accessory.',
    '/products/nike-football-boots-pink.jpeg',
    'available',
    'limited',
    false
  ),
  (
    'England Home Jersey — Pink',
    'england-home-jersey-pink',
    'jerseys',
    'Nike',
    11200,
    'L',
    'excellent',
    'England crest on a rare pink colourway. Standard men’s cut — collector-friendly national team piece.',
    '/products/england-home-jersey-pink.jpeg',
    'available',
    null,
    false
  ),
  (
    'England Home Jersey — Women’s Pink',
    'england-home-jersey-pink-womens',
    'jerseys',
    'Nike',
    10800,
    'M',
    'excellent',
    'Women’s-cut England home jersey in pink. Streamlined fit with full crest — pairs with denim or shorts.',
    '/products/england-home-jersey-pink-womens.jpeg',
    'available',
    'new',
    false
  )
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  brand = excluded.brand,
  price = excluded.price,
  size = excluded.size,
  condition = excluded.condition,
  description = excluded.description,
  image_url = excluded.image_url,
  status = excluded.status,
  badge = excluded.badge,
  featured = excluded.featured;
