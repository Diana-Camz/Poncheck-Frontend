import { axiosClient } from "@/lib/api/axios-client";
import { CancelSaleRequestDTO, CreateSaleRequestDTO, EditSaleRequestDTO, SaleResponse, SaleStatus } from "../types/sales.types";


export async function getSalesByStatus(status: SaleStatus): Promise<SaleResponse[]> {
    const { data } = await axiosClient.get<SaleResponse[]>("/sales/status", { params: { status } });
    return data; 

};

export async function getSalesByStatusAndDateRange(status: SaleStatus, start: string, end: string): Promise<SaleResponse[]> {
    const sales = await getSalesByStatus(status);
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    // El endpoint por estado no admite fechas; se filtra por la fecha de la venta.
    return sales.filter((sale) => {
        const saleTime = new Date(sale.date).getTime();
        return saleTime >= startTime && saleTime <= endTime;
    });
}

export async function getSale(saleId: string): Promise<SaleResponse> {
    const { data } = await axiosClient.get<SaleResponse>(`/sales/${saleId}`);
    return data;

};

export async function getSaleByDateRange(start: string, end: string): Promise<SaleResponse[]> {
    const { data } = await axiosClient.get<SaleResponse[]>(`/sales/date-range`, { params: { start, end } });
    return data;

};

export async function createSale(saleData: CreateSaleRequestDTO): Promise<SaleResponse[]> {
    const { data } = await axiosClient.post<SaleResponse[]>("/sales", saleData);
    return data;
};

export async function editSale(saleId: number, data: EditSaleRequestDTO): Promise<void> {
    await axiosClient.patch<void>(`/sales/${saleId}`, data);
}

export async function deleteSale(saleId: number, data: CancelSaleRequestDTO): Promise<void> {
    await axiosClient.patch<void>(`/sales/delete/${saleId}`, data);
}
