import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const miscCustomizations: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        outline: "1px solid #000",
      },
    },
  },
};
