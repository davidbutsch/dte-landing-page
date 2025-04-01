import { AuthLink, AuthPage, LogInForm } from "@/modules/auth/components";
import { Typography } from "@mui/material";

export const LogInPage = () => {
  return (
    <AuthPage>
      <Typography variant="h4" fontWeight={600}>
        Log In
      </Typography>
      <LogInForm />
      <AuthLink />
    </AuthPage>
  );
};
