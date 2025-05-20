import { Product } from "@/modules/products";
import {
  ProductCardCTA,
  ProductCardFeatures,
} from "@/modules/products/components";
import { theme } from "@/theme";
import { Chip, Grid2, Paper, Stack, Typography } from "@mui/material";

export type ProductCardOptions = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardOptions) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
      <Paper variant="outlined" sx={{ padding: theme.spacing(2) }}>
        <Stack mb={2} gap={2}>
          {product.metadata?.mostPopular == "yes" && (
            <Chip
              label="Most Popular"
              color="success"
              variant="filled"
              size="small"
              sx={{
                width: "fit-content",
              }}
            />
          )}
          <Typography variant="h5" fontWeight={600}>
            {product.name}
          </Typography>
          {/* TODO */}
          <Typography>{product.defaultPriceId}</Typography>
        </Stack>

        <ProductCardCTA productId={product.id} />
        <ProductCardFeatures features={product.marketingFeatures} />
      </Paper>
    </Grid2>
  );
};
