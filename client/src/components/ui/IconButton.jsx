import { cn } from '../../utils/cn';

export function IconButton({ className, label, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
