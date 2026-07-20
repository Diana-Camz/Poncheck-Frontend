import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { login, logout, useAuthStore } from "@/features/auth/api/auth.api"
import { Login } from "../schema/auth.schema";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: Login) => {
            const response = await login(data);
            localStorage.setItem("token", response.jwtToken);
            return response;
        },
        onSuccess: () => {
            router.replace("/new-sale");
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            localStorage.removeItem("token");
            useAuthStore.getState().setUser(null);
            queryClient.clear();
            router.replace("/signin");
        }
    })
}
