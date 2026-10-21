"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gallery from "@/data/gallery.json";

export default function GalleryGrid() {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const items = gallery.filter((g) => !failed.has(g.src));
  const current = selected !== null ? items[selected] : undefined;

  const markFailed = (src: string) => setFailed((prev) => new Set(prev).add(src));
  const move = (d: number) =>
    setSelected((s) => (s === null ? s : (s + d + items.length) % items.length));

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((g, i) => (
          <motion.button
            key={g.src}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-soft"
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
              onError={() => markFailed(g.src)}
            />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="relative h-[75vh] w-full max-w-3xl">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); move(-1); }}
              aria-label="Sebelumnya"
              className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-paper text-xl text-brand"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); move(1); }}
              aria-label="Berikutnya"
              className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-paper text-xl text-brand"
            >
              ›
            </button>
            <button
              onClick={() => setSelected(null)}
              aria-label="Tutup"
              className="absolute right-3 top-3 h-11 w-11 rounded-full bg-paper text-xl text-brand"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
