/* eslint-disable react-refresh/only-export-components -- CartProvider + useCart + lineKey */
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'thriftverse-cart';

export function lineKey(slug, size) {
  return `${slug}::${size ?? ''}`;
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

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

let listeners = [];
let cart = loadCart();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return cart;
}

function getServerSnapshot() {
  return [];
}

function setCart(next) {
  cart = typeof next === 'function' ? next(cart) : next;
  saveCart(cart);
  emit();
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((product, qty = 1, sizeOverride) => {
    const size = sizeOverride ?? product.size ?? '';
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    setCart((prev) => {
      const k = lineKey(product.slug, size);
      const idx = prev.findIndex((l) => lineKey(l.slug, l.size) === k);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + q) };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: Number(product.price),
          image_url: product.image_url,
          category: product.category,
          brand: product.brand,
          size,
          qty: q,
        },
      ];
    });
  }, []);

  const setLineQty = useCallback((slug, size, qty) => {
    const q = Math.max(0, Math.min(99, Number(qty) || 0));
    setCart((prev) => {
      if (q === 0) return prev.filter((l) => lineKey(l.slug, l.size) !== lineKey(slug, size));
      return prev.map((l) => (lineKey(l.slug, l.size) === lineKey(slug, size) ? { ...l, qty: q } : l));
    });
  }, []);

  const removeLine = useCallback((slug, size) => {
    setCart((prev) => prev.filter((l) => lineKey(l.slug, l.size) !== lineKey(slug, size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const lineCount = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const subtotal = useMemo(() => items.reduce((s, l) => s + l.price * l.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      lineCount,
      subtotal,
    }),
    [items, addItem, setLineQty, removeLine, clearCart, lineCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
