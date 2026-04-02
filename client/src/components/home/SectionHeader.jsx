import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  align = 'left',
}) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 sm:mb-12 lg:mb-14',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 lg:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className={cn(align === 'center' && 'flex justify-center')}>
          <Link
            to={action.to}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 dark:text-white"
          >
            {action.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
