import { NextFunction, Request, Response } from 'express'
import { getUser } from '../services/auth.service'
import { logInfo } from '../utils/loggers'

export const restrictTologgedInUserOnly = async ({ cookies: {uid} } : Request, res: Response, next: NextFunction) => {
  if (!uid)
    return res.redirect('/login')

  const user = getUser(uid)

  if (!user)
    return res.redirect('/login')
  
  logInfo(user)

  next()
}