import { AppLayout } from "@/modules/layout";
import { Outlet, RouteObject } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";

export const productsRoutes: RouteObject[] = [
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    path: "/products/",
    children: [{ path: "/products/", element: <ProductsPage /> }],
  },
];
