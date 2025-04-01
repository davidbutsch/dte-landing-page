import { Typography } from "@mui/material";

import { AuthLink, AuthPage, SignUpForm } from "@/modules/auth/components";

export const SignUpPage = () => {
  return (
    <AuthPage>
      <Typography variant="h4" fontWeight={600}>
        Sign Up
      </Typography>
      <SignUpForm />
      <AuthLink />
    </AuthPage>
  );
};
