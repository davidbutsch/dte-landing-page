import { theme } from "@/theme";
import { Container, Divider, Paper, Stack, useMediaQuery } from "@mui/material";
import { CopyrightTypography } from "./CopyrightTypography";
import { Links } from "./Links";
import { Logo } from "./Logo";

export const Footer = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      variant="outlined"
      component="footer"
      sx={{
        mt: 30,
        p: 5,
      }}
    >
      <Container>
        <Stack gap={4}>
          <Stack direction="row">
            <Logo />
            {/* TODO */}
            {!isMediumScreenSize && <Links />}
          </Stack>
          <Divider />
          <Stack direction="row">
            <CopyrightTypography />
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};
