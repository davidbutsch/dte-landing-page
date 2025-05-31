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
      <Grid2 container spacing={12} alignItems="center">
        <Grid2 size={{ xs: 7 }}>
          <Typography
            variant="h1"
            fontFamily="Lobster"
            sx={{
              span: {
                overflow: "visible",
                position: "relative",

                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: "-4rem",

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
          <Stack mt={16} direction="row" gap={2}>
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
        <Grid2 size={{ xs: 5 }}>
          <Box
            component={"img"}
            src="/jersey.png"
            sx={{
              transform: "rotate(15deg)",
              width: "100%",
            }}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};
