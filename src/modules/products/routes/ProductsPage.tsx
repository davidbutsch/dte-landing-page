import { Products } from "@/modules/products/components";
import { Container, Stack, Typography } from "@mui/material";

export const ProductsPage = () => {
  return (
    <Container>
      <Stack pt={10} direction="column" gap={15}>
        <Stack alignItems="center" textAlign="center">
          <Typography variant="h2" fontFamily="Lobster" gutterBottom>
            Pricing & Plans
          </Typography>
        </Stack>
        <Products />
      </Stack>
    </Container>
  );
};
