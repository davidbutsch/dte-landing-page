import { theme } from "@/theme";
import { Button, styled } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutButton = styled(Button)({
  marginTop: theme.spacing(4),
});

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    // Disable submit button if Stripe.js has not yet loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe/redirect`, // Redirect URL after payment confirmation
      },
    });

    setIsLoading(false);
  };

  return (
    <>
      <PaymentElement options={{ layout: "auto" }} />
      <CheckoutButton
        variant="contained"
        onClick={handleContinue}
        disabled={!stripe || !elements}
        loading={isLoading}
      >
        Continue & Pay
      </CheckoutButton>
    </>
  );
};
