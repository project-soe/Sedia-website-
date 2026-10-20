"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { buildWhatsAppLink, formatRupiah } from "@/lib/whatsapp";

const input = "w-full rounded-xl border border-sand bg-white px-4 py-2 text-sm outline-none focus:border-caramel";

export default function CheckoutForm({ onDone }: { onDone: () => void }) {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"antar" | "ambil">("antar");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  if (items.length === 0) return null;

  function send() {
    if (!name.trim()) return setError("Nama wajib diisi.");
    if (mode === "antar" && !address.trim()) return setError("Alamat pengantaran wajib diisi.");
    const link = buildWhatsAppLink(items, name.trim(), mode === "antar" ? address.trim() : "Ambil di toko", note.trim());
    window.open(link, "_blank", "noopener,noreferrer");
    clear();
    setError("");
    onDone();
  }

  return (
    <div className="mt-5 space-y-3">
      <input className={input} placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex gap-2">
        {(["antar", "ambil"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full py-2 text-sm font-medium ${mode === m ? "bg-brown text-cream" : "bg-sand text-brown"}`}
          >
            {m === "antar" ? "Diantar" : "Ambil di toko"}
          </button>
        ))}
      </div>
      {mode === "antar" && (
        <textarea className={input} rows={2} placeholder="Alamat pengantaran" value={address} onChange={(e) => setAddress(e.target.value)} />
      )}
      <input className={input} placeholder="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-between pt-2 font-semibold">
        <span>Total</span>
        <span className="text-brown">{formatRupiah(total)}</span>
      </div>
      <button onClick={send} className="w-full rounded-full bg-brown py-3 font-semibold text-cream transition hover:bg-choco">
        Kirim Pesanan via WhatsApp
      </button>
    </div>
  );
}
