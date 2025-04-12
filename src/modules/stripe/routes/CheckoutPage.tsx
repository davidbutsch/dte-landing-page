import { LoadingWrapper, openErrorDialog } from "@/components";
import { getProduct } from "@/modules/products/api";
import { Checkout, CheckoutProductDisplay } from "@/modules/stripe";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";

export const CheckoutPage = () => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");

  // Navigate to root if no productId exists in search params
  if (!productId) return <Navigate to="/" />;

  const { data: response, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  if (!response) return;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Stack direction="row">
        <CheckoutProductDisplay product={response.data} />
        <Checkout
          priceId={response.data.defaultPrice!.id} // TODO: Handle case where no default price exists
        />
      </Stack>
    </LoadingWrapper>
  );
};
