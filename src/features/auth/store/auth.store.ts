import type { AuthState } from "../types/auth.types";
import { create } from "zustand";

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    setUser: user => set({ user })
}));