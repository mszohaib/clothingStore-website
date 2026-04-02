import {
  BADGE_OPTIONS,
  CATEGORY_OPTIONS,
  CONDITION_OPTIONS,
  SIZE_OPTIONS,
  STATUS_OPTIONS,
} from '../../data/shopFilters.js';
import { cn } from '../../utils/cn.js';

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{label}</p>
      {children}
    </div>
  );
}

function Select({ value, onChange, options, id }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900',
        'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
        'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
      )}
    >
      {options.map((o) => (
        <option key={o.value || 'all'} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function FilterFields({ get, set }) {
  return (
    <div className="space-y-6">
      <Field label="Category">
        <Select id="f-cat" value={get('category')} onChange={(v) => set('category', v)} options={CATEGORY_OPTIONS} />
      </Field>
      <Field label="Brand">
        <input
          type="text"
          placeholder="e.g. Nike"
          value={get('brand')}
          onChange={(e) => set('brand', e.target.value)}
          className={cn(
            'h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
            'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
          )}
        />
      </Field>
      <Field label="Size">
        <Select id="f-size" value={get('size')} onChange={(v) => set('size', v)} options={SIZE_OPTIONS} />
      </Field>
      <Field label="Condition">
        <Select
          id="f-cond"
          value={get('condition')}
          onChange={(v) => set('condition', v)}
          options={CONDITION_OPTIONS}
        />
      </Field>
      <Field label="Availability">
        <Select id="f-st" value={get('status')} onChange={(v) => set('status', v)} options={STATUS_OPTIONS} />
      </Field>
      <Field label="Badge">
        <Select id="f-badge" value={get('badge')} onChange={(v) => set('badge', v)} options={BADGE_OPTIONS} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Min">
          <input
            type="number"
            min="0"
            placeholder="0"
            value={get('minPrice')}
            onChange={(e) => set('minPrice', e.target.value)}
            className={cn(
              'h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
              'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
            )}
          />
        </Field>
        <Field label="Max">
          <input
            type="number"
            min="0"
            placeholder="999999"
            value={get('maxPrice')}
            onChange={(e) => set('maxPrice', e.target.value)}
            className={cn(
              'h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30',
              'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100',
            )}
          />
        </Field>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
        <input
          type="checkbox"
          checked={get('featured') === 'true'}
          onChange={(e) => set('featured', e.target.checked ? 'true' : '')}
          className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
        />
        Featured only
      </label>
    </div>
  );
}
