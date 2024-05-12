import Track from "./Track";
import Video from "./Video";
import Album from "./Album";
import Playlist from "./Playlist";
import Mix from "./Mix";
import Image from "./Image";
import type { TrackData } from "./Track";
import type { AlbumData } from "./Album";
import type { PlaylistData } from "./Playlist";
import type { VideoData } from "./Video";
import type { MixData } from "./Mix";
import type { ImageData } from "./Image";

export interface ArtistData {
  id: number;
  name: string;
  contentType: string;
  bio: string;
  mixes: MixData[];
  albums: AlbumData[];
  credits: TrackData[];
  epsandsingles: AlbumData[];
  playlists: PlaylistData[];
  videos: VideoData[];
  tracks: TrackData[];
  image: ImageData;
}

export default class Artist {
  id: number;
  name: string;
  type: string;
  bio: string;
  mixes: Mix[];
  albums: Album[];
  credits: Track[];
  singles: Album[];
  playlists: Playlist[];
  videos: Video[];
  tracks: Track[];
  image: Image;

  /**
   * Initializes a new instance of the Artist class.
   *
   * @param {ArtistData} data - The data used to initialize the Artist instance.
   */
  constructor(data: ArtistData) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.contentType;
    this.bio = data.bio;
    this.mixes = data.mixes.map((item) => new Mix(item));
    this.albums = data.albums.map((item) => new Album(item));
    this.credits = data.credits.map((item) => new Track(item));
    this.singles = data.epsandsingles.map((item) => new Album(item));
    this.playlists = data.playlists.map((item) => new Playlist(item));
    this.videos = data.videos.map((item) => new Video(item));
    this.tracks = data.tracks.map((item) => new Track(item));
    this.image = new Image(data.image);
  }
}
