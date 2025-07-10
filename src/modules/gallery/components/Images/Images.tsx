import {
  getPaginatedGalleryFilePaths,
  GetPaginatedGalleryFilePathsResponse,
} from "@/modules/gallery";
import { theme } from "@/theme";
import {
  Button,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

export const Images = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const getPaginatedGalleryFilePathsQuery = useInfiniteQuery({
    queryKey: ["gallery"],
    initialPageParam: null as GetPaginatedGalleryFilePathsResponse | null,
    queryFn: ({ pageParam }) =>
      getPaginatedGalleryFilePaths({
        limit: 10,
        nextToken: pageParam?.data.nextToken,
      }),
    getNextPageParam: (lastPage) => lastPage,
  });

  const paths = getPaginatedGalleryFilePathsQuery.data?.pages.flatMap(
    (page) => page.data.paths
  );

  if (!paths) return;

  const nextToken =
    getPaginatedGalleryFilePathsQuery.data?.pages[
      getPaginatedGalleryFilePathsQuery.data?.pages.length - 1
    ].data.nextToken;

  return (
    <>
      <ImageList
        sx={{ width: "100%", height: "100%", overflow: "visible", zIndex: -1 }}
        gap={isMediumScreenSize ? 20 : 30}
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
      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button
          variant="contained"
          onClick={() => getPaginatedGalleryFilePathsQuery.fetchNextPage()}
          loading={getPaginatedGalleryFilePathsQuery.isFetchingNextPage}
          disabled={!nextToken}
        >
          Load More
        </Button>
      </Stack>
    </>
  );
};
