import { UserResponse } from "@/features/users/types/users.types";

export type AuthState = {
    user: UserResponse | null,
    setUser: (user: UserResponse | null) => void;
}

export type LoginResponse = {
    id: string,
    name: string,
    username: string,
    role: "ADMIN" | "OWNER" | "SELLER",
    jwtToken: string,
    refreshToken: string
    business: Business,
}

export type Business = {
    id: number,
    name: string,
    phone: string,
    email: string,
    address: string,
    description?: string,
    logoUrl?: string,
    owner: UserBusiness,
}

export type UserBusiness = {
    id: number,
    name: string,
    role: Role
}

export type Role = "ADMIN" | "OWNER" | "SELLER"