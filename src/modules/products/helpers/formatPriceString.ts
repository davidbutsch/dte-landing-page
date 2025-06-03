import { Price } from "@/modules/products";

export function formatPriceString(price: Price): string {
  const { recurring, tiers, currency } = price;

  if (!recurring || !tiers || tiers.length === 0) {
    return "Price not available";
  }

  // Find the last tier (the one with upTo: null = "infinite" tier, lowest price)
  const lastTier = tiers[0];
  const amountInDollars = (lastTier.unitAmount / 100).toFixed(2);

  const currencySymbol = currency.toLowerCase() === "usd" ? "$" : ""; // basic support

  let interval = recurring.interval;
  let intervalCount = recurring.intervalCount;

  const duration =
    intervalCount === 1
      ? interval
      : `${intervalCount} ${interval}${intervalCount > 1 ? "s" : ""}`;

  return `Starts at ${currencySymbol}${amountInDollars} / ${duration}`;
}
