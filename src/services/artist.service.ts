import ArtistModel from '../models/Artist.model'
import { Artist } from '../interfaces/artist.interface'

/**
 * @returns all artists found
 * @type Promise
 */
export const findAllArtists = async (pages: number, artistNumber: number, dataFind: object) => {
  // Calculate the number of documents to skip based on the current page and number of artists per page
  const skip = (pages - 1) * artistNumber

  // Find all artists that match the specified criteria, skipping the appropriate number of documents and limiting the results to the specified number of artists
  const responseArtists = await ArtistModel.find({...dataFind}).skip(skip).limit(artistNumber)

  // Return the response artists
  return responseArtists
}

/**
 * @param artistID string
 * @returns a artist found
 * @type Promise
 */
export const findOneArtist = async (artistID: string) => {
  const responseArtist = await ArtistModel.findOne({ _id: artistID }).populate('albums').exec()
  return responseArtist
}

/**
 * @param data Artist
 * @returns new artist
 * @type Promise
 */
export const createArtist =async (data: Artist) => {
  const responseArtist = await ArtistModel.create(data)
  return responseArtist
}

/**
 * @param artistID string
 * @param data Artist
 * @returns update artist
 * @type Promise
 */
export const findAndUpdateArtist = async (artistID: string, data: Artist) => {
  const responseArtist = await ArtistModel.findOneAndUpdate({ _id: artistID }, data, { new: true })
  return responseArtist
}

/**
 * @param artistID string
 * @returns delete artist
 * @type Promise
 */
export const findAndDeleteArtist = async (artistID: string) => {
  const responseArtist = await ArtistModel.findOneAndDelete({_id: artistID})
  return responseArtist
}