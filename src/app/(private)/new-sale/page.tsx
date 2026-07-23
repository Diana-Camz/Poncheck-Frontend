"use client";

import { CreateSaleRequestDTO } from "@/features/sales/types/sales.types";
import CartSummary from "@/features/sales/components/cart-summary";
import Products from "@/features/sales/components/products";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/features/sales/store/sales.store";
import { useAuthStore } from "@/features/auth/store/auth.store";


export default function NewSale() {
  const { user } = useAuthStore();

  const [notes, setNotes] = useState("");
  const [productsResetKey, setProductsResetKey] = useState(0);

  const clearCart = useCartStore(state => state.clearCart);
  const cart = useCartStore(state => state.cart);
  const paymentMethod = useCartStore(state => state.paymentMethod);

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
      description: notes,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      })),
      businessId: user.business.id
    }
    console.log(JSON.stringify(salePayload, null, 2));
    toast.success("Venta realizada correctamente", { position: "top-center" });
    clearCart();
    setNotes("");
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 p-4 lg:h-[calc(100vh-4rem)] lg:flex-row lg:p-6">
      <div className="block w-1/2 lg:w-3/5 ">
        <Products
          key={productsResetKey}
        />
      </div>

      <CartSummary
        notes={notes}
        setNotes={setNotes}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  )
}