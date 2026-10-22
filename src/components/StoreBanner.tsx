"use client";
import { useMenu } from "@/hooks/useMenu";

export default function StoreBanner() {
  const { menu } = useMenu();
  const { tokoBuka, pengumuman } = menu.settings;
  if (tokoBuka && !pengumuman) return null;
  return (
    <div
      className={`px-5 py-2 text-center text-sm font-medium ${
        tokoBuka ? "bg-sun text-brand-dark" : "bg-brand-dark text-paper"
      }`}
    >
      {!tokoBuka && <strong>Toko sedang tutup. </strong>}
      {pengumuman}
    </div>
  );
}
