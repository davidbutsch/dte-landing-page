import { getProductPrices, type Product as TProduct } from "@/modules/products";
import { Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductPriceCard } from "./ProductPriceCard";

export type ProductProps = {
  product: TProduct;
};

export const Product = (props: ProductProps) => {
  const { product } = props;

  const getProductPricesQuery = useQuery({
    queryKey: ["getProductPrices", product.id],
    queryFn: () => getProductPrices(product.id),
  });
  const prices = getProductPricesQuery.data?.data;

  return (
    <Stack gap={2} width="100%">
      <Typography fontWeight="bold" variant="h6">
        {product.name}
      </Typography>
      <Grid2 container spacing={2}>
        {prices?.map((price) => (
          <ProductPriceCard price={price} product={product} key={price.id} />
        ))}
      </Grid2>
    </Stack>
  );
};
