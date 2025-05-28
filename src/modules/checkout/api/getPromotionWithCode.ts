import { api } from "@/libs";
import { Promotion } from "@/modules/checkout";
import { AxiosResponse } from "axios";

export type GetPromotionWithCodeResponse = AxiosResponse<Promotion>;

export const getPromotionWithCode = (
  code: string
): Promise<GetPromotionWithCodeResponse> =>
  api.get(`/coupons/promotions/${code}`);
