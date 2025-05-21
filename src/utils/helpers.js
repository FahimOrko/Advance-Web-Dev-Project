export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short", // e.g., May
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-US", options);
}
