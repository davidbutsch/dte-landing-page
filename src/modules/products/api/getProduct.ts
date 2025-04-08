import { api } from "@/libs";
import { Product } from "@/modules/stripe/types";
import { AxiosResponse } from "axios";

export type GetProductResponse = AxiosResponse<Product>;

export const getProduct = (productId: string): Promise<GetProductResponse> =>
  api.get(`/products/${productId}`);
