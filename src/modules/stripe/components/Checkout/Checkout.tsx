import {
  AddPaymentMethod,
  createCustomerSubscription,
  PaymentMethods,
} from "@/modules/stripe";
import { Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export type CheckoutOptions = {
  priceId: string;
};

export const Checkout = ({ priceId }: CheckoutOptions) => {
  const createCustomerSubscriptionMutation = useMutation({
    mutationFn: () => createCustomerSubscription(priceId),
  });

  const onCheckout = () => createCustomerSubscriptionMutation.mutate();

  return (
    <Stack sx={{ flexGrow: 1 }} spacing={2} padding={4}>
      <PaymentMethods />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <AddPaymentMethod />
        <Button
          variant="contained"
          color="secondary"
          onClick={onCheckout}
          disabled={createCustomerSubscriptionMutation.isPending}
          loading={createCustomerSubscriptionMutation.isPending}
        >
          Checkout
        </Button>
      </Stack>
    </Stack>
  );
};
