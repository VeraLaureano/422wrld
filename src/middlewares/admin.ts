import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { getUser } from '../services/auth.service'
import { VERSION } from '../config/env'

const jsonUnauth = { 
  method: 'POST',
  VERSION: VERSION,
  message: 'UNAUTHORIZED'
}

export const restrictToAdminOnly = async (req : AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { cookies: {uid} } = req

  if (!uid)
    return res.render('login', jsonUnauth)

  const user = getUser(uid)

  if (!user)
    return res.render('login', jsonUnauth)

  const { name, email } = user
  
  if (name !== 'admin' && email !== '422wlrd@admin.com')
    return res.status(403).json({
      message: 'ACCESS_TO_THAT_RESOURCE_IS_FORBIDDEN',
      tsss: `${name} this is only for admin`,
      statusCode: 403
    })
    
  req.user = user
  
  next()
}