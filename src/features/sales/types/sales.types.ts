import { UserSaleResponse } from "@/features/users/types/users.types";
import { Product, ProductSaleResponse } from "../../products/types/products.types";

export interface CartState {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  description: string;
  setDescription: (description: string) => void; 
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

export type CreateSaleResponse = {
  id: number,
  total: number,
  paymentMethod: PaymentMethod,
  date: Date,
  description: string,
  user: UserSaleResponse,
  items: SaleItemsResponse[],
  cancelled?: CancelledSaleResponse
}

export type SaleItemsResponse = {
  itemId: number,
  product: ProductSaleResponse,
  quantity: number,
  unitPrice: number,
  subtotal: number
}

export type CancelledSaleResponse = {
  userId: number,
  date: Date,
  reason: string
}