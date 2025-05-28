import { AppLayout } from "@/modules/layout";
import { Outlet, RouteObject } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";
import { RedirectPage } from "./RedirectPage";

export const checkoutRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { path: "/checkout/", element: <CheckoutPage /> },
      { path: "/checkout/redirect", element: <RedirectPage /> },
    ],
  },
];
