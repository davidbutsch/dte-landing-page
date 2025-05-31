import { getPaginatedGalleryFilePaths } from "@/modules/gallery";
import { theme } from "@/theme";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const GalleryPreviewImageList = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const getPaginatedGalleryFilePathsQuery = useQuery({
    queryKey: ["gallery", null],
    queryFn: () => getPaginatedGalleryFilePaths({ limit: 8 }),
  });

  const paths = getPaginatedGalleryFilePathsQuery.data?.data.paths;

  if (!paths) return;

  return (
    <ImageList
      sx={{ width: "100%", height: "100%", overflow: "visible", zIndex: -1 }}
      gap={30}
      variant="masonry"
      dir="row"
      cols={isMediumScreenSize ? 2 : 3}
    >
      {paths?.map((path, i) => (
        <ImageListItem key={`${path}-${i}`}>
          <img
            src={path}
            alt={`image-${i}`}
            loading="lazy"
            style={{
              boxShadow: "4px 4px 0px 1px #000",
              outline: "1px solid #000",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
