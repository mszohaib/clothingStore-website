import { cn } from '../../utils/cn';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm shadow-neutral-900/[0.04] dark:border-neutral-800 dark:bg-neutral-950/70 dark:shadow-black/40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('font-display text-xl font-bold tracking-tight', className)}>{children}</h3>;
}

export function CardDescription({ className, children }) {
  return <p className={cn('mt-1 text-sm text-neutral-600 dark:text-neutral-400', className)}>{children}</p>;
}
