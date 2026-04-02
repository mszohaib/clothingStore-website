import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterFields } from './FilterFields.jsx';
import { Button } from '../ui/Button.jsx';
import { IconButton } from '../ui/IconButton.jsx';

export function FilterDrawer({ open, onClose, get, set, onReset }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-[min(100vw-2rem,22rem)] flex-col border-l border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <IconButton label="Close" onClick={onClose}>
                <X className="h-5 w-5" strokeWidth={1.75} />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <FilterFields get={get} set={set} />
            </div>
            <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex gap-2">
                <Button type="button" variant="secondary" className="flex-1" onClick={onReset}>
                  Clear all
                </Button>
                <Button type="button" className="flex-1" onClick={onClose}>
                  Apply
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
