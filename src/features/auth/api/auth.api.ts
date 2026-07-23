import { axiosClient } from "@/lib/api/axios-client";
import type { Login } from "../schema/auth.schema";
import { LoginResponse } from "../types/auth.types";
import { useAuthStore } from "../store/auth.store";


export async function login(loginData: Login): Promise<LoginResponse> {
    const { data } = await axiosClient.post<LoginResponse>("/auth/login", loginData);
    return data;
}

export async function logout() {
    await axiosClient.post("/auth/logout");
}

export function clearSession() {
    localStorage.removeItem("token");
    useAuthStore.getState().setUser(null);
}