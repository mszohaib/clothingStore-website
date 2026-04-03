-- Align boots SKU slug with client `localCatalogProducts.js` (pink-football-boots.jpg).
-- Idempotent: only updates the legacy slug row.

update public.products
set
  slug = 'pink-football-boots',
  image_url = '/products/pink-football-boots.jpg'
where slug = 'nike-football-boots-pink';
