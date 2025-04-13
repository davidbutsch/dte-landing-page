import { LoadingWrapper } from "@/components";
import { useAuthStore } from "@/modules/auth";
import { getProduct } from "@/modules/products/api";
import { CheckoutForm, CheckoutProductDetails } from "@/modules/stripe";
import { Stack, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export const CheckoutPage = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    // If "big" screen
    if (!mdDown) document.body.style.overflow = "hidden"; // Prevent body scroll when checkout page is open

    return () => {
      document.body.style.overflow = "auto"; // Reset overflow to auto when component unmounts
    };
  }, []);

  const { user } = useAuthStore();

  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");

  // Navigate to root if no productId exists in search params
  if (!productId) return <Navigate to="/" />;

  // Navigate to log in page if user is not logged in
  if (!user) return <Navigate to="/log-in" />;

  const { data: response, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  if (!response) return;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Stack
        height={{ md: "calc(100vh - 72px)" }}
        direction={{ sm: "column", md: "row" }}
      >
        <CheckoutProductDetails product={response.data} />
        <CheckoutForm product={response.data} />
      </Stack>
    </LoadingWrapper>
  );
};
