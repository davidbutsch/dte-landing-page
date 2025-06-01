import { Box, Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const RedirectPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,

        height: "50vh",
      }}
    >
      <Icon
        className="material-symbols-outlined"
        sx={{ fontSize: 72 }}
        color="success"
      >
        check_circle
      </Icon>
      <span>
        <Typography variant="h5" fontWeight="bold">
          Payment Successful
        </Typography>
        <Typography variant="subtitle1">
          Navigate to the <Link to="/calendar">Calendar</Link> to view program
          schedule.
        </Typography>
      </span>
    </Box>
  );
};
