import { Link, Stack, Typography } from "@mui/material";

export const YouTubePreviewTypography = () => {
  return (
    <Stack alignItems="center">
      <Typography
        textAlign="center"
        fontFamily="Lobster !important"
        typography={{ xs: "h3", md: "h2" }}
        gutterBottom
      >
        Find us on YouTube
      </Typography>
      <Link
        textAlign="center"
        href="https://www.youtube.com/@itscoachDK/shorts"
        mt={{ xs: 2, md: 0 }}
        maxWidth={{ xs: "none", md: "50%" }}
      >
        youtube.com/@itscoachDK
      </Link>
    </Stack>
  );
};
