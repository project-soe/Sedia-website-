"use client";
import { itemKey, useCart } from "@/hooks/useCart";
import { formatRupiah } from "@/lib/whatsapp";

export default function CartItemList() {
  const { items, changeQty } = useCart();
  if (items.length === 0) {
    return <p className="text-center opacity-70">Keranjang masih kosong.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={itemKey(i)} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 ring-1 ring-soft">
          <div>
            <p className="text-sm font-semibold text-brand">{i.product.name}</p>
            {i.variant && <p className="text-xs opacity-70">{i.variant}</p>}
            <p className="text-sm text-accent">{formatRupiah(i.product.price * i.qty)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => changeQty(itemKey(i), -1)} className="h-8 w-8 rounded-full bg-soft font-bold">−</button>
            <span className="w-5 text-center text-sm">{i.qty}</span>
            <button onClick={() => changeQty(itemKey(i), 1)} className="h-8 w-8 rounded-full bg-brand font-bold text-paper">+</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
