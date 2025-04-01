import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const AuthLink = () => {
  const location = useLocation();
  const isLogInPage = location.pathname === "/log-in";

  const { text, linkText, to } = isLogInPage
    ? { text: "Don't have an account?", linkText: "Sign Up", to: "/sign-up" }
    : { text: "Already have an account?", linkText: "Log In", to: "/log-in" };

  return (
    <span style={{ textAlign: "center" }}>
      {text}{" "}
      <MuiLink component={RouterLink} to={to}>
        {linkText}
      </MuiLink>
    </span>
  );
};
