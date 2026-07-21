import { axiosClient } from "@/lib/api/axios-client";
import { create } from "zustand";
import type { Login } from "../schema/auth.schema";
import type { AuthState, LoginResponse } from "../types/auth.types";

export async function login(loginData: Login): Promise<LoginResponse> {
    const { data } = await axiosClient.post<LoginResponse>("/auth/login", loginData);
    return data;
}

export async function logout() {
    await axiosClient.post("/auth/logout");
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    setUser: user => set({ user })
}));

export function clearSession() {
    localStorage.removeItem("token");
    useAuthStore.getState().setUser(null);
}