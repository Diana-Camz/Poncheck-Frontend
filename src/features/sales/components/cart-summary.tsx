"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card'
import { ArrowRightLeftIcon, Coins, ShoppingCart, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { selectTotalItems, selectTotalPrice, useCartStore } from '../store/sales.store';
import CartItem from "./cart-item";
import { AppButton } from '@/components/shared/app-button';
import { useCreateSale } from '../hooks/useSale';

type CartSummaryProps = {
    onConfirmOrder: () => void;
}


export default function CartSummary({
    onConfirmOrder,
}: CartSummaryProps) {
    const cart = useCartStore(state => state.cart);
    const createSale = useCreateSale();
    const paymentMethod = useCartStore(state => state.paymentMethod);
    const setPaymentMethod = useCartStore(state => state.setPaymentMethod);
    const setDescription = useCartStore(state => state.setDescription);
    const description = useCartStore(state => state.description);
    const clearCart = useCartStore(state => state.clearCart)
    const totalItems = useCartStore(selectTotalItems);
    const cartTotal = useCartStore(selectTotalPrice);

    return (
        <Card className="flex flex-col bg-card shadow-sm lg:w-2/5 ">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border pb-3">
                <CardTitle className="flex min-w-0 items-center gap-2 text-lg">
                    <ShoppingCart className="h-5 w-5 shrink-0" />
                    <span className="truncate">Carrito</span>
                    {cart.length > 0 && (
                        <span className="rounded-full bg-brown/10 px-2 py-0.5 text-sm font-medium text-brown">
                            {totalItems}
                        </span>
                    )}
                </CardTitle>
                {cart.length > 0 && (
                    <AppButton
                        className="h-7 shrink-0 cursor-pointer border-destructive/30 px-2 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive sm:px-3"
                        leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                        variant="outline"
                        onClick={() => clearCart()}
                    >
                        Vaciar
                    </AppButton>
                )}
            </CardHeader>
            <CardContent className="min-h-0 flex-1 flex flex-col p-4 pb-0">
                {cart.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-2 text-muted-foreground">Carrito vacío</p>
                        <p className="text-sm text-muted-foreground">Selecciona productos para comenzar</p>
                    </div>
                ) : (
                    <div className="flex min-h-0 flex-1 flex-col gap-4">
                        <div className="flex min-h-0 flex-1 flex-col">
                            <p className="mb-3 shrink-0 font-medium text-lg border-b">Productos:</p>
                            <div className="min-h-0 flex-1 space-y-2 pr-1 overflow-y-auto scrollbar-thin ">
                                {cart.map((item) =>
                                    <CartItem key={item.id} item={item} />
                                )}
                            </div>
                        </div>
                        <div className='shrink-0'>
                            <div>
                                <p className="mb-3 font-medium text-lg border-b">Observaciones:</p>
                                <Textarea
                                    value={description}
                                    autoFocus
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="min-h-15 resize-none"
                                    placeholder="Agrega notas para esta venta"
                                />
                            </div>
                            <div className="flex mt-3 justify-between">
                                <div className="mr-2 w-1/2">
                                    <AppButton
                                        className={`w-full h-11 text-sm font-semibold xl:h-12 xl:text-base text-secondary-foreground border-border bg-background/50 hover:bg-background/20 hover:text-foreground cursor-pointer
                                            ${paymentMethod === "CASH"
                                                ? "border-brown bg-brown/30 hover:bg-brown/30"
                                                : ""
                                            }
                                            `}

                                        leftIcon={<Coins className="mr-2 h-5 w-5 text-brown" />}
                                        onClick={() => {
                                            setPaymentMethod("CASH");
                                        }}
                                    >

                                        Efectivo
                                    </AppButton>
                                </div>
                                <div className="ml-2 w-1/2">
                                    <AppButton
                                        className={`w-full h-11 text-sm font-semibold xl:h-12 xl:text-base text-secondary-foreground border-border bg-background/50 hover:bg-background/20 hover:text-foreground cursor-pointer 
                                            ${paymentMethod === "TRANSFER"
                                                ? "border-brown bg-brown/30 hover:bg-brown/30"
                                                : ""
                                            }`}
                                        leftIcon={<ArrowRightLeftIcon className="mr-2 h-5 w-5 text-brown" />}
                                        onClick={() => {
                                            setPaymentMethod("TRANSFER");
                                        }}
                                    >

                                        Transferencia
                                    </AppButton>
                                </div>
                            </div>
                            <div className="border-border pt-4">
                                <div className="border-b mb-4 flex items-center justify-between">
                                    <span className="text-xl font-semibold text-foreground">Total</span>
                                    <span className="text-3xl font-bold text-primary">{(cartTotal).toLocaleString("es-MX", {
                                        style: "currency",
                                        currency: "MXN",
                                    })}</span>
                                </div>
                                <Button
                                    className="w-full h-11 text-sm font-semibold xl:h-12 xl:text-[1.1rem] text-foreground  border-brown/80 bg-brown/80 hover:bg-brown/60 cursor-pointer"
                                    onClick={onConfirmOrder}
                                    disabled={createSale.isPending || cart.length === 0}
                                >
                                    {createSale.isPending ? "Procesando..." : "Confirmar Compra"}
                                </Button>
                            </div>
                        </div>
                    </div>

                )}
            </CardContent>
        </Card>
    )
}