import type { Metadata } from "next";
import { about } from "@/data/about";
import { siteConfig } from "@/config/site";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Kenali ${siteConfig.name}, toko kue di ${siteConfig.address}.`,
};

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-center font-display text-4xl font-bold text-brown md:text-5xl">{about.heading}</h1>
      <div className="mx-auto mt-8 max-w-2xl space-y-4 text-center text-base leading-relaxed opacity-90">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {about.highlights.map((h) => (
          <div key={h.title} className="rounded-3xl bg-white p-6 text-center ring-1 ring-sand transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-4xl">{h.icon}</div>
            <h2 className="mt-3 font-display text-lg font-bold text-brown">{h.title}</h2>
            <p className="mt-1 text-sm opacity-75">{h.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-center font-display text-3xl font-bold text-brown">Galeri</h2>
      <div className="mt-8">
        <GalleryGrid />
      </div>

      <div className="mt-14 text-center">
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-brown px-8 py-3 text-sm font-semibold text-cream transition hover:scale-105 hover:bg-choco"
        >
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
