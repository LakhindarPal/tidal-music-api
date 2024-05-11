[**tidal-music-api**](../README.md) • **Docs**

---

[tidal-music-api](../globals.md) / getArtistInfo

# Function: getArtistInfo()

> **getArtistInfo**(`artistId`, `countryCode`?): `Promise`\<`Artist`\>

Retrieves the information of an artist from the Tidal API based on the provided artist ID and country code.

## Parameters

• **artistId**: `number`

The ID of the artist.

• **countryCode?**: `string`= `"US"`

The country code to use for retrieving the artist information. Defaults to "US".

## Returns

`Promise`\<`Artist`\>

A promise that resolves to an Artist object containing the artist information.

## Source

services/artist.ts:11
