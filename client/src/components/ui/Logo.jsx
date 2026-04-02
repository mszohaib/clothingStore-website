import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function Logo({ className, to = '/' }) {
  return (
    <Link to={to} className={cn('group flex items-baseline gap-0.5', className)}>
      <span className="font-display text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
        Thrift
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-accent sm:text-2xl">Verse</span>
    </Link>
  );
}
