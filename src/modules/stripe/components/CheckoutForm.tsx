import { Button } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    // Disable submit button if Stripe.js has not yet loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe/redirect`, // Redirect URL after payment confirmation
      },
    });

    if (result.error) {
      console.log(result.error);
      // openErrorDialog({ title: "Payment Error", text: result.error.message });
    }

    setIsLoading(false);
  };

  return (
    <>
      <PaymentElement options={{ layout: "auto" }} />
      <Button
        variant="contained"
        onClick={handleContinue}
        disabled={!stripe || !elements}
        loading={isLoading}
      >
        Continue
      </Button>
    </>
  );
};
