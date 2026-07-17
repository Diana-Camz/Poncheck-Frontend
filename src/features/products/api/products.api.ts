import { axiosClient } from "@/lib/api/axios-client";
import { ProductItem } from "../types/products.types";

export async function getProducts(): Promise<ProductItem[]> {
    const response = await axiosClient.get<ProductItem[]>("/products");
    return response.data;
}