import fs from "fs";
import { promisify } from "util";
import { getTrackInfo } from "../lib/services/track.js";
import { getAlbumInfo } from "../lib/services/album.js";
import { getArtistInfo } from "../lib/services/artist.js";
import { getVideoInfo } from "../lib/services/video.js";
import { getPlaylistInfo } from "../lib/services/playlist.js";
import { getMixInfo } from "../lib/services/mix.js";

const writeFileAsync = promisify(fs.writeFile);

const saveToFile = async (data, filePath, dataType) => {
  // Convert the data object to JSON string
  const dataJson = JSON.stringify(data, null, 2);

  // Write the JSON string to a file
  await writeFileAsync(filePath, dataJson);

  console.log(`${dataType} information saved successfully to '${filePath}'.`);
};

(async () => {
  const trackId = 188267445;
  const albumId = 230064409;
  const artistId = 3995478;
  const videoId = 319408964;
  const playlistId = "3f9b1e8b-6802-4c98-be40-365bb0c7afee";
  const mixId = "005a8e20de5f0e46511435eb8a7521";

  try {
    // Fetch track information
    const track = await getTrackInfo(trackId);
    await saveToFile(track, "ex/res/m/track-info.json", "Track");

    // Fetch video information
    const video = await getVideoInfo(videoId);
    await saveToFile(video, "ex/res/m/video-info.json", "Video");

    // Fetch album information
    const album = await getAlbumInfo(albumId);
    await saveToFile(album, "ex/res/m/album-info.json", "Album");

    // Fetch artist information
    const artist = await getArtistInfo(artistId);
    await saveToFile(artist, "ex/res/m/artist-info.json", "Artist");

    // Fetch playlist information
    const playlist = await getPlaylistInfo(playlistId);
    await saveToFile(playlist, "ex/res/m/playlist-info.json", "Playlist");

    // Fetch mix information
    const mix = await getMixInfo(mixId);
    await saveToFile(mix, "ex/res/m/mix-info.json", "Mix");

    console.log("Information saved successfully.");
  } catch (error) {
    console.error("Error fetching or saving information:", error);
  }
})();
