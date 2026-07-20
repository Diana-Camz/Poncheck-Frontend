import { axiosClient } from "@/lib/api/axios-client";
import { UserResponse } from "../types/users.types";

export async function getCurrentUser(): Promise<UserResponse> {
    const { data } = await axiosClient.get<UserResponse>(`/users/me`);
    return data;
}

export async function getUserById(id: number): Promise<UserResponse> {
    const { data } = await axiosClient.get<UserResponse>(`/users/${id}`);
    return data;
}