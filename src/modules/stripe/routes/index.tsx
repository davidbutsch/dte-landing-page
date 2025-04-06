import { AppLayout } from "@/components";
import { Outlet, RouteObject } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";
import { RedirectPage } from "./RedirectPage";

export const stripeRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    path: "/stripe/",
    children: [
      { path: "/stripe/redirect/", element: <RedirectPage /> },
      { path: "/stripe/checkout/", element: <CheckoutPage /> },
    ],
  },
];
