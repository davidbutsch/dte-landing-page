import { AppLayout } from "@/modules/layout";
import { Outlet, RouteObject } from "react-router-dom";
import { GalleryPage } from "./GalleryPage";

export const galleryRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [{ path: "/gallery/", element: <GalleryPage /> }],
  },
];
