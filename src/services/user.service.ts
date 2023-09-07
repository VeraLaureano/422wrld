import { User } from '../interfaces/user.interface'
import UserModel from '../models/User.schema'

export const createUser = async (data: User) => {
  const responseUser = await UserModel.create(data)
  return responseUser
}

export const findOneUser = async (email: string, password: string) => {
  const responseUser = await UserModel.findOne({ email: email, password: password })
  return responseUser
}