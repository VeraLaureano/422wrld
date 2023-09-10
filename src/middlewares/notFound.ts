// Import modules
import { Response } from 'express'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'

// Define a function to handle 404 errors
export const notFound = (_req: AuthenticatedRequest, res: Response) => {
  // Set the status code of the response to 404
  res.status(404).json({
    message: 'ROUTE_DOES_NOT_EXIST',
    statusCode: 404
  })
}
