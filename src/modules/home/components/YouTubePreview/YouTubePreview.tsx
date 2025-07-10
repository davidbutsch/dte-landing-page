import { Box } from "@mui/material";
import { YouTubePreviewThumbnails } from "./YouTubePreviewThumbnails";
import { YouTubePreviewTypography } from "./YouTubePreviewTypography";

export const YouTubePreview = () => {
  return (
    <Box width="100%" overflow="hidden">
      <YouTubePreviewTypography />
      <YouTubePreviewThumbnails />
    </Box>
  );
};
