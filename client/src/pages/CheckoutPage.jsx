import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { formatPkr } from '../utils/format.js';

export function CheckoutPage() {
  const { items, subtotal, lineCount } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-16 text-center sm:py-24">
        <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Nothing to checkout</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Add items to your cart first.</p>
        <Button to="/shop" className="mt-8">
          Browse shop
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-display text-3xl font-extrabold text-neutral-900 dark:text-white">Checkout</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Step 9 will add shipping and payment forms. Your cart is ready below.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 p-8 dark:border-neutral-700 dark:bg-neutral-900/40">
          <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Shipping and payment</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Full address form, NayaPay / bank transfer / wallet selection, and order submission will connect to{' '}
            <code className="rounded bg-neutral-200 px-1 text-xs dark:bg-neutral-800">POST /api/v1/orders</code> in Step 9.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/60">
          <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((line) => (
              <li key={`${line.slug}-${line.size}`} className="flex justify-between gap-4 text-neutral-700 dark:text-neutral-300">
                <span className="min-w-0 truncate">
                  {line.title} × {line.qty}
                </span>
                <span className="shrink-0 font-medium tabular-nums">{formatPkr(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
            <span className="font-semibold text-neutral-900 dark:text-white">Subtotal</span>
            <span className="font-display text-xl font-bold text-neutral-900 dark:text-white">{formatPkr(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">{lineCount} total units</p>
          <Link
            to="/cart"
            className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Edit cart
          </Link>
        </div>
      </div>
    </Container>
  );
}
