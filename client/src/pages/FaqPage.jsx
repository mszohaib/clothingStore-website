import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '../components/ui/Container.jsx';
import { cn } from '../utils/cn.js';

const faqs = [
  {
    q: 'How do I know my size?',
    a: (
      <>
        Start with our{' '}
        <Link to="/size-chart" className="font-semibold text-accent hover:underline">
          size chart
        </Link>
        , then read the measurements on each listing. Vintage fits vary — when unsure, message us before ordering.
      </>
    ),
  },
  {
    q: 'Do you ship nationwide?',
    a: 'Yes. Delivery timelines depend on your city and carrier service levels. Preorders ship when stock arrives; see the product page for estimates.',
  },
  {
    q: 'Can I return or exchange?',
    a: 'Sales are final except when something arrives wrong or with severe undisclosed issues. Contact us within 48 hours of delivery with photos.',
  },
  {
    q: 'Are items authentic?',
    a: 'We authenticate and describe condition carefully. If you ever have a concern about a purchase, reach out with details and we will review it with you.',
  },
  {
    q: 'What is a preorder?',
    a: 'Preorders reserve incoming pieces before they are ready to ship. You pay at checkout; fulfillment follows the timeline on the product page.',
  },
  {
    q: 'How do I pay?',
    a: 'Checkout shows available methods (e.g. bank transfer, digital wallet). Follow the instructions after placing your order for manual transfers.',
  },
];

function FaqItem({ item, open, onToggle, index }) {
  const id = `faq-panel-${index}`;
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        type="button"
        id={`${id}-button`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-bold text-neutral-900 dark:text-white">{item.q}</span>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200', open && 'rotate-180')}
          strokeWidth={1.75}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">FAQ</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Common questions
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Quick answers about sizing, shipping, authenticity, and checkout. Still stuck?{' '}
          <Link to="/contact" className="font-semibold text-accent hover:underline">
            Contact the team
          </Link>
          .
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-neutral-200 bg-white px-2 dark:border-neutral-800 dark:bg-neutral-900/60 sm:px-6">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            index={i}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
          />
        ))}
      </div>
    </Container>
  );
}
