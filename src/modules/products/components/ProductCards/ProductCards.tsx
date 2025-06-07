import { LoadingWrapper } from "@/components";
import { getProducts } from "@/modules/products";
import { Fade, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";

export const ProductCards = () => {
  const getProductsQuery = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });
  const products = getProductsQuery.data?.data;

  return (
    <LoadingWrapper isLoading={getProductsQuery.isLoading}>
      <Fade in={!getProductsQuery.isLoading}>
        <Stack gap={20} alignItems="center">
          {products?.map((product) => (
              <ProductCard product={product} key={product.id} />
          ))}
        </Stack>
      </Fade>
    </LoadingWrapper>
  );
};
