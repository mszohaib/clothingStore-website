import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/** Text-only wordmark — no third-party logo imagery. */
export function Logo({
  className,
  to = '/',
  imageClassName,
  showWordmark = true,
  compact = false,
  navFramed = false,
}) {
  const aria =
    typeof to === 'string' && to.startsWith('/admin') ? 'Railframe admin' : 'Railframe home';

  const frameSize = navFramed
    ? compact
      ? 'h-9 w-9 sm:h-9 sm:w-9'
      : 'h-10 w-10 sm:h-[2.625rem] sm:w-[2.625rem]'
    : compact
      ? 'h-8 w-8 sm:h-8 sm:w-8'
      : 'h-9 w-9 sm:h-10 sm:w-10';

  const initialMark = (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border border-neutral-200/90 bg-neutral-50 font-display text-sm font-extrabold text-accent shadow-sm dark:border-neutral-700/90 dark:bg-neutral-900',
        'transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.04] group-hover:shadow-md',
        frameSize,
        imageClassName,
      )}
      aria-hidden
    >
      R
    </span>
  );

  return (
    <Link
      to={to}
      aria-label={aria}
      className={cn(
        'group flex min-w-0 max-w-full items-center',
        navFramed ? 'gap-2.5 sm:gap-3' : compact ? 'gap-1.5' : 'gap-2 sm:gap-2.5',
        navFramed ? 'transition-opacity duration-300 hover:opacity-[0.92]' : 'transition-opacity duration-200 hover:opacity-90',
        className,
      )}
    >
      {initialMark}
      {showWordmark ? (
        <span
          className={cn(
            'min-w-0 truncate font-display font-extrabold leading-none tracking-tight text-neutral-900 dark:text-white',
            navFramed && 'transition-colors duration-300',
            compact ? 'text-sm' : 'text-[1.05rem] sm:text-xl',
          )}
        >
          Rail<span className="text-accent transition-colors duration-300">frame</span>
        </span>
      ) : null}
    </Link>
  );
}
