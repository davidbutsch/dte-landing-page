import { SUPPORT_EMAIL_ADDRESS } from "@/common";
import { openInfoDialog } from "@/components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  ModalProps,
  Stack,
  Typography,
} from "@mui/material";
import { SubscriptionsList } from "./SubscriptionsList";

export type SubscriptionsDialogOptions = {
  open: ModalProps["open"];
  onClose: ModalProps["onClose"];
};

/**
 * A dialog component that displays subscriptions for a Stripe customer.
 *
 * @param props - The options for the dialog.
 * @param props.open - Controls whether the dialog is open.
 * @param props.onClose - Callback function triggered when the dialog is closed.
 */
export const SubscriptionsDialog = ({
  open,
  onClose,
}: SubscriptionsDialogOptions) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Subscriptions</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <SubscriptionsList />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} component="span">
          <Icon className="material-symbols-outlined" fontSize="small">
            info
          </Icon>
          <Typography
            variant="caption"
            sx={{
              mt: 1 / 4,

              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() =>
              openInfoDialog({
                title: "Subscriptions",
                lines: [
                  "When subscribing to a product, the plan you select specifies the length of your billing period. When a billing period expires, we will try to charge your active payment method for the next billing period.",
                  "If something goes wrong during this process, a subscription will become inactive. Additional information regarding inactive subscriptions can be viewed by selecting an inactive subscription.",
                  `To resolve issues with inactive subscriptions, please contact us at ${SUPPORT_EMAIL_ADDRESS}.`,
                ],
              })
            }
          >
            Read more on subscriptions
          </Typography>
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
