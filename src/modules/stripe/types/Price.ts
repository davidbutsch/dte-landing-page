export type BillingScheme = "per_unit" | "tiered";

export type RecurringPriceInterval = "day" | "month" | "week" | "year";
export type RecurringPriceUsageType = "licensed" | "metered";

export type RecurringPrice = {
  interval: RecurringPriceInterval;
  intervalCount: number;
  usageType: RecurringPriceUsageType;
};

export type PriceTiersMode = "graduated" | "volume";
export type PriceType = "one_time" | "recurring";

export type Price = {
  id: string;
  active: boolean;
  billingScheme: BillingScheme; // 'per_unit' or 'tiered'
  recurring: RecurringPrice | null;
  tiersMode: PriceTiersMode | null; // 'volume' or 'graduated' ... null if Price.billingScheme is 'per_unit'
  type: PriceType; // 'recurring' or 'one_time'
  unitAmount: number | null; // null if Price.billingScheme is 'tiered'
  displayText: string; // ui display property
};
