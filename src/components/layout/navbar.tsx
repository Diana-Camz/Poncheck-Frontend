"use client";

import Link from "next/link";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ThemeToggle } from "../shared/theme-toggle";
import { useAuthStore } from "@/features/auth/api/auth.api";
import { CircleUserRound, CalendarDays, LogOutIcon, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useLogout } from "@/features/auth/hooks/useAuth";

export function Navbar() {
    const date = new Date();
    const formattedDate = format(date, 'PPPP', { locale: es });
    const logout = useLogout();
    const { user } = useAuthStore();
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
                <div className="flex min-w-0 items-center gap-4">


                    <div className="flex min-w-0 items-center gap-3 border-r border-border pr-4">
                        <div className="flex min-w-0 flex-col items-end leading-tight">
                            <span className="max-w-48 truncate text-base font-semibold text-foreground">
                                {user?.name}
                            </span>
                            <span className="flex max-w-64 items-center gap-1.5 truncate text-sm font-medium capitalize text-muted-foreground">
                                <CalendarDays className="size-4 shrink-0 text-brown" />
                                {formattedDate}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brown/15 text-brown">
                                    <UserRound className="size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 p-2">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="gap-2 rounded-md px-3 py-2 text-sm font-medium">
                                        <CircleUserRound className="size-5 text-brown" />
                                        Perfil
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="gap-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
                                    onClick={() => logout.mutate()}
                                >
                                    <LogOutIcon className="size-4" />
                                    Cerrar Sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
};
