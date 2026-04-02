import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useShopParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = useCallback((key) => searchParams.get(key) ?? '', [searchParams]);

  const set = useCallback(
    (key, value, options = {}) => {
      const { resetPage = key !== 'page' } = options;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === '' || value === undefined || value === null) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
          if (resetPage) next.set('page', '1');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const resetAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const apiParams = useMemo(() => {
    const o = { limit: 24 };
    const keys = [
      'search',
      'category',
      'brand',
      'size',
      'condition',
      'status',
      'badge',
      'minPrice',
      'maxPrice',
      'featured',
      'sort',
      'page',
    ];
    keys.forEach((k) => {
      const v = searchParams.get(k);
      if (v !== null && v !== '') o[k] = v;
    });
    if (!o.sort) o.sort = 'newest';
    if (!o.page) o.page = '1';
    return o;
  }, [searchParams]);

  return { searchParams, get, set, resetAll, apiParams };
}

