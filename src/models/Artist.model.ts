import { Schema, model } from 'mongoose'
import { Artist } from '../interfaces/artist.interface'

const ArtistSchema = new Schema<Artist>({
  imageURL: {
    type: String,
    required: [true, 'MUST_PROVIDE_IMAGE_URL']
  },
  pseudonym: {
    type: String,
    required: [true, 'MUST_PROVIDE_PSEUDONYM']
  },
  fullName: {
    type: String,
    required: [true, 'MUST_PROVIDE_FULL_NAME']
  },
  born: {
    type: String,
    required: [true, 'MUST_PROVIDE_BORN']
  },
  biography: {
    type: String,
    required: [true, 'MUST_PROVIDE_BIOGRAPHY']
  }, 
  activity: {
    type: [Number, String || Number],
    required: [true, 'MUST_PROVIDE_ACTIVITY']
  },
  nationality: {
    type: String,
    required: [true, 'MUST_PROVIDE_NATIONALITY']
  },
  children: {
    type: String,
    required: [true, 'MUST_PROVIDE_CHILDREN']
  }, 
  genre:  {
    type: String,
    required: [true, 'MUST_PROVIDE_GENRE']
  },
  listen:  {
    type: {
      spotify: String,
      ytbMusic: String,
      appleMusic: String
    },
    required: [true, 'MUST_PROVIDE_LISTEN']
  },
  profiles: {
    threads: String,
    tiktok: String,
    youtube: String,
    instagram: String,
    twitter: String,
    facebook: String
  },
  albums: [],
  songs: {
    type: Schema.Types.ObjectId, ref: 'Song'
  },
  awards: [{
    date: String,
    name: String,
    description: String
  }]
})

const ArtistModel = model('Artist', ArtistSchema)
export default ArtistModel