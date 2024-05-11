import Track from "./Track";
import type { TrackData } from "./Track";

interface Artist {
  id: number;
  name: string;
}

export interface AlbumData {
  id: number;
  contentType: string;
  title: string;
  explicit: boolean;
  releaseDate: string;
  artists: Artist[];
  tracks?: TrackData[];
  image: { [key: string]: string | null };
}

export default class Album {
  id: number;
  type: string;
  title: string;
  explicit: boolean;
  releasedAt: string;
  artists: Artist[];
  tracks: Track[];
  image: { [key: string]: string | null };

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
    this.image = Object.fromEntries(
      Object.entries(data.image).map(([key, value]) => [
        key,
        value ? "https:" + value : null,
      ]),
    );
  }
}
