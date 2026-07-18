import { axiosClient } from "@/lib/api/axios-client";
import type { Login } from "../schema/auth.schema";
import { LoginResponse } from "../types/auth.types";

export async function login(loginData: Login): Promise<LoginResponse> {
    const {data} = await axiosClient.post<LoginResponse>("/auth/login", loginData);
    return data;
}