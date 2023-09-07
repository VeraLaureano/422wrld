import { User } from '../interfaces/user.interface'

const sessionIdToUserMap = new Map()

export const setUser = (id: string, user: User) => {
  sessionIdToUserMap.set(id, user)
}

export const getUser = (id: string) => {
  return sessionIdToUserMap.get(id)
}