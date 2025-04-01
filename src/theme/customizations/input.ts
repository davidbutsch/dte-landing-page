import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const inputCustomizations: Components<Theme> = {
  MuiFormLabel: {
    styleOverrides: {
      root: {
        marginBottom: 8,
      },
    },
  },
};
