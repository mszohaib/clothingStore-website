import { cn } from '../../utils/cn';

const styles = {
  new: 'bg-accent/12 text-accent ring-1 ring-accent/20 dark:bg-accent/20 dark:text-accent-muted',
  limited: 'bg-neutral-200/90 text-neutral-800 ring-1 ring-neutral-300/80 dark:bg-neutral-800/80 dark:text-neutral-200 dark:ring-neutral-600/50',
  sold_out: 'bg-neutral-200/70 text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400',
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200',
};

const labels = {
  new: 'New Drop',
  limited: 'Limited',
  sold_out: 'Sold Out',
};

export function ProductBadge({ variant = 'default', className, children }) {
  const key = variant === 'sold_out' ? 'sold_out' : variant;
  const label = children ?? labels[key] ?? null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
        styles[key] || styles.default,
        className,
      )}
    >
      {label}
    </span>
  );
}
