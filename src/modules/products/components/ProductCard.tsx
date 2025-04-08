import {
  ProductCardCTA,
  ProductCardFeatures,
} from "@/modules/products/components";
import { Product } from "@/modules/stripe";
import { theme } from "@/theme";
import { Grid2, Paper, Stack, Typography } from "@mui/material";

export type ProductCardOptions = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardOptions) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
      <Paper variant="outlined" sx={{ padding: theme.spacing(2) }}>
        <Stack mb={2}>
          <Typography variant="h5" fontWeight={600}>
            {product.name}
          </Typography>
          <Typography mb={2} color="textSecondary">
            {product.description}
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            {product.defaultPrice?.displayText}
          </Typography>
        </Stack>

        <ProductCardCTA productId={product.id} />
        <ProductCardFeatures features={product.marketingFeatures} />
      </Paper>
    </Grid2>
  );
};
