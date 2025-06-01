import { theme } from "@/theme";
import { Stack, Typography, useMediaQuery } from "@mui/material";

export const CoachesTypography = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      justifyContent={isMediumScreenSize ? "normal" : "space-between"}
      height={isMediumScreenSize ? "inherit" : "400px"}
    >
      <Typography
        variant={isMediumScreenSize ? "h2" : "h1"}
        fontFamily="Lobster"
      >
        Meet your Coaches
      </Typography>
      <Typography
        mt={isMediumScreenSize ? 2 : 0}
        variant="subtitle2"
        maxWidth={isMediumScreenSize ? "none" : "50%"}
      >
        For Athletes. By Athletes.
      </Typography>
    </Stack>
  );
};
