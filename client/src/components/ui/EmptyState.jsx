import { cn } from '../../utils/cn.js';

export function EmptyState({ icon: Icon, title, description, className, children }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/40',
        className,
      )}
    >
      {Icon ? <Icon className="h-10 w-10 text-neutral-400" strokeWidth={1.25} /> : null}
      <h2 className="mt-4 font-display text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
