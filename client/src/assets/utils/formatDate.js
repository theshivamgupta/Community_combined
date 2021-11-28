import { formatDistanceToNow } from "date-fns";

export function formatDateToNow(date) {
  let newDate = new Date(Number(date)).toISOString();
  newDate = formatDistanceToNow(new Date(newDate), {
    addSuffix: true,
  }).toUpperCase();
  return newDate;
}
