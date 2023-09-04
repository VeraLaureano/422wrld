import ArtistModel from '../models/Artist.model'
import { Artist } from '../interfaces/artist.interface'

export const findAllArtists = async () => {
  const responseArtists = await ArtistModel.find({})
  return responseArtists
}

export const findOneArtist = async (artistID: string) => {
  const responseArtist = await ArtistModel.findOne({ _id: artistID })
  return responseArtist
}

export const createArtist =async (data: Artist) => {
  const responseArtist = await ArtistModel.create(data)
  return responseArtist
}

export const findAndUpdateArtist = async (artistID: string, data: Artist) => {
  const responseArtist = await ArtistModel.findOneAndUpdate({ _id: artistID }, data, { new: true })
  return responseArtist
}

export const findAndDeleteArtist = async (artistID: string) => {
  const responseArtist = await ArtistModel.findOneAndDelete({_id: artistID})
  return responseArtist
}