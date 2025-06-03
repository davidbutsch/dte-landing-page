import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export type ProductCardCTAProps = {
  productId: string;
  priceId: string;
};

export const ProductCardCTA = (props: ProductCardCTAProps) => {
  const { productId, priceId } = props;

  return (
    <Link to={`/checkout/?productId=${productId}&priceId=${priceId}`}>
      <Button sx={{ mb: 2 }} variant="contained" color="secondary" fullWidth>
        Register
      </Button>
    </Link>
  );
};
