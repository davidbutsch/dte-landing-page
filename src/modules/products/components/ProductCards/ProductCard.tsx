import { getProductPrices, type Product as TProduct } from "@/modules/products";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductCardFeatures } from "./ProductCardFeatures";
import { ProductPriceCard } from "./ProductPriceCard";

export type ProductProps = {
  product: TProduct;
};

export const ProductCard = (props: ProductProps) => {
  const { product } = props;

  const getProductPricesQuery = useQuery({
    queryKey: ["getProductPrices", product.id],
    queryFn: () => getProductPrices(product.id),
  });
  const prices = getProductPricesQuery.data?.data;

  return (
    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
      <Card>
        <CardContent>
          <Typography fontWeight="bold" variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <ProductCardFeatures features={product.marketingFeatures} />
        </CardContent>
      </Card>

      <Stack gap={2}>
        {prices?.map((price) => (
          <ProductPriceCard price={price} product={product} key={price.id} />
        ))}
      </Stack>
    </Stack>
  );
};
