import { Schema, model } from 'mongoose'
import { Album } from '../interfaces/album.interface'

const AlbumSchema = new Schema<Album>({
  title: String,
  artist: String,
  producers: [String],
  genre: [String],
  releaseDate: Date,
  coverUrl: String,
  tracks: [{
    type: Schema.Types.ObjectId, ref: 'Song'
  }],
  rating: Number 
})

const AlbumModel = model('Album', AlbumSchema)
export default AlbumModel