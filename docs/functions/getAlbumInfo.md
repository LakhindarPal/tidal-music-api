[**tidal-music-api**](../README.md) • **Docs**

---

[tidal-music-api](../globals.md) / getAlbumInfo

# Function: getAlbumInfo()

> **getAlbumInfo**(`albumId`, `countryCode`?): `Promise`\<`Album`\>

Retrieves album information from the Tidal API based on the provided album ID and country code.

## Parameters

• **albumId**: `number`

The ID of the album.

• **countryCode?**: `string`= `"US"`

The country code to use for retrieving the album information. Defaults to "US".

## Returns

`Promise`\<`Album`\>

A promise that resolves to an Album object containing the album information.

## Source

services/album.ts:11
