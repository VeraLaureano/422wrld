import { Request, Response } from 'express'
import { findAllArtists, findOneArtist, createArtist, findAndDeleteArtist, findAndUpdateArtist } from '../services/artist.service'
import { asyncWrapper } from '../utils/asyncWrapper'

/**
 * @method [GET]
 * @description search all artists
 */
export const getAllArtists = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllArtists()
    return res.status(200).json(data)
  }
)

/**
 * @method [GET]
 * @description search a artist with id in params
 */
// This function retrieves an artist's data from the database.
export const getOneArtist = asyncWrapper(
  async ({params: {id}}: Request, res: Response) => {
    // Find the artist with the given id.
    const data = await findOneArtist(id)

    // If no artist was found with the given id, return an error response.
    if (!data) 
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

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
  async ({body}: Request, res: Response) => {
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
  async ({ params: {id}, body }: Request, res: Response) => {
    // Find and update the artist with the given id.
    const newData = await findAndUpdateArtist(id, body)

    // If no artist was found with the given id, return an error response.
    if (!newData) 
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

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
  async ({ params: {id} }: Request, res: Response) => {
    // Find and delete the artist with the given id.
    const data = await findAndDeleteArtist(id)

    // If no artist was found with the given id, return an error response.
    if (!data)
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    // If the artist was successfully deleted, return a success response.
    return res.status(204).json({
      message: 'DELETE_SUCCESS',
      data: null,
      statusCode: 204
    })
  }
)
