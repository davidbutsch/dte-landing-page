import { LoadingWrapper } from "@/components";
import { getProducts } from "@/modules/products";
import { Container, Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";

export const ProductCards = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Container>
        <Grid2 container spacing={2}>
          {response?.data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid2>
      </Container>
    </LoadingWrapper>
  );
};
