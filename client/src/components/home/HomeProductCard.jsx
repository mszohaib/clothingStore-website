import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductBadge } from '../ui/Badge.jsx';
import { formatPkr } from '../../utils/format.js';
import { cn } from '../../utils/cn.js';

export function HomeProductCard({ product, index = 0 }) {
  const sold = product.status === 'sold';
  const badgeVariant = product.badge === 'sold_out' ? 'sold_out' : product.badge || 'default';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
      className="group"
    >
      <Link to={`/shop/${product.slug}`} className="block">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800',
            'min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]',
            sold && 'opacity-90',
          )}
          style={{ aspectRatio: '3 / 4' }}
        >
          <img
            src={product.image_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badge ? <ProductBadge variant={badgeVariant} /> : null}
            {sold && product.badge !== 'sold_out' ? (
              <ProductBadge variant="sold_out">Sold</ProductBadge>
            ) : null}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{product.category}</p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white sm:text-xl">{product.title}</h3>
            <p className="mt-2 text-sm font-semibold text-white">{formatPkr(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
