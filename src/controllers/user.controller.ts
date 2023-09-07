import { Request, Response } from 'express'
import { createUser, findOneUser } from '../services/user.service'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../services/auth.service'

export const postUserSignup = async ({ body }: Request, res: Response) => {
  const data = await createUser(body)
  return res.status(201).json(data)
}

export const postUserLogin = async ({body}: Request, res: Response) => {
  const { email, password } = body
  const data = await findOneUser(email, password)

  if (!data) 
    return res.status(500).json({
      message: 'NO_USER_WITH_THIS_DATA',
      error: 'INTERNAL_SERVER_ERROR',
      statusCode: 500
    })

  const sessionID = uuidv4() 
  setUser(sessionID, data)
  res.cookie('uid', sessionID)

  return res.status(200).json(data)
}