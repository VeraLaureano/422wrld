import { Request, Response } from 'express'
import { createUser, findAllUsers, findOneUser } from '../services/user.service'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../services/auth.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { compareHashes } from '../utils/compareHashes'

export const postUserSignup = asyncWrapper(
  async ({ body: {name, email, password} }: Request, res: Response) => {
    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)

    const data = await createUser({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json(data)
  }
)

export const postUserLogin = asyncWrapper(
  async ({body}: Request, res: Response) => {
    const { email, password } = body
    const data = await findOneUser(email)
  
    if (!data) 
      return res.status(500).json({
        message: 'NO_USER_WITH_THIS_DATA',
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    const isCorrect: boolean = await compareHashes(password, data.password)

    if (!isCorrect)
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
)

export const getAllUsers = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllUsers()
    return res.status(200).json(data)
  }
)