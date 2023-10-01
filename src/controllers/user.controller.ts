import { Response } from 'express'
import { createUser, findAllUsers, findOneUser, findAndDeleteUser } from '../services/user.service'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../services/auth.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { compareHashes } from '../utils/compareHashes'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { deleteSuccess, internalServerError } from '../utils/messages'
import { BAD_REQUEST, CONFLICT, CREATED } from '../config/statusCode'
import validator from 'validator'
import { escapeSpecialCharacters } from '../utils/escapeSpecialCharacters'
import { validatePassword } from '../utils/validatePassword'
import { encryptPassword } from '../utils/bcrypt'

// Function to handle user signup
export const postUserSignup = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract username, email, profileImg, bio, password, and confirmPassword from the request body
    const {username, email, profileImg, bio, password, confirmPassword} = req.body
    
    // Check if a user with the same email already exists
    const isExistingUser = await findOneUser(email)
  
    // If a user with the same email exists, return a conflict response
    if (isExistingUser)
      return res.status(CONFLICT).json({message: 'ALREADY_A_USER_WITH_THAT_EMAIL'})
  
    // Validate the email format using a validator library
    if (!email || !validator.isEmail(email)) 
      return res.status(BAD_REQUEST).json({message: 'INVALID_EMAIL'}) 
    
    // Escape special characters in the password and validate its format 
    const escapedPassword: string = escapeSpecialCharacters(password)
    const isPasswordValid: boolean = validatePassword(escapedPassword)

    // If the password is missing, too short, or invalid, return a bad request response
    if (!password || password.length < 8 || !isPasswordValid)
      return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'})

    // Escape special characters in the confirmPassword and validate its format 
    const escapedConfirmPassword: string = escapeSpecialCharacters(confirmPassword)
    const isConfirmPasswordValid: boolean = validatePassword(escapedConfirmPassword)

    // If the confirmPassword is missing, too short, or invalid, return a bad request response
    if (!confirmPassword || password.length < 8 || !isConfirmPasswordValid)
      return res.status(BAD_REQUEST).json({message: 'INVALID_CONFIRM_PASSWORD'})

    // If the password and confirmPassword do not match, return a bad request response
    if (password !== confirmPassword)
      return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'})

    // Escape special characters
    const escapedUsername = escapeSpecialCharacters(username)
    const escapedEmail = escapeSpecialCharacters(email)
    const escapedProfileImg = escapeSpecialCharacters(profileImg)
    const escapedBio = escapeSpecialCharacters(bio)

    // Hash the password using a bcrypt library
    const passwordHashed = await encryptPassword(escapedPassword)

    // Create a user data object with escaped values
    const userData = {
      username: escapedUsername,
      email: escapedEmail,
      profileImg: escapedProfileImg,
      bio: escapedBio,
      password: passwordHashed
    }

    // Create the use in the database
    await createUser(userData)
    
    // Return a created response with a signup flag set to true
    return res.status(CREATED).json({signup: true})
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
      return res.status(500).json(internalServerError('user', email))

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
      return res.status(500).json(internalServerError('user', id))

    return res.status(204).json(deleteSuccess)
  }
)