export interface Song {
  title: string;
  artist: [string];
  producer: [string];
  genre: [string];
  release: string;
  duration: { minutes: number; seconds: number };
  spotify: string;
  cover: string;
}