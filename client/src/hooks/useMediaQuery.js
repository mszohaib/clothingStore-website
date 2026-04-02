import { useSyncExternalStore } from 'react';

function subscribe(query, onStoreChange) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
