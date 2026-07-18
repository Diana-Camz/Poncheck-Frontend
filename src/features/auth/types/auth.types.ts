
export type LoginResponse = {
    id: string,
    name: string,
    username: string,
    role: "ADMIN" | "OWNER" | "SELLER",
    jwtToken: string,
    refreshToken: string
}