import { format } from "date-fns";

export const nowIso = (): string => new Date().toISOString();

/** "Wed 31, July 2024" (to match your mock) */
export const prettyDate = (iso: string): string => {
  const d = new Date(iso);
  return `${format(d, "EEE dd")}, ${format(d, "MMMM yyyy")}`;
};
