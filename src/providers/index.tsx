"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme'

export function Providers({
    children
}: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </NextThemesProvider>
        </ThemeProvider>
    );
}