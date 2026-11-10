"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AppButton } from "@/components/shared/app-button";
import { useState } from "react";
import { Product } from "../types/products.types";

type EditProductModalProps = {
    editingProduct: Product | null;
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
    onClose: () => void;
}

export function EditProductModal({
    editingProduct,
    setIsModalOpen,
    isModalOpen,
    onClose
}: EditProductModalProps) {
    const currentCategory = editingProduct?.category || "Ponche";
    const currentFlavor = editingProduct?.flavor || "Tradicional";
    // SelectValue needs an item whose value exactly matches the selected value.
    const categories = Array.from(new Set([currentCategory, "Ponche", "Cafe", "Botana", "Accesorios", "Ropa"]));
    const flavors = Array.from(new Set([currentFlavor, "Tradicional", "Frutas", "Jamaica", "Especial", "Guayaba", "Navideño"]));

    const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Saving product...");
        setIsModalOpen(false)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="min-w-xl">
                <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveProduct}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del producto</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={editingProduct?.name || ''}
                                placeholder="Ponche Tradicional 1L"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Categoría</Label>
                                <Select name="category" defaultValue={currentCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="flavor">Sabor</Label>
                                <Select name="flavor" defaultValue={currentFlavor}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {flavors.map((flavor) => (
                                            <SelectItem key={flavor} value={flavor}>{flavor}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock actual</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    defaultValue={editingProduct?.stock || 0}
                                    min={0}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Precio ($)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    defaultValue={editingProduct?.price || 0}
                                    min={0}
                                    step={0.01}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <div>
                                <Label htmlFor="active" className="font-medium">Producto activo</Label>
                                <p className="text-sm text-muted-foreground">Mostrar en catálogo de ventas</p>
                            </div>
                            <Switch
                                id="active"
                                name="active"
                                defaultChecked={editingProduct?.active ?? true}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <AppButton type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </AppButton>
                        <AppButton type="submit">
                            {editingProduct ? 'Guardar cambios' : 'Crear producto'}
                        </AppButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
