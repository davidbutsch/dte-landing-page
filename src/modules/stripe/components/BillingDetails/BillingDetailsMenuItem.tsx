import { ListItemIcon, MenuItem } from "@mui/material";
import { useState } from "react";
import { BillingDetailsDialog } from "./BillingDetailsDialog";

/**
 * A menu item component that opens a dialog to display billing details.
 */
export const BillingDetailsMenuItem = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => setDialogOpen(true);
  const onDialogClose = () => setDialogOpen(false);

  return (
    <>
      {/* Menu item button */}
      <MenuItem onClick={onDialogOpen}>
        <ListItemIcon
          className="material-symbols-outlined"
          color="red !important"
        >
          receipt_long
        </ListItemIcon>
        Billing Details
      </MenuItem>
      <BillingDetailsDialog open={isDialogOpen} onClose={onDialogClose} />
    </>
  );
};
