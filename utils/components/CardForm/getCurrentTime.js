/* Current time rounded up to the next 5 minutes, e.g. 14:02 → "14:05" */
export default function getCurrentTime() {
  const now = new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5, 0, 0);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
