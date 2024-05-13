/**
 * Extracts the type of URL from a Tidal URL.
 *
 * @param {string} url - The Tidal URL to extract the type from.
 * @return {string | null} - The type of URL extracted from the input URL, or null if the URL does not match the expected format.
 */
export function getURLType(url: string): string | null {
  const regex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)?(track|video|album|playlist|mix|artist)\/[0-9a-zA-Z\-]+/;
  const match: RegExpMatchArray | null = url.match(regex);
  return match ? match[1].toUpperCase() : null;
}
