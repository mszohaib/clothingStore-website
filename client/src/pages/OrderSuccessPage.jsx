import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { formatPkr } from '../utils/format.js';

export function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-neutral-900 dark:text-white">Order placed</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Thank you. We received your order and will email confirmation shortly. Keep an eye on your inbox for payment or
          shipping updates.
        </p>

        {order ? (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 text-left dark:border-neutral-800 dark:bg-neutral-900/60">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Order reference</p>
                <p className="mt-1 font-mono text-sm font-semibold text-neutral-900 dark:text-white">{order.id}</p>
                <dl className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between gap-4">
                    <dt>Total</dt>
                    <dd className="font-display font-bold text-neutral-900 dark:text-white">{formatPkr(order.total_amount)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Payment</dt>
                    <dd className="capitalize">{String(order.payment_method || '').replace(/_/g, ' ')}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Status</dt>
                    <dd className="capitalize">{order.order_status || 'pending'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400">
            If you closed the window before seeing details, check your email for the order confirmation.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button to="/shop">Keep shopping</Button>
          <Button to="/contact" variant="secondary">
            Contact support
          </Button>
        </div>
        <p className="mt-8 text-xs text-neutral-500 dark:text-neutral-400">
          <Link to="/policy#shipping" className="font-semibold text-accent hover:underline">
            Shipping policy
          </Link>
          {' · '}
          <Link to="/faq" className="font-semibold text-accent hover:underline">
            FAQ
          </Link>
        </p>
      </div>
    </Container>
  );
}
