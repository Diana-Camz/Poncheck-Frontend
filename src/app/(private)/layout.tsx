"use client"
import { AppLayout } from "@/components/layout/app-layout";
import { useAuthStore } from "@/features/auth/api/auth.api";
import { getCurrentUser } from "@/features/users/api/users.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace('/signin')
        }

        if (token) {
            getCurrentUser()
                .then(user => {
                    useAuthStore.getState().setUser(user)
                })
                .catch(error => {
                    localStorage.removeItem("token")
                    useAuthStore.getState().setUser(null)
                    router.replace("/signin")
                    console.log(error)
                })
        }
    }, [router]);

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}