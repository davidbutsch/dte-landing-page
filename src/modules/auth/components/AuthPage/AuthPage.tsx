import { DTE_LOGO_URL } from "@/common";
import { theme } from "@/theme";
import { Box, Stack, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// Displays media sidebar on the right side of the screen
const Sidebar = () => {
  return (
    <Box
      padding={theme.spacing(4)}
      sx={{
        position: "relative",

        width: "75%",
        height: "100vh",

        // Hide sidebar on small screens
        [theme.breakpoints.down("md")]: {
          display: "none",
        },

        ":before": {
          content: "''",
          position: "absolute",
          top: theme.spacing(2),
          left: theme.spacing(2),
          right: theme.spacing(2),
          bottom: theme.spacing(2),

          borderRadius: 1,

          // outline: "1px solid rgba(0, 0, 0, 0.12)",
          background: theme.palette.primary.light,
        },
      }}
    ></Box>
  );
};

// Displays a form in the center of the screen
const FormContainer = styled(Box)({
  position: "relative",

  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "100vh",
});

const FormStack = styled(Stack)({
  padding: theme.spacing(2),

  width: "100%",
  maxWidth: 400,
});

const CornerLogo = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: theme.spacing(2),
        left: theme.spacing(2),

        // Center logo on small screens
        [theme.breakpoints.down("sm")]: {
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <RouterLink to="/">
        <img height={24} src={DTE_LOGO_URL} />
      </RouterLink>
    </Box>
  );
};

type AuthPageProps = {
  children: React.ReactNode;
};

export const AuthPage = ({ children }: AuthPageProps) => {
  return (
    <Stack direction="row">
      <FormContainer>
        <CornerLogo />
        <FormStack gap={4}>{children}</FormStack>
      </FormContainer>
      <Sidebar />
    </Stack>
  );
};
