import { api } from "@/libs";
import { AxiosResponse } from "axios";

export type CreatePaymentIntentResponse = AxiosResponse<{
  clientSecret: string;
}>;

export const createPaymentIntent = (
  productId: string
): Promise<CreatePaymentIntentResponse> =>
  api.post(`/products/${productId}/payment-intents`);
