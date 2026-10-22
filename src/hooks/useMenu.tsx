"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fallbackMenu } from "@/lib/menu";
import type { MenuData } from "@/types/menu";

interface MenuCtx {
  menu: MenuData;
  loading: boolean;
}

const Ctx = createContext<MenuCtx>({ menu: fallbackMenu, loading: false });

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<MenuData>(fallbackMenu);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => active && setLoading(false), 6000);
    fetch("/api/menu")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: MenuData) => {
        if (active) setMenu(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return <Ctx.Provider value={{ menu, loading }}>{children}</Ctx.Provider>;
}

export const useMenu = () => useContext(Ctx);
