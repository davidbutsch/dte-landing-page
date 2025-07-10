import { TRAILER_URL } from "@/common";
import { LoadingWrapper } from "@/components";
import { Box, Card } from "@mui/material";
import { useState } from "react";

export const Video = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <LoadingWrapper isLoading={loading}>
        <Box
          component="video"
          src={TRAILER_URL}
          loop
          playsInline
          autoPlay
          muted
          onLoadedData={() => {
            setLoading(false);
          }}
          onClick={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            video.muted = !video.muted;
          }}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block",
            zIndex: 5,
            cursor: "pointer",
          }}
        />
      </LoadingWrapper>
    </Card>
  );
};
