import { SUPPORT_EMAIL_ADDRESS } from "@/common";
import { Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack alignItems="center" textAlign="center">
      <Typography variant="h2" fontFamily="Lobster" gutterBottom>
        The Gallery
      </Typography>
      <Typography variant="subtitle1">
        Send your own pictures to <strong>{SUPPORT_EMAIL_ADDRESS}</strong> and
        we'll feature your highlights in the gallery!
      </Typography>
    </Stack>
  );
};
