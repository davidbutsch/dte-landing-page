import { ProductCardFeatures } from "@/modules/products";
import { Product } from "@/modules/stripe";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

type ProductTypographyOptions = {
  name: string;
  description: string | null;
  price: string;
};

const ProductTypography = ({
  name,
  description,
  price,
}: ProductTypographyOptions) => {
  return (
    <Stack gap={1} maxWidth={{ sm: "50%", md: 400 }}>
      <Typography variant="h5" fontWeight={600}>
        {name}
      </Typography>
      {description && (
        <Typography
          sx={{
            opacity: 0.8,
          }}
        >
          {description}
        </Typography>
      )}
      <Typography variant="h4" fontWeight={600} mt={1}>
        {price}
      </Typography>
    </Stack>
  );
};

export type ProductDisplayOptions = {
  product: Product;
};

export const CheckoutProductDetails = ({ product }: ProductDisplayOptions) => {
  const xsUp = useMediaQuery((theme) => theme.breakpoints.not("xs"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "space-evenly", md: "center" },

        padding: 4,

        width: { xs: "100%", md: "50%" },

        color: "#fff",

        backgroundImage: `url(${product.images[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: -1,
        },
        position: "relative",
        zIndex: 0,
      }}
    >
      <Stack gap={4} direction={{ xs: "row", md: "column" }}>
        <ProductTypography
          name={product.name}
          description={product.description}
          price={product.defaultPrice!.displayText}
        />
        {xsUp && <ProductCardFeatures features={product.marketingFeatures} />}
      </Stack>
    </Box>
  );
};
