import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/hooks/useCart";
import { siteConfig } from "@/config/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Martabak Manis, Kue Basah & Kering`,
  description: `${siteConfig.tagline}. ${siteConfig.address}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${poppins.variable} antialiased`}>
        <CartProvider>
          <Navbar />
        <main>{children}</main>
        <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
