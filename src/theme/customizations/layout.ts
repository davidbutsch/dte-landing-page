import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const layoutCustomizations: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      elevation: {
        border: "none",
        outline: "1px solid #000",
        boxShadow: "2px 2px 0px 1px #000",
      },
    },
  },
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
