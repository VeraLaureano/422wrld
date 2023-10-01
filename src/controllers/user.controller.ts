import { Response } from 'express'
import { createUser, findAllUsers, findOneUser, findAndDeleteUser } from '../services/user.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { deleteSuccess, internalServerError } from '../utils/messages'
import { BAD_REQUEST, CONFLICT, CREATED, EVERYTHING_OK, UNAUTHORIZED } from '../config/statusCode'
import validator from 'validator'
import { escapeSpecialCharacters } from '../utils/escapeSpecialCharacters'
import { validatePassword } from '../utils/validatePassword'
import { comparePassword, encryptPassword } from '../utils/bcrypt'
import { sign } from 'jsonwebtoken'
import { SECRET_KEY } from '../config/env'

// Function to handle user signup
export const postUserSignup = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract username, email, profileImg, bio, password, and confirmPassword from the request body
    const {username, email, profileImg, bio, password, confirmPassword} = req.body
    
    // Escape special characters from email
    const escapedEmail = escapeSpecialCharacters(email)
  
    // Validate the email format using a validator library
    if (!email || !validator.isEmail(escapedEmail)) 
      return res.status(BAD_REQUEST).json({message: 'INVALID_EMAIL'}) 

    // Check if a user with the same email already exists
    const isExistingUser = await findOneUser(escapedEmail)

    // If a user with the same email exists, return a conflict response
    if (isExistingUser)
      return res.status(CONFLICT).json({message: 'ALREADY_A_USER_WITH_THAT_EMAIL'})
    
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
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract email and password from the request body
    const { email, password } = req.body

    // Escape special characters from email and password
    const escapedEmail: string = escapeSpecialCharacters(email)
    const escapedPassword: string = escapeSpecialCharacters(password)

    // Find the user with the specified email 
    const user = await findOneUser(escapedEmail)

    // If no user is found, return an unauthorized response
    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'})

    // Compare the provided password with the stored password hash
    const isMatch: Promise<boolean> = comparePassword(escapedPassword, user.password)

    // If the passwords do not match, return an unauthorized response
    if (!isMatch)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'})

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = sign({userId: user._id}, String(SECRET_KEY), {expiresIn: '1h'})

    // Return a response with the generated token
    res.status(EVERYTHING_OK).json({token})
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