"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { buildWhatsAppLink, formatRupiah } from "@/lib/whatsapp";

const input = "w-full rounded-xl border border-soft bg-white px-4 py-2 text-sm outline-none focus:border-accent";
const choice = (on: boolean) =>
  `flex-1 rounded-full py-2 text-sm font-medium ${on ? "bg-brand text-paper" : "bg-soft text-brand"}`;

export default function CheckoutForm({ onDone }: { onDone: () => void }) {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"antar" | "ambil">("antar");
  const [pay, setPay] = useState<"tunai" | "qris">("tunai");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [qrisFailed, setQrisFailed] = useState(false);

  if (items.length === 0) return null;

  function send() {
    if (!name.trim()) return setError("Nama wajib diisi.");
    if (mode === "antar" && !address.trim()) return setError("Alamat pengantaran wajib diisi.");
    const payment =
      pay === "qris" ? "QRIS (bukti bayar saya kirim di chat ini)" : "Tunai / bayar di tempat";
    const link = buildWhatsAppLink(
      items,
      name.trim(),
      mode === "antar" ? address.trim() : "Ambil di toko",
      note.trim(),
      payment
    );
    window.open(link, "_blank", "noopener,noreferrer");
    clear();
    setError("");
    onDone();
  }

  return (
    <div className="mt-5 space-y-3">
      <input className={input} placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={() => setMode("antar")} className={choice(mode === "antar")}>Diantar</button>
        <button onClick={() => setMode("ambil")} className={choice(mode === "ambil")}>Ambil di toko</button>
      </div>
      {mode === "antar" && (
        <textarea className={input} rows={2} placeholder="Alamat pengantaran" value={address} onChange={(e) => setAddress(e.target.value)} />
      )}
      <input className={input} placeholder="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />

      <p className="pt-1 text-sm font-semibold">Pembayaran</p>
      <div className="flex gap-2">
        <button onClick={() => setPay("tunai")} className={choice(pay === "tunai")}>Tunai</button>
        <button onClick={() => setPay("qris")} className={choice(pay === "qris")}>QRIS</button>
      </div>
      {pay === "qris" && (
        <div className="rounded-2xl bg-white p-4 text-center ring-1 ring-soft">
          {qrisFailed ? (
            <p className="text-sm">Kode QRIS akan dikirim lewat WhatsApp setelah pesananmu masuk.</p>
          ) : (
            <div className="relative mx-auto h-64 w-64">
              <Image
                src="/images/qris.jpg"
                alt="Kode QRIS Ajeng Bakery"
                fill
                sizes="256px"
                className="object-contain"
                onError={() => setQrisFailed(true)}
              />
            </div>
          )}
          <p className="mt-3 text-sm">
            Bayar sebesar <strong>{formatRupiah(total)}</strong>, lalu kirim bukti bayar lewat WhatsApp.
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-between pt-2 font-semibold">
        <span>Total</span>
        <span className="text-brand">{formatRupiah(total)}</span>
      </div>
      <button onClick={send} className="w-full rounded-full bg-brand py-3 font-semibold text-paper transition hover:bg-brand-dark">
        Kirim Pesanan via WhatsApp
      </button>
    </div>
  );
}
