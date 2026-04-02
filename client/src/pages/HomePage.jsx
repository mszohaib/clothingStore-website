import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">ThriftVerse</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
              Original streetwear.
              <span className="text-accent"> Curated drops.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
              Premium thrifted pieces for the next fit — jerseys, vintage sportswear, and limited stock from Pakistan.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/shop" size="lg">
                Shop now
              </Button>
              <Button to="/shop?badge=new" variant="outline" size="lg">
                View new drops
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
      <Container className="py-12">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          Homepage sections (categories, drops, testimonials, and more) ship in Step 5.
        </p>
      </Container>
    </div>
  );
}
