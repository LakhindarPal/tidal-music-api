const fs = require("fs");
const { promisify } = require("util");
const { getTrackInfo } = require("../lib/services/track");
const { getAlbumInfo } = require("../lib/services/album");
const { getArtistInfo } = require("../lib/services/artist");
const { getVideoInfo } = require("../lib/services/video");
const { getPlaylistInfo } = require("../lib/services/playlist");
const { getMixInfo } = require("../lib/services/mix");

const writeFileAsync = promisify(fs.writeFile);

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
    await saveToFile(track, "ex/res/trackInfo.json", "Track");

    // Fetch video information
    const video = await getVideoInfo(videoId);
    await saveToFile(video, "ex/res/videoInfo.json", "Video");

    // Fetch album information
    const album = await getAlbumInfo(albumId);
    await saveToFile(album, "ex/res/albumInfo.json", "Album");

    // Fetch artist information
    const artist = await getArtistInfo(artistId);
    await saveToFile(artist, "ex/res/artistInfo.json", "Artist");

    // // Fetch playlist information
    const playlist = await getPlaylistInfo(playlistId);
    await saveToFile(playlist, "ex/res/playlistInfo.json", "Playlist");

    // // Fetch mix information
    const mix = await getMixInfo(mixId);
    await saveToFile(mix, "ex/res/mixInfo.json", "Mix");

    console.log("Information saved successfully.");
  } catch (error) {
    console.error("Error fetching or saving information:", error);
  }
})();

async function saveToFile(data, filePath, dataType) {
  // Convert the data object to JSON string
  const dataJson = JSON.stringify(data, null, 2);

  // Write the JSON string to a file
  await writeFileAsync(filePath, dataJson);

  console.log(`${dataType} information saved successfully to '${filePath}'.`);
}
