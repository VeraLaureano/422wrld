import { Request, Response } from 'express'
import { createAlbum, findAllAlbums, findAndDeleteAlbum, findAndUpdateAlbum, findOneAlbum } from '../services/album.service'
import { asyncWrapper } from '../utils/asyncWrapper'

export const getAllAlbums = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllAlbums()
    res.status(200).json(data)
  }
)

export const getOneAlbum = asyncWrapper(
  async ({params: {id}}: Request, res: Response) => {
    const data = await findOneAlbum(id)

    if (!data)
      return res.status(500).json({
        message: `NO_ALBUM_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(200).json(data)
  }
)

export const postAlbum = asyncWrapper(
  async ({body}: Request, res: Response) => {
    const newData = await createAlbum(body)
    return res.status(201).json(newData)
  }
)

export const patchAlbum = asyncWrapper(
  async ({params: {id}, body}: Request, res: Response) => {
    const data = await findAndUpdateAlbum(id, body)

    if (!data)
      res.status(500).json({
        message: `NO_ALBUM_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })
    
    return res.status(201).json(data)
  }
)

export const deleteAlbum = asyncWrapper(
  async ({params: {id}}: Request, res: Response) => {
    const data = await findAndDeleteAlbum(id)

    if (!data)
      return res.status(500).json({
        message: `NO_ALBUM_WITH_ID_${id}`,
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