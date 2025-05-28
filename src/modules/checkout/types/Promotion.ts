import { Coupon } from "./Coupon";

export type Promotion = {
  id: string;
  active: boolean;
  code: string;
  coupon: Coupon;
  customerId: string | null;
  expiresAt: number | null;
  maxRedemptions: number | null;
  restrictions: {
    firstTimeTransaction: boolean;
    minimumAmount: number | null;
  };
  timesRedeemed: number;
  metadata: Record<string, string> | null;
};
