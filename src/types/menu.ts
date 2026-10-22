import type { Product } from "./product";

export interface Settings {
  tokoBuka: boolean;
  jamBuka: string;
  pengumuman: string;
}

export interface MartabakTopping {
  name: string;
  prices: number[]; // urutan sama dengan bases
  available: boolean;
}

export interface MartabakMenu {
  name: string;
  bases: string[];
  toppings: MartabakTopping[];
}

export interface MenuProduct extends Product {
  available: boolean;
}

export interface MenuData {
  settings: Settings;
  martabak: MartabakMenu;
  products: MenuProduct[];
  source: "sheet" | "fallback";
}
