import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, 
{ timestamps: true })

const UserModel = model('User', UserSchema)
export default UserModel