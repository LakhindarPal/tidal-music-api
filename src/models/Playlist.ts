import Track from "./Track";
import Image from "./Image";
import type { TrackData } from "./Track";
import type { ImageData } from "./Image";
import type { ArtistLite } from "./ArtistLite";

export interface PlaylistData {
  uuid: string;
  contentType: string;
  title: string;
  description: string;
  creator: ArtistLite;
  created: string;
  lastUpdated: string;
  image: ImageData;
  numberOfTracks: number;
  tracks: TrackData[] | null;
}

export default class Playlist {
  id: string;
  type: string;
  title: string;
  description: string;
  creator: ArtistLite;
  createdAt: string;
  updatedAt: string;
  image: Image;
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
    this.image = new Image(data.image);
    this.size = data.numberOfTracks;
    this.tracks = (data.tracks || []).map((item) => new Track(item));
  }
}
