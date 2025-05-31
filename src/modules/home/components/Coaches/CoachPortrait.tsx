import { theme } from "@/theme";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

export type CoachPortraitProps = {
  image: string;
  name: string;
  role: string;
};

export const CoachPortrait = (props: CoachPortraitProps) => {
  const { image, name, role } = props;

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid size={isMediumScreenSize ? 12 / 2 : 12 / 3}>
      <Stack
        justifyContent="space-between"
        height={isMediumScreenSize ? "inherit" : "500px"}
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
          <Typography
            variant="h6"
            fontWeight="bold"
            mt={isMediumScreenSize ? 2 : 0}
          >
            {name}
          </Typography>
          <Typography variant="subtitle2" mb={isMediumScreenSize ? 2 : 0}>
            {role}
          </Typography>
        </span>
      </Stack>
    </Grid>
  );
};
