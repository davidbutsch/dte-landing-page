import { theme } from "@/theme";
import { Box, styled, Typography, useMediaQuery } from "@mui/material";

const TypographyContainer = styled(Box)({});

export const GalleryPreviewTypography = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TypographyContainer zIndex={1}>
      <Typography
        variant={isMediumScreenSize ? "h2" : "h1"}
        textAlign="right"
        fontFamily="Lobster"
      >
        Together
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="right">
        We are Dream Team
      </Typography>
    </TypographyContainer>
  );
};
