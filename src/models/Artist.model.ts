import { Schema, model } from 'mongoose'
import { Artist } from '../interfaces/artist.interface'

const ArtistSchema = new Schema<Artist>({
  imageURL: {
    type: String
  },
  pseudonym: {
    type: String
  },
  fullName: {
    type: String
  },
  born: {
    type: String
  },
  biography: {
    type: String
  }, 
  activity: {
    type: {
      from: Number,
      to: String
    }
  },
  nationality: {
    type: String
  },
  children: {
    type: String
  }, 
  genre:  {
    type: String
  },
  listen:  {
    type: {
      spotify: String,
      ytbMusic: String,
      appleMusic: String
    }
  },
  profiles: {
    threads: String,
    tiktok: String,
    youtube: String,
    instagram: String,
    twitter: String,
    facebook: String
  },
  albums: [{
    type: Schema.Types.ObjectId, ref: 'Album'
  }],
  tracks: [{
    type: Schema.Types.ObjectId, ref: 'Song'
  }],
  awards: [{
    date: String,
    name: String,
    description: String
  }]
})

const ArtistModel = model('Artist', ArtistSchema)
export default ArtistModel