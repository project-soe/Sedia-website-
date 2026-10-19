export type Category = "martabak" | "basah" | "kering";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  bestSeller?: boolean;
  variants?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
  variant?: string;
}
