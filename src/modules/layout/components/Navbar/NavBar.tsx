import { DTE_LOGO_URL } from "@/common";
import { useAuthStore } from "@/modules/auth";
import { AccountControls } from "@/modules/layout";
import { AppBar, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", to: "/" },
  { name: "Events", to: "/events" },
  { name: "Plans", to: "/products" },
  { name: "Teams", to: "/teams" },
  { name: "Coaches", to: "/staff" },
];

// If user is logged in displays account controls, otherwise displays log in options
const AuthenticationLinks = () => {
  const { user } = useAuthStore();

  return (
    <Stack direction="row" spacing={1} flex={1} justifyContent="end">
      {user ? (
        <AccountControls />
      ) : (
        <>
          <Link to="/log-in">
            <Button color="cream" variant="contained">
              Log In
            </Button>
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
  return (
    <Box flex={1} display="flex" alignItems="center">
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

export const NavBar = () => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        borderBottom: "1px solid #000",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            height: 72,
          }}
          disableGutters
        >
          <Stack justifyContent="center" direction="row" width="100%">
            <Logo />
            <NavigationLinks pages={pages} />
            <AuthenticationLinks />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
