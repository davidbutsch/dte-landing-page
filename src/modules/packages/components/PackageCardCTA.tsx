import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export type PackageCardCTAOptions = {
  productId: string;
};

export const PackageCardCTA = ({ productId }: PackageCardCTAOptions) => {
  return (
    <Link to={`/stripe/checkout/?productId=${productId}`}>
      <Button sx={{ mb: 2 }} variant="contained" color="secondary" fullWidth>
        Register
      </Button>
    </Link>
  );
};
