import { useState } from 'react';
import { cn } from '../../utils/cn.js';

export function ProductGallery({ images }) {
  const list = images.filter(Boolean);
  const [active, setActive] = useState(0);

  if (list.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="text-sm font-medium text-neutral-500">No image</span>
      </div>
    );
  }

  const main = list[Math.min(active, list.length - 1)];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <img src={main} alt="" className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>
      {list.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition',
                i === active ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
