import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const layoutCustomizations: Components<Theme> = {
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "1px solid #00000025",
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 2 * 8,
        paddingTop: 0,
      },
    },
  },
};
