import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { clearSession, login, logout } from "@/features/auth/api/auth.api"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth.store";

export function useLogin() {
    const router = useRouter();
    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            localStorage.setItem("token", response.jwtToken);
            useAuthStore.getState().setUser(response);
            router.replace("/new-sale");
            toast.success("Sesion iniciada corectamente");
        },
        onError: () => {
            toast.error("Error al iniciar sesion, por favor intenta de nuevo.");
            clearSession();
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            clearSession();
            queryClient.clear();
            router.replace("/signin");
        }
    })
}
