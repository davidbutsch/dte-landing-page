import { useAuthStore } from "@/modules/auth";
import { CheckoutStepper, OrderSummary } from "@/modules/checkout";
import { theme } from "@/theme";
import { Container, Grid2, useMediaQuery } from "@mui/material";
import { Navigate, useSearchParams } from "react-router-dom";

export const CheckoutPage = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const { user, isUserLoading } = useAuthStore();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  // Navigate to root if no productId exists in search params
  if (!productId) return <Navigate to="/" />;

  // Navigate to log in page if user is loaded and not logged in
  if (!user && !isUserLoading) return <Navigate to="/log-in" />;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid2
        container
        spacing={8}
        direction={isMediumScreenSize ? "column" : "row"}
      >
        <Grid2 size={isMediumScreenSize ? 12 : 7}>
          <CheckoutStepper />
        </Grid2>
        <Grid2 size={isMediumScreenSize ? 12 : 5}>
          <OrderSummary />
        </Grid2>
      </Grid2>
    </Container>
  );
};
