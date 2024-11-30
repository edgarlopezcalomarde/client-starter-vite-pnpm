export function formatDateString(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan en 0
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function shortDate(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function shortDateTypeInput(fecha: Date) {
  return fecha.toISOString().split("T")[0];
}

export function getWeekNumber(date: Date): number {
  const startDate: Date = new Date(date.getFullYear(), 0, 1);
  const diff: number = date.getTime() - startDate.getTime();
  const oneDay: number = 1000 * 60 * 60 * 24;
  const days: number = Math.floor(diff / oneDay);
  const weekNumber: number = Math.ceil((days + 1) / 7);
  return weekNumber;
}
