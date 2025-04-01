import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { theme } from "./theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
