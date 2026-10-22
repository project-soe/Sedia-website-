"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { formatRupiah } from "@/lib/whatsapp";
import type { MenuProduct } from "@/types/menu";

const emoji = { martabak: "🥞", basah: "🍰", kering: "🍪" };

export default function ProductCard({ product, index }: { product: MenuProduct; index: number }) {
  const { add } = useCart();
  const { menu } = useMenu();
  const [variant, setVariant] = useState(product.variants?.[0]);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const closed = !menu.settings.tokoBuka;
  const canOrder = product.available && !closed;

  function handleAdd() {
    add(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-soft"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-soft text-7xl">
        {imgFailed ? (
          emoji[product.category]
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${product.available ? "" : "grayscale"}`}
            onError={() => setImgFailed(true)}
          />
        )}
        {product.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-xs font-semibold text-brand-dark">Best Seller</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-brand">{product.name}</h3>
        <p className="mt-1 text-sm opacity-75">{product.description}</p>
        {product.variants && (
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="mt-3 w-full rounded-xl border border-soft bg-paper px-3 py-2 text-sm"
          >
            {product.variants.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-accent">{formatRupiah(product.price)}</span>
          <motion.button
            whileTap={canOrder ? { scale: 0.92 } : undefined}
            disabled={!canOrder}
            onClick={handleAdd}
            className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-paper transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {closed ? "Toko tutup" : !product.available ? "Habis" : added ? "✓ Ditambah" : "+ Tambah"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
