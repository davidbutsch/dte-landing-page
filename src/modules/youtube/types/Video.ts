export type Video = {
  id: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    high: string;
    max: string;
  };
  channelTitle: string;
};
