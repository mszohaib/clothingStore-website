import { cn } from '../../utils/cn';

export function Input({ className, id, label, error, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="w-full space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}
