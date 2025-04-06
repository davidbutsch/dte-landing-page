import { Metadata, Price } from "@/modules/stripe/types";

export type ProductType = "good" | "service";

export type Product = {
  id: string;
  active: boolean;
  created: number;
  defaultPrice: Price | null;
  description: string | null;
  images: string[];
  marketingFeatures: string[];
  metadata: Metadata;
  name: string;
  type: ProductType;
  url: string | null;
};
