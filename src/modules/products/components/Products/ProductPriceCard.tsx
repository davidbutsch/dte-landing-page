import { formatPriceString, Price, Product } from "@/modules/products";
import { theme } from "@/theme";
import { Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import { ProductCardCTA } from "../ProductCardCTA";
import { ProductCardFeatures } from "../ProductCardFeatures";

type ProductPriceCardProps = {
  price: Price;
  product: Product;
};

export const ProductPriceCard = (props: ProductPriceCardProps) => {
  const { price, product } = props;

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
      <Paper variant="outlined" sx={{ padding: theme.spacing(2) }}>
        <Stack mb={2} gap={2}>
          {price.metadata?.chip && (
            <Chip
              label={price.metadata.chip}
              color="success"
              variant="filled"
              size="small"
              sx={{
                width: "fit-content",
              }}
            />
          )}
          <Typography variant="h4" fontWeight={600}>
            {price.lookupKey}
          </Typography>
          {/* TODO */}
          <Typography variant="h6">{formatPriceString(price)}</Typography>
        </Stack>

        <ProductCardCTA productId={product.id} priceId={price.id} />
        <ProductCardFeatures features={product.marketingFeatures} />
      </Paper>
    </Grid2>
  );
};
