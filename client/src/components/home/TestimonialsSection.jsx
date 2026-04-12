import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../../data/homeContent.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';

export function TestimonialsSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Reviews"
          title="Loved by the rotation"
          description="What buyers are saying about the rotation."
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
            >
              <div className="flex gap-0.5 text-accent" aria-hidden>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <span className="font-display font-bold text-neutral-900 dark:text-white">{t.name}</span>
                <span className="mt-0.5 block text-xs font-medium text-neutral-500 dark:text-neutral-500">{t.city}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
