import { api } from "@/libs";
import { Customer } from "@/modules/stripe";
import { AxiosError, AxiosResponse } from "axios";
import { createStripeCustomer } from "./createStripeCustomer";

export type GetStripeCustomerResponse = AxiosResponse<Customer>;

/**
 * Retrieves the Stripe customer associated with the current user.
 * If the customer does not exist, a new customer is created.
 *
 * @returns A promise that resolves to the Stripe customer response.
 * @throws Will throw an error if the request fails for reasons other than a 404 status.
 */
export const getStripeCustomer =
  async (): Promise<GetStripeCustomerResponse> => {
    try {
      // try to fetch customer
      return await api.get(`/stripe/customers/me`);
    } catch (error) {
      // if customer not found, create new customer
      if (error instanceof AxiosError && error.status == 404)
        return await createStripeCustomer();
      // throw all other errors
      else throw error;
    }
  };
