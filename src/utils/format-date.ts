import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export function formatCalendarDate(dateString: string) {
  const date = parse(dateString, "yyyy-MM-dd", new Date());

  return format(date, "PPPP", { locale: es });
}

export function formatDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}