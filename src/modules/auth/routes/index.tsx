import { RouteObject } from "react-router-dom";
import { LogInPage } from "./LogInPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { SignUpPage } from "./SignUpPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/log-in",
    element: <LogInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
];
