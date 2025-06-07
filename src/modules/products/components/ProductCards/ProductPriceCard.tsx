import { formatPriceString, Price, Product } from "@/modules/products";
import { theme } from "@/theme";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { ProductCardCTA } from "./ProductCardCTA";

type ProductPriceCardProps = {
  price: Price;
  product: Product;
};

export const ProductPriceCard = (props: ProductPriceCardProps) => {
  const { price, product } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <CardContent>
        {price.metadata?.chip && (
          <Chip
            label={price.metadata.chip}
            color="success"
            variant="filled"
            size="small"
            sx={{
              width: "fit-content",
              mb: theme.spacing(2),
            }}
          />
        )}
        <Typography variant="h5" fontWeight="bold">
          {price.metadata?.title || "Pricing Plan"}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
        >{`for ${product.name}`}</Typography>
        <Typography variant="h6" mt={2}>
          {formatPriceString(price)}
        </Typography>
      </CardContent>

      <CardActions>
        <ProductCardCTA productId={product.id} priceId={price.id} />
      </CardActions>
    </Card>
  );
};
