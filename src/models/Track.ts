interface Album {
  id: number;
  title: string;
}

interface Artist {
  id: number;
  name: string;
}

export interface TrackData {
  id: number;
  contentType: string;
  title: string;
  duration: number;
  explicit: boolean;
  trackNumber: number;
  artists: Artist[];
  album: Album | null;
  image: {
    [key: string]: string | null;
  };
}

export default class Track {
  id: number;
  type: string;
  title: string;
  duration: number;
  explicit: boolean;
  position: number;
  artists: Artist[];
  album: Album | null;
  image: {
    [key: string]: string | null;
  };

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
    this.image = Object.fromEntries(
      Object.entries(data.image).map(([key, value]) => [
        key,
        value ? "https:" + value : null,
      ]),
    );
  }
}
