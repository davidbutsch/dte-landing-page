import { stripePromise } from "@/libs";
import { createPaymentIntent } from "@/modules/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { CheckoutForm } from "./CheckoutForm";

export const Checkout = () => {
  const { data: response } = useQuery({
    queryKey: ["paymentIntent"],
    queryFn: createPaymentIntent,
  });

  if (response && response.data.clientSecret)
    return (
      // Might want to move this Elements provider to the providers component
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: response.data.clientSecret }}
      >
        <CheckoutForm />
      </Elements>
    );
};
