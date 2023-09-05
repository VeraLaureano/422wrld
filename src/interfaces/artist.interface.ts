import { Album } from './album.interface'
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
  activity: {
    from: number;
    to: string;
  };
  nationality: string;
  children: string;
  genre: string;
  listen: Platforms;
  profiles: Profile;
  albums: Array<Album>;
  tracks: Array<Song>;
  awards: Array<Award>
}