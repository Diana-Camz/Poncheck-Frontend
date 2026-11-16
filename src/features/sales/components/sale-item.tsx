"use client";

import { Banknote, CreditCard, Landmark, Pencil, ReceiptText, X } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PaymentMethod, SaleResponse } from "../types/sales.types";
import { formatSaleCurrency, salePaymentLabels } from "../utils/sales-presentation";
import { useState } from "react";
import { useDeleteSale, useEditSale } from "../hooks/useSale";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const businessId = useAuthStore((state) => state.user?.business?.id);
    const deleteSale = useDeleteSale();
    const editSale = useEditSale();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [description, setDescription] = useState(item.description ?? "");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(item.paymentMethod);
    const [reason, setReason] = useState("");
    const date = new Date(item.date);
    const formattedDate = Number.isNaN(date.getTime()) ? "Fecha no disponible" : new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
    const cancellationDate = item.cancelled?.date ? new Date(item.cancelled.date) : undefined;
    const formattedCancellationDate = !cancellationDate || Number.isNaN(cancellationDate.getTime())
        ? "Fecha no disponible"
        : new Intl.DateTimeFormat("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(cancellationDate);
    const PaymentIcon = item.paymentMethod === "CASH" ? Banknote : String(item.paymentMethod) === "CARD" ? CreditCard : Landmark;
    const quantity = item.items.reduce((total, product) => total + product.quantity, 0);

    function handleDeleteSale() {
        if (!businessId || !reason.trim() || deleteSale.isPending) return;
        deleteSale.mutate({ saleId: item.id, data: { reason: reason.trim(), businessId } }, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setReason("");
            },
        });
    }

    function handleEditSale() {
        if (!businessId || editSale.isPending) return;
        editSale.mutate({
            saleId: item.id,
            data: { description, paymentMethod, businessId },
        }, {
            onSuccess: () => setEditDialogOpen(false),
        });
    }

    return (
        <AccordionItem value={String(item.id)} className="overflow-hidden rounded-xl border border-border bg-card not-last:border-b">
            <div className="flex items-center gap-2 px-3 sm:px-5">
                <div className="min-w-0 flex-1 [&>h3]:w-full">
                    <AccordionTrigger className="items-center gap-3 py-5 hover:no-underline cursor-pointer">
                        <div className="grid min-w-0 flex-1 grid-cols-4 items-center gap-3 text-left sm:grid-cols-[1.2fr_1.4fr_1fr_1fr">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="hidden rounded-lg bg-muted p-2.5 text-muted-foreground md:inline-flex"><ReceiptText className="size-5" /></span>
                                <div className="min-w-0">
                                    <p className="font-semibold">Venta #{item.id}</p>
                                    {item.cancelled && (
                                        <span className="mt-1 inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">Venta cancelada</span>
                                    )}
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
                    {item.cancelled ? null : (
                        <Dialog open={editDialogOpen} onOpenChange={(open) => {
                            if (editSale.isPending) return;
                            if (open) {
                                setDescription(item.description ?? "");
                                setPaymentMethod(item.paymentMethod);
                            }
                            setEditDialogOpen(open);
                        }}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" disabled={editSale.isPending} aria-label={`Editar venta #${item.id}`} title="Editar venta">
                                    <Pencil className="size-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={!editSale.isPending}>
                                <form className="grid gap-4" onSubmit={(event) => {
                                    event.preventDefault();
                                    handleEditSale();
                                }}>
                                    <DialogHeader>
                                        <DialogTitle>Editar venta #{item.id}</DialogTitle>
                                        <DialogDescription>Actualiza la descripción y el método de pago de la venta.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-2">
                                        <label htmlFor={`edit-sale-description-${item.id}`}>Descripción de la venta</label>
                                        <Textarea
                                            id={`edit-sale-description-${item.id}`}
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            disabled={editSale.isPending}
                                            placeholder="Agrega una descripción (opcional)"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor={`edit-sale-payment-${item.id}`}>Método de pago</label>
                                        <Select value={paymentMethod} onValueChange={(value) => {
                                            if (value === "CARD" || value === "TRANSFER" || value === "CASH") {
                                                setPaymentMethod(value);
                                            }
                                        }} disabled={editSale.isPending} required>
                                            <SelectTrigger id={`edit-sale-payment-${item.id}`} className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CARD">{salePaymentLabels.CARD}</SelectItem>
                                                <SelectItem value="TRANSFER">{salePaymentLabels.TRANSFER}</SelectItem>
                                                <SelectItem value="CASH">{salePaymentLabels.CASH}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {!businessId && <p role="alert" className="text-destructive">No se encontró el negocio asociado al usuario.</p>}
                                    <DialogFooter>
                                        <Button type="button" variant="destructive" disabled={editSale.isPending} onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                                        <Button type="submit" disabled={editSale.isPending || !businessId}>
                                            {editSale.isPending ? "Guardando..." : "Guardar cambios"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                    {item.cancelled ? null : (
                        <Dialog open={deleteDialogOpen} onOpenChange={(open) => {
                            if (deleteSale.isPending) return;
                            setDeleteDialogOpen(open);
                            if (!open) setReason("");
                        }}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" disabled={deleteSale.isPending || !!item.cancelled} className="text-destructive hover:bg-destructive/10 hover:text-destructive" aria-label={`Cancelar venta #${item.id}`} title="Cancelar venta">
                                    <X className="size-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={!deleteSale.isPending}>
                                <form className="grid gap-4" onSubmit={(event) => {
                                    event.preventDefault();
                                    handleDeleteSale();
                                }}>
                                    <DialogHeader>
                                        <DialogTitle>Cancelar venta #{item.id}</DialogTitle>
                                        <DialogDescription>Indica el motivo de la cancelación. Se devolverán los productos al inventario y se ajustará la caja.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-2">
                                        <label htmlFor={`cancel-sale-reason-${item.id}`}>Motivo de cancelación</label>
                                        <Textarea id={`cancel-sale-reason-${item.id}`} value={reason} onChange={(event) => setReason(event.target.value)} required disabled={deleteSale.isPending} />
                                    </div>
                                    {!businessId && <p role="alert" className="text-destructive">No se encontró el negocio asociado al usuario.</p>}
                                    <DialogFooter>
                                        <Button type="button" variant="destructive" disabled={deleteSale.isPending} onClick={() => {
                                            setDeleteDialogOpen(false);
                                            setReason("");
                                        }}>Volver</Button>
                                        <Button type="submit" variant="default" disabled={deleteSale.isPending || !reason.trim() || !businessId}>
                                            {deleteSale.isPending ? "Cancelando..." : "Cancelar venta"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>)}
                </div>
            </div>
            <AccordionContent className="h-auto border-t border-border bg-muted/20 px-4 py-5 sm:px-6">
                {item.cancelled && (
                    <div className="min-w-0 space-y-4 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:p-5">
                        <h3 className="border-b border-destructive/15 pb-3 text-sm font-semibold text-destructive">Venta cancelada</h3>
                        <dl className="grid min-w-0 grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:gap-x-6">
                            <div className="min-w-0 space-y-1">
                                <dt className="text-xs font-medium text-muted-foreground">Fecha de cancelación</dt>
                                <dd className="font-medium leading-relaxed text-foreground">{formattedCancellationDate}</dd>
                            </div>
                            <div className="min-w-0 space-y-1">
                                <dt className="text-xs font-medium text-muted-foreground">Usuario</dt>
                                <dd className="break-words font-medium leading-relaxed text-foreground">{item.cancelled.userId || "Usuario no encontrado"}</dd>
                            </div>
                            <div className="min-w-0 space-y-2 border-t border-destructive/15 pt-4 sm:col-span-2">
                                <dt className="text-xs font-medium text-muted-foreground">Motivo de cancelación</dt>
                                <dd className="whitespace-pre-wrap break-words rounded-lg border border-destructive/10 bg-card px-3 py-2.5 leading-relaxed text-foreground">{item.cancelled.reason?.trim() || "Sin motivo registrado"}</dd>
                            </div>
                        </dl>
                    </div>
                )}
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
        </AccordionItem >
    )
}
