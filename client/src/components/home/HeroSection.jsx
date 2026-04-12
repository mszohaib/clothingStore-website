import { motion } from 'framer-motion';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-32 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[100px] dark:bg-accent/25" />
        <div className="absolute -bottom-40 left-1/4 h-[360px] w-[360px] rounded-full bg-neutral-400/12 blur-[90px] dark:bg-neutral-500/10" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28 xl:py-36">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Curated street &amp; sport</p>
              <h1 className="mt-5 font-display text-[2.65rem] font-extrabold leading-[0.95] tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
                Original
                <br />
                streetwear.
                <span className="text-accent"> Curated drops.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
                Premium secondhand and new-old-stock pieces for the next fit: jerseys, vintage sportswear, and limited runs.
                A real storefront upgrade from the DM.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button to="/shop" size="lg" className="w-full sm:w-auto">
                  Shop now
                </Button>
                <Button to="/shop?badge=new" variant="outline" size="lg" className="w-full sm:w-auto">
                  View new drops
                </Button>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:max-w-md">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                    Authenticity
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-neutral-900 dark:text-white">100%</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                    Dispatch
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-neutral-900 dark:text-white">4 to 5 days</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                    Drops
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-neutral-900 dark:text-white">Weekly</dd>
                </div>
              </dl>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/30 dark:border-neutral-800 lg:max-w-none lg:translate-x-4">
              <div className="aspect-[4/5] w-full">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-accent/20" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">This week</p>
                <p className="mt-1 font-display text-lg font-bold text-white">Vintage outerwear and kits</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-4 hidden h-24 w-24 rounded-2xl border border-neutral-200 bg-white/90 shadow-lg dark:border-neutral-700 dark:bg-neutral-900/90 lg:block" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
