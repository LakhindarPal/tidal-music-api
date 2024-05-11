# Tidal Music API

## Introduction

This npm package provides a simple wrapper for interacting with the Tidal API. It allows you to retrieve information about tracks, artists, albums, videos, playlists, and mixes based on their URLs.

## Installation

To install the package, run the following command:

```bash
npm install tidal-music-api
```

## Usage

### Getting Started

First, import the `getInfo` function from the package:

```javascript
const { getInfo } = require("tidal-music-api");
```

### Retrieving Information

You can use the `getInfo` function to retrieve information based on a Tidal URL:

```javascript
const url = "https://tidal.com/browse/track/12345678";

getInfo(url)
  .then((info) => {
    console.log(info);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

The `getInfo` function returns a Promise that resolves to the information based on the URL type (track, artist, album, video, playlist, or mix).

### Supported URL Types

- Track: `https://tidal.com/browse/track/<trackId>`
- Artist: `https://tidal.com/browse/artist/<artistId>`
- Album: `https://tidal.com/browse/album/<albumId>`
- Video: `https://tidal.com/browse/video/<videoId>`
- Playlist: `https://tidal.com/browse/playlist/<playlistId>`
- Mix: `https://tidal.com/browse/mix/<mixId>`

### Additional Usage

#### Track

You can also use the `getTrackId` and `getTrackInfo` functions to retrieve information about a specific track:

```javascript
const { getTrackId, getTrackInfo } = require("tidal-music-api");

const trackId = getTrackId(url);
if (trackId) {
  getTrackInfo(trackId)
    .then((track) => {
      console.log(track);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}
```

#### Artist, Album, Video, Playlist, Mix

Similarly, you can use the corresponding functions (`getArtistId`, `getArtistInfo`, `getAlbumId`, `getAlbumInfo`, `getVideoId`, `getVideoInfo`, `getPlaylistId`, `getPlaylistInfo`, `getMixId`, `getMixInfo`) for retrieving information about artists, albums, videos, playlists, and mixes.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
