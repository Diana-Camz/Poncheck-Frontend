'use client'
import { useEffect } from 'react'
import { clearSession, useAuthStore } from "@/features/auth/api/auth.api";
import { useRouter } from "next/navigation";
import { getCurrentUser } from '@/features/users/api/users.api';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/signin");
            return;
        }

        if (token) {
            getCurrentUser()
                .then(user => {
                    useAuthStore.getState().setUser(user);
                    router.replace('/new-sale')
                })
                .catch(() => {
                    clearSession();
                    router.replace('/signin')
                })
        }
    }, [router]);

    return null;
}