import { Heart, Recycle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';

const pillars = [
  {
    title: 'Curated, not cluttered',
    body: 'Every drop is hand-picked for story, quality, and wearability. We would rather list fewer pieces than flood the shop with noise.',
    icon: Sparkles,
  },
  {
    title: 'Circular by default',
    body: 'Secondhand is the main event. Extending the life of jerseys, jackets, and sneakers is how we keep culture moving without extra waste.',
    icon: Recycle,
  },
  {
    title: 'Community first',
    body: 'Railframe exists as a demo for portfolios — ask fit questions through contact, and swap this copy for a real brand story.',
    icon: Heart,
  },
];

export function AboutPage() {
  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">About</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
            Built for the fit-obsessed
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            This page showcases a fictional storefront: vintage sportswear and street pieces in one place — photographed
            honestly, priced fairly, and described so you know what you are getting before it lands on your doorstep.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            New drops, preorders, and sold archives are demo data — swap in your own catalog and policies when you ship for
            real.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/shop">Shop the catalog</Button>
            <Button to="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-accent/20 via-neutral-100 to-neutral-200 dark:border-neutral-800 dark:from-accent/10 dark:via-neutral-900 dark:to-neutral-950">
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
            <p className="font-display text-2xl font-bold text-neutral-900 dark:text-white">&ldquo;Wear the story.&rdquo;</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">— Railframe (demo)</p>
          </div>
        </div>
      </div>

      <ul className="mt-20 grid gap-6 md:grid-cols-3">
        {pillars.map(({ title, body, icon: Icon }) => (
          <li
            key={title}
            className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-10">
        <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">Work with us</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600 dark:text-neutral-400">
          Press, collaborations, or consignment — tell us what you have in mind.
        </p>
        <Button to="/contact" className="mt-6">
          Get in touch
        </Button>
      </div>
    </Container>
  );
}
