import { api } from "@/libs";
import { PaginatedGalleryFilePaths } from "@/modules/gallery";
import { AxiosResponse } from "axios";

export type GetPaginatedGalleryFilePathsResponse =
  AxiosResponse<PaginatedGalleryFilePaths>;

export type GetPaginatedGalleryFilePathsOptions = {
  limit: number;
  nextToken?: string | null;
};

/**
 * @param limit - Specifies the maximum number of paths to return.
 * @param nextToken - Optional continuation token for retrieving next set of paths. (Automatically encodes this for the url)
 *
 * @returns File paths and an optional next token.
 */
export const getPaginatedGalleryFilePaths = ({
  limit,
  nextToken,
}: GetPaginatedGalleryFilePathsOptions): Promise<GetPaginatedGalleryFilePathsResponse> => {
  let url = `/gallery/paths/?limit=${limit}`;

  if (nextToken) url += `&token=${encodeURIComponent(nextToken)}`;

  return api.get(url);
};
