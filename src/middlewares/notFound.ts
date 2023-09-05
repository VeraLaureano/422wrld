import { Request, Response } from 'express'

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'ROUTE_DOES_NOT_EXIST',
    statusCode: 404
  })
}