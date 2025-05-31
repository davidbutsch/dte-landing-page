import { DTE_LOGO_URL } from "@/common";
import { useAuthStore } from "@/modules/auth";
import { AccountControls } from "@/modules/layout";
import { palette } from "@/theme/palette";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Icon,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", to: "/" },
  { name: "Plans", to: "/products" },
  { name: "Image Gallery", to: "/gallery" },
  { name: "Calendar", to: "/calendar" },
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

const Banner = () => {
  return (
    <Card
      sx={{
        padding: 1,

        bgcolor: palette.secondary.dark,
        color: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Typography variant="subtitle2" textAlign="center">
          Limited Time: 5% Off for All Customers — Ends June 3rd
        </Typography>
        <Link
          to={
            "/checkout/?productId=prod_SLgHWeqR767Qoy&priceId=price_1RRMjaR5ATxbPfKlLR8zHaSQ&step=0&coupon=%7B%22id%22%3A%22promo_1RUjTjR5ATxbPfKlfIK3Ky2Y%22%2C%22code%22%3A%22LOYALTY5%22%2C%22discount%22%3A%225%25+off+for+1+month%22%7D"
          }
        >
          <Button
            endIcon={
              <Icon className="material-symbols-outlined" color="primary">
                rocket_launch
              </Icon>
            }
          >
            Claim Now
          </Button>
        </Link>
      </Stack>
    </Card>
  );
};

export const NavBar = () => {
  const [offerExpired, setOfferExpired] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const targetTime = new Date("2025-06-03T10:00:00"); // Example target time

      if (now.getTime() > targetTime.getTime()) {
        setOfferExpired(true);
      }
    };

    checkTime(); // Check immediately

    const intervalId = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        borderBottom: "1px solid #000",
      }}
    >
      {!offerExpired && <Banner />}

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
