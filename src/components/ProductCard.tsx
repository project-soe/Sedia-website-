"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatRupiah } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

const emoji = { martabak: "🥞", basah: "🍰", kering: "🍪" };

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants?.[0]);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

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
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-sand text-7xl">
        {imgFailed ? (
          emoji[product.category]
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
        {product.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-brown px-3 py-1 text-xs font-semibold text-cream">Best Seller</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-brown">{product.name}</h3>
        <p className="mt-1 text-sm opacity-75">{product.description}</p>
        {product.variants && (
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="mt-3 w-full rounded-xl border border-sand bg-cream px-3 py-2 text-sm"
          >
            {product.variants.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-caramel">{formatRupiah(product.price)}</span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className="rounded-full bg-brown px-4 py-2 text-xs font-semibold text-cream transition hover:bg-choco"
          >
            {added ? "✓ Ditambah" : "+ Tambah"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
