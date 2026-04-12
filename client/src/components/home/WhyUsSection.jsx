import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Truck, Wallet } from 'lucide-react';
import { whyUsItems } from '../../data/homeContent.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const icons = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  wallet: Wallet,
  truck: Truck,
};

export function WhyUsSection() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-100 py-16 dark:border-neutral-800 dark:bg-neutral-900/40 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Why shop here"
          title="Built for trust"
          description="Same rules you know from IG, with checkout that feels like a serious brand."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whyUsItems.map((item, i) => {
            const Icon = icons[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent dark:bg-accent/20">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
