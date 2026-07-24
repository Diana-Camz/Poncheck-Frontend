export type UserResponse = {
    id: string,
    name: string,
    username: string,
    role: Role,
    jwtToken: string,
    refreshToken: string,
    business: Business
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

export type Role = "ADMIN" | "OWNER" | "SELLER";

export type UserSaleResponse = {
    id: number,
    name: string,
    rol: Role
}