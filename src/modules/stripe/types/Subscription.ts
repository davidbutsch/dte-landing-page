export type SubscriptionItem = {
  price: string;
  quantity: number;
  discounts?: {
    // id of promotion code object
    promotion_code?: string | undefined;
  }[];
};
