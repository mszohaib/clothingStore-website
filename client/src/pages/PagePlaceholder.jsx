import { Container } from '../components/ui/Container.jsx';

export function PagePlaceholder({ title, description }) {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      ) : null}
    </Container>
  );
}
