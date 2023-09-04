import { Request, Response } from 'express'
import { findAllArtists, findOneArtist, createArtist, findAndDeleteArtist, findAndUpdateArtist } from '../services/artist.service'
import { asyncWrapper } from '../utils/asyncWrapper'

export const getAllArtists = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllArtists()
    return res.status(200).json(data)
  }
)

export const getOneArtist = asyncWrapper(
  async ({params: {id}}: Request, res: Response) => {
    const data = await findOneArtist(id)

    if (!data) 
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(200).json(data)
  }
)

export const postArtist = asyncWrapper (
  async ({body}: Request, res: Response) => {
    const newData = await createArtist(body)
    return res.status(201).json(newData)
  }
)

export const patchArtist = asyncWrapper(
  async ({ params: {id}, body }: Request, res: Response) => {
    const newData = await findAndUpdateArtist(id, body)

    if (!newData) 
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(201).json(newData)
  }
)

export const deleteArtist = asyncWrapper(
  async ({ params: {id} }: Request, res: Response) => {
    const data = await findAndDeleteArtist(id)

    if (!data)
      return res.status(500).json({
        message: `NO_SONG_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(204).json({
      message: 'DELETE_SUCCESS',
      artist: null,
      statusCode: 500
    })
  }
)