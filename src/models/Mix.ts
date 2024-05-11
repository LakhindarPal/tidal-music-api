import Track from "./Track";
import type { TrackData } from "./Track";

interface Artist {
  id: number;
  name: string;
}

export interface MixData {
  id: number;
  contentType: string;
  title: string;
  artists: Artist[];
  tracks?: TrackData[];
  image: { [key: string]: string | null };
}

export default class Mix {
  id: number;
  type: string;
  title: string;
  artists: Artist[];
  tracks: Track[];
  image: { [key: string]: string | null };

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
