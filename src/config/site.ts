export const siteConfig = {
  sheetBaseUrl: process.env.SHEET_BASE_URL ?? "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4WM6PPCnKZ91B0lMZowZP8jUjp9WfjZvso4rNvqSN4iaqI3G9-z0KxpyLWSlBTyM4292yZidl71tN/pub",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "Ajeng Bakery",
  tagline: "Kue basah & kering, martabak manis favorit warga",
  address: "Lebak Peniangan, Rebang Tangkas, Way Kanan",
  whatsapp: "6281274709805", // GANTI dengan nomor WA toko (format 62...)
  openHours: "Setiap hari, 08.00 - 21.00",
};
