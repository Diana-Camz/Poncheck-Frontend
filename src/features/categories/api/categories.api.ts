import { axiosClient } from "@/lib/api/axios-client";
import { Category } from "../types/categories.types";

export async function getCategories(): Promise<Category[]> {
    const response = await axiosClient.get("/categories/active");
    return response.data;
}