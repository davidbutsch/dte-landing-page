import { Coaches, GalleryPreview, Hero } from "@/modules/home";
import { theme } from "@/theme";
import { Stack, useMediaQuery } from "@mui/material";

export const HomePage = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      pt={isMediumScreenSize ? 5 : 10}
      direction="column"
      gap={isMediumScreenSize ? 10 : 20}
    >
      <Hero />
      <GalleryPreview />
      <Coaches />
    </Stack>
  );
};
