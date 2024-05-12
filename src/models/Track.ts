import Image from "./Image";
import type { ImageData } from "./Image";
import type { AlbumLite } from "./AlbumLite";
import type { ArtistLite } from "./ArtistLite";

export interface TrackData {
  id: number;
  contentType: string;
  title: string;
  duration: number;
  explicit: boolean;
  trackNumber: number;
  artists: ArtistLite[];
  album: AlbumLite | null;
  image: ImageData;
}

export default class Track {
  id: number;
  type: string;
  title: string;
  duration: number;
  explicit: boolean;
  position: number;
  artists: ArtistLite[];
  album: AlbumLite | null;
  image: Image;

  /**
   * Initializes a new instance of the Track class.
   *
   * @param {TrackData} data - The data used to initialize the Track instance.
   */
  constructor(data: TrackData) {
    this.id = data.id;
    this.type = data.contentType;
    this.title = data.title;
    this.duration = data.duration;
    this.explicit = data.explicit;
    this.position = data.trackNumber;
    this.artists = data.artists;
    this.album = data.album;
    this.image = new Image(data.image);
  }
}
