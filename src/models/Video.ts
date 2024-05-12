import Image from "./Image";
import type { ImageData } from "./Image";
import type { ArtistLite } from "./ArtistLite";

export interface VideoData {
  id: number;
  title: string;
  contentType: string;
  duration: number;
  explicit: boolean;
  releaseDate: string;
  artists: ArtistLite[];
  image: ImageData;
}

export default class Video {
  id: number;
  title: string;
  type: string;
  duration: number;
  explicit: boolean;
  releasedAt: string;
  artists: ArtistLite[];
  image: Image;

  /**
   * Initializes a new instance of the Video class.
   *
   * @param {VideoData} data - The data used to initialize the Video instance.
   */
  constructor(data: VideoData) {
    this.id = data.id;
    this.title = data.title;
    this.type = data.contentType;
    this.duration = data.duration;
    this.explicit = data.explicit;
    this.releasedAt = data.releaseDate;
    this.artists = data.artists;
    this.image = new Image(data.image);
  }
}
