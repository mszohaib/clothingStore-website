import { Search, SlidersHorizontal } from 'lucide-react';
import { SORT_OPTIONS } from '../../data/shopFilters.js';
import { cn } from '../../utils/cn.js';
export function ShopToolbar({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  onOpenFilters,
  resultCount,
  total,
  loading,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="relative w-full sm:max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          strokeWidth={2}
        />
        <input
          type="search"
          placeholder="Search products, brands…"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            'h-11 w-full rounded-xl border border-neutral-300 bg-white py-2 pl-10 pr-4 text-sm text-neutral-900 shadow-sm',
            'placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
            'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
          )}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-900 lg:hidden dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <label className="flex min-w-[200px] flex-col gap-1">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Sort</span>
          <select
            value={sortValue || 'newest'}
            onChange={(e) => onSortChange(e.target.value)}
            className={cn(
              'h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-900',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
              'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
            )}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {loading ? 'Loading…' : `${resultCount} of ${total} items`}
        </p>
      </div>
    </div>
  );
}
