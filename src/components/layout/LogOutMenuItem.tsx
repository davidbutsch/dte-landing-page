import { openErrorDialog } from "@/components/elements";
import { signOut } from "@aws-amplify/auth";
import { ListItemIcon, MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export const LogOutMenuItem = () => {
  // API
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onError: (error) => {
      openErrorDialog({ text: error.message });
    },
    onSuccess: () => {
      window.location.href = "/log-in";
    },
  });

  /**
   * Triggered by Logout MenuItem.
   *
   * Signs user out and route to the log in page.
   */
  const handleLogout = async () => {
    signOutMutation.mutate(undefined);
  };

  return (
    <MenuItem onClick={handleLogout}>
      <ListItemIcon className="material-symbols-outlined">logout</ListItemIcon>
      Logout
    </MenuItem>
  );
};
