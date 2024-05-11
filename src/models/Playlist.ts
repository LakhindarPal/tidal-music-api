import Track from "./Track";
import type { TrackData } from "./Track";

interface Creator {
  id: number;
  name: string;
}

export interface PlaylistData {
  uuid: string;
  contentType: string;
  title: string;
  description: string;
  creator: Creator;
  created: string;
  lastUpdated: string;
  image: { [key: string]: string | null };
  numberOfTracks: number;
  tracks?: TrackData[];
}

export default class Playlist {
  id: string;
  type: string;
  title: string;
  description: string;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  image: { [key: string]: string | null };
  size: number;
  tracks: Track[];

  /**
   * Initializes a new instance of the Playlist class.
   *
   * @param {PlaylistData} data - The data used to initialize the Playlist instance.
   */
  constructor(data: PlaylistData) {
    this.id = data.uuid;
    this.type = data.contentType;
    this.title = data.title;
    this.description = data.description;
    this.creator = data.creator;
    this.createdAt = data.created;
    this.updatedAt = data.lastUpdated;
    this.image = Object.fromEntries(
      Object.entries(data.image).map(([key, value]) => [
        key,
        value ? "https:" + value : null,
      ]),
    );
    this.size = data.numberOfTracks;
    this.tracks = (data.tracks || []).map((item) => new Track(item));
  }
}
