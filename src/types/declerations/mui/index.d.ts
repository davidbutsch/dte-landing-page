import { PaletteColor } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    cream: PaletteColor;
  }
  interface PaletteOptions {
    cream: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    cream: true;
  }
}

declare module "@mui/material/Icon" {
  interface IconPropsColorOverrides {
    cream: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    cream: true;
  }
}
