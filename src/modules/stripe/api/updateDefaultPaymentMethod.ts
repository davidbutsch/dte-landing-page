import { api } from "@/libs";
import { Customer } from "@/modules/stripe";
import { AxiosResponse } from "axios";

export type UpdateStripeCustomerResponse = AxiosResponse<Customer>;

/**
 * Updates Stripe customer's default payment method.
 *
 * @returns A promise resolving to a response containing the Stripe customer details.
 */
export const updateDefaultPaymentMethod = async (
  paymentMethodId: string
): Promise<UpdateStripeCustomerResponse> =>
  api.patch(`/customers/me/`, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
