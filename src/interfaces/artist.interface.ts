import { Album } from './album.interface'
import { Song } from './song.interface'

interface Platforms {
  spotify: string;
  ytbMusic: string;
  amazonMusic: string;
  appleMusic: string;
}

interface Profile {
  youtube: string;
  instagram: string;
  twitter: string;
}

interface Award {
  year: number;
  category: string;
  nomination: string;
  result: string;
}

export interface Artist {
  imageURL: string;
  pseudonym: string;
  fullName: string;
  born: string;
  biography: string;
  activity: {
    from: number;
    to: string;
  };
  nationality: string;
  children: string;
  genre: [string];
  listen: Platforms;
  profiles: Profile;
  albums: Array<Album>;
  tracks: Array<Song>;
  awards: Array<Award>
}