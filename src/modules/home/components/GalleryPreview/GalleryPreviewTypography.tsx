import { Box, styled, Typography } from "@mui/material";

const TypographyContainer = styled(Box)({});

export const GalleryPreviewTypography = () => {
  return (
    <TypographyContainer zIndex={1}>
      <Typography variant="h1" textAlign="right" fontFamily="Lobster">
        Together
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="right">
        We are Dream Team
      </Typography>
    </TypographyContainer>
  );
};
