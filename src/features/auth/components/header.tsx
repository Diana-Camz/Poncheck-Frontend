"use client";

import Link from "next/link";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { CalendarDays } from "lucide-react";

export function Header() {
    const date = new Date();
    const formattedDate = format(date, 'PPPP', { locale: es });
    return (
        <header className="fixed top-0 z-40 inset-x-0 hidden border-b border-border bg-background-2 backdrop-blur md:block">
            <div className="flex h-13 items-center justify-between gap-4 px-4 lg:px-6">
                <div>
                    <Link href="/menu" className="flex items-center gap-2">
                        <span className="text-3xl font-semibold text-foreground">
                            PONCHECK POS
                        </span>
                    </Link>
                </div>
                <div className="lg:w-1/5 flex items-center justify-between ">
                    <span className="flex max-w-64 items-center gap-1.5 truncate text-sm md:text-[1rem] font-medium capitalize text-muted-foreground">
                        <CalendarDays className="size-4 shrink-0 text-brown" />
                        {formattedDate}
                    </span>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
};