import { Card, Container, Divider, Stack } from "@mui/material";
import { CopyrightTypography } from "./CopyrightTypography";
import { Links } from "./Links";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        mt: 30,
        p: 5,
      }}
    >
      <Container>
        <Stack gap={4}>
          <Stack direction="row">
            <Logo />
            <Links />
          </Stack>
          <Divider />
          <Stack direction="row">
            <CopyrightTypography />
          </Stack>
        </Stack>
      </Container>
    </Card>
  );
};
