import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';
import { createOrder } from '../services/ordersApi.js';
import { formatPkr } from '../utils/format.js';
import {
  validateAddress,
  validateCity,
  validateEmail,
  validateName,
  validatePhone,
} from '../utils/validate.js';

const PAYMENT_OPTIONS = [
  { value: 'bank_transfer', label: 'Bank transfer (IBFT)' },
  { value: 'nayapay', label: 'NayaPay' },
  { value: 'easypaisa', label: 'Easypaisa / JazzCash' },
  { value: 'card_placeholder', label: 'Debit / credit card (we confirm with you after order)' },
];

const selectClass =
  'h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-neutral-900 shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, lineCount, clearCart } = useCart();
  const { session, user } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user?.email) setEmail((e) => e || user.email);
    const meta = user?.user_metadata;
    if (meta?.full_name) setCustomerName((n) => n || String(meta.full_name));
  }, [user]);

  const orderItems = useMemo(
    () =>
      items.map((line) => ({
        id: line.id,
        slug: line.slug,
        title: line.title,
        qty: line.qty,
        size: line.size || null,
        price: line.price,
      })),
    [items],
  );

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

  const blur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === 'customer_name') setErrors((e) => ({ ...e, customer_name: validateName(customerName) }));
    if (field === 'email') setErrors((e) => ({ ...e, email: validateEmail(email) }));
    if (field === 'phone') setErrors((e) => ({ ...e, phone: validatePhone(phone) }));
    if (field === 'address') setErrors((e) => ({ ...e, address: validateAddress(address) }));
    if (field === 'city') setErrors((e) => ({ ...e, city: validateCity(city) }));
  };

  const validateAll = () => {
    const next = {
      customer_name: validateName(customerName),
      email: validateEmail(email),
      phone: validatePhone(phone),
      address: validateAddress(address),
      city: validateCity(city),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      customer_name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
    });
    if (!validateAll()) return;

    setSubmitting(true);
    setFormError('');
    try {
      const payload = {
        customer_name: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        payment_method: paymentMethod,
        total_amount: subtotal,
        items: orderItems,
      };
      const token = session?.access_token ?? null;
      const order = await createOrder(payload, token);
      clearCart();
      navigate('/order-success', { replace: true, state: { order } });
    } catch (err) {
      setFormError(err.message || 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-display text-3xl font-extrabold text-neutral-900 dark:text-white">Checkout</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Enter shipping details and choose how you will pay. {user ? 'You are signed in — this order will link to your account.' : 'Guest checkout is fine.'}
      </p>

      <form className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10" onSubmit={handleSubmit} noValidate>
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Shipping</h2>
          {formError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {formError}
            </p>
          ) : null}
          <Input
            name="customer_name"
            label="Full name"
            autoComplete="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onBlur={() => blur('customer_name')}
            error={touched.customer_name ? errors.customer_name : ''}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => blur('email')}
            error={touched.email ? errors.email : ''}
          />
          <Input
            name="phone"
            type="tel"
            label="Phone"
            autoComplete="tel"
            placeholder="03XX XXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => blur('phone')}
            error={touched.phone ? errors.phone : ''}
          />
          <Textarea
            name="address"
            label="Street address"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => blur('address')}
            error={touched.address ? errors.address : ''}
          />
          <Input
            name="city"
            label="City"
            autoComplete="address-level2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => blur('city')}
            error={touched.city ? errors.city : ''}
          />

          <div className="space-y-1.5">
            <label htmlFor="payment_method" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Payment method
            </label>
            <select
              id="payment_method"
              name="payment_method"
              className={selectClass}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {PAYMENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Totals are in <strong className="text-neutral-700 dark:text-neutral-300">PKR</strong>. After you submit, watch
              your email for payment instructions (bank transfer, wallet, or card follow-up). Card is only charged after we
              confirm your order with you.
            </p>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner size="sm" />
                Placing order…
              </>
            ) : (
              `Place order · ${formatPkr(subtotal)}`
            )}
          </Button>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60">
            <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Order summary</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
              {items.map((line) => (
                <li key={`${line.slug}-${line.size}`} className="flex justify-between gap-4 text-neutral-700 dark:text-neutral-300">
                  <span className="min-w-0 truncate">
                    {line.title} × {line.qty}
                    {line.size ? <span className="text-neutral-500"> · {line.size}</span> : null}
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
            <Link to="/cart" className="mt-6 inline-block text-sm font-semibold text-accent hover:underline">
              Edit cart
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}
