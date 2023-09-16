import { Response } from 'express'
import { findAllArtists, findOneArtist, createArtist, findAndDeleteArtist, findAndUpdateArtist } from '../services/artist.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import ArtistModel from '../models/Artist.model'
import { regex } from '../utils/regex'
import { deleteSuccess, internalServerError } from '../utils/messages'

/**
 * @method [GET]
 * @description search all artists
 */
export const getAllArtists = asyncWrapper(
  async ({query: {page, perPage, artist, genre}}: AuthenticatedRequest, res: Response) => {
    const pageNumber: number = parseInt(page as string, 10) || 1
    const totalArtists: number = await ArtistModel.countDocuments({})
    const artistsPerPage: number = parseInt(perPage as string, 10) || totalArtists

    let dataFind: object = {}

    if (artist as string) dataFind = { ...dataFind, artist: regex(artist as string) }
    if (genre as string) dataFind = { ...dataFind, genre: regex(genre as string)}

    const data = await findAllArtists(pageNumber, artistsPerPage, dataFind)

    return res.status(200).json(data)
  }
)

/**
 * @method [GET]
 * @description search a artist with id in params
 */
// This function retrieves an artist's data from the database.
export const getOneArtist = asyncWrapper(
  async ({params: {id}}: AuthenticatedRequest, res: Response) => {
    // Find the artist with the given id.
    const data = await findOneArtist(id)

    // If no artist was found with the given id, return an error response.
    if (!data) 
      return res.status(500).json(internalServerError('artist', id))

    // If the artist was successfully found, return a success response with the artist's data.
    return res.status(200).json(data)
  }
)


/**
 * @method [POST]
 * @description post a new artist in the db
 */
// This function creates a new artist in the database.
export const postArtist = asyncWrapper (
  async ({body}: AuthenticatedRequest, res: Response) => {
    // Create a new artist with the given data.
    const newData = await createArtist(body)

    // Return a success response with the newly created artist's data.
    return res.status(201).json(newData)
  }
)


/**
 * @method [PATCH]
 * @description update the found artist
 */
// This function updates an artist's data in the database.
export const patchArtist = asyncWrapper(
  async ({ params: {id}, body }: AuthenticatedRequest, res: Response) => {
    // Find and update the artist with the given id.
    const newData = await findAndUpdateArtist(id, body)

    // If no artist was found with the given id, return an error response.
    if (!newData) 
      return res.status(500).json(internalServerError('artist', id))

    // If the artist was successfully updated, return a success response.
    return res.status(201).json(newData)
  }
)
/**
 * @method [DELETE]
 * @description delete the soung artist
 */
// This function deletes an artist from the database.
export const deleteArtist = asyncWrapper(
  async ({ params: {id} }: AuthenticatedRequest, res: Response) => {
    // Find and delete the artist with the given id.
    const data = await findAndDeleteArtist(id)

    // If no artist was found with the given id, return an error response.
    if (!data)
      return res.status(500).json(internalServerError('artist', id))

    // If the artist was successfully deleted, return a success response.
    return res.status(204).json(deleteSuccess)
  }
)
