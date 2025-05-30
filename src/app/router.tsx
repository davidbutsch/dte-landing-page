import { useRoutes } from "react-router-dom";

import { authRoutes } from "@/modules/auth";
import { calendarRoutes } from "@/modules/calendar";
import { checkoutRoutes } from "@/modules/checkout/routes";
import { homeRoutes } from "@/modules/home";
import { WaitForAuth } from "@/modules/layout";
import { productsRoutes } from "@/modules/products";
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
      {
        path: "/products/",
        children: productsRoutes,
      },
      {
        path: "/checkout/",
        children: checkoutRoutes,
      },
      {
        path: "/calendar/",
        children: calendarRoutes,
      },
    ],
  },
];

export const AppRouter = () => {
  const route = useRoutes(routes);

  return route;
};
