import { User } from '../interfaces/user.interface'
import UserModel from '../models/User.schema'

export const createUser = async (data: User) => {
  const responseUser = await UserModel.create(data)
  return responseUser
}

export const findOneUser = async (email: string) => {
  const responseUser = await UserModel.findOne({ email: email })
  return responseUser
}

export const findAllUsers = async () => {
  const responseUsers = await UserModel.find({})
  return responseUsers
}

export const findAndUpdateUser = async (userID: string, data: object) => {
  const responseUser = await UserModel.findOneAndUpdate({_id: userID}, data, { new: true, runValidators: true })
  return responseUser
}

export const findAndDeleteUser =async (userID: string) => {
  const responseUser = await UserModel.findOneAndDelete({ _id: userID })
  return responseUser
}