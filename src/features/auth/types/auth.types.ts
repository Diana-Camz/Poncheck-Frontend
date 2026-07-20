export type AuthState = {
    user: LoginResponse | null,
    setUser: (user: LoginResponse | null) => void;
}

export type LoginResponse = {
    id: string,
    name: string,
    username: string,
    role: "ADMIN" | "OWNER" | "SELLER",
    jwtToken: string,
    refreshToken: string
}