import { axiosClient } from "@/lib/api/axios-client";
import type { Login } from "../schema/auth.schema";
import { LoginResponse } from "../types/auth.types";
import { useAuthStore } from "../store/auth.store";
import { queryClient } from "@/lib/tanstack-query/react-query";

export async function login(loginData: Login): Promise<LoginResponse> {
    const { data } = await axiosClient.post<LoginResponse>("/auth/login", loginData);
    return data;
}

export async function logout() {
    await axiosClient.post("/auth/logout");
}

export function clearSession() {
    queryClient.clear();
    localStorage.removeItem("token");
    useAuthStore.getState().setUser(null);
}