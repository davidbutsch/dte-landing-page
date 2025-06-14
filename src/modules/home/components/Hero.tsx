import {
  Box,
  Button,
  Container,
  Grid2,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <Container>
      <Grid2
        container
        spacing={{ xs: 5 }}
        alignItems={{ xs: "baseline", md: "center" }}
        direction={{ xs: "column", md: "row" }}
      >
        <Grid2 size={{ xs: 7 }} pl={{ xs: 2, sm: 0 }}>
          <Typography
            fontFamily="Lobster !important"
            typography={{ xs: "h1", md: "h1" }}
            sx={{
              fontSize: { xs: "15vw", sm: "inherit" },

              span: {
                overflow: "visible",
                position: "relative",

                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: { xs: "-10vw", sm: "-4rem" },

                  // Position the line behind the text so that
                  // it is still easily readable
                  zIndex: -1,

                  // The SVG is added as an SVG background image
                  backgroundImage: 'url("/scribble_gradient.svg")',
                  opacity: 0.75,
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "bottom",
                },
              },
            }}
          >
            Youth Basketball <span>Reimagined</span>
          </Typography>
          <Stack mt={{ xs: "20vw", md: 14 }} direction="row" gap={2}>
            <Link to={"/products"}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={
                  <Icon className="material-symbols-outlined">
                    rocket_launch
                  </Icon>
                }
              >
                See Plans
              </Button>
            </Link>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }} display="flex" justifyContent="center">
          <Box
            component={"img"}
            src="/jersey.png"
            sx={{
              width: { xs: "60vw", md: "100%" },
            }}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};
