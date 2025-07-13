import { SEASON_INTERVALS } from "@/common";
import { Price } from "@/modules/products";

function getFirstOfMonthUTC(monthIndex: number): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), monthIndex, 1));
}

function addMonthsUTC(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setUTCMonth(newDate.getUTCMonth() + months);
  return newDate;
}

export function formatSubscriptionRange(price: Price): string | null {
  if (!price.recurring) return null;

  const { interval, intervalCount = 1 } = price.recurring;
  const now = new Date();
  const currentMonth = now.getUTCMonth();

  let startDate: Date;

  // Handle custom billing anchors
  switch (price.metadata?.billingCycleAnchor) {
    case "firstOfTheMonth":
      if (interval !== "month") return null;
      startDate = getFirstOfMonthUTC(currentMonth);
      break;

    case "seasonal":
      if (interval !== "month") return null;
      const activeSeason = SEASON_INTERVALS.find(
        (season) => currentMonth >= season.start && currentMonth <= season.end
      );
      if (!activeSeason) return null;
      startDate = getFirstOfMonthUTC(activeSeason.start);
      break;

    default:
      startDate = now; // fallback to now
  }

  // Determine end date
  let endDate: Date;

  switch (interval) {
    case "month":
      endDate = addMonthsUTC(startDate, intervalCount);
      break;
    case "year":
      endDate = new Date(startDate);
      endDate.setUTCFullYear(startDate.getUTCFullYear() + intervalCount);
      break;
    case "week":
      endDate = new Date(startDate);
      endDate.setUTCDate(startDate.getUTCDate() + intervalCount * 7);
      break;
    case "day":
      endDate = new Date(startDate);
      endDate.setUTCDate(startDate.getUTCDate() + intervalCount);
      break;
    default:
      return null;
  }

  // Format as "Jul 1 – Oct 1, 2025"
  const sameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const yearStr = sameYear ? `, ${startDate.getUTCFullYear()}` : "";

  return `${startStr} - ${endStr}${yearStr}`;
}
