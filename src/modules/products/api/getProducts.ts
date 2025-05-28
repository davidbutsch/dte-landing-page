import { api } from "@/libs";
import { Product } from "@/modules/products";
import { AxiosResponse } from "axios";

export type GetProductsResponse = AxiosResponse<Product[]>;

export const getProducts = (): Promise<GetProductsResponse> =>
  api.get("/products");
