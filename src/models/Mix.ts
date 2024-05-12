import Track from "./Track";
import Image from "./Image";
import type { TrackData } from "./Track";
import type { ArtistLite } from "./ArtistLite";

export interface MixData {
  id: number;
  contentType: string;
  title: string;
  artists: ArtistLite[];
  tracks: TrackData[] | null;
  image: Image;
}

export default class Mix {
  id: number;
  type: string;
  title: string;
  artists: ArtistLite[];
  tracks: Track[];
  image: Image;

  /**
   * Initializes a new instance of the Mix class.
   *
   * @param {MixData} data - The data used to initialize the Mix instance.
   */
  constructor(data: MixData) {
    this.id = data.id;
    this.type = data.contentType;
    this.title = data.title;
    this.artists = data.artists;
    this.tracks = (data.tracks || []).map((item) => new Track(item));
    this.image = data.image;
  }
}
