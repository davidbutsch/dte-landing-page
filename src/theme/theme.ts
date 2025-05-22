import { createTheme, Shadows } from "@mui/material";
import {
  buttonCustomizations,
  dialogCustomizations,
  inputCustomizations,
  layoutCustomizations,
  menuCustomizations,
  miscCustomizations,
} from "./customizations";
import { palette } from "./palette";

export const theme = createTheme({
  palette,
  shadows: Array(25).fill("none") as Shadows,
  shape: {
    borderRadius: 0,
  },
  components: {
    ...buttonCustomizations,
    ...inputCustomizations,
    ...menuCustomizations,
    ...miscCustomizations,
    ...dialogCustomizations,
    ...layoutCustomizations,
  },
});
