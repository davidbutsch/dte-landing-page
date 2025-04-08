import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export type ProductCardCTAOptions = {
  productId: string;
};

export const ProductCardCTA = ({ productId }: ProductCardCTAOptions) => {
  return (
    <Link to={`/stripe/checkout/?productId=${productId}`}>
      <Button sx={{ mb: 2 }} variant="contained" color="secondary" fullWidth>
        Register
      </Button>
    </Link>
  );
};
