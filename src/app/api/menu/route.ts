import { getMenu } from "@/lib/sheet";

export async function GET(request: Request) {
  new URL(request.url); // membuat jalur ini selalu dijalankan saat ada permintaan
  const data = await getMenu();
  return Response.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
