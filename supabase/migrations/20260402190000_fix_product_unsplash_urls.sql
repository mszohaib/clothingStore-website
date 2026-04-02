-- Replace broken / unstable Unsplash hotlinks on seed products (slug-based).
-- URLs use ixlib + fit=crop for reliable delivery.

update public.products
set image_url = case slug
  when 'nike-nba-swingman-jersey-red-black' then  
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'adidas-football-kit-navy-white-stripes' then
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'vintage-90s-hockey-practice-jersey-teal' then
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'single-stitch-band-tee-faded-black' then
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'carhartt-pocket-tee-washed-gray' then
    'https://images.unsplash.com/photo-1583743814966-89362cb31dad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'oversized-graphic-tee-cream' then
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'levis-type-iii-trucker-mid-wash' then
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when '90s-nylon-windbreaker-purple-teal' then
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'wool-stadium-jacket-navy-off-white' then
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'patagonia-retro-x-fleece-natural-brown' then
    'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'ralph-lauren-cable-knit-cream' then
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  when 'usa-olympics-track-jacket-80s-shell' then
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80,https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
end
where slug in (
  'nike-nba-swingman-jersey-red-black',
  'adidas-football-kit-navy-white-stripes',
  'vintage-90s-hockey-practice-jersey-teal',
  'single-stitch-band-tee-faded-black',
  'carhartt-pocket-tee-washed-gray',
  'oversized-graphic-tee-cream',
  'levis-type-iii-trucker-mid-wash',
  '90s-nylon-windbreaker-purple-teal',
  'wool-stadium-jacket-navy-off-white',
  'patagonia-retro-x-fleece-natural-brown',
  'ralph-lauren-cable-knit-cream',
  'usa-olympics-track-jacket-80s-shell'
);
