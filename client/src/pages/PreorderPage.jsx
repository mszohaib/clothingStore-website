import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Package, ShieldCheck, Truck } from 'lucide-react';
import { ShopProductCard } from '../components/shop/ShopProductCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { fetchProducts } from '../services/productsApi.js';

const steps = [
  {
    title: 'Reserve early',
    body: 'Preorder slots let you claim incoming pieces before they hit general release.',
    icon: Package,
  },
  {
    title: 'Transparent timing',
    body: 'Estimated arrival windows are listed on each preorder SKU. We update if suppliers shift dates.',
    icon: CalendarClock,
  },
  {
    title: 'Secure checkout',
    body: 'Use the same checkout flow as in-stock items. Your order is queued until fulfillment.',
    icon: ShieldCheck,
  },
  {
    title: 'Shipped with care',
    body: 'Once your preorder is ready, it ships with the same packing standards as the rest of the shop.',
    icon: Truck,
  },
];

export function PreorderPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchProducts({ status: 'preorder', limit: 12, sort: 'newest' });
        if (!cancelled) setProducts(res.data || []);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Preorder</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Lock in the next drop
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Preorders are for incoming inventory and limited runs. Pay at checkout; we fulfill in the order reservations are
          received unless noted otherwise on the product.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/shop?status=preorder">Shop preorder only</Button>
          <Button to="/policy#shipping" variant="secondary">
            Read shipping policy
          </Button>
        </div>
      </div>

      <ul className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
        {steps.map(({ title, body, icon: Icon }) => (
          <li
            key={title}
            className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-20 border-t border-neutral-200 pt-16 dark:border-neutral-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Current preorders</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Live from your catalog (status = preorder).</p>
          </div>
          <Link to="/shop?status=preorder" className="text-sm font-semibold text-accent hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-400">
            No preorder SKUs right now. Check back after the next announcement or{' '}
            <Link to="/shop" className="font-semibold text-accent hover:underline">
              browse available stock
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ShopProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
