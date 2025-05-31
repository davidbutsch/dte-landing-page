import { theme } from "@/theme";
import {
  Box,
  Button,
  Container,
  Grid2,
  Icon,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Hero = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid2
        container
        spacing={isMediumScreenSize ? 5 : 12}
        alignItems={isMediumScreenSize ? "baseline" : "center"}
        direction={isMediumScreenSize ? "column" : "row"}
      >
        <Grid2 size={{ xs: 7 }}>
          <Typography
            variant={isMediumScreenSize ? "h2" : "h1"}
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
          <Stack mt={isMediumScreenSize ? 14 : 16} direction="row" gap={2}>
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
        <Grid2
          size={{ xs: isMediumScreenSize ? 12 : 5 }}
          display="flex"
          justifyContent="center"
        >
          <Box
            component={"img"}
            src="/jersey.png"
            sx={{
              transform: "rotate(15deg)",
              width: isMediumScreenSize ? "60vw" : "100%",
            }}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};
