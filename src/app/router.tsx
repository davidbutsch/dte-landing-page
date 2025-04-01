import { useRoutes } from "react-router-dom";

import { WaitForAuth } from "@/components";
import { authRoutes } from "@/modules/auth";
import { homeRoutes } from "@/modules/home";
import { CssBaseline } from "@mui/material";
import { Outlet, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: (
      <>
        <CssBaseline />
        <WaitForAuth>
          <Outlet />
        </WaitForAuth>
      </>
    ),
    children: [
      {
        children: homeRoutes,
      },
      {
        children: authRoutes,
      },
    ],
  },
];

export const AppRouter = () => {
  const route = useRoutes(routes);

  return route;
};
