import { Request, Response } from 'express'
import { asyncWrapper } from '../utils/asyncWrapper'
import { createSong, findAllSongs, findAndDeleteSong, findAndUpdateSong, findOneSong } from '../services/song.service'

export const getAllSongs = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllSongs()

    return res.status(200).json(data)
  }
)

export const getOneSong = asyncWrapper(
  async ({ params: {id} }: Request, res: Response) => {
    const data = await findOneSong(id)

    if (!data)
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(200).json(data)
  }
)

export const postSong = asyncWrapper(
  async ({ body }: Request, res: Response) => {
    const data = await createSong(body)
    return res.status(201).json(data)
  }
)

export const patchSong = asyncWrapper(
  async ({ params: {id}, body}: Request, res: Response) => {
    const newData = await findAndUpdateSong(id, body)
    
    if (!newData)
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(201).json(newData)
  }
)

export const deleteSong = asyncWrapper(
  async ({ params: {id} }: Request, res: Response) => {
    const data = await findAndDeleteSong(id)

    if (!data)
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(204).json({
      message: 'DELETE_SUCCESS',
      data: null,
      statusCode: 204
    })
  }
)
