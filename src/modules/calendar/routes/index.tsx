import { AppLayout } from "@/modules/layout";
import { Outlet, RouteObject } from "react-router-dom";
import { CalendarPage } from "./CalendarPage";

export const calendarRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [{ path: "/calendar/", element: <CalendarPage /> }],
  },
];
