"use client";

import AppChip from '@/components/shared/app-chip';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { useCategories } from '@/features/categories/hooks/useCategories';
import { EditProductModal } from '@/features/products/components/edit-product-modal';
import ProductStockCard from '@/features/products/components/product-stock-card'
import { useProducts } from '@/features/products/hooks/useProducts';
import { Product } from '@/features/products/types/products.types';
import { useCartStore } from '@/features/sales/store/sales.store';
import { Filter, Plus, Search, SearchX } from 'lucide-react';
import React, { useState } from 'react';


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

export default function Products() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos")
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
  const [searchQuery, setSearchQuery] = useState("")

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


  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden p-2 lg:px-3 bg-background">
      <div className="space-y-4 p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Productos</h1>
            <p className="text-muted-foreground">{products.data?.length || 0} productos en total</p>
          </div>
          <Button onClick={() => {setIsModalOpen(true)}} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => { }}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <div className="hidden gap-2 sm:flex">
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


        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {
            filteredProducts
              ?
              filteredProducts.map((item) => {
                const isInCart = cart.some((cartItem) => cartItem.id === item.id);
                return (
                  <ProductStockCard
                    key={item.id}
                    product={item}
                    setEditingProduct={setEditingProduct}
                    setIsModalOpen={setIsModalOpen}
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
        </div>
      </div>
      {isModalOpen && (
        <EditProductModal
          editingProduct={editingProduct}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}
