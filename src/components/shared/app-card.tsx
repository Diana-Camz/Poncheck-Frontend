"use client";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type MouseEvent, type TouchEvent } from "react";

type PressEvent = MouseEvent<HTMLElement> | TouchEvent<HTMLElement>;

type AppCardProps = {
    className?: string;
    imageUrl?: string;
    title?: string;
    onClick?: (e: PressEvent) => void;
};


export default function AppCard({
    className,
    imageUrl = "",
    title = "",
    onClick,
}: AppCardProps) {
    const isLongTitle = (title?.length ?? 0) > 10;


    return (
        <Card
            className={cn("relative w-36 sm:w-40 shrink-0 surface gap-0 h-fit overflow-visible px-1 py-1 border-2 bg-background-2/60 hover:border-brown cursor-pointer transition-transform duration-150 ease-out active:scale-95 ", className)}
            onClick={onClick}
        >
            <CardContent className="relative w-full aspect-square overflow-hidden shrink-0 rounded-t-lg min-[1580px]:rounded-md cursor-pointer">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 100vw, 240px"
                    className="object-cover "
                />
            </CardContent>
            <CardFooter className="flex h-12 min-h-12 items-center gap-0 py-2 my-1 rounded-b-md cursor-pointer leading-tight bg-brown/20">
                <p
                    className={cn(
                        "w-full min-w-0 overflow-hidden text-foreground wrap-break-word text-lg text-center text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
                        isLongTitle && "text-sm"
                    )}
                    title={title}
                >
                    {title}
                </p>
            </CardFooter>
        </Card>
    )
}