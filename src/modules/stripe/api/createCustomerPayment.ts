import { api } from "@/libs";

export const createCustomerPayment = async (priceId: string) =>
  api.post("/stripe/customers/me/payments", { priceId });
