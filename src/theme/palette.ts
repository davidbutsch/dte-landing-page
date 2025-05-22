import { createTheme } from "@mui/material";

const { augmentColor } = createTheme().palette;

const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const palette = {
  primary: createColor("#F54952"),
  secondary: createColor("#422680"),
  cream: createColor("#FAF5EA"),
  success: createColor("#50C878"),
  text: {
    primary: "#000",
    secondary: "#1A1A1A",
  },
  background: {
    default: "#FAF5EA",
    paper: "#F7EFDE",
  },
  divider: "#000",
};
