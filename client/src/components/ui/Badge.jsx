import { cn } from '../../utils/cn';

const styles = {
  new: 'bg-accent/15 text-accent dark:bg-accent/25 dark:text-blue-300',
  limited: 'bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200',
  sold_out: 'bg-neutral-500/15 text-neutral-700 dark:bg-neutral-500/25 dark:text-neutral-300',
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
