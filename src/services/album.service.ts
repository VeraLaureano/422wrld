import { Album } from '../interfaces/album.interface'
import AlbumModel from '../models/Album.model'

export const findAllAlbums = async () => {
  const responseAlbums = await AlbumModel.find({})
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

