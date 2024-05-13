import Artist from "../models/Artist";
import type { ArtistData } from "../models/Artist";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves the information of an artist from the Tidal API based on the provided artist ID and country code.
 * @param {number} artistId - The ID of the artist.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the artist information. Defaults to "US".
 * @returns {Promise<Artist>} A promise that resolves to an Artist object containing the artist information.
 */
export async function getArtistInfo(
  artistId: number,
  countryCode: string = "US",
): Promise<Artist> {
  artistId = Number(artistId);
  if (isNaN(artistId)) throw new Error("Invalid artist ID");

  const { data }: { data: { artist: ArtistData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
          query ($artistId: BigInt!, $countryCode: String!) {
            artist(id: $artistId) {
              bio(countryCode: $countryCode)
              contentType
              id
              image { original large medium small xsmall }
              name
              albums(countryCode: $countryCode) {
                artists { id name }
                contentType
                id
                image { original large medium small xsmall }
                explicit
                releaseDate
                title
              }
              epsandsingles: albums(filter: EPSANDSINGLES, countryCode: $countryCode) {
                artists { id name }
                contentType
                id
                image { original large medium small xsmall }
                explicit
                releaseDate
                title
              }
              mixes(countryCode: $countryCode) {
                artists { id name }
                contentType
                id
                image { original large medium small }
                title
              }
              credits: creditsTracks(countryCode: $countryCode) {
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
              tracks: topTracks(countryCode: $countryCode) {
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
              videos(countryCode: $countryCode) {
                artists { id name }
                contentType
                duration
                explicit
                id
                image { original large medium small xsmall }
                releaseDate
                title
              }
              playlists(countryCode: $countryCode) {
                contentType
                creator { id name }
                description
                created
                lastUpdated
                numberOfTracks
                image { original large medium small xsmall }
                title
                uuid
              }
            }
          }
        `,
      variables: { artistId, countryCode },
    }),
  );

  if (!data?.artist) throw new Error("Artist information not found");

  return new Artist(data.artist);
}

/**
 * Extracts the artist ID from a Tidal URL.
 *
 * @param {string} url - The Tidal URL from which to extract the artist ID.
 * @return {number} The extracted artist ID, or NaN if the URL does not match the expected format.
 */
export function getArtistId(url: string): number {
  const artistRegex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)? artist\/(\d+)$/;
  const matchedId: string | undefined = url.match(artistRegex)?.[1];
  return Number(matchedId);
}
