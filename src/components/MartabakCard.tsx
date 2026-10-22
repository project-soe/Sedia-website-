"use client";
import { useState } from "react";
import MartabakPhoto from "./MartabakPhoto";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { formatRupiah } from "@/lib/whatsapp";
import { slugify } from "@/lib/menu";
import type { Product } from "@/types/product";

export default function MartabakCard() {
  const { add } = useCart();
  const { menu } = useMenu();
  const data = menu.martabak;
  const [base, setBase] = useState(0);
  const [top, setTop] = useState(0);
  const [added, setAdded] = useState(false);

  const baseIdx = Math.min(base, data.bases.length - 1);
  const firstAvail = data.toppings.findIndex((t) => t.available);
  const topIdx = data.toppings[top]?.available ? top : firstAvail;
  const topping = data.toppings[topIdx];
  const closed = !menu.settings.tokoBuka;
  const canOrder = !closed && topping !== undefined;
  const price = topping?.prices[baseIdx] ?? 0;
  const baseSlug = slugify(data.bases[baseIdx] ?? "");
  const photoCandidates = topping
    ? [
        `/images/martabak/kombinasi/${slugify(topping.name)}-${baseSlug}.jpg`,
        `/images/martabak/adonan/${baseSlug}.jpg`,
        topping.image,
        "/images/martabak-manis.jpg",
      ]
    : ["/images/martabak-manis.jpg"];

  function handleAdd() {
    if (!topping) return;
    const product: Product = {
      id: "martabak-manis-gincing",
      name: data.name,
      category: "martabak",
      price,
      description: "",
      image: topping.image,
    };
    add(product, `${data.bases[baseIdx]} • ${topping.name}`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-soft sm:col-span-2 lg:col-span-3 md:grid md:grid-cols-2"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-soft text-8xl md:h-auto md:min-h-80">
        <MartabakPhoto candidates={photoCandidates} alt={data.name} />
        <span className="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-xs font-semibold text-brand-dark">Best Seller</span>
      </div>
      <div className="p-5 md:p-8">
        <h3 className="font-display text-2xl font-bold text-brand">{data.name}</h3>
        <p className="mt-4 text-sm font-semibold">Pilih adonan</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.bases.map((b, i) => (
            <button
              key={b}
              onClick={() => setBase(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                baseIdx === i ? "bg-brand text-paper" : "bg-soft text-brand hover:bg-accent hover:text-paper"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold">Pilih topping</p>
        <select
          value={topIdx}
          onChange={(e) => setTop(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-soft bg-paper px-3 py-3 text-sm"
        >
          {data.toppings.map((t, i) => (
            <option key={t.name} value={i} disabled={!t.available}>
              {t.name} — {t.available ? formatRupiah(t.prices[baseIdx]) : "Habis"}
            </option>
          ))}
        </select>
        <div className="mt-6 flex items-center justify-between">
          <motion.span
            key={price}
            initial={{ scale: 1.15, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-accent"
          >
            {topping ? formatRupiah(price) : "-"}
          </motion.span>
          <motion.button
            whileTap={canOrder ? { scale: 0.92 } : undefined}
            disabled={!canOrder}
            onClick={handleAdd}
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {closed ? "Toko tutup" : !topping ? "Habis" : added ? "✓ Ditambah" : "+ Tambah"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
