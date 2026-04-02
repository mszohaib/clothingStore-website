import { motion } from 'framer-motion';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';

export function CtaBanner() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-14 text-center dark:border-neutral-800 sm:px-12 lg:px-16 lg:py-16"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/40 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-[70px]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Limited stock</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Secure the fit before it hits the sold archive.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
              New drops weekly. No COD. NayaPay and bank transfer supported. Shipping in 4 to 5 business days.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/shop" size="lg" className="w-full border-0 bg-white text-neutral-900 hover:bg-neutral-100 sm:w-auto">
                Shop the drop
              </Button>
              <Button
                to="/sold"
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white hover:text-neutral-900 sm:w-auto"
              >
                View sold heat
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
