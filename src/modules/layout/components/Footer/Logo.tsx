import { DTE_LOGO_URL } from "@/common";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Box flex={1} display="flex" alignItems="center">
      <Link to="/" style={{ height: 32 }}>
        <img src={DTE_LOGO_URL} height={32} />
      </Link>
    </Box>
  );
};
