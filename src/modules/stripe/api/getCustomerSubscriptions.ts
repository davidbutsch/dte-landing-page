import { api } from "@/libs";
import { Subscription } from "@/modules/checkout";
import { AxiosResponse } from "axios";

export type GetCustomerSubscriptionsResponse = AxiosResponse<Subscription[]>;

export const getCustomerSubscriptions =
  async (): Promise<GetCustomerSubscriptionsResponse> =>
    api.get(`/subscriptions/`);
