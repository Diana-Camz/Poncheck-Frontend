"use client"
import { AppLayout } from "@/components/layout/app-layout";
import { clearSession } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCurrentUser } from "@/features/users/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: user, isPending, isError } = useCurrentUser();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            clearSession();
            router.replace("/signin");
            return;
        }


        if (user) {
            useAuthStore.getState().setUser(user);
        }

        if (isError) {
            clearSession();
            router.replace("/signin");
        }
    }, [user, isError, router]);

    if (isPending || isError || !user) {
        return null;
    }

    return (
        <AppLayout >
            {children}
        </AppLayout>
    )
}