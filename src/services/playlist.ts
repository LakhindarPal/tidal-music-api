import Playlist from "../models/Playlist";
import type { PlaylistData } from "../models/Playlist";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves playlist information based on the provided playlist ID and country code.
 * @param {string} playlistId - The ID of the playlist.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the playlist information. Defaults to "US".
 * @returns {Promise<Playlist>} A promise that resolves to a Playlist object containing the playlist information.
 */
export async function getPlaylistInfo(
  playlistId: string,
  countryCode: string = "US",
): Promise<Playlist> {
  if (!playlistId) throw new Error("Invalid playlist ID");

  const { data }: { data: { playlist: PlaylistData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
          query ($playlistId: String!, $countryCode: String!) {
            playlist(uuid: $playlistId) {
              contentType
              creator { id name }
              description
              created
              lastUpdated
              numberOfTracks
              image { original large medium small xsmall }
              title
              uuid
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
      variables: { playlistId, countryCode },
    }),
  );

  if (!data?.playlist) throw new Error("Playlist information not found");

  return new Playlist(data.playlist);
}

/**
 * Extracts the playlist ID from a Tidal playlist URL.
 *
 * @param {string} url - The URL of the Tidal playlist.
 * @return {string} The playlist ID, or empty string if the URL does not match the expected format.
 */
export function getPlaylistId(url: string): string {
  const playlistRegex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)?playlist\/([0-9a-zA-Z\-]+)$/;
  const matchedId: string | undefined = url.match(playlistRegex)?.[1];
  return matchedId ?? "";
}
