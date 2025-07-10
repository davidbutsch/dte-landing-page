import { Header, Images } from "@/modules/gallery";
import { Container, Stack } from "@mui/material";

export const GalleryPage = () => {
  return (
    <Container>
      <Stack pt={10} pb={10} direction="column" gap={10}>
        <Header />
        <Images />
      </Stack>
    </Container>
  );
};
