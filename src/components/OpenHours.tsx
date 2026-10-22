"use client";
import { useMenu } from "@/hooks/useMenu";

export default function OpenHours() {
  const { menu } = useMenu();
  return <p>🕗 {menu.settings.jamBuka}</p>;
}
