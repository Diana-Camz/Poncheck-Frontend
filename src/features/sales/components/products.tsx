"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { BottleWine, Milk, Wine, Coffee, Popcorn, Shirt, SearchX } from 'lucide-react';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AppChip from '@/components/shared/app-chip';
import AppCard from '@/features/products/components/app-card';
import { CartItem } from '@/features/sales/types/sales.types';
import { ProductItem } from '@/features/products/types/products.types';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { EmptyState } from '@/components/shared/empty-state';

type ProductsProps = {
    addToCart: (product: ProductItem) => void;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function Products({
    addToCart,
    cart
}: ProductsProps) {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activePoncheBases, setActivePoncheBases] = useState<string[]>([]);

    const products = useProducts();
    const categories = useCategories();

    const poncheBaseOptions = Array.from(
        new Set(
            products.data?.map((product) => product.poncheBase)
                .filter((base): base is NonNullable<typeof base> => base != null)
        )
    );

    const filteredProducts = products.data?.filter((product) => {
        const hasCategoryFilters = activeCategories.length > 0;
        const hasPoncheBaseFilters = activePoncheBases.length > 0;

        if (!hasCategoryFilters && !hasPoncheBaseFilters) {
            return true;
        }
        const matchesCategory =
            hasCategoryFilters && activeCategories.includes(product.category);

        const matchesPoncheBase =
            hasPoncheBaseFilters &&
            product.poncheBase != null &&
            activePoncheBases.includes(product.poncheBase);

        return matchesCategory || matchesPoncheBase;
    });

    const poncheBaseLabels = {
        MILK: "Ponches de Leche",
        WATER: "Ponches de Agua",
        WINE: "Ponches de Vino",
        MEZCAL: "Ponches de Mezcal",
    };

    const toggleCategories = (value: string) => {
        setActiveCategories((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const togglePoncheBase = (value: string) => {
        setActivePoncheBases((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleAddToCart = (item: ProductItem) => {
        addToCart(item)
    }

    return (
        <div className="w-full h-full min-h-0 flex flex-col gap-4">
            <Card className="flex h-fit shadow-sm p-2 rounded-md overflow-visible">
                <CardContent className=" flex flex-wrap gap-2 mx-0 px-0 items-center">
                    {
                        categories.data
                            ?
                            categories.data?.map((item) => {
                                const isActive = activeCategories.includes(item.name.toUpperCase());
                                return (
                                    <AppChip
                                        key={item.id}
                                        label={item.name}
                                        selected={isActive}
                                        onClick={() => toggleCategories(item.name.toUpperCase())}
                                    />
                                )
                            })
                            :
                        <EmptyState
                            title={"Sin categorias"}
                            description={"No se encontro ninguna categoria asociada a este negocio"}
                        />
                    }
                    {poncheBaseOptions.map((base) => {
                        const isActive = activePoncheBases.includes(base);
                        return (
                            <AppChip
                                key={base}
                                label={poncheBaseLabels[base]}
                                selected={isActive}
                                onClick={() => togglePoncheBase(base)}
                            />
                        )
                    })}
                </CardContent >
            </Card>
            <Card className='h-full'>
                <CardContent className="min-h-0 flex-1 flex flex-wrap gap-7 pt-1.5 pb-3 justify-start items-start overflow-y-auto scrollbar-thin content-start">
                    {
                        filteredProducts
                            ?
                            filteredProducts.map((item) => {
                                const isInCart = cart.some((cartItem) => cartItem.id === item.id);
                                return (
                                    <AppCard
                                        key={item.id}
                                        name={item.name}
                                        imageUrl='/images/products/coffee.png'
                                        className={isInCart ? "border-2 border-brown" : ""}
                                        onClick={() => handleAddToCart(item)}
                                    />
                                )
                            })
                            :
                            <div className='flex flex-1 h-1/2 justify-center items-end'>
                                <EmptyState
                                    title={"Sin productos"}
                                    description={"No se encontraron productos asociados a este negocio"}
                                    icon={<SearchX className="h-12 w-12 text-muted-foreground/30" />}
                                />
                            </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
