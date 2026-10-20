import { siteConfig } from "@/config/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.url,
    telephone: `+${siteConfig.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lebak Peniangan, Rebang Tangkas",
      addressLocality: "Way Kanan",
      addressRegion: "Lampung",
      addressCountry: "ID",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
