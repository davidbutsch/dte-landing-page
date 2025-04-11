import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const miscCustomizations: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        boxShadow: "2px 2px 0px 1px #000",
        outline: "1px solid #000",
      },
    },
  },
};
