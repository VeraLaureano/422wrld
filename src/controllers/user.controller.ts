import { Response } from 'express'
import { createUser, findOneUser, findAndDeleteUser, findAndUpdateUser } from '../services/user.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { BAD_REQUEST, CONFLICT, CREATED, EVERYTHING_OK, NO_CONTENT, UNAUTHORIZED } from '../config/statusCode'
import validator from 'validator'
import { escapeSpecialCharacters } from '../utils/escapeSpecialCharacters'
import { validatePassword } from '../utils/validatePassword'
import { comparePassword, encryptPassword } from '../utils/bcrypt'
import { sign } from 'jsonwebtoken'
import { SECRET_KEY } from '../config/env'
import { cleanXSS } from '../utils/sanitize'

// Function to handle user signup
export const postUserSignup = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract username, email, profileImg, bio, password, and confirmPassword from the request body
    const {username, email, profileImg, bio, password, confirmPassword} = req.body
    
    // Validate the email format using a validator library
    if (!email || !validator.isEmail(email)) 
      return res.status(BAD_REQUEST).json({message: 'INVALID_EMAIL'}) 
    
    // Escape special characters from email
    const escapedEmail = escapeSpecialCharacters(email)

    // Check if a user with the same email already exists
    const isExistingUser = await findOneUser(escapedEmail)

    // If a user with the same email exists, return a conflict response
    if (isExistingUser)
      return res.status(CONFLICT).json({message: 'ALREADY_A_USER_WITH_THAT_EMAIL'})
    
    // Escape special characters in the password and validate its format 
    const escapedPassword: string = escapeSpecialCharacters(password)
    const isPasswordValid: boolean = validatePassword(escapedPassword)

    // If the password is missing, too short, or invalid, return a bad request response
    if (!password || password.length < 10 || !isPasswordValid)
      return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'})

    // Escape special characters in the confirmPassword and validate its format 
    const escapedConfirmPassword: string = escapeSpecialCharacters(confirmPassword)
 
    // If the password and confirmPassword do not match, return a bad request response
    if (escapedPassword !== escapedConfirmPassword)
      return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'})
      
    // If the username is missing return a bad request response
    if (!username)
      return res.status(BAD_REQUEST).json({message: 'USERNAME_NOT_FOUND'})
      
    // If the profileImg is missing return a bad request response
    if (!profileImg)
      return res.status(BAD_REQUEST).json({message: 'PROFILE_IMAGE_NOT_FOUND'})

    // If the profileImg is missing return a bad request response
    if (!bio)
      return res.status(BAD_REQUEST).json({message: 'BIO_NOT_FOUND'})

    // Escape special characters
    const escapedUsername: string = escapeSpecialCharacters(username)
    const escapedProfileImg: string = escapeSpecialCharacters(profileImg)
    const escapedBio: string = escapeSpecialCharacters(bio)

    if (escapedBio.length > 100)
      return res.status(400).json({message: 'INVALID_BIO_LENGTH'})

    // Sanitize inputs for prevent XSS attacks
    const cleanUsername = cleanXSS(escapedUsername)
    const cleanEmail = cleanXSS(escapedEmail)
    const cleanProfileImg = cleanXSS(escapedProfileImg)
    const cleanBio = cleanXSS(escapedBio)
    const cleanPassword = cleanXSS(escapedPassword)

    // Hash the password using a bcrypt library
    const passwordHashed = await encryptPassword(cleanPassword)

    // Create a user data object with escaped values
    const userData = {
      username: cleanUsername,
      email: cleanEmail,
      profileImg: cleanProfileImg,
      bio: cleanBio,
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

    // If email is missing, return a bad request response
    if (!email)
      return res.status(BAD_REQUEST).json({message: 'EMAIL_NOT_FOUND'})

    // If password is missing, return a bad request response
    if (!password)
      return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_FOUND'})

    // Escape special characters from email and password
    const escapedEmail: string = escapeSpecialCharacters(email)
    const escapedPassword: string = escapeSpecialCharacters(password)

    // Sanitize email and password for prevent XSS attacks
    const cleanEmail: string = cleanXSS(escapedEmail)
    const cleanPassword: string = cleanXSS(escapedPassword)

    // Find the user with the specified email 
    const user = await findOneUser(cleanEmail)

    // If no user is found, return an unauthorized response
    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'})

    // Compare the provided password with the stored password hash
    const isMatch: Promise<boolean> = comparePassword(cleanPassword, user.password)

    // If the passwords do not match, return an unauthorized response
    if (!isMatch)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'})

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = sign({userId: user._id}, String(SECRET_KEY), {expiresIn: '1h'})

    // Return a response with the generated token
    res.status(EVERYTHING_OK).json({token})
  }
)

// Defina a function to handle user patch request
export const patchUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract username, profileImg, bio, password, confirmPassword from the request body
    const { username, profileImg, bio, password, confirmPassword } = req.body

    if (!req.user)
      return res.status(UNAUTHORIZED).json({message: 'USER_NO_AUTHENTICATED'})

    // Extract _id from request user
    const { _id } = req.user

    let newData: object = {}

    // If username is provided, escape special characters and add it to newData object
    if (username) {
      const escapedUsername = escapeSpecialCharacters(username)
      const cleanUsername = cleanXSS(escapedUsername)
      newData = {...newData, username: cleanUsername}
    }
    
    // If profileImg is provided, escape special characters and add it to newData object
    if (profileImg) {
      const escapedProfileImg = escapeSpecialCharacters(profileImg)
      const cleanProfileImg = cleanXSS(escapedProfileImg)
      newData = {...newData, profileImg: cleanProfileImg}
    }
    
    // If bio is provided, escape special characters and add it to newData object
    if (bio) {
      const escapedBio = escapeSpecialCharacters(bio)
      const cleanBio = cleanXSS(escapedBio)
      newData = {...newData, bio: cleanBio}
    }

    // If password is provided, validate it and add it to newData object
    if (password) {
      // Check if password and confirmPassword match
      if (password !== confirmPassword)
        return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'})
      
      // Escape special characters in the password and validate its format
      const escapedPassword = escapeSpecialCharacters(password)
      const isPasswordValid = validatePassword(escapedPassword)
      const cleanPassword = cleanXSS(escapedPassword)
      const passwordHashed = await encryptPassword(cleanPassword)

      // If password is too short or invalid, return a bad request response
      if (password.length < 10 || !isPasswordValid)
        return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'})
      
      newData = {...newData, password: passwordHashed}
    }
    
    // Find and update the user with the specified ID using newData object
    const newUser = await findAndUpdateUser(_id as string, {...newData})
  
    // Update the request user object with the new user data
    if (newUser) 
      req.user = newUser

    // Return a created response with an update flag and the new user data
    return res.status(CREATED).json({ update: true }) 
  }
)

// Define a function to handle user deletion from a database
export const deleteUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract confirmUsername and isSure from the request body
    const { confirmUsername, isSure } = req.body

    if (!req.user)
      return res.status(UNAUTHORIZED).json({message: 'USER_NO_AUTHENTICATED'})

    // Extract _id and username from the request user object
    const { _id, username } = req.user

    // If confirmUsername or isSure is missing, return a bad request with an appropiate message
    if (!confirmUsername || !isSure)
      return res.status(BAD_REQUEST).json({message: 'DELETE_NOT_CONFIRM'})

    // Escape special characters from confirmUsername
    const escapedConfirmUsername: string = escapeSpecialCharacters(confirmUsername)

    // If confirmUsername does not match the username, return a bad request with an appropiate message
    if (escapedConfirmUsername !== username)
      return res.status(BAD_REQUEST).json({message: 'USERNAME_NOT_MATCH'})

    // Find and delete the user with the specified _id
    await findAndDeleteUser(_id as string)

    // Set undefined to request user 
    req.user = undefined

    // Return a no content response with a delete flag set to true
    return res.status(NO_CONTENT).json({delete: true})
  }
)