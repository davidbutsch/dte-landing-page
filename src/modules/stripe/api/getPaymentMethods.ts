import { api } from "@/libs";
import { PaymentMethod } from "@/modules/stripe";
import { AxiosResponse } from "axios";

export type GetPaymentMethodsResponse = AxiosResponse<PaymentMethod[]>;

export const getPaymentMethods = async (): Promise<GetPaymentMethodsResponse> =>
  api.get(`/payments/methods/`);
