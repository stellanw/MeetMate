/* "2026-11-24" → "Dienstag, 24. November 2026" */
export default function formatLongDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
