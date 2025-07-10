import { Price } from "@/modules/products";

export type SubscriptionItem = {
  price: Price | string;
  quantity: number;
  discounts?: {
    // id of promotion code object
    promotion_code?: string | undefined;
  }[];
  metadata?: Record<string, string>;
};

export type Subscription = {
  id: string;
  billingCycleAnchor: number;
  cancelAt: number | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: number | null;
  customerId: string;
  latestInvoiceId: string | null;
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "paused"
    | "trialing"
    | "unpaid";
  items: SubscriptionItem[];
  metadata: Record<string, string> | null;
};
