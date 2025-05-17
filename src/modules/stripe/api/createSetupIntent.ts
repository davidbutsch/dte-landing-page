import { api } from "@/libs";
import { AxiosResponse } from "axios";

export type CreateSetupIntentResponse = AxiosResponse<{
  clientSecret: string;
}>;

/**
 * Creates a new setup intent for the current customer.
 *
 * @returns A promise resolving a client secret used for Stripe Elements.
 */
export const createSetupIntent = async (): Promise<CreateSetupIntentResponse> =>
  api.post(`/payments/setup-intents`);
