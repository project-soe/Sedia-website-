export interface MartabakTopping {
  name: string;
  prices: number[]; // urutan sama dengan bases
}

export interface MartabakMenu {
  name: string;
  bases: string[];
  toppings: MartabakTopping[];
}
