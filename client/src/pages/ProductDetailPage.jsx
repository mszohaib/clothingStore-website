import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Zap } from 'lucide-react';
import { fetchProductBySlug, fetchProducts } from '../services/productsApi.js';
import { useCart } from '../context/CartContext.jsx';
import { ProductGallery } from '../components/product/ProductGallery.jsx';
import { ShopProductCard } from '../components/shop/ShopProductCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { ProductBadge } from '../components/ui/Badge.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { formatPkr } from '../utils/format.js';
import { parseImageList } from '../utils/product.js';

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, replaceWithProduct } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchProductBySlug(slug);
        if (!cancelled) {
          setProduct(p);
          setQty(1);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.status === 404 ? 'Product not found' : e.message || 'Failed to load');
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!product?.category) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchProducts({
          category: product.category,
          limit: 12,
          sort: 'newest',
        });
        if (!cancelled) {
          const rows = (res.data || []).filter((p) => p.slug !== product.slug).slice(0, 4);
          setRelated(rows);
        }
      } catch {
        if (!cancelled) setRelated([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [product?.category, product?.slug]);

  const images = product ? parseImageList(product.image_url) : [];
  const unavailable =
    !product || product.status === 'sold' || product.badge === 'sold_out';
  const canBuy = product && !unavailable && (product.status === 'available' || product.status === 'preorder');

  const handleAddToCart = () => {
    if (!product || !canBuy) return;
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    if (!product || !canBuy) return;
    replaceWithProduct(product, qty);
    navigate('/checkout');
  };

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  if (loading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-20">
        <Spinner size="lg" />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">{error || 'Not found'}</h1>
        <Link to="/shop" className="mt-6 inline-block font-semibold text-accent hover:underline">
          Back to shop
        </Link>
      </Container>
    );
  }

  const badgeVariant = product.badge === 'sold_out' ? 'sold_out' : product.badge || 'default';

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <ProductGallery images={images} />

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badge ? <ProductBadge variant={badgeVariant} /> : null}
            <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {product.status === 'available' ? 'In stock' : product.status}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-2 text-lg font-semibold text-accent">{formatPkr(product.price)}</p>

          <dl className="mt-6 grid gap-3 text-sm text-neutral-600 dark:text-neutral-400 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Category</dt>
              <dd className="mt-0.5 font-medium text-neutral-900 dark:text-neutral-100">{product.category}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Brand</dt>
              <dd className="mt-0.5 font-medium text-neutral-900 dark:text-neutral-100">{product.brand || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Size</dt>
              <dd className="mt-0.5 font-medium text-neutral-900 dark:text-neutral-100">{product.size || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Condition</dt>
              <dd className="mt-0.5 font-medium text-neutral-900 dark:text-neutral-100">{product.condition || '—'}</dd>
            </div>
          </dl>

          {product.description ? (
            <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Description
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {product.description}
              </p>
            </div>
          ) : null}

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
            <p>
              Shipping in 4–5 business days. No COD. No returns or exchanges. NayaPay and bank transfer accepted at
              checkout.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Quantity</span>
            <div className="inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700">
              <button
                type="button"
                onClick={dec}
                disabled={!canBuy}
                className="flex h-11 w-11 items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 dark:text-neutral-200 dark:hover:bg-neutral-800"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={inc}
                disabled={!canBuy}
                className="flex h-11 w-11 items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 dark:text-neutral-200 dark:hover:bg-neutral-800"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="flex-1 gap-2"
              disabled={!canBuy}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={2} />
              Add to cart
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 gap-2"
              disabled={!canBuy}
              onClick={handleBuyNow}
            >
              <Zap className="h-5 w-5" strokeWidth={2} />
              Buy now
            </Button>
          </div>

          {!canBuy ? (
            <p className="mt-4 text-sm font-medium text-amber-700 dark:text-amber-300">
              This piece is not available for purchase.
            </p>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t border-neutral-200 pt-16 dark:border-neutral-800">
          <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">You may also like</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">More from {product.category}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ShopProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
