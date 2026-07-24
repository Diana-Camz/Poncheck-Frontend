import { Product } from "@/features/products/types/products.types";
import { create } from "zustand";
import { persist } from "zustand/middleware"
import { CartState } from "../types/sales.types";

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            paymentMethod: "CASH",
            description: "",
            setDescription: (description) => set({description}),
            setPaymentMethod: (paymentMethod) => 
                set({
                    paymentMethod,
                }),
            addToCart: (product: Product) => {
                const cart = get().cart;
                const price = product.price;
                const existingItem = get().cart.find(item => item.id === product.id)
                if (existingItem) {
                    set({
                        cart: cart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    })
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1, price }] })
                }
            },
            removeFromCart: (productId: number) => {
                set({ cart: get().cart.filter((item) => item.id !== productId) })
            },
            updateQuantity: (productId: number, quantity: number) => {
                set({
                    cart: get().cart.map((item) => {
                        if (item.id === productId) {
                            const newQuantity = item.quantity + quantity
                            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
                        }
                        return item
                    })
                })
            },
            clearCart: () => set({ cart: [] })
        }), {
        name: 'cart-storage',
        partialize: state => ({ cart: state.cart })
    }
    )
);

export const selectTotalItems = (state: CartState) =>
    state.cart.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
    state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);