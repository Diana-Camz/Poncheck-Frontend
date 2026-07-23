import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories.api";

export function useCategories() {
    return useQuery({
        queryKey: ["active-categories"],
        queryFn: getCategories,
        staleTime: 25 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}