import { useAuthStore } from "@/modules/auth";
import { theme } from "@/theme";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { EditAccountMenuItem } from "./EditAccountMenuItem";
import { LogOutMenuItem } from "./LogOutMenuItem";

/**
 * Returns avatar icon button and down menu when avatar is pressed.
 */
export const AccountControls = () => {
  const { user } = useAuthStore();
  if (!user) return;

  // Menu attaches itself to anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); // If anchor element is null, open is false and the menu component is hidden

  /**
   * Triggered by icon button click event.
   *
   * Sets anchor element -> sets 'open' to true.
   */
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Triggered by menu onClose event.
   *
   * Sets anchor element to null -> sets 'open' to false.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* NavBar account controls button (profile button) */}
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: "auto" }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
        >
          {user.attributes.given_name?.[0]}
        </Avatar>
      </IconButton>
      {/* Account controls menu */}
      <Menu
        id="user-controls-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack
          sx={{
            ml: "auto",
            p: 2,
            pr: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Icon button that doesn't do anything (maybe a profile picture?) */}
          <IconButton
            size="small"
            sx={{ cursor: "default" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                height: "64px",
                width: "64px",
                fontSize: 34,
              }}
            >
              {user.attributes.given_name?.[0]}
            </Avatar>
          </IconButton>

          {/* Menu Items */}
          <Stack ml={2} justifyContent="center">
            <Typography variant="body1" fontWeight={600}>
              {user.attributes.given_name} {user.attributes.family_name}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {user.attributes.email}
            </Typography>
          </Stack>
        </Stack>
        <EditAccountMenuItem />
        <Divider />
        <LogOutMenuItem />
      </Menu>
    </>
  );
};
