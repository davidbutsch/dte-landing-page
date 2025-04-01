import { AppLayout } from "@/components";
import { Outlet, RouteObject } from "react-router-dom";
import { HomePage } from "./HomePage";

export const homeRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [{ path: "/", element: <HomePage /> }],
  },
];
