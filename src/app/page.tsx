'use client'
import { useEffect } from 'react'

import { useAuthStore } from "@/features/auth/api/auth.api";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { user } = useAuthStore();
    const token = user?.jwtToken;
    console.log(token)

    useEffect(() => {
        if (!token) {
             router.replace('/signin')
        } else {
             router.replace('/new-sale')
        }
    }, [token, router]);

    return null;
}