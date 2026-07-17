"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/utils/styles/theme'
import { Toaster } from "sonner";

export function Providers({
    children
}: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <Toaster/>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </NextThemesProvider>
        </ThemeProvider>
    );
}