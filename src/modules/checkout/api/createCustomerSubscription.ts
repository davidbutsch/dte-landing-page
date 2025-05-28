import { api } from "@/libs";
import { SubscriptionItem } from "@/modules/stripe";

export const createCustomerSubscription = async (items: SubscriptionItem[]) =>
  api.post("/subscriptions", { items });
