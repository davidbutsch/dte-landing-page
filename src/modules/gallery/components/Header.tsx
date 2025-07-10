import { SUPPORT_EMAIL_ADDRESS } from "@/common";
import { Link, Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack alignItems="center" textAlign="center">
      <Typography variant="h2" fontFamily="Lobster" gutterBottom>
        The Gallery
      </Typography>
      <Typography variant="subtitle1">
        Send your own pictures to{" "}
        <Link href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}>
          {SUPPORT_EMAIL_ADDRESS}
        </Link>{" "}
        and we'll feature your highlights in the gallery!
      </Typography>
    </Stack>
  );
};
