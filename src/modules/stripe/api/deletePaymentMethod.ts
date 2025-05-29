import { api } from "@/libs";
import { PaymentMethod } from "@/modules/stripe";
import { AxiosResponse } from "axios";

export type DeletePaymentMethodResponse = AxiosResponse<PaymentMethod>;

/**
 * Updates Stripe customer's default payment method.
 *
 * @returns A promise resolving to a response containing the Stripe customer details.
 */
export const deletePaymentMethod = async (
  paymentMethodId: string
): Promise<DeletePaymentMethodResponse> =>
  api.delete(`/payments/methods/${paymentMethodId}`);
