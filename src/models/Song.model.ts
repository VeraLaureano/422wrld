import { Schema, model } from 'mongoose'
import { Song } from '../interfaces/song.interface'

export const SongSchema = new Schema<Song>({
  title: {
    type: String,
    required: [true, 'MUST_PROVIDE_NAME']
  },
  artist: {
    type: [String],
    required: [true, 'MUST_PROVIDE_ARTIST']
  },
  producer: {
    type: [String],
    required: [true, 'MUST_PROVIDE_PRODUCER']
  },
  genre: {
    type: [String],
    required: [true, 'MUST_PROVIDE_GENRE']
  },
  release: {
    type: String,
    required: [true, 'MUST_PROVIDE_RELEASE']
  },
  duration: {
    minutes: {
      type: Number,
      required: [true, 'MUST_PROVIDE_MINUTES']
    },
    seconds: {
      type: Number,
      required: [true, 'MUST_PROVIDE_MINUTES']
    },
  },
  spotify: {
    type: String,
    required: [true, 'MUST_PROVIDE_SPOTIFY_LINK']
  },
  cover: {
    type: String,
    required: [true, 'MUST_PROVIDE_COVER_URL']
  }
},
{timestamps: false})

const SongModel = model('Song', SongSchema)
export default SongModel