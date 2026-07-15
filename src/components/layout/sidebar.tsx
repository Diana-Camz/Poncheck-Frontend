"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottleWine, ShieldCogCorner } from "lucide-react";
import ListAlt from "@mui/icons-material/ListAlt";
import Payments from "@mui/icons-material/Payments";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Nueva Venta", href: "/sale", icon: BottleWine },
    { label: "Ventas", href: "/sales", icon: ListAlt },
    { label: "Caja", href: "/cash_register", icon: PointOfSaleIcon },
    { label: "Movimientos", href: "/transactions", icon: Payments },
    { label: "Admin", href: "/admin", icon: ShieldCogCorner },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-20 shrink-0 border-r border-border bg-background-2 p-3 md:block lg:w-50 xl:64 lg:p-4">
            <nav className="flex flex-col gap-1" aria-label="Sidebar navigation">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 py-2.5 my-0.5 text-sm font-medium text-muted-foreground transition hover:bg-chart-6 hover:text-foreground lg:justify-start",
                                isActive && "bg-brown/90 text-primary-foreground hover:bg-brown/80 hover:text-primary-foreground"
                            )}
                        >
                            <Icon className="size-5" />
                            <span className="hidden lg:inline text-lg">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
