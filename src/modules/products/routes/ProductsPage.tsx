import { ProductCards } from "@/modules/products/components";
import { Stack } from "@mui/material";

export const ProductsPage = () => {
  return (
    <Stack pt={10} direction="column" gap={15}>
      <ProductCards />
    </Stack>
  );
};
