import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const dialogCustomizations: Components<Theme> = {
  MuiDialog: {
    styleOverrides: {
      paper: {
        outline: "1px solid #000",
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },
};
