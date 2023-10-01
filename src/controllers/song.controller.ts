import { Response } from 'express'
import { asyncWrapper } from '../utils/asyncWrapper'
import { createSong, findAllSongs, findAndDeleteSong, findAndUpdateSong, findOneSong } from '../services/song.service'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import SongModel from '../models/Song.model'
import { regex } from '../utils/regex'
import { deleteSuccess, internalServerError } from '../utils/messages'
import { CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT } from '../config/statusCode'

/**
 * @method [GET]
 * @description search all songs
 */
export const getAllSongs = asyncWrapper(
  async ({query: {page, perPage, artist, producer, genre}}: AuthenticatedRequest, res: Response) => {
    const pageNumber: number = parseInt(page as string, 10) || 1
    const totalSongs: number = await SongModel.countDocuments({})
    const songsPerPage: number =  parseInt(perPage as string, 10) || totalSongs

    let dataFind: object = {}

    if (artist as string) dataFind = { ...dataFind, artist: regex(artist as string) }
    if (producer as string) dataFind = { ...dataFind, producer: regex(producer as string)}
    if (genre as string) dataFind = { ...dataFind, genre: regex(genre as string)}

    const data = await findAllSongs(pageNumber, songsPerPage, dataFind)

    return res.status(EVERYTHING_OK).json(data)
  }
)

/**
 * @method [GET]
 * @description search a song with id in params
 */
export const getOneSong = asyncWrapper(
  async ({ params: {id} }: AuthenticatedRequest, res: Response) => {
    const data = await findOneSong(id)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('song', id))

    return res.status(EVERYTHING_OK).json(data)
  }
)

/**
 * @method [POST]
 * @description post a new song in the db
 */
export const postSong = asyncWrapper(
  async ({ body }: AuthenticatedRequest, res: Response) => {
    const data = await createSong(body)
    return res.status(CREATED).json(data)
  }
)

/**
 * @method [PATCH]
 * @description update the found artist
 */
export const patchSong = asyncWrapper(
  async ({ params: {id}, body}: AuthenticatedRequest, res: Response) => {
    const newData = await findAndUpdateSong(id, body)
    
    if (!newData)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('song', id))

    return res.status(CREATED).json(newData)
  }
)

/**
 * @method [DELETE]
 * @description delete the soung artist
 */
export const deleteSong = asyncWrapper(
  async ({ params: {id} }: AuthenticatedRequest, res: Response) => {
    const data = await findAndDeleteSong(id)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('song', id))

    return res.status(NO_CONTENT).json(deleteSuccess)
  }
)
