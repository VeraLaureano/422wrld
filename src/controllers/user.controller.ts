import { Response } from 'express'
import { createUser, findAllUsers, findOneUser, findAndDeleteUser } from '../services/user.service'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../services/auth.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { compareHashes } from '../utils/compareHashes'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import routes from '../config/routes'

// Define a function to handle user signups
export const postUserSignup = asyncWrapper(
  async ({ body: {name, email, password, confirmPassword} }: AuthenticatedRequest, res: Response) => {
    // Set the number of salt rounds for bcrypt
    const saltRounds = 10

    // Check if the passwords match
    if (password !== confirmPassword)
      return res.status(400).json({
        message: 'PASSWORD_DO_NOT_MATCH',
        error: 'BAD_REQUEST',
        statusCode: 400
      })


    // Hash the user's password using bcrypt
    const hashedPassword = await hash(password, saltRounds)

    // Create a new user with the name, email, and hashed password
    await createUser({
      name,
      email,
      password: hashedPassword
    })  

    // Redirect to /login route
    return res.redirect(`${routes.user}/login`)
  }
)

// Define a function to handle user logins
export const postUserLogin = asyncWrapper(
  async ({body}: AuthenticatedRequest, res: Response) => {
    // Get the email and password from the request body
    const { email, password } = body

    // Find the user with the specified email
    const data = await findOneUser(email)

    // Redirect to home if the user does not exist
    if (!data) 
      return res.redirect('/')

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
    return res.redirect('/')
  }
)

// Define a function to retrieve all users from a database
export const getAllUsers = asyncWrapper(
  async (_req: AuthenticatedRequest, res: Response) => {
    // Find all users in the database
    const data = await findAllUsers()

    // Send a JSON response with the user data and a status code of 200
    return res.status(200).json(data)
  }
)

export const deleteUser = asyncWrapper(
  async ({ params: { id } }: AuthenticatedRequest, res: Response) => {
    const data = await findAndDeleteUser(id)

    if (!data)
      return res.status(500).json({
        message: `NO_USER_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      })

    return res.status(204).json({
      message: 'DELETE_SUCCESS',
      data: null,
      statusCode: 204
    })
  }
)