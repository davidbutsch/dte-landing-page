export type ProductType = "good" | "service";

export type Product = {
  id: string;
  name: string;
  active: boolean;
  defaultPriceId: string | null;
  description: string | null;
  images: string[];
  marketingFeatures: string[];
  type: "good" | "service";
  metadata: Record<string, string> | null;
};
