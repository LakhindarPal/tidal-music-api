import Track from "../models/Track";
import type { TrackData } from "../models/Track";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves track information from the Tidal API based on the provided track ID and country code.
 * @param {number} trackId - The ID of the track.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the track information. Defaults to "US".
 * @returns {Promise<Track>} A promise that resolves to a Track object containing the track information.
 */
export async function getTrackInfo(
  trackId: number,
  countryCode: string = "US",
): Promise<Track> {
  trackId = Number(trackId);
  if (isNaN(trackId)) throw new Error("Invalid track ID");

  const { data }: { data: { track: TrackData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
        query ($trackId: BigInt!, $countryCode: String!) {
          track(id: $trackId, countryCode: $countryCode) {
            album { id title }
            artists { id name }
            contentType
            duration
            explicit
            id
            image { original large medium small xsmall }
            title
            trackNumber
          }
        }
      `,
      variables: { trackId, countryCode },
    }),
  );

  if (!data?.track) throw new Error("Track information not found");

  return new Track(data.track);
}

/**
 * Retrieves the preview URL of a track from the Tidal API based on the provided track ID and country code.
 * @param {number} id - The ID of the track.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the track preview URL. Defaults to "US".
 * @returns {Promise<string>} A promise that resolves to the track preview URL.
 */
export async function getTrackPreview(
  id: number,
  countryCode: string = "US",
): Promise<string> {
  id = Number(id);
  if (isNaN(id)) throw new Error("Invalid track ID");

  const { data }: { data: { trackPreviewUrl: string } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
            query ($id: BigInt!, $countryCode: String) {
              trackPreviewUrl(id: $id, countryCode: $countryCode)
            }
          `,
      variables: { id, countryCode },
    }),
  );

  if (!data?.trackPreviewUrl) throw new Error("Track preview URL not found");

  return data.trackPreviewUrl;
}

/**
 * Extracts the track ID from a Tidal track URL.
 *
 * @param {string} url - The Tidal track URL from which to extract the ID.
 * @return {number} The extracted track ID, or NaN if the URL does not match the expected format.
 */
export function getTrackId(url: string): number {
  const trackRegex: RegExp =
    /^https:\/\/tidal\.com\/(?:browse\/)?track\/(\d+)$/;
  const matchedId: string | undefined = url.match(trackRegex)?.[1];
  return Number(matchedId);
}
