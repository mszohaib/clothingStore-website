import { newDrops } from '../../data/homeContent.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { HomeProductCard } from './HomeProductCard.jsx';

export function NewDropsSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Fresh rotation"
          title="New drops"
          description="Limited runs and just-listed pieces. When they are gone, they hit the sold archive."
          action={{ to: '/shop?badge=new', label: 'Shop all new' }}
        />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
          {newDrops.map((p, i) => (
            <div key={p.id} className="w-[min(78vw,280px)] shrink-0 snap-center sm:w-auto">
              <HomeProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
