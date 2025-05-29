import { openErrorDialog } from "@/components";
import {
  createCustomerSubscription,
  QueryCoupon,
  QueryPlayer,
} from "@/modules/checkout";
import { getStripeCustomer } from "@/modules/stripe";
import {
  Button,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  JsonParam,
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import { InformationStep, PaymentStep } from "./Steps";

const steps = ["Player Information", "Payment"];

export const CheckoutStepper = () => {
  const navigate = useNavigate();

  const [step, setStep] = useQueryParam("step", withDefault(NumberParam, 0));
  const [priceId] = useQueryParam("priceId", StringParam);
  const [coupon] = useQueryParam<QueryCoupon | undefined>("coupon", JsonParam);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(false);

  const [players] = useQueryParam<QueryPlayer[] | undefined>(
    "players",
    JsonParam
  );

  // API
  const createCustomerSubscriptionMutation = useMutation({
    mutationFn: createCustomerSubscription,
    onSuccess: () => navigate("/checkout/redirect"),

    onError: (error) => {
      if (error instanceof AxiosError)
        openErrorDialog({ text: error.response?.data.error.message });
      else openErrorDialog({ text: error.message });
    },
  });

  const { data: response } = useQuery({
    queryKey: ["customer", "me"],
    queryFn: getStripeCustomer,
  });
  const customer = response?.data;

  // METHODS

  const handleNext = () => {
    // Information step -> Payment step
    if (step == 0) {
      // Temporarily disable payment button to prevent misclicks when going to payment step
      setIsPaymentDisabled(true);
      setTimeout(() => setIsPaymentDisabled(false), 3000);
    }

    // Payment step -> Finished ... create subscription on click
    if (step == 1 && priceId && players) {
      // Validate that a default payment method exists
      if (!customer?.defaultPaymentMethodId)
        return openErrorDialog({
          title: "Missing details",
          text: "No payment method selected.",
        });

      const playerEntries = players.map((player, i) => {
        return [
          `player${i + 1}`,
          `${player.name}, ${player.grade}${
            player.grade == "Kindergarten" ? "" : " grade"
          }`,
        ];
      });

      const playersObject = Object.fromEntries(playerEntries);
      return createCustomerSubscriptionMutation.mutate({
        items: [
          {
            price: priceId,
            quantity: players.length,
            discounts: [
              {
                // The coupon id is actually a promotion id... lol
                promotion_code: coupon?.id,
              },
            ],
          },
        ],
        metadata: { ...playersObject },
      });
    }

    if (step)
      // Increment step by 1 if query parameter 'step' exists
      setStep(step + 1);
    // Otherwise set step to the second step (1)
    else setStep(1);
  };

  const handleBack = () => {
    // Reduce step by 1 if query parameter 'step' exists
    if (step && step > 1) setStep(step - 1);
    // Otherwise set step to the initial step (0)
    else setStep(0);
  };

  return (
    <Stepper activeStep={step || 0} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step}</StepLabel>
          <StepContent>
            {index == 0 && <InformationStep />}
            {index == 1 && <PaymentStep />}

            <Stack mt={4} direction="row" gap={1}>
              <Button
                variant="contained"
                color="cream"
                disabled={index === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isPaymentDisabled}
                loading={createCustomerSubscriptionMutation.isPending}
              >
                {index === steps.length - 1 ? "Finish & Pay" : "Continue"}
              </Button>
            </Stack>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};
