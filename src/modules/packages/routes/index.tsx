import { AppLayout } from "@/components";
import { Outlet, RouteObject } from "react-router-dom";
import { PackagesPage } from "./PackagesPage";

export const packagesRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    path: "/packages/",
    children: [{ path: "/packages/", element: <PackagesPage /> }],
  },
];
