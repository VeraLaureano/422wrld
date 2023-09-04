import { Song } from './song.interface'

interface Platforms {
  spotify: string;
  ytbMusic: string;
  appleMusic: string;
}

interface Profile {
  threads: string;
  tiktok: string;
  youtube: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

interface Award {
  date: string;
  name: string;
  description: string;
}

export interface Artist {
  imageURL: string;
  pseudonym: string;
  fullName: string;
  born: string;
  biography: string;
  activity: [number, number | string];
  nationality: string;
  children: string | Array<string>;
  genre: string | Array<string>;
  listen: Platforms;
  profiles: Profile;
  albums: [];
  songs: Song;
  awards: Array<Award>
}