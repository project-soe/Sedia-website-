import { siteConfig } from "@/config/site";
import type { CartItem } from "@/types/product";

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export function buildWhatsAppLink(
  items: CartItem[],
  name: string,
  address: string,
  note?: string,
  payment?: string
) {
  const lines = items.map(
    (i, idx) =>
      `${idx + 1}. ${i.product.name}${i.variant ? ` (${i.variant})` : ""} x${i.qty} = ${formatRupiah(i.product.price * i.qty)}`
  );
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const text = [
    `Halo ${siteConfig.name}, saya mau pesan:`,
    ...lines,
    `Total: ${formatRupiah(total)}`,
    payment ? `Pembayaran: ${payment}` : "",
    `Nama: ${name}`,
    `Alamat: ${address}`,
    note ? `Catatan: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
