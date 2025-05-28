import { api } from "@/libs";
import { Price } from "@/modules/products";
import { AxiosResponse } from "axios";

export type GetProductPricesResponse = AxiosResponse<Price[]>;

export const getProductPrices = (
  productId: string
): Promise<GetProductPricesResponse> =>
  api.get(`/products/${productId}/prices`);
