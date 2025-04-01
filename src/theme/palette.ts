import { createTheme, PaletteOptions } from "@mui/material";

const { augmentColor } = createTheme().palette;

const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const palette: PaletteOptions = {
  primary: { main: "#F54952" },
  secondary: { main: "#422680" },
  cream: createColor("#FAF5EA"),
  text: {
    primary: "#211340",
    secondary: "#211340",
  },
  background: {
    default: "#FAF5EA",
    paper: "#FAF5EA",
  },
};
