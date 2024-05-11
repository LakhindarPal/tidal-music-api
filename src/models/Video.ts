interface Artist {
  id: number;
  name: string;
}

export interface VideoData {
  id: number;
  title: string;
  contentType: string;
  duration: number;
  explicit: boolean;
  releaseDate: string;
  artists: Artist[];
  image: {
    [key: string]: string | null;
  };
}

export default class Video {
  id: number;
  title: string;
  type: string;
  duration: number;
  explicit: boolean;
  releasedAt: string;
  artists: Artist[];
  image: {
    [key: string]: string | null;
  };

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
    this.image = Object.fromEntries(
      Object.entries(data.image).map(([key, value]) => [
        key,
        value ? "https:" + value : null,
      ]),
    );
  }
}
