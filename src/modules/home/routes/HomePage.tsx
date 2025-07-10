import { Coaches, GalleryPreview, Hero, YouTubePreview } from "@/modules/home";
import { Stack } from "@mui/material";

export const HomePage = () => {
  return (
    <Stack pt={{ xs: 5, md: 10 }} direction="column" gap={{ xs: 10, md: 20 }}>
      <Hero />
      <GalleryPreview />
      <YouTubePreview />
      <Coaches />
    </Stack>
  );
};
