"use client";

import { Banknote, CreditCard, Landmark, Pencil, ReceiptText, X } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SaleResponse } from "../types/sales.types";
import { formatSaleCurrency, salePaymentLabels } from "../utils/sales-presentation";

const poncheBaseLabels = {
    MILK: "LECHE",
    WATER: "AGUA",
    WINE: "VINO TINTO",
    MEZCAL: "MEZCAL",
};

const productSizeLabels: Record<string, string> = {
    SMALL: "CHICO",
    MEDIUM: "MEDIANO",
    LARGE: "GRANDE",
};

export default function SaleItem({ item }: { item: SaleResponse }) {
    const date = new Date(item.date);
    const formattedDate = Number.isNaN(date.getTime()) ? "Fecha no disponible" : new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
    const PaymentIcon = item.paymentMethod === "CASH" ? Banknote : String(item.paymentMethod) === "CARD" ? CreditCard : Landmark;
    const quantity = item.items.reduce((total, product) => total + product.quantity, 0);

    return (
        <AccordionItem value={String(item.id)} className="overflow-hidden rounded-xl border border-border bg-card not-last:border-b">
            <div className="flex items-center gap-2 px-3 sm:px-5">
                <div className="min-w-0 flex-1 [&>h3]:w-full">
                    <AccordionTrigger className="items-center gap-3 py-5 hover:no-underline">
                        <div className="grid min-w-0 flex-1 grid-cols-2 items-center gap-3 text-left sm:grid-cols-[1.2fr_1.4fr_1fr_1fr]">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="hidden rounded-lg bg-muted p-2.5 text-muted-foreground md:inline-flex"><ReceiptText className="size-5" /></span>
                                <div className="min-w-0">
                                    <p className="font-semibold">Venta #{item.id}</p>
                                    <p className="mt-1 text-xs font-normal text-muted-foreground">{quantity} {quantity === 1 ? "producto" : "productos"}</p>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm">{formattedDate}</p>
                                <p className="mt-1 truncate text-xs font-normal text-muted-foreground">{item.user.name}</p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-normal text-muted-foreground sm:text-sm">
                                <PaymentIcon className="size-4 shrink-0" />
                                {salePaymentLabels[item.paymentMethod] ?? item.paymentMethod}
                            </span>
                            <span className="font-semibold tabular-nums sm:text-right">{formatSaleCurrency(item.total)}</span>
                        </div>
                    </AccordionTrigger>
                </div>
                <div className="flex shrink-0 flex-col gap-1 border-l border-border pl-2 sm:flex-row sm:pl-3">
                    <Button type="button" variant="ghost" size="icon" aria-label={`Editar venta #${item.id}`} title="Editar venta">
                        <Pencil className="size-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" aria-label={`Cancelar venta #${item.id}`} title="Cancelar venta">
                        <X className="size-4" />
                    </Button>
                </div>
            </div>
            <AccordionContent className="h-auto border-t border-border bg-muted/20 px-4 py-5 sm:px-6">
                <h3 className="py-4 text-sm font-semibold">Productos vendidos</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs text-muted-foreground">
                                <th scope="col" className="pb-3 text-left font-medium">Producto</th>
                                <th scope="col" className="pb-3 text-center font-medium">Cantidad</th>
                                <th scope="col" className="pb-3 text-right font-medium">Precio unitario</th>
                                <th scope="col" className="pb-3 text-right font-medium">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.items.map((product) => {
                                const poncheBaseLabel = product.product.poncheBase ? poncheBaseLabels[product.product.poncheBase] : "";
                                const productSizeLabel = product.product.productSize ? productSizeLabels[product.product.productSize] : "";
                                return (
                                    <tr key={product.itemId} className="border-b border-border/60 last:border-0">
                                        <td className=" py-3 pr-4 gap-0 justify-center">
                                            <p className="mb-0! font-medium leading-tight line-clamp-1">{product.product.name}</p>
                                            <p className="text-xs text-muted-foreground leading-tight">{`${productSizeLabel} ${productSizeLabel && poncheBaseLabel ? '|' : ''} ${poncheBaseLabel}`}</p>
                                        </td>
                                        <td className="py-3 text-center tabular-nums">{product.quantity}</td>
                                        <td className="py-3 text-right tabular-nums">{formatSaleCurrency(product.unitPrice)}</td>
                                        <td className="py-3 text-right font-medium tabular-nums">{formatSaleCurrency(product.subtotal)}</td>
                                    </tr>)
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                {item.items.length === 0 && <p className="py-4 text-sm text-muted-foreground">Esta venta no tiene productos registrados.</p>}
                <div className="flex flex-wrap items-start justify-between gap-4 border-t border-border pt-4">
                    <div className="min-w-0 flex-1">
                        {item.description && <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                    <p className="flex items-center gap-6 font-semibold"><span>Total de la venta</span><span className="tabular-nums">{formatSaleCurrency(item.total)}</span></p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
