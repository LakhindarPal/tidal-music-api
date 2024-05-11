[**tidal-music-api**](../README.md) • **Docs**

---

[tidal-music-api](../globals.md) / getPlaylistInfo

# Function: getPlaylistInfo()

> **getPlaylistInfo**(`playlistId`, `countryCode`?): `Promise`\<`Playlist`\>

Retrieves playlist information based on the provided playlist ID and country code.

## Parameters

• **playlistId**: `string`

The ID of the playlist.

• **countryCode?**: `string`= `"US"`

The country code to use for retrieving the playlist information. Defaults to "US".

## Returns

`Promise`\<`Playlist`\>

A promise that resolves to a Playlist object containing the playlist information.

## Source

services/playlist.ts:11
