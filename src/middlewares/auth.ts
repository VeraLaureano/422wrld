// Import modules
import { NextFunction, Request, Response } from 'express'
import { getUser } from '../services/auth.service'
import { logInfo } from '../utils/loggers'

// Define a middleware function to restrict access to certain routes to logged-in users only
export const restrictTologgedInUserOnly = async ({ cookies: {uid} } : Request, res: Response, next: NextFunction) => {
  // Check if user is logged in
  if (!uid)
    return res.redirect('/login')

  // Get user object from Map
  const user = getUser(uid)

  // Check if user object exists
  if (!user)
    return res.redirect('/login')

  // Call next middleware function
  next()
}

// Define a middleware function to log user information
export const checkAuth = async (req: Request, _res: Response, next: NextFunction) => {
  // Get session ID from cookie
  const { cookies: {uid} } = req

  // Get user object from Map
  const user = getUser(uid)

  // Log user information
  logInfo(user)

  // Call next middleware function
  next()
}