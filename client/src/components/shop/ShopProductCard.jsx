import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { ProductBadge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { formatPkr } from '../../utils/format.js';
import { cn } from '../../utils/cn.js';
import { getPrimaryImageUrl } from '../../utils/product.js';
import { useCart } from '../../context/CartContext.jsx';

export function ShopProductCard({ product, onAdded }) {
  const { addItem } = useCart();
  const unavailable = product.status === 'sold' || product.badge === 'sold_out';
  const badgeVariant = product.badge === 'sold_out' ? 'sold_out' : product.badge || 'default';

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (unavailable) return;
    if (typeof product.slug !== 'string' || !product.slug.trim()) return;
    addItem(product, 1);
    onAdded?.();
  };

  const thumb = getPrimaryImageUrl(product.image_url);

  return (
    <article
        className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60',
        product.status === 'sold' && 'opacity-90',
      )}
    >
      <Link to={`/shop/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={thumb || undefined}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge ? <ProductBadge variant={badgeVariant} /> : null}
          {product.status === 'sold' && product.badge !== 'sold_out' ? (
            <ProductBadge variant="sold_out">Sold</ProductBadge>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {product.category}
          {product.brand ? <span className="text-neutral-400"> · {product.brand}</span> : null}
        </p>
        <Link to={`/shop/${product.slug}`} className="mt-1 block">
          <h3 className="font-display text-base font-bold leading-snug text-neutral-900 line-clamp-2 dark:text-white">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {product.size ? `Size ${product.size}` : 'Size —'} · {product.condition || '—'}
        </p>
        <p className="mt-3 font-display text-lg font-bold text-neutral-900 dark:text-white">{formatPkr(product.price)}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={unavailable}
            onClick={handleAdd}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            Add to cart
          </Button>
          <Button to={`/shop/${product.slug}`} variant="secondary" size="sm" className="flex-1">
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
