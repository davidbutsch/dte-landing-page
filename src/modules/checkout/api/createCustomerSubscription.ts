import { api } from "@/libs";
import { Subscription } from "@/modules/checkout";

export const createCustomerSubscription = async (subscription: Subscription) =>
  api.post("/subscriptions", subscription);
