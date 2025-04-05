import { createTheme, PaletteOptions } from "@mui/material";

const { augmentColor } = createTheme().palette;

const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const palette: PaletteOptions = {
  primary: { main: "#F54952" },
  secondary: { main: "#422680" },
  cream: createColor("#FAF5EA"),
  success: {
    main: "#50C878",
  },
  text: {
    primary: "#000",
    secondary: "#1a1a1a",
  },
  background: {
    default: "#FAF5EA",
    paper: "#f7efde",
  },
  divider: "#000",
};
