import { NextFunction, Request, Response } from 'express'

export const asyncWrapper = (
  callback: (req: Request, res: Response, next?: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
