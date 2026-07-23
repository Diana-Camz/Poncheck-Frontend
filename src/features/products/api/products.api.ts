import { axiosClient } from "@/lib/api/axios-client";
import { Product } from "../types/products.types";

export async function getProducts(): Promise<Product[]> {
    const response = await axiosClient.get<Product[]>("/products/active");
    return response.data;
};