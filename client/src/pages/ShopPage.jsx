import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsApi.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
import { useShopParams } from '../hooks/useShopParams.js';
import { FilterDrawer } from '../components/shop/FilterDrawer.jsx';
import { FilterFields } from '../components/shop/FilterFields.jsx';
import { ShopPagination } from '../components/shop/ShopPagination.jsx';
import { ShopProductCard } from '../components/shop/ShopProductCard.jsx';
import { ShopToolbar } from '../components/shop/ShopToolbar.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { PackageSearch } from 'lucide-react';

export function ShopPage() {
  const { get, set, resetAll, apiParams, searchParams } = useShopParams();
  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') || '');
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const searchFromUrl = searchParams.get('search') || '';

  useEffect(() => {
    if (debouncedSearch !== searchFromUrl) {
      set('search', debouncedSearch);
    }
  }, [debouncedSearch, searchFromUrl, set]);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 0, total: 0, limit: 48 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProducts(apiParams);
        if (!cancelled) {
          setProducts(res.data || []);
          setMeta(res.meta || { page: 1, totalPages: 0, total: 0 });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Failed to load products');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiParams]);

  const page = Number(meta.page) || 1;
  const totalPages = Number(meta.totalPages) || 0;
  const total = Number(meta.total) || 0;

  const handlePageChange = (next) => {
    set('page', String(next), { resetPage: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Shop</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          All pieces
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
          Search, filter, and sort the full catalog. Data loads from the storefront API.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Filters
              </h2>
              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Clear
              </button>
            </div>
            <FilterFields get={get} set={set} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <ShopToolbar
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            sortValue={get('sort') || 'newest'}
            onSortChange={(v) => set('sort', v)}
            onOpenFilters={() => setFilterOpen(true)}
            resultCount={products.length}
            total={total}
            loading={loading}
          />

          {error ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              <p className="font-semibold">Could not load products</p>
              <p className="mt-1">{error}</p>
              <p className="mt-3 text-xs opacity-90">
                Ensure the API is running and <code className="rounded bg-red-100 px-1 dark:bg-red-900">VITE_API_URL</code> points to{' '}
                <code className="rounded bg-red-100 px-1 dark:bg-red-900">/api/v1</code>.
              </p>
            </div>
          ) : null}

          {loading && !error ? (
            <div className="mt-16 flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : null}

          {!loading && !error && products.length === 0 ? (
            <EmptyState
              className="mt-10"
              icon={PackageSearch}
              title="No products match"
              description="Try clearing filters or broadening your search."
            >
              <Button type="button" variant="secondary" onClick={resetAll}>
                Reset filters
              </Button>
            </EmptyState>
          ) : null}

          {!loading && !error && products.length > 0 ? (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <ShopProductCard key={p.id} product={p} />
                ))}
              </div>
              <ShopPagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          ) : null}
        </div>
      </div>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        get={get}
        set={set}
        onReset={() => {
          resetAll();
          setFilterOpen(false);
        }}
      />
    </Container>
  );
}
