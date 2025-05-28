import { Hero } from "@/modules/home";
import { Stack } from "@mui/material";

export const HomePage = () => {
  return (
    <Stack pt={10} direction="column" gap={15}>
      <Hero />
    </Stack>
  );
};
