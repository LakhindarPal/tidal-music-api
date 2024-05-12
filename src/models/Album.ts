import Track from "./Track";
import type { TrackData } from "./Track";
import Image from "./Image";
import type { ImageData } from "./Image";
import type { ArtistLite } from "./ArtistLite";

export interface AlbumData {
  id: number;
  contentType: string;
  title: string;
  explicit: boolean;
  releaseDate: string;
  artists: ArtistLite[];
  tracks: TrackData[] | null;
  image: ImageData;
}

export default class Album {
  id: number;
  type: string;
  title: string;
  explicit: boolean;
  releasedAt: string;
  artists: ArtistLite[];
  tracks: Track[];
  image: Image;

  /**
   * Initializes a new instance of the Album class.
   *
   * @param {AlbumData} data - The data used to initialize the Album instance.
   */
  constructor(data: AlbumData) {
    this.id = data.id;
    this.type = data.contentType;
    this.title = data.title;
    this.explicit = data.explicit;
    this.releasedAt = data.releaseDate;
    this.artists = data.artists;
    this.tracks = (data.tracks || []).map((item) => new Track(item));
    this.image = new Image(data.image);
  }
}
