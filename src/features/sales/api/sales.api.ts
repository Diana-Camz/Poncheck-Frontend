import { axiosClient } from "@/lib/api/axios-client";
import { CreateSaleRequestDTO, CreateSaleResponse } from "../types/sales.types";

export async function createSale(saleData: CreateSaleRequestDTO): Promise<CreateSaleResponse> {
    const { data } = await axiosClient.post<CreateSaleResponse>("/sales", saleData);
    return data;
}