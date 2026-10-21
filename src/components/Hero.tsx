"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Hero() {
  const wa = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo ${siteConfig.name}, saya mau pesan martabak manis`)}`;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
      <div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-3 text-sm font-semibold tracking-widest text-accent">
          BEST SELLER KAMI
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight text-brand md:text-6xl"
        >
          Martabak Manis Tebal, Lembut & Manisnya Pas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-5 max-w-md text-base opacity-80"
        >
          {siteConfig.tagline}. Dibuat segar setiap hari di Way Kanan.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition hover:scale-105 hover:bg-brand-dark">
            Pesan via WhatsApp
          </a>
          <a href="#menu" className="rounded-full border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-paper">
            Lihat Menu
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
        className="flex h-72 items-center justify-center rounded-[3rem] bg-soft md:h-96"
      >
        <motion.span
          animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-[9rem] md:text-[12rem]"
        >
          🥞
        </motion.span>
      </motion.div>
    </section>
  );
}
