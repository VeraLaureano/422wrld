import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { getUser } from '../services/auth.service'
import routes from '../config/routes'

// Define a middleware function that restricts access to admin users only
export const restrictToAdminOnly = async (req : AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { cookies: {uid} } = req

  // If there is no user ID in the cookies, redirect to the login page
  if (!uid)
    return res.redirect(`${routes.user}/login`)

  // Get the user object from the user ID
  const user = getUser(uid)

  // If there is no user object, redirect to the login page
  if (!user)
    return res.redirect(`${routes.user}/login`)

  // Get the name and email of the user
  const { name, email } = user
  
  // If the name and email do not match admin credentials, return a JSON object with an error message and status code
  if (name !== 'admin' && email !== '422wlrd@admin.com')
    return res.status(403).json({
      message: 'ACCESS_TO_THAT_RESOURCE_IS_FORBIDDEN',
      tsss: `${name} this is only for admin`,
      statusCode: 403
    })
    
  // Set the user object in the request and call the next middleware function
  req.user = user
  
  next()
}
