import { api } from "@/libs";
import { Customer } from "@/modules/stripe";
import { AxiosResponse } from "axios";

export type CreateStripeCustomerResponse = AxiosResponse<Customer>;

/**
 * Creates a new Stripe customer for the authenticated user.
 *
 * @returns A promise resolving to the response containing the Stripe customer details.
 */
export const createStripeCustomer =
  async (): Promise<CreateStripeCustomerResponse> =>
    api.post(`/stripe/customers/me`);
