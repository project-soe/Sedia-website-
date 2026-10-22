import martabakJson from "@/data/martabak-manis.json";
import productsJson from "@/data/products.json";
import { siteConfig } from "@/config/site";
import type { MenuData } from "@/types/menu";
import type { Product } from "@/types/product";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Data cadangan: dipakai kalau Google Sheet tidak bisa dibaca.
export const fallbackMenu: MenuData = {
  settings: { tokoBuka: true, jamBuka: siteConfig.openHours, pengumuman: "" },
  martabak: {
    name: martabakJson.name,
    bases: martabakJson.bases,
    toppings: martabakJson.toppings.map((t) => ({
      ...t,
      available: true,
      image: `/images/martabak/${slugify(t.name)}.jpg`,
    })),
  },
  products: (productsJson as Product[]).map((p) => ({ ...p, available: true })),
  source: "fallback",
};
