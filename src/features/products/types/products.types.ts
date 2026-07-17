export type ProductItem = {
    id: string;
    name: string;
    code: string;
    stock: number;
    price: number;
    flavor?: string;
    description?: string;
    active: boolean;
    poncheBase: "WINE" | "MILK" | "WATER" | null;
    productSize: "SMALL" | "MEDIUM" | "LARGE" | null;
    category: string;
}

export type Category = {
  id: string;
  name: string;
  active: boolean;
};