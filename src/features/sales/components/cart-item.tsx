import { Button } from "@/components/ui/button";
import type { CartItem } from "../types/sales.types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/sales.store";

type CartItemProps = {
    item: CartItem;
}

export default function CartItem({
    item,
}: CartItemProps) {
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeFromCart = useCartStore(state => state.removeFromCart);

    const poncheBaseLabels = {
        MILK: "Leche",
        WATER: "Agua",
        WINE: "Vino Tinto",
        MEZCAL: "Mezcal",
    } as const;
    type BaseKey = keyof typeof poncheBaseLabels;

    function getBaseLabel(base: BaseKey | null) {
        return base ? poncheBaseLabels[base] : "";
    }

    const productSizeLabels: Record<string, string> = {
        SMALL: "Chico",
        MEDIUM: "Mediano",
        LARGE: "Grande",
    };

    type SizeKey = keyof typeof productSizeLabels;

    function getSizeLabel(size: SizeKey | null) {
        return size ? productSizeLabels[size] : "";
    }

    return (
        <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-chart-7 py-2 px-2 hover:bg-chart-7/40 "
        >
            <div className="min-w-0 flex flex-1 items-center gap-2">
                <div className="flex w-full items-baseline gap-3">
                    <p className="text-[1rem] font-medium text-foreground line-clamp-3">{item.name}</p>
                    <p className="text-xs text-muted-foreground/80 line-clamp-3">{getBaseLabel(item.poncheBase)}</p>
                    <p className="text-xs text-muted-foreground/80 line-clamp-3">{getSizeLabel(item.productSize)}</p>
                </div>
                <div className="flex w-full gap-9 justify-center items-center">
                    <p className="text-[1rem] text-muted-foreground font-semibold">{(item.price).toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN",
                    })}</p>
                    <p className="text-[1rem] text-brown font-semibold">{(item.price * item.quantity).toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN",
                    })}</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    size="icon"
                    className="h-8 w-8 border-brown/10 bg-brown/5 hover:bg-brown/10 dark:bg-input/50 cursor-pointer active:scale-80 transition duration-120"
                    onClick={() => updateQuantity(item.id, -1)}
                >
                    <Minus className="h-3 w-3 text-brown" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                    size="icon"
                    className="h-8 w-8 border-brown/10 bg-brown/5 hover:bg-brown/10 dark:bg-input/50 cursor-pointer active:scale-80 transition duration-120"
                    onClick={() => updateQuantity(item.id, + 1)}
                >
                    <Plus className="h-3 w-3 text-brown" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-input/90 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                >
                    <Trash2 className="size-5" color={"var(--destructive)"} />
                </Button>
            </div>
        </div>
    );
}