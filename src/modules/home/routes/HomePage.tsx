import { Coaches, GalleryPreview, Hero } from "@/modules/home";
import { Stack } from "@mui/material";

export const HomePage = () => {
  return (
    <Stack pt={10} pb={50} direction="column" gap={20}>
      <Hero />
      <GalleryPreview />
      <Coaches />
    </Stack>
  );
};
