import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredCategories } from '../../data/homeContent.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { cn } from '../../utils/cn.js';

export function CategoryShowcase() {
  return (
    <section className="border-b border-neutral-200 py-16 dark:border-neutral-800 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Shop by vibe"
          title="Featured categories"
          description="From retro kits to vintage layers — every piece is hand-picked for rotation-worthy fits."
          action={{ to: '/shop', label: 'Browse full shop' }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {featuredCategories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={cat.to}
                className={cn(
                  'group relative flex aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800',
                  'ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl dark:ring-white/10',
                )}
              >
                <img
                  src={cat.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative mt-auto flex w-full items-end justify-between gap-2 p-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{cat.label}</h3>
                    <p className="mt-0.5 text-sm text-white/75">{cat.tagline}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform group-hover:scale-110 dark:bg-white">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
