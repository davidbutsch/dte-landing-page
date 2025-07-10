import { Box, Link, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

export type YouTubePreviewThumbnailProps = {
  videoId: string;
  width: number;
  height: number;
  src: string;
  title: string;
  publishedAt: string;
};

export const YouTubePreviewThumbnail = (
  props: YouTubePreviewThumbnailProps
) => {
  const { videoId, width, height, src, title, publishedAt } = props;

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      color="textPrimary"
      mr={4}
    >
      <Box width={width}>
        <Box
          height={height}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            overflow: "hidden",

            boxShadow: "4px 4px 0px 1px #000",
            outline: "1px solid #000",
          }}
        >
          <Box
            component="img"
            src={src}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <span>
          <Typography
            variant="h6"
            fontWeight="bold"
            noWrap
            maxWidth="100%"
            mt={2}
          >
            {title}
          </Typography>
          <Typography variant="subtitle2" mb={{ xs: 0, md: 2 }}>
            {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
          </Typography>
        </span>
      </Box>
    </Link>
  );
};
