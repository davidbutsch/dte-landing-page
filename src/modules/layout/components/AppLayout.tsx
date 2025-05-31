import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { NavBar } from "./Navbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Box minHeight="100vh">
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundImage: 'url("/bgball.svg")',
            backgroundSize: "10%",
            opacity: 0.5,

            zIndex: -1,
          }}
        />
        <NavBar />
        {children}
      </Box>
      <Footer />
    </>
  );
};
