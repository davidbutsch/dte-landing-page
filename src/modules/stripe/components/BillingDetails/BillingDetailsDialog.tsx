import {
  AddPaymentMethod,
  getStripeCustomer,
  GetStripeCustomerResponse,
  PaymentMethods,
} from "@/modules/stripe";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ModalProps,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type BillingDetailsDialogOptions = {
  open: ModalProps["open"];
  onClose: ModalProps["onClose"];
};

/**
 * A dialog component that displays billing details for a Stripe customer.
 *
 * @param props - The options for the dialog.
 * @param props.open - Controls whether the dialog is open.
 * @param props.onClose - Callback function triggered when the dialog is closed.
 */
export const BillingDetailsDialog = ({
  open,
  onClose,
}: BillingDetailsDialogOptions) => {
  // get stripe customer details
  const getStripeCustomerQuery = useQuery<
    GetStripeCustomerResponse,
    AxiosError
  >({
    queryKey: ["customer", "me"],
    queryFn: getStripeCustomer,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Billing Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography fontWeight={600}>Invoice Prefix</Typography>
          <Chip
            label={
              getStripeCustomerQuery?.data?.data.invoice.prefix || "Loading..."
            }
            color="cream"
            size="small"
            sx={{
              width: "fit-content",
            }}
          />
          <Typography fontWeight={600}>Payment Methods</Typography>
          <PaymentMethods />
          <AddPaymentMethod />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          color="cream"
          variant="contained"
          onClick={() => onClose?.({}, "escapeKeyDown")}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
