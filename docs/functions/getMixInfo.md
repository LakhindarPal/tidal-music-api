[**tidal-music-api**](../README.md) • **Docs**

---

[tidal-music-api](../globals.md) / getMixInfo

# Function: getMixInfo()

> **getMixInfo**(`mixId`, `countryCode`?): `Promise`\<`Mix`\>

Retrieves mix information from the Tidal API based on the provided mix ID and country code.

## Parameters

• **mixId**: `string`

The ID of the mix.

• **countryCode?**: `string`= `"US"`

The country code to use for retrieving the mix information. Defaults to "US".

## Returns

`Promise`\<`Mix`\>

A promise that resolves to a Mix object containing the mix information.

## Source

services/mix.ts:11
