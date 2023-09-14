import { Song } from './song.interface'

export interface Album {
  title: string;
  artist: string;
  producers: Array<string>;
  genre: Array<string>;
  releaseDate: Date;
  coverUrl: string;
  tracks: Array<Song>;
}