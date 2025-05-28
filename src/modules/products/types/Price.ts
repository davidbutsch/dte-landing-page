export type PriceRecurring = {
  interval: "day" | "week" | "month" | "year";
  intervalCount: number;
  trialPeriodDays: number | null;
};

export type PriceTier = {
  unitAmount: number;
  upTo: number | null;
};

export type Price = {
  id: string;
  metadata: Record<string, string> | null;
  productId: string | null;
  lookupKey: string | null;
  billingScheme: "per_unit" | "tiered";
  currency: string;
  recurring: PriceRecurring | null;
  unitAmount: number | null;
  tiers: PriceTier[] | null;
};
