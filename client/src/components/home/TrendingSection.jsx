import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../services/productsApi.js';
import { LOCAL_PRODUCT_SLUGS } from '../../data/localCatalogProducts.js';
import { Container } from '../ui/Container.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { HomeProductCard } from './HomeProductCard.jsx';

const LOCAL_SLUG_SET = new Set(LOCAL_PRODUCT_SLUGS);

const CATEGORY_LABEL = {
  jerseys: 'Jerseys',
  jackets: 'Jackets',
  't-shirts': 'T-Shirts',
  vintage: 'Vintage',
  shorts: 'Shorts',
  accessories: 'Accessories',
};

function toHomeCard(product) {
  const cat = product.category;
  return {
    ...product,
    category: CATEGORY_LABEL[cat] ?? cat ?? '',
    price: typeof product.price === 'string' ? Number(product.price) : product.price,
  };
}

export function TrendingSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProducts({ limit: 48, sort: 'newest', page: 1 });
        const rows = (res.data || []).filter((p) => p?.slug && !LOCAL_SLUG_SET.has(p.slug));
        if (!cancelled) {
          setItems(rows.slice(0, 12).map(toHomeCard));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load');
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showGrid = useMemo(() => !loading && !error && items.length > 0, [loading, error, items.length]);

  return (
    <section className="border-b border-neutral-200 py-16 dark:border-neutral-800 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Community picks"
          title="Trending and best sellers"
          description="The pieces everyone asks about: graphic layers, kits, and outerwear that moves fast."
          action={{ to: '/shop', label: 'See full catalog' }}
        />
        {loading ? (
          <div className="mt-12 flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : null}
        {error ? (
          <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Could not load catalog preview. Open{' '}
            <a href="/shop" className="font-semibold text-accent underline-offset-2 hover:underline">
              Shop
            </a>{' '}
            for the full list.
          </p>
        ) : null}
        {showGrid ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {items.map((p, i) => (
              <HomeProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : null}
        {!loading && !error && items.length === 0 ? (
          <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No extra catalog items to show here yet. Browse{' '}
            <a href="/shop" className="font-semibold text-accent underline-offset-2 hover:underline">
              Shop
            </a>{' '}
            for everything in stock.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
