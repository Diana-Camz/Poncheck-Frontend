"use client";

import { CreateSaleRequestDTO } from "@/features/sales/types/sales.types";
import CartSummary from "@/features/sales/components/cart-summary";
import Products from "@/features/sales/components/products";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/features/sales/store/sales.store";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCreateSale } from "@/features/sales/hooks/useSale";


export default function NewSale() {
  const { user } = useAuthStore();

  const [productsResetKey, setProductsResetKey] = useState(0);
  const cart = useCartStore(state => state.cart);
  const paymentMethod = useCartStore(state => state.paymentMethod);
  const description = useCartStore(state => state.description);

  const createSale = useCreateSale();

  if (!user) {
    return null;
  }

  const handleConfirmOrder = () => {
    if (!user?.business?.id) {
      toast.error("No se encontró el negocio asociado al usuario");
      return;
    }

    const salePayload: CreateSaleRequestDTO = {
      paymentMethod,
      description: description,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      })),
      businessId: user.business.id
    }
    createSale.mutate(salePayload);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 p-4 lg:h-[calc(100vh-4rem)] lg:flex-row lg:p-6">
      <div className="block w-1/2 lg:w-3/5 ">
        <Products
          key={productsResetKey}
        />
      </div>

      <CartSummary
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  )
}