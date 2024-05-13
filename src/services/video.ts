import Video from "../models/Video";
import type { VideoData } from "../models/Video";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves the video information for the given video ID.
 * @param {number} videoId - The ID of the video.
 * @returns {Promise<Video>} A promise that resolves to the video information.
 */
export async function getVideoInfo(videoId: number): Promise<Video> {
  videoId = Number(videoId);
  if (isNaN(videoId)) throw new Error("Invalid video ID");

  const { data }: { data: { video: VideoData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
          query ($videoId: BigInt!) {
            video(id: $videoId) {
              artists { id name }
              contentType
              duration
              explicit
              id
              image { original large medium small xsmall }
              releaseDate
              title
            }
          }
        `,
      variables: { videoId },
    }),
  );

  if (!data?.video) throw new Error("Video information not found");

  return new Video(data.video);
}

/**
 * Retrieves the URL of the preview video for the given video ID.
 * @param {number} id - The ID of the video.
 * @returns {Promise<string>} A promise that resolves to the URL of the preview video.
 */
export async function getVideoPreview(id: number): Promise<string> {
  id = Number(id);
  if (isNaN(id)) throw new Error("Invalid video ID");

  const { data }: { data: { videoPreview: { urls: string[] } } } =
    await tidalAPI.post(
      "/",
      JSON.stringify({
        query: `
            query ($id: BigInt!) {
              videoPreview(id: $id) {
                urls
              }
            }
          `,
        variables: { id },
      }),
    );

  const previewUrl = data?.videoPreview?.urls?.[0];

  if (!previewUrl) throw new Error("Preview video URL not found");

  return previewUrl;
}

/**
 * Extracts the video ID from a given URL.
 *
 * @param {string} url - The URL from which to extract the video ID.
 * @return {number} - The extracted video ID, or NaN if the URL does not match the expected format.
 */
export function getVideoId(url: string): number {
  const videoRegex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)?video\/(\d+)$/;
  const matchedId: string | undefined = url.match(videoRegex)?.[1];
  return Number(matchedId);
}
