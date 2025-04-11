import { api } from "@/libs";
import { getIdToken } from "@/modules/auth";
import { AxiosResponse } from "axios";

export type CreateSetupIntentResponse = AxiosResponse<{
  clientSecret: string;
}>;

/**
 * Creates a new setup intent for the current customer.
 *
 * @param idToken - Optional ID token for authentication. If not provided, it will be retrieved automatically.
 * @returns A promise resolving a client secret used for Stripe Elements.
 */
export const createSetupIntent = async (
  idToken?: string
): Promise<CreateSetupIntentResponse> => {
  // get id token if none provided
  if (!idToken) idToken = await getIdToken();

  return await api.post(
    `/stripe/customers/me/setup-intents`,
    {}, // empty payload
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};
