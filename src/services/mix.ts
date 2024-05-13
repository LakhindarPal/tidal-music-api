import Mix from "../models/Mix";
import type { MixData } from "../models/Mix";
import { tidalAPI } from "../utils/fetcher";

/**
 * Retrieves mix information from the Tidal API based on the provided mix ID and country code.
 * @param {string} mixId - The ID of the mix.
 * @param {string} [countryCode="US"] - The country code to use for retrieving the mix information. Defaults to "US".
 * @returns {Promise<Mix>} A promise that resolves to a Mix object containing the mix information.
 */
export async function getMixInfo(
  mixId: string,
  countryCode: string = "US",
): Promise<Mix> {
  if (!mixId) throw new Error("Invalid mix ID");

  const { data }: { data: { mix: MixData } } = await tidalAPI.post(
    "/",
    JSON.stringify({
      query: `
          query ($mixId: String!, $countryCode: String!) {
            mix(id: $mixId, countryCode: $countryCode) {
              contentType
              image { original large medium small xsmall }
              sizes { original large medium small }
              title
              artists { id name }
              id
              tracks(countryCode: $countryCode) {
                album { id title }
                artists { id name }
                contentType
                duration
                explicit
                id
                image { original large medium small xsmall }
                title
                trackNumber
              }
            }
          }
        `,
      variables: { mixId, countryCode },
    }),
  );

  if (!data?.mix) throw new Error("Mix information not found");

  return new Mix(data.mix);
}

/**
 * Extracts the mix ID from a given URL.
 *
 * @param {string} url - The URL from which to extract the mix ID.
 * @return {string} - The extracted mix ID, or empty string if the URL does not match the expected format.
 */
export function getMixId(url: string): string {
  const mixRegex: RegExp =
    /^https:\/\/(?:listen\.tidal\.com|tidal\.com)\/(?:browse\/)?mix\/([0-9a-zA-Z\-]+)$/;
  const matchedId: string | undefined = url.match(mixRegex)?.[1];
  return matchedId ?? "";
}
