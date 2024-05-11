[**tidal-music-api**](../README.md) • **Docs**

---

[tidal-music-api](../globals.md) / getTrackInfo

# Function: getTrackInfo()

> **getTrackInfo**(`trackId`, `countryCode`?): `Promise`\<`Track`\>

Retrieves track information from the Tidal API based on the provided track ID and country code.

## Parameters

• **trackId**: `number`

The ID of the track.

• **countryCode?**: `string`= `"US"`

The country code to use for retrieving the track information. Defaults to "US".

## Returns

`Promise`\<`Track`\>

A promise that resolves to a Track object containing the track information.

## Source

services/track.ts:11
