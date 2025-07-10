import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const links = [
  { name: "YouTube", to: "https://www.youtube.com/@itscoachDK/shorts" },
  {
    name: "Contact Us",
    to: "mailto:dreamteamsportsgroup@gmail.com?subject=Contact Us",
  },
];

export const Links = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      {links.map((link) => (
        <Link to={link.to} key={link.to}>
          <Button
            variant="text"
            sx={{
              color: "#000",
              textTransform: "none",
            }}
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </Stack>
  );
};
