import { api } from "@/libs";
import { Subscription } from "@/modules/checkout";
import { AxiosResponse } from "axios";

export type CreateCustomerSubscriptionResponse = AxiosResponse<Subscription>;

export const createCustomerSubscription = async (
  subscription: Partial<Subscription>
): Promise<CreateCustomerSubscriptionResponse> =>
  api.post("/subscriptions", subscription);
