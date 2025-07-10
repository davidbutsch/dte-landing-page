import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CoachesTypography } from "./CoachesTypography";
import { CoachPortraits } from "./CoachPortraits";

export const Coaches = () => {
  return (
    <Container>
      <Grid
        container
        spacing={4}
        height={{ xs: "inherit", md: "400px" }}
        direction={{ xs: "column", md: "row" }}
        mb={{ sm: "70px" }}
      >
        <Grid size={{ xs: 12, md: 5 }}>
          <CoachesTypography />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <CoachPortraits />
        </Grid>
      </Grid>
    </Container>
  );
};
