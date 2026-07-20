"use client";

import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/utils/styles/theme'
import { Toaster } from "sonner";
import { makeQueryClient } from "@/lib/tanstack-query/react-query";
import { useState } from "react";

export function Providers({
    children
}: { children: React.ReactNode }) {
    const [queryClient] = useState(makeQueryClient);
    return (
        <QueryClientProvider client={queryClient}>

            <ThemeProvider theme={theme}>
                <Toaster />
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </NextThemesProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}