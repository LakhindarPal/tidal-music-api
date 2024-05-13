import Album from "../models/Album";
import type { AlbumData } from "../models/Album";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves album information from the Tidal API based on the provided album ID and country code.
 * @param {number} albumId - The ID of the album.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the album information. Defaults to "US".
 * @returns {Promise<Album>} A promise that resolves to an Album object containing the album information.
 */
export async function getAlbumInfo(
  albumId: number,
  countryCode: string = "US",
): Promise<Album> {
  albumId = Number(albumId);
  if (isNaN(albumId)) throw new Error("Invalid album ID");

  const { data }: { data: { album: AlbumData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
          query ($albumId: BigInt!, $countryCode: String!) {
            album(id: $albumId, countryCode: $countryCode) {
              artists { id name }
              contentType
              id
              image { original large medium small xsmall }
              explicit
              releaseDate
              title
              tracks(countryCode: $countryCode) {
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
          }
        `,
      variables: { albumId, countryCode },
    }),
  );

  if (!data?.album) throw new Error("Album information not found");

  return new Album(data.album);
}

/**
 * Extracts the album ID from a given URL.
 *
 * @param {string} url - The URL from which to extract the album ID.
 * @return {number} - The extracted album ID, or NaN if the URL does not match the expected format.
 */
export function getAlbumId(url: string): number {
  const albumRegex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)?album\/(\d+)$/;
  const matchedId: string | undefined = url.match(albumRegex)?.[1];
  return Number(matchedId);
}
