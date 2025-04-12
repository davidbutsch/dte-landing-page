import { Product } from "@/modules/stripe";
import { Box } from "@mui/material";

export type ProductDisplayOptions = {
  product: Product;
};

export const CheckoutProductDisplay = ({ product }: ProductDisplayOptions) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        bgcolor: "red",
      }}
    >
      {product.name}
    </Box>
  );
};
