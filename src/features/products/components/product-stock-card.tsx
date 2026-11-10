"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Edit2,
    MoreVertical,
    Package,
} from "lucide-react"
import Image from "next/image";
import { type MouseEvent, type TouchEvent } from "react";
import { useCartStore } from "@/features/sales/store/sales.store";
import { Product } from "../types/products.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const poncheBaseLabels = {
    MILK: "LECHE",
    WATER: "AGUA",
    WINE: "VINO TINTO",
    MEZCAL: "MEZCAL",
};

const productSizeLabels: Record<string, string> = {
    SMALL: "Chico",
    MEDIUM: "Mediano",
    LARGE: "Grande",
};

type PressEvent = MouseEvent<HTMLElement> | TouchEvent<HTMLElement>;

type AppCardProps = {
    product: Product;
    setEditingProduct: (product: Product) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    className?: string;
    imageUrl?: string;
    onClick?: (e: PressEvent) => void;
};

export default function ProductStockCard({
    product,
    setEditingProduct,
    setIsModalOpen,
    onClick,
    className,
    imageUrl = "",
}: AppCardProps) {
    const addToCart = useCartStore(state => state.addToCart);

    const handleAddToCart = (item: Product) => {
        addToCart(item)
    }

    const handleToggleActive = () => {
        console.log(product.active)
    }

    const getStockStatus = (stock: number) => {
        if (stock <= 15) return { color: "bg-destructive/10 text-destructive", label: "Crítico" }
        if (stock <= 29) return { color: "bg-warning/10 text-warning", label: "Bajo" }
        return { color: "bg-success/10 text-success", label: "Normal" }
    }

    const stockStatus = getStockStatus(product.stock)

    const customLabel = product.poncheBase ? poncheBaseLabels[product.poncheBase] : productSizeLabels[product.productSize ?? ""]
    return (
        <Card
            className={`bg-card shadow-sm transition-all hover:shadow-md hover:bg-secondary/80 ${!product.active ? 'opacity-60' : ''}`}
            onClick={() => {setEditingProduct(product); setIsModalOpen(true)}}
        >
            <CardContent className="relative w-full overflow-hidden shrink-0 rounded-t-lg min-[1580px]:rounded-md cursor-pointer">
                <div className="flex w-full justify-between items-center">
                    <div className="relative h-15 border w-15 overflow-hidden rounded-md bg-secondary">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            loading="eager"
                            sizes="50px"
                            className="object-cover"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                setEditingProduct(product);
                                setIsModalOpen(true);
                            }}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleToggleActive}>
                                <Package className="mr-2 h-4 w-4" />
                                {product.active ? 'Desactivar' : 'Activar'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mt-3">
                    <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category} • {customLabel}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-brown">${product.price}</p>
                    </div>
                    <div className="text-right">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${stockStatus.color}`}>
                            {product.stock} uds
                        </span>
                    </div>
                </div>

                {!product.active && (
                    <div className="mt-2 rounded bg-muted px-2 py-1 text-center text-xs text-muted-foreground">
                        Inactivo
                    </div>
                )}
            </CardContent>
        </Card>
    )
}