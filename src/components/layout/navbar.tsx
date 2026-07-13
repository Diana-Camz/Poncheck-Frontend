"use client";

import Link from "next/link";
import { BottleWine, ShieldCogCorner } from "lucide-react";
import ListAlt from "@mui/icons-material/ListAlt";
import Payments from "@mui/icons-material/Payments";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ThemeToggle } from "../shared/theme-toggle";

const navItems = [
    { label: "Nueva Venta", href: "/sale", icon: BottleWine },
    { label: "Ventas", href: "/sales", icon: ListAlt },
    { label: "Caja", href: "/cash_register", icon: PointOfSaleIcon },
    { label: "Movimientos", href: "/transactions", icon: Payments },
    { label: "Admin", href: "/admin", icon: ShieldCogCorner },
];

export function Navbar() {
    const date = new Date();
    const formattedDate = format(date, 'PPPP', { locale: es });
    return (
        <header className="top-0 z-40 hidden border-b border-border bg-background-2 backdrop-blur md:block">
            <div className="flex h-13 items-center justify-between gap-4 px-4 lg:px-6">
                <div>
                    <Link href="/menu" className="flex items-center gap-2">
                        <span className="text-3xl font-semibold text-foreground">
                            PONCHECK POS
                        </span>
                    </Link>
                </div>
                <div className="lg:w-1/5 flex items-center justify-between ">
                    <span className="lg:text-lg font-medium mr-4 lg:m-0">{formattedDate}</span>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
};