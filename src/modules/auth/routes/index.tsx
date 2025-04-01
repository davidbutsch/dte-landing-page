import { RouteObject } from "react-router-dom";
import { LogInPage } from "./LogInPage";
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
];
