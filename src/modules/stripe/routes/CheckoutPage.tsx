import { LoadingWrapper } from "@/components";
import { PackageCard } from "@/modules/packages";
import { getProduct } from "@/modules/stripe/api";
import { Checkout } from "@/modules/stripe/components";
import { Box, Stack } from "@mui/material";
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
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        gap={4}
        padding={4}
      >
        <Box width="100%">
          <Checkout productId={productId} />
        </Box>

        {/* Temporary product display component */}
        <Box width={{ md: "40%" }}>
          <PackageCard product={response?.data} />
        </Box>
      </Stack>
    </LoadingWrapper>
  );
};
