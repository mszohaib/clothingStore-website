import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { lineKey, useCart } from '../context/CartContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { formatPkr } from '../utils/format.js';

export function CartPage() {
  const { items, setLineQty, removeLine, subtotal, lineCount } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Browse the shop and add pieces you want to secure."
        >
          <Button to="/shop">Continue shopping</Button>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-display text-3xl font-extrabold text-neutral-900 dark:text-white">Cart</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {lineCount} {lineCount === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((line) => (
            <li
              key={lineKey(line.slug, line.size)}
              className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <Link to={`/shop/${line.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <img src={line.image_url || undefined} alt="" className="h-full w-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/shop/${line.slug}`} className="font-display font-bold text-neutral-900 hover:text-accent dark:text-white">
                  {line.title}
                </Link>
                <p className="mt-1 text-xs text-neutral-500">
                  {line.size ? `Size ${line.size}` : 'One size'} · {formatPkr(line.price)} each
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      onClick={() => setLineQty(line.slug, line.size, line.qty - 1)}
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      onClick={() => setLineQty(line.slug, line.size, line.qty + 1)}
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.slug, line.size)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
              <p className="shrink-0 font-display font-bold text-neutral-900 dark:text-white">
                {formatPkr(line.price * line.qty)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Subtotal</p>
            <p className="mt-1 font-display text-2xl font-bold text-neutral-900 dark:text-white">{formatPkr(subtotal)}</p>
            <p className="mt-2 text-xs text-neutral-500">Taxes and shipping calculated at checkout.</p>
            <Button to="/checkout" className="mt-6 w-full" size="lg">
              Proceed to checkout
            </Button>
            <Button to="/shop" variant="ghost" className="mt-3 w-full">
              Continue shopping
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
