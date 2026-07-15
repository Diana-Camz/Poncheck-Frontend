"use client";
import { CartItem } from "@/features/sales/types/sales.types";
import { ProductItem } from '@/features/sales/types/products.types';
import CartSummary from "./components/cart-summary";
import Products from "./components/products";
import { useState } from "react";
import { toast } from "sonner";


export default function Sale() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState("");
  const [productsResetKey, setProductsResetKey] = useState(0);

  const addToCart = (product: ProductItem) => {
    const price = product.price;
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1, price, }])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + quantity
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const handleConfirmOrder = () => {
    toast.success("Venta realizada correctamente", { position: "top-center" });
    setCart([]);
    setNotes("");
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 p-4 lg:h-[calc(100vh-4rem)] lg:flex-row lg:p-6">
      <div className="block w-1/2 lg:w-3/5 ">
        <Products
          addToCart={addToCart}
          cart={cart}
          setCart={setCart}
          key={productsResetKey}
        />
      </div>

      <CartSummary
        cart={cart}
        cartTotal={cartTotal}
        notes={notes}
        setNotes={setNotes}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onConfirmOrder={handleConfirmOrder}
      />

    </div>
  )
}
