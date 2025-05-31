import { Button, Icon, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const GalleryPreviewLink = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        mt: -24,
        gap: 4,
      }}
    >
      <Typography variant="h4" fontFamily="Lobster">
        See more at the gallery.
      </Typography>
      <Link to="/gallery">
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
          }}
          size="large"
          startIcon={
            <Icon className="material-symbols-outlined">photo_library</Icon>
          }
        >
          Image Gallery
        </Button>
      </Link>
    </Stack>
  );
};
