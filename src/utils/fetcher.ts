import { fetcher } from "itty-fetcher";

export const tidalAPI = fetcher({
  base: "https://gqlapi.tidal.com",
  headers: {
    "Content-Type": "application/json",
  },
});
