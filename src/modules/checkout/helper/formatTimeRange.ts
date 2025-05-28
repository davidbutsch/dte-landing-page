import { PriceRecurring } from "@/modules/products";

export function formatTimeRange(
  recurring: PriceRecurring,
  startDate = new Date()
) {
  const { interval, intervalCount } = recurring;
  const endDate = new Date(startDate);

  switch (interval) {
    case "day":
      endDate.setDate(endDate.getDate() + intervalCount);
      break;
    case "week":
      endDate.setDate(endDate.getDate() + intervalCount * 7);
      break;
    case "month":
      endDate.setMonth(endDate.getMonth() + intervalCount);
      break;
    case "year":
      endDate.setFullYear(endDate.getFullYear() + intervalCount);
      break;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const startStr = startDate.toLocaleDateString("en-US", options);
  const endStr = endDate.toLocaleDateString("en-US", options);
  const yearStr = endDate.getFullYear();

  return `${startStr} - ${endStr}, ${yearStr}`;
}
