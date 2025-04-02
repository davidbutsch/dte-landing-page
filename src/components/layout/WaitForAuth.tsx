import { DTE_LOGO_URL } from "@/common";
import { useAuthStore } from "@/modules/auth";
import { Box, Fade, LinearProgress } from "@mui/material";
import React from "react";

type WaitForAuthProps = {
  children: React.ReactNode;
};

/**
 * @returns Children components once user has loaded.
 *
 * **TODO: Rework how we wait for critical data**
 */
export const WaitForAuth = ({ children }: WaitForAuthProps) => {
  const { isUserLoading } = useAuthStore();

  return (
    <>
      <Fade in={isUserLoading}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            width: "100vw",

            display: "flex",
            gap: 4,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={DTE_LOGO_URL} height={56} />

          <LinearProgress sx={{ width: 100 }} />
        </Box>
      </Fade>
      <Fade in={!isUserLoading}>
        <Box
          sx={{
            display: isUserLoading ? "none" : "inherit",
          }}
        >
          {children}
        </Box>
      </Fade>
    </>
  );
};
