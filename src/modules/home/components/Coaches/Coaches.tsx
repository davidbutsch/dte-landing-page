import { theme } from "@/theme";
import { Container, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CoachesTypography } from "./CoachesTypography";
import { CoachPortraits } from "./CoachPortraits";

export const Coaches = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid
        container
        spacing={4}
        height={isMediumScreenSize ? "inherit" : "400px"}
        direction={isMediumScreenSize ? "column" : "row"}
      >
        <Grid size={isMediumScreenSize ? 12 : 5}>
          <CoachesTypography />
        </Grid>
        <Grid size={isMediumScreenSize ? 12 : 7}>
          <CoachPortraits />
        </Grid>
      </Grid>
    </Container>
  );
};
