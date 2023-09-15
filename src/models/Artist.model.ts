import { Schema, model } from 'mongoose'
import { Artist } from '../interfaces/artist.interface'

const ArtistSchema = new Schema<Artist>({
  imageURL: {
    type: String,
    required: [true, 'MUST_PROVIDE_IMAGEURL']
  },
  pseudonym: {
    type: String,
    required: [true, 'MUST_PROVIDE_PSEUDONYM']
  },
  fullName: {
    type: String,
    required: [true, 'MUST_PROVIDE_FULLNAME']
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
    type: {
      from: Number,
      to: String
    },
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
    type: [String],
    required: [true, 'MUST_PROVIDE_GENRE']
  },
  listen:  {
    type: {
      spotify: String,
      ytbMusic: String,
      amazonMusic: String,
      appleMusic: String
    },
    required: [true, 'MUST_PROVIDE_LISTEN_LINKS']
  },
  profiles: {
    type: {
      youtube: String,
      instagram: String,
      twitter: String
    },
    required: [true, 'MUST_PROVIDE_PROFILES_LINKS']
  },
  albums: {
    type: [{
      type: Schema.Types.ObjectId, ref: 'Album'
    }]
  },
  tracks: {
    type: [{
      type: Schema.Types.ObjectId, ref: 'Song'
    }],
    required: [true, 'MUST_PROVIDE_TRACKS']
  },
  awards: {
    type: [{
      year: Number,
      category: String,
      nomination: String,
      result: String
    }],
    required: [true, 'MUST_PROVIDE_AWARDS']
  }
},
{timestamps: false})

const ArtistModel = model('Artist', ArtistSchema)
export default ArtistModel