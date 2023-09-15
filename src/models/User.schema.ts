import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, 'MUST_PROVIDE_NAME'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'MUST_PROVIDE_EMAIL'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'MUST_PROVIDE_PASSWORD'],
  }
}, 
{ timestamps: true })

const UserModel = model('User', UserSchema)
export default UserModel