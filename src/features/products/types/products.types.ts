

export type Product = {
  id: number;
  name: string;
  code: string;
  stock: number;
  price: number;
  flavor?: string;
  description?: string;
  active: boolean;
  poncheBase: "MILK" | "WATER" | "WINE" | "MEZCAL" | null;
  productSize: "SMALL" | "MEDIUM" | "LARGE" | null;
  category: string;
}
