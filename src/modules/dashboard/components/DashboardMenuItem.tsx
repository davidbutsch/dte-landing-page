import { ListItemIcon, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * A menu item component that links to the dashboard page.
 */
export const DashboardMenuItem = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon className="material-symbols-outlined">
        monitoring
      </ListItemIcon>
      Dashboard
    </MenuItem>
  );
};
