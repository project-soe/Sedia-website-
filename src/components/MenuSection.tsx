"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import MartabakCard from "./MartabakCard";
import { useMenu } from "@/hooks/useMenu";
import type { Category } from "@/types/product";

const labels: Record<Category, string> = {
  martabak: "Martabak",
  basah: "Kue Basah",
  kering: "Kue Kering",
};

export default function MenuSection() {
  const { menu, loading } = useMenu();
  const [active, setActive] = useState<Category | "semua">("semua");

  const present = new Set<Category>(["martabak", ...menu.products.map((p) => p.category)]);
  const tabs: { key: Category | "semua"; label: string }[] = [
    { key: "semua", label: "Semua" },
    ...(Object.keys(labels) as Category[])
      .filter((c) => present.has(c))
      .map((c) => ({ key: c, label: labels[c] })),
  ];
  const current = active === "semua" || present.has(active) ? active : "semua";
  const list = menu.products.filter((p) => current === "semua" || p.category === current);
  const showMartabak = current === "semua" || current === "martabak";

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <h2 className="text-center font-display text-3xl font-bold text-brand md:text-4xl">Menu Kami</h2>
      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-soft" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  current === t.key ? "bg-brand text-paper" : "bg-soft text-brand hover:bg-accent hover:text-paper"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div key={current} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showMartabak && <MartabakCard />}
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
