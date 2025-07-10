import { DTE_LOGO_URL } from "@/common";
import { useAuthStore } from "@/modules/auth";
import { AccountControls } from "@/modules/layout";
import { theme } from "@/theme";
import { palette } from "@/theme/palette";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Icon,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", to: "/" },
  { name: "Plans", to: "/products" },
  { name: "Image Gallery", to: "/gallery" },
  { name: "Calendar", to: "/calendar" },
];

// If user is logged in displays account controls, otherwise displays log in options
const AuthenticationLinks = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useAuthStore();

  return (
    <Stack
      direction="row"
      spacing={1}
      flex={1}
      justifyContent="end"
      alignItems="center"
    >
      {user ? (
        <AccountControls />
      ) : (
        <>
          <Link to="/log-in">
            {!isMediumScreenSize && (
              <Button color="cream" variant="contained">
                Log In
              </Button>
            )}
          </Link>
          <Link to="/sign-up">
            <Button color="primary" variant="contained">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </Stack>
  );
};

const Logo = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      sx={{
        ...(isMediumScreenSize
          ? {
              justifyContent: "center",
            }
          : {}),
      }}
    >
      <Link to="/" style={{ height: 32 }}>
        <img src={DTE_LOGO_URL} height={32} />
      </Link>
    </Box>
  );
};

type NavigationLinksProps = {
  pages: typeof pages;
};

// Displays page links
const NavigationLinks = ({ pages }: NavigationLinksProps) => {
  const location = useLocation();
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  if (isMediumScreenSize)
    return (
      <>
        <Box flex={1}>
          <IconButton onClick={openDrawer} size="small">
            <Icon className="material-symbols-outlined" color="inherit">
              menu
            </Icon>
          </IconButton>
        </Box>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <Typography variant="h4" fontFamily="Lobster" m={2}>
            Navigation
          </Typography>
          <Stack direction="column" spacing={1.5} flex={1} m={2}>
            {pages.map((page) => (
              <Link to={page.to} key={page.to} onClick={closeDrawer}>
                <Button
                  color="cream"
                  variant="contained"
                  sx={{
                    ...(location.pathname == page.to && {
                      bgcolor: "cream.dark",
                      transform: "translate(3px, 3px)",
                      boxShadow: "none",
                    }),
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Stack>
        </Drawer>
      </>
    );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      flex={1}
    >
      {pages.map((page) => (
        <Link to={page.to} key={page.to}>
          <Button
            color="cream"
            variant="contained"
            sx={{
              ...(location.pathname == page.to && {
                bgcolor: "cream.dark",
                transform: "translate(3px, 3px)",
                boxShadow: "none",
              }),
            }}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </Stack>
  );
};

const Banner = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        padding: 1,

        bgcolor: palette.secondary.dark,
        color: "#FFFFFF",
      }}
    >
      <Typography
        fontSize={isMediumScreenSize ? 12 : 14}
        variant="subtitle2"
        textAlign="center"
      >
        Check out the new trailer! ⛹️
      </Typography>
    </Box>
  );
};

export const NavBar = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      variant="outlined"
      sx={{
        borderBottom: "1px solid #000",
      }}
    >
      <Banner />

      <Container>
        <Toolbar
          sx={{
            height: 72,
          }}
          disableGutters
        >
          <Stack justifyContent="center" direction="row" width="100%">
            {isMediumScreenSize ? (
              <>
                <NavigationLinks pages={pages} />
                <Logo />
                <AuthenticationLinks />
              </>
            ) : (
              <>
                <Logo />
                <NavigationLinks pages={pages} />
                <AuthenticationLinks />
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
