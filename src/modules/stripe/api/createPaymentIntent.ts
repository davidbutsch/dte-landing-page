import { api } from "@/libs";
import { AxiosResponse } from "axios";

export type CreatePaymentIntentResponse = AxiosResponse<{
  clientSecret: string;
}>;

export const createPaymentIntent = (): Promise<CreatePaymentIntentResponse> =>
  api.post("/stripe/payment-intent");
