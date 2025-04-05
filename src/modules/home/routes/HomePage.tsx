import { Checkout } from "@/modules/stripe";
import { Stack } from "@mui/material";

export const HomePage = () => {
  return (
    <Stack pt={10} direction="column" gap={15}>
      <Checkout />
    </Stack>
  );
};
