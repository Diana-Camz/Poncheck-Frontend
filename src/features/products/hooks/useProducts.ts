import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 25 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};