import { Stack, Typography } from "@mui/material";

export const CoachesTypography = () => {
  return (
    <Stack
      justifyContent={{ xs: "normal", md: "space-between" }}
      height={{ xs: "inherit", md: "400px" }}
    >
      <Typography
        fontFamily="Lobster !important"
        typography={{ xs: "h2", md: "h1" }}
      >
        Meet your Coaches
      </Typography>
      <Typography
        mt={{ xs: 2, md: 0 }}
        variant="subtitle2"
        maxWidth={{ xs: "none", md: "50%" }}
      >
        For Athletes. By Athletes.
      </Typography>
    </Stack>
  );
};
