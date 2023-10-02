// Import modules
import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { UNAUTHORIZED } from '../config/statusCode'
import { decoded } from '../utils/decoded'
import { findUserAuth } from '../services/user.service'
import { logError } from '../utils/loggers'

// Define a middleware function to restrict access to certain routes to logged-in users only
export const authentication = async (req : AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Extract the 'authorization' header from the request
  const auth = req.headers.authorization

  // If 'authorization' header is missing or does not start with 'Bearer ', return an unauthorized response
  if (!auth || !auth.startsWith('Bearer '))               
    return res.status(UNAUTHORIZED).json({message: 'UNAUTHORIZED'})

  // Extract the token from the 'authorization' header
  const token = auth.split(' ')[1]

  try {
    // Decode the token to get userId
    const { userId } = decoded(token)

    // Find the user with the specified userId
    const user = await findUserAuth(userId)

    // If no user is found, return an unauthorized response
    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'USER_NOT_FOND'})

    // Set the request user object to the found object
    req.user = user
  } catch (error) {
    logError(error)
  }

  // Call next middleware function
  next()
}

