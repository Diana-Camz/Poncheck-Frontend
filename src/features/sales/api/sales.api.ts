import { axiosClient } from "@/lib/api/axios-client";
import { CreateSaleRequestDTO, SaleResponse, SaleStatus } from "../types/sales.types";


export async function getSalesByStatus(status: SaleStatus): Promise<SaleResponse[]> {
    const { data } = await axiosClient.get<SaleResponse[]>("/sales/status", { params: { status } });
    return data; 

};

export async function getSale(saleId: string): Promise<SaleResponse> {
    const { data } = await axiosClient.get<SaleResponse>(`/sales/${saleId}`);
    return data;

};

export async function createSale(saleData: CreateSaleRequestDTO): Promise<SaleResponse> {
    const { data } = await axiosClient.post<SaleResponse>("/sales", saleData);
    return data;
}