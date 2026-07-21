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
}