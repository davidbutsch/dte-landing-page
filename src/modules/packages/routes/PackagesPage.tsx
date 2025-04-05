import { PackageCards } from "@/modules/packages";
import { Stack } from "@mui/material";

export const PackagesPage = () => {
  return (
    <Stack pt={10} direction="column" gap={15}>
      <PackageCards />
    </Stack>
  );
};
