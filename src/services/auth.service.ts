// Import the User interface from '../interfaces/user.interface'
import { User } from '../interfaces/user.interface'

// Define a function to set a user object in the Map
const sessionIdToUserMap = new Map()

// Define a function to set a user object in the Map
export const setUser = (id: string, user: User) => {
  sessionIdToUserMap.set(id, user)
}

// Define a function to get a user object from the Map
export const getUser = (id: string) => {
  return sessionIdToUserMap.get(id)
}

// Define a function to check if a user exists in the Map
export const hasUser = (id: string) => {
  return sessionIdToUserMap.has(id)
}