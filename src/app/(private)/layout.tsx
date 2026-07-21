"use client"
import { AppLayout } from "@/components/layout/app-layout";
import { clearSession, useAuthStore } from "@/features/auth/api/auth.api";
import { useCurrentUser } from "@/features/users/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: user, isPending, isError } = useCurrentUser();

    useEffect(() => {
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