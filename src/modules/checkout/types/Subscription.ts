export type SubscriptionItem = {
  price: string;
  quantity: number;
  discounts?: {
    // id of promotion code object
    promotion_code?: string | undefined;
  }[];
  metadata?: Record<string, string>;
};

export type Subscription = {
  items: SubscriptionItem[];
  metadata?: Record<string, string>;
};
