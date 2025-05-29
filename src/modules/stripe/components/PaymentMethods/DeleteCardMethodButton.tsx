import { openErrorDialog } from "@/components";
import { queryClient } from "@/libs";
import { deletePaymentMethod, PaymentMethod } from "@/modules/stripe";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type DeleteCardMethodButtonOptions = {
  method: PaymentMethod;
};

export const DeleteCardMethodButton = ({
  method,
}: DeleteCardMethodButtonOptions) => {
  // STATE
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  // API
  const deletePaymentMethodMutation = useMutation({
    mutationFn: () => deletePaymentMethod(method.id),
    onSuccess: () => {
      // refetch customer data
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error) => openErrorDialog({ text: error.message }),
  });
  const isLoading = deletePaymentMethodMutation.isPending;

  // METHODS
  const handleCloseConfirmationDialog = () =>
    setIsConfirmationDialogOpen(false);
  const handleOpenConfirmationDialog = () => setIsConfirmationDialogOpen(true);

  const handleDelete = () => {
    handleCloseConfirmationDialog();
    deletePaymentMethodMutation.mutate();
  };

  return (
    <>
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm card deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This payment method will be removed from your account but remain
            accessible for record-keeping purposes.
            <br />
            <br />
            Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseConfirmationDialog}
          >
            No
          </Button>
          <Button variant="contained" color="cream" onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton
        onClick={handleOpenConfirmationDialog}
        loading={isLoading}
        sx={{
          cursor: "pointer",
          width: 27,
          height: 27,
          color: "#000",
        }}
        className="material-symbols-outlined"
      >
        delete
      </IconButton>
    </>
  );
};
