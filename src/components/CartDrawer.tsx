"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatRupiah } from "@/lib/whatsapp";
import CartItemList from "./CartItemList";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const { isOpen, setOpen, count, total } = useCart();

  return (
    <>
      {count > 0 && !isOpen && (
        <motion.button
          key={count}
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-paper shadow-lg"
        >
          🛒 {count} item · {formatRupiah(total)}
        </motion.button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bg"
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
        {isOpen && (
          <motion.aside
            key="panel"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-soft px-5 py-4">
              <h2 className="font-display text-xl font-bold text-brand">Keranjang Pesanan</h2>
              <button onClick={() => setOpen(false)} aria-label="Tutup" className="text-2xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <CartItemList />
              <CheckoutForm onDone={() => setOpen(false)} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
