import { api } from "@/libs";
import { Video } from "@/modules/youtube";
import { AxiosResponse } from "axios";

export type GetChannelVideosResponse = AxiosResponse<Video[]>;

export const getChannelVideos = (
  limit = 20
): Promise<GetChannelVideosResponse> =>
  api.get(`/youtube/videos?limit=${limit}`);
