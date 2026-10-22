import { siteConfig } from "@/config/site";
import { fallbackMenu } from "./menu";
import type { MartabakMenu, MenuData, MenuProduct, Settings } from "@/types/menu";
import type { Category } from "@/types/product";

// ID tiap tab di Google Sheet
const GID = { pengaturan: "101", martabak: "102", produk: "103" };
const CATEGORIES: Category[] = ["martabak", "basah", "kering"];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function fetchCsv(gid: string): Promise<string[][]> {
  const url = `${siteConfig.sheetBaseUrl}?gid=${gid}&single=true&output=csv`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseCsv(await res.text());
}

// "33.000", "Rp 33,000", "33000" semuanya jadi 33000
function parsePrice(v: string | undefined): number {
  const n = Number(String(v ?? "").replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// Dianggap tersedia kecuali tertulis TIDAK
const isYes = (v: string | undefined) => String(v ?? "").trim().toUpperCase() !== "TIDAK";

function parseSettings(rows: string[][]): Settings {
  const map = new Map<string, string>();
  rows.slice(1).forEach((r) => {
    if (r[0]) map.set(r[0].trim().toLowerCase(), (r[1] ?? "").trim());
  });
  return {
    tokoBuka: isYes(map.get("toko_buka")),
    jamBuka: map.get("jam_buka") || siteConfig.openHours,
    pengumuman: map.get("pengumuman") ?? "",
  };
}

function parseMartabak(rows: string[][]): MartabakMenu {
  const header = rows[0]?.map((h) => h.trim()) ?? [];
  let end = header.findIndex((h) => h.toLowerCase() === "tersedia");
  if (end === -1) end = header.length;
  const bases = header.slice(1, end).filter(Boolean);
  if (bases.length === 0) throw new Error("Judul adonan tidak ditemukan");

  const toppings = rows.slice(1).flatMap((r) => {
    const name = (r[0] ?? "").trim();
    if (!name) return [];
    const prices = bases.map((_, i) => parsePrice(r[i + 1]));
    if (prices.some((p) => p === 0)) return []; // harga kosong/salah: baris dilewati
    return [{ name, prices, available: isYes(r[end]) }];
  });
  if (toppings.length === 0) throw new Error("Tidak ada topping yang valid");
  return { name: fallbackMenu.martabak.name, bases, toppings };
}

function parseProducts(rows: string[][]): MenuProduct[] {
  const header = rows[0]?.map((h) => h.trim().toLowerCase()) ?? [];
  const col = (name: string) => header.indexOf(name);
  const cId = col("id");
  const cNama = col("nama");
  const cKat = col("kategori");
  const cHarga = col("harga");
  const cDesk = col("deskripsi");
  const cFoto = col("foto");
  const cTersedia = col("tersedia");
  if (cNama < 0 || cKat < 0 || cHarga < 0) throw new Error("Judul kolom produk tidak sesuai");

  return rows.slice(1).flatMap((r) => {
    const name = (r[cNama] ?? "").trim();
    const category = (r[cKat] ?? "").trim().toLowerCase() as Category;
    const price = parsePrice(r[cHarga]);
    if (!name || !price || !CATEGORIES.includes(category)) return [];
    const id = (r[cId] ?? "").trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const foto = (r[cFoto] ?? "").trim();
    const image =
      foto && !/^https?:/i.test(foto)
        ? foto.startsWith("/") ? foto : `/images/${foto}`
        : `/images/${id}.jpg`;
    return [{
      id,
      name,
      category,
      price,
      description: (r[cDesk] ?? "").trim(),
      image,
      available: isYes(r[cTersedia]),
    }];
  });
}

async function load<T>(gid: string, parse: (rows: string[][]) => T, fallback: T) {
  try {
    return { value: parse(await fetchCsv(gid)), ok: true };
  } catch (err) {
    console.error(`Sheet (gid ${gid}) gagal dibaca, memakai data cadangan:`, err);
    return { value: fallback, ok: false };
  }
}

export async function getMenu(): Promise<MenuData> {
  const [s, m, p] = await Promise.all([
    load(GID.pengaturan, parseSettings, fallbackMenu.settings),
    load(GID.martabak, parseMartabak, fallbackMenu.martabak),
    load(GID.produk, parseProducts, fallbackMenu.products),
  ]);
  return {
    settings: s.value,
    martabak: m.value,
    products: p.value,
    source: s.ok && m.ok && p.ok ? "sheet" : "fallback",
  };
}
