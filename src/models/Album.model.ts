import { Schema, model } from 'mongoose'
import { Album } from '../interfaces/album.interface'

const AlbumSchema = new Schema<Album>({
  title: {
    type: String,
    required: [true, 'MUST_PROVIDE_TITLE']
  },
  artist: {
    type: String,
    required: [true, 'MUST_PROVIDE_ARTIST']
  },
  producers: [{
    type: String,
    required: [true, 'MUST_PROVIDE_PRODUCERS']
  }],
  genre: [{
    type: String,
    required: [true, 'MUST_PROVIDE_GENRE']
  }],
  releaseDate: Date,
  coverUrl: String,
  tracks: [{
    type: Schema.Types.ObjectId, ref: 'Song',
    required: [true, 'MUST_PROVIDE_TRACKS']
  }]
},
{timestamps: false})

const AlbumModel = model('Album', AlbumSchema)
export default AlbumModel