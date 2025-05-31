import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CoachesTypography } from "./CoachesTypography";
import { CoachPortraits } from "./CoachPortraits";

export const Coaches = () => {
  return (
    <Container>
      <Grid container spacing={4} height="400px">
        <Grid size={5}>
          <CoachesTypography />
        </Grid>
        <Grid size={7}>
          <CoachPortraits />
        </Grid>
      </Grid>
    </Container>
  );
};
