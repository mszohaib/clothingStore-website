import { cn } from '../../utils/cn';

export function Spinner({ className, size = 'md' }) {
  const s = size === 'sm' ? 'h-4 w-4 border-2' : size === 'lg' ? 'h-10 w-10 border-[3px]' : 'h-8 w-8 border-2';
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-neutral-200 border-t-accent dark:border-neutral-700',
        s,
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
