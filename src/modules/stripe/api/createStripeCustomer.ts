import { api } from "@/libs";
import { getIdToken } from "@/modules/auth";
import { Customer } from "@/modules/stripe";
import { AxiosResponse } from "axios";

export type CreateStripeCustomerResponse = AxiosResponse<Customer>;

/**
 * Creates a new Stripe customer for the authenticated user.
 *
 * @param idToken - Optional ID token for authentication. If not provided, it will be retrieved automatically.
 * @returns A promise resolving to the response containing the Stripe customer details.
 */
export const createStripeCustomer = async (
  idToken?: string
): Promise<CreateStripeCustomerResponse> => {
  // get id token if none provided
  if (!idToken) idToken = await getIdToken();

  return await api.post(
    `/stripe/customers/me`,
    {}, // empty payload
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};
