import { Box, Typography } from "@mui/material";

export const GalleryPreviewTypography = () => {
  return (
    <Box>
      <Typography
        textAlign="right"
        fontFamily="Lobster !important"
        typography={{ xs: "h2", md: "h1" }}
      >
        Together
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="right">
        We are Dream Team
      </Typography>
    </Box>
  );
};
