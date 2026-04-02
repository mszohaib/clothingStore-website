import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { Button } from '../ui/Button.jsx';

export function ShopPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const p = Math.max(1, Math.min(page, totalPages));
  const pages = [];
  const windowSize = 5;
  let start = Math.max(1, p - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  if (end - start < windowSize - 1) start = Math.max(1, end - windowSize + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 pt-10" aria-label="Pagination">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={p <= 1}
        onClick={() => onPageChange(p - 1)}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Button>
      {pages.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onPageChange(num)}
          className={cn(
            'h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition-colors',
            num === p
              ? 'bg-accent text-white'
              : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
          )}
        >
          {num}
        </button>
      ))}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={p >= totalPages}
        onClick={() => onPageChange(p + 1)}
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
