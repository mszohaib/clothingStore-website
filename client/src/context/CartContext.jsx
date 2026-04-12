/* eslint-disable react-refresh/only-export-components -- CartProvider + useCart + lineKey */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getPrimaryImageUrl } from '../utils/product.js';

const STORAGE_KEY = 'railframe-cart';

export function lineKey(slug, size) {
  return `${String(slug ?? '').trim()}::${String(size ?? '').trim()}`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota / private mode */
  }
}

function normalizeLine(line) {
  if (!line || typeof line.slug !== 'string') return null;
  const slug = line.slug.trim();
  if (!slug) return null;
  const size = String(line.size ?? '').trim();
  return {
    ...line,
    slug,
    size,
    title: line.title ?? 'Item',
    price: Number(line.price) || 0,
    qty: Math.max(1, Math.min(99, Number(line.qty) || 1)),
    image_url: getPrimaryImageUrl(line.image_url) || line.image_url || '',
  };
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart().map(normalizeLine).filter(Boolean));

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY || e.newValue == null) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) setItems(parsed.map(normalizeLine).filter(Boolean));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback((product, qty = 1, sizeOverride) => {
    if (!product || typeof product.slug !== 'string' || !product.slug.trim()) return;

    const size = String(sizeOverride ?? product.size ?? '').trim();
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    const image_url = getPrimaryImageUrl(product.image_url);

    setItems((prev) => {
      const k = lineKey(product.slug, size);
      const idx = prev.findIndex((l) => lineKey(l.slug, l.size) === k);
      let next;
      if (idx >= 0) {
        next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + q) };
      } else {
        next = [
          ...prev,
          {
            id: product.id,
            slug: product.slug.trim(),
            title: product.title ?? 'Item',
            price: Number(product.price) || 0,
            image_url,
            category: product.category,
            brand: product.brand,
            size,
            qty: q,
          },
        ];
      }
      persist(next);
      return next;
    });
  }, []);

  /** Single state update for Buy now — avoids clear + add races under Strict Mode. */
  const replaceWithProduct = useCallback((product, qty = 1, sizeOverride) => {
    if (!product || typeof product.slug !== 'string' || !product.slug.trim()) return;

    const size = String(sizeOverride ?? product.size ?? '').trim();
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    const image_url = getPrimaryImageUrl(product.image_url);
    const next = [
      {
        id: product.id,
        slug: product.slug.trim(),
        title: product.title ?? 'Item',
        price: Number(product.price) || 0,
        image_url,
        category: product.category,
        brand: product.brand,
        size,
        qty: q,
      },
    ];
    persist(next);
    setItems(next);
  }, []);

  const setLineQty = useCallback((slug, size, qty) => {
    const q = Math.max(0, Math.min(99, Number(qty) || 0));
    setItems((prev) => {
      let next;
      if (q === 0) next = prev.filter((l) => lineKey(l.slug, l.size) !== lineKey(slug, size));
      else next = prev.map((l) => (lineKey(l.slug, l.size) === lineKey(slug, size) ? { ...l, qty: q } : l));
      persist(next);
      return next;
    });
  }, []);

  const removeLine = useCallback((slug, size) => {
    setItems((prev) => {
      const next = prev.filter((l) => lineKey(l.slug, l.size) !== lineKey(slug, size));
      persist(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
    setItems([]);
  }, []);

  const lineCount = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const subtotal = useMemo(() => items.reduce((s, l) => s + l.price * l.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      replaceWithProduct,
      setLineQty,
      removeLine,
      clearCart,
      lineCount,
      subtotal,
    }),
    [items, addItem, replaceWithProduct, setLineQty, removeLine, clearCart, lineCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
