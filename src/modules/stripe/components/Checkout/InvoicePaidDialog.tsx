import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export type InvoicePaidDialogOptions = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const InvoicePaidDialog = ({
  open,
  setOpen,
}: InvoicePaidDialogOptions) => {
  const navigate = useNavigate();

  const navigateAndClose = (to = "/") => {
    navigate(to);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => navigateAndClose()}>
      <DialogTitle>Payment Success</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" gap={2} alignItems="center">
          <Icon
            className="material-symbols-outlined"
            sx={{ fontSize: 64 }}
            color="success"
          >
            check_circle
          </Icon>
          <DialogContentText paddingRight={1} fontSize={18}>
            Your payment has been processed successfully. You will receive an
            email confirmation shortly.
          </DialogContentText>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="cream"
          onClick={() => navigateAndClose()}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => navigateAndClose("/schedule")}
        >
          View Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};
