import { Container, styled } from "@mui/material";
import { GalleryPreviewImageList } from "./GalleryPreviewImageList";
import { GalleryPreviewLink } from "./GalleryPreviewLink";
import { GalleryPreviewTypography } from "./GalleryPreviewTypography";

const GalleryPreviewContainer = styled(Container)({
  position: "relative",

  mask: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 0
    )
    100% 50% / 100% 100% repeat-x;`,
});

export const GalleryPreview = () => {
  return (
    <span>
      <GalleryPreviewContainer>
        <GalleryPreviewTypography />
        <GalleryPreviewImageList />
      </GalleryPreviewContainer>
      <GalleryPreviewLink />
    </span>
  );
};
