import { Album } from '../interfaces/album.interface'
import AlbumModel from '../models/Album.model'

export const findAllAlbums = async (pages: number, albumsNumber: number, dataFind: object) => {
  // Calculate the number of documents to skip based on the current page and number of albums per page
  const skip = (pages - 1) * albumsNumber

  // Find all albums that match the specified criteria, skipping the appropriate number of documents and limiting the results to the specified number of albums
  const responseAlbums = await AlbumModel.find({...dataFind}).skip(skip).limit(albumsNumber)

  // Return the response albums
  return responseAlbums
}

export const findOneAlbum = async (albumID: string) => {
  const responseAlbum = await AlbumModel.findById({_id: albumID}).populate('tracks').exec()

  return responseAlbum
}

export const createAlbum = async (data: Album) => {
  const responseAlbum = await AlbumModel.create(data)
  return responseAlbum
}

export const findAndUpdateAlbum = async (albumID: string, data: Album) => {
  const responseAlbum = await AlbumModel.findOneAndUpdate({_id: albumID}, data, {new: true})
  return responseAlbum
}

export const findAndDeleteAlbum = async (albumID: string) => {
  const responseAlbum = await AlbumModel.findOneAndDelete({_id: albumID})
  return responseAlbum
}

