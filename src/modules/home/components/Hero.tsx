import {
  Box,
  Button,
  Container,
  Grid2,
  Icon,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <Container>
      <Grid2 container spacing={6} alignItems="center">
        <Grid2 size={{ xs: 6 }}>
          <Typography
            variant="h2"
            sx={{
              strong: {
                overflow: "visible",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: "-2.5rem",

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
            Youth Basketball <strong>Reimagined</strong>
          </Typography>
          <Stack mt={12} direction="row" gap={2}>
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

            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={
                <Icon className="material-symbols-outlined">attach_money</Icon>
              }
            >
              Free Trial
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Box
            component={"video"}
            src="/hero.mp4"
            autoPlay
            loop
            muted
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "16px",
              outline: (theme) =>
                `16px solid ${alpha(theme.palette.secondary.light, 0.5)}`,
              bgcolor: (theme) => alpha(theme.palette.secondary.light, 0.5),
            }}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};
