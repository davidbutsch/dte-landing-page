import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export type CoachPortraitProps = {
  image: string;
  name: string;
  role: string;
};

export const CoachPortrait = (props: CoachPortraitProps) => {
  const { image, name, role } = props;

  return (
    <Grid size={{ xs: 12 / 2, md: 12 / 3 }}>
      <Stack
        justifyContent="space-between"
        height={{ xs: "inherit", md: "500px" }}
      >
        <Box
          sx={{
            objectFit: "cover",
            height: "400px",
            width: "100%",

            boxShadow: "4px 4px 0px 1px #000",
            outline: "1px solid #000",
          }}
          component="img"
          src={image}
        />
        <span>
          <Typography variant="h6" fontWeight="bold" mt={{ xs: 2, md: 0 }}>
            {name}
          </Typography>
          <Typography variant="subtitle2" mb={{ xs: 0, md: 2 }}>
            {role}
          </Typography>
        </span>
      </Stack>
    </Grid>
  );
};
