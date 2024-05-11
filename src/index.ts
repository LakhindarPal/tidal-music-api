import Artist from "./models/Artist";
import Track from "./models/Track";
import Album from "./models/Album";
import Video from "./models/Video";
import Playlist from "./models/Playlist";
import Mix from "./models/Mix";
import { getAlbumId, getAlbumInfo } from "./services/album";
import { getArtistId, getArtistInfo } from "./services/artist";
import { getMixId, getMixInfo } from "./services/mix";
import { getPlaylistId, getPlaylistInfo } from "./services/playlist";
import { getTrackId, getTrackInfo } from "./services/track";
import { getVideoId, getVideoInfo } from "./services/video";

/**
 * Retrieves information based on the type of URL provided.
 * @param {string} url - The URL to extract information from.
 * @returns {Promise<Track|Artist|Album|Video|Playlist|Mix>} A promise that resolves to the information based on the URL type.
 */
async function getInfo(
  url: string,
): Promise<Track | Artist | Album | Video | Playlist | Mix> {
  const type: string | null = extractURLType(url);
  if (!type) throw new Error("Invalid URL");

  switch (type) {
    case "track":
      const trackId: number = getTrackId(url);
      return await getTrackInfo(trackId);
    case "artist":
      const artistId: number = getArtistId(url);
      return await getArtistInfo(artistId);
    case "album":
      const albumId: number = getAlbumId(url);
      return await getAlbumInfo(albumId);
    case "video":
      const videoId: number = getVideoId(url);
      return await getVideoInfo(videoId);
    case "playlist":
      const playlistId: string = getPlaylistId(url);
      return await getPlaylistInfo(playlistId);
    case "mix":
      const mixId: string = getMixId(url);
      return await getMixInfo(mixId);
    default:
      throw new Error("Unsupported URL type");
  }
}

/**
 * Extracts the type of URL from a Tidal URL.
 *
 * @param {string} url - The Tidal URL to extract the type from.
 * @return {string | null} - The type of URL extracted from the input URL, or null if the URL does not match the expected format.
 */
function extractURLType(url: string): string | null {
  const regex: RegExp =
    /^https:\/\/tidal\.com\/(?:browse\/)?(track|artist|album|video|playlist)\/[0-9a-zA-Z\-]+/;
  const match: RegExpMatchArray | null = url.match(regex);
  return match ? match[1] : null;
}

export {
  extractURLType,
  getInfo,
  getAlbumId,
  getAlbumInfo,
  getArtistId,
  getArtistInfo,
  getMixId,
  getMixInfo,
  getPlaylistId,
  getPlaylistInfo,
  getTrackId,
  getTrackInfo,
  getVideoId,
  getVideoInfo,
};
