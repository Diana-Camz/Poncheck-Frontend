"use client";
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SearchX } from 'lucide-react';
import AppChip from '@/components/shared/app-chip';
import AppCard from '@/features/products/components/app-card';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { EmptyState } from '@/components/shared/empty-state';
import { useCartStore } from '../store/sales.store';

export default function Products() {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activePoncheBases, setActivePoncheBases] = useState<string[]>([]);
    const [activeProductSizes, setActiveProductSizes] = useState<string[]>([]);

    const products = useProducts();
    const categories = useCategories();
    const cart = useCartStore(state => state.cart);

    const poncheBaseOptions = Array.from(
        new Set(
            products.data?.map((product) => product.poncheBase)
                .filter((base): base is NonNullable<typeof base> => base != null)
        )
    );

    const isPoncheCategory = (category: string) => category.toUpperCase().includes("PONCHE");
    const hasPoncheCategory = activeCategories.some(isPoncheCategory);
    const hasProductSizeCategory = activeCategories.length > 0 && !hasPoncheCategory;

    const filteredProducts = products.data?.filter((product) => {
        const hasCategoryFilters = activeCategories.length > 0;
        const hasPoncheBaseFilters = activePoncheBases.length > 0;
        const hasProductSizeFilters = activeProductSizes.length > 0;

        if (!hasCategoryFilters) {
            return true;
        }
        const matchesCategory =
            hasCategoryFilters && activeCategories.includes(product.category.toUpperCase());

        const matchesPoncheBase =
            !hasPoncheBaseFilters ||
            product.poncheBase != null &&
            activePoncheBases.includes(product.poncheBase);

        const matchesProductSize =
            !hasProductSizeFilters ||
            product.productSize != null &&
            activeProductSizes.includes(product.productSize);

        if (hasPoncheCategory) {
            return matchesCategory && matchesPoncheBase;
        }

        return matchesCategory && matchesProductSize;
    });

    const poncheBaseLabels = {
        MILK: "Leche",
        WATER: "Agua",
        WINE: "Vino Tinto",
        MEZCAL: "Mezcal",
    };

    const productSizeOptions = ["SMALL", "MEDIUM", "LARGE"];

    const productSizeLabels: Record<string, string> = {
        SMALL: "Chico",
        MEDIUM: "Mediano",
        LARGE: "Grande",
    };

    const toggleCategories = (value: string) => {
        const normalizedValue = value.toUpperCase();

        if (activeCategories.includes(normalizedValue)) {
            setActiveCategories([]);
            setActivePoncheBases([]);
            setActiveProductSizes([]);
            return;
        }

        setActiveCategories([normalizedValue]);
        setActiveProductSizes([]);
        setActivePoncheBases(isPoncheCategory(normalizedValue) ? ["MILK"] : []);
    };

    const togglePoncheBase = (value: string) => {
        setActivePoncheBases([value]);
    };

    const toggleProductSize = (value: string) => {
        setActiveProductSizes((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="w-full h-full min-h-0 flex flex-col gap-4">
            <Card className="flex h-fit overflow-visible rounded-md p-3 shadow-sm">
                <CardContent className="flex w-full flex-col gap-3 px-0 py-0">
                    <div className="flex flex-col gap-2">
                        <p className="px-1 text-xs font-semibold uppercase text-muted-foreground">
                            Categorías
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
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
                        </div>
                    </div>
                    {hasPoncheCategory && poncheBaseOptions.length > 0 && (
                        <div className="flex flex-col gap-2 rounded-md border border-brown/20 bg-background-2 p-2">
                            <p className="px-1 text-xs font-semibold uppercase text-brown">
                                Base
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                {poncheBaseOptions.map((base) => {
                                    const isActive = activePoncheBases.includes(base);
                                    return (
                                        <AppChip
                                            key={base}
                                            label={poncheBaseLabels[base]}
                                            selected={isActive}
                                            textColor="txDefault"
                                            onClick={() => togglePoncheBase(base)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {hasProductSizeCategory && (
                        <div className="flex flex-col gap-2 rounded-md border border-brown/20 bg-background-2 p-2">
                            <p className="px-1 text-xs font-semibold uppercase text-brown">
                                Tamaños
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                {productSizeOptions.map((size) => {
                                    const isActive = activeProductSizes.includes(size);
                                    return (
                                        <AppChip
                                            key={size}
                                            label={productSizeLabels[size]}
                                            selected={isActive}
                                            textColor="txDefault"
                                            onClick={() => toggleProductSize(size)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}
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
                                        product={item}
                                        imageUrl='/images/products/coffee.png'
                                        className={isInCart ? "border-2 border-brown" : ""}
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
