"use client";

import { useSalesByStatus } from '@/features/sales/hooks/useSale';
import { Accordion } from '@/components/ui/accordion';
import { PaymentMethodSummary } from '@/features/sales/components/payment-method-summary';
import SaleItem from '@/features/sales/components/sale-item';
import { ReceiptText } from 'lucide-react';

export default function Sales() {
  const { data: sales = [], isError, isPending } = useSalesByStatus("COMPLETED");

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto bg-background p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ventas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Consulta tus ventas y los productos de cada operación.</p>
      </div>
      <section aria-labelledby="payment-summary-title" className="space-y-3">
        <h2 id="payment-summary-title" className="text-sm font-semibold">Resumen por método de pago</h2>
        <PaymentMethodSummary sales={sales} isLoading={isPending} isError={isError} />
      </section>
      <section aria-labelledby="sales-list-title" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id="sales-list-title" className="text-lg font-semibold">Historial de ventas</h2>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">Ventas completadas</span>
        </div>
        {isPending ? (
          <p role="status" className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">Cargando ventas...</p>
        ) : isError ? (
          <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-sm text-destructive">No se pudieron cargar las ventas.</p>
        ) : sales.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-4 py-12 text-center">
            <ReceiptText className="mb-2 size-8 text-muted-foreground" />
            <p className="font-medium">Todavía no hay ventas completadas</p>
            <p className="text-sm text-muted-foreground">Aquí aparecerán las ventas y el detalle de sus productos.</p>
          </div>
        ) : (
          <Accordion type="multiple" className="gap-3">
            {sales.map((sale) => <SaleItem key={sale.id} item={sale} />)}
          </Accordion>
        )}
      </section>
    </div>
  );
}
