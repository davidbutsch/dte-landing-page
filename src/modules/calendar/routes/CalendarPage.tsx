import { palette } from "@/theme/palette";
import { Container } from "@mui/material";

export const CalendarPage = () => {
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
