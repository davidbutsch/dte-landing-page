import { palette } from "@/theme/palette";
import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const menuCustomizations: Components<Theme> = {
  MuiMenu: {
    styleOverrides: {
      paper: {
        boxShadow: "2px 2px 0px 1px #000",
        outline: "1px solid",
      },
    },
    defaultProps: {
      transitionDuration: 0, // disable menu animation
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: palette.text?.secondary, // menu item icon color -> text.secondary
      },
    },
  },
};
