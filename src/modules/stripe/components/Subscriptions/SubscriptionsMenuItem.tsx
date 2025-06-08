import { ListItemIcon, MenuItem } from "@mui/material";
import { useState } from "react";
import { SubscriptionsDialog } from "./SubscriptionsDialog";

/**
 * A menu item component that opens a dialog to display billing details.
 */
export const SubscriptionsMenuItem = () => {
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
          event_repeat
        </ListItemIcon>
        Subscriptions
      </MenuItem>
      <SubscriptionsDialog open={isDialogOpen} onClose={onDialogClose} />
    </>
  );
};
