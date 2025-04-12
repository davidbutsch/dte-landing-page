import { api } from "@/libs";

export const createCustomerSubscription = async (priceId: string) =>
  api.post("/stripe/customers/me/subscriptions", { priceId });
