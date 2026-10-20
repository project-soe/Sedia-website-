"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/types/product";

interface CartCtx {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  total: number;
  setOpen: (v: boolean) => void;
  add: (product: Product, variant?: string) => void;
  changeQty: (key: string, delta: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ajeng-bakery-cart";
export const itemKey = (i: CartItem) => `${i.product.id}|${i.variant ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = useCallback((product: Product, variant?: string) => {
    setItems((prev) => {
      const key = `${product.id}|${variant ?? ""}`;
      if (prev.some((i) => itemKey(i) === key)) {
        return prev.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1, variant }];
    });
  }, []);

  const changeQty = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      setOpen,
      add,
      changeQty,
      clear,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
    }),
    [items, isOpen, add, changeQty, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
