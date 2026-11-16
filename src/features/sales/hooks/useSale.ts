import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSale, editSale, deleteSale, getSaleByDateRange, getSalesByStatus, getSalesByStatusAndDateRange } from "../api/sales.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BackendError } from "@/features/types";
import { useCartStore } from "../store/sales.store";
import { CancelSaleRequestDTO, SaleStatus, EditSaleRequestDTO } from "../types/sales.types";

export function useSalesByStatus(status: SaleStatus) {
    return useQuery({
        queryKey: ["sales", "status", status],
        queryFn: () => getSalesByStatus(status),
    });
};

export function useSalesByDateRange(start: string, end: string) {
    return useQuery({
        queryKey: ["sales", "date-range", start, end],
        queryFn: () => getSaleByDateRange(start, end),
        select: (sales) => sales.filter((sale) => !sale.cancelled),
    });
}

export function useSalesByStatusAndDateRange(status: SaleStatus, start: string, end: string) {
    return useQuery({
        queryKey: ["sales", "status", status, "date-range", start, end],
        queryFn: () => getSalesByStatusAndDateRange(status, start, end),
    });
}

export function useCreateSale() {
    const queryClient = useQueryClient();
    const clearCart = useCartStore(state => state.clearCart);
    const setDescription = useCartStore(state => state.setDescription);
    const errorMessages: Record<string, string> = {
        CASH_REGISTER_CLOSED: "La caja está cerrada",
        INSUFFICIENT_STOCK: "No hay stock suficiente",
        SALE_ITEMS_REQUIRED: "La venta debe tener al menos 1 producto",
        PRODUCT_NOT_FOUND: "Producto no encontrado",
        PRODUCT_DISABLED: "Producto deshabilitado",
        CATEGORY_DISABLED: "Categoria Deshabilitada"
    };
    return useMutation({
        mutationFn: createSale,
        onSuccess: () => {
            toast.success("Venta realizada correctamente", { position: "top-center" });
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            clearCart();
            setDescription("");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<BackendError>;

            const code = axiosError.response?.data?.code;

            const message =
                code ? errorMessages[code ?? ""] : "Error al crear la venta";

            toast.error(message, { position: "top-center" });
        },
    })
};

export function useEditSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ saleId, data }: { saleId: number; data: EditSaleRequestDTO }) => editSale(saleId, data),
        onSuccess: async () => {
            toast.success("Venta actualizada correctamente", { position: "top-center" });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["sales"] }),
            ]);
        },
        onError: (error) => {
            const code = (error as AxiosError<BackendError>).response?.data?.code;
            const messages: Record<string, string> = {
                SALE_ALREADY_UPDATED: "La venta ya está actualizada",
                SALE_NOT_FOUND: "No se encontró la venta",
            };
            toast.error((code && messages[code]) || "No se pudo actualizar la venta", { position: "top-center" });
        },
    });
};

export function useDeleteSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ saleId, data }: { saleId: number; data: CancelSaleRequestDTO }) => deleteSale(saleId, data),
        onSuccess: async () => {
            toast.success("Venta cancelada correctamente", { position: "top-center" });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["sales"] }),
                queryClient.invalidateQueries({ queryKey: ["products"] }),
            ]);
        },
        onError: (error) => {
            const code = (error as AxiosError<BackendError>).response?.data?.code;
            const messages: Record<string, string> = {
                CASH_REGISTER_NOT_OPEN: "La caja debe estar abierta para cancelar una venta",
                SALE_ALREADY_CANCELLED: "La venta ya está cancelada",
                SALE_NOT_FOUND: "No se encontró la venta",
            };
            toast.error((code && messages[code]) || "No se pudo cancelar la venta", { position: "top-center" });
        },
    });
};
