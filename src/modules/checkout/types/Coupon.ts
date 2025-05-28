export type Coupon = {
  id: string;
  name: string | null;
  valid: boolean;
  amountOff: number | null;
  percentOff: number | null;
  productIds: string[];
  duration: "forever" | "once" | "repeating";
  durationInMonths: number | null;
  redeemBy: number | null;
  metadata: Record<string, string> | null;
};
