import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lookbookTiles } from '../../data/homeContent.js';
import { cn } from '../../utils/cn.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';

/** Moodboard section — no social network links (portfolio placeholder). */
export function LookbookGallery() {
  return (
    <section className="border-b border-neutral-200 py-16 dark:border-neutral-800 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Lookbook"
          title="On the moodboard"
          description="Placeholder grid for styling inspiration — fits, flatlays, and detail shots."
          align="center"
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {lookbookTiles.map((src, i) => (
            <motion.div
              key={`lb-${i}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={cn(
                'relative overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800',
                i === 0
                  ? 'col-span-2 row-span-2 aspect-auto min-h-[220px] sm:min-h-[280px]'
                  : 'aspect-square',
              )}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 text-sm font-semibold tracking-wide text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Browse the shop
          </Link>
        </div>
      </Container>
    </section>
  );
}
