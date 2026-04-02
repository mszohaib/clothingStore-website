import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive } from 'lucide-react';
import { ShopProductCard } from '../components/shop/ShopProductCard.jsx';
import { ShopPagination } from '../components/shop/ShopPagination.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { fetchProducts } from '../services/productsApi.js';

const LIMIT = 24;

export function SoldPage() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProducts({ status: 'sold', page, limit: LIMIT, sort: 'newest' });
        if (!cancelled) {
          setProducts(res.data || []);
          setMeta(res.meta || { page: 1, totalPages: 0, total: 0 });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Failed to load sold archive');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Number(meta.totalPages) || 0;
  const currentPage = Number(meta.page) || page;

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Archive</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Sold items
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
          Pieces that found new homes. Use this archive for references, comps, and bragging rights — listings here are not
          available to purchase.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/shop">Shop available stock</Button>
          <Button to="/preorder" variant="secondary">
            Preorder drops
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-semibold">Could not load archive</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : null}

      {loading && !error ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : null}

      {!loading && !error && products.length === 0 ? (
        <EmptyState
          icon={Archive}
          title="No sold listings yet"
          description="When products are marked sold in your catalog, they will appear here automatically."
        >
          <Button to="/shop">Browse shop</Button>
        </EmptyState>
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {products.length} of {meta.total ?? products.length} sold {meta.total === 1 ? 'piece' : 'pieces'}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => (
              <ShopProductCard key={p.id} product={p} />
            ))}
          </div>
          <ShopPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(next) => {
              setPage(next);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      ) : null}

      <p className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Looking for something similar?{' '}
        <Link to="/contact" className="font-semibold text-accent hover:underline">
          Message us
        </Link>
        .
      </p>
    </Container>
  );
}
