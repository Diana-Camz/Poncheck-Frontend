import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/api/auth.api"
import { Login } from "../schema/auth.schema"; 

export function useLogin() {
    return useMutation({
        mutationFn: async (data: Login) => {
            const response = await login(data);
            localStorage.setItem("token", response.jwtToken);
            return response;
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })
}
