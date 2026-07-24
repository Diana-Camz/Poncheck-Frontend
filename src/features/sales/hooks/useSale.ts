import { useMutation } from "@tanstack/react-query";
import { createSale } from "../api/sales.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BackendError } from "@/features/types";
import { useCartStore } from "../store/sales.store";



export function useCreateSale() {
    const clearCart = useCartStore(state => state.clearCart);
    const setDescription = useCartStore(state => state.setDescription);
    const errorMessages:Record<string,string> = {
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
}