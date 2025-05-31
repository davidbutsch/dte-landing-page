import { getPaginatedGalleryFilePaths } from "@/modules/gallery";
import { ImageList, ImageListItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const GalleryPreviewImageList = () => {
  const getPaginatedGalleryFilePathsQuery = useQuery({
    queryKey: ["gallery", null],
    queryFn: () => getPaginatedGalleryFilePaths({ limit: 8 }),
  });

  const paths = getPaginatedGalleryFilePathsQuery.data?.data.paths;

  if (!paths) return;

  return (
    <ImageList
      sx={{ width: "100%", height: "100%", overflow: "hidden", zIndex: -1 }}
      variant="masonry"
      dir="row"
      cols={3}
    >
      {paths?.map((path, i) => (
        <ImageListItem key={`${path}-${i}`}>
          <img src={path} alt={`image-${i}`} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
