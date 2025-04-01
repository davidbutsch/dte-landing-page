import { Components, Theme } from "@mui/material";

export const buttonCustomizations: Components<Theme> = {
  // BUTTON
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        flex: "none", // fix text wrapping issue
        fontWeight: 600, // all buttons have bold text

        transition: "0s", // no animation transition

        variants: [
          // CONTAINED VARIANT
          {
            props: { variant: "contained" },
            style: {
              border: "none",
              outline: "1px solid #000",
              boxShadow: "2px 2px 0px 1px #000",

              "&:hover": {
                transform: "translate(2px, 2px)",
              },
            },
          },
          {
            props: { disabled: true },
            style: {
              boxShadow: "2px 2px 0px 1px rgba(0, 0, 0, 0.25) !important",
            },
          },
          // TEXT VARIANT
          {
            props: { variant: "text" },
            style: {
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
                textDecorationThickness: "2px",
              },
            },
          },
          // LARGE SIZE
          {
            props: { size: "large" },
            style: {
              padding: "6px 12px",
            },
          },
          // MEDIUM SIZE
          {
            props: { size: "medium" },
            style: {
              padding: "4px 8px",
            },
          },
          // SMALL SIZE
          {
            props: { size: "small" },
            style: {
              fontSize: 12,
              padding: "3px 6px",
            },
          },
        ],
      },
    },
  },
  // ICON BUTTON
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 0,
        transition: "0s", // no animation transition
        borderRadius: 0,

        outline: "1px solid #000",
        boxShadow: "3px 3px 0px 1px #000",

        "&:hover": {
          transform: "translate(3px, 3px)",
          boxShadow: "none",
        },
      },
    },
  },
};
