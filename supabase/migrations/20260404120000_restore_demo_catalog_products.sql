-- Restores the twelve Unsplash demo SKUs if they are missing (e.g. after an older migration overwrote eight rows).
-- Safe to re-run: each insert is guarded with NOT EXISTS on slug.
-- Pairs with `20260402190000_fix_product_unsplash_urls.sql` for image_url values.

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Nike NBA Swingman Jersey — Red / Black', 'nike-nba-swingman-jersey-red-black', 'jerseys', 'Nike', 9800, 'L', 'excellent', 'Classic swingman cut — demo catalog piece for hoops and street rotation.', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'limited', false
where not exists (select 1 from public.products p where p.slug = 'nike-nba-swingman-jersey-red-black');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Adidas Football Kit — Navy / White Stripes', 'adidas-football-kit-navy-white-stripes', 'jerseys', 'Adidas', 8900, 'M', 'excellent', 'Pitch-ready kit energy — moisture-wicking fabric and clean stripe blocking.', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'new', false
where not exists (select 1 from public.products p where p.slug = 'adidas-football-kit-navy-white-stripes');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Vintage 90s Hockey Practice Jersey — Teal', 'vintage-90s-hockey-practice-jersey-teal', 'jerseys', 'Vintage', 7600, 'XL', 'good', 'Practice-weight mesh with retro rink character — layered over hoodies or solo.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', null, true
where not exists (select 1 from public.products p where p.slug = 'vintage-90s-hockey-practice-jersey-teal');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Single Stitch Band Tee — Faded Black', 'single-stitch-band-tee-faded-black', 't-shirts', 'Vintage', 4200, 'L', 'good', 'Paper-thin cotton with authentic fade — single stitch hem, tour-rack vibes.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', null, false
where not exists (select 1 from public.products p where p.slug = 'single-stitch-band-tee-faded-black');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Carhartt Pocket Tee — Washed Gray', 'carhartt-pocket-tee-washed-gray', 't-shirts', 'Carhartt', 5100, 'M', 'excellent', 'Workwear staple pocket tee — durable jersey cotton, broken-in wash.', 'https://images.unsplash.com/photo-1583743814966-89362cb31dad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', null, false
where not exists (select 1 from public.products p where p.slug = 'carhartt-pocket-tee-washed-gray');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Oversized Graphic Tee — Cream', 'oversized-graphic-tee-cream', 't-shirts', 'Streetwear', 4800, 'L', 'excellent', 'Boxy drop-shoulder graphic — cream base, high-contrast print.', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'new', false
where not exists (select 1 from public.products p where p.slug = 'oversized-graphic-tee-cream');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Levi''s Type III Trucker — Mid Wash', 'levis-type-iii-trucker-mid-wash', 'jackets', 'Levi''s', 11200, 'M', 'excellent', 'Arcuate-backed Type III — mid indigo wash, everyday layering.', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'limited', false
where not exists (select 1 from public.products p where p.slug = 'levis-type-iii-trucker-mid-wash');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select '90s Nylon Windbreaker — Purple / Teal', '90s-nylon-windbreaker-purple-teal', 'jackets', 'Vintage', 9900, 'L', 'good', 'Color-block shell with packable hood — lightweight trail-to-street piece.', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', null, false
where not exists (select 1 from public.products p where p.slug = '90s-nylon-windbreaker-purple-teal');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Wool Stadium Jacket — Navy / Off-White', 'wool-stadium-jacket-navy-off-white', 'jackets', 'Vintage', 15400, 'L', 'excellent', 'Wool-blend stadium jacket with contrast sleeves — varsity energy.', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'limited', true
where not exists (select 1 from public.products p where p.slug = 'wool-stadium-jacket-navy-off-white');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Patagonia Retro-X Fleece — Natural Brown', 'patagonia-retro-x-fleece-natural-brown', 'jackets', 'Patagonia', 16800, 'M', 'excellent', 'Deep-pile Retro-X warmth — trail-tested, city-approved.', 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', null, false
where not exists (select 1 from public.products p where p.slug = 'patagonia-retro-x-fleece-natural-brown');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'Ralph Lauren Cable Knit — Cream', 'ralph-lauren-cable-knit-cream', 'vintage', 'Ralph Lauren', 13200, 'M', 'excellent', 'Heritage cable knit in cream — preppy layer with serious texture.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'new', false
where not exists (select 1 from public.products p where p.slug = 'ralph-lauren-cable-knit-cream');

insert into public.products (title, slug, category, brand, price, size, condition, description, image_url, status, badge, featured)
select 'USA Olympics Track Jacket — 80s Shell', 'usa-olympics-track-jacket-80s-shell', 'vintage', 'USA', 14200, 'L', 'good', 'Retro Olympic shell — bold color blocking and collector appeal.', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80', 'available', 'limited', false
where not exists (select 1 from public.products p where p.slug = 'usa-olympics-track-jacket-80s-shell');
