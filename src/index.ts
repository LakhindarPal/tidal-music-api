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
import { getTrackId, getTrackInfo, getTrackPreview } from "./services/track";
import { getVideoId, getVideoInfo, getVideoPreview } from "./services/video";
import { getURLType } from "./utils/getURLType";

/**
 * Retrieves information based on the type of URL provided.
 * @param {string} url - The URL to extract information from.
 * @returns {Promise<Track|Artist|Album|Video|Playlist|Mix>} A promise that resolves to the information based on the URL type.
 */
async function getInfo(
  url: string,
): Promise<Track | Artist | Album | Video | Playlist | Mix> {
  const type: string | null = getURLType(url);
  if (!type) throw new Error("Invalid URL");

  switch (type) {
    case "TRACK":
      const trackId: number = getTrackId(url);
      return await getTrackInfo(trackId);
    case "ARTIST":
      const artistId: number = getArtistId(url);
      return await getArtistInfo(artistId);
    case "ALBUM":
      const albumId: number = getAlbumId(url);
      return await getAlbumInfo(albumId);
    case "VIDEO":
      const videoId: number = getVideoId(url);
      return await getVideoInfo(videoId);
    case "PLAYLIST":
      const playlistId: string = getPlaylistId(url);
      return await getPlaylistInfo(playlistId);
    case "MIX":
      const mixId: string = getMixId(url);
      return await getMixInfo(mixId);
    default:
      throw new Error("Unsupported URL type");
  }
}

export {
  getURLType,
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
  getTrackPreview,
  getVideoId,
  getVideoInfo,
  getVideoPreview,
  Artist,
  Track,
  Album,
  Video,
  Playlist,
  Mix,
};
