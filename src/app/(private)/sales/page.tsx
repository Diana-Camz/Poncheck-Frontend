"use client";

import { useSalesByStatusAndDateRange } from '@/features/sales/hooks/useSale';
import { Accordion } from '@/components/ui/accordion';
import { PaymentMethodSummary } from '@/features/sales/components/payment-method-summary';
import SaleItem from '@/features/sales/components/sale-item';
import { CalendarIcon, ChevronDown, ReceiptText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { endOfDay, format, isSameDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

export default function Sales() {
  const [selectedStatus, setSelectedStatus] = useState<"COMPLETED" | "CANCELLED">("COMPLETED");
  const statusLabel = selectedStatus === "CANCELLED" ? "canceladas" : "completadas";
  const [selectedRange, setSelectedRange] = useState<(DateRange & { from: Date }) | undefined>();
  const firstDay = selectedRange?.from ?? new Date();
  const start = format(startOfDay(firstDay), "yyyy-MM-dd'T'HH:mm:ss.SSS");
  const end = format(endOfDay(selectedRange?.to ?? firstDay), "yyyy-MM-dd'T'HH:mm:ss.SSS");
  const { data: sales = [], isError, isPending } = useSalesByStatusAndDateRange(selectedStatus, start, end);
  const selectedDateLabel = `del ${format(firstDay, "dd 'de' MMMM", { locale: es })}${
    selectedRange?.to && !isSameDay(firstDay, selectedRange.to)
      ? ` al ${format(selectedRange.to, "dd 'de' MMMM", { locale: es })}`
      : ''
  }`;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-hidden bg-background p-4 lg:p-6">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ventas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Consulta tus ventas y los productos de cada operación.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <button type="button" aria-label="Seleccionar fecha" className="flex flex-col-reverse gap-2 items-end cursor-pointer">
                {!selectedRange && (
                  <span className="text-xs text-muted-foreground">seleccionar fecha</span>
                )}
              <CalendarIcon className="size-11 cursor-pointer rounded-lg border border-secondary bg-card p-2 text-foreground shadow-sm hover:shadow-md transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-70 mr-15 items-center justify-center" align="start">
              <Calendar
                mode="range"
                required
                min={1}
                selected={selectedRange}
                onSelect={(range, day) => {
                  if (!selectedRange || selectedRange.to) {
                    setSelectedRange({ from: day });
                  } else if (range?.from) {
                    setSelectedRange({ from: range.from, to: range.to });
                  }
                }}
                className="w-full rounded-lg border bg-card dark:bg-background"
                captionLayout="dropdown"
              />
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedRange && (
            <button
              type="button"
              className="text-xs text-muted-foreground cursor-pointer"
              onClick={() => setSelectedRange(undefined)}
            >
              volver al dia de hoy
            </button>
          )}
        </div>
      </div>
      <section aria-labelledby="payment-summary-title" className="shrink-0 space-y-3">
        <h2 id="payment-summary-title" className="text-sm font-semibold">Resumen por método de pago</h2>
        <PaymentMethodSummary sales={sales} isLoading={isPending} isError={isError} status={selectedStatus} />
      </section>
      <section aria-labelledby="sales-list-title" className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <h2 id="sales-list-title" className="text-lg font-semibold">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-ring">
                  {selectedStatus === "CANCELLED" ? "Ventas canceladas" : "Historial de ventas"}
                  <ChevronDown className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48">
                <DropdownMenuRadioGroup value={selectedStatus} onValueChange={(value) => {
                  if (value === "COMPLETED" || value === "CANCELLED") setSelectedStatus(value);
                }}>
                  <DropdownMenuRadioItem value="COMPLETED" className="cursor-pointer">Ventas completadas</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="CANCELLED" className="cursor-pointer">Ventas canceladas</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </h2>
          <span className="rounded-full px-3 py-1 text-[0.9rem] text-muted-foreground">*Ventas {statusLabel} {selectedDateLabel}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none overscroll-contain">
        {isPending ? (
          <p role="status" className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">Cargando ventas...</p>
        ) : isError ? (
          <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-sm text-destructive">No se pudieron cargar las ventas.</p>
        ) : sales.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-4 py-12 text-center">
            <ReceiptText className="mb-2 size-8 text-muted-foreground" />
            <p className="font-medium">No hay ventas {statusLabel} en las fechas seleccionadas</p>
            <p className="text-sm text-muted-foreground">Aquí aparecerán las ventas y el detalle de sus productos.</p>
          </div>
        ) : (
          <Accordion type="multiple" className="gap-3 ">
            {sales.map((sale) => <SaleItem key={sale.id} item={sale} />)}
          </Accordion>
        )}
        </div>
      </section>
    </div>
  );
}
