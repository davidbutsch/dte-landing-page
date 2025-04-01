import { ListItemIcon, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogOutMenuItem = () => {
  const navigate = useNavigate();

  /**
   * Triggered by Logout MenuItem.
   *
   * Signs user out and navigates to the log in page.
   */
  const handleLogout = async () => {
    // await signOut(auth); TODOOOOOO
    // navigate("/log-in");
  };

  return (
    <MenuItem onClick={handleLogout}>
      <ListItemIcon className="material-symbols-outlined">logout</ListItemIcon>
      Logout
    </MenuItem>
  );
};
