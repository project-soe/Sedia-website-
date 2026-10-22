import { siteConfig } from "@/config/site";
import OpenHours from "./OpenHours";

export default function Footer() {
  return (
    <footer id="lokasi" className="mt-10 scroll-mt-20 bg-brand-dark text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-bold">{siteConfig.name}</h3>
          <p className="mt-2 text-sm opacity-80">{siteConfig.tagline}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p>📍 {siteConfig.address}</p>
          <OpenHours />
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-block pt-2 underline">
            💬 Chat WhatsApp
          </a>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs opacity-60">
        © 2026 {siteConfig.name}. Semua hak dilindungi.
      </p>
    </footer>
  );
}
