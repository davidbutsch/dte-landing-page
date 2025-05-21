import { Theme } from "@emotion/react";
import { Components } from "@mui/material";
import { palette } from "../palette";

export const inputCustomizations: Components<Theme> = {
  MuiFormLabel: {
    styleOverrides: {
      root: {
        marginBottom: 8,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 0,
        outline: "1px solid #000",

        "& .MuiSwitch-switchBase": {
          padding: 4,

          borderRadius: 0,
          "&.Mui-checked": {
            "& + .MuiSwitch-track": {
              opacity: 1,
            },
          },
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: palette.background?.default,
          outline: "1px solid #000",
          borderRadius: 0,
        },
        "& .MuiSwitch-track": {
          borderRadius: 0,
        },

        variants: [
          // SMALL SIZE
          {
            props: { size: "small" },
            style: {
              width: 40,
              height: 24,

              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  transform: "translateX(16px)",
                },
              },
              "& .MuiSwitch-thumb": {
                width: 16,
                height: 16,
              },
            },
          },

          // MEDIUM SIZE
          {
            props: { size: "medium" },
            style: {
              width: 56,
              height: 32,

              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  transform: "translateX(24px)",
                },
              },
              "& .MuiSwitch-thumb": {
                width: 24,
                height: 24,
              },
            },
          },
        ],
      },
    },
  },
};
