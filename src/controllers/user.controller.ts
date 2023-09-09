import { Request, Response } from 'express'
import { createUser, findAllUsers, findOneUser } from '../services/user.service'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../services/auth.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { compareHashes } from '../utils/compareHashes'

// Define a function to handle user signups
export const postUserSignup = asyncWrapper(
  async ({ body: {name, email, password} }: Request, res: Response) => {
    // Set the number of salt rounds for bcrypt
    const saltRounds = 10

    // Hash the user's password using bcrypt
    const hashedPassword = await hash(password, saltRounds)

    // Create a new user with the name, email, and hashed password
    const data = await createUser({
      name,
      email,
      password: hashedPassword
    })

    // Send a JSON response with the new user data and a status code of 201
    return res.status(201).json(data)
  }
)

// Define a function to handle user logins
export const postUserLogin = asyncWrapper(
  async ({body}: Request, res: Response) => {
    // Get the email and password from the request body
    const { email, password } = body

    // Find the user with the specified email
    const data = await findOneUser(email)

    // Return an error if the user does not exist
    if (!data) 
      return res.status(500).json({
        message: 'EMAIL_OR_PASSWORD_INCORRECT',
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    // Compare the password with the hashed password in the database
    const isCorrect: boolean = await compareHashes(password, data.password)

    // Return an error if the password is incorrect
    if (!isCorrect)
      return res.status(500).json({
        message: 'EMAIL_OR_PASSWORD_INCORRECT',
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    // Generate a new session ID and store the user data in a Map
    const sessionID = uuidv4()
    setUser(sessionID, data)

    // Set a cookie with the session ID and return the user data
    res.cookie('uid', sessionID)
    return res.status(200).json(data)
  }
)


// Define a function to retrieve all users from a database
export const getAllUsers = asyncWrapper(
  async (_req: Request, res: Response) => {
    // Find all users in the database
    const data = await findAllUsers()

    // Send a JSON response with the user data and a status code of 200
    return res.status(200).json(data)
  }
)
