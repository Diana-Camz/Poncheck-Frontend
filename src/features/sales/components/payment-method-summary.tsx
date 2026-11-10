import { Banknote, CreditCard, Landmark } from "lucide-react";
import { SaleResponse } from "../types/sales.types";
import { formatSaleCurrency, salePaymentLabels } from "../utils/sales-presentation";

const methods = [
    { value: "CASH", icon: Banknote, color: "bg-mint/20 text-foreground" },
    { value: "CARD", icon: CreditCard, color: "bg-cyan/20 text-foreground" },
    { value: "TRANSFER", icon: Landmark, color: "bg-muted text-foreground" },
];

export function PaymentMethodSummary({ sales, isLoading = false, isError = false }: {
    sales: SaleResponse[];
    isLoading?: boolean;
    isError?: boolean;
}) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {methods.map(({ value, icon: Icon, color }) => {
                const methodSales = sales.filter((sale) => sale.paymentMethod === value);
                const total = methodSales.reduce((sum, sale) => sum + Number(sale.total), 0);

                return (
                    <div key={value} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                        <span className={`rounded-xl p-3 ${color}`}><Icon className="size-5" /></span>
                        <div>
                            <p className="text-sm text-muted-foreground">{salePaymentLabels[value]}</p>
                            <p className="mt-1 text-2xl font-semibold tabular-nums">{isLoading || isError ? "—" : formatSaleCurrency(total)}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {isLoading ? "Cargando..." : isError ? "Sin información disponible" : `${methodSales.length} ${methodSales.length === 1 ? "venta completada" : "ventas completadas"}`}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
