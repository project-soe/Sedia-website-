"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "@/data/products.json";
import type { Category, Product } from "@/types/product";

const tabs: { key: Category | "semua"; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "martabak", label: "Martabak" },
  { key: "basah", label: "Kue Basah" },
  { key: "kering", label: "Kue Kering" },
];

export default function MenuSection() {
  const [active, setActive] = useState<Category | "semua">("semua");
  const list = (products as Product[])
    .filter((p) => active === "semua" || p.category === active)
    .sort((a, b) => Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false));

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <h2 className="text-center font-display text-3xl font-bold text-brown md:text-4xl">Menu Kami</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === t.key ? "bg-brown text-cream" : "bg-sand text-brown hover:bg-caramel hover:text-cream"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
