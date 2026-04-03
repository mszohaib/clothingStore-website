import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import mainLogo from '../../assets/mainLogo.jpg';

export function Logo({
  className,
  to = '/',
  imageClassName,
  showWordmark = true,
  compact = false,
  navFramed = false,
}) {
  const aria =
    typeof to === 'string' && to.startsWith('/admin') ? 'ThriftVerse admin' : 'ThriftVerse home';

  const frameSize = navFramed
    ? compact
      ? 'h-9 w-9 sm:h-9 sm:w-9'
      : 'h-10 w-10 sm:h-[2.625rem] sm:w-[2.625rem]'
    : null;

  const imgClasses = cn(
    'shrink-0',
    navFramed
      ? 'h-full w-full object-contain p-[6px] sm:p-[7px]'
      : 'w-auto object-contain object-left',
    !navFramed &&
      (compact
        ? 'h-7 max-h-8 max-w-[4.5rem] sm:max-w-[5rem]'
        : 'h-8 max-h-10 max-w-[min(42vw,7.5rem)] sm:h-9 sm:max-w-[8.5rem]'),
    imageClassName,
  );

  const mark = (
    <img
      src={mainLogo}
      alt=""
      decoding="async"
      fetchPriority="high"
      className={imgClasses}
    />
  );

  const framedMark = navFramed ? (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'border border-neutral-200/90 bg-neutral-50',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_-2px_rgba(0,0,0,0.08)]',
        'ring-1 ring-neutral-900/[0.04]',
        'transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out',
        'dark:border-neutral-700/90 dark:bg-neutral-900 dark:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.45)] dark:ring-white/[0.06]',
        'group-hover:scale-[1.04] group-hover:border-neutral-300/90 group-hover:shadow-[0_4px_20px_-4px_rgba(244,63,140,0.18),0_2px_8px_-2px_rgba(0,0,0,0.08)]',
        'dark:group-hover:border-neutral-600 dark:group-hover:shadow-[0_4px_24px_-4px_rgba(244,63,140,0.22),0_2px_12px_-2px_rgba(0,0,0,0.5)]',
        frameSize,
      )}
    >
      {mark}
    </span>
  ) : (
    mark
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
      {framedMark}
      {showWordmark ? (
        <span
          className={cn(
            'min-w-0 truncate font-display font-extrabold leading-none tracking-tight text-neutral-900 dark:text-white',
            navFramed && 'transition-colors duration-300',
            compact ? 'text-sm' : 'text-[1.05rem] sm:text-xl',
          )}
        >
          Thrift<span className="text-accent transition-colors duration-300">Verse</span>
        </span>
      ) : null}
    </Link>
  );
}
