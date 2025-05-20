import { Box, CircularProgress, Fade } from "@mui/material";
import React from "react";

export type LoadingWrapperOptions = {
  isLoading: boolean;
  children: React.ReactNode;
};

/**
 * Expands to the size of parent with relative position.
 *
 * Displays centered circular progress element.
 */
export const LoadingWrapper = ({
  isLoading,
  children,
}: LoadingWrapperOptions) => {
  return (
    <Box>
      <Fade in={isLoading}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ width: 100 }} />
        </Box>
      </Fade>
      {children}
    </Box>
  );
};
