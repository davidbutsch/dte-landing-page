import { LoadingWrapper } from "@/components";
import { getProducts } from "@/modules/products";
import { Fade, Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./Product";

export const Products = () => {
  const getProductsQuery = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });
  const products = getProductsQuery.data?.data;

  return (
    <LoadingWrapper isLoading={getProductsQuery.isLoading}>
      <Fade in={!getProductsQuery.isLoading}>
        <Grid2 container spacing={2}>
          {products?.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </Grid2>
      </Fade>
    </LoadingWrapper>
  );
};
