"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatRupiah } from "@/lib/whatsapp";
import menu from "@/data/martabak-manis.json";
import type { MartabakMenu } from "@/types/martabak";
import type { Product } from "@/types/product";

const data = menu as MartabakMenu;

export default function MartabakCard() {
  const { add } = useCart();
  const [base, setBase] = useState(0);
  const [top, setTop] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const price = data.toppings[top].prices[base];

  function handleAdd() {
    const product: Product = {
      id: "martabak-manis-gincing",
      name: data.name,
      category: "martabak",
      price,
      description: "",
      image: "/images/martabak-manis.jpg",
    };
    add(product, `${data.bases[base]} • ${data.toppings[top].name}`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand sm:col-span-2 lg:col-span-3 md:grid md:grid-cols-2"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-sand text-8xl md:h-auto md:min-h-80">
        {imgFailed ? (
          "🥞"
        ) : (
          <Image
            src="/images/martabak-manis.jpg"
            alt={data.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-brown px-3 py-1 text-xs font-semibold text-cream">Best Seller</span>
      </div>
      <div className="p-5 md:p-8">
        <h3 className="font-display text-2xl font-bold text-brown">{data.name}</h3>
        <p className="mt-4 text-sm font-semibold">Pilih adonan</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.bases.map((b, i) => (
            <button
              key={b}
              onClick={() => setBase(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                base === i ? "bg-brown text-cream" : "bg-sand text-brown hover:bg-caramel hover:text-cream"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold">Pilih topping</p>
        <select
          value={top}
          onChange={(e) => setTop(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-sand bg-cream px-3 py-3 text-sm"
        >
          {data.toppings.map((t, i) => (
            <option key={t.name} value={i}>
              {t.name} — {formatRupiah(t.prices[base])}
            </option>
          ))}
        </select>
        <div className="mt-6 flex items-center justify-between">
          <motion.span
            key={price}
            initial={{ scale: 1.15, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-caramel"
          >
            {formatRupiah(price)}
          </motion.span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className="rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream transition hover:bg-choco"
          >
            {added ? "✓ Ditambah" : "+ Tambah"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
