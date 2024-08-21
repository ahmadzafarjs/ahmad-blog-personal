import { formatDistanceToNow } from "date-fns";

export function getRelativeDate(timestamp) {
  // Ensure the timestamp is a number and valid
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return "Invalid date";
  }

  // Create a Date object from the timestamp (milliseconds)
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Return relative time from now
  return formatDistanceToNow(date, { addSuffix: true });
}
