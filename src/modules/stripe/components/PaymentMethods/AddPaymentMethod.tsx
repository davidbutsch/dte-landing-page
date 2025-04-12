import { openErrorDialog } from "@/components";
import { stripePromise } from "@/libs";
import { createSetupIntent } from "@/modules/stripe";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  ModalProps,
} from "@mui/material";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type AddPaymentMethodDialogOptions = {
  open: ModalProps["open"];
  onClose: ModalProps["onClose"];
};

/**
 * A dialog component that adds a payment method for a customer using Stripe's Payment Element.
 *
 * @param props - The properties for the dialog component.
 * @param props.open - Determines whether the dialog is open or closed.
 * @param props.onClose - Callback function triggered when the dialog is closed.
 */
const AddPaymentMethodDialog = ({
  open,
  onClose,
}: AddPaymentMethodDialogOptions) => {
  const queryClient = useQueryClient();

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  // METHODS

  // Closes dialog box
  const close = () => onClose?.({}, "escapeKeyDown");

  // Handles the continue button click event
  const onContinue = async () => {
    // Disable submit button if Stripe.js has not yet loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    const result = await stripe.confirmSetup({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.origin, // Redirect URL after payment confirmation
      },
      redirect: "if_required", // Only redirects if required (such as a bank redirect)
    });

    setIsLoading(false);

    // Open error dialog on error
    if (result.error && result.error.type != "validation_error")
      openErrorDialog({ text: result.error.message });
    // If payment was successful, close dialog box and refetch payment methods
    if (result.setupIntent?.status === "succeeded") {
      close();
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Payment Method</DialogTitle>
      <DialogContent>
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="cream" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          disabled={!stripe || !elements}
          loading={isLoading}
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Button component that opens dialog for adding customer payment methods.
 */
export const AddPaymentMethod = () => {
  // API
  const { data: response } = useQuery({
    queryKey: ["setupIntent"],
    queryFn: () => createSetupIntent(),
  });

  // STATE
  const [isDialogOpen, setDialogOpen] = useState(false);

  // METHODS
  const onDialogOpen = () => setDialogOpen(true);
  const onDialogClose = () => setDialogOpen(false);

  if (response?.data.clientSecret)
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "fit-content",
          }}
          startIcon={<Icon className="material-symbols-outlined">add</Icon>}
          onClick={onDialogOpen}
        >
          Add Payment Method
        </Button>

        <Elements
          stripe={stripePromise}
          options={{ clientSecret: response.data.clientSecret }}
        >
          <AddPaymentMethodDialog open={isDialogOpen} onClose={onDialogClose} />
        </Elements>
      </>
    );
};
