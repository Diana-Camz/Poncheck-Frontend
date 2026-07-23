import { Product } from "../../products/types/products.types";

export interface CartState{
cart: CartItem[];
paymentMethod: PaymentMethod;
setPaymentMethod: (method: PaymentMethod) => void;
addToCart: (product: Product) => void;
removeFromCart: (productId: number) => void;
updateQuantity: (productId: number, quantity: number) => void;
clearCart: () => void;
}

export type PaymentMethod = "CASH" | "TRANSFER";

export interface CartItem extends Product {
    quantity: number;
}

export type SaleItemRequestDTO = {
  productId: number;
  quantity: number;
};

export type CreateSaleRequestDTO = {
  paymentMethod: PaymentMethod;
  description?: string;
  items: SaleItemRequestDTO[];
  businessId: number;
};