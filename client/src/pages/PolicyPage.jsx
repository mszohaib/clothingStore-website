import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container.jsx';

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-neutral-200 py-12 last:border-0 dark:border-neutral-800">
      <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{children}</div>
    </section>
  );
}

export function PolicyPage() {
  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Policies</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Shipping, payments & returns
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Plain-language rules for how ThriftVerse operates. For order-specific questions,{' '}
          <Link to="/contact" className="font-semibold text-accent hover:underline">
            contact us
          </Link>{' '}
          with your order reference after checkout.
        </p>
      </div>

      <div className="mx-auto mt-4 max-w-3xl">
        <Section id="shipping" title="Shipping">
          <p>
            Orders are typically packed and handed to the carrier within <strong className="text-neutral-800 dark:text-neutral-200">4–5 business days</strong>{' '}
            unless a product page states otherwise (for example, preorders). Rural or remote areas may add transit time
            beyond our control.
          </p>
          <p>
            You will receive updates by email when your order is confirmed and again when it ships. If tracking is
            available for your shipment, it will be included in that message.
          </p>
        </Section>

        <Section id="payments" title="Payments">
          <p>
            Checkout supports the payment methods shown on the checkout screen (for example bank transfer, NayaPay,
            Easypaisa, or card placeholder where enabled). Instructions for manual methods appear after you place an order.
          </p>
          <p>
            Prices are listed in <strong className="text-neutral-800 dark:text-neutral-200">PKR</strong>. Your bank or wallet
            may show currency conversion or fees separately — those are between you and your provider.
          </p>
        </Section>

        <Section id="returns" title="Returns & authenticity">
          <p>
            <strong className="text-neutral-800 dark:text-neutral-200">All sales are final</strong> unless an item arrives
            materially not as described (wrong item, severe undisclosed damage). Reach out within{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">48 hours of delivery</strong> with photos; we will
            make it right with a replacement, store credit, or refund where appropriate.
          </p>
          <p>
            We curate for authenticity and condition. Condition grades on listings describe wear honestly; vintage pieces
            may show age-appropriate fading or minor flaws that are part of the character of the piece.
          </p>
        </Section>

        <Section id="privacy" title="Privacy">
          <p>
            We use your email, phone, and shipping details only to fulfill orders and communicate about them. Payment
            details are handled by your chosen provider where applicable — we do not store full card numbers on our servers.
          </p>
        </Section>
      </div>
    </Container>
  );
}
