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
          outline: "1px solid #000",
          boxShadow: "2px 2px 0px 1px #000",
        }}
      ></iframe>
    </Container>
  );
};
