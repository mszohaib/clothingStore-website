import { trendingProducts } from '../../data/homeContent.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { HomeProductCard } from './HomeProductCard.jsx';

export function TrendingSection() {
  return (
    <section className="border-b border-neutral-200 py-16 dark:border-neutral-800 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Community picks"
          title="Trending and best sellers"
          description="The pieces everyone asks about: graphic layers, kits, and outerwear that moves fast."
          action={{ to: '/shop', label: 'See full catalog' }}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {trendingProducts.map((p, i) => (
            <HomeProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
