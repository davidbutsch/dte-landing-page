import { useAuthStore } from "@/modules/auth";
import { getStripeCustomer } from "@/modules/stripe";
import { palette } from "@/theme/palette";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const CalendarPage = () => {
  const { user } = useAuthStore();

  const { data: response } = useQuery({
    queryKey: ["customer", "me"],
    queryFn: getStripeCustomer,
  });
  const customer = response?.data;

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleSeePlans = () => navigate("/products");

  let isAuthorized = false;

  if (!customer) return;

  // User is authorized if customer is subscribed to program
  if (customer.metadata?.subscribed == "yes") isAuthorized = true;
  // User is authorized if user has admin role
  if (user?.attributes["custom:role"] == "admin") isAuthorized = true;

  // Display forbidden dialog box if user is not authorized
  if (!isAuthorized)
    return (
      <Dialog open={true} onClose={handleBack}>
        <DialogTitle>Forbidden</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" gap={2} alignItems="center">
            <Icon
              className="material-symbols-outlined"
              sx={{ fontSize: 64 }}
              color="primary"
            >
              error
            </Icon>
            <DialogContentText paddingRight={1} fontSize={18}>
              Please subscribe or switch to a subscribed account to access
              program schedule.
            </DialogContentText>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="cream" variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={handleSeePlans}>
            See Plans
          </Button>
        </DialogActions>
      </Dialog>
    );
  else
    return (
      <Container sx={{ mt: 4, height: "80vh" }}>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=dreamteamsportsgroup%40gmail.com&ctz=America%2FChicago&showTz=0&showCalendars=0&showPrint=0&showTitle=0"
          width="100%"
          height="100%"
          style={{
            border: "none",
            boxShadow: `
          -4px -4px 0px 4px ${palette.secondary.main},
          4px 4px 0px 4px ${palette.primary.main}`,
          }}
        ></iframe>
      </Container>
    );
};
