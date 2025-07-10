import { getChannelVideos } from "@/modules/youtube/api";
import { keyframes, Stack, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { YouTubePreviewThumbnail } from "./YouTubePreviewThumbnail";

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const SlideContainer = styled(Stack)({
  flexDirection: "row",
  justifyContent: "center",

  width: "fit-content",
  willChange: "transform",
  animation: `${slide} 30s linear infinite`,
});

export const YouTubePreviewThumbnails = () => {
  const getChannelVideosQuery = useQuery({
    queryKey: ["videos"],
    queryFn: () => getChannelVideos(15),
  });

  const videos = getChannelVideosQuery.data?.data;
  if (!videos) return;

  return (
    <Stack direction="row" mt={8}>
      <SlideContainer>
        {videos?.map((video) => (
          <YouTubePreviewThumbnail
            key={video.id}
            videoId={video.id}
            width={150}
            height={150 * (16 / 9)}
            src={video.thumbnails.high}
            title={video.title}
            publishedAt={video.publishedAt}
          />
        ))}
      </SlideContainer>
      <SlideContainer>
        {videos?.map((video) => (
          <YouTubePreviewThumbnail
            key={video.id}
            videoId={video.id}
            width={150}
            height={150 * (16 / 9)}
            src={video.thumbnails.high}
            title={video.title}
            publishedAt={video.publishedAt}
          />
        ))}
      </SlideContainer>
    </Stack>
  );
};
