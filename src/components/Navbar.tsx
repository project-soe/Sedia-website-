"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/#menu", label: "Menu" },
  { href: "/#lokasi", label: "Lokasi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="font-display text-xl font-bold text-brown">{siteConfig.name}</a>
        <ul className="hidden gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="transition hover:text-caramel">{l.label}</a></li>
          ))}
        </ul>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="text-2xl md:hidden">
          {open ? "✕" : "☰"}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-sand px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">{l.label}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
