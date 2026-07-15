"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '@/features/sales/types/sales.types';
import { Textarea } from '@/components/ui/textarea';

type CartSummaryProps = {
    cart: CartItem[];
    cartTotal: number;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    onConfirmOrder: () => void;
}


export default function CartSummary({
    cart,
    cartTotal,
    notes,
    setNotes,
    updateQuantity,
    removeFromCart,
    onConfirmOrder,
}: CartSummaryProps) {

    return (
        <Card className="flex flex-col bg-card shadow-sm lg:w-2/5 ">
            <CardHeader className="border-b border-border pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ShoppingCart className="h-5 w-5" />
                    Carrito
                    {cart.length > 0 && (
                        <span className="rounded-full bg-brown/10 px-2 py-0.5 text-sm font-medium text-brown">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-0 flex-1 flex flex-wrap gap-4 gap-x-7 pt-1.5 pb-3 justify-start overflow-y-auto scrollbar-thin ">
                {cart.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-2 text-muted-foreground">Carrito vacío</p>
                        <p className="text-sm text-muted-foreground">Selecciona productos para comenzar</p>
                    </div>
                ) : (
                    <div className="flex min-h-0 flex-1 flex-col gap-4">
                        <div className="flex min-h-0 flex-1 flex-col">
                            
                            <div className="min-h-0 flex-1 space-y-2 pr-1 overflow-y-auto scrollbar-thin ">
                                {cart.map((item: CartItem) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-lg border border-border bg-chart-7 py-2 px-2 hover:bg-chart-7/40 "
                                    >
                                        <div className="min-w-0 flex flex-1 items-center gap-2">
                                            <div className="flex w-full items-center gap-3">
                                                <p className="text-[1rem] font-medium text-foreground line-clamp-3">{item.name}</p>
                                            </div>
                                            <div className="flex w-full gap-9 justify-center items-center">
                                                <p className="text-[1rem] text-muted-foreground font-semibold">{(item.price).toLocaleString("es-MX", {
                                                    style: "currency",
                                                    currency: "MXN",
                                                })}</p>
                                                <p className="text-[1rem] text-brown font-semibold">{(item.price * item.quantity).toLocaleString("es-MX", {
                                                    style: "currency",
                                                    currency: "MXN",
                                                })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="icon"
                                                className="h-8 w-8 border-brown/10 bg-brown/5 hover:bg-brown/10 dark:bg-input/50 cursor-pointer active:scale-80 transition duration-120"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus className="h-3 w-3 text-brown" />
                                            </Button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <Button
                                                size="icon"
                                                className="h-8 w-8 border-brown/10 bg-brown/5 hover:bg-brown/10 dark:bg-input/50 cursor-pointer active:scale-80 transition duration-120"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-3 w-3 text-brown" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 hover:bg-input/90 cursor-pointer"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="size-5" color={"var(--destructive)"} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='shrink-0'>
                            <div>
                                <p className="mb-3 font-medium text-lg border-b">Observaciones:</p>
                                <Textarea
                                    value={notes}
                                    autoFocus
                                    onChange={(event) => setNotes(event.target.value)}
                                    className="min-h-24 resize-none"
                                    placeholder="Agrega notas para esta venta"
                                />
                            </div>
                            <div className="mt-3 border-border pt-4">
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
                                >
                                    Confirmar Orden
                                </Button>
                            </div>
                        </div>
                    </div>

                )}
            </CardContent>
        </Card>
    )
}
